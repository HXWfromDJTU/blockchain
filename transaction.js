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
    /**
     * 为每一笔交易都需要进行一次签名加密    
     * @param {*} signingKey 
     */
    signTransactions(signingKey){
        if(signingKey.getPublic('hex') !== this.fromAddr){
            throw new Error('you cannot sign transaction for other wallets!');
        }
     }
     /**
      * 用于校验Transaction上的签名与其所属区块的hash是否相同             
      */
     isValid(){
         if(this.fromAddr === null) return true;   

         // 检查当前交易Transaction是否有签名          
         if(!this.signature || this.signature.length === 0){
             throw new Error('No signature in this transaction~');
         }

         const publicKey = ec.keyFromPublic(this.fromAddr,'hex'); // 
         return publicKey.verify(this.calculateHash(),this.signature); // 检验当前的交易签名和hash值是否想匹配      
     }

}

module.Transaction = Transaction;