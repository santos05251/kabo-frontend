import { all } from 'redux-saga/effects';

import authentication from './authentication.saga';
import user from './user.saga';
import meal from './mealPlan.saga';
import onboarding from './onboarding.saga';

export default function* rootSaga() {
  yield all([authentication(), user(), meal(), onboarding()]);
}
