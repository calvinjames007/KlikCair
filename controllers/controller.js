const {User, Profile, Loan, Platform} = require('../models')
const {Op} = require('sequelize')
const bcrypt = require('bcryptjs');

class Controller {
    static showFormRegisterUser (req, res) {
        res.render('2_registerPage')
    }

    static addNewUser (req, res) {
        const {email, password} = req.body

        User.create({
            email:email,
            password:password,
        })
        .then((data) => {
            return Profile.create({
                name: `user-${email}`,
                age: 0,
                address: `Indonesia`,
                UserId: data.id
            })
        })
        .then(() => {
            res.redirect('/')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static showFormLogin (req, res) {
        res.render('3_loginPage')
    }

    static postLogin (req, res) {
        const {email, password} = req.body

        console.log(req.body)

        User.findOne({where: {email}})
        .then((user) => {
            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password);
                if (isValidPassword) {

                    req.session.UserId = user.id;

                    return res.redirect("/user/dashboard")
                } else {
                    const errors = `Invalid+user+or+password`;
                    return res.redirect(`/user/login?errors=${errors}`)
                }
            } else {
                const errors = `User+or+password+not+found`;
                return res.redirect(`/user/login?errors=${errors}`)
            }
        })
        .catch((err) => {
            res.send(err)
        });
    }

    static showDashboard (req, res) {
        res.render('4_dashboard')
    }

    static showLocation(req, res) {
        const { search, sort } = req.query;

       if (sort) {
        Platform.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        .then((result) => {
            res.render("5_location", {result, title: `Find Your Platform Location`})    
            })
            .catch((err) => {
                res.render(err);
            });
       }

        Platform.findByLocation(search)
        .then((result) => {
        res.render("5_location", {result, title: `Find Your Platform Location`})    
        })
        .catch((err) => {
            res.render(err);
        });
    }

    static showProfile(req, res) {
        console.log(req.session);
        Profile.findOne({
            where: {
                id: req.session.UserId
            }
        })
        .then((result) => {
            res.render("6_profile", {result, title: `My Profile`})    
        })
        .catch((err) => {
            res.send(err);
        });
    }

    static logout(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/user/login");
            }
          })
    }
}

module.exports = Controller