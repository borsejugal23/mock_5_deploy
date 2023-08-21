const mongoose=require("mongoose");

const postSchema=mongoose.Schema(
    {
        name:String,
        image_url:String,
        specialization:String,
        experience:String,
        location:String,
        date:{
            type:Date,
            default:Date.now()
        },
        experience:String,
        slots:Number,
        fee:Number
    },
    {
        versionKey:false
    }
)

const postModel=mongoose.model("doctor",postSchema);

module.exports={postModel}


// - Name
// - Image URL
// - Specialization (Select tag with **Cardiologist, Dermatologist, Pediatrician, Psychiatrist** as options)
// - Experience
// - Location
// - Date (Appointment creation date, populate from backend)
// - Slots (Number of slots available for the day)
// - Fee