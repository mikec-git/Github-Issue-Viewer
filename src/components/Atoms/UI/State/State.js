import React from 'react';
import PropTypes from 'prop-types';
import c from './State.module.scss';

const state = (props) => {
  let issueState = null;
  if(props.stateType === 'closed') {
    issueState = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path className={c.State_icon} d="M32 14.2L27.2 19l8 8.2L48 14.4l-4.8-4.8-7.9 7.9-3.3-3.3zM22.4 40c-8.8 0-16-7.2-16-16s7.2-16 16-16c4.4 0 8.4 1.8 11.3 4.7l4.5-4.5c-4.1-4.1-9.7-6.6-15.8-6.6C10 1.6 0 11.6 0 24s10 22.4 22.4 22.4 22.4-10 22.4-22.4l-10 10c.4-.5-3.8 6-12.4 6zm3.2-28.8h-6.4v16h6.4v-16zm-6.4 25.6h6.4v-6.4h-6.4v6.4z"/>
      </svg>
    );
  } else if(props.stateType === 'pull') {
    issueState = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 48">
        <path className={c.State_icon} d="M7.2 3.2C3.7 3.2.8 6.1.8 9.6.8 12 2.1 14 4 15.1v21C2.1 37.2.8 39.2.8 41.6c0 3.5 2.9 6.4 6.4 6.4s6.4-2.9 6.4-6.4c0-2.4-1.3-4.4-3.2-5.5v-21c1.9-1.1 3.2-3.2 3.2-5.5 0-3.5-2.9-6.4-6.4-6.4zm0 41.6c-1.8 0-3.2-1.4-3.2-3.2 0-1.8 1.4-3.2 3.2-3.2 1.8 0 3.2 1.4 3.2 3.2 0 1.8-1.4 3.2-3.2 3.2zm0-32C5.4 12.8 4 11.4 4 9.6s1.4-3.2 3.2-3.2c1.8 0 3.2 1.4 3.2 3.2S9 12.8 7.2 12.8zM36 36.1V16c0-9.6-9.6-9.6-9.6-9.6h-3.2V0l-9.6 9.6 9.6 9.6v-6.4h3.2c2.8 0 3.2 3.2 3.2 3.2v20.1c-1.9 1.1-3.2 3.1-3.2 5.5 0 3.5 2.9 6.4 6.4 6.4s6.4-2.9 6.4-6.4c0-2.4-1.3-4.4-3.2-5.5zm-3.2 8.7c-1.8 0-3.2-1.4-3.2-3.2 0-1.8 1.4-3.2 3.2-3.2 1.8 0 3.2 1.4 3.2 3.2 0 1.8-1.4 3.2-3.2 3.2z"/>
      </svg>
    );
  }

  return <div className={c.State}>{issueState}</div>;
}

state.propTypes = {
  stateType: PropTypes.string.isRequired
}
 
export default state;