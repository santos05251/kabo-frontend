import { React, useState } from 'react';
import { ReactComponent as OrderEnvelope } from '../../assets/images/order-envelope.svg';
import IndividualOrder from '../order/individualOrder';

const OrderTable = ({ orders, dogs, coupon, shippingAddress, showModal, handleCloseEvent, handleOpenEvent, noTitlePadding }) => {
  const [order, setOrder] = useState(null);
  const handleOrder = (ind) => {
    handleOpenEvent();
    setOrder(orders[ind]);
  }
  return (
    <div className="shadow-tableBoxShadow bg-white rounded-lg border pt-5 md:py-5 border-dullishWhite m-4 md:m-0">
      <div className="shadow-light mb-3 md:mb-7 border-b border-gray-300">
        <div className="flex px-8 pb-5 border-b-1 border-gray-700">
          <OrderEnvelope />
          <h2 className="ml-4 text-2xl font-extrabold hidden md:block">Kabo Orders</h2>
          <h2 className="ml-4 text-2xl font-extrabold  md:hidden">Recent Orders</h2>
        </div>
      </div>
      <div className="px-5 ">
        {/* Desktop Version */}
        <table className="table-fixed w-full hidden md:block">
          <thead>
            <tr>
              <th className={`text-sm text-left font-semibold ${!noTitlePadding && 'px-4'} pb-4`}>
                ORDER DATE
              </th>
              <th className={`text-sm text-left font-semibold ${!noTitlePadding && 'px-4'} pb-4`}>
                AMOUNT
              </th>
              <th className={`text-sm text-left font-semibold ${!noTitlePadding && 'px-4'} pb-4`}>
                SUMMARY
              </th>
              <th className={`text-sm text-left font-semibold ${!noTitlePadding && 'px-4'} pb-4`}>
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map(({
              date, total, plan, invoice_id, payment_status,
            }, index) => (
              <tr
                key={invoice_id}
                className={`${index % 2 === 0 && 'bg-lightGray rounded-xl'} ${
                  index !== orders.length - 1 && 'border-b border-gray-300'
                }`}
              >
                <td className="text-sm p-4 w-1/5">
                  <p className="pb-1">{date}</p>
                  {/* <Link to={`/orders/${invoice_id}`} className="text-primary">View Order</Link> */}
                  <a className="text-primary" onClick={() => handleOrder(index)}>View Order</a>
                </td>
                <td className="text-sm  p-4 w-1/5">
                  <span>{total}</span>
                  <br />
                </td>
                <td className="text-sm px-4 py-3 w-2/5">{plan}</td>
                <td className="text-sm px-4 py-3 w-1/5">{payment_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Mobile Version */}
        {orders.map(({
          date, total, plan, invoice_id, payment_status,
        }, index) => (
          <div
            key={invoice_id}
            className={`md:hidden px-4 py-5 ${
              index !== orders.length - 1 && 'border-b border-gray-300'
            }`}
          >
            <p className="text-sm pb-2">{payment_status}</p>
            <h2 className="text-lg font-bold font-cooper">{date}</h2>
            <p className="text-sm pb-2">{total}</p>
            <p className="text-sm pb-2">{plan}</p>
            <a className="text-primary pb-2" onClick={() => handleOrder(index)}>View Order</a>
          </div>
        ))}
      </div>
      <IndividualOrder
        item={order}
        dogs={dogs}
        coupon={coupon}
        shippingAddress={shippingAddress}
        showModal={showModal}
        onClose={handleCloseEvent}
      />
    </div>
  );
}
export default OrderTable;
