import { Buffer } from "buffer";
var global = global || window;
global.Buffer = global.Buffer || require("buffer").Buffer;


const Caver = require('caver-js');
const caver = new Caver('https://api.baobab.klaytn.net:8651/');
let account = caver.klay.accounts.createWithAccountKey('0x38596eD0dceaC58632bCf8BD92B5af3854d6A768', '0xf1d92ecda4d008025f094823827513dfd167eb9283b2f08be81bd06f9f2ac1e3')
caver.klay.accounts.wallet.add(account)

function execute_func(){
    var myContract = new caver.klay.Contract([
        {
            constant: false,
            inputs: [
            {
            internalType: "uint256",
            name: "requestedCount",
            type: "uint256"
            }
            ],
            name: "publicMint",
            outputs: [],
            payable: true,
            stateMutability: "payable",
            type: "function"
        },
    ]);
    
    myContract.options.address = '0x226d6A83e725651B48020f6A645D88c7B37005de';
    myContract.options.gas = '3000000';
    myContract.options.gasPrice = parseInt(caver.klay.gasPriceAt("latest"), 16);
    myContract.methods.publicMint(1).send({
        from : '0x38596eD0dceaC58632bCf8BD92B5af3854d6A768', 
        gasPrice : parseInt(caver.klay.gasPriceAt("latest"), 16),
        gas : '3000000',
        value : caver.utils.toPeb('1','KLAY')
    }, function(err, transactionHash){
        console.log(transactionHash);
    });
}

export default execute_func;
