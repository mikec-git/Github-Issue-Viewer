import React from 'react';
import PropTypes from 'prop-types';
import c from './Label.module.scss';

const label = (props) => {
  const style = {
    backgroundColor: `#${props.bgColor}`
  };

  return (    
    <div className={c.Label} style={style}>
      <span className={c.Label__Text}>
        {props.name}
      </span>
    </div>
  );
}

label.propTypes = {
  bgColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
 
export default label;