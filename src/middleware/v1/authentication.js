const {VerifyToken} = require('../../services/v1/jwt/jwtService');

class Authentication{
    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
    }
    
    checkToken(){
        const {req, res, next} = this; 
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
      
        if (token) {
            VerifyToken(token)
        } else {
          throw new Error('Invalid User');
        }
    };

    async getCurrentUser(token){
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }

        if (!token) {
            return null
        } 
        let claims = VerifyToken(token);

        if(!claims) return null;

        // TODO Get user from DB
        
        console.log('user obtained')
        let user = {
            id: 343,
            name:"demo",
            email:"demo@bquate.com",
            roles:["admin"],
            actions:["demo@bquate.com"],
            origin: "coda"
        }
        return user;
        
    };
}

AuthMiddleware = (req,res,next)=>{
    let Auth = new Authentication(req,res,next);
    let currentUser = Auth.getCurrentUser();
    req.currentUser = currentUser;
    next();
}


module.exports= {
    AuthMiddleware
  };