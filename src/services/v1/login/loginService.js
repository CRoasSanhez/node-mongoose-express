const { LoginRepository } = require('../../../repository/v1/loginRepository/loginRepository')
 
/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
const LoginService = async (user, content) => {
  try {
    return await LoginRepository(user, content)
  } catch(e) {
    throw new Error(e.message)
  }
}
 
module.exports = {
    LoginService
}