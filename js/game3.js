/*
	第三关
*/

/*
背景层
*/

(function(w){
var _;

function Background3(){
	_=this;
	base(_,LSprite,[]);
	_.bitmap1;
	_.bitmap2;
	_.targetD=0;
}
Background3.prototype.init=function(){
	_.targetD=-game.totalHeight*4;

	addChild(_);
	_.bitmap1=new LBitmap(new LBitmapData(game.loadList["bg"]));
	_.addChild(_.bitmap1);
	_.bitmap1.y=0;
	_.bitmap2=new LBitmap(new LBitmapData(game.loadList["bg"]));
	_.addChild(_.bitmap2);
	_.bitmap2.y=-_.bitmap1.getHeight();	
}
Background3.prototype.addEvent=function(){
	_.addEventListener(LEvent.ENTER_FRAME,_.run.bind(_));
}
Background3.prototype.run=function(){

		_.bitmap1.y+=10;
		_.bitmap2.y+=10;
		_.targetD+=10;
		targetLayer3.y+=10;
		if(_.targetD>=0){
			_.removeAllEventListener();
			_.addEventListener(LEvent.ENTER_FRAME,target);
		};
	if(_.bitmap1.y>=_.bitmap1.getHeight()){
		_.bitmap1.y=_.bitmap2.y-_.bitmap1.getHeight();
	}
	if(_.bitmap2.y>=_.bitmap2.getHeight()){
		_.bitmap2.y=_.bitmap1.y-_.bitmap2.getHeight();
	}
	planeLayer3.run();
	meteoriteLayer3.run();
};
function target(){
	if(planeLayer3.childList[0].y>-200){
		planeLayer3.childList[0].y-=20;
	}else{
		_.removeAllEventListener();
		if(planeLayer3.count==1){
			success3.init();
		}else{
			gameover3.init();
		}
	}
};
w.backLayer3=new Background3();
})(window);


/*
	星球层
*/
(function(w){
	var _;

	function planet(){
		_=this;
		base(_,LSprite,[]);
	}
	planet.prototype.init=function(){
		backLayer3.addChild(_);
		_.bitmap=new LBitmap(new LBitmapData(game.loadList["bg03"]));
		_.addChild(_.bitmap);
		_.bitmap.y=game.totalHeight-_.bitmap.getHeight();
		_.bitmap.x=0;
	}

	planet.prototype.run=function(){
		var t1=new TimelineLite();
		t1.to(_.bitmap,2,{y:"+="+_.bitmap.getHeight()});
	}
	w.planetLayer=new planet();
})(window);

/*
	按钮层
*/

(function(w){
	var _;
	var btnLeft,btnRight;
	function Btn3(){
		_=this;
		base(_,LSprite,[]);
	}
	Btn3.prototype.init=function(){
		backLayer3.addChild(_);
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

	Btn3.prototype.leftdown=function(){
		planeLayer3.dir="left";
	}
	Btn3.prototype.rightdown=function(){
		planeLayer3.dir="right";
	}
	Btn3.prototype.up=function(){
		planeLayer3.dir=null;
	}
	w.btn3=new Btn3();
})(window);


/*
	飞机层
*/

(function(w){
	var _;
	var speed=10;
	var num=0;
	function Plane3(){
		_=this;
		base(_,LSprite,[]);
		_.dir=null;
		_.count;
	};
	Plane3.prototype.init=function(){
		_.count=0;
		backLayer3.addChild(_);
		_.bitmap=new LBitmap(new LBitmapData(game.loadList["plane"]));
		_.addChild(_.bitmap);
		_.bitmap.x=(LGlobal.width-_.bitmap.getWidth())/2;
		_.bitmap.y=LGlobal.height-_.bitmap.getHeight()-150;
		num=_.bitmap.x;
	}
	Plane3.prototype.run=function(){
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
		for(i=0;i<meteoriteLayer3.childList.length;i++){
			if(_.bitmap.x+25<meteoriteLayer3.childList[i].x+meteoriteLayer3.childList[i].tx+meteoriteLayer3.childList[i].w&&
				meteoriteLayer3.childList[i].x+meteoriteLayer3.childList[i].tx<_.bitmap.x+75&&
				_.bitmap.y+17<meteoriteLayer3.childList[i].y+meteoriteLayer3.childList[i].ty+meteoriteLayer3.childList[i].h&&
				meteoriteLayer3.childList[i].y+meteoriteLayer3.childList[i].ty<_.bitmap.y+17+95){
				if(meteoriteLayer3.childList[i].name!="meteorite26"&&
					meteoriteLayer3.childList[i].name!="meteorite27"&&
					meteoriteLayer3.childList[i].name!="meteorite28"&&
					meteoriteLayer3.childList[i].name!="energy"){
					gameover3.init();
					// console.log(meteoriteLayer3.meteoriteArr[i].type);
				}else if(meteoriteLayer3.childList[i].name=="energy"){
					meteoriteLayer3.removeChild(meteoriteLayer3.childList[i]);
					_.count++;
				}
			}
		}
	}
	w.planeLayer3=new Plane3();
})(window);


/*
陨石层

*/

(function(w){
	var _;
	var posArr=[9,8,6,2,10,7,5,4,3,1,0],
	recordHeight=0,
	recordX=-1;
	var num=0,
	meteoriteArr=[
			{type:"meteorite27",
			x:0,
			y:0,
			tx:52,
			ty:54,
			w:90,
			h:105},
			{type:"meteorite21",
			x:0,
			y:0,
			tx:58,
			ty:35,
			w:328,
			h:212},
			{type:"meteorite23",
			x:0,
			y:0,
			tx:40,
			ty:30,
			w:106,
			h:75},
			{type:"meteorite22",
			x:0,
			y:0,
			tx:48,
			ty:51,
			w:213,
			h:186},
			{type:"meteorite24",
			x:0,
			y:0,
			tx:58,
			ty:48,
			w:55,
			h:48},
			{type:"meteorite21",
			x:0,
			y:0,
			tx:58,
			ty:35,
			w:328,
			h:212},
			{type:"meteorite25",
			x:0,
			y:0,
			tx:18,
			ty:16,
			w:17,
			h:13},
			{type:"meteorite26",
			x:0,
			y:0,
			tx:23,
			ty:42,
			w:108,
			h:75},
			{type:"meteorite22",
			x:0,
			y:0,
			tx:48,
			ty:51,
			w:213,
			h:186},
			{type:"meteorite28",
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
			}
		];
	
	function Meteorite3(){
		_=this;
		base(_,LSprite,[]);	
	};
	Meteorite3.prototype.arr=function(){
		/*呵呵，记录忘了重置*/
		recordHeight=0;
		for(var i=0;i<meteoriteArr.length;i++){
			meteoriteArr[i].x=0;
			meteoriteArr[i].y=0;
		}
	}
	Meteorite3.prototype.init=function(){
		_.arr();
		/*posArr.sort(function(a,b){
			return Math.random()>0.5?-1:1;
		});*/
		console.log(posArr);
		console.log(meteoriteArr.length);
		backLayer3.addChild(_);
		var i,bitmap;
		for(i=0;i<meteoriteArr.length;i++){
			meteoriteArr[posArr[i]].x=Math.random()*(game.totalWidth-meteoriteArr[posArr[i]].tx-meteoriteArr[posArr[i]].w);
			if(i-1>=0){
				while(meteoriteArr[posArr[i-1]].x<meteoriteArr[posArr[i]].x+meteoriteArr[posArr[i]].w&&
					meteoriteArr[posArr[i]].x<meteoriteArr[posArr[i-1]].x+meteoriteArr[posArr[i-1]].w&&
					meteoriteArr[posArr[i]].type!="meteorite21"&&
					meteoriteArr[posArr[i]].type!="meteorite22"){
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
		console.log(_.childList);
	}
	Meteorite3.prototype.run=function(){
		var i;
		for(i=0;i<_.childList.length;i++){
			_.childList[i].y+=10;
		}
	}
	w.meteoriteLayer3=new Meteorite3();
})(window);

/*游戏结束*/

(function(w){
	var _;
	function GameOver3(){
		_=this;
		base(_,LSprite,[]);

	}
	GameOver3.prototype.init=function(){
		backLayer3.die();
		backLayer3.removeAllChild();
		meteoriteLayer3.removeAllChild();
		planetLayer.removeAllChild();
		planeLayer3.removeAllChild();
		planeLayer3.dir=null;
		backLayer3.addChild(_);
		var bitmap=new LBitmap(new LBitmapData(game.loadList["failBg"]));
		_.addChild(bitmap);
		var sprite,i,btp,j;
		for(i=6;i<=6;i++){
			sprite=new LSprite();
			_.addChild(sprite);
			if((i-3)<=planeLayer3.count){
				btp=new LBitmap(new LBitmapData(game.loadList["prize0"+i+"-a"]));
			}else{
				btp=new LBitmap(new LBitmapData(game.loadList["prize0"+i]));
			}
			sprite.addChild(btp);
			sprite.y=405+(i-6)*btp.getHeight();
			sprite.x=(game.totalWidth-btp.getWidth())/2;
			sprite.name="p0"+i;
			sprite.addEventListener(LMouseEvent.MOUSE_DOWN,down);
		}
		_.restart();
	}
	GameOver3.prototype.restart=function(){
		var click=new LBitmap(new LBitmapData(game.loadList["againBtn"]));
		_.btn=new LButton(click);
		_.btn.x=206;
		_.btn.y=886;
		_.addChild(_.btn);
		_.btn.addEventListener(LMouseEvent.MOUSE_DOWN,_.reDown.bind(_));
	}
	GameOver3.prototype.reDown=function(){
		backLayer3.die();
		backLayer3.removeAllChild();
		backLayer3.init();
		planetLayer.init();
		planetLayer.run();
		meteoriteLayer3.init();
		btn3.init();
		targetLayer3.init();
		planeLayer3.init();
		backLayer3.addEvent();
	}
	function down(){
		prize.name=this.sp.name;
		prize.show();
	}
	w.gameover3=new GameOver3();
})(window);

/*
	通关层
*/

(function(w){
	var _;
	function Success3(){
		_=this;
		base(_,LSprite,[]);
		_.offOn;
	};
	Success3.prototype.init=function(){
		_.offOn=true;
		backLayer3.die();
		backLayer3.removeAllChild();
		meteoriteLayer3.removeAllChild();
		planetLayer.removeAllChild();
		planeLayer3.removeAllChild();
		planeLayer3.dir=null;
		backLayer3.addChild(_);
		var bitmap=new LBitmap(new LBitmapData(game.loadList["success01"]));
		_.addChild(bitmap);
		var sprite,i,btp,j;
		for(i=6;i<=6;i++){
			sprite=new LSprite();
			_.addChild(sprite);
			btp=new LBitmap(new LBitmapData(game.loadList["prize0"+i+"-a"]));
			sprite.addChild(btp);
			sprite.y=405+(i-6)*btp.getHeight();
			sprite.x=(game.totalWidth-btp.getWidth())/2;
			sprite.name="p0"+i;
			sprite.addEventListener(LMouseEvent.MOUSE_DOWN,down);
		}
		_.next();
	};

	Success3.prototype.next=function(){
		var click=new LBitmap(new LBitmapData(game.loadList["nextBtn"]));
		_.btn=new LButton(click);
		_.btn.x=206;
		_.btn.y=886;
		_.addChild(_.btn);
		_.btn.addEventListener(LMouseEvent.MOUSE_DOWN,_.reDown.bind(_));
	}

	Success3.prototype.reDown=function(){
		if(_.offOn){
			_.offOn=false;
			/*关数*/
			game.stage++;
		}
		/*backLayer.die();
		backLayer.removeAllChild();
		backLayer.init();
		planetLayer.init();
		planetLayer.run();
		meteoriteLayer.init();
		btn.init();
		targetLayer.init();
		planeLayer.init();
		backLayer.addEvent();*/
	}

	function down(){
		prize.name=this.sp.name;
		prize.show();
	}
	w.success3=new Success3();
})(window);


(function(w){
	var _;
	function Target3(){
		_=this;
		base(_,LSprite,[]);

	};
	Target3.prototype.init=function(){
		backLayer3.addChild(_);
		var targetBitmap=new LBitmap(new LBitmapData(game.loadList["endTatrget"])); 
		_.addChild(targetBitmap);
		targetBitmap.x=0;
		targetBitmap.y=-70;
		_.y=-game.totalHeight*4;
	};
	w.targetLayer3=new Target3();
})(window);