// import store from '/.store'

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/theo/bookmarks';

const bookmarksTemplate= function(name, rating, description){

  return{

    name,
    //rating,
   // description
  };


};
//add rating and description back
const apiFetch = function(name){

  const postBookmark={
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bookmarksTemplate(name))
  };
  return  postBookmark;
};

// const deleteBookmark = function ()

// const editBookmark = function ()


export default{
  BASE_URL,
  bookmarksTemplate,
  apiFetch,
  //deletBookmark,
  //editBookmark
};