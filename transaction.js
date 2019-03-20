/**
 * 交易类     
 */
class Transaction{
    /**
     * 构造函数
     * @param {*} fromAddr 转出账户
     * @param {*} toAddr 转入账户
     * @param {*} amount 交易金额
     */
    constructor(fromAddr,toAddr,amount){
        this.fromAddr = fromAddr;  // 流出账户
        this.toAddr = toAddr;  // 流入账户
        this.amount = amount; // 交易量
    }
}

module.Transaction = Transaction;