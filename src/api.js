import store from './store';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/theo/bookmarks';

const bookmarksTemplate = JSON.stringify(store.bookmarks);

//add rating and description back

const apiFetch = function(...args){

  let error;
  return fetch(...args)
    .then(results => {
      if (!results.ok) {
        console.log(results);
        error = { code: results.status };
      }
      if (!results.headers.get('Content-Type').includes('json')) {
        error.message = results.statusText;
        return Promise.reject(error);
      }
      return results.json();
    }).then(items => {
      if (error) {
        error.message = items.message;
        return Promise.reject(error);
      }
      return items;
    });
};

const getBookmarks = function(){
  return apiFetch (BASE_URL);
};


const createBookmark = function(template){
  const newBookmark= JSON.stringify(template);
  console.log("look", newBookmark)
 
  return fetch(`${BASE_URL}`,{
  
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body:  newBookmark
  });
};
const deleteBookmark = function (id) {
  return fetch(BASE_URL + "/" +id, {
    method: 'DELETE'
  });

};

// const editBookmark = function ()


export default{
  BASE_URL,
  getBookmarks,
  bookmarksTemplate,
  apiFetch,
  createBookmark,
  deleteBookmark,
  //editBookmark
};