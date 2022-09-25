module.exports = function (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};

// To avoid repeating tryCatch{} again and again, use this wrapper function
// -------- Usage :
/* 
const function = catchAsync(async (req,res,next) => {
    your async function here
})
*/

// ------ Without catchAsync you ave to do this :
/* 
try{
    const function = async (req,res,next)=> {
        Your async function
    }
} catch(error) {
    console.log(error)
}
*/
