import multer from 'multer'
const rutaArchivos = './src/public/'

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,rutaArchivos)
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const uploader = multer({storage})


export default uploader
