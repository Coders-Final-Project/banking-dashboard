"use server";

import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import * as cloudinary from "cloudinary";

import { UploadedFileProps } from "@/interface";

import User from "../models/user.model";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function saveFileToLocal(formData: any) {
  const file = formData.get("fileUrl");

  const result = file.arrayBuffer().then((data: any) => {
    const buffer = Buffer.from(data);
    const name = uuidv4();

    const ext = file.type.split("/")[1];

    //Does not work in Vercel
    // const uploadDir = path.join(
    //   process.cwd(),
    //   "public/uploads",
    //   `/${name}.${ext}`,
    // );

    const tempdir = os.tmpdir();
    const uploadDir = path.join(tempdir, `/${name}.${ext}`); //Work in Vercel

    fs.writeFile(uploadDir, buffer);

    return { filepath: uploadDir, filename: file.name };
  });

  return result;
}

export async function uploadFileToCloudinary(newFile: any) {
  const response = cloudinary.v2.uploader.upload(newFile.filepath, {
    folder: "banking",
  });

  return response;
}

export async function uploadFile(formData: any) {
  try {
    const userID = formData.get("userId");
    const fileName = formData.get("fileName");

    const newFile = await saveFileToLocal(formData);

    const file = await uploadFileToCloudinary(newFile);

    const newFileItem: UploadedFileProps = {
      fileName,
      fileUrl: { public_id: file.public_id, secure_url: file.secure_url },
    };

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        $push: {
          uploadedFiles: newFileItem,
        },
      },
      { new: true },
    );

    fs.unlink(newFile.filepath);

    return { message: "Upload success!", data: newFileItem, status: 200 };
  } catch (error: any) {
    return { msg: error.message, status: 500 };
  }
}
