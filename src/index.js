import $ from 'jquery';

import 'normalize.css';
import './index.css';

import urlList from './bookmarks-list';
import store from './store';
import api from './api';

const main = function () {
  api.getItems()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      urlList.render();
    });
    urlList.bindEventListeners();
    urlList.render();
};

$(main);