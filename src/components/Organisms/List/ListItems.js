import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../../Molecules/List/ListItem/ListItem';

import c from './ListItems.module.scss';

const listItems = (props) => {
  let issues = props.list.map(issue => {
    return (
      <React.Fragment key={issue.id}>
        <ListItem
          showType={props.showType}
          title={issue.title}
          body={issue.body}
          labels={issue.labels}
          state={issue.state}
          url={issue.html_url}
          pull={issue.pull_request}
          number={issue.number} />
      </React.Fragment>
    );
  })
  return ( 
    <div className={c.ListItems}>
      {issues}
    </div>
  );
}

listItems.propTypes = {
  showType: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired
}
 
export default listItems;