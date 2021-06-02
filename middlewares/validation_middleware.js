const {body} = require('express-validator');

const validateNewUser = ()=>{
    return [
        body('name')
        .trim()
        .isLength({min:3}).withMessage('İsim en az 3 karaterli olmalıdır')
        .isLength({max:30}).withMessage('İsim en az 2 karaterli olmalıdır'),

        body('phone')
        .trim().isMobilePhone().withMessage('geçerli bir numara giriniz')
        ,
        
       
        body('email')
        .isEmail()
        .trim().withMessage('Geçerli Mail Giriniz'),
       

        body('password')
        .trim()
        .isLength({min:4}).withMessage('şifre minimum 4 karakterli olabilir')
        .isLength({max:30}).withMessage('şifre maximum 30 karakterli olabilir'),
    ];
}


const validateLogin = ()=>{

    return [
        body('email')
        .trim()
        .isEmail().withMessage('Geçerli bir mail giriniz'),

        body('password')
        .isLength({min:4}).withMessage('böyle bir numara bulunmamakta')
        .isLength({max:30}).withMessage('sifre en fazla 30 karakter olur'),

       

    ];
}
module.exports={
    validateNewUser,
    validateLogin
}