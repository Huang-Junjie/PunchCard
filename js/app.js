if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var account;
var password;
var punchcardtestContract;
var punchcardtest;
var contractAddr;
//var contractAddr = '0xD1cA7A49E4b809B3645789074a38e41b9f8990F6'; //将合约换为部署地址

$(function() {
	init();
 	$('#login').click(loginEvent);
 	$('#register').click(registerEvent);
 	$('#loginButton').click(loginButtonEvent);
 	$('#quit').click(quitEvent);
 	$('#deployButton').click(deployButtonEvent);
 	$('#joinButton').click(joinButtonEvent); 		 
 	$('#punchButton').click(punchButtonEvent);
 	$('#resetButton').click(resetButtonEvent);
 	$('#refreshButton').click(getInfo);
});

function init() {
	getAccount();
	if (contractAddr) {
		punchcardtest = new web3.eth.Contract([{"constant":true,"inputs":[],"name":"sumOfMoneyOfpunched","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"succeedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participators","outputs":[{"name":"beginTime","type":"uint256"},{"name":"money","type":"uint256"},{"name":"punchTimes","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"week","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOpenTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"ifPunched","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"punchIn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getWeek","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"beginTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ifBegin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"join","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"achievers","outputs":[{"name":"addr","type":"address"},{"name":"money","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}], contractAddr);
		console.log(punchcardtest);
	}
}

function getAccount() {
	web3.eth.getAccounts().then(e => {
		for (var i = 0; i < e.length; i++) { 
			$('#accounts').append('<option value=' + e[i] + '/>');
		}
	});
}

function loginEvent() {
	$('#loginBox').css('display', 'block');
	$('#registerBox').css('display', 'none');
	$('#login').removeClass('unselected');
	$('#register').addClass('unselected');
	$('.inputError').css('display', 'none');
}

function registerEvent() {
	$('#loginBox').css('display', 'none');
	$('#registerBox').css('display', 'block');
	$('#login').addClass('unselected');
	$('#register').removeClass('unselected');
	$('.inputError').css('display', 'none');
}

function loginButtonEvent() {
	account = $('#accountInput').val();
	password = $('#passwordInput').val();
	//
	$('#beginBox').css('display', 'none');
	$('#punchCard').css('display', 'block');
	getInfo();
	//
	// web3.eth.personal.unlockAccount(account, password)
	// .then(() => {
	// 	$('#beginBox').css('display', 'none');
	// 	$('#punchCard').css('display', 'block');
	// 	getInfo();
	// })
	// .catch((err) =>{
	// 	$('.inputError').css('display', 'block');
	// 	console.log(err);
	// });
}

function quitEvent() {
	$('#beginBox').css('display', 'block');
	$('#punchCard').css('display', 'none');
	$('#accountInput').val('');
	$('#passwordInput').val('');
}



function deployButtonEvent() {
	punchcardtestContract = new web3.eth.Contract([{"constant":true,"inputs":[],"name":"sumOfMoneyOfpunched","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"succeedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participators","outputs":[{"name":"beginTime","type":"uint256"},{"name":"money","type":"uint256"},{"name":"punchTimes","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"week","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOpenTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"ifPunched","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"punchIn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getWeek","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"beginTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ifBegin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"join","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"achievers","outputs":[{"name":"addr","type":"address"},{"name":"money","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
	punchcardtestContract.deploy({
		data: '0x60806040526000600355600060045534801561001a57600080fd5b5042600081905550611076806100316000396000f3006080604052600436106100c5576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806325993370146100ca5780632d38bacf146100f55780633a372c94146101205780634995b4581461018557806358c02b72146101b057806368c22da4146101db5780636ca7f2fe14610220578063874d6d811461023757806388149fb914610262578063aa3511491461028d578063b688a363146102bc578063d2e5cff0146102c6578063d826f88f1461033a575b600080fd5b3480156100d657600080fd5b506100df610351565b6040518082815260200191505060405180910390f35b34801561010157600080fd5b5061010a610357565b6040518082815260200191505060405180910390f35b34801561012c57600080fd5b50610161600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061035d565b60405180848152602001838152602001828152602001935050505060405180910390f35b34801561019157600080fd5b5061019a610387565b6040518082815260200191505060405180910390f35b3480156101bc57600080fd5b506101c561038d565b6040518082815260200191505060405180910390f35b3480156101e757600080fd5b5061020660048036038101908080359060200190929190505050610398565b604051808215151515815260200191505060405180910390f35b34801561022c57600080fd5b50610235610406565b005b34801561024357600080fd5b5061024c6109ca565b6040518082815260200191505060405180910390f35b34801561026e57600080fd5b50610277610a18565b6040518082815260200191505060405180910390f35b34801561029957600080fd5b506102a2610a1e565b604051808215151515815260200191505060405180910390f35b6102c4610a30565b005b3480156102d257600080fd5b506102f160048036038101908080359060200190929190505050610ca7565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b34801561034657600080fd5b5061034f610cfa565b005b60045481565b60035481565b60016020528060005260406000206000915090508060000154908060010154908060020154905083565b60055481565b600080544203905090565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600301826007811015156103e957fe5b602091828204019190069054906101000a900460ff169050919050565b607860005401421015801561042e5750600a601e607860005442030381151561042b57fe5b06105b15156104a2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe5b7b2e99499e8bf87e4bb8ae697a5e68993e58da1e697b6e997b4000000000081525060200191505060405180910390fd5b607860d2600054010142101515610521576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe69cace8bdaee68993e58da1e9a1b9e79baee5b7b2e7bb93e69d9f000000000081525060200191505060405180910390fd5b600054600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001541415156105dc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe69caae58aa0e585a5e69cace591a8e68993e58da1e9a1b9e79bae000000000081525060200191505060405180910390fd5b601e60786000544203038115156105ef57fe5b04600581905550600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160055460078110151561064757fe5b602091828204019190069054906101000a900460ff161515156106d2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807fe9878de5a48de68993e58da12e0000000000000000000000000000000000000081525060200191505060405180910390fd5b60018060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160055460078110151561072457fe5b602091828204019190066101000a81548160ff021916908315150217905550600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600081548092919060010191905055503373ffffffffffffffffffffffffffffffffffffffff166108fc6007600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101548115156107fd57fe5b049081150290604051600060405180830381858888f19350505050158015610829573d6000803e3d6000fd5b506007600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002015414156109c857600360008154809291906001019190505550600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154600460008282540192505081905550600260408051908101604052803373ffffffffffffffffffffffffffffffffffffffff168152602001600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101548152509080600181540180825580915050906001820390600052602060002090600202016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101555050505b565b60006078600054014210156109e25760009050610a15565b607860d260005401014211156109fb5760009050610a15565b6001601e6078600054420303811515610a1057fe5b040190505b90565b60005481565b6000607860d260005401014210905090565b600060786000540142101515610ad4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260278152602001807fe5b7b2e99499e8bf87e69cace8bdaee68993e58da1e9a1b9e79baee58aa0e58581526020017fa5e697b6e997b40000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600054600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015414151515610b90576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe5b7b2e58aa0e585a5e69cace591a8e68993e58da1e9a1b9e79bae000000000081525060200191505060405180910390fd5b678ac7230489e800003410610bad57678ac7230489e80000610baf565b345b905060806040519081016040528060005481526020018281526020016000815260200160e060405190810160405280600015151515815260200160001515151581526020016000151515158152602001600015151515815260200160001515151581526020016000151515158152602001600015151515815250815250600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001556020820151816001015560408201518160020155606082015181600301906007610ca0929190610f01565b5090505050565b600281815481101515610cb657fe5b90600052602060002090600202016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b600080607860d2600054010142111515610d7c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe69cace8bdaee68993e58da1e9a1b9e79baee69caae7bb93e69d9f000000000081525060200191505060405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff163191503373ffffffffffffffffffffffffffffffffffffffff166108fc600a84811515610dbc57fe5b049081150290604051600060405180830381858888f19350505050158015610de8573d6000803e3d6000fd5b50600a82811515610df557fe5b0482039150600090505b600354811015610ecc57600281815481101515610e1857fe5b906000526020600020906002020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60045484600285815481101515610e7657fe5b90600052602060002090600202016001015402811515610e9257fe5b049081150290604051600060405180830381858888f19350505050158015610ebe573d6000803e3d6000fd5b508080600101915050610dff565b6000600281610edb9190610f9a565b506000600381905550600060048190555061014a60008082825401925050819055505050565b826007601f01602090048101928215610f895791602002820160005b83821115610f5a57835183826101000a81548160ff0219169083151502179055509260200192600101602081600001049283019260010302610f1d565b8015610f875782816101000a81549060ff0219169055600101602081600001049283019260010302610f5a565b505b509050610f969190610fcc565b5090565b815481835581811115610fc757600202816002028360005260206000209182019101610fc69190610ffc565b5b505050565b610ff991905b80821115610ff557600081816101000a81549060ff021916905550600101610fd2565b5090565b90565b61104791905b8082111561104357600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905550600201611002565b5090565b905600a165627a7a7230582043be3769010f4721a7cb127f85077ce7a4da8508e6f8fae6d024c014d45bfa9a0029'
	})
	.send({
	    from: account,
	    gas: 4700000
	})
	.then((newContractInstance) => {
		console.log(newContractInstance);
		punchcardtest = newContractInstance;
	    getInfo();
	});
	alert("正在部署，等待挖坑");
}

function getInfo() {
	web3.eth.getBalance(account)
	.then((balance) => {
		$('#balance').text(web3.utils.fromWei(balance, 'ether'));});

	if (punchcardtest) {
		$("#addr").text(punchcardtest.options.address);

		punchcardtest.methods.ifBegin().call({from:account})
		.then((result) => {
	    	if (result) {
	    		$("#ifItemOpen").text("是");
	    		punchcardtest.methods.getOpenTime().call({from:account})
				.then((res) => {
					console.log("openTime: " + res);
					$("#openTime").text(res);
				});
	    	}
	    	else {
	    		$("#ifItemOpen").text("否");
	    	}
		});

		punchcardtest.methods.participators(account).call({from:account})
		.then((result) => {
	    	console.log(result);
	    	punchcardtest.methods.beginTime().call({from:account})
	    	.then((time) => {
	    		if (result.beginTime == time) {
		    		$("#ifJoined").text("是");
		    		$("#joinMoney").text(web3.utils.fromWei(result.money, 'ether'));
		    		for (var i = 0; i < 7; i++) {
						(function(i) {
							punchcardtest.methods.ifPunched(i).call({from:account})
							.then((result) => {
								if (result) $(".punchMark").eq(i).removeClass('unPunchedDay');
								else $(".punchMark").eq(i).addClass('unPunchedDay');
							});
						})(i);
					}
		    	}
		    	else {
		    		$(".punchMark").addClass('unPunchedDay');
		    		$("#ifJoined").text("否");
		    		$("#joinMoney").text(0);
		    	}
	    	})	
		});

		

		punchcardtest.methods.getWeek().call({from:account})
		.then((result) => {
			console.log("week:" + result);
			$(".days").removeClass('today');
			if (result > 0) $(".days").eq(result - 1).addClass('today');
		});
	}
}

function joinButtonEvent() {
	try{
		var money = web3.utils.toWei($('#joinInput').val(), 'ether');
		// web3.eth.personal.unlockAccount(account, password);
		punchcardtest.methods.join().send({from:account, value:money, gas:3000000})
		.then((result) => {
			getInfo();
		;})
		.catch((err) => {
			alert(err);
		});
		alert("正在参与，等待挖坑");

	} catch(err) {
		alert(err);
	}
}	

function punchButtonEvent() {
	punchcardtest.methods.punchIn().send({from:account, gas:3000000})
	.then((result) => {
		getInfo();
	;})
	.catch((err) => {
		alert(err);
	});
	alert("正在打卡，等待挖坑");
}

function resetButtonEvent() {
   punchcardtest.methods.reset().send({from:account, gas:3000000})
	.then((result) => {
		getInfo();
	;})
	.catch((err) => {
		alert(err);
	});
	alert("正在结算，等待挖坑");
}


//判断本周项目是否开启
function ifBegin(beginTime) {
	return Date.now() / 1000 < beginTime + 7 * 30 seconds + 2 minutes;
}

function ifPunched(uint i) public view returns(bool) {
	return participators[msg.sender].punch[i];
}

function getWeek() public view returns(uint) {
	if (now < beginTime + 2 minutes) return 0;
	if (now > beginTime + 7 * 30 seconds + 2 minutes) return 0;
	return (now - beginTime - 2 minutes) / 30 seconds + 1;
}

function getOpenTime() public view returns(uint256) {
	return now - beginTime;
}