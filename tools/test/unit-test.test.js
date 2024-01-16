const assert = require('assert')

function addValue(a, b) {
	return a + b
}

describe('Suite de prueba', () => {
	it('should return 4', () => {
		let result = addValue(2, 2)
		assert.strictEqual(result, 4)
	})
})
