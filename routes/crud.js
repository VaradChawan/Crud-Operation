const express=require('express');
const bodyParser=require('body-parser');
const router= express.Router();
const crudDbAccess=require('../models/crudDB');

//fetch all the details from cruddb model
router.get('/',async(request,response)=>{

    try{
        const userDetails= await crudDbAccess.find();
        response.json(userDetails);
    }
    catch(err){
        response.json('Error '+err)
    }
})

//fetch user based on id
router.get('/:id',async(request,response)=>{
    try{
        const userDetails= await crudDbAccess.findById(request.params.id);
        response.json(userDetails);
    }
    catch(err){
        response.json('Error '+err)
    }
})
//push data in crudDb model
router.post('/',async(request,response)=>{
    //response.send('we are on posts');  
        const userName=request.body.name;
        console.log(userName);
        const tech=request.body.tech;
        console.log(tech)
        const newUser=new crudDbAccess({
                name:userName,
                tech:request.body.tech,
                sub:request.body.sub
        })

        try{
            const a1=await newUser.save()
            response.json(a1);
        }catch(err){
            response.send("Error "+ err)
        }
})
router.patch('/:id',async(request,response)=>{
    try{
        const userDetails=await crudDbAccess.findById(request.params.id)
        const sub=request.body.sub;
        const a1=await userDetails.save()
        response.json(a1)
        
    }catch(err){
response.send(err)
    }
})

//delete id
router.delete('/:id',async(request,response)=>{
    console.log(request.params.id)
    crudDbAccess.remove({_id:request.params.id})
    .then(result=>{
        response.status(200).json({
                message:'Deleted successfully',
                deletedResult:result

        })
    }).catch(err=>{
        response.status(500).json({
            error:err
        })
    }

    )
})

//update call
router.put('/:id',(request,response,next)=>{
    console.log(request.params.id);
    crudDbAccess.remove({_id:request.params.id},{
        $set:{
            name:request.params.name,
            tech:request.params.tech,
            sub:request.params.sub
        }
    })
    .then(result=>{
        response.status(200).json({
            updated_prod:result
        })
    })
    .catch(err=>{
        console.log(err);
        response.status(500).json({
            error:err
        })
    })
})



module.exports=router