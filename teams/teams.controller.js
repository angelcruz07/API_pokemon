const { to } = require('../tools/to.js')
const mongoose = require('mongoose')

const TeamsModel = mongoose.model('TeamsModel', { userId: String, team: [] })

const cleanUpTeam = () => {
	return new Promise(async (resolve, reject) => {
		await TeamsModel.deleteMany({}).exec()
		resolve()
	})
}

const bootstrapTeam = (userId) => {
	return new Promise(async (resolve, reject) => {
		let newTeam = new TeamsModel({ userId: userId, team: [] })
		await newTeam.save()
		resolve()
	})
}

const getTeamOfUser = (userId) => {
	return new Promise(async (resolve, reject) => {
		let [err, dbTeam] = await to(TeamsModel.findOne({ userId: userId }).exec())
		if (err) {
			return reject(err)
		}
		resolve(dbTeam || [])
	})
}

const addPokemon = (userId, pokemon) => {
	return new Promise(async (resolve, reject) => {
		let [err, dbTeam] = await to(TeamsModel.findOne({ userId: userId }).exec())
		if (err) {
			return reject(err)
		}
		if (dbTeam.team.length == 6) {
			reject('Already have 6 pokemon')
		} else {
			dbTeam.push(pokemon)
			await dbTeam.save()
			resolve()
		}
	})
}

const deletePokemonAt = (userId, index) => {
	return new Promise(async (resolve, reject) => {
		let [err, dbTeam] = await to(TeamsModel.findOne({ userId: userId }).exec())
		if (err) {
			return reject(err)
		}
		if (dbTeam.team[index]) {
			dbTeam.team.splice(index, 1)
		}
		await dbTeam.save()
		resolve()
	})
}

const setTeam = (userId, team) => {
	return new Promise(async (resolve, reject) => {
		let [err, dbTeam] = await to(TeamsModel.findOne({ userId: userId }).exec())
		if (err) {
			return reject(err)
		}
		dbTeam.team = team
		await dbTeam.save()
	})
}

exports.bootstrapTeam = bootstrapTeam
exports.addPokemon = addPokemon
exports.setTeam = setTeam
exports.getTeamOfUser = getTeamOfUser
exports.cleanUpTeam = cleanUpTeam
exports.deletePokemonAt = deletePokemonAt
