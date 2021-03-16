import React from "react";

const ExpirationInput = ({ value, setValue, ...rest }) => {
  let expirationPattern = /^\d{0,4}$/g,
    expirationSeparator = "/",
    expirationInputOldValue,
    expirationInputOldCursor;
  
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

  const onKeyDown = (e) => {
    let el = e.target;
    expirationInputOldValue = el.value;
    expirationInputOldCursor = el.selectionEnd;
  };

  const onInput = (e) => {
    let el = e.target,
        newValue = el.value;
    
    newValue = unmask(newValue);
    if ( newValue.match(expirationPattern) ) {
      newValue = mask(newValue, 2, expirationSeparator);
      el.value = newValue;
    } else {
      el.value = expirationInputOldValue;
    }
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

export default ExpirationInput;
