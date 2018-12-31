if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var account;
var password;
var punchcardtestContract;
var punchcardtest;
//var contractAddr;
var contractAddr = '0x4Ac753B129324687a8D21Dd8904531e9D3B22a5F'; //将合约换为部署地址

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
	$('#beginBox').css('display', 'none');
		$('#punchCard').css('display', 'block');
		getInfo();

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
	//web3.eth.personal.unlockAccount(account, password);
	punchcardtestContract = new web3.eth.Contract([{"constant":true,"inputs":[],"name":"sumOfMoneyOfpunched","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"succeedAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participators","outputs":[{"name":"beginTime","type":"uint256"},{"name":"money","type":"uint256"},{"name":"punchTimes","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"week","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"ifPunched","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"punchIn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"beginTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"join","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"achievers","outputs":[{"name":"addr","type":"address"},{"name":"money","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
	punchcardtestContract.deploy({
		data: '0x60806040526000600355600060045534801561001a57600080fd5b5042600081905550610f67806100316000396000f3006080604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806325993370146100a95780632d38bacf146100d45780633a372c94146100ff5780634995b4581461016457806368c22da41461018f5780636ca7f2fe146101d457806388149fb9146101eb578063b688a36314610216578063d2e5cff014610220578063d826f88f14610294575b600080fd5b3480156100b557600080fd5b506100be6102ab565b6040518082815260200191505060405180910390f35b3480156100e057600080fd5b506100e96102b1565b6040518082815260200191505060405180910390f35b34801561010b57600080fd5b50610140600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506102b7565b60405180848152602001838152602001828152602001935050505060405180910390f35b34801561017057600080fd5b506101796102e1565b6040518082815260200191505060405180910390f35b34801561019b57600080fd5b506101ba600480360381019080803590602001909291905050506102e7565b604051808215151515815260200191505060405180910390f35b3480156101e057600080fd5b506101e9610355565b005b3480156101f757600080fd5b5061020061091a565b6040518082815260200191505060405180910390f35b61021e610920565b005b34801561022c57600080fd5b5061024b60048036038101908080359060200190929190505050610b97565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b3480156102a057600080fd5b506102a9610bea565b005b60045481565b60035481565b60016020528060005260406000206000915090508060000154908060010154908060020154905083565b60055481565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206003018260078110151561033857fe5b602091828204019190069054906101000a900460ff169050919050565b607860005401421015801561037d5750601e603c607860005442030381151561037a57fe5b06105b15156103f1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe5b7b2e99499e8bf87e4bb8ae697a5e68993e58da1e697b6e997b4000000000081525060200191505060405180910390fd5b60786101a4600054010142101515610471576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe69cace8bdaee68993e58da1e9a1b9e79baee5b7b2e7bb93e69d9f000000000081525060200191505060405180910390fd5b600054600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015414151561052c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe69caae58aa0e585a5e69cace591a8e68993e58da1e9a1b9e79bae000000000081525060200191505060405180910390fd5b603c607860005442030381151561053f57fe5b04600581905550600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160055460078110151561059757fe5b602091828204019190069054906101000a900460ff16151515610622576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807fe9878de5a48de68993e58da12e0000000000000000000000000000000000000081525060200191505060405180910390fd5b60018060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030160055460078110151561067457fe5b602091828204019190066101000a81548160ff021916908315150217905550600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600081548092919060010191905055503373ffffffffffffffffffffffffffffffffffffffff166108fc6007600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015481151561074d57fe5b049081150290604051600060405180830381858888f19350505050158015610779573d6000803e3d6000fd5b506007600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154141561091857600360008154809291906001019190505550600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154600460008282540192505081905550600260408051908101604052803373ffffffffffffffffffffffffffffffffffffffff168152602001600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101548152509080600181540180825580915050906001820390600052602060002090600202016000909192909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101555050505b565b60005481565b6000607860005401421015156109c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260278152602001807fe5b7b2e99499e8bf87e69cace8bdaee68993e58da1e9a1b9e79baee58aa0e58581526020017fa5e697b6e997b40000000000000000000000000000000000000000000000000081525060400191505060405180910390fd5b600054600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015414151515610a80576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe5b7b2e58aa0e585a5e69cace591a8e68993e58da1e9a1b9e79bae000000000081525060200191505060405180910390fd5b678ac7230489e800003410610a9d57678ac7230489e80000610a9f565b345b905060806040519081016040528060005481526020018281526020016000815260200160e060405190810160405280600015151515815260200160001515151581526020016000151515158152602001600015151515815260200160001515151581526020016000151515158152602001600015151515815250815250600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001556020820151816001015560408201518160020155606082015181600301906007610b90929190610df2565b5090505050565b600281815481101515610ba657fe5b90600052602060002090600202016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b60008060786101a4600054010142111515610c6d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807fe69cace8bdaee68993e58da1e9a1b9e79baee69caae7bb93e69d9f000000000081525060200191505060405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff163191503373ffffffffffffffffffffffffffffffffffffffff166108fc600a84811515610cad57fe5b049081150290604051600060405180830381858888f19350505050158015610cd9573d6000803e3d6000fd5b50600a82811515610ce657fe5b0482039150600090505b600354811015610dbd57600281815481101515610d0957fe5b906000526020600020906002020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60045484600285815481101515610d6757fe5b90600052602060002090600202016001015402811515610d8357fe5b049081150290604051600060405180830381858888f19350505050158015610daf573d6000803e3d6000fd5b508080600101915050610cf0565b6000600281610dcc9190610e8b565b506000600381905550600060048190555061021c60008082825401925050819055505050565b826007601f01602090048101928215610e7a5791602002820160005b83821115610e4b57835183826101000a81548160ff0219169083151502179055509260200192600101602081600001049283019260010302610e0e565b8015610e785782816101000a81549060ff0219169055600101602081600001049283019260010302610e4b565b505b509050610e879190610ebd565b5090565b815481835581811115610eb857600202816002028360005260206000209182019101610eb79190610eed565b5b505050565b610eea91905b80821115610ee657600081816101000a81549060ff021916905550600101610ec3565b5090565b90565b610f3891905b80821115610f3457600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905550600201610ef3565b5090565b905600a165627a7a72305820b875e79bfa0bfc776096317f146c682918e13e100aee7728f0411002e795d29c0029'
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
		//web3.eth.personal.unlockAccount(account, password);
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
	//web3.eth.personal.unlockAccount(account, password);
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
	//web3.eth.personal.unlockAccount(account, password);
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
	return Math.round(new Date()/1000) < parseInt(beginTime) + 7 * 60 + 2 * 60;
}

function getWeek(beginTime) {
	if (Math.round(new Date()/1000) < parseInt(beginTime) + 2 *60) return 0;
	if (Math.round(new Date()/1000) > parseInt(beginTime) + 7 * 60 + 2 *60) return 0;
	return Math.floor((Math.round(new Date()/1000) - parseInt(beginTime) - 2 *60) / 60) + 1;
}

function getOpenTime(beginTime) {
	return Math.round(new Date()/1000) - parseInt(beginTime);
}