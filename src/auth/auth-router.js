const express = require('express')
const AuthService = require('./auth-service')
const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter.post('/', jsonBodyParser, (req, res, next) => {
    const { username, password } = req.body
    const loginUser = { username, password }

    for (const [key, value] of Object.entries(loginUser)) {
        if (value == null) {
            return res.status(400).json({
                error: `Missing ${key} in request body`
            })
        }
    }

    AuthService.getUserWithUserName(
        req.app.get('db'), loginUser.username
    )
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'Incorrect Username or Password' })
            }

            return AuthService.comparePassword(
                loginUser.password, user.password
            )
                .then(passwordsMatch => {
                    if (!passwordsMatch) {
                        return res.status(400).json({
                            error: 'Incorrect Username or Password'
                        })
                    }

                    const sub = user.username

                    const payload = {
                        member_id: user.id
                    }

                    res.send({
                        authToken: AuthService.createJwt(sub, payload)
                    })
                })
        })
        .catch(next)
})

module.exports = authRouter