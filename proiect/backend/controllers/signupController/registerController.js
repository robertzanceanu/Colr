const Users = require('../../model/usersModel')
const bcrypt = require('bcryptjs')

module.exports = async (request,response, body) => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(body.password, salt)

    const newUser = new Users({
        email: body.email,
        password: hashPassword,
        firstName: body.firstName,
        lastName: body.lastName,
        role:body.role
    })

    const emailExists = await Users.findOne({email: body.email})
    if(emailExists) {
        response.writeHead(400, {"Content-Type":"application/json"})
        response.write(JSON.stringify({
            error:'Emailul exista deja'
        }))
        response.end()
        return
    }
    try {
        const saveUser = await newUser.save()
        response.writeHead(200, {"Content-Type":"application/json"})
        response.write(JSON.stringify(saveUser))
        response.end()
    } catch(err) {
        response.writeHead(400, {"Content-Type":"application/json"})
        response.write(JSON.stringify({
            error:err
        }))
        response.end()
    }
}