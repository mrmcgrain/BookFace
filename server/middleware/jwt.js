const jwt = require('jsonwebtoken')
// models
const UserModel = require('../models/capstone.model')
const SECRET_KEY = 'im a little tea pot';

module.exports = {
    encode: async (req, res, next) => {
        try {
            // const { userId } = req.params;
            // const { userId } = user._id;
            console.log("req.body", req.body)
            const user = await UserModel.findOne({ username: req.body.username });
            const payload = {
                userId: user._id,
                userType: user.type,
            };

            const authToken = jwt.sign(payload, SECRET_KEY);
            console.log('Auth', authToken);
            req.authToken = authToken;

            next();

        } catch (error) {
            return res.status(400).json({
                success: false, message: error.error
            });
        }
    },

    decode: (req, res, next) => {
        console.log("req.header", req.headers)
        console.log("req.headers.cookie", req.headers.cookie)
        if (!req.headers['authorization']) {
            console.log("IF HIT")
            return res.status(400).json({ success: false, message: 'No access token provided' })
        }
        const accessToken = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(accessToken, SECRET_KEY);
            req.userId = decoded.userId;
            req.userType = decoded.type;
            return next();
        } catch (error) {
            console.log("catch err", error)
            return res.status(401).json({ success: false, message: error.message })
        }
    },

    verify: (req, res, next) => {
        // console.log("req.headers.cookie", req.headers.cookie)
        // console.log("req.headers.cookie.token.split[1]", req.headers.cookie.split(" ")[1])

        const findToken = req.headers.cookie.split(" ")
        // console.log("find token", findToken)
        // console.log("maybe", findToken.filter((item) => item.startsWith("token")).splice(0,5).join(""))

        const token = findToken.find((item) => item.startsWith("token"))
        const final = token.slice(6)
        // console.log("token??", token)
        // console.log("final??", final)
        if (final) {
console.log("YOU have a token", final)
            jwt.verify(final, SECRET_KEY, async (err, data) => {
                // console.log("VER JWT DATA", data)
                // console.log("VER JWT err", err)
                if (err) {
                    console.log("VERIFY error", err)
                } else {
                    console.log("VERIFY data", data)
                    await data  ////  ?????
                    req.bob = data
                    req.user = data
                    return next()
                }
            })
        }else {
            return next()
        }

        // try {
        //     const decoded = jwt.verify(accessToken, SECRET_KEY);
        //     req.userId = decoded.username;
        //     req.userType = decoded.userId;
        //     return next();
        //     } catch (error) {
        //         console.log("catch err", error)
        //     return res.status(401).json({ success: false, message: error.message })
        //     }

    }
}