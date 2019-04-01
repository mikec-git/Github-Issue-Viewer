import React from 'react';
import Title from '../Title/Title';
import c from './Header.module.scss';

const header = () => {
  return (
    <div className={c.Header}>
      <div className={c.Header__Title}>
        <Title 
          context='header'
          text='GitHub Issue Viewer' />
      </div>
    </div>
  );
}
 
export default header;