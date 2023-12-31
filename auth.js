const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt

module.exports = (passport) => {
	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
		secretOrKey: 'secretPassword'
	}
	passport.use(
		new JwtStrategy(opts, (decoded, done) => {
			console.log('decoded jwt', decoded)
			return done(null, decoded)
		})
	)
}
