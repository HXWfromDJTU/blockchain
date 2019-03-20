let {Block} = require('./block')
class Blockchain{
    constructor(difficulty = 2) {
        this.chain = [this.createGenesisBlock()]; // 默认创建头区块   
        this.difficulty = difficulty; // 配合 nonce进行 spam block 限制
    }
    /**
     * 创建一个默认的区块
     */
    createGenesisBlock() {
        return new Block(0, (new Date()).getDate(), "Genesis block", "0");
    }
    /**
     * 获取到最新的一个区块
     */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    /**
     * 在链条尾部添加一个区块     
     * @param {*} newBlock 
     */
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash; // 新加入的区块的前置哈希值，指向当前链条的最为一个区块   
        newBlock.mineBlock(this.difficulty); // 给新创建的区块设置一个难度值，限制新区块创建的速度。（当然这个速度只一个平均值）                           
        this.chain.push(newBlock); // 存放入新的hash
    }
    /**
     * 检验整条链是否有效/合法
     */
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

exports.Blockchain = Blockchain;