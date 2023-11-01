export const SIDEBARMENU = [
  {
    name: "Home",
    url: "/",
    icon: "Home",
  },
  {
    name: "Orders",
    url: "/orders",
    icon: "Box",
  },
  // {
  //   name: "User",
  //   url: "/users",
  //   icon: "User",
  // },

];

export const MARKUPLIST = [
  {
    name: "product",
    value: 20,
  },
  {
    name: "category",
    value: 13,
  },
  {
    name: "local",
    value: 10,
  },
  {
    name: "international",
    value: 20,
  },
];

export const UNITS = [
  {
    id: 1,
    name: "Units",
  },
  {
    id: 2,
    name: "Pieces",
  },
  {
    id: 3,
    name: "Carton",
  },
  {
    id: 4,
    name: "Container",
  },
];
export const SHIPPING = [
  {
    id: 1,
    name: "DHL",
  },
  {
    id: 2,
    name: "FedEx",
  },
  {
    id: 3,
    name: "GIGM",
  },
];
export const iconStyle = { width: "26px", height: "20px", color: "#001973" };

export const formatDateTime = (isoDateTimeString) => {
  const dateTime = new Date(isoDateTimeString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return dateTime.toLocaleString("en-US", options);
};
export const size = [
  { id: 1, name: "Cartons" },
  { id: 2, name: "Pieces" },
  { id: 3, name: "Units" },
];

export const USERROLE = [
  {
    id: 5,
    name: "manufacturer",
    guard_name: "web",
  },
  {
    id: 6,
    name: "retailer",
    guard_name: "web",
  },
];
export const CardDetail3 = [
  {
    text: "Profile Settings",
    subText: "Make changes to your personal account.",
    to: "/profile",
    btn: "Edit your profile",
  },
  {
    text: "My organization",
    subText: "See and make changes to your organization information.",
    to: "/organization",
    btn: "Make changes",
  },
];
export const getNameByIsoCode = (isoCode = "", array = [{}]) => {
  if (array === null || array.length === 0) {
    return "";
  } else {
    const foundItem = array.find((item) => item.isoCode === isoCode);
    return foundItem ? foundItem.name : "";
  }
};
export const getNameById = (id = "", array = [{}]) => {
  if (array === null || array.length === 0) {
    return "";
  } else {
    const foundItem = array.find((item) => item.id === id);
    return foundItem ? foundItem.name : "";
  }
};
