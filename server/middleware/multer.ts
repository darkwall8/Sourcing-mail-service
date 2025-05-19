import multer from 'multer';
import path from 'path';

// Storage config for images
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname); // File extension
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // File name
    }
});

// Image filter
const imageFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
};

// Multer configuration
const uploadImage = multer({
    storage: imageStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5Mo file size limit
    fileFilter: imageFilter,
});

export { uploadImage };
