import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./utils";
import { PrivateRoute, RedirectRoute, NonUserRoute } from "./route";
import LoginPage from "./pages/login";
import AccountPage from "./pages/account";
import AllOrdersPage from "./pages/order";
import { Navbar } from "./components/navbar";
import { LoginNav } from "./components/navbar/login-nav";
import { Alert } from "./components/alert";
import { EventPageViews } from "./components/analytic-events";
import ProfilePage from "./pages/profile";
import EditPlan from "./pages/meal-plan";
import OrderDetail from "./pages/order/detail";
import ReactivationPage from './pages/reactivation';

import OnboardingVersionB from './pages/onboardings/separate-version';
import OnboardingVersionA from './pages/onboardings/combined-version';
import CheckoutStep from './pages/onboardings/steps/checkout';
import ManageSubscription from './pages/profile/manage-subscription';
import CheckoutSuccess from './pages/onboardings/steps/success';
import { HorizontalNav } from "./components/navbar/horizontal-nav";

function App() {
  const [navHeight, setNav] = useState(0);
  const isSubcriptionPage = window.location.pathname.includes('manage-subscription');
  const isMealPlanPage = window.location.pathname.includes('/edit-plan')
  useEffect(() => {
    let findNavHeight = document.getElementById('outer-container') && document.getElementById('outer-container').clientHeight + 20 || '2rem';
    if (findNavHeight > 200 && !isSubcriptionPage) {
      findNavHeight = '2rem'
    } else {
      findNavHeight = 0
    }
    setNav(findNavHeight)
  }, [])

  const loginPage = window.location.pathname.includes('login');
  const isSignupPage = window.location.pathname.includes('checkout') || window.location.pathname.includes('signup')
  return (
    <div className="bg-container min-h-screen">
      {loginPage && <LoginNav />}
      {(isMealPlanPage || isSubcriptionPage) && <HorizontalNav />}
      <div className={`container flex mx-auto ${!isSubcriptionPage && "padding-container"}`}>
        {!isSubcriptionPage && !loginPage && !isMealPlanPage && !isSignupPage && <Navbar />}
        <div className="md:h-20 sm:h-14 h-24"> </div>
        <Alert />
        {!loginPage && !isSubcriptionPage && <div className="w-1/5 hidden md:block" />}
        <div style={{ marginTop: navHeight }} className={`page-content w-full ${!loginPage && !isSubcriptionPage && 'md:w-4/5 mt-8 xl:px-6'} bg-container relative`}>
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
                  component={OnboardingVersionA}
                />
                <NonUserRoute
                  path="/b/signup"
                  exact
                  component={OnboardingVersionB}
                />
                <Route path="/login" component={LoginPage} />
                <PrivateRoute path="/orders" exact component={AllOrdersPage} />
                <PrivateRoute
                  path="/orders/:id"
                  exact
                  component={OrderDetail}
                />
                <PrivateRoute path="/edit-plan/:id" component={EditPlan} />
                <PrivateRoute path="/profile" component={ProfilePage} />
                <PrivateRoute
                  path="/manage-subscription"
                  exact
                  component={ManageSubscription}
                />
                <PrivateRoute path="/reactivate/:dog_id" exact component={ReactivationPage} />
                <PrivateRoute path="/unpause/:dog_id" exact component={ReactivationPage} />
                <PrivateRoute component={AccountPage} />
              </Switch>
              <EventPageViews/>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, null)(App);
