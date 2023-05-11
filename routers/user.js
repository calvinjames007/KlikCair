const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/add', Controller.showFormRegisterUser)
router.post('/add', Controller.addNewUser)

router.get('/login', Controller.showFormLogin)
router.post('/login', Controller.postLogin)

router.use((req, res, next) => {
    console.log(req.session);

    if (!req.session.UserId) {
        const errors = `Please login first.`
        res.redirect(`/user/login?errors=${errors}`)
    } else {
        next()
    }
  })

router.get('/dashboard', Controller.showDashboard)

router.get('/logout', Controller.logout)

module.exports = router