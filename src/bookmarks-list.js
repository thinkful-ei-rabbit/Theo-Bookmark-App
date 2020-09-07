
  
import $ from 'jquery';
import store from './store';
import api from './api';



////////render templates////////

const homePage = function(){
  return `   
  <h1>Bookmark App</h1>
  <div class ="container">
  <button id= "addNew">create new bookmark</button>
  <div class="filter-box">
  <label for="filter-checked">Filter by Rating</label>
  <select id="filter-rating">
  <option value="0" name="no filter">no filter</option>
  <option value="1" name="One">1-✪</option>
  <option value="2" name="Two">2-✪✪</option>
  <option value="3" name="Three">3-✪✪✪</option>
  <option value="4" name="Four">4-✪✪✪✪</option>  
  <option value="5" name="Five">5-✪✪✪✪✪</option>   
  </select>
  </div>
  </div>
  ${generateStore()}`;


};

const expandedItem= function(i){ 
  filterByRating()
  return `
  <li class= "oneListItem" data-bookmark-id ="${store.bookmarks[i].id}">
        
  <div id="name">${store.bookmarks[i].title}</div> 
  <br>
  <div id="urlName"><a href="${store.bookmarks[i].url}">${store.bookmarks[i].url}</a></div> 
  <br>
  <div id="description"> ${store.bookmarks[i].desc} </div>
  <br>
  <div id="rating"> rating: ${store.bookmarks[i].rating} </div>

  <div class="item-controls">
  <button class="js-item-delete">
    <span class="button-label">delete</span>
  </button>
  <button class ="js-item-condense">
  <span class ="button-label">condense</span>
  </button>
  </div>
  </li>
  `; 
};

const condensedItem = function(i){
  return `
    <li data-bookmark-id ="${store.bookmarks[i].id}">
        
    <div id="name">${store.bookmarks[i].title}</div>
    <div class="item-controls">
    <button class="js-item-delete">
      <span class="button-label">delete</span>
    </button>
    <button class ="js-item-expand">
    <span class ="button-label">expand</span>
  </button>
  </div>`;
};

const NewBookmarkPage = function(){
  return `<div class="form-container">
  <h2> Create a new Bookmark! </h2> 

   <form id="js-url-list-form" name="js-url-list-form">
   <fieldset>
   <section class ="js-url-ratings">
   <select name = "rating" id="rating">
   <option value="1" name="One">1-✪</option>
   <option value="2" name="Two">2-✪✪</option>
   <option value="3" name="Three">3-✪✪✪</option>
   <option value="4" name="Four">4-✪✪✪✪</option>  
   <option value="5" name="Five">5-✪✪✪✪✪</option>  
   </select>
   </section>
   </fieldset>

    <fieldset>
    <section class ="js-url">
    <label for="url-entry">Add a URL </label>
    <input type="url" name="urlEntry" class="js-url-list-entry" placeholder="e.g., google.com" value="https://" required >

    <label for="url-name-entry">Add a title </label>
    <input type="text" name="title" class="js-url-title-entry" placeholder="e.g., google.com" required>

    </section>
    </fieldset>

    <fieldset>
    <section class="js-url-list-description">
    <label for="message box">Description</label>
    <textarea name="message" id="description" placeholder="Add description here" value="" > </textarea>
    </section>
    </fieldset>
    <div class="error-container"></div>
    <fieldset>
    <button class= "post">Add bookmark!</button>
    </fieldset>
  </form>
  <button class= "hide">Hide</button>
  </div> `;
};

////////generation functions////////

const generateHomePage =function (){
  let html= homePage();
  $('main').html(html);
};

//
const generateNewBookmarkPage = function(){
  $('main').on('click','#addNew' ,function(){
    let html = NewBookmarkPage();
    $('main').html(html);
  
    
  });
};

const generateStore = function(){
  let html =``
  for(let i=0 ; i<store.bookmarks.length; i++){

    if(store.bookmarks[i].filtered=== true){
      if((store.bookmarks[i].expanded=== true)){
        html+= 
        expandedItem(i);
      }

      else{
        html+= condensedItem(i);
      }
    }
  }
  
  return `<ul class= "js-url-list">${html}</ul> 
  <div class="errorContainer"></div>`;
};

const generateError = function(message) {
  return `
  <div class="error-content">
  <button id="cancel-error">
  <span aria-label="close-error-message">X</span>
  </button>
  <p>${message}</p>
  </section>
  `;
};

const hideFun = function(){
  generateHomePage();
};


const hideButton =function(){
  
  $('main').on('click', '.hide', function(){
    event.preventDefault();
      
    
    hideFun();
  });
   
  
};

const filterByRating= function(){
  //rating is set by filter
  let rating=store.filter;
  let html = [];
 
  for(let i=0 ; i<store.bookmarks.length; i++){
    //notes are examined and compared to filter
    if (store.bookmarks[i].rating >= rating) {
      //a condensed version of the note is harvested
      store.bookmarks[i].filtered= true;
      html+= condensedItem(i);
  
    }

    else{store.bookmarks[i].filtered= false}


    console.log(store.bookmarks[i]);
   
  }
  // the filtered notes are rendered to the list
  return $('.js-url-list').html(html);
  

};


////////rendering functions////////

const createNewBookmark = function (){

  $('main').on('submit', '#js-url-list-form', function(event) {
    event.preventDefault();
    // store.validateSubmission();
    const newBookmark ={
      title: event.target.title.value,
      url: event.target.urlEntry.value,
      desc: event.target.message.value,
      rating: parseInt(event.target.rating.value),
    

    };
      
    api.createBookmark(newBookmark)
      .then((res)=>res.json())
      .catch((error) => {
        
        console.log('catch', error);
        store.setError(error.message);
        renderError()

      })
      .then(newBookmark=> {
        store.addBookmark(newBookmark)
        render();
      });


    
    
    render();
    $('.js-url-list-entry').val('https://');
    $('.js-url-title-entry').val('');
    $('#description').val('');
     
   
    
    // deleteItem();
    //hideFun();
    console.log("this?",store)
  });
  
};



const render =function(html){
  $('main').html(generateHomePage());
  $('form-container').html(html);
  renderError();
  
};

const renderError = function() {
  if (store.error) {
    const el = generateError(store.error);
    $('.errorContainer').html(el);
  } else {
    $('.errorContainer').empty();
  }
};


////////eventhandlers////////

const getElementAndReturnID = function(element) {
  return $(element).closest('li').data('bookmark-id');
};

const expandItem = function(){
  $('main').on('click', '.js-item-expand', function(event){
    event.preventDefault();
    const id = getElementAndReturnID(event.target)
    store.findAndExpand(id);
    render();
 
  });   
};

const condenseItem = function(){
  $('main').on('click', '.js-item-condense', function(event){
    event.preventDefault()
    const id = getElementAndReturnID(event.target)
    store.findAndCondense(id);
    render();
 
  });   
};


const handleFilterClick = function(){
 
  $('main').on('change', '#filter-rating', function(event){
    event.preventDefault();
    //we assign the drop down value to a variable 
    let rating=$('#filter-rating').val();
    store.newFilter(rating);
    filterByRating();

  });
 
};

const handleErrorCloseClicked = function() {
  $('main').on('click', '#cancel-error', event => {
    event.preventDefault();
    store.setError(null);
    render();
  });
};

const deleteItem = function (){

  $('main').on('click', '.js-item-delete', event =>{
    const id = getElementAndReturnID(event.target);
    console.log(id);
  
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        console.log("this", error);
        store.setError(error.message);
        renderError();
      });
  });   

};



const bindEventListeners = function () {
  
  generateNewBookmarkPage();
  deleteItem();
  expandItem();
  condenseItem();
  hideButton();
  filterByRating();
  handleFilterClick();
  createNewBookmark();
  handleErrorCloseClicked();

};

// This object contains the only exposed methods from this module:
export default {
  generateHomePage,
  bindEventListeners,
  render
};