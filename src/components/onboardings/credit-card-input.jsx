import React from "react";

const CreditCardInput = ({ value, setValue, ...rest }) => {
  let creditCardPattern = /^\d{0,16}$/g,
		creditCardSeparator = " ",
		creditCardInputOldValue,
    creditCardInputOldCursor;
  
  const mask = (value, limit, separator) => {
    var output = [];
    for (let i = 0; i < value.length; i++) {
      if ( i !== 0 && i % limit === 0) {
        output.push(separator);
      }
      
      output.push(value[i]);
    }
    
    return output.join("");
  };
  
  const unmask = (value) => value.replace(/[^\d]/g, '');

  const checkSeparator = (position, interval) => Math.floor(position / (interval + 1));
  
  const onKeyDown = (e) => {
    let el = e.target;
    creditCardInputOldValue = el.value;
    creditCardInputOldCursor = el.selectionEnd;
  };

  const onInput = (e) => {
    let el = e.target,
        newValue = unmask(el.value),
        newCursorPosition;
    
    if ( newValue.match(creditCardPattern) ) {
      newValue = mask(newValue, 4, creditCardSeparator);
      
      newCursorPosition = 
      creditCardInputOldCursor - checkSeparator(creditCardInputOldCursor, 4) + 
        checkSeparator(creditCardInputOldCursor + (newValue.length - creditCardInputOldValue.length), 4) + 
        (unmask(newValue).length - unmask(creditCardInputOldValue).length);
      
      el.value = (newValue !== "") ? newValue : "";
    } else {
      el.value = creditCardInputOldValue;
      newCursorPosition = creditCardInputOldCursor;
    }
    setValue(el.value);
    
    el.setSelectionRange(newCursorPosition, newCursorPosition);
  };

  return (
    <React.Fragment>
      <input
        {...rest}
        defaultValue={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        onInput={onInput}
      />
    </React.Fragment>
  );
};

export default CreditCardInput;
