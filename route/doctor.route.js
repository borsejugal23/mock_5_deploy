const express=require("express");
const { postModel } = require("../model/doctor.model");
const doctorRouter=express.Router();

doctorRouter.post("/appointment",async(req,res)=>{
  try {
    const newpost= new postModel(req.body);
    await newpost.save();
    return res.status(200).json({msg:"new post added"})
  } catch (error) {
    res.status(500).json({error:error.message})

  }
})

 doctorRouter.get("/",  async (req, res) => {
    try {
      //  console.log(req.body.username);
       const doctorPost = await postModel.find();
       return res.status(200).json({ doctorPost: doctorPost });
    } catch (error) {
       return res.status(500).json({ error: error.message });
    }
 });


 
 
doctorRouter.patch("/update/:id", async(req,res)=>{
  const {id}=req.params;

  try {
      const updatecontent= await postModel.findByIdAndUpdate({_id:id},req.body);
      res.status(200).send({msg:updatecontent})

  } catch (error) {
    res.status(400).send({ error: error.message });
  }

})

doctorRouter.delete("/delete/:id", async(req,res)=>{
  const {id}=req.params;

  try {
      const deletecontent= await postModel.findByIdAndDelete({_id:id});
      res.status(200).send({msg:deletecontent})

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})

module.exports={doctorRouter}
 


