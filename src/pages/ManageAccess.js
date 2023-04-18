import {
  Card,
  Button,
  Select,
  Table,
  Checkbox,
  Form,
  Modal,
  Input,
  message,
} from "antd";
import {
  UnlockOutlined,
  CheckCircleOutlined,
  PlusSquareOutlined,
  CloseOutlined,
  UsergroupAddOutlined,
  SaveOutlined,
  FilterOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { JSON_API } from "../services/Constants";

const ManageAccess = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [Roles, setRoles] = React.useState([]);
  const [Sections, setSections] = React.useState([]);
  const [accessList, setAccessList] = useState([{}]);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedParentLabel, setSelectedParentLabel] = useState("");
  const [accessDataCache, setAccessDataCache] = useState({});

  const [form] = Form.useForm();

  const handleParentLabelChange = (value) => {
    setSelectedParentLabel(value);
  };

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

  const createRole = async (values) => {
    try {
      const response = await axios.get(`${JSON_API}/Roles`);
      const existingRoles = response.data;

      const isDuplicate = existingRoles.some(
        (role) => role.name === values.name
      );

      if (isDuplicate) {
        message.error(t("RoleAlreadyExists"));
        return;
      }

      await axios.post(`${JSON_API}/Roles`, values);
      message.success(t("RoleCreatedSuccessfully"));
      fetchRoles();
    } catch (error) {
      message.error(t("ErrorCreatingRole"));
    }
  };

  const fetchSections = async () => {
    try {
      const response = await axios.get(`${JSON_API}/sections`);

      const sectionsWithSubsections = await Promise.all(
        response.data.map(async (section) => {
          const subSections = await getSubsections(section.id);
          return [
            { ...section, isSubsection: false },
            ...subSections.map((subSection) => ({
              ...subSection,
              isSubsection: true,
            })),
          ];
        })
      );

      setSections(sectionsWithSubsections.flat());
    } catch (error) {
      console.error("Error while fetching sections:", error);
    }
  };

  const getSubsections = async (parentId) => {
    try {
      const response = await axios.get(
        `${JSON_API}/sections/parent/${parentId}/subsections`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Failed to fetch subsections.");
        return [];
      }
    } catch (error) {
      console.error("Error while fetching subsections:", error);
      return [];
    }
  };

  const fetchAccessListForRole = async (roleId) => {
    const response = await axios.get(`${JSON_API}/accesses/role/${roleId}`);
    const data = await response.data;

    const accessListWithAllSections = Sections.map((section) => {
      const sectionAccess = data.find((a) => a.sectionId === section.id);
      console.log("sectionAccess", sectionAccess);
      return sectionAccess
        ? { ...sectionAccess, accessId: sectionAccess.id }
        : {
            ...section,
            roleId,
            insert: false,
            read: false,
            update: false,
            delete: false,
          };
    }).flat();

    return accessListWithAllSections;
  };

  const updateAccessListForRole = async (roleId) => {
    let accessListForRole;

    if (accessDataCache[roleId]) {
      accessListForRole = accessDataCache[roleId];
    } else {
      accessListForRole = await fetchAccessListForRole(roleId);
      setAccessDataCache((prevState) => ({
        ...prevState,
        [roleId]: accessListForRole,
      }));
    }

    const filteredAccessList = accessListForRole.filter((access) => {
      if (selectedParentLabel === "") {
        // display all Parent Sections with SectionId = null
        return !access.isSubsection && !access.parentSectionId;
      }

      const parentSection = Sections.find(
        (section) => section.id === access.parentSectionId
      );

      if (access.isSubsection) {
        // display sub-sections of selected Parent Section
        return parentSection && parentSection.label === selectedParentLabel;
      }

      // display selected Parent Section with SectionId = null
      return (
        !access.isSubsection &&
        access.label === selectedParentLabel &&
        !access.parentSectionId
      );
    });

    console.log("filteredAccessList", filteredAccessList);
    setAccessList(filteredAccessList);
  };

  const handleRoleChange = async (value) => {
    if (selectedRole) {
      // Save the current accessList in the cache before switching the role
      setAccessDataCache((prevState) => ({
        ...prevState,
        [selectedRole]: accessList,
      }));
    }

    setSelectedRole(value);
  };

  const saveAccessList = async () => {
    setLoading(true);
    try {
      const updatedAccessList = [...accessList];

      for (const access of accessList) {
        const accessUpdateDto = {
          roleId: selectedRole,
          sectionId: access.id,
          insert: access.insert,
          read: access.read,
          update: access.update,
          delete: access.delete,
        };

        if (access.hasOwnProperty("accessId")) {
          // Mettre à jour l'accès existant
          await axios.put(
            `${JSON_API}/accesses/${access.accessId}`,
            accessUpdateDto
          );
        } else {
          // Créer un nouvel accès
          const response = await axios.post(
            `${JSON_API}/accesses`,
            accessUpdateDto
          );
          const newAccessId = response.data.id; // Obtenez le nouvel accessId de la réponse
          const index = updatedAccessList.findIndex((a) => a.id === access.id);
          if (index !== -1) {
            updatedAccessList[index].accessId = newAccessId;
          }
        }
      }

      // Mettre à jour les accessDataCache et enregistrer dans le localStorage
      const updatedCache = {
        ...accessDataCache,
        [selectedRole]: updatedAccessList,
      };

      setAccessDataCache(updatedCache);
      localStorage.setItem("accessDataCache", JSON.stringify(updatedCache));

      message.success(t("AccessSavedSuccessfully"));
      setLoading(false);
    } catch (error) {
      console.error("Error while saving access list:", error);
      message.error(t("ErrorSavingAccess"));
    }
  };

  const handleCheckAll = async (e, record) => {
    const newAccessList = accessList.map((access) => {
      if (access.id === record.id) {
        return {
          ...access,
          insert: e.target.checked,
          read: e.target.checked,
          update: e.target.checked,
          delete: e.target.checked,
        };
      }
      return access;
    });

    setAccessList(newAccessList);
  };

  const handleCheckboxChange = (e, record, key) => {
    const newAccessList = accessList.map((access) => {
      if (access.id === record.id) {
        return {
          ...access,
          [key]: e.target.checked,
        };
      }
      return access;
    });

    setAccessList(newAccessList);
  };

  const columns = [
    {
      title: t("Section"),
      dataIndex: "label",
      key: "label",
      render: (text, record) => (
        <span
          style={{
            marginLeft: record.isSubsection ? "20px" : "0px",
            color: record.isSubsection ? "#999" : "#000",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: t("Insert"),
      dataIndex: "insert",
      key: "insert",
      align: "center",
      render: (text, record) => (
        <Checkbox
          checked={record.insert}
          onChange={(e) => handleCheckboxChange(e, record, "insert")}
        />
      ),
    },
    {
      title: t("Read"),
      dataIndex: "read",
      key: "read",
      align: "center",
      render: (text, record) => (
        <Checkbox
          checked={record.read}
          onChange={(e) => handleCheckboxChange(e, record, "read")}
        />
      ),
    },
    {
      title: t("Update"),
      dataIndex: "update",
      key: "update",
      align: "center",
      render: (text, record) => (
        <Checkbox
          checked={record.update}
          onChange={(e) => handleCheckboxChange(e, record, "update")}
        />
      ),
    },
    {
      title: t("Delete"),
      dataIndex: "delete",
      key: "delete",
      align: "center",
      render: (text, record) => (
        <Checkbox
          checked={record.delete}
          onChange={(e) => handleCheckboxChange(e, record, "delete")}
        />
      ),
    },

    {
      title: t("CheckAll"),
      dataIndex: "checkAll",
      key: "checkAll",
      align: "center",
      render: (_, record) => (
        <Checkbox
          checked={
            record.insert && record.read && record.update && record.delete
          }
          onChange={(e) => handleCheckAll(e, record)}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      await fetchRoles();
      await fetchSections();

      // Récupérer les données du localStorage
      const localData = localStorage.getItem("accessDataCache");
      if (localData) {
        setAccessDataCache(JSON.parse(localData));
      }

      if (selectedRole) {
        await updateAccessListForRole(selectedRole);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRole && Sections.length > 0) {
      updateAccessListForRole(selectedRole);
    }
  }, [selectedRole, Sections, selectedParentLabel, accessDataCache]);

  return (
    <>
      <Card
        title={
          <span style={{ fontSize: "16px" }}>
            <UnlockOutlined /> {t("ManageAccess")}
          </span>
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "35px",
          }}
        >
          <p
            style={{
              marginRight: "16px",
              fontSize: "14px",
            }}
          >
            {t("ChooseRoleToManageAccess")}
          </p>
          <Select
            suffixIcon={<CaretDownOutlined />}
            style={{ width: "35%" }}
            placeholder={t("SelectRole")}
            onChange={handleRoleChange}
          >
            {Roles.map((role) => (
              <Select.Option key={role.id} value={role.id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>

          <Button
            type="primary"
            size="medium"
            className="uppercase"
            style={{
              borderRadius: "50px",
              fontSize: "10px",
              textTransform: "uppercase",
              marginLeft: "16px",
              border: "none",
            }}
            icon={<PlusSquareOutlined />}
            onClick={() => setVisible(true)}
          >
            {t("AddNewRole")}
          </Button>
        </div>
        {selectedRole && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "35px",
              }}
            >
              <p
                style={{
                  marginRight: "16px",
                  fontSize: "16px",
                }}
              >
                <FilterOutlined />
                {t("FilterWithParentSection")}
              </p>
              <Select
                suffixIcon={<CaretDownOutlined />}
                style={{ display: "flex", width: "30%" }}
                placeholder={t("SelectParentSection")}
                onChange={handleParentLabelChange}
              >
                <Select.Option key="all" value="">
                  {t("All")}
                </Select.Option>
                {Sections.filter((section) => !section.isSubsection).map(
                  (section) => (
                    <Select.Option key={section.id} value={section.label}>
                      {section.label}
                    </Select.Option>
                  )
                )}
              </Select>
            </div>

            <Table
              className="custom-table"
              dataSource={accessList}
              columns={columns}
              rowKey="id"
              loading={loading}
            />

            <Button
              type="primary"
              size="medium"
              className="uppercase"
              style={{
                borderRadius: "20px",
                fontSize: "10px",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
              icon={<SaveOutlined />}
              onClick={saveAccessList}
            >
              {t("SaveAccess")}
            </Button>
          </>
        )}

        {/* Add New Role Modal */}
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
      </Card>
    </>
  );
};

export default ManageAccess;
