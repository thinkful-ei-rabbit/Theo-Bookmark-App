const bookmarks=[];
const expanded=false; 


const addBookmark =function(bookmark){


  this.bookmarks.push(bookmark);
}
//let error = null;

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const validateSubmission = function(submission){
  console.log(submission)
  if(submission=== ''){
    throw new TypeError(`This submission can't be blank`)}
};

export default {
  bookmarks,
  expanded,
  validateSubmission,
  addBookmark,
  findAndDelete,
};