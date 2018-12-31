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
//var contractAddr = '0x4Ac753B129324687a8D21Dd8904531e9D3B22a5F'; //将合约换为部署地址

$(function() {
	init();
 	$('#login').click(loginEvent);
 	$('#register').click(registerEvent);
 	$('#loginButton').click(loginButtonEvent);
 	$('#registerButton').click(registerButtonEvent);
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
		punchcardtest = new web3.eth.Contract([{"constant":true,"inputs":[],"name":"sumOfMoneyOfpunched","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"succeedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participators","outputs":[{"name":"beginTime","type":"uint256"},{"name":"money","type":"uint256"},{"name":"punchTimes","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"week","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"ifPunched","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"punchIn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"beginTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"join","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"achievers","outputs":[{"name":"addr","type":"address"},{"name":"money","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}], contractAddr);
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
	$('#currentAccount').text(account);
	web3.eth.personal.unlockAccount(account, password)
	.then(() => {
		$('#beginBox').css('display', 'none');
		$('#punchCard').css('display', 'block');
		getInfo();
	})
	.catch((err) =>{
		$('.inputError').css('display', 'block');
		console.log(err);
	});
}

function registerButtonEvent() {
	if ($('#passwordInput1').val() != $('#passwordInput2').val()) {
		$('.inputError').css('display', 'block');
	}
	else {
		web3.eth.personal.newAccount($('#passwordInput1').val())
		.then((acc) => {
			$('#accounts').append('<option value=' + acc + '/>');
			loginEvent();
			console.log(acc);
		});
	}
}

function quitEvent() {
	$('#beginBox').css('display', 'block');
	$('#punchCard').css('display', 'none');
	$('#accountInput').val('');
	$('#passwordInput').val('');
	$('#joinInput').val('');
}



function deployButtonEvent() {
	web3.eth.personal.unlockAccount(account, password);
	punchcardtestContract = new web3.eth.Contract([{"constant":true,"inputs":[],"name":"sumOfMoneyOfpunched","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"succeedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participators","outputs":[{"name":"beginTime","type":"uint256"},{"name":"money","type":"uint256"},{"name":"punchTimes","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"week","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"ifPunched","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"punchIn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"beginTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"join","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"achievers","outputs":[{"name":"addr","type":"address"},{"name":"money","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
	punchcardtestContract.deploy({
		data: '0x60806040526000600355600060045534801561001a57600080fd5b5042600081905550610f53806100316000396000f3006080604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806325993370146100a95780632d38bacf146100d45780633a372c94146100ff5780634995b4581461016457806368c22da41461018f5780636ca7f2fe146101d457806388149fb9146101eb578063b688a36314610216578063d2e5cff014610220578063d826f88f14610294575b600080fd5b3480156100b557600080fd5b506100be6102ab565b6040518082815260200191505060405180910390f35b3480156100e057600080fd5b506100e96102b1565b6040518082815260200191505060405180910390f35b34801561010b57600080fd5b50610140600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506102b7565b60405180848152602001838152602001828152602001935050505060405180910390f35b34801561017057600080fd5b506101796102e1565b6040518082815260200191505060405180910390f35b34801561019b57600080fd5b506101ba600480360381019080803590602001909291905050506102e7565b604051808215151515815260200191505060405180910390f35b3480156101e057600080fd5b506101e9610355565b005b3480156101f757600080fd5b50610200610906565b6040518082815260200191505060405180910390f35b61021e61090c565b005b34801561022c57600080fd5b5061024b60048036038101908080359060200190929190505050610b84565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b3480156102a057600080fd5b506102a9610bd7565b005b60045481565b60035481565b60016020528060005260406000206000915090508060000154908060010154908060020154905083565b60055481565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206003018260078110151561033857fe5b602091828204019190069054906101000a900460ff169050919050565b6201356062015180600054420381151561036b57fe5b061115156103e1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe5b7b2e99499e8bf87e4bb8ae697a5e68993e58da1e697b6e997b4000000000081525060200191505060405180910390fd5b62093a80600054420311151515610460576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe69cace8bdaee68993e58da1e9a1b9e79baee5b7b2e7bb93e69d9f000000000081525060200191505060405180910390fd5b600054600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015414151561051b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe69caae58aa0e585a5e69cace591a8e68993e58da1e9a1b9e79bae000000000081525060200191505060405180910390fd5b6018600054420381151561052b57fe5b04600581905550600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160055460078110151561058357fe5b602091828204019190069054906101000a900460ff1615151561060e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807fe9878de5a48de68993e58da12e0000000000000000000000000000000000000081525060200191505060405180910390fd5b60018060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160055460078110151561066057fe5b602091828204019190066101000a81548160ff021916908315150217905550600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600081548092919060010191905055503373ffffffffffffffffffffffffffffffffffffffff166108fc6007600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015481151561073957fe5b049081150290604051600060405180830381858888f19350505050158015610765573d6000803e3d6000fd5b506007600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154141561090457600360008154809291906001019190505550600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154600460008282540192505081905550600260408051908101604052803373ffffffffffffffffffffffffffffffffffffffff168152602001600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101548152509080600181540180825580915050906001820390600052602060002090600202016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101555050505b565b60005481565b600061ef1060005401421015156109b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260278152602001807fe5b7b2e99499e8bf87e69cace8bdaee68993e58da1e9a1b9e79baee58aa0e58581526020017fa5e697b6e997b40000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600054600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015414151515610a6d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe5b7b2e58aa0e585a5e69cace591a8e68993e58da1e9a1b9e79bae000000000081525060200191505060405180910390fd5b678ac7230489e800003410610a8a57678ac7230489e80000610a8c565b345b905060806040519081016040528060005481526020018281526020016000815260200160e060405190810160405280600015151515815260200160001515151581526020016000151515158152602001600015151515815260200160001515151581526020016000151515158152602001600015151515815250815250600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001556020820151816001015560408201518160020155606082015181600301906007610b7d929190610dde565b5090505050565b600281815481101515610b9357fe5b90600052602060002090600202016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b60008062093a806000544203111515610c58576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe69cace8bdaee68993e58da1e9a1b9e79baee69caae7bb93e69d9f000000000081525060200191505060405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff163191503373ffffffffffffffffffffffffffffffffffffffff166108fc600a84811515610c9857fe5b049081150290604051600060405180830381858888f19350505050158015610cc4573d6000803e3d6000fd5b50600a82811515610cd157fe5b0482039150600090505b600354811015610da857600281815481101515610cf457fe5b906000526020600020906002020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60045484600285815481101515610d5257fe5b90600052602060002090600202016001015402811515610d6e57fe5b049081150290604051600060405180830381858888f19350505050158015610d9a573d6000803e3d6000fd5b508080600101915050610cdb565b6000600281610db79190610e77565b506000600381905550600060048190555062093a8060008082825401925050819055505050565b826007601f01602090048101928215610e665791602002820160005b83821115610e3757835183826101000a81548160ff0219169083151502179055509260200192600101602081600001049283019260010302610dfa565b8015610e645782816101000a81549060ff0219169055600101602081600001049283019260010302610e37565b505b509050610e739190610ea9565b5090565b815481835581811115610ea457600202816002028360005260206000209182019101610ea39190610ed9565b5b505050565b610ed691905b80821115610ed257600081816101000a81549060ff021916905550600101610eaf565b5090565b90565b610f2491905b80821115610f2057600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905550600201610edf565b5090565b905600a165627a7a72305820564c4fd9854b72b310b2a3571fb067e5c6977d6a4970b303cc70ca2ec2a86e220029'
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

		punchcardtest.methods.beginTime().call({from:account})
		.then((beginTime) => {
	    	if (ifBegin(beginTime)) {
	    		$("#ifItemOpen").text("是");
				console.log("openTime: " + getOpenTime(beginTime));
				$("#openTime").text(getOpenTime(beginTime));
	    	}
	    	else {
	    		$("#ifItemOpen").text("否");
	    		$("#openTime").text(0);
	    	}

	    	var week = getWeek(beginTime);
			console.log("week:" + week);
			$(".days").removeClass('today');
			if (week > 0) $(".days").eq(week - 1).addClass('today');

			punchcardtest.methods.participators(account).call({from:account})
			.then((participator) => {
				console.log(participator);
				if (participator.beginTime == beginTime) {
					$("#ifJoined").text("是");
		    		$("#joinMoney").text(web3.utils.fromWei(participator.money, 'ether'));
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
			});
		});
	}
}

function joinButtonEvent() {
	try{
		var money = web3.utils.toWei($('#joinInput').val(), 'ether');
		web3.eth.personal.unlockAccount(account, password);
		punchcardtest.methods.join().send({from:account, value:money, gas:3000000})
		.then((result) => {
			getInfo();
			console.log(result);
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
	web3.eth.personal.unlockAccount(account, password);
	punchcardtest.methods.punchIn().send({from:account, gas:3000000})
	.then((result) => {
		getInfo();
		console.log(result);
	;})
	.catch((err) => {
		alert(err);
	});
	alert("正在打卡，等待挖坑");
}

function resetButtonEvent() {
	web3.eth.personal.unlockAccount(account, password);
	punchcardtest.methods.reset().send({from:account, gas:3000000})
	.then((result) => {
		getInfo();
		console.log(result);
	;})
	.catch((err) => {
		alert(err);
	});
	alert("正在结算，等待挖坑");
}


function ifBegin(beginTime) {
	return Math.round(new Date()/1000) < parseInt(beginTime) + 7 * 24 * 60 * 60;
}

function getWeek(beginTime) {
	if (Math.round(new Date()/1000) > parseInt(beginTime) + 7 * 24 * 60 * 60) return 0;
	return Math.floor((Math.round(new Date()/1000) - parseInt(beginTime)) / 24 * 60 * 60) + 1;
}

function getOpenTime(beginTime) {
	return Math.round(new Date()/1000) - parseInt(beginTime);
}