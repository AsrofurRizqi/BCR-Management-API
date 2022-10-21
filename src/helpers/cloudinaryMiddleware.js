const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = (req,res,next)=>{
    const uniqueName = new Date().toISOString();


    if(req.file != null){
        cloudinary.uploader.upload(
            req.file.path,
            {
                resource_type:'raw',
                folder:'bcr-chptr-6',
                public_id: `bcr-cars-${uniqueName}`,
                tags: `express-cloudinary`,
            },
            (err,image)=>{
                if(err) return res.status(500).send(err);
                console.log("File uploaded to cloudinary")
    
                fs.unlinkSync(req.file.path);
                req.image = image;
                next();
            }
        )
    }else{
        next()
    }
    
}
module.exports = uploadCloudinary;