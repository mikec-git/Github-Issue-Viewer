import React from 'react';
import PropTypes from 'prop-types';
import c from './Category.module.scss';

const category = (props) => {
  let itemClasses = [c.Category];
  if(props.activeType === props.type) {
    itemClasses.push(c.Category_active);
  }
  
  return ( 
    <li 
      className={itemClasses.join(' ')}
      onClick={() => props.changeListState(props.type)}>
      {props.name}
    </li>
  );
}

category.propTypes = {
  activeType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  changeListState: PropTypes.func.isRequired
}
 
export default category;