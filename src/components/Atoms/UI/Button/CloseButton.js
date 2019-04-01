import React from 'react';
import PropTypes from 'prop-types';

import c from './CloseButton.module.scss';

const closeButton = (props) => {
  return (
    <div 
      className={c.CloseButton} 
      onClick={props.closeList}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path className={c.CloseButton__Path} d="M48 4.8L43.2 0 24 19.2 4.8 0 0 4.8 19.2 24 0 43.2 4.8 48 24 28.8 43.2 48l4.8-4.8L28.8 24 48 4.8z"/>
      </svg>
    </div>
  );
}

closeButton.propTypes = {
  closeList: PropTypes.func.isRequired
}
 
export default closeButton;