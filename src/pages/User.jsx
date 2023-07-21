// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import DashHeader from "../components/Dash/DashHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import VendorTable from "../components/User/VendorTable";
import ManufacturerTable from "../components/User/ManufacturerTable";
import HospitalTable from "../components/User/HospitalTable";
import CustomerTable from "../components/User/CustomerTable";
import DetailsModal from "../components/Modal/DetailsModal";

const User = () => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <main className="dashUser">
      <div className="dashUser__div-container">
        <DashHeader text={"Users"} />

        <div className="dashUser__div-body">
          <Tabs defaultValue="customer" className="w-full">
            <TabsList className="dashUser__tab-container w-fit rounded-lg px-4 ">
              <TabsTrigger value="customer" className="p4 secondary">
                Customers
              </TabsTrigger>
              <TabsTrigger value="vendors" className="p4 secondary capitalize">
                Retailers
              </TabsTrigger>
              <TabsTrigger
                value="manufacturers"
                className="p4 secondary capitalize"
              >
                Manufacturers
              </TabsTrigger>
              <TabsTrigger value="hospital" className="p4 secondary capitalize">
                hospitals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="customer">
              <CustomerTable
                setOpen={setOpen}
                setData={setData}
                setName={setName}
              />
            </TabsContent>
            <TabsContent value="vendors">
              <VendorTable
                setOpen={setOpen}
                setData={setData}
                setName={setName}
              />
            </TabsContent>
            <TabsContent value="manufacturers">
              <ManufacturerTable
                setOpen={setOpen}
                setData={setData}
                setName={setName}
              />
            </TabsContent>
            <TabsContent value="hospital">
              <HospitalTable
                setOpen={setOpen}
                setData={setData}
                setName={setName}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {open && (
        <DetailsModal
          data={data}
          name={name}
          loading={true}
          close={() => setOpen(!open)}
          open={open}
        />
      )}
    </main>
  );
};

export default User;
