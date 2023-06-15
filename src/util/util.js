export const SIDEBARMENU = [
  {
    name: 'Home',
    url: '/',
    icon: 'Home',
  },
  {
    name: 'Products',
    url: '/products',
    icon: 'Shopping_cart',
  },
];

export const iconStyle = { width: '26px', height: '20px', color: '#001973' };
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

