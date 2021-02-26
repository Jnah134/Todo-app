import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeout);
  });
  return (
    <>
      <p className={`type type-${type}`}>{msg}</p>
    </>
  );
};

export default Alert;
