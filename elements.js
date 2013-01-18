var svgns="http://www.w3.org/2000/svg";
//定义Sprite
function Sprite(){
	
}
Sprite.prototype.rx=30;
Sprite.prototype.ry=20;
Sprite.prototype.cx=200;
Sprite.prototype.cy=320;
Sprite.prototype.id=null;

//两个类均继承自Sprite
Role.prototype=Sprite.prototype;
Monster.prototype=Sprite.prototype;

function Role(){
	this.init=function(){
		var _tmp=document.createElementNS(svgns,'ellipse');
		_tmp.setAttribute('cx',200);
		_tmp.setAttribute('cy',320);
		_tmp.setAttribute('rx',30);
		_tmp.setAttribute('ry',20);
		_tmp.setAttribute('fill','blue');
		_tmp.setAttribute('class','role');
		_tmp.setAttribute('id','r0');//设置人物的id
		var animate=document.createElementNS(svgns,'animate');//设置相关动画
		animate.setAttribute('attributeName','ry');
		animate.setAttribute('attributeType','XML');
		animate.setAttribute('begin','0s');
		animate.setAttribute('dur','3s');
		animate.setAttribute('fill','freeze');
		animate.setAttribute('from','0');
		animate.setAttribute('to','30');
	    _tmp.appendChild(animate);
		this.id='r0';
		return _tmp;
    }
    this.draw=function(){
    	
    }
    //初始化事件响应
    function bind(){

    }
}
function Monster(){
	this.init=function(){
		var _tmp=document.createElementNS(svgns,'ellipse');
		_tmp.setAttribute('cx',960);
		_tmp.setAttribute('cy',640*Math.random());
		_tmp.setAttribute('rx',this.rx);
		_tmp.setAttribute('ry',20);
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