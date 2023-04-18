import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Tag,
  Space,
  Popconfirm,
} from "antd";
import {
  InfoCircleOutlined,
  PlusSquareOutlined,
  SaveOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { JSON_API } from "../services/Constants";
import { useTranslation } from "react-i18next";
import EditRoleInput from "./EditRoleInput";

const RoleList = () => {
  let { t } = useTranslation();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [editRoleInputRef, setEditRoleInputRef] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${JSON_API}/Roles`);
      setRoles(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSave = async (updatedRole) => {
    try {
      await axios.put(`${JSON_API}/Roles/${updatedRole.id}`, updatedRole);
      message.success(t("RoleUpdatedSuccessfully"));
      fetchRoles();
      setEditingRole(null);
    } catch (error) {
      message.error(t("ErrorUpdatingRole"));
    }
  };

  const createRole = async (values) => {
    try {
      // Récupérer les données existantes
      const response = await axios.get(`${JSON_API}/Roles`);
      const existingRoles = response.data;

      // Vérifier la duplication des données
      const isDuplicate = existingRoles.some(
        (role) => role.name === values.name
      );
      if (isDuplicate) {
        message.error(t("RoleAlreadyExists"));
        return;
      }

      // Insérer les données si elles ne sont pas en double
      await axios.post(`${JSON_API}/Roles`, values);
      message.success(t("RoleCreatedSuccessfully"));
      fetchRoles();
    } catch (error) {
      message.error(t("ErrorCreatingRole"));
    }
  };

  const updateRole = async (name) => {
    try {
      await axios.put(`${JSON_API}/Roles/${editingRole.id}`, {
        ...editingRole,
        name,
      });
      message.success(t("RoleUpdatedSuccessfully"));
      fetchRoles();
      setEditingRole(null);
    } catch (error) {
      message.error(t("ErrorUpdatingRole"));
    }
  };

  const editRole = (role) => {
    setEditingRole(role);
  };

  const saveRole = () => {
    if (editRoleInputRef && editRoleInputRef.handleSubmit) {
      editRoleInputRef.handleSubmit();
    }
  };

  const columns = [
    {
      title: t("RoleName"),
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        if (editingRole && editingRole.id === record.id) {
          return (
            <EditRoleInput
              role={record}
              onFinish={(values) => {
                handleSave({ ...record, ...values });
              }}
            />
          );
        } else {
          return text;
        }
      },
    },
    {
      title: t("Actions"),
      key: "actions",
      align: "center",
      render: (text, record) => {
        const isEditing = editingRole && editingRole.id === record.id;
        return (
          <Space size="middle">
            {isEditing ? (
              <>
                <Button
                  type="link"
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => setEditingRole(null)}
                >
                  {t("CancelEdit")}
                </Button>
                <Button type="link" icon={<SaveOutlined />} onClick={saveRole}>
                  {t("SaveRole")}
                </Button>
              </>
            ) : (
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => editRole(record)}
              >
                {t("EditRole")}
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Card
        title={
          <span style={{ fontSize: "16px" }}>
            <SettingOutlined /> {t("ManageRoles")}
          </span>
        }
        extra={
          <Button
            type="primary"
            size="medium"
            className="uppercase"
            style={{
              borderRadius: "50px",
              fontSize: "10px",
              textTransform: "uppercase",
            }}
            icon={<PlusSquareOutlined />}
            onClick={() => setVisible(true)}
          >
            {t("AddNewRole")}
          </Button>
        }
      >
        <Table
          rowKey="id"
          rowClassName={(record) =>
            editingRole && editingRole.id === record.id ? "editing" : ""
          }
          dataSource={roles}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
      <Modal
        className="custom-modal"
        title={
          <>
            <UsergroupAddOutlined />
            <span style={{ marginLeft: "8px", marginBottom: "20px" }}>
              {t("AddNewRole")}
            </span>
          </>
        }
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setVisible(false)}
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
                  form.resetFields();
                  createRole(values);
                  setVisible(false);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
          >
            {t("Submit")}
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            label={<span>{t("RoleName")}</span>}
            rules={[{ required: true, message: t("PleaseEnterRoleName") }]}
          >
            <Input placeholder={t("PleaseEnterRoleName")} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RoleList;
