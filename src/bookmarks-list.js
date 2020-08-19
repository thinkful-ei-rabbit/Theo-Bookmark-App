
  
import $ from 'jquery';

import store from './store';
import api from './api';

const generateItemElement = function (item) {
  let itemTitle = `<span class="new page">${item.name}</span>`;
  if (!item.checked) {
    itemTitle = `
      <form class="js-edit-item">
        <input class="web-item" type="text" value="${item.name}" required />
      </form>
    `;
  }

  return `
    <li class="js-url-element" data-item-id="${item.id}">
      ${itemTitle}
      <div class="web-item-controls">
        <button class="js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
};

const generateWebString = function (pageList) {
  const items = pageList.map((item) => generateItemElement(item));
  return items.join('');
};

const generateError = function (message) {
  return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

const renderError = function () {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
};

const handleCloseError = function () {
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};

const render = function () {
  renderError();

  // Filter item list if store prop is true by item.checked === false
  let items = [...store.items];
  if (store.hideCheckedItems) {
    items = items.filter(item => !item.checked);
  }

  const webString = generateWebString(items);

  // insert that HTML into the DOM
  $('.js-url-list').html(webString);
};

const handleNewUrlSubmit = function () {
  $('#js-url-list-form').submit(function (event) {
    event.preventDefault();
    const newUrlName = $('.js-url-list-entry').val();
    $('.js-url-list-entry').val('');
    api.createItem(newUrlName)
      .then((newUrl) => {
        store.addItem(newUrl);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

const getUrlIdFromElement = function (item) {
  return $(item)
    .closest('.js-url-element')
    .data('item-id');
};

const handleDeleteItemClicked = function () {
  $('.js-url-list').on('click', '.js-item-delete', event => {
    const id = getUrlIdFromElement(event.currentTarget);

    api.deleteItem(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        renderError();
      });
  });
};

const handleEditUrlItemSubmit = function () {
  $('.js-url-list').on('submit', '.js-edit-item', event => {
    event.preventDefault();
    const id = getUrlIdFromElement(event.currentTarget);
    const itemName = $(event.currentTarget).find('.web-item').val();

    api.updateItem(id, { name: itemName })
      .then(() => {
        store.findAndUpdate(id, { name: itemName });
        render();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        renderError();
      });
  });
};

const handleItemCheckClicked = function () {
  $('.js-url-list').on('click', '.js-item-toggle', event => {
    const id = getItemIdFromElement(event.currentTarget);
    const item = store.findById(id);
    api.updateItem(id, { checked: !item.checked })
      .then(() => {
        store.findAndUpdate(id, { checked: !item.checked });
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

const handleToggleFilterClick = function () {
  $('.js-filter-checked').click(() => {
    store.toggleCheckedFilter();
    render();
  });
};

const bindEventListeners = function () {
  handleNewUrlSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditUrlItemSubmit();
  handleToggleFilterClick();
  handleCloseError();
};

// This object contains the only exposed methods from this module:
export default {
  render,
  bindEventListeners
};