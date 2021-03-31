import React from "react";
import PhoneInput from 'react-phone-number-input/input'

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      type = "default",
      inputType = "default",
      size = "",
      styles = "",
      inputValue = "",
      disabled,
      onChange,
      required,
      maxLength = null,
      showCounter,
    } = this.props;

    return (
      <>
        {type == "default" && (
          <div
            className={`border rounded h-14 ${size} ${styles} inline-block relative`}
          >
            <label htmlFor={name} className='m-1 ml-2.5 text-xs'>
              {name}
            </label>

            <br />
            <input
              required
              type={inputType}
              disabled={disabled}
              onChange={onChange}
              id={name}
              maxlength={maxLength}
              defaultValue={inputValue}
              className='outline-none w-4/5 text-grey-darkest text-sm h-5 mb-2.5 ml-2.5'
            ></input>
            {required && (
              <div className=' rounded-full bg-red-500 w-1 h-1 absolute top-2 right-2'></div>
            )}
          </div>
        )}
        {type == "large" && (
          <div className={`border rounded relative border-textarea ${showCounter ? 'h-26.5' : 'h-20'}`}>
            <label htmlFor='input' className='m-1 text-xs'>
              {name}
            </label>
            <br />
            <textarea
              required
              id='input'
              maxlength={maxLength}
              onChange={onChange}
              defaultValue={inputValue}
              style={{ width: '95%' }}
              className={`outline-none text-copyPrimary ml-2.5 h-11 mb-2.5 text-sm resize-none ${showCounter && 'pb-1.75'}`}
            />
            {showCounter && (
              <div
                className="absolute font-messina text-placeholder text-xs leading-4 bottom-2.5 right-3.5 md:right-2 md:bottom-1.5"
              >
                50 characters
              </div>
            )}
          </div>
        )}
        {type == "tel" && (
          <div
            className={`border rounded h-14 ${size} ${styles} inline-block relative`}
          >
            <label htmlFor={name} className='m-1 ml-2.5 text-xs'>
              {name}
            </label>

            <br />
            <PhoneInput
              country="US"
              required
              disabled={disabled}
              onChange={onChange}
              id={name}
              value={inputValue}
              className='outline-none w-4/5 text-grey-darkest text-sm h-5 mb-2.5 ml-2.5'
            />
            {required && (
              <div className=' rounded-full bg-red-500 w-1 h-1 absolute top-2 right-2'></div>
            )}
          </div>
        )}
      </>
    );
  }
}

export default Input;
