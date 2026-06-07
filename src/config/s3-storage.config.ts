
import multerS3 from 'multer-s3'
import { s3Client } from './s3.config'
import * as path from 'path'

export const s3Storage = multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
        cb(null, {fieldName: file.fieldname})
    },
    key: (req, file, cb) => {
        const parsed = path.parse(file.originalname)
        const cleanName = parsed.name.replace(/\s+/g, "-") + Date.now() + `RemshareDevman${parsed.ext}`;
        cb(null, `sharing/${cleanName}`)
    }
})
