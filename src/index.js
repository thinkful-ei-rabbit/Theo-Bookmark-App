import $ from 'jquery';
import 'normalize.css';
import './index.css';
import bookmarkList from './bookmarks-list';
import store from './store';
import api from './api';

const main = function () {
  bookmarkList.generateHomePage();
  bookmarkList.bindEventListeners();
  //bookmarkList.render();
};

$(main);