const router = require('express').Router();
const authController = require('../controller/auth_controller');
const validateMiddleWare = require('../middlewares/validation_middleware');
const chatsss = require('../controller/chats');


router.get('/',authController.mainPage);

router.get('/login',authController.GetLoginPage)
router.post('/login',authController.PostLogin);

router.get('/register',authController.getRegister);
router.post('/register', validateMiddleWare.validateNewUser(), authController.userRegister);

router.get('/logout',authController.logout_get);
router.get('/chat',(req,res)=>{
    res.jsonp({chatsss});
});
module.exports= router;