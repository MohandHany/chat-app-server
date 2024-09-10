import { Request, Response } from "express";
import imagekit from "../../constants/imageKit";
import fs from "fs";

export const uploadPicture = async (req: Request, res: Response) => {
  try {
    const data = req.file as any;
    if (!data) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageBase64 = await fs.promises.readFile(data.path, "base64");

    const uploadToImageKit = await imagekit.upload({
      file: imageBase64,
      fileName: data.originalname,
    });

    return res.status(200).json({ imageUrl: uploadToImageKit.url });
  } catch (error) {
    res.status(500).json({ error: "Error uploading image" });
  }
};
