const URLS = new function () {
    this.base = 'http://localhost:3000'
    this.assets = this.base + '/assets',
    this.register = this.base + '/register',
    this.signin = this.base + '/signin',
    this.verifyJWT = this.base + '/verifyJWT'
}


module.exports = { URLS }