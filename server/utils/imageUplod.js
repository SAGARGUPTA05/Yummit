const cloudinary=require("./cloudinary")

const uploadImageOnCludinary=async(file)=>{
    try {
        const base64Image = Buffer.from(file.buffer).toString("base64");
        const dataURI = `data:${file.mimetype};base64,${base64Image}`;

        const uploadResponse = await cloudinary.uploader.upload(dataURI, {
            folder: "uploads", // Optional: specify a folder
            resource_type: "image", // Automatically detect file type
        });

        return uploadResponse.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Failed to upload image");
    }
}

module.exports= uploadImageOnCludinary;