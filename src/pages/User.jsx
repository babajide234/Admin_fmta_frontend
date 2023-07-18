// eslint-disable-next-line no-unused-vars
import React from "react";
import DashHeader from "../components/Dash/DashHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import UserTable from "../components/User/UserTable";
import VendorTable from "../components/User/VendorTable";
import UnverifiedTable from "../components/User/UnverifiedTable";
import ManufacturerTable from "../components/User/ManufacturerTable";



const User = () => {
  return (
    <main className="dashUser">
      <div className="dashUser__div-container">
        <DashHeader text={"Users"} />

        <div className="dashUser__div-body">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="dashUser__tab-container w-fit rounded-lg px-4 ">
              <TabsTrigger value="users" className="p4 secondary">
                Users
              </TabsTrigger>
              <TabsTrigger value="vendors" className="p4 secondary">
                Vendors
              </TabsTrigger>
              <TabsTrigger value="unverified" className="p4 secondary">
                Unverified vendors
              </TabsTrigger>
              <TabsTrigger value="manufacturers" className="p4 secondary">
                Manufacturers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <UserTable />
            </TabsContent>
            <TabsContent value="vendors">
              <VendorTable />
            </TabsContent>
            <TabsContent value="unverified">
              <UnverifiedTable />
            </TabsContent>
            <TabsContent value="manufacturers">
              <ManufacturerTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default User;
