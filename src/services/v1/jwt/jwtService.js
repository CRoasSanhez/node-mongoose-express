'use strict'
const jwt   = require('jsonwebtoken');
const fs = require('fs');
const pathUtil = require('path');

const privateKEYpath =  pathUtil.join(__dirname,'../../../../keys/rsa256private.pem');
const publicKEYpath  =  pathUtil.join(__dirname,'../../../../keys/rsa256public.pem');

const privateKEY = fs.readFileSync(privateKEYpath,'utf8');
const publicKEY  = fs.readFileSync(publicKEYpath ,'utf8');

const issuer  = 'Bquate Inc';            // Issuer 
const subject  = 'support@bquate.com';    // Subject 
const audience  = 'default';  // Audience


class JwtService {
    constructor(serviceType = 'onboarding',action='init', algorithm = ["RS256"]){
        this.serviceType = serviceType;
        this.action = action;
        this.algorithm = algorithm; 
        this.defaultOptions = {
            issuer:  issuer,
            subject:  subject,
            audience:  audience,
            expiresIn:  "0",
            algorithm:  "RS256"
        };
    }

    // Returns signed token
    sign(){
        return jwt.sign(this.payload, privateKEY, this.signOptions || this.defaultOptions);
    }

    decode(token){
        return jwt.decode(token, {complete: true});
    }

    setSignOptions(signOptions){
        this.signOptions = signOptions;
        return this;
    }

    setServiceType(serviceType){
        this.serviceType = serviceType;
        return this;
    }

    setAction(action){
        this.action = action;
        return this;
    }

    setAlgorithm(algorithm){
        this.algorithm = algorithm;
        return this;
    }

    setPayload(payload){
        this.payload = payload;
        return this;
    }
    /**
     * 
     * @param {String} expiresIn 1hr,1d,1w,0 
     */
    setExpiration(expiresIn='0'){
        let expiration = {
            "1hr":"1hr",
            "1d":"1d",
            "1w":"1w",
            "0":"0",
        }
        this.defaultOptions.expiresIn = expiration[expiresIn] || '1w';
        return this;
    }

}

/**
 * Verifies token with public key
 * @param {string} token
 * @param {object} verifyOptions 
 */
module.exports.VerifyToken = (token, verifyOptions )=>{
    if(!verifyOptions){
        verifyOptions = {
            issuer:  issuer,
            subject:  subject,
            audience:  audience,
            expiresIn:  "0",
            algorithm:  "RS256"
        };
    }
    return jwt.verify(token, publicKEY, verifyOptions);
}

module.exports = {
    JwtService,
  };