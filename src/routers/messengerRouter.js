import { Router } from 'express';

import messengerModel from '../dao/models/messenger.model.js'

const messengerRouter = Router()


messengerRouter.get ('/' , async (req,res)=>{
    let messages = await messengerModel.find().lean()
    res.render ('messenger' , {messages})
})




export default messengerRouter