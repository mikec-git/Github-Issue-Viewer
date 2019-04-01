import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import c from './Spinner.module.scss';

const spinner = (props) => {
  let spinnerClass = [c.Spinner];
  if(props.context === 'list') {
    spinnerClass.push(c.Spinner__List);
  }

  return (
    <CSSTransition
      in={props.isLoading}
      timeout={300}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: c.Spinner_enter,
        enterActive: c.Spinner_enterActive,
        enterDone: c.Spinner_enterDone,
        exit: c.Spinner_exit,
        exitActive: c.Spinner_exitActive,
        exitDone: c.Spinner_exitDone
      }}>
      <div className={spinnerClass.join(' ')}>
        <div className={c.Spinner__Rect_1}></div>
        <div className={c.Spinner__Rect_2}></div>
        <div className={c.Spinner__Rect_3}></div>
        <div className={c.Spinner__Rect_4}></div>
        <div className={c.Spinner__Rect_5}></div>
      </div>
    </CSSTransition>
  );
}
 
spinner.propTypes = {
  context: PropTypes.string,
  isLoading: PropTypes.bool.isRequired
}

export default spinner;