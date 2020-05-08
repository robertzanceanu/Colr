const Users = require('../../model/usersModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = async (request,response, body) => {
    const user = await Users.findOne({email: body.email})
    if(!user) {
        response.writeHead(400, {"Content-Type":"application/json"})
        response.write(JSON.stringify({
            error:'Emailul nu exista'
        }))
        response.end()
        return
    }

    const validPass = await bcrypt.compare(body.password, user.password)
    if(!validPass) {
        response.writeHead(400, {"Content-Type":"application/json"})
        response.write(JSON.stringify({
            error:'Parola foarte gresita!'
        }))
        response.end()
        return
    }
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
    response.writeHead(200, {
        "Content-Type":"application/json",
        'auth-token':token
    })
    response.write(JSON.stringify({
        id:user._id, 
        token:token, 
        name:`${user.firstName} ${user.lastName}`,
        role:user.role
    }))
    response.end()
}