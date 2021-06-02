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
    // chat.js deki karşılaştırmalar yapıldıktan sonra gelen random user'ın id ve eşleşilen alanın adı gelmesi lazım o verileri kullanarak 2 kullanıcıyı odaya alıcam sohbet başlicak 
    // kontroller ve oda ya alma olayı buttona basıldığında olması gerekiyor takıldığım 2 yer
    res.render('chat');
});
module.exports= router;