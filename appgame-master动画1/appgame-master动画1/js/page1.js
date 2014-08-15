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
$(function() {
    $(".bubble img").draggable({
        revert: "invalid",
        containment: "circle",
        zIndex: 2700,
        addClasses: false,
        start: function(event, ui) {
            ui.helper.removeClass('animated');
        },
        stop: function(event, ui) {
            ui.helper.addClass('animated');
        }
    });
    $(".logo img").droppable({
        accept: ".isanswer",
        over: function(event, ui) {
            ui.draggable.animate({
                opacity: 0
            }, 1000, function() {
                ui.draggable.remove();
                appgame.start();
            });
        }
    });
});
var appgame = {
    g_txtshow: false,
    g_txtshow2: false,
    start: function() {
        $(".circle-tips").show();
        // 创建渐变
        var changwidth = 0;
        appgame.g_txtshow = window.setInterval(function() {
            var canvas = document.getElementById("canvas1");
            changwidth += 50;
            if (appgame.text("源于自然", canvas, changwidth) == false) {
                window.clearInterval(appgame.g_txtshow);
                appgame.g_txtshow = false;
                appgame.rowtwo();
                return false;
            };
        }, 200);
    },
    rowtwo: function() {
        // 创建渐变
        var changwidth = 0;
        appgame.g_txtshow = window.setInterval(function() {
            var canvas = document.getElementById("canvas2");
            changwidth += 50;
            if (appgame.text("悦绽纯净活肌能量", canvas, changwidth) == false) {
                window.clearInterval(appgame.g_txtshow);
                appgame.g_txtshow = false;
                appgame.changerow();
                return false;
            };
        }, 200);
    },
    changerow: function() {
        $("#canvas1").fadeOut(1500, function() {
            appgame.clear(document.getElementById("canvas1"));
        });
        $("#canvas2").fadeOut(1500, function() {
            appgame.clear(document.getElementById("canvas2"));
            appgame.rowthere();
        });
    },
    rowthere: function() {
        // 创建渐变
        var changwidth = 0;
        appgame.g_txtshow2 = window.setInterval(function() {
            var canvas = document.getElementById("canvas1");
            changwidth += 50;
            if (appgame.text("签到成功，请继续前进", canvas, changwidth) == false) {
                window.clearInterval(appgame.g_txtshow2);
                appgame.rowfour();
                return false;
            };
        }, 200);
    },
    rowfour: function() {
        // 创建渐变
        var changwidth = 0;
        if (appgame.g_txtshow2) {
            window.clearInterval(appgame.g_txtshow2);
        }
        appgame.g_txtshow2 = window.setInterval(function() {
            var canvas = document.getElementById("canvas2");
            changwidth += 50;
            if (appgame.text("探索大自然的奇迹", canvas, changwidth) == false) {
                window.clearInterval(appgame.g_txtshow2);
                appgame.g_txtshow = false;
                return false;
            };
        }, 200);
    },
    text: function(str, canvas, changwidth) {
        var context2D = canvas.getContext("2d");
        context2D.font = "20px black";
        context2D.textAlign = 'center';
        var text = context2D.measureText(str);
        var textwidth = text.width;
        changwidth = changwidth + (canvas.width - textwidth) / 2;
        var parcent = changwidth / canvas.width;
        if (parcent > 1) {
            context2D.clearRect(0, 0, canvas.width, canvas.height);
            var gradient = context2D.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", "#000");
            gradient.addColorStop("1.0", "#000");
            context2D.fillStyle = gradient;
            context2D.fillText(str, canvas.width / 2, canvas.height / 2);
            return false;
        }
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        var gradient = context2D.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "#000");
        gradient.addColorStop((parcent / 2).toString(), "#000");
        gradient.addColorStop(parcent.toString(), "transparent");
        gradient.addColorStop("1.0", "transparent");
        context2D.fillStyle = gradient;
        context2D.fillText(str, canvas.width / 2, canvas.height / 2);
    },
    clear: function(canvas) {
        var context2D = canvas.getContext("2d");
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        $(canvas).show();
    }
}