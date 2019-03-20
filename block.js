const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index; // 本区块在当前的链条中所在的位置          
        this.previousHash = previousHash; // 上一个区块的hash   
        this.timestamp = timestamp; // 时间戳
        this.data = data; // data
        this.hash = this.calculateHash();  // 计算区块哈希值 
        this.nonce = 0; // 用于限制区块的创建速度     
    }

    calculateHash() {
        // 没有添加nonce的版本   
        // return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();   

        // 添加nonce的版本    
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join('0')){
            this.nonce++; // 每进行一次计算，都累加     
            this.hash = this.calculateHash(); // 重新计算哈希   
        }
    }
}


exports.Block = Block;