const User = require('../models/User');
const MongoCLient = require('mongodb').MongoClient;
module.exports= function chatsClass (){
 return function(req,res,next){
    MongoCLient.connect(process.env.DATABASE_CONNECT,{useUnifiedTopology: true},(err,client)=>{
    
        if(err){
            console.log( err);
        }
        
      const db = client.db('ChatApp');
        const usersss = db.collection('users');
        let random ;
        const qurery = {};
        const cursor = usersss.find(qurery);
        usersss.countDocuments(function(err,count){
            random = Math.floor(Math.random(50)*count);
            cursor.sort({_id : -1});
            cursor.skip(random);
            cursor.limit(1);
            
            cursor.each(function(err, doc) {
             if(err) console.log(err);
             if(doc == null) {
                return res.json({"msg":`${doc._id}`});
             }
             if(doc.Aktif !==true){
                 console.log("aktif değilim");
             }
             else if(doc.Aktif == true){
                    const My =res.locals.user._id.toString();
                    let randomUsers=doc._id.toString();
                     if (My == randomUsers ){
                        console.log("şansını sikim kendin denk geldin");
                        res.redirect('/');
                    }
                    else if(res.locals.user.music == doc.music){
                        return res.json(randomUsers);
        
                    }
                   else if(res.locals.user.fobi == doc.fobi){
                    return res.json(randomUsers);
                    }
                   else if(res.locals.user.hobi == doc.hobi){
                       
                    return res.json(randomUsers);
                    }
             }
         });
        }); 
    });  
 };
}



