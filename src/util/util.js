export const SIDEBARMENU = [
  {
    name: "Home",
    url: "/",
    icon: "Home",
  },
  {
    name: "Products",
    url: "/products",
    icon: "Shopping_cart",
  },
  {
    name: "Categories",
    url: "/categories",
    icon: "List",
  },
  {
    name: "User",
    url: "/users",
    icon: "User",
  },
  {
    name: "Markup",
    url: "/markup",
    icon: "Plus",
  },
  {
    name: "Orders",
    url: "/orders",
    icon: "Box",
  },
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
  }
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
  { id: 1, name: "SM" },
  { id: 2, name: "MD" },
  { id: 3, name: "L" },
  { id: 4, name: "XL" },
  { id: 5, name: "XXL" },
];
