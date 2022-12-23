const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const UserSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:String
    },
    gender:{
        type:String
    },
    dob:{
        type:Date
    },
    mobile:{
        type:String
    }
})

UserSchema.pre('save',async function SavePassword(next){
    this.password=await bcrypt.hash(this.password,10)
    next()
})

module.exports=mongoose.model('users',UserSchema)