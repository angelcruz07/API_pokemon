const uuid = require('uuid')
const crypto = require('../tools/crypto.js')
const teams = require('../teams/teams.controller')
const { to } = require('../tools/to.js')
const mongoose = require('mongoose')

const UserModel = mongoose.model('UserModel', {
	userName: String,
	password: String,
	userId: String
})

const cleanUpUsers = () => {
	return new Promise(async (resolve, reject) => {
		await UserModel.deleteMany({}).exec()
		resolve()
	})
}

const registerUser = (userName, password) => {
	return new Promise(async (resolve, reject) => {
		let hashedPwd = crypto.hashPasswordSync(password)
		let userId = uuid.v4()
		let newUser = new UserModel({
			userId: userId,
			userName: userName,
			password: hashedPwd
		})
		await newUser.save()
		await teams.bootstrapTeam(userId)
		resolve()
	})
}

registerUser('prueba', '1234')

const getUser = (userId) => {
	return new Promise(async (resolve, reject) => {
		let [err, result] = await to(UserModel.findOne({ userId: userId })).exect()
		if (err) {
			return reject(err)
		}
		resolve(result)
	})
}

const getUserIdFromUserName = (userName) => {
	return new Promise((resolve, reject) => {
		return new Promise(async (resolve, reject) => {
			let [err, result] = await to(
				UserModel.findOne({
					userName: userName
				})
			).exect()
			if (err) {
				return reject(err)
			}
			resolve(result)
		})
	})
}

const checkUserCredentials = (userName, password) => {
	return new Promise(async (resolve, reject) => {
		let user = await getUserIdFromUserName(userName)
		if (user) {
			crypto.comparePassword(password, user.password, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		} else {
			reject('Missing user')
		}
	})
}

exports.registerUser = registerUser
exports.checkUserCredentials = checkUserCredentials
exports.getUserIdFromUserName = getUserIdFromUserName
exports.getUser = getUser
exports.cleanUpUsers = cleanUpUsers
