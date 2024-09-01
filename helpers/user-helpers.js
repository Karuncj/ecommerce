const { resolve } = require('promise')
var collection=require('../configuration/collections')
var db=require('../configuration/connection')
const bcrypt=require('bcrypt')
const { response } = require('express')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            delete userData.confirmPassword;
        userData.password=await bcrypt.hash(userData.password,10)
        db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
            resolve(data.insertedId)
        })
    })
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log("login sucess")
                        response.user=user
                        response.status=true
                        resolve(response)
                    }
                    else{
                        console.log("Login failed")
                        resolve({status:false})
                    }
                })
            }
            else{
                console.log("User not exist")
            }
        })
    }
}