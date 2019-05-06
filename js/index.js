
/*移动端适配设置*/
(function(doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth;
                if(!clientWidth) return;
                if(clientWidth >= 640) {
                    docEl.style.fontSize = '100px';
                } else {
                    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
                }
            };
        if(!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);

/*切屏效果*/
        var my=new Swiper("#swiper-container",{
            direction:"vertical",
            allowSwipeToPrev:false,
            /*某一屏运动完成之后执行的*/
            onTransitionEnd:function(my){
                switch(my.activeIndex){
                    case 1:
                    TweenMax.to($(".spaceship2"),2,{
                        top:"400",
                        left:"500",
                        ease:'linear',
                        repeat: 0,
                        opacity:1
                    });
                    break;
                    case 2:
                    /*打字效果*/
                    $(function(){
                        $(".intro1").typetype("2015年12月11日，",{
                            e:0,
                            callback:function(){
                                $(this).append("<br />");
                            }
                        }).typetype("太空棉家居领导品牌SINOMAX赛诺",{
                             e:0,
                            callback:function(){
                                $(this).append("<br />");
                            }
                        }).typetype("与致力于太空旅游的XCOR环宇太空",{
                             e:0,
                            callback:function(){
                                $(this).append("<br />");
                            }
                        }).typetype("完成签约仪式，正式宣告达成战略合作，",{
                             e:0,
                            callback:function(){
                                $(this).append("<br />");
                            }
                        }).typetype("启动全球新品牌战略。",{
                             e:0,
                            callback:function(){
                                $(this).append("<br /><br />");
                            }
                        }).typetype("从此人类的探索不止于上太空，",{
                             e:0,
                            callback:function(){
                                $(this).append("<br />");
                            }
                        }).typetype("爱让梦想超越引力。",{
                            e:0
                        });
                    });
                    break;
                     case 3:
                    /*打字效果*/
                    $(function(){
                        $(".intro2").typetype("2026年12月，xcor太空飞船",{
                            e:0,
                            callback:function(){
                                $(this).append("<br />");
                            }
                        }).typetype("进行了多次穿越探索，",{
                             e:0,
                            callback:function(){
                                $(this).append("<br />");
                            }
                        }).typetype("由于长时间的宇宙飞行，",{
                             e:0,
                            callback:function(){
                                $(this).append("<br />");
                            }
                        }).typetype("宇航员们承受地球4倍的重力",{
                             e:0,
                            callback:function(){
                                $(this).append("<br />");
                            }
                        }).typetype("而导致身体极其疲惫，",{
                             e:0,
                            callback:function(){
                                $(this).append("<br />");
                            }
                        }).typetype("急需收集新科技抗压物资。",{
                             e:0,
                            callback:function(){
                                $(this).append("<br /><br />");
                            }
                        }).typetype("在最后的三段穿越中，",{
                            e:0,
                            callback:function(){
                                $(this).append("<br />");
                            }
                        }).typetype("他们要顺利避过陨石阵到达空间站并成功集齐各种",{
                            e:0,
                            callback:function(){
                                 $(this).append("<br />");
                            }
                        }).typetype("抗压物资，你能帮助他们吗？",{
                            e:0,
                        });
                    });
                    break;
                };   
            }
        });

/*预加载*/

var queue=new createjs.LoadQueue();
queue.on("complete",onComplete);
queue.on("progress",onProgress);
queue.loadManifest(fileArray);
queue.load();

function onProgress(event){
    $("#loading .percent").html(Math.floor(this.progress*100)+"%");
    my.lockSwipes();
}

function onComplete(e){
    my.unlockSwipes();
    setTimeout(function(){
        my.slideTo(1,500,false);
    },1000);
    $("[data-background],[data-src]").each(function(){
        if($(this).is("[data-src]")){
            $(this).attr("src",queue.getItem($(this).data("src")).src);
        }else{
           $(this).css("background","url("+queue.getItem($(this).data("background")).src+")");
        }
    });



    /*音乐*/
/*使用click有200到300毫秒的延迟*/
(function(){
    function changeMusic(){
         var offOn=null;
        if(localStorage.getItem("on")==null){
            offOn=$(".music").data("on");
        }else{
            offOn=localStorage.getItem("on");
            $(".music").data("on",offOn);
        }
         if(offOn=="on"){
                $(".music").attr("src",queue.getItem("music-on").src);
                $(".musicBox .musicOffOn").html("TURN ON");
                $(".music").data("on","off");
            }else{
                 $(".music").addClass("off");
               $(".music").attr("src",queue.getItem("music-off").src); 
               $(".musicBox .musicOffOn").html("TURN OFF");
               $(".music").data("on","on");
            }
        }
        changeMusic();
    $(".musicBox").on("touchstart",function(){
         $(".music").toggleClass("off");
         offOn=$(".music").data("on");
         localStorage.setItem("on",offOn);
           if(offOn=="on"){
                $(".music").attr("src",queue.getItem("music-on").src);
                $(".music").data("on","off");
                $(".musicBox .musicOffOn").html("TURN ON");
            }else{
                $(".music").data("on","on");
               $(".music").attr("src",queue.getItem("music-off").src); 
               $(".musicBox .musicOffOn").html("TURN OFF");
            }
    });

})();

}











