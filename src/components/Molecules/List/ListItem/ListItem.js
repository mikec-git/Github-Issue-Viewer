import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Title from '../../../Atoms/UI/Title/Title';
import Label from '../../../Atoms/UI/Label/Label';
import State from '../../../Atoms/UI/State/State';
import c from './ListItem.module.scss';

const listItem = (props) => {
  let labels = null;
  if(props.labels.length > 0) {
    labels = props.labels.map(label => {
      return (
        <React.Fragment key={label.id}>
          <Label
            name={label.name}
            desc={label.description}
            bgColor={label.color} />
        </React.Fragment>
      )
    });

    labels = (
      <div className={c.ListItem__Labels}>
        {labels}
      </div>
    );
  }

  let body = props.body;
  let bodyClasses = [c.ListItem__Body];
  if(body && body.length > 100) {
    body = props.body.substring(0, 150) + '...'
  } else if(!body || body.length === 0) {
    body = 'No description provided.';
    bodyClasses.push(c.ListItem__Body_empty);
  }

  let issueState = null;
  if(props.state === 'closed' || !!props.pull) {
    let stateTypes = null;
    if(props.state === 'closed' && !!props.pull) {
      stateTypes = [props.state, 'pull'];
    } else if(props.state === 'closed') {
      stateTypes = [props.state];
    } else {
      stateTypes = ['pull'];
    }

    issueState = stateTypes.map(type => {
      return (
        <React.Fragment key={type}>
          <State stateType={type} />
        </React.Fragment>
      );
    });

    issueState = <div className={c.ListItem__State}>{issueState}</div>
  }

  return (
    <CSSTransition
      in={props.showType === 'all' || props.showType === props.state || (props.showType === 'pull' && !!props.pull)}
      timeout={300}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: c.ListItem_enter,
        enterActive: c.ListItem_enterActive,
        enterDone: c.ListItem_enterDone,
        exit: c.ListItem_exit,
        exitActive: c.ListItem_exitActive,
        exitDone: c.ListItem_exitDone
      }}>
      <div className={c.ListItem}>
        {issueState}
        <a 
          href={props.url} 
          rel='noopener noreferrer' 
          className={c.ListItem__Header}
          target='_blank'>
          <Title 
            text={props.title + ' #' + props.number}
            context='list' />
        </a>
        <p className={bodyClasses.join(' ')}>{body}</p>
        {labels}
      </div>
    </CSSTransition>
  );
}

listItem.propTypes = {
  labels: PropTypes.array.isRequired,
  body: PropTypes.string.isRequired,
  showType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  pull: PropTypes.object,
}
 
export default listItem;