const mongoose = require('mongoose')

let password = 'admin'

async function main() {
	await mongoose.connect(
		`mongodb+srv://admin:${password}@cluster0.vwrrmp7.mongodb.net/?retryWrites=true&w=majority`
	)
}

const kittySchema = new mongoose.Schema({
	name: String
})

const Kitten = mongoose.model('Kitten', kittySchema)
const silence = new Kitten({ name: 'Silence' })
console.log(silence.name)
