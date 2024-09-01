const mongoClient = require('mongodb').MongoClient
const state = { db: null }

module.exports.connect = (connectionStatus) => {
    const url = 'mongodb://localhost:27017'
    const dbName = 'shopping'

    try {
        const client = new mongoClient(url)
        state.db = client.db(dbName)
        connectionStatus()
    } catch (error) {
        connectionStatus(error)
    }
     
  
}
module.exports.get=function(){
    return state.db
}