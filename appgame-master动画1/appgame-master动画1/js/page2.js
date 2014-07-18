//拖拽事件转换
! function(a) {
    function f(a, b) {
        if (!(a.originalEvent.touches.length > 1)) {
            a.preventDefault();
            var c = a.originalEvent.changedTouches[0],
                d = document.createEvent("MouseEvents");
            d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d)
        }
    }
    if (a.support.touch = "ontouchend" in document, a.support.touch) {
        var e, b = a.ui.mouse.prototype,
            c = b._mouseInit,
            d = b._mouseDestroy;
        b._touchStart = function(a) {
            var b = this;
            !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0, b._touchMoved = !1, f(a, "mouseover"), f(a, "mousemove"), f(a, "mousedown"))
        }, b._touchMove = function(a) {
            e && (this._touchMoved = !0, f(a, "mousemove"))
        }, b._touchEnd = function(a) {
            e && (f(a, "mouseup"), f(a, "mouseout"), this._touchMoved || f(a, "click"), e = !1)
        }, b._mouseInit = function() {
            var b = this;
            b.element.bind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), c.call(b)
        }, b._mouseDestroy = function() {
            var b = this;
            b.element.unbind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), d.call(b)
        }
    }
}(jQuery);

/****针对winphone修改****/
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style")
    msViewportStyle.appendChild(
        document.createTextNode(
            "@-ms-viewport{width:auto!important}"
        )
    )
    document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
}
//游戏操作
var g_totle = 4;
$(function() {
    $(".items").draggable({
        revert: "invalid",
        containment: "window",
        zIndex: 2700,
        addClasses: false,
        start: function(event, ui) {
            appgame.start();
        }
    });
    $(".circle").droppable({
        accept: ".isanswer",
        over: function(event, ui) {
            if (ui.draggable.data("over")) {
                return;
            }
            ui.draggable.data("over", true);
            ui.draggable.animate({
                opacity: 0
            }, 400, function() {
                if (g_totle-- < 1) {
                    appgame.win();
                }
            });
        },
        drop: function(event, ui) {
            if (ui.draggable.data("over")) {
                return;
            }
            ui.draggable.data("over", true);
            ui.draggable.animate({
                opacity: 0
            }, 400, function() {
                if (g_totle-- < 1) {
                    appgame.win();
                }
            });
        }
    });
});
var appgame = {
    //计时器
    count: 0,
    timer: false,
    timestr: "",
    timedCount: function() {
        hour = parseInt(appgame.count / 3600000); // 小时数  
        min = parseInt(appgame.count / 60000); // 分钟数
        if (min < 10) {
            min = "0" + min;
        }
        if (min >= 60) {
            min = min % 60
        }
        lastsecs = parseInt(appgame.count / 1000);
        if (lastsecs < 10) {
            lastsecs = "0" + lastsecs;
        }
        lastmsecs = parseInt(appgame.count % 1000);
        if (lastmsecs < 10) {
            lastmsecs = "0" + lastmsecs;
        }
        appgame.timestr = min + "\"" + lastsecs + "\'" + lastmsecs;
        appgame.count = appgame.count + 10;
        t = setTimeout("appgame.timedCount()", 10)
    },
    stopCount: function() {
        clearTimeout(appgame.timer);
    },
    isStart: false,
    //开始计时
    start: function() {
        if (appgame.isStart) {
            return;
        }
        appgame.isStart = true;
        appgame.timedCount();
        $(".circle").show();
        $(".footer").animate({
                opacity: 0,
                height: 0
            },
            400, function() {
                $(".footer").remove();
            });
    },
    //游戏胜利结束计时
    win: function() {
        // $(".circle-tips").fadeIn("400", function() {
        //     appgame.toend();
        //     appgame.stopCount();
        // });
        $(".circle-tips").animate({
                opacity: 1
            },
            400, function() {
                appgame.toend();
                appgame.stopCount();
            })
    },
    //过场
    toend: function() {
        $(".content").animate({
                opacity: 0
            },
            600, function() {
                appgame.end();
            })
    },
    //结束
    end: function() {
        $(".circle").css("background-position", "center");
        $(".circle").css("height", "100%");
        $(".circle-tips").css("margin-top", "40%");
        $(".content").animate({
            height: "0px"
        }, 1000, function() {
            $(".circle-time").html(appgame.timestr);
            $(".circle-tips").hide();
            $(".circle-hide").show();
            $(".circle-title").animate({
                height: "140px"
            }, 1000);
            // $(".logo").animate({
            //     marginTop: "20px"
            // }, 1000);
        });
    }
}