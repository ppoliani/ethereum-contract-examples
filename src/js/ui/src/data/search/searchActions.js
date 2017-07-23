import map from 'folktale/fantasy-land/map'
import {createAction} from 'redux-actions'
import fetch from '../../services/api'

export const GET_SEARCH_RESULTS= 'SEARCH::GET_SEARCH_RESULTS';

const DUMMY_URL = 'https://jsonplaceholder.typicode.com/posts/1';

export const getSearchResultsRoot = fetch => {
  // ToDo(Pavlos): construct the url with the search criteria
  const getUrl = searchCriteria => DUMMY_URL;
  const fetchData = (fetch) ['∘'] (getUrl);

  const transformData = searchResults => {
    //Todo(Pavlos): implement the real transformation function
    return searchResults;
  }

  return createAction(
    GET_SEARCH_RESULTS,
    (map.curried(transformData)) ['∘'] (fetchData)
  );
};

export const getSearchResults = getSearchResultsRoot(fetch);
