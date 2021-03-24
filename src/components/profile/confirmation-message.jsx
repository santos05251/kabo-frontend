import React from 'react';

const ConfirmationMessage = () => {
  return (
    <div className="text-center">
      <h3 className="text-xl font-medium mb-2">
        We've sent you confirmation email
      </h3>
      <div className="text-center mt-5 mb-10">
        <p>
          We’re sorry to see you go. We’ve sent you a confirmation email to{' '}
          <br />
          cancel your subscription.
        </p>
      </div>

      <a
        href="/profile"
        className="rounded-xl py-3 px-8 text-base font-bold bg-primary text-white"
      >
        Back to My Kabo
      </a>
    </div>
  );
};

export default ConfirmationMessage;
