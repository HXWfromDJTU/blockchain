let {Blockchain} = require('./chain');
let {Block} = require('./block');

let SwainCoin = new Blockchain();

//console.log(SwainCoin)
let counter = 0;  

// 添加第一个区块     
SwainCoin.addBlock(new Block(counter++,(new Date()).getDate(),{data:'the'+counter+'block'}));

// 添加定时添加区块   
// setInterval(_=>{
//     SwainCoin.addBlock(new Block(counter++,(new Date()).getDate(),{data:'the'+counter+'block'}));
// },3000);



// nonce新模式     

  