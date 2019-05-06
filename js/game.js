/*
这种写法不会污染全局，安全，有些插件也是这样写的
每写完一个()()，记得加分号,
实例对象是个对象，但不是函数
 */

/*
游戏初始化
 */
(function(w){
	var loadData=[{name:"bg",path:"img/game/bg.png"},
				{name:"Mars",path:"img/game/Mars.png"},
				{name:"plane",path:"img/game/plane.png"},
				{name:"btn-left",path:"img/game/btn-left.png"},
				{name:"btn-right",path:"img/game/btn-right.png"},
				{name:"energy",path:"img/game/energy.png"},
				{name:"meteorite01",path:"img/game/meteorite01.png"},
				{name:"meteorite02",path:"img/game/meteorite02.png"},
				{name:"meteorite03",path:"img/game/meteorite03.png"},
				{name:"meteorite04",path:"img/game/meteorite04.png"},
				{name:"meteorite05",path:"img/game/meteorite05.png"},
				{name:"meteorite06",path:"img/game/meteorite06.png"},
				{name:"failBg",path:"img/game/failBg.jpg"},
				{name:"againBtn",path:"img/game/againBtn.png"},
				{name:"prize01",path:"img/game/prize01.png"},
				{name:"prize02",path:"img/game/prize02.png"},
				{name:"prize03",path:"img/game/prize03.png"},
				{name:"prize04",path:"img/game/prize04.png"},
				{name:"prize05",path:"img/game/prize05.png"},
				{name:"prize06",path:"img/game/prize06.png"},
				{name:"prize01-a",path:"img/game/prize01-a.png"},
				{name:"prize02-a",path:"img/game/prize02-a.png"},
				{name:"prize03-a",path:"img/game/prize03-a.png"},
				{name:"prize04-a",path:"img/game/prize04-a.png"},
				{name:"prize05-a",path:"img/game/prize05-a.png"},
				{name:"prize06-a",path:"img/game/prize06-a.png"},
				{name:"viewBg",path:"img/game/viewBg.png"},
				{name:"p01",path:"img/game/p01.png"},
				{name:"p02",path:"img/game/p02.png"},
				{name:"p03",path:"img/game/p03.png"},
				{name:"p04",path:"img/game/p04.png"},
				{name:"p05",path:"img/game/p05.png"},
				{name:"p06",path:"img/game/p06.png"},
				{name:"earth",path:"img/game/earth.png"},
				{name:"earthBg",path:"img/game/earthBg.png"},
				{name:"success01",path:"img/game/success01.png"},
				{name:"nextBtn",path:"img/game/nextBtn.png"},
				{name:"meteorite11",path:"img/game/meteorite11.png"},
				{name:"meteorite12",path:"img/game/meteorite12.png"},
				{name:"meteorite13",path:"img/game/meteorite13.png"},
				{name:"meteorite14",path:"img/game/meteorite14.png"},
				{name:"meteorite15",path:"img/game/meteorite15.png"},
				{name:"meteorite16",path:"img/game/meteorite16.png"},
				{name:"meteorite17",path:"img/game/meteorite17.png"},
				{name:"meteorite18",path:"img/game/meteorite18.png"},
				{name:"meteorite19",path:"img/game/meteorite19.png"},
				{name:"meteorite110",path:"img/game/meteorite110.png"},
				{name:"meteorite111",path:"img/game/meteorite111.png"},
				{name:"meteorite21",path:"img/game/meteorite21.png"},
				{name:"meteorite22",path:"img/game/meteorite22.png"},
				{name:"meteorite23",path:"img/game/meteorite23.png"},
				{name:"meteorite24",path:"img/game/meteorite24.png"},
				{name:"meteorite25",path:"img/game/meteorite25.png"},
				{name:"meteorite26",path:"img/game/meteorite26.png"},
				{name:"meteorite27",path:"img/game/meteorite27.png"},
				{name:"meteorite28",path:"img/game/meteorite28.png"},
				{name:"bg03",path:"img/game/bg03.png"},
				{name:"endTatrget",path:"img/game/endTatrget.png"}
				];
	var _;
	function Game(){
		_=this;
		_.loadList=[];
		_.totalHeight=1136;
		_.totalWidth=640;
		_.init();
		_.stage=1;
	}

	Game.prototype.init=function(){
		LInit(1000/30,"Game",640,_.totalHeight,function(){
			var loadingLayer=new LoadingSample4();
			addChild(loadingLayer);
			LLoadManage.load(loadData,function(progress){
				loadingLayer.setProgress(progress);
			},function(result){
				_.loadList=result;
				removeChild(loadingLayer);
				loadingLayer=null;
				backLayer.init();
				MarsLayer.init();
				MarsLayer.run();
				meteoriteLayer.init();
				btn.init();
				targetLayer.init();
				planeLayer.init();
				backLayer.addEvent();
				/*backLayer3.init();
				planetLayer.init();
				planetLayer.run();
				meteoriteLayer3.init();
				btn3.init();
				targetLayer3.init();
				planeLayer3.init();
				backLayer3.addEvent();*/
				
				// console.log(meteoriteLayer.childList.length);
			})
		});
	};

/*接口（实例化）一定要放到最后，因为流程是从上往下的，放在前面，可能出错率高*/
w.game=new Game();
})(window);
/*为什么传进window，1、可以提高效率，就是不必一级级的查到到window。
	2、如果接受这个window，那么压缩时不会出现错误
*/

/*
背景层
*/

(function(w){
var _;

function Background(){
	_=this;
	base(_,LSprite,[]);
	_.bitmap1;
	_.bitmap2;
}
Background.prototype.init=function(){
	addChild(_);
	_.bitmap1=new LBitmap(new LBitmapData(game.loadList["bg"]));
	_.addChild(_.bitmap1);
	_.bitmap1.y=0;
	_.bitmap2=new LBitmap(new LBitmapData(game.loadList["bg"]));
	_.addChild(_.bitmap2);
	_.bitmap2.y=-_.bitmap1.getHeight();	
}
Background.prototype.addEvent=function(){
	_.addEventListener(LEvent.ENTER_FRAME,_.run.bind(_));
}
Background.prototype.run=function(){

		_.bitmap1.y+=10;
		_.bitmap2.y+=10;
		targetLayer.y+=10;
		if(targetLayer.y>=0){
			_.removeAllEventListener();
			_.addEventListener(LEvent.ENTER_FRAME,target);
		};
	if(_.bitmap1.y>=_.bitmap1.getHeight()){
		_.bitmap1.y=_.bitmap2.y-_.bitmap1.getHeight();
	}
	if(_.bitmap2.y>=_.bitmap2.getHeight()){
		_.bitmap2.y=_.bitmap1.y-_.bitmap2.getHeight();
	}
	planeLayer.run();
	meteoriteLayer.run();
};
function target(){
	if(planeLayer.childList[0].y>-200){
		planeLayer.childList[0].y-=20;
	}else{
		_.removeAllEventListener();
		if(planeLayer.count==3){
			success.init();
		}else{
			gameover.init();
		}
	}
};
w.backLayer=new Background();
})(window);


/*
	火星层
*/

(function(w){
	var _;

	function Mars(){
		_=this;
		base(_,LSprite,[]);
	}

	Mars.prototype.init=function(){
		backLayer.addChild(_);
		_.bitmap=new LBitmap(new LBitmapData(game.loadList["Mars"]));
		_.addChild(_.bitmap);
		_.bitmap.y=game.totalHeight-_.bitmap.getHeight();
	}

	Mars.prototype.run=function(){
		var t1=new TimelineLite();
		t1.to(_.bitmap,2,{y:"+="+_.bitmap.getHeight()});
	}
	w.MarsLayer=new Mars();
})(window);

/*
	按钮层
*/

(function(w){
	var _;
	var btnLeft,btnRight;
	function Btn(){
		_=this;
		base(_,LSprite,[]);
	}
	Btn.prototype.init=function(){
		backLayer.addChild(_);
		btnLeft=new LBitmap(new LBitmapData(game.loadList["btn-left"]));
		_.btnLeft=new LButton(btnLeft);
		_.addChild(_.btnLeft);
		_.btnLeft.x=73;
		_.btnLeft.y=LGlobal.height-_.btnLeft.getHeight()-55;
		_.btnLeft.addEventListener(LMouseEvent.MOUSE_DOWN,_.leftdown.bind(_));
		_.btnLeft.addEventListener(LMouseEvent.MOUSE_UP,_.up.bind(_));
		btnRight=new LBitmap(new LBitmapData(game.loadList["btn-right"]));
		_.btnRight=new LButton(btnRight);
		_.addChild(_.btnRight);
		_.btnRight.x=LGlobal.width-_.btnRight.getWidth()-73;
		_.btnRight.y=LGlobal.height-_.btnRight.getHeight()-55;
		_.btnRight.addEventListener(LMouseEvent.MOUSE_DOWN,_.rightdown.bind(_));
		_.btnRight.addEventListener(LMouseEvent.MOUSE_UP,_.up.bind(_));
	}

	Btn.prototype.leftdown=function(){
		planeLayer.dir="left";
	}
	Btn.prototype.rightdown=function(){
		planeLayer.dir="right";
	}
	Btn.prototype.up=function(){
		planeLayer.dir=null;
	}
	w.btn=new Btn();
})(window);

/*
飞机
碰撞检测大小
50*95
图片大小
101*152

x+25<=tx<=x+50+25
y+17<=ty<=y+17+95

这是碰撞检测范围
*/

(function(w){
	var _;
	var speed=10;
	var num=0;
	function Plane(){
		_=this;
		base(_,LSprite,[]);
		_.dir=null;
		_.count;
	};
	Plane.prototype.init=function(){
		_.count=0;
		backLayer.addChild(_);
		_.bitmap=new LBitmap(new LBitmapData(game.loadList["plane"]));
		_.addChild(_.bitmap);
		_.bitmap.x=(LGlobal.width-_.bitmap.getWidth())/2;
		_.bitmap.y=LGlobal.height-_.bitmap.getHeight()-150;
		num=_.bitmap.x;
	}
	Plane.prototype.run=function(){
		if(_.dir=="left"){
			num-=speed;
			if(_.bitmap.x<=-25){
				num=-25;
			}
			_.bitmap.x=num;
		}
		if(_.dir=="right"){
			num+=speed;
			if(_.bitmap.x>=LGlobal.width-_.bitmap.getWidth()+25){
				num=LGlobal.width-_.bitmap.getWidth()+25;
			}
			_.bitmap.x=num;
		}
		/*开始碰撞检测*/
		var i;
		for(i=0;i<meteoriteLayer.childList.length;i++){
			if(_.bitmap.x+25<meteoriteLayer.childList[i].x+meteoriteLayer.childList[i].tx+meteoriteLayer.childList[i].w&&
				meteoriteLayer.childList[i].x+meteoriteLayer.childList[i].tx<_.bitmap.x+75&&
				_.bitmap.y+17<meteoriteLayer.childList[i].y+meteoriteLayer.childList[i].ty+meteoriteLayer.childList[i].h&&
				meteoriteLayer.childList[i].y+meteoriteLayer.childList[i].ty<_.bitmap.y+17+95){
				if(meteoriteLayer.childList[i].name!="meteorite05"&&meteoriteLayer.childList[i].name!="meteorite06"&&meteoriteLayer.childList[i].name!="energy"){
					gameover.init();
				}else if(meteoriteLayer.childList[i].name=="energy"){
					meteoriteLayer.removeChild(meteoriteLayer.childList[i]);
					_.count++;
				}
			}
		}
	}
	w.planeLayer=new Plane();
})(window);

/*
陨石层

*/

(function(w){
	var _;
	var posArr=[0,1,2,3,4,5,6,7,8],
	recordHeight=0,
	recordX=-1;
	var num=0,
	meteoriteArr=[
		{type:"meteorite01",
			x:0,
			y:0,
			tx:33,
			ty:37,
			w:55,
			h:47},
			{type:"meteorite02",
			x:0,
			y:0,
			tx:44,
			ty:36,
			w:27,
			h:25},
			{type:"meteorite03",
			x:0,
			y:0,
			tx:20,
			ty:14,
			w:91,
			h:105},
			{type:"meteorite04",
			x:0,
			y:0,
			tx:15,
			ty:26,
			w:126,
			h:56},
			{type:"meteorite05",
			x:0,
			y:0,
			tx:0,
			ty:0,
			w:100,
			h:0},
			{type:"meteorite06",
			x:0,
			y:0,
			tx:0,
			ty:0,
			w:80,
			h:109},
			{
			type:"energy",
			x:0,
			y:0,
			tx:82,
			ty:79,
			w:75,
			h:75
			},{
			type:"energy",
			x:0,
			y:0,
			tx:82,
			ty:79,
			w:75,
			h:75
			},{
			type:"energy",
			x:0,
			y:0,
			tx:82,
			ty:79,
			w:75,
			h:75
			}
		];
	
	function Meteorite(){
		_=this;
		base(_,LSprite,[]);	
	};
	Meteorite.prototype.arr=function(){
		/*呵呵，记录忘了重置*/
		recordHeight=0;
		for(var i=0;i<meteoriteArr.length;i++){
			meteoriteArr[i].x=0;
			meteoriteArr[i].y=0;
		}
	}
	Meteorite.prototype.init=function(){
		_.arr();

		posArr.sort(function(a,b){
			return Math.random()>0.5?-1:1;
		});
		
		backLayer.addChild(_);
		var i,bitmap;
		for(i=0;i<meteoriteArr.length;i++){
			meteoriteArr[posArr[i]].x=Math.random()*(game.totalWidth-meteoriteArr[posArr[i]].tx-meteoriteArr[posArr[i]].w);
			if(i-1>=0){
				while(meteoriteArr[posArr[i-1]].x<meteoriteArr[posArr[i]].x+meteoriteArr[posArr[i]].w&&meteoriteArr[posArr[i]].x<meteoriteArr[posArr[i-1]].x+meteoriteArr[posArr[i-1]].w){
					meteoriteArr[posArr[i]].x=Math.random()*(game.totalWidth-meteoriteArr[posArr[i]].tx-meteoriteArr[posArr[i]].w);
					}
				}
			meteoriteArr[posArr[i]].y=0;
			meteoriteArr[posArr[i]].y=-game.totalHeight*3+recordHeight+Math.random()*200;
			recordHeight=meteoriteArr[posArr[i]].h+game.totalHeight*3+meteoriteArr[posArr[i]].y+50;
		}
		for(i=0;i<meteoriteArr.length;i++){
			bitmap=new LBitmap(new LBitmapData(game.loadList[meteoriteArr[i].type]));
			bitmap.name=meteoriteArr[i].type;
			bitmap.tx=meteoriteArr[i].tx;
			bitmap.ty=meteoriteArr[i].ty;
			bitmap.w=meteoriteArr[i].w;
			bitmap.h=meteoriteArr[i].h;
			bitmap.x=meteoriteArr[i].x;
			bitmap.y=meteoriteArr[i].y;
			_.addChild(bitmap);
		}
	}
	Meteorite.prototype.run=function(){
		var i;
		for(i=0;i<_.childList.length;i++){
			_.childList[i].y+=10;
		}
	}
	w.meteoriteLayer=new Meteorite();
})(window);


/*游戏结束*/

(function(w){
	var _;
	function GameOver(){
		_=this;
		base(_,LSprite,[]);

	}
	GameOver.prototype.init=function(){
		backLayer.die();
		backLayer.removeAllChild();
		meteoriteLayer.removeAllChild();
		MarsLayer.removeAllChild();
		planeLayer.removeAllChild();
		planeLayer.dir=null;
		backLayer.addChild(_);
		var bitmap=new LBitmap(new LBitmapData(game.loadList["failBg"]));
		_.addChild(bitmap);
		var sprite,i,btp,j;
		for(i=1;i<=3;i++){
			sprite=new LSprite();
			_.addChild(sprite);
			if(i<=planeLayer.count){
				btp=new LBitmap(new LBitmapData(game.loadList["prize0"+i+"-a"]));
			}else{
				btp=new LBitmap(new LBitmapData(game.loadList["prize0"+i]));
			}
			sprite.addChild(btp);
			sprite.y=405+(i-1)*btp.getHeight();
			sprite.x=(game.totalWidth-btp.getWidth())/2;
			sprite.name="p0"+i;
			sprite.addEventListener(LMouseEvent.MOUSE_DOWN,down);
		}
		_.restart();
	}
	GameOver.prototype.restart=function(){
		var click=new LBitmap(new LBitmapData(game.loadList["againBtn"]));
		_.btn=new LButton(click);
		_.btn.x=206;
		_.btn.y=886;
		_.addChild(_.btn);
		_.btn.addEventListener(LMouseEvent.MOUSE_DOWN,_.reDown.bind(_));
	}
	GameOver.prototype.reDown=function(){
		backLayer.die();
		backLayer.removeAllChild();
		backLayer.init();
		MarsLayer.init();
		MarsLayer.run();
		meteoriteLayer.init();
		btn.init();
		targetLayer.init();
		planeLayer.init();
		backLayer.addEvent();
	}
	function down(){
		prize.name=this.sp.name;
		prize.show();
	}
	w.gameover=new GameOver();
})(window);

/*
	目标层
*/
(function(w){
	var _;
	function Target(){
		_=this;
		base(_,LSprite,[]);

	};
	Target.prototype.init=function(){
		backLayer.addChild(_);
		var targetBitmap=new LBitmap(new LBitmapData(game.loadList["earth"])); 
		_.addChild(targetBitmap);
		targetBitmap.x=0;
		targetBitmap.y=0;
		_.y=-game.totalHeight*4;
	};
	w.targetLayer=new Target();
})(window);

/*
	通关层
*/

(function(w){
	var _;
	function Success(){
		_=this;
		base(_,LSprite,[]);
		_.offOn;
	};
	Success.prototype.init=function(){
		_.offOn=true;
		backLayer.die();
		backLayer.removeAllChild();
		meteoriteLayer.removeAllChild();
		MarsLayer.removeAllChild();
		planeLayer.removeAllChild();
		planeLayer.dir=null;
		backLayer.addChild(_);
		var bitmap=new LBitmap(new LBitmapData(game.loadList["success01"]));
		_.addChild(bitmap);
		var sprite,i,btp,j;
		for(i=1;i<=3;i++){
			sprite=new LSprite();
			_.addChild(sprite);
			btp=new LBitmap(new LBitmapData(game.loadList["prize0"+i+"-a"]));
			sprite.addChild(btp);
			sprite.y=405+(i-1)*btp.getHeight();
			sprite.x=(game.totalWidth-btp.getWidth())/2;
			sprite.name="p0"+i;
			sprite.addEventListener(LMouseEvent.MOUSE_DOWN,down);
		}
		_.next();
	};

	Success.prototype.next=function(){
		var click=new LBitmap(new LBitmapData(game.loadList["nextBtn"]));
		_.btn=new LButton(click);
		_.btn.x=206;
		_.btn.y=886;
		_.addChild(_.btn);
		_.btn.addEventListener(LMouseEvent.MOUSE_DOWN,_.reDown.bind(_));
	}

	Success.prototype.reDown=function(){
		if(_.offOn){
			_.offOn=false;
			/*关数*/
			game.stage++;
		}
		backLayer.die();
		backLayer.removeAllChild();
		backLayer2.init();
		EarthLayer.init();
		EarthLayer.run();
		meteoriteLayer2.init();
		btn2.init();
		planeLayer2.init();
		backLayer2.addEvent();
	}

	function down(){
		prize.name=this.sp.name;
		prize.show();
	}
	w.success=new Success();
})(window);

/*
	奖品展示层
*/
(function(w){
	var _;
	function Prize(){
		_=this;
		base(_,LSprite,[]);
		_.name=null;
	};
	Prize.prototype.show=function(){
		if(game.stage==1){
			backLayer.addChild(_);
		}else if(game.stage==2){
			backLayer2.addChild(_);
		}else if(game.stage==3){
			backLayer3.addChild(_);
		}
		var bitmapBg=new LBitmap(new LBitmapData(game.loadList["viewBg"]));
		_.addChild(bitmapBg);
		var item=new LBitmap(new LBitmapData(game.loadList[_.name]));
		_.addChild(item);
		item.x=98;
		item.y=323;
		_.addEventListener(LMouseEvent.MOUSE_DOWN,_.close.bind(_));
	}
	Prize.prototype.close=function(){
		if(game.stage==1){
			backLayer.removeChild(_);
		}else if(game.stage==2){
			backLayer2.removeChild(_);
		}else if(game.stage==3){
			backLayer3.removeChild(_);
		}
	}
	w.prize=new Prize();
})(window);


