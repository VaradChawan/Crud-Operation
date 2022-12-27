const mongoose=require('mongoose');

//create a schema

const crudSchema= new mongoose.Schema(
    {
       name:{
            type:String,
            required:[true, "Name is required"]
        },
        tech:{
            type:String,
            required:[true, "Tech is required"]
        },
        sub:{
            type:Boolean,
            required:true,
            default:false
        }
    }
)

module.exports=mongoose.model('crudDbAccess',crudSchema)