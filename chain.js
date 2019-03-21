let {Block} = require('./block');
let {Transaction} = require('./transaction')
/**
 * 区块链类
 */
class Blockchain{
    constructor(difficulty = 2) {
        this.chain = [this.createGenesisBlock()]; // 默认创建头区块   
        this.difficulty = difficulty;  // 配合 nonce进行 spam block 限制
        this.pendingTransactions = []; // 缓存的未提交的交易。     
        this.miningReward = 100;   // 挖矿者的回报（解题者的奖励）     
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
     * 在链条尾部添加一个区块 (最新版本中，我们决定不让用户直接调用添加模块，转而改为createTransaction)  
     * @param {*} newBlock 
     */
    __addBlock(newBlock) {
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
            // 校验当前区块的hash值           
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            // 校验前后区块的hash值         
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
            // 判断当前区块中的所有交易是否都合法
            if(!currentBlock.hasValidTransactions()){
                return false;
            }
        }
        return true;
    }
    /**
     * 创建并且添加一个交易，并且缓存起来    
     */
    addTransaction(transaction){
        // 判断当前交易的参数是否有效
        if(!transaction.fromAddr || !transaction.toAddr){
            throw new Error('Transaction must include from and to address');
        }
        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to chain');
        }
       // 缓存未提交的交易     
       this.pendingTransactions.push(transaction);
    }
    /**
     * 为pending中的交易找到一个区块去记录它们，并且奖励这个计算者       
     * @param {*} miningRewardAddr 挖矿受益者地址
     */
    minePendingTransactions(miningRewardAddr){
        // 为这一段时间产生的交易去设定一个区块
         let block = new Block(Date.now(),this.pendingTransactions); // 注意这里的计算参数 pendingTransactions指的是过去一段时间内的交易       
         block.mineBlock(this.difficulty);

         // 添加这一个区块到链上    
         this.chain.push(block);   

         // 重置清空这些个缓冲的交易，并且在下一个区块中添加这个奖励的交易            
         this.pendingTransactions = [
             new Transaction(null,miningRewardAddr,this.miningReward) // 新增一个奖励转账操作   
         ]
    }
    /**
     * 获取一个账户的余额                
     * @param {*} addr 要查询的账户地址
     */
    getBalanceOfAddress(addr){
        let balance = 0; //余额从0开始计算  
        
        // 遍历整条链上的所有区块
        for(const block of this.chain){
            // 遍历当前区块上的所有交易     
            for(const transaction of block.transactions){
                   // 遇到是转出的就减少余额
                   if(transaction.fromAddr === addr){
                       balance -= transaction.amount;
                   }
                   // 遇到是转入的就增加余额         
                   if(transaction.toAddr === addr){
                       balance += transaction.amount;
                   }
            }
        }

    }
 
}

exports.Blockchain = Blockchain;