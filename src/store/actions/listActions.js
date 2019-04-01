import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getIssues = (params) => {
  return dispatch => {
    dispatch(getIssuesInit());
    const urlString = ['https://api.github.com/repos/', params.profile, '/', params.repo, '/issues?state=all', '&page=', params.page].join('');
    
    axios.get(urlString)
      .then(response => dispatch(getIssuesSuccess(response.data, params)))
      .catch(error => dispatch(getIssuesFail(error)));
  }
};

const getIssuesInit = () => {
  return { type: actionTypes.GET_ISSUES_INIT };
};

const getIssuesSuccess = (results, params) => {
  return { type: actionTypes.GET_ISSUES_SUCCESS, results, params };
};

const getIssuesFail = (error) => {
  return { type: actionTypes.GET_ISSUES_FAIL, error };
};

export const clearIssues = () => {
  return { type: actionTypes.CLEAR_ISSUES };
};

export const clearMessage = () => {
  return { type: actionTypes.CLEAR_MESSAGE };
};