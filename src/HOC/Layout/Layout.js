import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../../components/Atoms/UI/Footer/Footer';
import Spinner from '../../components/Atoms/UI/Spinner/Spinner';
import Message from '../../components/Atoms/UI/Message/Message';

import * as listActions from '../../store/actions/listActions';
import c from './Layout.module.scss';

class Layout extends Component {
  render() { 
    let messages = null;
    if(Array.isArray(this.props.messages) && this.props.messages.length > 0) {
      messages = this.props.messages.map(message => (
        <Message 
          key={message.id} 
          clearMessage={this.props.onClearMessage} 
          {...message} />
      ));
      
      messages = <div className={c.Layout__Message}>{messages}</div>;
    }

    return ( 
      <>
        {messages}
        <main className={c.Layout}>
          {this.props.children}
          <Spinner isLoading={this.props.isLoading} />
          <Footer />
        </main>
      </>
    );
  }
}

Layout.propTypes = {
  message: PropTypes.array,
  onClearMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    messages: state.list.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearMessage: () => dispatch(listActions.clearMessage())
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Layout);