// eslint-disable-next-line no-unused-vars
import React from "react";
import Table from "../../components/tables/table";
import userColumn from "./column/userColumn";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      name: "Daniel Olumide",
      email: "danielolumide@testmail.com",
      phone: "234800000090",
    },
  ];
}

const UserTable = () => {
  return (
    <div className="dashUser__div-table">
      <Table getData={getData} columns={userColumn} filter={"name"} />
    </div>
  );
};

export default UserTable;
