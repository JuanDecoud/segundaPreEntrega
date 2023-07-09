import mongoose from 'mongoose'

const messengerCollection = 'messenger'

const messengerSchema = new mongoose.Schema({
    userMail : String ,
    messege : String
})


const messengerModel =  mongoose.model(messengerCollection,messengerSchema)


export default messengerModel 