//定义State类
function State(){}
State.prototype.enter=function(from,msg){}
State.prototype.leave=function(){}
State.prototype.update=function(){}
//派生出三个类
function Intro(){
	//生成开场的界面
	var _tmp="<div id='intro' class='bg-gra'>"+
		"<svg viewBox='0 0 960 640' width='100%' height='100%'><circle cx='480' cy='320' r='100' fill='pink'></circle><text x='430' y='320' id='start'>Start</text>"+
      "<g>"+
        ""
      +"</g>"
    +"</svg>"
	+"</div>";
	this.enter=function(){
		document.body.innerHTML=_tmp;
    bind();
	}
  function bind(){
    document.getElementById('start').addEventListener('click',function(){
      main.curState=1;
      main.onStateChange=true;
    },false);
  }
}
Intro.prototype=State.prototype;
var monsters=[];
//定义开场
function Journey(){
  var _tmp="<div id='journey' class='bg-gra'>"+
    "<svg viewBox='0 0 960 640' width='100%' height='100%' id='stage'></svg>"
  +"</div>";
  var role=new Role();
  function setMonster(){
    //一定几率产生新的怪物
    if(Math.random()>0.99){
      var monster=new Monster();
      var nm;
      if(nm=monster.init()){
        document.getElementById('stage').appendChild(nm);
      }
      monsters.push(monster);
    }
  }
  this.enter=function(){
    document.body.innerHTML=_tmp;
    document.getElementById('stage').appendChild(role.init());
  }
  this.update=function(){
    role.draw();
    setMonster();
    monsters.forEach(function(o,index){
      o.draw();
      if(o.checkandRemove()){
        monsters.splice(index,1);
      }
    });
  }
}
Journey.prototype=State.prototype;
function Ending(){}
Ending.prototype=State.prototype;

var main = {
  states:[],//记录各种状态
  curState:0,
  onStateChange:false,
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
  if(main.onStateChange){
	    main.states[main.curState].enter();
      main.onStateChange=false;
    }
  else{
    main.states[main.curState].update();
  }
  setTimeout(arguments.callee,1000/24);//设定刷新率为每秒24次
}
