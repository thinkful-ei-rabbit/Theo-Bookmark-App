
  
import $ from 'jquery';
import store from './store';
import api from './api';
import item from './item';



// const generateElement = function (bookmark) {
//   let bookmarkTitle = `<span class="new page">${bookmark.name}</span>`;
  
//   
//     
// };
const homePage = function(){
  return `   <div>
  <button id= "addNew">Create New Bookmark</button>
  <label for="filter-checked">Filter by Rating</label>
  <select id="filter-rating">
  <option value="0">No filter</option>
  <option value="1">Trash</option>
  <option value="2">Handy</option>
  <option value="3">Useful</option>
  <option value="4">Important</option>  
  <option value="5">Essential</option>  
  </select>
  <button id= "filter">Filter</button>
</div>`;
};


const generateHomePage =function (){
  let html= homePage()
  return $('.container').html(html);
};


const NewBookmarkPage = function(){
  return `
   <h2> Create a new Bookmark! </h2> 

   <form id="js-url-list-form">
   <div class ="js-url-ratings">
   <select name = "rating" id="rating">
   <option value="1" name="Trash">Trash</option>
   <option value="2" name="Handy">Handy</option>
   <option value="3" name="Useful">Useful</option>
   <option value="4" name="Important">Important</option>  
   <option value="4" name="Essential">Essential</option>  
   </select>
   </div>
  


    <div class ="js-url">
    <label for="url-entry">Add a URL </label>
    <input type="text" name="urlEntry" class="js-url-list-entry" placeholder="e.g., google.com" value="https://" required >


    <label for="url-name-entry">Add a title </label>
    <input type="text" name="title" class="js-url-title-entry" placeholder="e.g., google.com" required>

    </div>
    
    <div class="js-url-list-description">
    <label for="message box">Description</label>
    <textarea name="message" id="description" placeholder="Add description here" value="" > </textarea>
    </div>


    <button class= "post">Add bookmark!</button>
   
  </form>
  <button class= "hide">Hide</button>`;
};

const hideButton =function(){
$('.form-container').on('click', '.hide', function(){
    let html= ''
    return $('.form-container').html(html);
  });
 

};




const generateNewBookmarkPage = function(){
  $('#addNew').on('click',function(){
    let html = NewBookmarkPage();
$('.form-container').html(html);
  
    createNewBookmark();
  });
};



const filterByRating= function(rating){

  let html =``
  for(let i=0 ; i<store.bookmarks.length; i++){

    if (store.bookmarks[i].rating >= rating) {

      html+= `<a href="${store.bookmarks[i].url}">  
      <li data-bookmark-id ="${store.bookmarks[i].id}">
      
       <div id="name">${store.bookmarks[i].title}</div> 
       <br>
       <div id="urlName">${store.bookmarks[i].url}</div> 
       <br>
       <div id="description"> ${store.bookmarks[i].desc} </div>
       <br>
       <div id="rating"> rating: ${store.bookmarks[i].rating} </div>
      </a>
      <div class="item-controls">
        <button class="js-item-delete">
          <span class="button-label">delete</span>
        </button>
        
      </div>
     </li>`;
    }

  }
  return $('.url-list').html(html);


}

const handleFilterClick = function(){
  $('.container').on('click', '#filter', function(){
    event.preventDefault();
    
    filterByRating($('#filter-rating').val());
    
  });


}

const createNewBookmark = function (){

  $('.form-container').on('submit', '#js-url-list-form', function(event) {
    event.preventDefault();

    const newBookmark ={
      title: event.target.title.value,
      url: event.target.urlEntry.value,
      desc: event.target.message.value,
      rating: parseInt(event.target.rating.value),
      expanded: true,
      

    };

    console.log('here', newBookmark)


  
      
    api.createBookmark(newBookmark)
      .then((response) => {
  
        return response.json();
      })
      .then((jsonData)=> {
        console.log("why", jsonData);
        store.addBookmark(jsonData)
        console.log( store.bookmarks)
        render(generateStore(store.bookmarks));
      });

        
  
    
    
    $('.js-url-list-entry').val('https://');
    $('.js-url-title-entry').val('');
    $('#description').val('');
     
    render(generateStore(store.bookmarks));
    deleteItem();
  });

};
const generateStore = function(){

  let html =``
  for(let i=0 ; i<store.bookmarks.length; i++){

    if(store.bookmarks[i].expanded=== true){
    html+= 
        `<li data-bookmark-id ="${store.bookmarks[i].id}">
        
         <div id="name">${store.bookmarks[i].title}</div> 
         <br>
         <div id="urlName">${store.bookmarks[i].url}</div> 
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
       </li>`;}

    else{
      html+= `<li data-bookmark-id ="${store.bookmarks[i].id}">
        
      <div id="name">${store.bookmarks[i].title}</div>
      <div class="item-controls">
      <button class="js-item-delete">
        <span class="button-label">delete</span>
      </button>
      <button class ="js-item-expand">
      <span class ="button-label">Expand</span>
    </button>
    </div>`;
  }


  }
  
  return html;
  

};

const render =function(html){
  $('.url-list').html(generateStore());
  $('form-container').html(html);
}

const getElementAndReturnID = function(element) {
  return $(element).closest('li').data('bookmark-id');
};




const expandItem = function(){
  $('.url-list').on('click', '.js-item-expand', function(event){
    const id = getElementAndReturnID(event.target)
    console.log(id)
    store.findAndExpand(id);
    render();
 
  });   
};

const condenseItem = function(){
  $('.url-list').on('click', '.js-item-condense', function(event){
    const id = getElementAndReturnID(event.target)
    console.log(id)
    store.findAndCondense(id);
    render();
 
  });   
};


  
const deleteItem = function (){

  $('.url-list').on('click', '.js-item-delete', function(event){
    let id = getElementAndReturnID(event.target);
    console.log(id);
  
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();

        
      })
      .catch((err)=> {
        alert(err);
      }
      );
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
  // backButton();

};

// This object contains the only exposed methods from this module:
export default {
  generateHomePage,
  bindEventListeners,
  render
};