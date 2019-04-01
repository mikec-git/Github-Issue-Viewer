import React from 'react';
import PropTypes from 'prop-types';
import c from './Input.module.scss';

const input = (props) => {
  let inputClasses = [c.Input];
  let styles = [c.Input__Field];
  
  if(props.context === 'landing') {
    styles.push(c.Input__Field_landing);
  } 

  if(!props.isValid) {
    inputClasses.push(c.Input_notValid);
  }

  return (
    <div className={inputClasses.join(' ')}>
      <input 
        {...props.config}
        className={styles.join(' ')}
        onChange={props.inputHandler}
        onKeyPress={(e) => e.key === 'Enter' && props.searchHandler()} />
      <svg 
        className={c.Input__Search}
        xmlns="http://www.w3.org/2000/svg" 
        onClick={props.searchHandler}
        viewBox="0 0 48 48">
        <path d="M34.3 30.2h-2.2l-.8-.8c2.7-3.1 4.3-7.2 4.3-11.6C35.7 8 27.7 0 17.8 0S0 8 0 17.8s8 17.8 17.8 17.8c4.4 0 8.5-1.6 11.6-4.3l.8.8v2.2L43.9 48l4.1-4.1-13.7-13.7zm-16.5 0c-6.8 0-12.3-5.5-12.3-12.3S11 5.5 17.8 5.5 30.2 11 30.2 17.8s-5.5 12.4-12.4 12.4z"/>
      </svg>
    </div>
  );
}

input.propTypes = {
  context: PropTypes.string,
  isValid: PropTypes.bool,
  contif: PropTypes.object,
  inputHandler: PropTypes.func.isRequired,
  searchHandler: PropTypes.func.isRequired
}
 
export default input;