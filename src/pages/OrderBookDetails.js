import React,{ useContext, useEffect, useRef, useState } from 'react'
import { useLocation,useParams } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popconfirm, Table, Space, Card, Modal,DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? ( 
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const data = [
  // {
  //   key: '1',
  //   name: 'John Brown',
  //   age: 32,
  //   address: 'New York Park',
  // },
  // {
  //   key: '2',
  //   name: 'Jim Green',
  //   age: 40,
  //   address: 'London Park',
  // },
];
const OrderBookDetails = (props) => {
    const d1 = new Date();  
    const result = moment(d1).format('MM-DD-YYYY');

    // const current = new Date();
    // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const {id}=useParams();
    const [count, setCount] = useState(2);
    const stateParamVal = useLocation().state.stateParam;
    console.log('props parametre value',id);
    console.log('props state value',stateParamVal);
    
    const [dataSource, setDataSource] = useState([
      {
        key: count,
        name: `Client no. ${count}`,
        startdate: `${result}`,
        enddate:`${result}`,
        description:"description",
        tarif:"0",
        janv:'0',
        fev:'0',
        mars:'0',
        avril:"0",
        mars:"0",
        avril:'0',
        mai:"0",
        juin:'0',
        juillet:'0',
        aout:"0",
        septembre:"0",
        octobre:"0",
        novembre:"0",
        decembre:"0",
        total:"0",
      },
    ]);

    const handleDelete = (key) => {
      const newData = dataSource.filter((item) => item.key !== key);
      setDataSource(newData);
    };
    const defaultColumns = [
      {
        title: 'Client name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        editable: true,
      },
      {
        title: 'Start date',
        width: 120,
        dataIndex: 'startdate',
        key: 'startdate',
        fixed: 'left',
        editable: true,
      },
      {
        title: 'End date',
        dataIndex: 'enddate',
        width: 100,
        editable: true,
        key: 'enddate',
      },
      {
        title: 'Description',
        dataIndex: 'description',
            width: 100,
        key: 'description',
        editable: true,
      },
      {
        title: 'Tarif ($)',
        dataIndex: 'tarif',
            width: 70,
        key: 'tarif',
        editable: true,
      },
      {
        title: 'Janvier',
        dataIndex: 'janv',
            width: 70,
        key: 'janv',
        editable: true,
      },
      {
        title: 'Février',
        dataIndex: 'fev',
            width: 70,
        key: 'fev',
        editable: true,
      },
      {
        title: 'Mars',
        dataIndex: 'mars',
            width: 70,
        key: 'mars',
        editable: true,
      },
      {
        title: 'Avril',
        dataIndex: 'avril',
            width: 70,
        key: 'avril',
        editable: true,
      },
      {
        title: 'Mai',
        dataIndex: 'mai',
            width: 70,
        key: 'mai',
        editable: true,
      },
      {
        title: 'Juin',
        dataIndex: 'juin',
            width: 70,
        key: 'juin',
        editable: true,
      },
      {
        title: 'Juillet',
        dataIndex: 'juillet',
            width: 70,
        key: 'juillet',
        editable: true,
      },
      {
        title: 'Aout',
        dataIndex: 'aout',
            width: 70,
        key: 'aout',
        editable: true,
      },
      {
        title: 'Septembre',
        dataIndex: 'septembre',
            width: 80,
        key: 'septembre',
        editable: true,
      },
      {
        title: 'Octobre',
        dataIndex: 'octobre',
            width: 70,
        key: 'octobre',
        editable: true,
      },
      {
        title: 'Novembre',
        dataIndex: 'novembre',
            width: 80,
        key: 'novembre',
        editable: true,
      },
      {
        title: 'Decembre',
        dataIndex: 'decembre',
            width: 80,
        key: 'decembre',
        editable: true,
      },
      
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        fixed: 'right',
        width: 65,
        // render: () => <a>action</a>,
      },
      // {
      //   title: 'Creation Date',
      //   dataIndex: 'date',
      // },
      // {
      //   title: 'Name',
      //   dataIndex: 'name',
      //   editable: true,
      // },
      {
        title: 'operation',
        dataIndex: 'operation',
        fixed: 'right',
        width: 100,
        render: (_, record) =>
          dataSource.length >= 1 ? (
            <Space size="middle">
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
              </Popconfirm>
              {console.log('record.key',record.key)}
            </Space>
            
          ) : null,
      },
    ];
    const handleAdd = () => {
      const newData = {
        key: count,
        name: `Client no. ${count}`,
        startdate: `${result}`,
        enddate:`${result}`,
        description:" description",
        tarif:"0",
        janv:'0',
        fev:'0',
        mars:'0',
        avril:"0",
        mars:"0",
        avril:'0',
        mai:"0",
        juin:'0',
        juillet:'0',
        aout:"0",
        septembre:"0",
        octobre:"0",
        novembre:"0",
        decembre:"0",
        total:"0",

      };
      setDataSource([...dataSource, newData]);
      setCount(count + 1);
    };
    const handleSave = (row) => {
      const newData = [...dataSource];
      const index = newData.findIndex((item) => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setDataSource(newData);
    };
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = defaultColumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }),
      };
    });
  return (
    <Card
      bordered={false}
      className="header-solid mb-24"
      title={
          <h6 className="font-semibold">Order Book n° {stateParamVal}</h6>
      }
    >
       <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        components={components}
        columns={columns}
        rowClassName={()=>'editable-row'}
        dataSource={dataSource}
        scroll={{
          x: 1300,
        }}
      />
    </Card>
  )
}

export default OrderBookDetails