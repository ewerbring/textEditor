const express = require("express");
const router = express.Router();
const UserContent = require("../models/UserContent");
const Link = require('../models/Link')
const TransformerText = require('../models/TransformerText')
const User = require('../models/User')

router.post('/createUserContent', (req, res) => {
    console.log("## CREATING USER CONTENT ##")
    if (!req.session.passport) return res.json({ message: "Please login to save" })

    const { paragraphWidth = '', fontSize = '', content = '', projectName = '' } = req.body

    const newUserContent = new UserContent({
        paragraphWidth,
        fontSize,
        content,
        projectName,
        userId: req.session.passport.user
    })

    newUserContent.save()
        .then(content => {
            res.json({ message: "Content successfully save" })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/createLink', (req, res) => {
    console.log("## CREATING LINK ##")

    if (!req.session.passport) return res.json({ message: "Please login to save" })

    const { link, layer = '', width = '', height = '', opacity = '', projectName } = req.body

    const newLink = new Link({
        link,
        layer,
        width,
        height,
        opacity,
        projectName,
        userId: req.session.passport.user
    })

    newLink.save()
        .then(content => {
            console.log(content)
            res.json({ message: "Content successfully save" })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/createTransformerText', (req, res) => {
    console.log("## CREATING TRANSFORMER TEXT ##")

    if (!req.session.passport) return res.json({ message: "Please login to save" })

    const { paragraphWidth = '', fontSize = '', content = '', projectName } = req.body

    const newTransformerText = new TransformerText({
        paragraphWidth,
        fontSize,
        content,
        projectName,
        userId: req.session.passport.user
    })

    newTransformerText.save()
        .then(content => {
            res.json({ message: "Content successfully save" })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/fetchProjectContent', (req, res) => {
    console.log("## FETCHING PROJECT CONTENT")
    
    if (!req.session.passport) return res.json({ message: "Please login to save" })

    const { projectName } = req.body

    const content = {}

    UserContent.find({ projectName }, (err, userContent) => {
        content.userContent = userContent
    })
    .then(Link.find({ projectName }, (err, link) => {
        content.link = link
    }))
    .then(TransformerText.find({ projectName }, (err, transformerText) => {
        content.transformerText = transformerText
    }))
    .then(() => res.json({ content }))
    .catch(err => {
        console.log(err)
        res.json({ message: "Error fetching userContent" })
    })
})

router.get('/projects', (req, res) => {
    console.log("## FETCHING PROJECT NAMES ##")

    if (!req.session.passport) return res.json({ message: "Please login to fetch project names" })

    const userId = req.session.passport.user

    User.find({ _id: userId }, (err, user) => {
        res.json({ data: user.projectNames })
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;
