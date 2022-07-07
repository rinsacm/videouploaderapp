const methodOverride = require("method-override");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");

const mongodb_url = "mongodb://localhost:27017/videoUploads";

const storage = new GridFsStorage({
  url: mongodb_url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      try {
        crypto.randomBytes(16, (err, buff) => {
          if (err) {
            print("rejecting........");
            print(err);
            return reject(err);
          }
          const filename =
            buff.toString("hex") + path.extname(file.originalname);
          const fileinfo = {
            filename: filename,
            bucketName: "uploads",
          };
          console.log(fileinfo);
          resolve(fileinfo);
        });
      } catch (e) {
        console.log(e);
      }
    });
  },
});
module.exports.upload = multer({ storage: storage });
