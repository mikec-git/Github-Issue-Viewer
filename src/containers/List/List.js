import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import Header from '../../components/Atoms/UI/Header/Header';
import ListItems from '../../components/Organisms/List/ListItems';
import Categories from '../../components/Molecules/List/Categories';
import CloseButton from '../../components/Atoms/UI/Button/CloseButton';
import Pagination from '../../components/Atoms/UI/Pagnination/Pagination';
import Spinner from '../../components/Atoms/UI/Spinner/Spinner';

import * as listActions from '../../store/actions/listActions';
import c from './List.module.scss';

class List extends Component {
  state = {
    currentListState: 'all',
    listTypes: [
      {type: 'all', name: 'All Issues'},
      {type: 'open', name: 'Open Issues'},
      {type: 'closed', name: 'Closed Issues'},
      {type: 'pull', name: 'Pull Requests'}
    ]
  };

  componentDidUpdate(prevProps) {
    const repo = this.props.repo;
    if(repo.repo && repo.profile && repo.page !== prevProps.repo.page) {  
      this.props.history.push(
        `/repos?repo=${repo.repo}&profile=${repo.profile}&page=${repo.page}`
      );
    }
  }
  
  changeCurrentListStateHandler = (listState) => {
    if(this.state.currentListState !== listState) {
      this.setState({ currentListState: listState });
    }
  }

  changePageArrowHandler = (direction) => {
    if(!this.props.isLoading && this.props.count > 0) {
      if(direction === 'left' && this.props.repo.page > 1) {
        let newRepoInfo = {...this.props.repo, page: +this.props.repo.page-1};
        this.props.onGetIssues(newRepoInfo);
      } else if(direction === 'right') {
        let newRepoInfo = {...this.props.repo, page: +this.props.repo.page+1};
        this.props.onGetIssues(newRepoInfo);
      }
    }
  }

  changePageEnter = (pageNum) => {
    if(!this.props.isLoading && pageNum > 0 && pageNum !== this.props.repo.page) {
      this.props.onGetIssues({...this.props.repo, page: +pageNum});
    }
  }

  closeListHandler = () => {
    this.props.onClearIssues();
    this.setState({ currentListState: 'all' });
  }

  render() { 
    let issues = <p className={c.List__NoIssues}>No issues found!</p>;
    if(this.props.count > 0) {
      issues = (
        <ListItems
          showType={this.state.currentListState} 
          list={this.props.list} />
      );
    } 

    let transitionClassses = {
      enter: c.List_enter,
      enterActive: c.List_enterActive,
      enterDone: c.List_enterDone,
      exit: c.List_exit,
      exitActive: c.List_exitActive,
      exitDone: c.List_exitDone
    }
    
    return ( 
        <CSSTransition
          in={this.props.pageState === 'list' || this.props.list.length > 0}
          timeout={300}
          mountOnEnter
          unmountOnExit
          classNames={transitionClassses}
          onExit={() => this.props.history.push('/')}>          
          <>
            <div className={c.List}>
              <Header />
              <div className={c.List__Body}>
                <div className={c.List__Categories}>
                  <Categories 
                    activeType={this.state.currentListState}
                    categories={this.state.listTypes}
                    changeListState={this.changeCurrentListStateHandler} />
                  <Pagination
                    page={this.props.repo.page}
                    changePage={this.changePageEnter}
                    changePageArrow={this.changePageArrowHandler} />
                </div>
                <CSSTransition
                  in={!this.props.isLoading && !!this.props.repo.repo && !!this.props.repo.profile}
                  timeout={200}
                  mountOnEnter
                  classNames={transitionClassses}>
                  {issues}
                </CSSTransition>
              </div>
              <CloseButton
                type='close'
                closeList={this.closeListHandler} />
            </div>
            <Spinner 
              isLoading={this.props.isLoading}
              context='list' />
          </>
        </CSSTransition>    
    );
  }
}

List.propTypes = {
  list: PropTypes.array,
  onClearIssues: PropTypes.func.isRequired,
  onGetIssues: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  repo: PropTypes.object.isRequired,  
  count: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    list: state.list.results,
    count: state.list.count,
    repo: state.list.repoInfo,
    isLoading: state.list.isLoading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClearIssues: () => dispatch(listActions.clearIssues()),    
    onGetIssues: (params) => dispatch(listActions.getIssues(params))
  }
};
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));