import React from "react";

const OrderTable = ({ orders }) => (
  <table className="table-fixed w-full">
    <thead>
      <tr>
        <th className="text-sm text-left font-semibold px-4 pb-4">
          PAYMENT DATE
        </th>
        <th className="text-sm text-left font-semibold px-4 pb-4">AMOUNT</th>
        <th className="text-sm text-left font-semibold px-4 pb-4">STATUS</th>
        <th className="text-sm text-left font-semibold px-4 pb-4">INVOICE ID</th>
      </tr>
    </thead>
    <tbody>
      {orders.map(({ date, total, plan, invoice_id, card }, index) => (
        <tr
          key={invoice_id}
          className={index % 2 === 0 && "bg-lightGray rounded-xl"}
        >
          <td className="text-sm p-4">{date}</td>
          <td className="text-sm  p-4">
            <span className="font-bold ">{total}</span>
            <br />
            <p className="pt-1"> {plan} </p>
          </td>
          <td className="text-sm px-4 py-3">
            Paid <br />
            <p className="pt-1"> {card}</p>
          </td>
          <td className="text-sm px-4 py-3">{invoice_id}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
export default OrderTable;
