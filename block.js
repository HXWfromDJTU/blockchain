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
    /**
     * 根据区块的各项属性，计算初当前区块的哈希值    
     */
    calculateHash() {
        // 没有添加nonce的版本   
        // return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();   

        // 添加nonce的版本    
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    /**
     * 根据难度difficulty要求去寻找区块，这个过程就是在给你想要创建一个新的区块，你要给他赋予一个hash值，但是必须匹配difficulty，也就是前n位必须为0.                   
     */
    mineBlock(difficulty){
        // 循环去计算，值到符合difficulty要求为止       
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join('0')){
            this.nonce++; // 每进行一次计算，都累加     
            this.hash = this.calculateHash(); // 重新计算哈希   
        }
        console.log('success when nonce = '+ this.nonce +',hash = '+this.hash)
    }
}

exports.Block = Block;