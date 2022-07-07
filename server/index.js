const express = require("express");
const router = express.Router();
const fs = require("fs");
const { MongoClient, GridFSBucket } = require("mongodb");
let mongodb = require("mongodb");
const Grid = require("gridfs-stream");
let dbconnect = require("./config/dbconfig");
const mult = require("./config/video_upload");
let gfs;

router.post(
  "/upload-video",
  mult.upload.single("file"),
  async (req, res, next) => {
    console.log(req.file);
    // console.log(req.file.getAsBinary());
    var filename = __dirname + req.url;
    console.log(filename);
    // console.log(req);
    console.log("Uploading video...");

    // const bucket = new GridFSBucket(db);

    // // create upload stream using GridFS bucket
    // const videoUploadStream = bucket.openUploadStream(req.file.name);
    // console.log(videoUploadStream, "\n\n");
    // const videoReadStream = fs.createReadStream(filename);
    // console.log(videoReadStream, "\n\n");

    // // Finally Upload!
    // videoReadStream.pipe(videoUploadStream);

    // All done!
    res.status(200).send("Done...");
  }
);
router.get("/video/:filename", async (req, res, next) => {
  // let gfs = await dbconnect.get().collection("uploads");
  // let gfs_f = dbconnect.get().collection("uploads.files");
  // console.log(gfs_f);
  // console.log(gfs);
  // console.log(gfs.files);
  gfsBucket = new GridFSBucket(dbconnect.get(), {
    chunkSizeBytes: 4000,
    bucketName: "uploads",
  });
  // gfs = Grid(dbconnect.get(), mongodb);
  console.log(gfsBucket);

  dbconnect
    .get()
    .collection("uploads.files")
    .findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0)
        return res.status(404).json({ err: "No file exists" });
      console.log(file);
      const readstream = gfsBucket.openDownloadStreamByName(file.filename);
      readstream.pipe(res);
    });
});

module.exports = router;
