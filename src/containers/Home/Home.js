import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as listActions from '../../store/actions/listActions';

import Title from '../../components/Atoms/UI/Title/Title';
import Input from '../../components/Atoms/UI/Input/Input';

import c from './Home.module.scss';

class Home extends Component {
  state = {
    urlIsValid: true,
    searchValue: ''
  }

  componentDidUpdate(prevProps) {
    if(prevProps.pageState === 'landing' && this.props.pageState === 'list') {
      this.setState({ searchValue: '' });
    }
  }
  
  searchForRepoHandler = () => {
    let result = this.validateInput(this.state.searchValue);
    if(result) {
      result.page = 1;
      this.props.onGetIssues(result);
    }
  }

  validateInput = (url) => {
    let re = /(?:github.com\/)([^\/]+)(?:\/)([^\/]+)/i;
    let result = url.match(re);

    if(result && result !== '' && result[1] && result[2]) {
      this.setState({ urlIsValid: true });
      return {profile: result[1], repo: result[2]};
    }

    this.setState({ urlIsValid: false });
  }
  
  inputChangeHandler = (e) => this.setState({ searchValue: e.target.value });

  render() { 
    const inputConfig = {
      type: 'text',
      placeholder: 'Paste a link to a GitHub repo!',
      value: this.state.searchValue
    };

    return (
      <div className={c.Home}>
        <div className={c.Home__Input}>
          <Title 
            text='GitHub Issue Viewer'
            context='landing' />
          <Input 
            isValid={this.state.urlIsValid}
            config={inputConfig}
            context='landing'
            inputHandler={this.inputChangeHandler}
            searchHandler={this.searchForRepoHandler} />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  pageState: PropTypes.string.isRequired,
  onGetIssues: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    onGetIssues: (params) => dispatch(listActions.getIssues(params))
  }
};
 
export default connect(null, mapDispatchToProps)(Home);