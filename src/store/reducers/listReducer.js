import * as actionTypes from '../actions/actionTypes';
import * as storeUtil from '../utility/storeUtility';

const initialState = {
  isLoading: false,
  count: 0,
  results: [],
  error: [],
  repoInfo: {
    repo: null,
    profile: null,
    page: 0
  }
};

const getIssuesInit = (state, action) => {
  return { 
    ...state, 
    isLoading: true
  };
}

const getIssuesSuccess = (state, action) => {
  let results = action.results.length > 0 ? action.results : state.results;
  let page = action.results.length > 0 ? +action.params.page : +state.repoInfo.page;
  const count = results.length;
  let error = [...state.error];
  if(action.results.length === 0) {    
    error.push({id: Date.now(), duration: 4500, type: 'warning', message: 'There\'s no issues on that page!'});
  } 

  return {
    ...state, 
    isLoading: false, 
    error, 
    results, 
    count, 
    repoInfo: {
      ...state.repoInfo, 
      ...action.params,
      page
    }};
};

const getIssuesFail = (state, action) => {
  let code = action.error.response.status;
  let error = {id: Date.now(), duration: 4500, type: 'danger'};
  switch (code) {
    case 404:      
    error.message = 'Sorry...that repository couldn\'t be found!';
    break;  
    case 400:      
    error.message = 'Your link isn\'t valid!';
    break;  
    case 401:      
      error.message = 'Sorry...we couldn\'t access your request!';
      break;  
      case 403:
      error.message = 'Sorry...we couldn\'t access your request!';
      break;  
      case 500:
      error.message = 'Something went wrong while fetching the repo...';
      break;  
      case 504:
      error.message = 'Your request timed out!';    
      break;  
      default:
      error.message = 'Something went wrong...please try again!';
      break;
  }
  
  let newError = [...state.error, error];
  return {...state, isLoading: false, error: newError, count: 0, results: [] };
};

const clearIssues = (state, action) => {
  return { 
    ...state, 
    isLoading: false, 
    results: [], 
    count: 0, 
    repoInfo: {
      repo: null,
      profile: null,
      page: 0
    }
  };
};

const clearMessage = (state, action) => {
  const newErrors = state.error.slice(1);
  return { ...state, error: newErrors };
}

const reducer = storeUtil.createReducer(initialState, {
  [actionTypes.GET_ISSUES_INIT]: getIssuesInit,
  [actionTypes.GET_ISSUES_SUCCESS]: getIssuesSuccess,
  [actionTypes.GET_ISSUES_FAIL]: getIssuesFail,
  [actionTypes.CLEAR_ISSUES]: clearIssues,
  [actionTypes.CLEAR_MESSAGE]: clearMessage
});

export default reducer;