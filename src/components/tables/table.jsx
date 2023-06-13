// import React from 'react';

// const Table = () => {
//   return (
//     <section className="table orderTable ">
//       <div className="orderTable-container  table_grid2">
//         <div className="adminTable__header  header__4">
//           <span className="adminTable__Id-cell">Product Name</span>
//           <span className="adminTable__Id-cell">Price</span>
//           <span className="adminTable__Id-cell">M.O.Q</span>
//           <span className="adminTable__Id-cell">Discount</span>
//           <span className="adminTable__Id-cell">Vendor Name</span>
//           <span className="adminTable__Id-cell">Date Created</span>
//           <span className="adminTable__Id-cell">Approved</span>
//           <span className="adminTable__Id-cell">Type</span>
//           <span className="adminTable__Id-cell">Action</span>
//         </div>
//         <div className="adminTable__content">
//           <div className="adminTable__row-table  ">
//             <span className="adminTable__row-cell">list</span>
//             <span className="adminTable__row-cell">List</span>
//             <span className="adminTable__row-cell">List</span>
//             <span className="adminTable__row-cell">List</span>
//             <span className="adminTable__row-cell">List</span>
//             <span className="adminTable__row-cell">List</span>
//             <span className="adminTable__row-cell">List</span>
//             <span className="adminTable__row-cell">List</span>
//             <span className="adminTable__row-cell">List</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Table;

import React from 'react';

const Table = () => {
  return (
    <section className="orderTable">
      <div className="orderTable-container">
        <div className="orderTable__header grid-8 grid-xs-3 grid-sm-3 grid-md-3 header__4">
          <span className="orderTable__orderId-cell">Product Name</span>
          <span className="orderTable__orderId-cell  xs-hide sm-hide md-hide">
            Price
          </span>
          <span className="orderTable__orderId-cell">M.O.Q</span>
          <span className="orderTable__orderId-cell">Discount</span>
          <span className="orderTable__orderId-cell">Vendor Name</span>
          <span className="orderTable__orderId-cell">Date Created</span>
          <span className="orderTable__orderId-cell">Type</span>
          <span className="orderTable__orderId-cell">Action</span>
        </div>
        <div className="orderTable__content">
          <div className="orderTable__row-table grid-8 grid-xs-3 grid-sm-3 grid-md-3 p4 ">
            <span className="orderTable__row-cell">Hospital Ward Bed</span>
            <span className="orderTable__row-cell  xs-hide sm-hide md-hide">
              USD 2,340
            </span>
            <span className="orderTable__row-cell">5</span>
            <span className="orderTable__row-cell">0%</span>
            <span className="orderTable__row-cell">FMT Store</span>
            <span className="orderTable__row-cell">2021-01-07</span>
            <span className="orderTable__row-cell"> Retailer</span>
            <span className="orderTable__row-cell"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Table;
