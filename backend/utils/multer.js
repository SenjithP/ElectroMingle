import multer from "multer";
import path from "path";

const createStorage = (destination) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });

const storage = createStorage("public/postImagesAndVideos");

const upload = multer({ storage: storage }).array("file");

export { upload };
