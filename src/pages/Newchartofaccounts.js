import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Divider,
    DatePicker,
    Space
  } from 'antd';
  import { useState } from 'react';
  const { Option } = Select;
  const residences = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  const formItemLayout = {

    labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 8 },
        lg: { span: 8 } 
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 12 },
        lg: { span: 12 }
      }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

const Newchartofaccounts = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select
          style={{
            width: 70,
          }}
        >
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      </Form.Item>
    );
    const suffixSelector = (
      <Form.Item name="suffix" noStyle>
        <Select
          style={{
            width: 70,
          }}
        >
          <Option value="USD">$</Option>
          <Option value="CNY">¥</Option>
        </Select>
      </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const onWebsiteChange = (value) => {
      if (!value) {
        setAutoCompleteResult([]);
      } else {
        setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
      }
    };
    const websiteOptions = autoCompleteResult.map((website) => ({
      label: website,
      value: website,
    }));
    return (
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Divider orientation="left">Account</Divider>

        <Form.Item
          name="glaccount"
          label="GL account number"
          rules={[
            {
              type: 'number',
              min: 0,
              message: 'value cannot be less than 0',
    
            },
          ]}
    
        >
          <InputNumber />
        </Form.Item>
  
        <Form.Item
          name="description"
          label="Description"
         
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="confirm"
          label="Code GIFI"
          rules={[
            {
              type: 'number',
              min: 0,
              message: 'value cannot be less than 0',
    
            },
          ]}
    
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Inactive Account"
          name="inactive_account"
          valuePropName="checked"
          
        >
          <Checkbox/>
          
        </Form.Item>

        <Divider orientation="left">Classification Options</Divider>

        <Form.Item
          name="classification"
          label="Classification"
         
        >
          <Select placeholder="Dépense">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Divider orientation="left">Additional information</Divider>

        <Form.Item
        {...formItemLayout}

        name="since"
        label="History since"
        
        >
            <DatePicker format={"YYYY-MM-DD"} size={'large'}/>
        </Form.Item>
        <Form.Item
            name="annualbudget"
            label="Annual budget"
            
        
            >
            <InputNumber addonAfter="$" />
        </Form.Item>
        <Form.Item
          label="Breakdown of automatic budgets"
          name="breakdown_of_automatic_budgets"
          valuePropName="checked"
          
        >
          <Checkbox/>
          
        </Form.Item>
        <Form.Item
          label="Follow-up of real"
          name="follow-up_of_real"
          valuePropName="checked"
          
        >
          <Checkbox/>
          
        </Form.Item>
        <Divider orientation="left">Note</Divider>

        <Form.Item
          name="intro"
          label="Description"
         
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>
  
        
        <Divider>    </Divider>
        <Form.Item {...tailFormItemLayout}>
            <Space>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button htmlType="submit">
            Return
          </Button>
          <Button danger htmlType="submit">
            Delete
          </Button>
          </Space>
        </Form.Item>
      </Form>
    );
}

export default Newchartofaccounts