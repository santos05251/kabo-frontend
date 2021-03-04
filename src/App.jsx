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
import FinalStep from "./pages/onboardings/step-6";

function App() {
  return (
    <div className="h-screen container mx-auto padding-container">
      <Navbar />
      <div className="md:h-20 sm:h-14 h-24"> </div>
      <Alert />
      <div className="page-content absolute inset-x-0 md:top-20 sm:top-14 top-24 xl:px-6">
        <div className="page-routing">
          <BrowserRouter>
            <Switch>
              <Route path="/onboarding/checkout" component={FinalStep} />
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
  );
}

export default connect(null, null)(App);
