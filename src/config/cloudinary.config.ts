
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

export default cloudinary

export const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
					const ogName = path.parse(file.originalname).name;
					const cleanName = ogName.replace(/\s+/g, "-") + Date.now();
        return {
            folder: 'share',
            resource_type: 'auto',
							 public_id: cleanName
        }
    }
})