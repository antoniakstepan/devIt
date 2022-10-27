const mongoose = require('mongoose')
const dotenv = require("dotenv");

dotenv.config();
module.exports  =  async ()=>{
    console.log(process.env.MONGO_URL, 'process.env.MONGO_URI')
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            //must add in order to not get any error masseges:
            useUnifiedTopology:true,
            useNewUrlParser: true,
        })
        console.log(`mongo database is connected!!! ${conn.connection.host} `)
    }catch(error){
        console.error(`Error: ${error} `)
        process.exit(1)
    }

}

