import multer from 'multer';
import path from 'path';

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

const imageFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
};

const uploadImage = multer({
    storage: imageStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: imageFilter,
});

export { uploadImage };
