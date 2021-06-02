const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongooseTypePhone = require('mongoose-type-phone');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    phone:{
        type:mongoose.SchemaTypes.Phone,
        required:true,
        unique:true,
        allowBlank:false,
        allowedNumberTypes: [mongooseTypePhone.PhoneNumberType.MOBILE, mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE],
        phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL, // can be omitted to keep raw input
        defaultRegion: 'TR',
        parseOnGet: false

    },
    email:{
        type: String,
        required: true, 
        unique: true,
        lowercase: true,
    },
    password:{
        type:String,
        required:true,
        minlength:4
    },
    hobi:{
        type:String,
        required:true,
    },
    fobi:{
        type:String,
        required:true,
    },
    music:{
        type:String,
        required:true,
    },
    Aktif:{
        type:Boolean,
        default:false
    },
},);

userSchema.statics.login= async function(email,password,done){
    const user = await this.findOne({email});
    const sonuc = await this.findByIdAndUpdate(user,{Aktif:true});
    
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }   
    }
}

const User = mongoose.model('users',userSchema);
module.exports = User;