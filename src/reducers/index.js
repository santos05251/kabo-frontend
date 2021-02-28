import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { alert } from "./alert.reducer";
import { user } from "./user.reducer";
import { meal } from "./meal.reducer";
import { onboarding } from "./onboarding.reducer";

const rootReducer = combineReducers({
  authentication,
  alert,
  user,
  meal,
  onboarding,
});

export default rootReducer;
