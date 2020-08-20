
  
import $ from 'jquery';
import store from './store';
import api from './api';



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
  <option value="Important">Important</option>
  <option value="Useful">Useful</option>
  <option value="Handy">Handy</option>
  <option value="Trash">Trash</option>  
  </select>
</div>`;
};


// const render =function({

// })
const generateHomePage =function (){
let html= homePage()
  return $('.container').html(html);
}


const NewBookmarkPage = function(){
  return `
   <h2> Create a new Bookmark! </h2> 
   <form id="js-url-list-form">
   <div class ="js-url-ratings">
   <select id="rating">
   <option value="Important">Important</option>
   <option value="Useful">Useful</option>
   <option value="Handy">Handy</option>
   <option value="Trash">Trash</option>  
   </select>
   </div>

    <div class ="js-url-titles">
    <label for="url-entry">Add a URL </label>
    <input type="text" name="url-entry" class="js-url-list-entry" placeholder="e.g., google.com">

    </div>
    
    
    <div class="js-url-list-description">
    <label for="message box">Description</label>
    <textarea name="message" id="description" placeholder="Add description here" value=""> </textarea>
    </div>


    <button class= "post">Add bookmark!</button>
  </form>`;
};


const generateNewBookmarkPage = function(){
  $('#addNew').on('click',function(){
    let html = NewBookmarkPage();
$('.form-container').html(html);

   createNewBookmark()
  });
}



const createNewBookmark = function (){

  $(".post").on('click', function (event) {
    event.preventDefault();
    console.log("clicked")

    const newUrlName = $('.js-url-list-entry').val();
    const newDescription =$('#description').val();
    const newRating= $('#rating').val();
    console.log(`${newUrlName}`);
    console.log(`${newDescription}`);
    

    store.bookmarks.push({URL: newUrlName, description: newDescription, rating: newRating});
    console.log("bookmarks list", store.bookmarks);
    // api.apiFetch(newUrlName)
    //   .then((newUrlName) => {
    //     store.bookmarks(newUrlName);
    
        
     // })
     $('.js-url-list-entry').val('');
     $('#description').val('');
     render(generateStore(store.bookmarks));
      deleteItem();
  });

};
const generateStore = function(store){
  console.log("inside loop", store)
  let html =``
  for(let i=0 ; i<store.length; i++){
   html+= `<li>
         <label for="name" id="name">${store[i].URL}</label> 
         <br>
         <label for="description" id="description"> ${store[i].description} </label>
         <br>
         <label for="rating" id="rating"> rating: ${store[i].rating} </label>
        <div class="item-controls">
          <button class="js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
       </li>`
  }
  console.log("before return",html)
  return html;
  

}

const render =function(html){

  $('.form-container').html(html);
}

const deleteItem = function (){
  $(".js-item-delete").on('click', function(){
         
    $(this).parent().parent().remove();
    console.log($(this).parent());
  
  });    
}






// const handleDeleteItemClicked = function () {
//   $('.js-url-list').on('click', '.js-item-delete', event => {
//     const id = getUrlIdFromElement(event.currentTarget);

//     api.deleteItem(id)
//       .then(() => {
//         store.findAndDelete(id);
//         render();
//       })
//       .catch((error) => {
//         console.log(error);
//         store.setError(error.message);
//         renderError();
//       });
//   });
// };

// const handleEditUrlItemSubmit = function () {
//   $('.js-url-list').on('submit', '.js-edit-item', event => {
//     event.preventDefault();
//     const id = getUrlIdFromElement(event.currentTarget);
//     const itemName = $(event.currentTarget).find('.web-item').val();

//     api.updateItem(id, { name: itemName })
//       .then(() => {
//         store.findAndUpdate(id, { name: itemName });
//         render();
//       })
//       .catch((error) => {
//         console.log(error);
//         store.setError(error.message);
//         renderError();
//       });
//   });
// };


const bindEventListeners = function () {
  
  generateNewBookmarkPage();
  deleteItem();
  

//  handleDeleteItemClicked();
  //handleEditUrlItemSubmit();  

};

// This object contains the only exposed methods from this module:
export default {
  generateHomePage,
  bindEventListeners
};