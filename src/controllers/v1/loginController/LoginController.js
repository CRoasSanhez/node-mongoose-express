const { LoginService } = require('../../../services/v1/login/loginService')
 
 
/*
 * call other imported services, or same service but different functions here if you need to
*/
const Login = async (req, res, next) => {
  const {user, content} = req.body
  try {
    let loginResponse = await LoginService(user, content)
    res.status(201).json({data:loginResponse, success:true})
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}
 
module.exports = {
    Login
}