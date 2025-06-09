import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Label = ({ htmlFor, className, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx("text-sm font-medium text-gray-700", className)}
    >
      {children}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
