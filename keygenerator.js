const EC = require('elliptic').ec;

const ec = new EC('secp256k1');   

// 生成钥匙对    
const key = ec.genKeyPair();

// 获取出公钥和私钥    
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');    


// console.log(publicKey+' === '+ privateKey)   
