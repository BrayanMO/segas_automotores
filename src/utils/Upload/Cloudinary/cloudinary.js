const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.secure_url,
          id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};

exports.destroy = (id) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(id, (result) => {
      resolve(result);
    });
  });
};
