var express = require('express');
var router = express.Router();
var productHelper = require('.././helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')

const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  }
  else {
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user
  console.log(user)
  productHelper.getAllProducts().then((products) => {
    res.render('user/view-products', { products, user });
  })
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
  } else {
    res.render('user/login', { "loginErr": req.session.loginErr })
    req.session.loginErr = false
  }
})

router.get('/signup', (req, res) => {
  res.render('user/signup')
})

router.post('/signup', (req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response)
    req.session.loggedIn = true
    req.session.user = response
    res.render('/')
  })
})


router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    }
    else {
      req.session.loginErr = "Invalid Username or password"
      res.redirect('login')
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  redirect('/login')
})

router.get('/cart', verifyLogin, (req, res) => {

  res.render('user/cart')
})

router.get('/add-to-cart/:id', verifyLogin, (req, res) => {
  userHelpers.addToCart(req.params.id, req.session.user._id).then(() => {
    res.redirect('/')
  })
})
module.exports = router;
