import $ from 'jquery';
import 'normalize.css';
import './index.css';
import bookmarkList from './bookmarks-list';
import store from './store';
import api from './api';

const main = function () {

  api.getBookmarks() 
  .then(res => {
    console.log("These are the res", res)
    res.forEach(item => {
      console.log(item)
      store.addBookmark(item)
      bookmarkList.render()
    })
  } )
  bookmarkList.generateHomePage();
  bookmarkList.bindEventListeners();
  //bookmarkList.render();
};

$(main);