import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { JSON_API } from "../services/Constants";
import { CompanyContext } from "../contexts/CompanyContext";
import {
  UserOutlined,
  LockOutlined,
  CloseOutlined,
  CheckOutlined,
  PlusCircleOutlined,
  TeamOutlined,
  PhoneOutlined,
  EditOutlined,
  EyeOutlined,
  UnlockOutlined,
  MailOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CaretDownOutlined,
  PlusOutlined,
  MinusOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

import {
  Typography,
  Tag,
  Select,
  Button,
  Form,
  Input,
  Table,
  Card,
  message,
  Modal,
  Row,
  Col,
  List,
} from "antd";

import { useTranslation } from "react-i18next";
const { Item } = Form;
const { Option } = Select;
const { Title } = Typography;

const ManageAccounts = () => {
  const isMounted = useRef(true);

  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const { t } = useTranslation();
  const { Company } = useContext(CompanyContext);

  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createAccountLoading, setCreateAccountLoading] = useState(false);
  const [Roles, setRoles] = useState([]);
  const [manageRolesModalVisible, setManageRolesModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [Managers, setManagers] = useState([]);
  const [accountDetailsModalVisible, setAccountDetailsModalVisible] =
    useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);

  const [updateAccountModalVisible, setUpdateAccountModalVisible] =
    useState(false);
  const [updateAccountLoading, setUpdateAccountLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleUpdateAccount = (record) => {
    setSelectedAccount(record);
    setUpdateAccountModalVisible(true);
  };

  const handleAccountDetails = (record) => {
    setSelectedAccount(record);
    setAccountDetailsModalVisible(true);
  };

  const handleChangePassword = (record) => {
    setSelectedAccount(record);
    setChangePasswordModalVisible(true);
  };

  const handleManageRoles = (record) => {
    setSelectedAccount(record);
    setManageRolesModalVisible(true);
  };

  const handleAddRole = async () => {
    if (selectedRole && selectedRole.length > 0) {
      const promises = selectedRole.map((roleName) =>
        addRoleToAccount({
          email: selectedAccount.email,
          roleName: roleName,
        })
      );
      const results = await Promise.allSettled(promises);
      const successfulResults = results.filter(
        (result) => result.status === "fulfilled"
      );

      if (successfulResults.length > 0) {
        message.success("Successfully added roles to account");
      } else {
        message.error("Failed to add role(s) to account");
      }

      getAllAccountsByEnterpriseId();
    } else {
      message.warning("Please select at least one role");
    }
  };

  const handleRemoveRole = async () => {
    if (selectedRole && selectedRole.length > 0) {
      const promises = selectedRole.map((roleName) =>
        removeRoleFromAccount({
          email: selectedAccount.email,
          roleName: roleName,
        })
      );
      await Promise.all(promises);
      getAllAccountsByEnterpriseId();
      message.success(
        `Role(s) ${selectedRole.join(", ")} removed from account successfully`
      );
    } else {
      message.warning("Please select at least one role");
    }
  };

  const handlePasswordChangeSubmit = async (values) => {
    setChangePasswordLoading(true);
    try {
      const response = await axios.put(`${JSON_API}/Accounts/password-change`, {
        ...values,
        email: selectedAccount.email,
      });
      message.success("Password changed successfully");
      setChangePasswordModalVisible(false);
    } catch (error) {
      console.log(error.response.data);
      message.error("Failed to change password");
    } finally {
      setChangePasswordLoading(false);
    }
  };

  const handleUpdateAccountSubmit = async (values) => {
    setUpdateAccountLoading(true);
    try {
      const accountUpdateDto = {
        email: values.email,
        phoneNumber: values.phoneNumber,
        managerId: values.managerId,
      };
      const response = await axios.put(
        `${JSON_API}/Accounts`,
        accountUpdateDto
      );
      console.log(response.data);
      message.success("Account updated successfully");
      setUpdateAccountModalVisible(false);
      getAllAccountsByEnterpriseId();
    } catch (error) {
      console.log(error.response.data);
      message.error("Failed to update account");
    } finally {
      setUpdateAccountLoading(false);
    }
  };

  const getAllAccountsByEnterpriseId = async () => {
    try {
      const response = await axios.get(
        `${JSON_API}/Accounts/enterprise/${Company.id}`
      );
      // Inclure les rôles dans les données des comptes
      const accountsWithRoles = response.data.map((account) => ({
        ...account,
        roles: account.roles.map((role) => role.name).join(", "),
      }));
      console.log("accountsWithRoles ", accountsWithRoles);

      if (isMounted.current) {
        setAccounts(accountsWithRoles);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch accounts");
    }
  };

  const getManagersByEnterpriseId = async () => {
    try {
      const response = await axios.get(
        `${JSON_API}/Managers/enterprise/${Company.id}`
      );
      console.log("managers ", response.data);
      setManagers(response.data);
      console.log("managers ", response.data);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch accounts");
    }
  };

  const addRoleToAccount = async (accountChangeRole) => {
    try {
      const response = await axios.post(
        `${JSON_API}/Accounts/roles`,
        accountChangeRole
      );
      return response.data;
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to add role to account");
      }
    }
  };

  const removeRoleFromAccount = async (accountChangeRole) => {
    try {
      const response = await axios.delete(`${JSON_API}/Accounts/roles`, {
        data: accountChangeRole,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to remove role from account");
      }
    }
  };

  const columns = [
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: t("PhoneNumber"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: t("Manager"),
      dataIndex: "manager",
      key: "manager",
      align: "center",
    },
    {
      title: t("Roles"),
      dataIndex: "roles",
      key: "roles",
      align: "center",
      render: (roles) => (
        <div className="roles-container">
          {roles.map((role) => (
            <Tag
              key={role}
              color="blue"
              style={{
                borderRadius: "10px",
                border: "1px solid gray",
                padding: "5px",
              }}
            >
              {role}
            </Tag>
          ))}
        </div>
      ),
    },

    {
      title: t("Actions"),
      key: "actions",
      align: "center",
      render: (text, record) => (
        <>
          <Button
            type="link"
            onClick={() => handleUpdateAccount(record)}
            icon={<EditOutlined />}
          >
            {t("Update")}
          </Button>
          <Button
            type="link"
            onClick={() => handleAccountDetails(record)}
            icon={<EyeOutlined />}
          >
            {t("Details")}
          </Button>
          <Button
            type="link"
            icon={<IdcardOutlined />}
            onClick={() => handleManageRoles(record)}
          >
            {t("ManageRoles")}
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleChangePassword(record)}
            icon={<UnlockOutlined />}
          >
            {t("ChangePassword")}
          </Button>
        </>
      ),
    },
  ];

  const handleCreateAccount = async (values) => {
    setCreateAccountLoading(true);
    try {
      const response = await axios.post(`${JSON_API}/Accounts`, values);
      if (response && response.data) {
        console.log("Accounts", response.data);
        message.success("Account created successfully");
        setShowCreateAccountModal(false);
      } else {
        throw new Error("No data in the response");
      }
    } catch (error) {
      console.log("Error: ", error.message);
      message.error("Failed to create account");
      const serverErrors = error.response.data.errors;
      for (const field in serverErrors) {
        form.setFields([
          {
            name: field,
            errors: serverErrors[field],
          },
        ]);
      }
    } finally {
      setCreateAccountLoading(false);
    }
  };

  const getRoles = async () => {
    try {
      const response = await axios.get(`${JSON_API}/Roles`);
      setRoles(response.data);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch roles");
    }
  };

  const updatedDataSource = accounts.map((account) => {
    const manager = Managers.find(
      (manager) => manager.id === account.managerId
    );
    const managerName = manager ? `${manager.firstName} ${manager.name}` : "";

    const roleNames = account.roles.split(", ");

    console.log("Account ID:", account.id, "RoleNames:", roleNames);

    return {
      ...account,
      manager: managerName,
      roles: roleNames,
    };
  });

  useEffect(() => {
    if (selectedAccount) {
      form.setFieldsValue({
        email: selectedAccount.email,
        phoneNumber: selectedAccount.phoneNumber,
        managerId: selectedAccount.managerId,
      });
    }
    isMounted.current = true;
    getManagersByEnterpriseId();
    getAllAccountsByEnterpriseId();
    getRoles();
    console.log("Roles:", Roles);
    console.log("company changed ", Company.id);

    return () => {
      isMounted.current = false;
    };
  }, [Company.id, selectedAccount, form]);

  return (
    <>
      <Card
        title={
          <span style={{ fontSize: "16px" }}>
            <TeamOutlined /> {t("ManageAccounts")}
          </span>
        }
        extra={
          <Button
            type="primary"
            size="medium"
            className="uppercase"
            style={{
              borderRadius: "50px",
              textTransform: "uppercase",
              fontSize: "10px",
            }}
            onClick={() => setShowCreateAccountModal(true)}
          >
            <PlusCircleOutlined /> {t("AddNewAccount")}
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={updatedDataSource}
          rowKey="id"
          roles={Roles}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
          }}
          bordered
        />
      </Card>
      {/* Modal To Create Account */}
      <Modal
        title={
          <span style={{ fontSize: "16px" }}>
            <UserOutlined /> {t("AddNewAccount")}
          </span>
        }
        visible={showCreateAccountModal}
        onCancel={() => setShowCreateAccountModal(false)}
        footer={[
          <Button
            key="back"
            type="primary"
            danger
            onClick={() => setShowCreateAccountModal(false)}
            icon={<CloseOutlined />}
          >
            {t("Cancel")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            form="createAccountForm"
            loading={createAccountLoading}
            icon={<CheckOutlined />}
          >
            {t("CreateAccount")}
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          id="createAccountForm"
          onFinish={handleCreateAccount}
          style={{
            borderRadius: "5px",
            padding: "24px",
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label={t("Email")}
                name="email"
                rules={[{ required: true, message: t("PleaseEnterTheEmail") }]}
                style={{ marginBottom: "16px" }}
              >
                <Input
                  style={{ borderRadius: "5px" }}
                  prefix={<UserOutlined />}
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label={t("PhoneNumber")}
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: t("PleaseEnterThePhoneNumber"),
                  },
                ]}
                style={{ marginBottom: "16px" }}
              >
                <Input
                  style={{ borderRadius: "5px" }}
                  prefix={<PhoneOutlined />}
                />
              </Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Item
                label={t("Manager")}
                name="managerId"
                rules={[{ required: true, message: t("PleaseSelectAManager") }]}
                style={{ marginBottom: "16px" }}
              >
                <Select
                  suffixIcon={<CaretDownOutlined />}
                  options={Managers.map((manager) => ({
                    value: manager.id,
                    label: manager.name + " " + manager.firstName,
                  }))}
                  style={{ borderRadius: "5px", width: "100%" }}
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label={t("Password")}
                name="password"
                rules={[
                  { required: true, message: t("PleaseEnterThePassword") },
                ]}
                style={{ marginBottom: "16px" }}
              >
                <Input.Password
                  style={{ borderRadius: "5px" }}
                  prefix={<LockOutlined />}
                />
              </Item>
            </Col>
          </Row>

          {/* <Row gutter={16}>
            <Col span={12}>
              <Item
                label={t("RoleNames")}
                name="roleNames"
                rules={[
                  {
                    required: true,
                    message: t("PleaseSelectAtLeastOneRole"),
                  },
                ]}
                style={{ marginBottom: "16px" }}
              >
                <Select
                  mode="multiple"
                  options={roles.map((role) => ({
                    value: role.name,
                    label: role.name,
                  }))}
                />
              </Item>
            </Col>
          </Row> */}
        </Form>
      </Modal>
      {/* Modal To Show Account Details */}
      <Modal
        style={{ marginTop: "50px", marginBottom: "50px" }}
        bodyStyle={{ marginTop: "2px", marginBottom: "25px" }}
        title={
          <span style={{ fontSize: "16px" }}>
            <UserOutlined /> {t("AccountDetails")}
          </span>
        }
        visible={accountDetailsModalVisible}
        onCancel={() => setAccountDetailsModalVisible(false)}
        footer={[
          <Button
            key="back"
            onClick={() => setAccountDetailsModalVisible(false)}
            icon={<CloseOutlined />}
          >
            {t("Close")}
          </Button>,
        ]}
      >
        <List
          dataSource={[
            {
              label: t("Email"),
              value: selectedAccount?.email,
            },
            {
              label: t("PhoneNumber"),
              value: selectedAccount?.phoneNumber,
            },
            {
              label: t("Manager"),
              value: selectedAccount
                ? Managers.find(
                    (manager) => manager.id === selectedAccount.managerId
                  )?.firstName +
                  " " +
                  Managers.find(
                    (manager) => manager.id === selectedAccount.managerId
                  )?.name
                : "",
            },
            {
              label: t("LastLogin"),
              icon: <ClockCircleOutlined />,
              value:
                selectedAccount?.lastLogin === "0001-01-01T00:00:00"
                  ? t("NotYetAuthenticated")
                  : selectedAccount?.lastLogin,
            },

            {
              label: t("Status"),
              value: (
                <Tag
                  color={selectedAccount?.active ? "green" : "red"}
                  key="status"
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    border: "1px solid gray",
                    padding: "5px",
                  }}
                >
                  {selectedAccount?.active ? t("Active") : t("InActive")}
                </Tag>
              ),
            },
            {
              label: t("Roles"),
              value: selectedAccount?.roles?.map((role, index) => (
                <Tag
                  color="blue"
                  key={index}
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    border: "1px solid gray",
                    padding: "5px",
                  }}
                >
                  {role}
                </Tag>
              )),
            },
          ]}
          renderItem={(item) => (
            <List.Item
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Text strong>{item.label} :</Typography.Text>
              <div>{item.value}</div>
            </List.Item>
          )}
        />
      </Modal>

      {/* Modal To Change Password */}
      <Modal
        style={{ marginTop: "50px", marginBottom: "50px" }}
        bodyStyle={{ marginTop: "2px", marginBottom: "25px" }}
        title={
          <span style={{ fontSize: "16px" }}>
            <LockOutlined /> {t("ChangePassword")}
          </span>
        }
        visible={changePasswordModalVisible}
        onCancel={() => setChangePasswordModalVisible(false)}
        footer={[
          <Button
            key="back"
            type="primary"
            danger
            onClick={() => setChangePasswordModalVisible(false)}
            icon={<CloseOutlined />}
          >
            {t("Cancel")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={changePasswordLoading}
            onClick={() => form.submit()}
            icon={<CheckOutlined />}
          >
            {t("ChangePassword")}
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={handlePasswordChangeSubmit}
          form={form}
        >
          <Item
            label={t("CurrentPassword")}
            name="currentPassword"
            rules={[{ required: true }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Item>
          <Item
            label={t("NewPassword")}
            name="newPassword"
            rules={[{ required: true }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Item>
        </Form>
      </Modal>

      {/* Modal To Manage Roles */}
      <Modal
        className="custom-modal"
        title={
          <span style={{ fontSize: "16px" }}>
            <IdcardOutlined /> {t("ManageRoles")}
          </span>
        }
        visible={manageRolesModalVisible}
        onCancel={() => setManageRolesModalVisible(false)}
        footer={[
          <Button
            type="primary"
            key="add"
            icon={<PlusOutlined />}
            onClick={handleAddRole}
          >
            {t("AddRoleToAccount")}
          </Button>,
          <Button
            type="primary"
            danger
            key="remove"
            icon={<MinusOutlined />}
            onClick={handleRemoveRole}
          >
            {t("RemoveRoleFromAccount")}
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Select Role">
            <Select
              suffixIcon={<CaretDownOutlined />}
              mode="multiple"
              onChange={(value) => setSelectedRole(value)}
              placeholder="Choose a role"
            >
              {/* Replace with the actual list of roles */}
              {Roles.map((role) => (
                <Select.Option key={role.id} value={role.name}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal To Update Account */}
      <Modal
        className="custom-modal"
        title={
          <>
            <EditOutlined />
            <span style={{ marginLeft: "8px", marginBottom: "20px" }}>
              {t("UpdateAccount")}
            </span>
          </>
        }
        visible={updateAccountModalVisible}
        onCancel={() => setUpdateAccountModalVisible(false)}
        confirmLoading={updateAccountLoading}
        footer={[
          <Button
            key="cancel"
            type="primary"
            danger
            onClick={() => setUpdateAccountModalVisible(false)}
            icon={<CloseOutlined />}
          >
            {t("Cancel")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  handleUpdateAccountSubmit(values);
                  form.resetFields();
                })
                .catch((info) => {
                  console.log("Validation Failed:", info);
                });
            }}
          >
            {t("UpdateAccount")}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label={
              <span>
                <MailOutlined /> {t("Email")}
              </span>
            }
            name="email"
            rules={[
              { required: true, message: t("Please input the email") },
              { type: "email", message: t("Please enter a valid email") },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <span>
                <PhoneOutlined /> {t("PhoneNumber")}
              </span>
            }
            name="phoneNumber"
            rules={[
              { required: true, message: t("Please input the phone number") },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <span>
                <UserOutlined /> {t("Manager")}
              </span>
            }
            name="managerId"
            rules={[{ required: true, message: t("Please select a manager") }]}
          >
            <Select>
              {Managers.map((manager) => (
                <Select.Option key={manager.id} value={manager.id}>
                  {manager.firstName} {manager.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManageAccounts;
