import React, { useState } from 'react';
import { Tabs, Table } from 'antd';

const { TabPane } = Tabs;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

const data = [
  { key: '1', id: '001', name: 'John' },
  { key: '2', id: '002', name: 'Jane' },
  { key: '3', id: '003', name: 'Bob' },
];

const Testpage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleTabChange = () => {
    setSelectedRowKeys([]);
  };

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const tab1Content = (
    <Table
      columns={columns}
      dataSource={data}
      rowSelection={{
        type: 'radio',
        selectedRowKeys: selectedRowKeys,
        onChange: handleRowSelection,
      }}
    />
  );

  const tab2Content = (
    <Table
      columns={columns}
      dataSource={data}
      rowSelection={{
        type: 'radio',
        selectedRowKeys: selectedRowKeys,
        onChange: handleRowSelection,
      }}
    />
  );

  return (
    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
      <TabPane tab="Tab 1" key="1">
        {tab1Content}
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        {tab2Content}
      </TabPane>
    </Tabs>
  );
};

export default Testpage;
