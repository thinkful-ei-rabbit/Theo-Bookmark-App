const bookmarks=[];



const addBookmark =function(bookmark){

  const newBookmark = Object.assign(bookmark, { expanded: false });
  this.bookmarks.push(newBookmark);
 
}
//let error = null;

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const findById = function(id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const findAndExpand = function(id) {
  let bookmark = this.findById(id);
  bookmark.expanded = true;
};

const findAndCondense = function(id) {
  let bookmark = this.findById(id);
  bookmark.expanded = false;
};


const validateSubmission = function(submission){
  console.log(submission)
  if(submission=== ''){
    throw new TypeError(`This submission can't be blank`)}
};

export default {
  bookmarks,
  validateSubmission,
  addBookmark,
  findAndDelete,
  findById,
  findAndExpand,
  findAndCondense
};