const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

const config = require("../jwt/config")
const secret = config.secret


// middlewares
// import { encode } from '../middlewares/jwt.js';
const { encode } = require('../middleware/jwt')

router.post('/jwt/:userId', encode, (req, res, next) => {
    console.log("jwt route hit")
    return res
        .status(200)
        .json({
            success: true,
            authorization: req.authToken,

        });
    // export default router23; 

// router.post("/", (req, res) => {
//     console.log("req.body", req.body)
//     let info = {}
//     info.token = jwt.encode(req.body, secret)
//     res.json(info)
// })
    })

module.exports = router




