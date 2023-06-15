//eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import columns from "./column";
import DataTable from "./Datable";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      name: "Hospital Ward Bed",
      price: 100,
      vendor: "FMT Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: "Z Z Hospital Ward Bed",
      price: 100,
      vendor: "ACDStore",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: "F Hospital Ward Bed",
      price: 100,
      vendor: "DER Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "NA",
    },
    {
      name: "Q Hospital Ward Bed",
      price: 100,
      vendor: "FMT Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "NA",
    },
    {
      name: " W Hospital Ward Bed",
      price: 100,
      vendor: "DER Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "NA",
    },
    {
      name: "Z Hospital Ward Bed",
      price: 100,
      vendor: "ASD Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: " A Hospital Ward Bed",
      price: 100,
      vendor: "ABC Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: "D Hospital Ward Bed",
      price: 100,
      vendor: "CVX Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: "A Hospital Ward Bed",
      price: 100,
      vendor: "DET Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: "B Hospital Ward Bed",
      price: 100,
      vendor: "FRR Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    {
      name: "A Hospital Ward Bed",
      price: 100,
      vendor: "FRRC Store",
      type: "retailer",
      date: "2021-01-07 11:50:10",
      approved: "approved",
    },
    // ...
  ];
}

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Table;
