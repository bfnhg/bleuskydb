import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Card,
  message,
  Space,
  Tag,
  Empty,
} from "antd";
import {
  ProfileOutlined,
  FileAddOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  EditOutlined,
  FileProtectOutlined,
  WarningOutlined,
  SaveOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import axios from "axios";
import { JSON_API } from "../services/Constants";
import { useTranslation } from "react-i18next";

const ManageSections = () => {
  let { t } = useTranslation();
  const [loadingSubsection, setLoadingSubsection] = useState(false);
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [subsectionModalVisible, setSubsectionModalVisible] = useState(false);
  const [subsectionForm] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);

  const fetchSections = async () => {
    try {
      const response = await axios.get(`${JSON_API}/sections`);

      const allSections = response.data;
      const rootSections = allSections.filter(
        (section) => section.parentId == null
      );

      const sectionSubsections = await Promise.all(
        rootSections.map(async (section) => {
          const subsections = await getSubsections(section.id);
          return { ...section, subsections };
        })
      );

      setSections(sectionSubsections);
    } catch (error) {
      console.error("Error while fetching sections:", error);
    }
  };

  const handleCreateSubsection = async (values) => {
    setLoadingSubsection(true);
    try {
      const existingSubsections = await getSubsections(selectedSection?.id);
      if (
        existingSubsections.some(
          (subsection) => subsection.label === values.label
        )
      ) {
        message.error("A subsection with the same label already exists.");
        return;
      }

      const response = await axios.post(`${JSON_API}/sections/subsections`, {
        Label: values.label,
        ParentSectionId: selectedSection?.id,
      });

      if (response.status === 201) {
        const newSubsection = response.data;
        setSubsections((prevSubsections) => [
          ...prevSubsections,
          newSubsection,
        ]);
        message.success("Subsection created successfully");
        message.success(t("SubsectionCreatedSuccess"));
        fetchSections();
      } else {
        message.error(t("FailedCreateSubsection"));
      }
    } catch (error) {
      console.error("Error while creating subsection:", error);
    } finally {
      setSubsectionModalVisible(false);
      subsectionForm.resetFields();
      setLoadingSubsection(false);
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

  const handleSubmit = async (values, parentId) => {
    setLoading(true);
    try {
      // Récupérer toutes les sections existantes
      const response = await axios.get(`${JSON_API}/sections`);
      const existingSections = response.data;

      // Vérifier si le nom de la section existe déjà
      const sectionExists = existingSections.some(
        (section) => section.label.toLowerCase() === values.label.toLowerCase()
      );
      if (sectionExists) {
        message.error(t("SectionAlreadyExists"));
        setLoading(false);
        return;
      }

      await axios.post(
        `${JSON_API}/sections${parentId ? `/${parentId}/subsections` : ""}`,
        values
      );
      form.resetFields();
      setVisible(false);
      message.success(t("SectionCreatedSuccessfully"));
      setLoading(false);
      fetchSections();
    } catch (error) {
      message.error(t("FailedCreateSection"));
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleDeleteSection = async () => {
    try {
      await axios.delete(`${JSON_API}/sections/${sectionToDelete}`);
      message.success(t("SectionAndAssociatedSubsectionsDeletedSuccessfully"));
    } catch (error) {
      console.log(error);
      message.error("FailedDeleteSectionAndAssociatedSubsections");
    } finally {
      fetchSections();
      setDeleteModalVisible(false);
    }
  };

  const columns = [
    {
      title: t("ParentSection"),
      dataIndex: "label",
      key: "label",
      render: (text, record) => (
        <span
          style={{
            color: record.parentId == null ? "#000" : "#999",
          }}
        >
          {record.parentId == null ? text : ""}
        </span>
      ),
    },
    {
      title: t("Subsections"),
      dataIndex: "subsections",
      key: "subsections",
      align: "center",
      render: (subsections) => {
        if (!subsections || subsections.length === 0) {
          return (
            <span style={{ color: "red" }}>
              <WarningOutlined
                style={{ marginRight: "5px", fontSize: "20px" }}
              />
              {t("NoSubSections")}
            </span>
          );
        } else {
          return (
            <div className="subsections-container">
              {subsections.map((subsection, index) => (
                <Tag key={subsection.id} color="blue">
                  {subsection.label}
                </Tag>
              ))}
            </div>
          );
        }
      },
    },

    {
      title: "Actions",
      align: "center",
      render: (_, record) => (
        <>
          <Space size="middle">
            {/* N'affichez le bouton d'ajout de sous-section que pour les sections ayant un Parent ID égal à null */}
            {record.parentId == null && (
              <Button
                type="link"
                icon={<FileProtectOutlined />}
                onClick={() => {
                  setSelectedSection(record);
                  setSubsectionModalVisible(true);
                }}
              >
                {t("AddSubsection")}
              </Button>
            )}

            {/* N'affichez le bouton de suppression que pour les sections ayant un Parent ID égal à null */}
            {record.parentId == null && (
              <Button
                type="link"
                danger
                icon={<CloseOutlined />}
                onClick={() => {
                  setSectionToDelete(record.id);
                  setDeleteModalVisible(true);
                }}
              >
                {t("DeleteSection")}
              </Button>
            )}
          </Space>
        </>
      ),
    },
  ];

  return (
    <Card
      title={
        <span style={{ fontSize: "16px" }}>
          <ProfileOutlined /> {t("ManageSections")}
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
          icon={<FileAddOutlined />}
          onClick={() => setVisible(true)}
        >
          {t("AddNewSection")}
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={sections}
        loading={loadingSubsection}
        rowKey="id"
      />

      <Modal
        visible={visible}
        title={
          <>
            <FileAddOutlined />
            <span style={{ marginLeft: "8px", marginBottom: "25px" }}>
              {t("AddNewSection")}
            </span>
          </>
        }
        onCancel={() => setVisible(false)}
        confirmLoading={loading}
        footer={[
          <Button
            type="primary"
            danger
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
                  handleSubmit(values);
                })
                .catch((info) => {
                  console.error("Validate Failed:", info);
                });
            }}
          >
            {t("AddSection")}
          </Button>,
        ]}
        style={{ marginTop: "50px", marginBottom: "50px" }}
        bodyStyle={{ marginTop: "2px", marginBottom: "25px" }}
      >
        <Form form={form}>
          <Form.Item
            label={t("SectionName")}
            name="label"
            rules={[
              {
                required: true,
                message: "Please input a label for the section!",
              },
            ]}
          >
            <Input placeholder={t("SectionName")} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={subsectionModalVisible}
        title={
          <>
            <FileProtectOutlined />
            <span style={{ marginLeft: "8px", marginBottom: "25px" }}>
              {t("AddSubsectionTo")} {selectedSection?.label}
            </span>
          </>
        }
        onCancel={() => {
          setSubsectionModalVisible(false);
        }}
        footer={[
          <Button
            type="primary"
            key="cancel"
            danger
            onClick={() => {
              setSubsectionModalVisible(false);
              subsectionForm.resetFields();
            }}
            icon={<CloseOutlined />}
          >
            {t("CancelSubsection")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            icon={<SaveOutlined />}
            loading={loadingSubsection}
            onClick={() => {
              subsectionForm
                .validateFields()
                .then((values) => {
                  handleCreateSubsection(values);
                })
                .catch((info) => {
                  console.error("Validate Failed:", info);
                });
            }}
          >
            {t("AddSubsection")}
          </Button>,
        ]}
      >
        <Form form={subsectionForm}>
          <Form.Item
            label="Label"
            name="label"
            rules={[
              {
                required: true,
                message: "Please input a label for the subsection!",
              },
            ]}
          >
            <Input placeholder="Subsection label" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={
          <>
            <InfoCircleFilled style={{ color: "red" }} />
            <span style={{ marginLeft: "8px", marginBottom: "20px" }}>
              {t("ConfirmDeleteSection")}
            </span>
          </>
        }
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setDeleteModalVisible(false)}
            icon={<CloseOutlined />}
          >
            {t("NoCancel")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            icon={<CheckCircleOutlined />}
            onClick={() => {
              handleDeleteSection();
            }}
          >
            {t("YesDelete")}
          </Button>,
        ]}
        style={{ borderRadius: "10px" }}
        bodyStyle={{ fontSize: "16px" }}
      >
        <p>{t("DeleteThisSection")}</p>
      </Modal>
    </Card>
  );
};

export default ManageSections;
