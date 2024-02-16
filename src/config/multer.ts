import {Options, diskStorage} from "multer";
import path from "path";

const __dirname = path.resolve();
export const multerConfig = {
    storage : diskStorage({
        destination :path.join(__dirname ,"/","uploads"),
        filename( request , file , callback ){
            callback(null , `${Date.now()}-${file.originalname}`)
        }
    }),
    limits : {
        fieldSize : 8*1024*1024
    },
    fileFilter : ( req ,file , callback) => {
        const mimeType = ["image/png","image/jpeg","image/jpg","image/gif"]
    
        if(!mimeType.includes(file.mimetype)){
           return callback( null ,false);
        }
    
        callback( null , true);
    }
} as Options

