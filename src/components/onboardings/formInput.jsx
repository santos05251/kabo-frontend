import React from "react";
import InputMask from "react-input-mask";
import CreditCardInput from "./credit-card-input";
import ExpirationInput from "./expiration-input";
import EditableDropdown from "../global/editableDropdown";

const firstLetter = /(?!.*[DFIOQU])[A-VXY]/i;
const letter = /(?!.*[DFIOQU])[A-Z]/i;
const digit = /[0-9]/;
const postal_mask = [firstLetter, digit, letter, " ", digit, letter, digit];

const FormInput = ({
  label = "",
  type = "text",
  placeholder = "",
  required = false,
  validation,
  validationText = "",
  value,
  onChange,
  className,
  options = [],
  ...features
}) => {
  return (
    <div className={`${className} ${validation === undefined || validation ? 'border-gray-300' : 'border-red-400'}`}>
      <label className="flex justify-between mb-1 text-gray-700 font-messina font-medium">
        { label }{ required && <span className="text-red-500">*</span> }
      </label>
      { type === 'credit' 
        ? <CreditCardInput
            className="bg-transparent w-full font-messina"
            value={ value }
            placeholder={ placeholder }
            setValue={(value) => onChange(value)}
          />
        : type === 'expiration'
          ? <ExpirationInput
              className="bg-transparent w-full font-messina"
              value={ value }
              placeholder={ placeholder }
              setValue={(value) => onChange(value)}
            />
          : type === 'instructions'
            ? <EditableDropdown
                className="bg-transparent w-full font-messina"
                options={options}
                value={ value }
                placeholder={ placeholder }
                setValue={(value) => onChange(value)}
              />
              : type === 'postal'
                ? <InputMask
                    className="bg-transparent w-full font-messina"
                    mask={postal_mask}
                    value={ value }
                    placeholder={ placeholder }
                    onChange={(event) => onChange(event.target.value.toUpperCase())}
                  />
                  : type === 'phone'
                    ? <InputMask
                        className="bg-transparent w-full font-messina"
                        mask="+1 (999) 999-99-99"
                        value={ value }
                        placeholder={ placeholder }
                        onChange={(event) => onChange(event.target.value)}
                      />
                    : <input
                        { ...features }
                        type={ type }
                        placeholder={ placeholder }
                        className="bg-transparent w-full font-messina"
                        value={ value }
                        onChange={ (event) => onChange(event.target.value) }
                      />
      }
      { validation !== undefined && !validation && validationText.length > 0 &&
        <label className="text-red-500 font-messina text-xs">
          { validationText }
        </label>
      }
    </div>
  );
};

export default FormInput;
