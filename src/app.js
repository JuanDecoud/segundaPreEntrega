import  express  from 'express';
import productRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import viewRouter from './routers/views.router.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import mongoose from 'mongoose'
import messengerRouter from './routers/messengerRouter.js'
import messengerModel from './dao/models/messenger.model.js'
///-------------------------------------------------------
const app = express ();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'))
/// routers------------------------------------------------
app.use ('/products' , productRouter)
app.use ('/carts' , cartsRouter)
app.use ('/views' , viewRouter)
app.use('/messenger', messengerRouter)
/// engine-------------------------------------------------
app.engine('handlebars' , handlebars.engine())
app.set('views','./src/views')
app.set('view engine' ,'handlebars')
//runDev----------------------------------------------------
try{
    await mongoose.connect(`mongodb+srv://juanjodecoud:JJjuanjitus22@cluster0.bpez36c.mongodb.net/proyectocoder`)
    const serverHttp=app.listen(8080 , ()=>console.log("Server Up"))
    const io = new Server(serverHttp)
    app.set('socketio', io);
    io.on('connection' , (socket)=>{
        console.log("New Client Connected")
        socket.on ('productList' , data =>{
            io.emit('updateProducts' , data)
        })
        socket.on ('messages',async data=>{
           await messengerModel.create({userMail :data.userMail , messege : data.messege})
           io.emit('updateMessages' , await messengerModel.find().lean())
        }) 
    })
}catch (err) {
  console.log (err.message)
}

