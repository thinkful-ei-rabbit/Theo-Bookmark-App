const bookmarks=[];
  

//let error = null;

const validateSubmission = function(submission){
  if(submission.val()=== ''){
    throw new TypeError(`This submission can't be blank`)}
};

export default {
  bookmarks,
  validateSubmission
};