import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";

const EditRoleInput = ({ role, onFinish }) => {
  const [editForm] = Form.useForm();
  useEffect(() => {
    editForm.setFieldsValue({ name: role.name });
  }, [role, editForm]);

  const handleSubmit = () => {
    editForm
      .validateFields()
      .then((values) => {
        onFinish(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Form
      form={editForm}
      onFinish={(values) => {
        onFinish(values);
      }}
    >
      <Form.Item
        style={{ margin: 0 }}
        name="name"
        rules={[{ required: true, message: "Please input the role name!" }]}
      >
        <Input size="medium" onPressEnter={handleSubmit} />
      </Form.Item>
    </Form>
  );
};

export default EditRoleInput;
