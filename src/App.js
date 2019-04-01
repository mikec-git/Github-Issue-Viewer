import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Home from './containers/Home/Home';
import List from './containers/List/List';
import Layout from './HOC/Layout/Layout';

import * as listActions from './store/actions/listActions';

class App extends Component {
  state = {
    pageState: 'landing'
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    if(parsed.repo && parsed.page && parsed.profile) {
      this.props.onGetIssues(parsed);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.isLoading && !this.props.isLoading && this.props.repo.repo && this.props.repo.profile) {
      this.setState({ pageState: 'list' });
    } else if(prevState.pageState === 'list' && this.props.count === 0) {
      this.setState({ pageState: 'landing' });
    }
  }
  
  render() {
    return (
      <Layout isLoading={this.props.isLoading}>
        <Route 
          path='/'
          render={() => <Home pageState={this.state.pageState} />} />
        <List 
          pageState={this.state.pageState}
          closeList={this.closeListHandler} />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.list.count,
    isLoading: state.list.isLoading,
    repo: state.list.repoInfo
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onGetIssues: (params) => dispatch(listActions.getIssues(params))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
