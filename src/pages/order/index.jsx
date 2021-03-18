import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import Loader from "../../loaders/ordersPage";
import OrderTable from "../../components/global/OrderTable";
class AllOrdersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkout: false,
    };
  }

  componentDidMount() {
    this.props.getOrderData();
    this.props.getSubscriptionData();
  }

  render() {
    const { user, dogs, orders, loading } = this.props;
    return (
      <div className='container pb-40'>
        <div className='flex items-center flex-col md:mt-10 sm:mt-0 font-messina'>
          {loading ? (
              <Loader />
            ) : (
            <div>
              <OrderTable
                orders={orders}
                dogs={dogs}
                coupon={user.subscription? user.subscription.coupon : ''}
                shippingAddress={user.subscription? user.subscription.shipping_address: ''}
                showModal={this.state.checkout}
                handleCloseEvent={() => {
                  this.setState({ checkout: false });
                }}
                handleOpenEvent={() => {
                  this.setState({ checkout: true });
                }}
                background="bg-lightGray" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOrderData: () => dispatch(userActions.getOrderData()),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData()),
});

const mapStateToProps = (state) => {
  const {
    user: { subscriptions, dogs, orders, loading },
    user,
  } = state;

  return {
    subscriptions,
    dogs,
    user,
    orders,
    loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllOrdersPage);
