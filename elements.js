var svgns="http://www.w3.org/2000/svg";
//定义Sprite
function Sprite(){
	
}
Sprite.prototype.r=30;
Sprite.prototype.cx=200;
Sprite.prototype.cy=320;
Sprite.prototype.id=null;

//两个类均继承自Sprite
Role.prototype=Sprite.prototype;
Monster.prototype=Sprite.prototype;

function Role(){
	this.init=function(){
		var _tmp=document.createElementNS(svgns,'g');
		var Rshape=new shape.fishRole();
		Rshape.path.forEach(
			function(o){
				PPath=document.createElementNS(svgns,'path');
				PPath.setAttribute('d',o.d);
				PPath.setAttribute('fill',o.f);
				_tmp.appendChild(PPath);
			}
		);
		this.id='r0';
		return _tmp;
    }
    this.draw=function(){
    	
    }
    //初始化事件响应
    function bind(){

    }
    this.checkNear=function(){

    }
    //吃掉
    this.Eat=function(m){

    }
}
function Monster(){
	this.init=function(){
		var _tmp=document.createElementNS(svgns,'circle');
		_tmp.setAttribute('cx',960);
		_tmp.setAttribute('cy',640*Math.random());
		_tmp.setAttribute('r',this.r);
		_tmp.setAttribute('fill','blue');
		_tmp.setAttribute('class','monster');
		//随机生成id,如果超过10次皆重复则不返回_tmp
		var times=0;
		var have_id=false;
		while(times<10){
			var h=Math.ceil(Math.random()*1000);
			if(document.getElementById('m'+h)){
				times++;
			}
			else{
				have_id=h;
				break;
			}
		}
		if(have_id){
			_tmp.setAttribute('id','m'+have_id);
			this.id='m'+have_id;
			return _tmp;
		}
			else{return false;}
	}
	this.draw=function(){
		var tmp=document.getElementById(this.id);
		var cx=tmp.getAttribute('cx');
	    tmp.setAttribute('cx',parseInt(cx)-3);
	}
	//测试是否移除元素
	this.checkandRemove=function(){
		var tmp=document.getElementById(this.id);
		if(tmp.getAttribute('cx')<-this.rx){
			document.getElementById('stage').removeChild(tmp);
			return true;
		}
		return false;
	}
}