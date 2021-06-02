const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_CONNECT,  {
    useNewUrlParser: true,useUnifiedTopology: true , useCreateIndex:true,useFindAndModify:false})
.then(()=>{
    console.log("Veri Tabanına bağlanıldı");
})
.catch(hata=>console.log(`veri tabanı bağlantı hatası ${hata}`));