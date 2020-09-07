const bookmarks=[];
let filter =0;
let error;

const newFilter = function(val) {
  this.filter = val;
};


const addBookmark =function(bookmark){

  const newBookmark = Object.assign(bookmark, { expanded: false }, {filtered:true } );
  this.bookmarks.push(newBookmark);

  // const filteredBoolean = Object.assign(bookmark, {filtered:false });
  // this.bookmarks.push(filteredBoolean);
};



const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const findById = function(id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const findAndExpand = function(id) {
  let bookmark = this.findById(id);
  bookmark.expanded = true;
  bookmark.filtered=true;
};

// const expandFiltered= function(id){
//   let bookmark=this.findById(id);
  
//     // bookmark.expanded=true;
  
// };

const findAndCondense = function(id) {
  let bookmark = this.findById(id);
  bookmark.expanded = false;
};


const validateSubmission = function(submission){
  console.log(submission)
  if(submission=== ''){
    throw new TypeError(`This submission can't be blank`)}
};

const setError = function(error) {
  this.error = error;
};

export default {
  bookmarks,
  filter,
  error,
  newFilter,
  validateSubmission,
  addBookmark,
  findAndDelete,
  findById,
  findAndExpand,
  findAndCondense,
  setError
  
};