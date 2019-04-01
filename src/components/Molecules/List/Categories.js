import React from 'react';
import PropTypes from 'prop-types';
import Category from '../../Atoms/List/Category';

import c from './Categories.module.scss';

const categories = (props) => {
  const items = props.categories.map(category => {
    return (
      <Category 
        key={category.type}
        activeType={props.activeType}
        name={category.name}
        type={category.type}
        changeListState={props.changeListState} />
    );
  })

  return ( 
    <ul className={c.Categories}>
      {items}
    </ul>
  );
}

categories.propTypes = {
  categories: PropTypes.array.isRequired,
  changeListState: PropTypes.func.isRequired,
  activeType: PropTypes.string.isRequired
}
 
export default categories;