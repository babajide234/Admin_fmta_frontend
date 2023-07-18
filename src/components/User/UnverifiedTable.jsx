// eslint-disable-next-line no-unused-vars
import React from 'react'
import Table from "../../components/tables/table";
import unverifiedColumn from './column/unverifiedColumn'

async function getData() {
  // Fetch data from your API here.
  return [
    {
      name: "Daniel Olumide",
      email: "danielolumide@testmail.com",
      phone: "234800000090",
      store: 'DannyVee',
      role: 'Retailer',
      verify: 'FMT-001',
      timestamp: "2024-01-07 11:50:10",
    },
  ];
}

const UnverifiedTable = () => {
  return (
    <div className="dashUser__div-table">
      <Table getData={getData} columns={unverifiedColumn} filter={"name"} />
    </div>
  )
}

export default UnverifiedTable