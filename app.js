const express = require('express');
const http = require('http');
const dotenv = require('dotenv').config();
const app = express();
const path = require('path');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const authRoter = require('./Routes/authRoters');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const {checkUser} = require('./middlewares/authMiddleware');
const socketio = require('socket.io');
// parse applitacion/son
app.use(bodyParser.urlencoded({ extended: true }));

const io = socketio(server);

// run when clien connects

//view engine
app.set('view engine','ejs');
app.use(express.static(path.join( __dirname,'public')));
app.use(cookieParser());

// Run when client connects


//db
require('./connect/database');
//

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.validation_error =req.flash('validation_error');
    res.locals.success_message= req.flash('success_message');
    res.locals.name = req.flash('name');
    res.locals.phone = req.flash('phone');
    res.locals.email = req.flash('email');
    res.locals.password = req.flash('password');
    res.locals.login_error = req.flash('error');
    next();
});

//rotuer
app.get('*',checkUser);
app.use(authRoter);

io.on('connection', socket => {
    console.log("bir göt bağlandı");
    //console.log(socket.id);
    // welcome current user
  socket.emit('message','sa dostum');

  // broadcast when a user connects
  socket.broadcast.emit('message','A user has joined the chat');
// user disconnect
 socket.on('disconnect',()=>{
      io.emit('message','a user has left the chat');
  }); 
  //listen chatMessage
  socket.on('chatMessage',msg=>{
      io.emit('message',msg);
  })
  });
// start local host
server.listen(process.env.PORT,()=>{
    console.log(`server ${process.env.PORT} dan çalışmakta`);
});