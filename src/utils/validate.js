const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const validateCreditCard = (creditCard) => {
  const re = /^[0-9]{15,16}$/;
  return re.test(creditCard);
}

const validateExpireDate = (expireDate) => {
  // MM/YY format
  const re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  return re.test(expireDate);
}

const validateCvc = (cvc) => {
  const re = /^[0-9]{3,4}$/;
  return re.test(cvc);
}

export const validate = {
  validateEmail,
  validateCreditCard,
  validateExpireDate,
  validateCvc,
};
