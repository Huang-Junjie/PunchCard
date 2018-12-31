# PunchCard

## 选题背景

### 背景

所谓“一日之计在于晨”，保持早起习惯不仅对工作学习有帮助，还有利于自身的身体健
康。但现实生活中很多人都有“起床困难症”，缺乏形成良好习惯的好办法及毅力。市面上的
打卡软件要么是缺乏奖励惩罚机制，效果甚微；要么可能存在一定的信用问题，比如公布虚
假的打卡人数，私吞部分奖金；要么可能会收取一定比例的手续费。

### 优势

* 智能合约构造的打卡项目，通过缴纳一定的以太币，拥有着一定的惩罚和奖励机制。
* 可以自行调整投入的金额，选择适合自己的激励程度。
* 奖罚严格按照合约代码执行，无任何欺骗现象，保证参与的公正性。
* 除了小部分的 gas 费用，没有任何的中间人收取费用，保障了参与者的利益。

## 构思

首先某个发起者在星期天早上7 点（假设早起目标是7点）创建该合约。之后的星期一到星期天每天早上5点到7点间是打卡时间。到下个星期天早上7点后本周打卡项目截止，可以进行结算，并开启下一周的打卡项目。该合约可以每周重复运行，无需管理。具体如下：

1. 某个发起者在星期天早上7 点（假设早起目标是7点）创建该合约。
2. 在当天（星期天） 24 点前，任何人可以加入该项目，同时向该合约账户转入一笔金额（最高为10 ether），作为本周加入打卡项目的权重。
3. 每天早上5点到7点是打卡时间，不在打卡时间内无法打卡。
4. 每次打卡返回以太币 （加入金额 / 7）。
5. 在星期天早上7点后，本周打卡项目结束，可以进行结算：
   * 因为有人某几天早上没有打卡，因此合约账户会有余额；
   * 任何人可以调用合约的结算函数；
   * 调用合约结算函数的人可以获得合约账户余额的10%的以太币作为奖励和对gas的补偿；
   * 合约结算函数将合约余额剩余的90%按加入打卡项目的权重分给成功连续7天打卡的人；
   * 合约结算函数同时会开启下一周的打卡项目，并重置本周合约变量。



## 使用说明

1. 开启本地geth， 并持续进行挖矿: 

   ``geth --identity "TestNode" --rpc --rpcport "8545" --datadir data --port "30303" --rpccorsdomain "*" --nodiscover console - -rpcapi web3,eth,net,personal``    	`` miner.start()``

2.  punchCard.html为真正的打卡app，但如果要体验效果可以打开test.html（如下面的成果展示）。

3. 打开test.html后，进入登入界面，登录账号列表会自动从geth中获取，选择一个账号输入密码登入。如果没有账号可点击register，输入密码2次后进行注册。新建账号回保存在geth数据存放目录下的keystore目录中，这时再进入登录界面账号列表就有了刚才注册的账号。

   ![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/1.png)

4. 进入主界面后，一开始test.js文件的contractAddr变量为空，可以点击左上角的部署合约按钮进行部署并把合约地址复制给test.js的contractAddr变量。之后多浏览器打开其他test.html就会加载存储了合约地址的test.js，从而可以使用刚才部署的合约。

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/3.png)

5. 在参与按钮左边输入框内输入参与金额，点击参与按钮。若在参与时间内被且没有加入过本周打开项目，当该交易被挖出矿后参与成功。

6. 在正确的打卡时间内点击打卡按钮，当该交易被挖出矿后打卡成功。

7. 当本周打卡项目结束后（点击刷新按钮，查看“已开启本周打卡项目”是否为“否”），点击开启按钮，即可结算本周打卡项目并开启下周打卡项目，之后可以重复上述步骤，进行下周打卡项目。


## 成果展示（测试）：

因为PunchCard打卡项目是以天为单位的，因此重写了一个测试合约，将时间判断进行修改：

* 项目开启后2分钟为加入时间（模拟星期天打卡项目开启后，在星期天晚上12点前为加入时间）；
* 加入时间结束后，每1分钟模拟经过一天；
* 1分钟的前30秒可以打卡，模拟每天的早上打卡时间；
* 7个1分钟后（模拟一周后）可以结算开启下一轮打卡项目。



1. 开启本地geth， 并持续进行挖矿: 

   ``geth --identity "TestNode" --rpc --rpcport "8545" --datadir data --port "30303" --rpccorsdomain "*" --nodiscover console - -rpcapi web3,eth,net,personal``    	`` miner.start()``

2. 打开test.html
3. 初始界面

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/1.png)

4. 选取一个账户，输入密码登入：账户列表会从本地geth里读取，如果没有，可以点击register进行注册，注册后的账户信息会保存在geth的keystore目录中。

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/2.png)

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/3.png)

5. 部署测试合约：点击部署合约按钮进行部署，得到合约地址。为了可以多浏览器可以同时运行该合约，可以将合约地址复制到test.js中。![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/5.png)

   也可以一开始就使用remix部署合约，将合约地址复制给test.js的contractAddr变量。

   ![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/4.png)

6. 进行测试：假设3个账户加入本周打卡计划，加入金额为分别为1 ether，2 ether，3 ether。账户1完成7天打卡，账户2执行结算函数（在本周打卡项目结束后点击开启按钮）。

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/6.png)

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/7.png)

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/8.png)

7.  点击刷新按钮，修改页面信息，查看当前项目已经开启时间（因为实际合约在打卡完毕后一般会关闭页面，第二天再进入进行打卡，且点击任何按钮均会刷新页面信息，因此就没必要做页面实时刷新的功能。这里测试合约为了防止在不正确的时间的不必要的提交，因此添加了一个项目以开启时间，当项目以开启时间为120秒时，参与时间结束，可以开始第一天的打卡。页面的项目开启时间信息可以点击刷新按钮进行更新）。当开启时间到120秒后，进入测试合约的第一天的打卡时间（120s - 150s），再经过1分钟后进入第二天的打卡时间（180s - 210s），以次类推，每1分钟模拟经过一天，每分钟的前30s为打卡时间。
8. 项目开启时间到达120s，给账户1进行打卡

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/9.png)

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/10.png)

9. 最终3个账户的打卡状态为账户1打卡7天，账户2和3都只打卡1天，可以看到账户1除了少量手续费，基本全拿回了自己投入的1个以太币。账户2拿回了（2/7个以太币）。

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/12.png)

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/13.png)

10. 本周打卡项目结束：

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/14.png)

11. 账户2点击开启按钮进行结算，并开启下周打卡项目。

    计算得知目前合约账户余额为（1h + 2 + 3- 1- 2/7- 3/7 = 4.286  ether）。

    给账户2的奖励应为4.286 * 10% = 0.4286 ether， 与下图账户2余额的增加相符。

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/15.png)

12. 查看账户1获得的奖励。

    由于账户1是3个账户中唯一成功7天打卡的账户，因此，账户1可以获得合约账户余额的90%作为奖励，即4.286 * 90% = 3.8574 ether，与下图账户1余额的增量相符合。

![](https://github.com/Huang-Junjie/PunchCard/blob/master/Assets/16.png)


