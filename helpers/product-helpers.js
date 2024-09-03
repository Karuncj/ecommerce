const { resolve } = require('promise')
var collection=require('../configuration/collections')
var db=require('../configuration/connection')
var {ObjectId } = require ('mongodb')

module.exports={
    addProduct:(product,callback)=>{
        // console.log(product)
        db.get().collection('product').insertOne(product).then((data)=>{
            // console.log(data.insertedId)
            callback(data.insertedId)
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteproducts:(productId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id: ObjectId.createFromHexString(productId)}).then((response)=>{
                console.log(response)
                resolve(response)
            })
        })
    }
}