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
    this.props.getOrderData();
  }

  render() {
    const { orders, loading } = this.props;
    console.log(orders);
    return (
      <div className='container pb-40 bg-white'>
        <div className='flex items-center flex-col md:mt-10 sm:mt-0 font-messina'>
          {loading ? (
              <Loader />
            ) : (
            <div>
              <OrderTable orders={orders} background="bg-lightGray" />
            </div>
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
    user: { subscriptions, dogs, orders, loading },
    user,
  } = state;

  return {
    subscriptions,
    user,
    orders,
    loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrdersPage);
