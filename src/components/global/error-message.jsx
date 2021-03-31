import React from 'react';
import DogComputer from '../../assets/images/dog-computer.svg';

const ErrorMessage = () => {
  return (
      <div className="text-center mt-5">
        <img
          src={DogComputer}
          alt="Error Icon"
          className="mx-auto w-28 h-28 md:w-40 md:h-40"
        />
        <p className="font-cooper font-medium text-lg md:text-xl mb-2 mt-3">Something went wrong</p>
        <p className="font-cooper font-normal text-base md:text-lg">Please refresh your page to try again</p>
      </div>
  );
};

export default ErrorMessage;
