const bcrypt = require('bcrypt')

function hashing(password) {
    let hash = bcrypt.hashSync(password, 10)
    return hash
}

module.exports = hashing