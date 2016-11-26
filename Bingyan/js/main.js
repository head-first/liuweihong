/*! home 2015-04-19 */
$(function() {
    function addLoadEvent(func) {
        var oldonload = window.onload;
        window.onload = "function" != typeof window.onload ? func : function() {
            oldonload && oldonload(),
            func()
        }
    }
    var wW = $(window).width()
      , wH = $(window).height()
      , MIN_WIDTH = Number(/\d*/.exec($("body").css("min-width"))[0]);
    $(window).resize(function() {
        wW = $(window).width() < MIN_WIDTH ? MIN_WIDTH : $(window).width(),
        wH = $(window).height(),
        indexBg.resize(),
        indexBg1.resize(),
        indexBg2.resize(),
        indexBg3.resize(),
        indexBg4.resize(),
        indexBg5.resize(),
        circleGroup.resize()
    }),
    $("#info_form").validate({
        rules: {
            name: {
                required: !0,
                minlength: 2
            },
            mail: {
                required: !0,
                email: !0
            },
            tel: {
                digits: !0,
                rangelength: [7, 11]
            },
            text: {
                required: !0
            }
        },
        messages: {
            name: {
                required: "请留下姓名",
                minlength: "请输入正确的姓名"
            },
            mail: {
                required: "请留下邮箱，我们会及时反馈",
                email: "请输入正确的邮箱"
            },
            tel: {
                digits: "请输入正确的号码",
                rangelength: "请输入正确的号码"
            },
            text: {
                required: "请留下您想对我们说的话"
            }
        }
    });
    var circleGroup = {
        elem: $("#circle_group"),
        default_width: 1173,
        value: 1,
        resize: function() {
            wW < this.default_width && (this.value = wW / this.default_width,
            this.elem.css({
                "-webkit-transform": "scale(" + this.value + ")",
                "-moz-transform": "scale(" + this.value + ")",
                "-ms-transform": "scale(" + this.value + ")",
                "-o-transform": "scale(" + this.value + ")",
                transform: "scale(" + this.value + ")"
            }))
        }
    }
      , BG = function(elem, w, h) {
        this.elem = elem,
        this.w = w,
        this.h = h,
        this.resize()
    };
    BG.prototype = {
        resize: function() {
            wW / wH < this.w / this.h ? this.elem.css("background-size", "auto 100%") : this.elem.css("background-size", "100% auto")
        }
    };
    var indexBg = new BG($("body"),1500,912)
      , indexBg1 = new BG($(".bg1"),1100,461)
      , indexBg2 = new BG($(".bg2"),1200,720)
      , indexBg3 = new BG($(".bg3"),1300,674)
      , indexBg4 = new BG($(".bg4"),1300,863)
      , indexBg5 = new BG($(".bg5"),1288,638)
      , indexImg = function(elem, circle) {
        this.elem = elem,
        this.src = elem.attr("data-src"),
        this.circle = circle,
        this.circleCover = this.circle.prev(".circle_cover"),
        this.name = this.circle.prevAll(".name"),
        this.blackWrap = this.circle.prevAll(".circle_cover_black"),
        this.loadImg = function() {
            var that = this
              , img = new Image;
            img.onload = function() {
                that.elem.css("background-image", "url(" + that.src + ")"),
                img.onload = null
            }
            ,
            img.src = this.src
        }
        ,
        this.bind = function() {
            var that = this;
            this.circle.bind("mouseenter", function() {
                return clearTimeout(t),
                that.circleCover.addClass("hover").removeClass("leave"),
                that.name.hide(),
                firstTriger ? (firstTriger = !1,
                void that.elem.fadeIn(600)) : void (t = setTimeout(function() {
                    that.elem.fadeIn(600)
                }, 600))
            }),
            this.circle.bind("mouseleave", function() {
                clearTimeout(t),
                clearTimeout(trigerT),
                trigerT = setTimeout(function() {
                    firstTriger = !0
                }, 300),
                that.circleCover.removeClass("hover").addClass("leave"),
                that.name.show(),
                that.elem.fadeOut(300)
            })
        }
        ,
        this.init = function() {
            this.loadImg(),
            this.bind()
        }
    }
      , t = null
      , trigerT = null
      , firstTriger = !0
      , ib1 = new indexImg($("div.bg1"),$(".cc1"))
      , ib2 = new indexImg($("div.bg2"),$(".cc2"))
      , ib3 = new indexImg($("div.bg3"),$(".cc3"))
      , ib4 = new indexImg($("div.bg4"),$(".cc4"))
      , ib5 = new indexImg($("div.bg5"),$(".cc5"))
      , circleImg = function(elem, nextLoadImg) {
        this.elem = elem,
        this.src = elem.attr("data-src"),
        this.nextLoadImg = nextLoadImg,
        this.loadImg = function() {
            var that = this
              , img = new Image;
            img.onload = function() {
                that.elem.css("background-image", "url(" + that.src + ")"),
                img.onload = null ,
                that.nextLoadImg.init(),
                that.elem.fadeIn(500)
            }
            ,
            img.src = this.src
        }
        ,
        this.init = function() {
            this.loadImg()
        }
    }
      , circle1 = new circleImg($(".item1"),ib1)
      , circle2 = new circleImg($(".item2"),ib2)
      , circle3 = new circleImg($(".item3"),ib3)
      , circle4 = new circleImg($(".item4"),ib4)
      , circle5 = new circleImg($(".item5"),ib5)
      , indexDown = {
        downBtn: $("#slide_down"),
        downCtx: $(".index_down").eq(0),
        logo: $(".w_logo").eq(0),
        circle: $("#circle_group"),
        arrow: $(".arrow").eq(0),
        flag: !1,
        init: function() {
            var that = this;
            this.downBtn.bind("click", function() {
                void 0 != document.body.style.transform ? that.flag ? (that.downCtx.removeClass("up"),
                that.downCtx.addClass("down"),
                that.logo.fadeIn(200),
                that.circle.fadeIn(200),
                that.arrow.fadeIn(200),
                $(window).scrollTop(0)) : (that.downCtx.addClass("up"),
                that.downCtx.hasClass("down") && that.downCtx.removeClass("down"),
                that.logo.fadeOut(200),
                that.circle.fadeOut(200)) : $(window).scrollTop(that.flag ? 0 : $("body").height() - 100),
                that.flag = !that.flag
            })
        }
    };
    indexDown.init(),
    $("body").scrollTop(0),
    addLoadEvent(circleGroup.resize()),
    addLoadEvent(function() {
        circle1.init()
    }),
    addLoadEvent(function() {
        circle2.init()
    }),
    addLoadEvent(function() {
        circle3.init()
    }),
    addLoadEvent(function() {
        circle4.init()
    }),
    addLoadEvent(function() {
        circle5.init()
    })
});
