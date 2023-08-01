// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import { formatDateTime } from "../../util/util";
import DashHeader from "../Dash/DashHeader";

const DetailsModal = ({ open, close, data, loading, name }) => {
  return ReactDOM.createPortal(
    <Modal open={open} loading={loading} close={close}>
      {name === "customer" && (
        <DashHeader text={data?.name} variant={"outline"} />
      )}
      {name === "hospital" && (
        <DashHeader text={data?.name} variant={"outline"} />
      )}
      {name === "manufacturer" && (
        <DashHeader text={data?.meta.org_name} variant={"outline"} />
      )}
      {name === "retailer" && (
        <DashHeader text={data?.meta.org_name} variant={"outline"} />
      )}

      <div className="productDetails__section-body">
        {name === "hospital" && (
          <>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Name:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.name}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Email:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.email}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Phone number:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.phone}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Id:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.id}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Registered on:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {formatDateTime(data?.created_at)}
              </p>
            </div>
          </>
        )}
        {name === "manufacturer" && (
          <>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">
                Manufacturer&apos;s name:
              </p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.meta.org_name}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">
                Manufacturer&apos;s email:
              </p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.meta.org_contact_email == null
                  ? "Empty"
                  : data?.meta.org_contact_email}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">
                Manufacturer&apos;s phone:
              </p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.meta.org_contact_phone == null
                  ? "Empty"
                  : data?.meta.org_contact_phone}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Address:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.meta.address[0].address}, {data?.meta.address[0].city},{" "}
                {data?.meta.address[0].country}.
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">
                Manufacturer&apos;s Reg. no.:
              </p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.meta.org_regNo}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">
                Manufacturer&apos;s Id:
              </p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.id}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Description:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.meta.org_desc}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Registered by:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.name}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">
                Registrant&apos;s email:
              </p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.email}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">
                Registrant&apos;s phone:
              </p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.phone}
              </p>
            </div>
          </>
        )}
        {name === "retailer" && (
          <>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Store name:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.meta.org_name}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Store email:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.meta.org_contact_email == null
                  ? "Empty"
                  : data?.meta.org_contact_email}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Store phone:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.meta.org_contact_phone == null
                  ? "Empty"
                  : data?.meta.org_contact_phone}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Store id:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.id}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">
                Store reg. number:
              </p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.meta.org_regNo}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Description:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.meta.org_desc}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Registered by:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.name}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">
                Registrant&apos;s email:
              </p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.email}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">
                Registrant&apos;s phone:
              </p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.phone}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Registered on:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {formatDateTime(data?.created_at)}
              </p>
            </div>
          </>
        )}
        {name === "customer" && (
          <>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Name:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.name}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Email:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.email}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Phone number:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.phone}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Id:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {data?.id}
              </p>
            </div>
            <div className="flex items-center gap-2 py-2">
              <p className="header__4 ink w-3/12 self-start">Registered on:</p>
              <p className="p4 secondary-disabled w-9/12 self-start">
                {formatDateTime(data?.created_at)}
              </p>
            </div>
          </>
        )}
      </div>
    </Modal>,
    document.body
  );
};

export default DetailsModal;
