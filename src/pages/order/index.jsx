import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import Loader from "../../loaders/ordersPage";
import OrderTable from "../../components/global/OrderTable";
class AllOrdersPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("order component mounted:");
    this.props.getOrderData();
  }

  render() {
    const { orders } = this.props;
  
    return (
      <div className='container pb-40 bg-white'>
        <div className='flex items-center flex-col mt-10'>
          <div className='mb-14'>
            <div className='text-3xl text-center mb-2'>Recent Orders</div>
            <div className='text-xs text-center'>
              You will receive an email confirmation shortly.
            </div>
          </div>
          {orders.length !== 0 ? (
            <div>
              <OrderTable orders={orders} background="bg-lightGray" />
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOrderData: () => dispatch(userActions.getOrderData()),
});

const mapStateToProps = (state) => {
  const {
    user: { subscriptions, dogs, orders },
    user,
  } = state;

  return {
    subscriptions,
    user,
    orders,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrdersPage);
