const User = require('../models/User');
const bcrypt = require('bcrypt');
const MongoCLient = require('mongodb').MongoClient;
const {validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mainPage = (req,res,next)=>{
        res.render('home');
        
        
    }
   
    



const GetLoginPage = (req,res)=>{
    res.render('login');
}



const PostLogin =  async(req,res)=>{
    //const stringOfErrors = validationResult(req);
    try {
        const {email,password} = req.body;
        const user = await User.login(email,password);
        const token= createToken(user._id);
        res.cookie('jwt',token,{httpOnly : true , maxAge:maxAge * 1000 });
        res.status(201).redirect('/');
    } catch (err) {
        console.log(err);
    }
  /**   req.flash('email',req.body.email);
    req.flash('password',req.body.password);
    if(!stringOfErrors.isEmpty()){
        req.flash('validation_error',stringOfErrors.array());
        res.redirect('login');
    }    
    else{
        
    }*/
}
const getRegister =(req,res)=>{
    //console.log(req.flash('validation_error'));
    res.render('register');
}
const maxAge = 3 * 24 * 60 * 60;
const createToken= (id)=>{
    return jwt.sign({id},process.env.JWT_SCREAT,{
        expiresIn:maxAge
    });
}

const userRegister =async(req,res)=>{
     const hatalarDizisi = validationResult(req);
    if(!hatalarDizisi.isEmpty()){
        req.flash('validation_error',hatalarDizisi.array());
        req.flash('name',req.body.name);
        req.flash('phone',req.body.phone);
        req.flash('email',req.body.email);
        req.flash('sifre',req.body.password);
        res.redirect('/register'); 

    }else{
        try {
            const _user = await User.findOne({email:req.body.email});
            const _userPhone = await User.findOne({phone:req.body.phone});
            if(_userPhone){
                
                req.flash('validation_error',[{msg:'Bu Telefon numarası Kullanılmakta'}]);
                req.flash('name',req.body.name);
                req.flash('phone',req.body.phone);
                req.flash('email',req.body.email);
                req.flash('sifre',req.body.password);
                res.redirect('/register');     
            }else if(_user){
                req.flash('validation_error',[{msg:'Bu mail kullanımda'}]);
                req.flash('name',req.body.name);
                req.flash('phone',req.body.phone);
                req.flash('email',req.body.email);
                req.flash('sifre',req.body.password);
                res.redirect('/register'); 
            }
            else{
                const newUser = new User({
                    name:req.body.name,
                    phone:req.body.phone,
                    email:req.body.email,
                    password:await bcrypt.hash(req.body.password,10),
                    hobi:req.body.hobi,
                    fobi:req.body.fobi,
                    music:req.body.music,
                });
                await newUser.save();
                res.status(201).redirect('/');
            }
          
            //console.log('kullanıcı kayıt edildi');
        } catch (err) {
            console.log(err);
        }
    }
    


  
    //res.redirect('/userCategory');
}

const logout_get =async (req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
    await User.findByIdAndUpdate(res.locals.user._id,{Aktif:false});
  }

module.exports ={mainPage,
    GetLoginPage,
    PostLogin,
    getRegister,
    userRegister,
    logout_get,
}