// eslint-disable-next-line no-unused-vars
import React from "react";
import Table from "../../components/tables/table";
import manufacturerColumn from "./column/manufacturerColumn";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      name: "Daniel Olumide",
      email: "danielolumide@testmail.com",
      phone: "234800000090",
      store: "DannyVee",
      role: "Manufacturer",
      approved: "approved",
      timestamp: "2024-01-07 11:50:10",
    },
  ];
}

const ManufacturerTable = () => {
  return (
    <div className="dashUser__div-table">
      <Table getData={getData} columns={manufacturerColumn} filter={"name"} />
    </div>
  );
};

export default ManufacturerTable;
