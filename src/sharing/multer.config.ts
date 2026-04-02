
import {diskStorage} from 'multer'
import { extname } from 'path'

export const multerConfig = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            const unique = Date.now().toString() + '-' + Math.floor(Math.random() * 1e9)
            callback(null, unique + extname(file.originalname))
        }
    })
}
