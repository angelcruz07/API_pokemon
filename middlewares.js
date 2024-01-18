const authmiddleware = require('./tools/auth-middleware')
const bodyPaser = require('body-parser')

const setupMiddlewares = (app) => {
	app.use(bodyPaser.json())
	authmiddleware.init()
	app.use(authmiddleware.protectWithJwt)
}

exports.setupMiddlewares = setupMiddlewares
