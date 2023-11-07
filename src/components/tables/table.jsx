//eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import DataTable from "./Datable";
import PropTypes from "prop-types";
// import { useQuery } from "react-query";

const Table = ({ columns, filter, data = [] }) => {
  return (
    <div className="mx-auto py-5">
      <DataTable columns={columns} data={data.data} filter={filter} />
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.any,
  getData: PropTypes.any,
  filter: PropTypes.string,
  data: PropTypes.array,
};

export default Table;
