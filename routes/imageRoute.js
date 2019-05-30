const mongoose = require('mongoose');
const keys = require('../config/keys');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');
const express = require('express');
const router = express.Router();

const conn = mongoose.createConnection(keys.mongoDbUrl);

let gfs;
// Init gfs 
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create store engine
const storage = new GridFsStorage({
  url: keys.mongoDbUrl,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata: {
            user: req.user._id
          }
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.user)
  // res.json({ file: req.file })
  res.redirect('/');
});

router.get('/all', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist"
      });
    }

    return res.json(files)
  });
});

router.get('/:imgName', (req, res) => {
  gfs.files.findOne({ filename: req.params.imgName }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No files exist"
      });
    }

    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output 
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
});

module.exports = router;