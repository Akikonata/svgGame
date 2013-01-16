//定义State类
function State(){}
State.prototype.enter=function(from,msg){}
State.prototype.leave=function(){}
State.prototype.update=function(){}
//派生出三个类
function Intro(){
	//生成开场的界面
	var _tmp="<div id='intro' class='bg-gra'>"+
		"<svg></svg>"
	+"</div>";
	this.enter=function(){
		document.body.innerHTML=_tmp;
	}
}
Intro.prototype=State.prototype;
//定义开场
function Journey(){}
Journey.prototype=State.prototype;
function Ending(){}
Ending.prototype=State.prototype;
var main = {
  states:[],//记录各种状态
  curState:0,
  init:function(){
  	//初始化各种State
  	var intro=new Intro();
    var journey=new Journey();
    var ending=new Ending();
    this.states.push(intro,journey,ending);
    intro.enter();
    //主循环开始
    loop();
  },
};
function loop(){
	main.states[main.curState].update();
  	setTimeout(arguments.callee,50);//设定刷新率为每秒20
}
