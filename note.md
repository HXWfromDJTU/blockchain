# 笔记📒   

### 区块

哈希值 = HASH256(标号+上一个区块哈希+时间戳+Stringfy的数据)

index 表明该区块在整条链中所处的位置    


### 区块链  

由多个区块组成，可以根据下标获取目标区块。   

添加新区块的时候，是往链条的尾部进行添加 （不能够往中间插入？）

可以娇艳整条链上的区块的有效性，比较前后区块的hash值。 


### 不可修改

如若修改了链中的任意一个区块的数据，那么则不能通过有效性校验。 因为校验的过程是实时计算新的哈希值。        

疑问：若是先读区保存这个hash值，保存下来

### 其他问题   

过多无用的区块   

对其中一个区块进行修改，而后重新计算所有的区块哈希值，使其仍然有效     

### POW(proof of work)     

主要工作就是防止滥用（垃圾信息spam）。    

nonce是一个不断增长的值，直到找到一个☝️能够匹配要求的随机数。     

> In case of Bitcoin, the proof-of-work mechanism ensures that only 1 block can be added every 10 minutes.


需要临时存放pending数据的地方。    

> The first thing that we need is a place to store pending transactions.

> However it should be possible to submit new transactions in between the creation of two blocks.       

> In Bitcoin’s case there is a block size limit of 2mb.      

> The public key will be used as our wallet's address and is freely shareable,    


> Remember: you can only sign transactions when they come out of your own pocket. You can't spend the coins of someone else.