import { randomBytes } from "crypto";
import {Options, diskStorage} from "multer";
import path from "path";

// export const multerConfig = {
//     dest : path.format({
//         root : '/',
//         base : "/uploads"
//     }),
//     storage : diskStorage({
//         destination : ( request , file , callback )=> {
//             callback( null ,path.dirname("/uploads") )
//         },
//         filename : (request ,file , callback ) => {
//             // randomBytes( 16 , (error , hash) => {
//             //     if(error){
//             //         callback( error , file.filename)
//             //     }
//             //     const fileName = `${hash.toString("hex")}.png`
//             //     callback( null ,fileName)
//             // })
//             callback(null , `${Date.now()}-${file.originalname}`)
//         }
//     }),
//     limits : {
//         fieldSize : 8*1024*1024
//     },
//     fileFilter : ( request , file , callback ) => {
//         const mimeType = ["image/png","image/jpeg","image/jpg","image/gif"]

//         if(mimeType.includes(file.mimetype)){
//             callback( null, true);
//         }else {
//             callback( new Error("Formato não permitido"))
//         }
//     }

// } as Options
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

