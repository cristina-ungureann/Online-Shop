const User = require('../models/user.model');
const authUtil = require('../util/authentication')


function getSignup(req, res) {
  res.render('customer/auth/signup')
};

async function postSignup(req, res) {
  const user = new User
  (req.body.email, 
  req.body.password,
  req.body.fullname,
  req.body.street, 
  req.body.postal, 
  req.body.city);

  await user.singup();

  res.redirect('/login');

}

function getLogin(req, res) {
    res.render('customer/auth/login')
  };

async function postLogin(req, res) {
   // does the req.body.email match any email in the database?
   // if yes does the req.body.password hashed match the hashed password stored in the database?
   // if all of the above  are true, store the fact that the user is logged in session 
   //so that you know which pages are available to this certain user
   const user = new User(req.body.email, req.body.password);
   
   const existingUser = await user.getUserWithSameEmail;

   if(!existingUser){
    res.redirect('/login');
    return;
   }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
    
    if(!passwordIsCorrect){
      res.redirect('/login');
      return;
    }
   
    authUtil.createUserSession(req, existingUser, function(){
      res.redirect('/');
    })


};

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    postSignup: postSignup,
    postLogin: postLogin
}