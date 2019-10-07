const { writeFileSync,readFileSync } = require('fs');
const pathUtil = require('path');
const { generateKeyPairSync,createHash } = require('crypto');
const bcrypt = require('bcrypt')

/**
 * 
 * @param {String} path relative path like ../../keys/
 * @param {Object} fileName {private:"privateName.pem", public:'publicName.pem'}
 */
const generateKeys = (
    path = '../../keys/' ,
    fileName={private:"rsa256private.pem", public:'rsa256public.pem'}
    ) =>{

    path = pathUtil.join(__dirname,path);
    
    let keysExists = false;
    // Validate if keys already exist
    try {
        fs.accessSync(path+fileName.private, fs.constants.R_OK | fs.constants.W_OK);
        console.log('can read/write');
        keysExists = true;
    } catch (err) {
        console.log('Keys not found or not accesible by the user')
    }
    
    // If don't then create them
    if(!keysExists){
        const { privateKey, publicKey } = generateKeyPairSync('rsa', {
            modulusLength: 1024,
            publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
            },
            privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: '',
            },
        });
    
        try {
            writeFileSync(path + fileName.private, privateKey)
            writeFileSync(path + fileName.public, publicKey)
        } catch (e) {
            console.log('ERROR creating keyPairs',e);
        }
        
    }
    
}

const HashString = (str='')=>{
    let hash = bcrypt.hashSync(str, process.env.PWD_SALT || 12);
    return hash;
}

const cipherMD5 = (dataString='')=>{
    return createHash('md5').update(dataString).digest("hex")
}

const cipherMD5FilePath=(path)=>{
    return cipherMD5(readFileSync(path));
}

module.exports = {
    generateKeys,
    cipherMD5,
    cipherMD5FilePath,
    HashString,
}