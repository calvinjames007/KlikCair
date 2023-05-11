const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

let isLoggedIn = function (req, res, next) {
    if (req.session.UserId) {
        const errors = `You already logged-in.`
        res.redirect(`/user/dashboard?errors=${errors}`)
    } else {
        next()
    }
  }

router.get('/add', Controller.showFormRegisterUser)
router.post('/add', Controller.addNewUser)

router.get('/login', isLoggedIn, Controller.showFormLogin)
router.post('/login', Controller.postLogin)

router.use((req, res, next) => {
    if (!req.session.UserId) {
        const errors = `Please login first.`
        res.redirect(`/user/login?errors=${errors}`)
    } else {
        next()
    }
  })

router.get('/dashboard', Controller.showDashboard)

router.get('/location', Controller.showLocation)

router.get('/profile', Controller.showProfile)

router.get('/logout', Controller.logout)

module.exports = router