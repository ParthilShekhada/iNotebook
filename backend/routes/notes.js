const express=require('express')
const router=express.Router()
const fetchuser=require('../middleware/fetchuser')
const Notes=require("../models/Notes")
const { body, validationResult } = require('express-validator')



router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        
        const notes=await Notes.find({user:req.user.id})
        res.json(notes)


    } catch (error) {
        res.status(500).json({ status: "failed", message: err.message })

    }
})

router.post('/addnotes',fetchuser, async (req, res) => {

    try {

        console.log(req.body)
        const {title,description,tag}=req.body

       

        const note=await Notes.create({
            title,description,tag,user:req.user.id
        })
        await note.save()

        res.status(201).json(note)



    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: error.message })

    }
})


router.put('/updatenotes/:id',[
    body('title',"Enter valid title").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5}),

], fetchuser, async (req, res) => {

    try {

        const {title,description,tag}=req.body


        const newNote={}
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}



        let note=await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).json({status:"failed",message:"Not found"})
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).json({status:"failed",message:"Not allowed"})

        }
        const updatedNote=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})

        res.json(updatedNote)



    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: error.message })

    }
})

router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

    try {


        let note=await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).json({status:"failed",message:"Not found"})
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).json({status:"failed",message:"Not allowed"})

        }
        note=await Notes.findByIdAndDelete(req.params.id)

        res.json({status:"success",message:"Note has been deleted succesfully"})



    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: error.message })

    }
})



module.exports=router