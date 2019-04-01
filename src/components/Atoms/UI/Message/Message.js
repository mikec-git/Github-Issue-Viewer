import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import c from './Message.module.scss';

class Message extends Component {
  state ={ 
    enter: true
  }

  componentDidMount() {
    this.animationTimeoutId = setTimeout(() => this.setState({ enter: false }), this.props.duration - 500);
    this.timeoutId = setTimeout(this.props.clearMessage, this.props.duration);
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimeoutId);
  }
  
  closeMessageHandler = () => {
    clearTimeout(this.timeoutId);
    this.props.clearMessage();
  }
  
  render() {
    const classNames = [c.Message];
  
    if(this.props.type === 'success') {
      classNames.push(c.Message_success);
    } else if(this.props.type === 'danger') {
      classNames.push(c.Message_danger);
    } else if(this.props.type === 'warning') {
      classNames.push(c.Message_warning);
    }
  
    return (
      <CSSTransition
        in={this.state.enter}
        appear
        timeout={300}
        classNames={{
          appear: c.Message_appear,
          appearActive: c.Message_appear_active,
          enterDone: c.Message_enter_done,
          exit: c.Message_exit,
          exitActive: c.Message_exit_active,
          exitDone: c.Message_exit_done
        }}>
        <div className={classNames.join(' ')}>
          <svg           
            onClick={this.closeMessageHandler}
            className={c.Message__Close} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 212.982 212.982" 
            xml="preserve">
            <path d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312
            c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312
            l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937
            c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"/>
          </svg>
          <h3 className={c.Message__Text}>{this.props.message}</h3>
        </div>
      </CSSTransition>
    );
  }
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  clearMessage: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired
}
 
export default Message;