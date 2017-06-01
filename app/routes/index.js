const multer = require('multer')
const path = require('path')

const dest = path.resolve(__dirname, '../../uploads')

const uploader = multer({
  dest,
  limits: {
    fileSize: 4000000
  }
}).single('uploadedFile')

const emptyDir = (path) => {
  const fs = require('fs')
  fs.readdir(path, (err, files) => {
    files.forEach(file => fs.unlink(path + "/" + file, console.log))
  })
}

module.exports = (app) => {
  app.route('/')
    .get((req, res) => {
      res.render('index')
    })
    .post((req, res) => {
      uploader(req, res, (err) => {
        if (err) {
          return res.json(err)
        }

        res.json({ size: req.file.size })
        emptyDir(dest)
      })
    })
}