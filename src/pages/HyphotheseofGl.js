import React from "react";

import { Table, Button, Select, Modal, Form, Input, Popconfirm } from "antd";
import { useState } from "react";

function HyphotheseofGl() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const [editingRow, setEditingRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [openHyphothese, setopenHyphothese] = useState(false);
   const { TextArea } = Input;

  const OnopenHyphothese = (values) => {
    console.log("Received values of form: ", values);
    setopenHyphothese(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    onChange: onSelectChange,
  };
  const columnsGLAccount = [
    {
      title: "GL Number",
      dataIndex: "GLNumber",
      align: "center",

      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="GLNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter your ",
                },
              ]}
            >
              <Input defaultValue="GL Number" />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "left" }}>{text}</div>;
        }
      },
    },
    {
      title: "Related GIFI",
      dataIndex: "gifi",
      align: "center",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="gifi"
              rules={[
                {
                  required: true,
                  message: "Please enter your ",
                },
              ]}
            >
              <Input defaultValue="Related GIFI" />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
    {
      title: "Description",
      dataIndex: "Description",
      align: "center",

      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="Descreption"
              rules={[
                {
                  required: true,
                  message: "Please enter your ",
                },
              ]}
            >
              <Input defaultValue="Descreption" />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "left" }}>{text}</div>;
        }
      },
    },
    {
      title:"Actions",
      align: "center",

      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  name: record.name,
                  address: record.address,
                });
              }}
            >
              Edit
            </Button>
          </>
        );
      },
    },
  ];
  const columnsHyphothese = [
    {
      title: <h1 style={{ textAlign: "center" }}>Year</h1>,
      dataIndex: "year",
      align: "center",
      width: 100,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="year"
              rules={[
                {
                  required: true,
                  message: "Please enter your year",
                },
              ]}
            >
              <Input defaultValue="Year" />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Annual Increase</h1>,
      dataIndex: "age",
      align: "right",
      width: 100,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please enter your ",
                },
              ]}
            >
              <Input defaultValue="Annual Increase" />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Begin On</h1>,
      dataIndex: "begin",
      align: "center",
      width: 200,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="begin"
              rules={[
                {
                  required: true,
                  message: "Please enter your ",
                },
              ]}
            >
              <Input
                defaultValue="Begin On"
                // onChange={(event) => {
                //   setdetails(event.target.value);
                //   console.log(details);
                // }}
              />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Hyphothesis</h1>,
      dataIndex: "HyphotheseofGl",
      // width: 350,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="HyphotheseofGl"
              rules={[
                {
                  required: true,
                  message: "Please enter your ",
                },
              ]}
            >
              <Input
                defaultValue="HyphotheseofGl"
                // onChange={(event) => {
                //   setdetails(event.target.value);
                //   console.log(details);
                // }}
              />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },

    {
      title: "Actions",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  name: record.name,
                  address: record.address,
                });
              }}
            >
              Edit
            </Button>
            <Popconfirm type="link" title="Are you sure to delete ">
              <a> Delete</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const dataGLAccount = [
    {
      key: 1,
      GLNumber: `ER3  `,
      gifi: 22,
      Descreption: `London`,
    },
    {
      key: 2,
      GLNumber: `EF21 `,
      gifi: 23,
      Descreption: ` Park Lane no`,
    },
    {
      key: 3,
      GLNumber: `ERA3  `,
      gifi: 32,
      Descreption: `London, Park Lane no`,
    },
  ];
  const dataHyphothese = [
    {
      key: 1,

      year: `2023  `,
      age: 22,
      begin: `2021`,
      HyphotheseofGl: "hyphothes4",
    },
    {
      key: 2,
      year: `2023  `,
      age: 23,
      begin: ` 2023`,
      HyphotheseofGl: "hyphothese1",
    },
    {
      key: 3,
      year: `2022  `,
      age: 32,
      begin: `2022`,
      HyphotheseofGl: "hyphothes2",
    },
  ];

  

  const submite = async (e) => {
    //construction dobjet json
    const formData = {
      type: e.type,
      //   details: e.details,
      //   year: e.year,
      //   enterpriseId: e.enterpriseId,
    };

    console.log(formData);
    // axios
    //   .post(`https://localhost:7232/api/StrategicTargets`, formData)
    //   .then((res) => {
    //     console.log(res);
    //     getdata();
    //     console.log(res.data);
    //     setOpen(!open);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  const CollectionCreateGlAcount = ({ open, onCreate, onCancel }) => {
    return (
      <Modal
        forceRender
        open={open}
        title="Create GL Number "
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            //  value={nom}
            name="GL Number"
            label="GL Number"
            rules={[
              {
                required: true,
                message: "Please input the title of GL Number",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            // value={nom}
            name="Type"
            label="Type"
            rules={[
              {
                required: true,
                message: "Please input the title of type!",
              },
            ]}
          >
            <Select
              defaultValue=""
              style={{
                width: 470,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "type1 ",

                  label: "type 1",
                },
                {
                  value: "type2",
                  label: "type 2",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            // value={nom}
             name="Descreption"
            label="Descreption"
            rules={[
              {
                required: true,
                message: "Please input the title of Descreption ",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const CollectionCreateHyphothesis = ({
    openHyphothese,
    OnopenHyphothese,
    onCancel,
  }) => {
    return (
      <Modal
        forceRender
        open={openHyphothese}
        title="Create GL Number "
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              OnopenHyphothese(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            // value={nom}
            name="Year"
            label="Year"
            rules={[
              {
                required: true,
                message: "Please input the title of ",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            // value={nom}
            name="Annuel Increase"
            label="Annuel Increase"
            rules={[
              {
                required: true,
                message: "Please input the title of ",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            // value={nom}
            name="Begin On Mouth"
            label="Begin On Mouth"
            rules={[
              {
                required: true,
                message: "Please input the title of ",
              },
            ]}
          >
            <Select
              defaultValue="February"
              style={{
                width: 470,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "January",
                  label: "January ",
                },
                {
                  value: "february ",

                  label: "Frebruary",
                },
                {
                  value: "mars",
                  label: "Mars ",
                },
              ]}
            />
          </Form.Item>

          
          <Form.Item
            name="Hyphothesis"
            label="Hyphothesis"
            rules={[
              {
                required: true,
                message: "Please input the title of  ",
              },
            ]}
          >
            <TextArea
              
              rows={2}
            ></TextArea>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <div
      style={{
        textAlign: "right",
      }}
    >
      <Button
        className="Create-button"
        type="primary"
        style={{
          textAlign: "right",
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Create a new GL Account
      </Button>

      <CollectionCreateGlAcount
        open={open}
        onCreate={submite}
        onCancel={() => {
          setOpen(false);
          // onAddChamp();
        }}
      />

      <Select
        defaultValue="Select Financial Statement type"
        type="primary"
        style={{
          textAlign: "center",
          marginLeft: "2rem",
          width: 200,
        }}
        options={[
          {
            value: "Statement1 ",
            label: "Statement 1",
          },

          {
            value: "Statement2 ",
            label: "Statement 2",
          },
        ]}
      />

      <Table
      bordered
        rowSelection={rowSelection}
        columns={columnsGLAccount}
        dataSource={dataGLAccount}
      />

<h1
        style={{
          width: 80,
          height: 35,
          marginLeft: "2rem",
        }}
      >
        Hyphothesis
      </h1>
      <Button
        className="Create-button"
        type="primary"
        onClick={() => {
          setopenHyphothese(true);
        }}
        style={{
          textAlign: "right",
        }}
      >
        Create a new Hyphothesis
      </Button>
      <CollectionCreateHyphothesis
        openHyphothese={openHyphothese}
        OnopenHyphothese={OnopenHyphothese}
        onCancel={() => {
          setopenHyphothese(false);
          // onAddChamp();
        }}
      />



      
      <div>
        <Table bordered columns={columnsHyphothese} dataSource={dataHyphothese} />
      </div>
    </div>
  );
}

export default HyphotheseofGl;
