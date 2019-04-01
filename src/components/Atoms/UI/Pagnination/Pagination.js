import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import c from './Pagination.module.scss';

const pagination = (props) => {
  const [page, setPage] = useState(props.page);

  useEffect(() => {
    if(page !== props.page) setPage(props.page);
  }, [props.page])
  
  return (
    <div className={c.Pagination}>
      <svg 
        className={[c.Pagination__Arrow, c.Pagination__Arrow_left].join(' ')}
        onClick={() => props.changePageArrow('left')}
        xmlns="http://www.w3.org/2000/svg" 
        xml="preserve" 
        viewBox="0 0 640 640">
        <g><polygon 
          points="529.884,-0.0118112 369.347,-0.0118112 110.116,320 369.347,640.012 529.884,640.012 270.641,320 "/></g>
      </svg>
      <input 
        className={c.Pagination__Input} 
        type="text" 
        value={page}
        onChange={(e) => !isNaN(e.target.value) && setPage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && props.changePage(page)} />
      <svg 
        className={[c.Pagination__Arrow, c.Pagination__Arrow_right].join(' ')} 
        onClick={() => props.changePageArrow('right')}
        xmlns="http://www.w3.org/2000/svg" 
        xml="preserve" 
        viewBox="0 0 640 640">
        <g><polygon   
          points="529.884,-0.0118112 369.347,-0.0118112 110.116,320 369.347,640.012 529.884,640.012 270.641,320 "/></g>
      </svg>
    </div>
  );
}

pagination.propTypes = {
  page: PropTypes.number.isRequired,
  changePageArrow: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired
}
 
export default pagination;