pragma solidity ^0.4.0;

/*
	由于时间应用是以天为单位，因此可以用此合约进行测试。
	项目开启后1分钟为加入时间（模拟星期天开启后，在星期天晚上12点为加入截止时间）；
	加入时间结束后，每30秒模拟经过一天；
	30秒的前10秒可以打卡，模拟每天的早上打卡时间；
	7个30后（模拟一周后）可以结算开启下一轮打卡项目。
*/

contract PunchCardTest {

	struct participator {
		uint256 beginTime;	//参与时间
		uint256 money;	//参与金额
		uint256 punchTimes; //打卡次数
		bool[7] punch; //打卡记录
	}

	struct achiever {
		address addr;
		uint256 money;
	}
	

	uint256 public beginTime;			//打卡项目启动时间，
	mapping(address => participator) public participators;	//所有参与者
	achiever[] public achievers;	//成功连续7天打卡者
	uint256 public succeedAmount = 0;		//成功连续7天打卡人数
	uint256 public sumOfMoneyOfpunched = 0;	//成功连续7天打卡的参与者加入的金额的总量
	uint256 public week;				//星期

	modifier onlyJointime { 
		//自启动时间起1分钟内为加入时间
		require(
			now < beginTime + 1 minutes,
			"已错过本轮打卡项目加入时间"
		);
		_; 
	}

	modifier onlyEarlyMorning { 
		//若beginTime为7点，每天打卡时间为5点到6点59分59秒
		require(
			(now - beginTime - 1 minutes) % (30 seconds) < 10 seconds,
			"已错过今日打卡时间"
		);
		_; 
	}

	modifier onlyEnd { 
		//项目启动7天后结束
		require(
			(now - beginTime - 1 minutes) > 7 * 30 seconds,
			"本轮打卡项目未结束"
		);
		_; 
	}

	modifier onlyNotEnd { 
		require(
			(now - beginTime - 1 minutes) < 7 * 30 seconds,
			"本轮打卡项目已结束"
		);
		_; 
	}

	modifier onlyUnjoined { 
		require(
			participators[msg.sender].beginTime != beginTime,
			"已加入本周打卡项目"
		);
		_; 
	}

	modifier onlyJoined { 
		require(
			participators[msg.sender].beginTime == beginTime,
			"未加入本周打卡项目"
		);
		_; 
	}

	constructor() public {
        beginTime = now;    //若7点时创建该合约，可将打卡项目启动时间设为7点
    }

    //加入打卡项目
	function join() public payable onlyJointime onlyUnjoined{
		uint256 money = msg.value < 10 ether ? msg.value : 10**19;	//最多用10 ether 加入打卡项目
		participators[msg.sender] = participator(beginTime, money, 0, [false, false, false, false, false, false, false]);
	}

	//每日打卡
	function punchIn() public onlyEarlyMorning onlyNotEnd onlyJoined{
		week = (now - beginTime - 1 minutes) / 30 seconds;
		//确保每天只能打一次卡
		require(
			!participators[msg.sender].punch[week],
			"重复打卡."
		); 
		participators[msg.sender].punch[week] = true;
		participators[msg.sender].punchTimes++;
		msg.sender.transfer(participators[msg.sender].money / 7);
		if (participators[msg.sender].punchTimes == 7) {
			succeedAmount++;
			sumOfMoneyOfpunched += participators[msg.sender].money;
			achievers.push(achiever(msg.sender, participators[msg.sender].money));
		}
	}

	//为成功者分发奖励，并开启下一周打卡项目
	function reset() public onlyEnd {
		uint256 balance = address(this).balance;
		//给执行者合约账户剩余金额的10%作为奖励和gas补偿
		msg.sender.transfer(balance / 10);
		balance = balance - balance / 10;
		for (uint256 i = 0; i < succeedAmount; i++) {
			achievers[i].addr.transfer(achievers[i].money * balance / sumOfMoneyOfpunched);
		}
		achievers.length = 0;
		succeedAmount = 0;
		sumOfMoneyOfpunched = 0;
		beginTime += 7 * 30 seconds + 1 minutes;
	}

	//判断本周项目是否开启
	function ifBegin() public view returns(bool) {
		return (now - beginTime - 1 minutes) < 7 * 30 seconds;
	}
}

