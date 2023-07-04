const express = require('express')
const router = express.Router();
const logger = require('../logger')
const multer = require('multer');
const path  = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({storage: storage}).single('myfile')
router.get('/login', (req, res, next) => {
    logger.info(`This is a sample. `)
    try{
        res.sendFile(path.join(__dirname + '../' +'/login.html'))
        // throw new Error('Custom Error.')
    }catch(err){
        next(err)
    }
})

router.get('/new', (req, res) => {
    res.render('newUser', {firstname: ''})
})



router.post('/create' , (req, res) => {
    console.log(req.body.firstname)
    // console.log('req', req)
    upload(req, res, (err) => {
        if(err){
            res.send('Something went wrong!')
        }
        // res.end("File uploaded successfully")
        res.send(`User Created with firstname: ${req.body.firstname}`)
        return console.log('File Uploaded Successfully')
    })
})

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body)
    console.log('Username: ', username, ' Password: ', password)
    res.send('Form Submitted')
    return
})

module.exports = router