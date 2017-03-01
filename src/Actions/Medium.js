import http from 'http';
import FeedMe from 'feedme';

export function fetchMediumFeed (userId) {
  return dispatch => {

    dispatch({ type: 'FETCHING_MEDIUM_STORIES', for: userId });

    http.get(`https://medium.com/feed/@${userId}`, res => {
      if (res) {
        const parser = new FeedMe(true);
        res.pipe(parser);
        parser.on('end', () => {
          dispatch({ type: 'FETCHED_MEDIUM_STORIES', data: parser.done() });
        });
      } else {
        dispatch({ type: 'MEDIUM_STORIES_FETCH_ERROR', for: userId });
      }
    });

  }
}
