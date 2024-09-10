import express from "express";
import { uploadPicture } from "../../services/image/imageServices";
import multer from "multer";

const imageController = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const upload = multer({ dest: "Images/", storage: storage });

imageController.post(
  "/profile-pic",
  upload.single("profilePic"),
  async (req, res) => {
    return uploadPicture(req, res);
  }
);

export default imageController;
