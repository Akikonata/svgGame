//定义State类
function State(){}
State.prototype.enter=function(from,msg){}
State.prototype.leave=function(){}
State.prototype.update=function(){}
//派生出三个类
function Intro(){
	//生成开场的界面
	var _tmp="<svg class='bg-gra' viewBox='0 0 960 640' width='100%' height='100%'><circle cx='480' cy='320' r='100' stroke:'white' stroke-width:'2px' id='start-circle'></circle><text x='430' y='340' id='start'>Start</text>"+
    "<text  x='380' y='500' >小心黑色的圆球！</text>"
  +"</svg>";
	this.enter=function(){
		document.body.innerHTML=_tmp;
    bind();
	}
  function bind(){
    document.getElementById('start').addEventListener('click',function(){
      main.curState=1;
      main.onStateChange=true;
    },false);
    document.getElementById('start-circle').addEventListener('click',function(){
      main.curState=1;
      main.onStateChange=true;
    },false);
  }
}
Intro.prototype=State.prototype;
var monsters=[];
//定义开场
function Journey(){
  var _tmp=
    "<svg class='bg-gra' viewBox='0 0 960 640' width='100%' height='100%' id='stage'>"
    +"<circle class='cmd-btn' cx='830' cy='520' r='30' id='btn-up'></circle>"
    +"<circle class='cmd-btn' cx='830' cy='600' r='30' id='btn-down'></circle>"
    +"<circle class='cmd-btn' cx='760' cy='560' r='30' id='btn-left'></circle>"
    +"<circle class='cmd-btn' cx='900' cy='560' r='30' id='btn-right'></circle>"
    +"<text id='count' x='50' y='50'>当前得分：0</text>"
    +"</svg>";
  var role=new Role('r0');
  var count=0;
  function setMonster(){
    //一定几率产生新的怪物
    if(Math.random()>0.98){
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
    bind();
  }
  this.update=function(){
    //console.log(cmd.state);
    switch(cmd.state){
      case 0:role.draw(0,-role.speed);break;
      case 1:role.draw(0,role.speed);break;
      case 2:role.draw(-role.speed,0);break;
      case 3:role.draw(role.speed,0);break;
      default:break;
    }
    setMonster();
    monsters.forEach(function(o,index){
      o.draw();
      if(role.checkNear(o)){
        if(!o.danger){
          o.dead=true;
          count+=o.r;
          document.getElementById('count').textContent="当前得分："+count;
        }
        else{
          role.dead=true;
          main.curState=2;
          main.onStateChange=true;
        }
      }
      if(o.checkandRemove()){
        monsters.splice(index,1);
      }
    });
  }
  function bind(){
    document.getElementById('btn-up').addEventListener('mousedown',function(){
      cmd.state=0;
    },false);
    document.getElementById('btn-down').addEventListener('mousedown',function(){
      cmd.state=1;
    },false);
    document.getElementById('btn-left').addEventListener('mousedown',function(){
      cmd.state=2;
    },false);
    document.getElementById('btn-right').addEventListener('mousedown',function(){
      cmd.state=3;
    },false);
    document.getElementById('btn-up').addEventListener('mouseup',function(){
      cmd.state=-1;
    },false);
    document.getElementById('btn-down').addEventListener('mouseup',function(){
      cmd.state=-1;
    },false);
    document.getElementById('btn-left').addEventListener('mouseup',function(){
      cmd.state=-1;
    },false);
    document.getElementById('btn-right').addEventListener('mouseup',function(){
      cmd.state=-1;
    },false);
    document.getElementById('btn-up').addEventListener('mouseout',function(){
      cmd.state=-1;
    },false);
    document.getElementById('btn-down').addEventListener('mouseout',function(){
      cmd.state=-1;
    },false);
    document.getElementById('btn-left').addEventListener('mouseout',function(){
      cmd.state=-1;
    },false);
    document.getElementById('btn-right').addEventListener('mouseout',function(){
      cmd.state=-1;
    },false);
  }
}
Journey.prototype=State.prototype;
function Ending(){
  var _tmp="<svg class='bg-gra' viewBox='0 0 960 640' width='100%' height='100%' id='stage'>"
    +"<text id='' x='300' y='200'>小朋友，东西是不能乱吃的。</text>"
    +"</svg>";
    this.enter=function(){
      document.body.innerHTML=_tmp;
    };
}
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
