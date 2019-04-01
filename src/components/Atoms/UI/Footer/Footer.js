import React from 'react';
import github from '../../../../assets/img/github.svg';
import c from './Footer.module.scss';

const footer = () => {
  return (
    <p className={c.Footer}>
      Powered By &nbsp;
      <img 
        className={c.Footer__Icon}
        src={github} alt="GitHub Logo"/>
    </p>
  );
}
 
export default footer;