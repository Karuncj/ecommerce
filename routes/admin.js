var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
 productHelper.getAllProducts().then((products)=>{
    
   res.render('admin/view-products',{products,admin:"true"})
 })
});

router.get('/add-product',(req,res)=>{
  res.render('admin/add-product')
})

router.post('/add-product',(req,res)=>{
  // console.log(req.body)
  // console.log(req.files.image)

  productHelper.addProduct((req.body),(id)=>{
    let image=req.files.image
    image.mv('./public/product-images/'+id+'.jpg',(err)=>{
      if(!err){
        console.log("sucessfully saved image")
        res.render("admin/add-product")
      }
      else{
        console.log(err)
      }
    })
  })
})

router.get('/delete-product/:id',(req,res)=>{
  let productId=req.params.id
  console.log(productId)
  productHelper.deleteproducts(productId).then((response)=>{
    res.redirect('/admin')
  })
})

// router.get('/delete-product/',(req,res)=>{
//   let productId=req.query.id
//   console.log(productId)
//   // console.log(req.query.id)
// })
module.exports = router;
