const express = require('express')
const router = express.Router()
const User = require('./user')

router.get('/', (req, res) => {
    res.render('1_landingPage')
})

router.use('/user', User)


module.exports = router