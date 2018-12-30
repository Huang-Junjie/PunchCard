// 创建web3对象
var web3 = new Web3();
// 连接到以太坊节点
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
// var addr = "0xbc74b26aa6ea465117ed3f486687b6fca9210465";
// var abi =

// var punchCard = web3.eth.contract(abi).at(addr);

$(function() {
	getAccount();
 	$('#login').click(loginEvent);
 	$('#register').click(registerEvent);
 	$('#loginButton').click(loginButtonEvent);
 	$('#quit').click(quitEvent);
});

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
}

function registerEvent() {
	$('#loginBox').css('display', 'none');
	$('#registerBox').css('display', 'block');
	$('#login').addClass('unselected');
	$('#register').removeClass('unselected');
}

function loginButtonEvent() {
	$('#beginBox').css('display', 'none');
	$('#punchCard').css('display', 'block');
}

function quitEvent() {
	$('#beginBox').css('display', 'block');
	$('#punchCard').css('display', 'none');
}