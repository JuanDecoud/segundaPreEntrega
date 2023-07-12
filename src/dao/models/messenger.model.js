import mongoose from 'mongoose'

const messengerCollection = 'Messenger'

const messengerSchema = new mongoose.Schema({
    userMail : String ,
    messege : String
})


const messengerModel =  mongoose.model(messengerCollection,messengerSchema)


export default messengerModel 