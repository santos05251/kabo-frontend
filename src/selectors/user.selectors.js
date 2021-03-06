const selectSubscriptions = (state) => (state.user.subscriptions ? state.user.subscriptions : {});

const selectSubscriptionByDogId = (state, dogId) => {
  const subscriptions = selectSubscriptions(state);
  let subscription = null;
  //  eslint-disable-next-line  no-restricted-syntax
  for (const key in subscriptions) {
    if (
    //  eslint-disable-next-line  no-prototype-builtins
      subscriptions.hasOwnProperty(key)
      && subscriptions[key]
      && +subscriptions[key].dog_id === +dogId
    ) {
      subscription = subscriptions[key];
    }
  }
  return subscription;
};

const selectDogs = (state) => (state.user && state.user.dogs ? state.user.dogs : []);

const selectDogByIndex = (state, index) => {
  const dogs = selectDogs(state);
  return dogs[index] || {};
};

const selectSubscriptionByDogIndex = (state, index) => {
  const dog = selectDogByIndex(state, index);
  if (dog && dog.id) {
    return selectSubscriptionByDogId(state, dog.id);
  }
  return null;
};

const selectUserLoadingByKey = (state, key) => (state.user.loadingKeys
  ? state.user.loadingKeys[key]
  : null);

export const userSelectors = {
  selectSubscriptions,
  selectSubscriptionByDogId,
  selectDogs,
  selectDogByIndex,
  selectSubscriptionByDogIndex,
  selectUserLoadingByKey,
};
