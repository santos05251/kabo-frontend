import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./utils";
import { PrivateRoute, RedirectRoute, NonUserRoute } from "./route";
import LoginPage from "./pages/login";
import AccountPage from "./pages/account";
import AllOrdersPage from "./pages/order";
import { Navbar } from "./components/navbar";
import { Alert } from "./components/alert";
import ProfilePage from "./pages/profile";
import EditPlan from "./pages/meal-plan";
import OrderDetail from "./pages/order/detail";

import OnboardingSeparateVersion from "./pages/onboardings/separate-version";
import OnboardingCombinedVersion from "./pages/onboardings/combined-version";
import CheckoutStep from "./pages/onboardings/steps/checkout";
import CheckoutSuccess from "./pages/onboardings/steps/success";

function App() {
  return (
    <div className="bg-container">
      <div className="container flex mx-auto padding-container">
        <Navbar />
        <div className="md:h-20 sm:h-14 h-24"> </div>
        <Alert />
        <div className="w-1/5 hidden md:block" />
        <div className="page-content w-full md:w-4/5 mt-20  xl:px-6 bg-container relative">
          <div className="page-routing">
            <BrowserRouter>
              <Switch>
                <NonUserRoute
                  path="/checkout/:checkout_token"
                  component={CheckoutStep}
                />
                <NonUserRoute
                  path="/a/signup"
                  exact
                  component={OnboardingCombinedVersion}
                />
                <NonUserRoute
                  path="/b/signup"
                  exact
                  component={OnboardingSeparateVersion}
                />
                <Route path="/login" component={LoginPage} />
                <PrivateRoute path="/orders" exact component={AllOrdersPage} />
                <PrivateRoute path="/orders/:id" exact component={OrderDetail} />
                <PrivateRoute path="/edit-plan/:id" component={EditPlan} />
                <PrivateRoute path="/profile" component={ProfilePage} />
                <PrivateRoute component={AccountPage} />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, null)(App);
