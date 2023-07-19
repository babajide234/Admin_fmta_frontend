//eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import DataTable from "./Datable";
import PropTypes from "prop-types";

const Table = ({ columns, getData, filter }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }

    fetchData();
  }, [getData]);

  return (
    <div className="container mx-auto py-5">
      <DataTable columns={columns} data={data} filter={filter} />
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.any,
  getData: PropTypes.any,
  filter: PropTypes.string,
};

export default Table;
