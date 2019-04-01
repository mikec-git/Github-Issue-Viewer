import React from 'react';
import PropTypes from 'prop-types';
import c from './Title.module.scss';

const title = (props) => {
  let styles = [c.Title];

  if(props.context === 'header') {
    styles.push(c.Title__Header);
  } else if(props.context === 'landing') {
    styles.push(c.Title__Landing);
  } else if(props.context === 'list') {
    styles.push(c.Title__List);
  }

  return (
    <h1 className={styles.join(' ')}>
      {props.text}
    </h1>
  );
}

title.propTypes = {
  context: PropTypes.string,
  text: PropTypes.string.isRequired
}
 
export default title;