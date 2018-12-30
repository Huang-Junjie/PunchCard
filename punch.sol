pragma solidity ^0.4.0;

contract punchCard {

	struct participator {
		address addr;	//参与者地址
		uint money;		 //加入金额
		uint punchTimes;  //打卡次数
		uint latestTime; //最近打卡时间
		bool succeed;	//是否成功连续7天打卡
	}

	uint public beginTime;		//打卡项目启动时间，
	participator[] public participators;	//所有参与者
	mapping(address => uint) public addrToIndex;	//参与者地址到participators下标的映射
	uint public participatorAmount;	//参与者总数
	uint public sumOfMoneyOfpunched;	//成功连续7天打卡的参与者加入的金额的总量
	uint public rate;				//成功连续7天打卡的奖励比率
	bool public canGetReward;      //是否开启获取奖励

	modifier onlyJointime { 
		//项目启动时间为7点时，则加入打卡项目时间到当天24点截止
		require(
			now < beginTime + 17 hours,
			"已错过本轮打卡项目加入时间."
		);
		 _; 
	}

	modifier onlyEarlyMorning { 
		//若beginTime为7点，每天打卡时间为5点到6点59分59秒
		require(
			(now - beginTime) % (24 hours) > 22 hours,
			"已错过今日打卡时间."
		);
		 _; 
	}

	modifier onlyEnd { 
		//项目启动7天后结束
		require(
			(now - beginTime) > 7 * 24 hours,
			"本轮打卡项目未结束."
		);
		 _; 
	}

	modifier onlyNotEnd { 
		require(
			(now - beginTime) <= 7 * 24 hours,
			"本轮打卡项目已结束."
		);
		 _; 
	}

	constructor() public {
        beginTime = now;    //若7点时创建该合约，可将打卡项目启动时间设为7点
    }

    //加入打卡项目
	function join() public payable onlyJointime {
		uint money = msg.value < 10 ether ? msg.value : 10**19;	//最多用10 ether 加入打卡项目
		participators.push(participator(msg.sender, money, 0, 0, false));
		addrToIndex[msg.sender] = participatorAmount;
		participatorAmount++;
	}

	//每日打卡
	function punchIn() public onlyEarlyMorning onlyNotEnd {
		//确保每天只能打一次卡
		require(
			now - participators[addrToIndex[msg.sender]].latestTime > 10 hours,
			"重复打卡."
		); 
		participators[addrToIndex[msg.sender]].latestTime = now;	
		participators[addrToIndex[msg.sender]].punchTimes++;
		//成功连续7天打卡
		if (participators[addrToIndex[msg.sender]].punchTimes == 7) {
			canGetReward = false; //关闭获得奖励功能，防止参与者用上一轮的rate计算奖励
			participators[addrToIndex[msg.sender]].succeed = true;
			sumOfMoneyOfpunched += participators[addrToIndex[msg.sender]].money;
		}
	}

	//计算奖励比率，并重新启动打卡项目，进行下一轮7天打卡项目
	function setRate() public onlyEnd {
		//重启打卡项目
		beginTime += 7 * 24 hours;
		//计算奖励比率，给执行此函数的参与者一定的奖励
		uint money = participators[addrToIndex[msg.sender]].money;
		rate = address(this).balance / (sumOfMoneyOfpunched + money);
		msg.sender.transfer(rate*money);
		sumOfMoneyOfpunched = 0;
		canGetReward = true;		//开启获得奖励
	}

	//获取奖励
	function getReward() public {
		require(canGetReward, "获奖时间未开启");
		//需要成功连续7天打卡
		require(participators[addrToIndex[msg.sender]].succeed, "未成功连续7天打卡");
		//需要在上一轮打卡项目结束7天内领取奖励，防止用下一轮计算出的rate获得奖励
		require(now - participators[addrToIndex[msg.sender]].latestTime < 7 days, "已错过领奖时间");
		uint money = participators[addrToIndex[msg.sender]].money;
		if (money > 0) {
			//将participators[addrToIndex[msg.sender]].money的置为0，防止重复获取奖励
			participators[addrToIndex[msg.sender]].money = 0;
			msg.sender.transfer(rate*money);
		}
	}

	//查询当前奖金池内奖金总额
	function getTotalBalance() public view returns(uint) {
		return address(this).balance;
	}
}
