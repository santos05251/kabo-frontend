import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./utils";
import { PrivateRoute, PublicRoute } from "./route";
import LoginPage from "./pages/login";
import AccountPage from "./pages/account";
import AllOrdersPage from "./pages/order";
import { Navbar } from "./components/navbar";
import { Alert } from "./components/alert";
import ProfilePage from "./pages/profile";
import EditPlan from "./pages/meal-plan";
import OrderDetail from "./pages/order/detail";
import { RedirectRoute } from "./route/RedirectRoute";

import OnboardingSeparateVersion from "./pages/onboardings/separate-version";
import OnboardingCombinedVersion from "./pages/onboardings/combined-version";
import FinalStep from "./pages/onboardings/step-6";

function App() {
  return (
    <div className="h-screen container mx-auto sm-container">
      <Navbar />
      <div className="md:hidden h-24"> </div>
      <Alert />
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/onboarding/checkout" component={FinalStep} />
          <PublicRoute
            path="/a/signup"
            exact
            component={OnboardingCombinedVersion}
          />
          <PublicRoute
            path="/b/signup"
            exact
            component={OnboardingSeparateVersion}
          />
          <Route path="/redirect" exact component={RedirectRoute} />
          <PublicRoute path="/login" component={LoginPage} />
          <PrivateRoute path="/orders" exact component={AllOrdersPage} />
          <PrivateRoute path="/orders/:id" exact component={OrderDetail} />
          <PrivateRoute path="/edit-plan/:id" component={EditPlan} />
          <PrivateRoute path="/profile" component={ProfilePage} />

          <PrivateRoute component={AccountPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default connect(null, null)(App);
