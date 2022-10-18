
vcui.define('common/footer', ['jquery', 'vcui', 'ui/dropdown' ], function ($, core) {
    "use strict";

    var Footer = core.ui('Footer', {
        bindjQuery: true,
        defaults: {
        },

        initialize: function initialize(el, options) {

            if (!!lgkorUI.CONTEXT_AREA == false){
                lgkorUI.CONTEXT_AREA = $(document);
            }

            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };


            self.$mobileLinks = null;
            // self.$pcLinkes = self.$el.find('.cont-area .link-wrap');
            self.$pcLinkes = self.$el.find('.cont-area .pc-dropdown-wrap');

            self.$el.find('.menu-opener').on('click', function(e){
                self.$pcLinkes.toggleClass('open');

                var openerName = self.$pcLinkes.hasClass('open') ? "메뉴 접기" : "메뉴 전체보기";
                $(this).find('span').text(openerName);
            });
            
            $(window).on('resizeend', function(e){
                self._resize();
            });
            self._resize();
            //$(window).trigger('addResizeCallback', self._resize.bind(self));

            if(!vcui.detect.isMobileDevice){
                self.$el.on('click', 'a', function(e){
                    var exist = $(this).attr('href').indexOf("tel");
                    if(exist > -1){
                        e.preventDefault();
                    }
                });
            }
        },

        _addMobileLinks: function(){
            var self = this;

            if(self.$mobileLinks == null){
                var toggleList = [];
                var itemList = {};
                self.$el.find('.link-wrap .link-section div.dep1').each(function(idx, item){
                    if(!$(item).hasClass('hidden')){
                        toggleList.push($(item).clone());
                        var id = $(item).attr("id");
                        itemList[id] = [];
                    }
                });

                self.$el.find('.link-wrap .link-section .dep2-wrap').each(function(idx, item){
                    var id = $(item).data('groupId');
                    $(item).find('> li').each(function(cdx, child){
                        if (itemList[id] instanceof Array) {
                            itemList[id].push($(child).clone());
                        }
                    });
                });


                var elements = "";
                elements += '<ul class="link-wrap ui_footer_accordion">';

                for(var i=0;i<toggleList.length;i++){
                    elements += '   <li class="link-section">';
                    elements += '       <ul role="tree" class="dep2-wrap ui_accord_content" aria-labelledby="depth1-' + (i+1) + '-1">';
                    elements += '       </ul>';
                    elements += '   </li>';
                }

                elements += '</ul>';

                
                lgkorUI.CONTEXT_AREA.find('.cont-area').prepend(elements);
                
                lgkorUI.CONTEXT_AREA.find('.link-wrap.ui_footer_accordion > li').each(function(idx, item){
                    $(toggleList[idx]).addClass('ui_accord_toggle');
                    $(item).prepend($(toggleList[idx]));
                    
                    var id = $(toggleList[idx]).attr("id");

                    var itemListId = itemList[id] ? itemList[id] : {}; 
                    var itemlistleng = $(itemListId[0]).find('ul').length;
                    if(itemlistleng) $(item).find('> ul').addClass('ui_footer_accordion');

                    for(var cdx in itemList[id]){
                        if(itemlistleng){
                            var twoDep = $(itemListId[cdx]).find('> ul').length;
                            if(twoDep > 0){
                                $(itemListId[cdx]).find('> .dep2').addClass('ui_accord_toggle');
                                $(itemListId[cdx]).find('> ul').addClass('ui_accord_content');
                            }                            
                        }

                        $(item).find('> ul').append($(itemListId[cdx]));
                    }

                    if(!itemListId.length){
                        $(item).find('> ul').remove();
                        $(toggleList[idx]).removeClass('ui_accord_toggle');
                    }
                });

                self.$mobileLinks = self.$el.find('.link-wrap.ui_footer_accordion');

                lgkorUI.CONTEXT_AREA.find('.ui_footer_accordion').vcAccordion({
                    singleOpen: true,
                    itemSelector: "> li",
                    toggleSelector: "> .ui_accord_toggle"
                });

                lgkorUI.CONTEXT_AREA.find('.ui_footer_accordion .ui_accord_toggle').each(function(idx, item){
                    $(item).find('> a').on('click', function(e){
                        e.preventDefault();
                        // if(!$(e.currentTarget).closest('.btn_open').length){
                        //     var href = $(e.currentTarget).attr('href');
                        //     location.href =href;
                        // }
                    })
                });
            }
        },

        _resize: function(){
            var self = this,
                winwidth;

            winwidth = $(window).outerWidth(true);
            if(winwidth > 767){
                if(self.$mobileLinks != null){
                    lgkorUI.CONTEXT_AREA.find('.ui_footer_accordion').vcAccordion('collapseAll');
                    self.$mobileLinks.hide();
                }

                self.$pcLinkes.show();
            } else{
                self.$pcLinkes.hide();

                self._addMobileLinks();
                self.$mobileLinks.show();
            }
        }
    });

    return Footer;
});

vcui.define('common/header', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var noneMemPopTemplate = 
        '<article id="popup-beforeNoneMemOrder" class="popup-wrap small">'+
            '<header class="pop-header">'+
                '<h1 class="tit"><span>주문/배송 조회</span></h1>'+
            '</header>'+
            '<section class="pop-conts common-pop non-members">'+
                '<div class="non-members-login">'+
                    '<p class="hello-msg">주문/배송 조회를 선택하셨습니다.</p>'+
                    '<p class="hello-desc">회원 주문조회를 하시려면 <em>[회원 로그인]</em>을 선택해주시고, 비회원 주문조회를 하시려면 <em>[비회원 주문조회]</em>를 선택해주세요.</p>'+
                '</div>'+
            '</section>'+
            '<footer class="pop-footer center">'+
                '<div class="btn-group">'+
                    '<button type="button" class="btn gray" onclick="location.href=' + "'{{orderurl}}'" + '"><span>비회원 주문조회</span></button>'+
                    '<button type="button" class="btn pink" onclick="location.href=' + "'{{loginurl}}'" + '"><span>회원 로그인</span></button>'+
                '</div>'+
            '</footer>'+
            '<button type="button" class="btn-close ui_modal_close"><span class="blind">닫기</span></button>'+
        '</article>';

    var Header = core.ui('Header', {
        bindjQuery: true,
        defaults: {
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self.displayMode = "";

            self.isLogin = null;

            self._getLoginInfo();

            lgkorUI.requestCartCount(self.$el.attr('data-cart-url'));
            

            vcui.require(['ui/carousel', 'ui/smoothScroll', 'libs/jquery.transit.min'], function () {            
                self._setting();
                self._bindEvents();
                self._resize();
                self._arrowState();

                $('.marketing-link .ui_carousel_slider').vcCarousel({
                    infinite: false,
                    variableWidth: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    lastFix : true
                });
            });

            var gotourl = self.$el.data('gotoUrl');
            var cancelurl = self.$el.data('cancelUrl');
            self.$el.find('.before-login a').each(function(idx, item){
                var href = $(item).attr('href');
                var exist = href.indexOf(cancelurl);
                if(exist > -1){
                    $(item).on('click', function(e){
                        e.preventDefault();

                        var popup = $('#popup-beforeNoneMemOrder');
                        if(!popup.length){
                            var poptemplate = vcui.template(noneMemPopTemplate, {orderurl: cancelurl, loginurl:gotourl});
                            $('body').append(poptemplate);
                        }                        
                        $('#popup-beforeNoneMemOrder').vcModal({opener:$(this)});
                    });
                }
            });
        },

        _getLoginInfo: function(){
            var self = this;

            var loginInfoUrl = self.$el.attr('data-login-info');
            lgkorUI.requestAjaxDataPost(loginInfoUrl, {}, function(result){
                self.isLogin = result.data.isLogin;
                self.$el.find('.login-info').css('display', 'none');

                if(self.isLogin){
                    self.$el.find('.login-info.after-login').css('display', 'block');
                    if(result.data.name) {
                        self.$el.find('.login-info.after-login > a:not(".btn-logout")').html('<span>' + result.data.name + '</span>님 안녕하세요');
                    }

                    if(self.displayMode){
                        if(self.displayMode == "pc") self.$el.find('.mypage.after-login').css('display', 'inline-block');
                        else{
                            self.$el.find('.btm-before-login').hide();
                            self.$el.find('.btm-after-login').show();
                        }
                    }
                } else{
                    self.$el.find('.login-info.before-login').css('display', 'block');

                    if(self.displayMode){
                        if(self.displayMode == "pc") self.$el.find('.mypage.before-login').css('display', 'inline-block');
                        else{
                            self.$el.find('.btm-before-login').show();
                            self.$el.find('.btm-after-login').hide();
                        }
                    }
                }
            }, false, true);
        },

        _setting: function(){
            var self = this;

            self.outTimer = null;

            self.$mypage = self.$el.find('.header-top .shortcut .mypage');

            self.$pcNaviWrapper = self.$el.find(".nav-wrap .nav");
            self.$pcNavItems = self.$el.find('.nav-wrap .nav > li');

            self.$dimmed = self.$el.find('.header-wrap .dimmed');
            self.$dimmed.hide();

            self.$mobileNaviWrapper = $(self.$pcNaviWrapper.clone()).width('100%');
            self.$mobileNaviItems = self.$mobileNaviWrapper.find('> li');
            self.$el.find(".nav-wrap").append(self.$mobileNaviWrapper);
            
            self.$hamburger = self.$el.find('.mobile-nav-button');
            self.$headerBottom = self.$el.find('.header-bottom');            

            self.$leftArrow = self.$el.find('.nav-wrap .nav-arrow-wrap .prev');
            self.$rightArrow = self.$el.find('.nav-wrap .nav-arrow-wrap .next');
        },

        _bindEvents: function(){
            console.log('header bind event');
            var self = this;

            //장바구니, 마이페이지홈 클릭시 로딩바 노출
            var $headerUtility = self.$el.find('div.utility');
            $headerUtility.find('li.cart a, li.mypage.after-login a').on('click', function (e) {
                e.preventDefault();
                var url = $(this).attr('href');
                if(url) {
                    lgkorUI.showLoading();
                    setTimeout(function(){
                        location.href = url;
                    },500);
                }
            });

            //
            self.$mypage.on('mouseover', function(e){
                e.preventDefault();

                self._mypageOver();
            }).on('mouseout', function(e){
                e.preventDefault();

                self._mypageOut();
            });

            self.$hamburger.on('click', function(e){
                e.preventDefault();

                self._menuToggle();
                var active = self.$hamburger.hasClass('active');

                if(active){
                    lgkorUI.addHistoryBack(self.cid, function(){                    
                        self._menuToggle(true);
                    });
                } else{
                    lgkorUI.removeHistoryBack(self.cid);
                }
                

            });

            $(window).on('resizeend', function(){
                self._resize();
            });

           
            $('.mobile-category-container .category').vcSmoothScroll();

            $('.mobile-nav-wrap.is-depth > a.nav-item').attr("aria-expanded", true);
            $('.mobile-nav-wrap.is-depth > a.nav-item').append('<span class="blind">접힘</span>');
            $('.mobile-nav-wrap.is-depth > a.nav-item').on('click', function(e){
                e.preventDefault();

                $(this).toggleClass('on')
                $(this).parent().find('.nav-category-container').toggle();

                if($(this).hasClass('on')){
                    $(this).find('.blind').text("펼침");
                } else{
                    $(this).find('.blind').text("접힘");
                }
            });
            
            self._pcSetting();
            self._mobileSetting();
        },

        _focusFn:function(e){
            var self = this;
            if (self.$el[0] !== e.target && !$.contains(self.$el[0], e.target)) { 
                self._setOut();                    
                e.stopPropagation();
                $(document).off('focusin.header');
            }
        },

        _resize: function(){
            var self = this;
            var winwidth = $(window).width();
            if(winwidth > 767){
                if(self.displayMode != "pc"){
                    self._hamburgerDisabled();
                    
                    self.$pcNaviWrapper.css('display', 'inline-block');

                    $('.ui_gnb_accordion').vcAccordion("collapseAll");
                    self.$mobileNaviWrapper.hide();

                    self.displayMode = "pc";
                }

                if(self.isLogin != null){
                    if(self.isLogin){
                        self.$el.find('.mypage.after-login').css('display', 'inline-block');
                    } else{
                        self.$el.find('.mypage.before-login').css('display', 'inline-block');
                    }
                }


                self.$el.find('.btm-before-login').hide();
                self.$el.find('.btm-after-login').hide();

                self._arrowState();
            } else{
                if(self.displayMode != "m"){                    
                    self.$pcNaviWrapper.css('display', 'none');
                    self.$mobileNaviWrapper.show();
                    self.displayMode = "m";

                    setTimeout(function(){
                        $('.marketing-link .ui_carousel_slider').vcCarousel('update'); 
                    },100);
                }
                self.$leftArrow.hide();
                self.$rightArrow.hide();

                self.$el.find('.mypage').css('display', 'none');

                if(self.isLogin != null){
                    if(self.isLogin){
                        self.$el.find('.btm-before-login').hide();
                        self.$el.find('.btm-after-login').show();
                    } else{
                        self.$el.find('.btm-before-login').show();
                        self.$el.find('.btm-after-login').hide();
                    }
                }
            }
        },

        _arrowState: function(){
            var self = this;

            var navwrapwidth = self.$el.find('.nav-wrap').width();
            var brandwidth = self.$el.find('.nav-wrap .nav-brand-gate').outerWidth(true);
            var navwidth = self.$pcNaviWrapper.outerWidth(true);

            if(navwrapwidth < brandwidth + navwidth){
                self.$leftArrow.show();
                self.$rightArrow.show();
            } else{
                self.$leftArrow.hide();
                self.$rightArrow.hide();
            }
        },

        _setNavPosition: function(course){
            var self = this;

            var navwrapwidth = self.$el.find('.nav-wrap').width();
            var brandwidth = self.$el.find('.nav-wrap .nav-brand-gate').outerWidth(true);
            var navwidth = self.$pcNaviWrapper.outerWidth(true);

            var dist = navwrapwidth - (brandwidth + navwidth + 70);
            var navx = dist * -course;
            if(navx > 0) navx = 0;
            
            $('.nav-inner').stop().animate({'margin-left': navx}, 220);
        },

        _setNavReturnPosition: function(){
            var self = this;

            var navwrapwidth = self.$el.find('.nav-wrap').width();
            var brandwidth = self.$el.find('.nav-wrap .nav-brand-gate').outerWidth(true);
            var navwidth = self.$pcNaviWrapper.data('initWidth');
            var marginleft = parseInt($('.nav-inner').css('margin-left'));

            if(navwrapwidth < brandwidth + navwidth){
                var dist = marginleft + brandwidth + navwidth + 70;
                if(dist < $(window).width() - 54){
                    var navx = $(window).width() - 40 - (brandwidth + navwidth + 70);
                    $('.nav-inner').stop().animate({'margin-left': navx}, 150);
                }
                var dist = navwrapwidth - (brandwidth + navwidth + 70);
            } else{
                $('.nav-inner').stop().animate({'margin-left': 0}, 150);
            }
        },

        _pcSetting: function(){
            var self = this;

            self.$pcNavItems.each(function(idx, item){              
                $(item).find('> .nav-category-container').css('display', 'inline-block');
                var categorywidth = $(item).find('> .nav-category-container').outerWidth(true);
                $(item).find('> .nav-category-container').css({
                    overflow: 'hidden',
                    width: 0,
                    display: 'none'
                });
                $(item).find('> .nav-category-container > ul').css({
                    width: '100%'
                });

                var categoryLayer = $(item).find('> .nav-category-layer');
                if(categoryLayer.length){
                    self._addCarousel(categoryLayer.find('.ui_carousel_slider'));
                    //categoryLayer.find('.ui_carousel_list').css('overflow', 'hidden');
                }

                $(item).data('subwidth', categorywidth);
                $(item).on('mouseover focus', '> a', function(e){
                    e.preventDefault();
                    self._setOver(idx, -1);
                });

                $(item).find('> .nav-category-container > ul >li').each(function(cdx, child){
                    $(child).on('mouseover focus', '> a, focus', function(e){
                        e.preventDefault();
                        self._setOver(idx, cdx);
                    });

                    self._addCarousel($(child).find('.ui_carousel_slider'));
                });
            });

            self.$pcNaviWrapper.data('initWidth', self.$pcNaviWrapper.outerWidth(true));

            $('.nav-wrap .nav-inner').on('mouseover', function(e){
                self._removeOutTimeout();
            });

            $('header').on('mouseleave', function(){
                self._setOut();
            })

            $('.nav-category-inner').on('mouseleave',function(){
                self._setOut();
            })

            self.$leftArrow.on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                self._setNavPosition(1);
            });
            self.$rightArrow.on('click', function(e){
                e.preventDefault();               
                e.stopPropagation();
                self._setNavPosition(-1);
            });

            self.$el.on('mouseover', '.slide-controls', function(e){
                e.preventDefault();
            })
        },

        _addCarousel: function(item){
            item.vcCarousel({
                infinite: true,
                swipeToSlide: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay:true,
                autoplaySpeed: 3000,
                playSelector: '.btn-play.play'
            });
        },

        _setActiveAbled: function(item, abled){
            item.removeClass('active');
            item.find('> a').removeClass('active');

            if(abled){
                item.addClass('active');
                item.find('> a').addClass('active');
            }
        },

        _showSubContents: function(item){
            var self = this;

            var categoryLayer = $(item).find('> .nav-category-layer');
            if(categoryLayer.length){
                categoryLayer.find('.ui_carousel_slider').vcCarousel('update');
            }
        },

        _setOver: function(one, two){
            var self = this;

            self._removeOutTimeout();

            self.$pcNavItems.each(function(idx, item){
                var catecontainer = $(item).find('> .nav-category-container');

                if(idx == one){
                    self._setActiveAbled($(item), true);
                    self._showSubContents(item);
                    
                    if(catecontainer.length){
                        var subwidth = $(item).data('subwidth');           
                        catecontainer.stop().css('display', 'inline-block').animate({width:subwidth}, 200, function(){
                            self._arrowState();
                        });

                        catecontainer.find('> ul >li').each(function(cdx, child){
                            if(cdx == two){
                                self._setActiveAbled($(child), true);
                                self._showSubContents(child);
                            } else{
                                self._setActiveAbled($(child), false);
                            }
                        });
                    }
                } else{
                    if(catecontainer.length){
                        catecontainer.find('> ul >li').each(function(cdx, child){
                            self._setActiveAbled($(child), false);
                        });
                    } else{
                        self._setActiveAbled($(item), false);
                    }
                }
            });

            if(one > 0){
                self.$dimmed.show();
            } else{
                if(two < 0) self.$dimmed.hide();
                else self.$dimmed.show();
            }

            $(document).off('focusin.header').on('focusin.header', self._focusFn.bind(self));
        },

        _removeOutTimeout: function(){
            var self = this;
            
            clearTimeout(self.outTimer);
            self.outTimer = null;
        },

        _setOut: function(item){
            var self = this;

            self._removeOutTimeout();
       
            //self.outTimer = setTimeout(function(){
            self._setOutAction(item);
            //}, 180);
        },

        _setOutAction: function(item){
            var self = this;

            self.$pcNavItems.each(function(idx, item){
                var catecontainer = $(item).find('> .nav-category-container');
                if(catecontainer.length){
                    catecontainer.stop().animate({width:0}, 300, function(){
                        self._setActiveAbled($(item), false);
                        catecontainer.css('display', 'none');

                        self._arrowState();
                    });
                } else{
                    self._setActiveAbled($(item), false);
                }
            });


            self._setNavReturnPosition();
            
            self.$dimmed.hide();
        },

        _mobileSetting: function(){
            var self = this;

            self.$mobileNaviWrapper.addClass("ui_gnb_accordion");
            self.$mobileNaviWrapper.find('img').remove();
            self.$mobileNaviItems.find('> a, > span').addClass("ui_accord_toggle");
            self.$mobileNaviItems.find('> .nav-category-layer, > .nav-category-container').addClass("ui_accord_content");
            self.$mobileNaviItems.find('> .nav-category-container > ul').addClass('ui_gnb_accordion');
            self.$mobileNaviItems.find('> .nav-category-container > ul > li > a').addClass('ui_accord_toggle');
            self.$mobileNaviItems.find('> .nav-category-container > ul > li > .nav-category-layer').addClass('ui_accord_content');

            var gid = 0;
            self.$mobileNaviItems.find('> .nav-category-layer > .nav-category-inner').each(function(idx, item){
                $(item).find('.column > .category').addClass("ui_gnb_accordion");
                $(item).find('.column > .category').attr("data-accord-group", "group_"+gid);

                $(item).find('.column > .category > li').each(function(cdx, child){
                    var toggle = $(child).find('> a, > span');
                    var subcategory = $(child).find('> .sub-category');
                    var categorycontent = $(child).find('> .category-content');
                    if(!subcategory.length && !categorycontent.length){
                        toggle.addClass("none-toggle");
                    } else{
                        toggle.addClass("ui_accord_toggle");
                        subcategory.addClass("ui_accord_content");
                        categorycontent.addClass("ui_accord_content");
                    }
                });

                gid++;
            });

            $('.ui_gnb_accordion').vcAccordion({
                singleOpen: true,
                parentClass: '.ui_gnb_accordion',
                itemSelector: "> li",
                toggleSelector: "> .ui_accord_toggle"
            }).on('accordionbeforeexpand', function(e, data){
                $(data.oldContent).find('.ui_gnb_accordion').vcAccordion("collapseAll");
            }).on('accordioncollapse', function(e, data){
                $(data.content).find('.ui_gnb_accordion').vcAccordion("collapseAll");
            });

            self._setStoryUpdateCheck();
        },

        _mypageOver: function(){
            var self = this;

            var mypageLayer = self.$mypage.find('.mypage-layer');
            mypageLayer.show();

            if(!self.$mypage.find('> a').hasClass('on')) self.$mypage.find('> a').addClass("on");
        },

        _mypageOut: function(){
            var self = this;

            var mypageLayer = self.$mypage.find('.mypage-layer');
            mypageLayer.hide();

            if(self.$mypage.find('> a').hasClass('on')) self.$mypage.find('> a').removeClass("on");
        },

        _menuToggle: function(forceActive){
            var self = this,
            active, replaceText;

            replaceText = self.$hamburger.find('.blind');
            active = forceActive==undefined? self.$hamburger.hasClass('active') : forceActive;

            if(active){

                self.$hamburger.removeClass('active');                                  
                if($('html').hasClass('scroll-fixed')) $('html').removeClass('scroll-fixed');

                setTimeout(function(){
                    replaceText.text("메뉴 열기");
                    $('.ui_gnb_accordion').vcAccordion("collapseAll");
                },600);

                self.$dimmed.hide();

            } else{
                self.$hamburger.addClass('active');
                if(!$('html').hasClass('scroll-fixed')) $('html').addClass('scroll-fixed');
                replaceText.text("메뉴 닫기");
                
                self.$dimmed.show();   
            }

        },

        _hamburgerDisabled: function(){
            var self = this;

            var replaceText = self.$hamburger.find('.blind');
            replaceText.text("메뉴 열기");

            self.$hamburger.removeClass('active');

            if($('html').hasClass('scroll-fixed')) $('html').removeClass('scroll-fixed');
        },
        _setStoryUpdateCheck: function(){
            var $mobileNav = $('.mobile-nav-wrap');
            var $list = $mobileNav.find('li');
            var $storyList = $list.eq(2);

            var ajaxUrl = $mobileNav.data('storyUrl');

            if(ajaxUrl) {
                lgkorUI.requestAjaxData(ajaxUrl,{},function(resultData){
                    var data = resultData.data;
                    if( data > 0 && resultData.status=== "success") $storyList.addClass('icon-update')
                })
            }
        },
    });

    return Header;
});
/*!
 * @module vcui.helper.Gesture
 * @license MIT License
 * @description 제스처 헬퍼
 * @copyright VinylC UID Group
 */
vcui.define('helper/gesture', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var Gesture = core.helper('Gesture', core.ui.View.extend({
        name: 'Gesture',
        defaults: {
            container: document,
            threshold: 50,
            direction: 'horizontal',
            gesture: null,
            gestureStart: null,
            gestureMove: null,
            gestureEnd: null
        },
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            var direction = self.options.direction;

            self.isHoriz = direction === 'horizontal' || direction === 'both';
            self.isVerti = direction === 'vertical' || direction === 'both';
            self._bindGestureEvents();
        },

        _getEventPoint: function _getEventPoint(ev, type) {
            var e = ev.originalEvent || ev;
            if (type === 'end' || ev.type === 'touchend') e = e.changedTouches && e.changedTouches[0] || e;else e = e.touches && e.touches[0] || e;
            return { x: e.pageX || e.clientX, y: e.pageY || e.clientY };
        },

        _getAngle: function _getAngle(startPoint, endPoint) {
            var x = startPoint.x - endPoint.x;
            var y = endPoint.y - startPoint.y;
            var r = Math.atan2(y, x); //radians
            var angle = Math.round(r * 180 / Math.PI); //degrees
            if (angle < 0) angle = 360 - Math.abs(angle);
            return angle;
        },

        _getDirection: function _getDirection(startPoint, endPoint, direction) {
            var angle,
                isHoriz = !direction || direction === 'horizontal' || direction === 'both',
                isVert = !direction || direction === 'vertical' || direction === 'both';

            if (isHoriz != isVert) {
                if (isHoriz) {
                    if (startPoint.x > endPoint.x) {
                        return 'left';
                    } else if (startPoint.x == endPoint.x) {
                        return '';
                    } else {
                        return 'right';
                    }
                } else {
                    if (startPoint.y > endPoint.y) {
                        return 'up';
                    } else if (startPoint.y == endPoint.y) {
                        return '';
                    } else {
                        return 'down';
                    }
                }
            }

            angle = this._getAngle(startPoint, endPoint);
            if (angle <= 45 && angle >= 0) {
                return 'left';
            } else if (angle <= 360 && angle >= 315) {
                return 'left';
            } else if (angle >= 135 && angle <= 225) {
                return 'right';
            } else if (angle > 45 && angle < 135) {
                return 'down';
            } else {
                return 'up';
            }
        },

        _getDiff: function _getDiff(a, b) {
            return { x: a.x - b.x, y: a.y - b.y };
        },

        _bindGestureEvents: function _bindGestureEvents() {
            var self = this,
                opt = self.options,
                touchStart,
                downPos,
                isSwipe = false,
                isScroll = false,
                eventNS = '.gesture' + self.cid;

            //self.$el[0].onselectstart = function (){ return false; };
            //self.$el.attr('unselectable', 'on');

            self.$el.on('mousedown' + eventNS + ', touchstart' + eventNS + '', function (downEvent) {
                if (downEvent.type === 'mousedown') {
                    downEvent.preventDefault();
                }
                downPos = touchStart = self._getEventPoint(downEvent);
                isSwipe = isScroll = false;

                $(opt.container).on('mousemove' + eventNS + ' touchmove' + eventNS, function (moveEvent) {
                    var touch = self._getEventPoint(moveEvent),
                        diff,
                        slope,
                        swipeY,
                        swipeX;

                    if (!touchStart || isScroll) return;
                    diff = self._getDiff(touch, touchStart);

                    if (!isSwipe) {
                        swipeX = Math.abs(diff.y) / (Math.abs(diff.x) || 1);
                        swipeY = Math.abs(diff.x) / (Math.abs(diff.y) || 1);
                        if (swipeX < 1 && self.isHoriz || swipeY < 1 && self.isVerti) {
                            touch.event = moveEvent;
                            if (self._gestureCallback('start', touch) === false) {
                                return;
                            }
                            var ev = $.Event('gesturestart');
                            self.triggerHandler(ev, touch);
                            if (ev.isDefaultPrevented()) {
                                return;
                            }
                            isSwipe = true;
                            self.$el.on('mousemove' + eventNS + ' touchmove' + eventNS + '', function (e) {
                                e.preventDefault();
                            });
                        } else {
                            if (self.isHoriz && swipeX > 1 || self.isVerti && swipeY > 1) {
                                isScroll = true;
                            }
                        }
                    }

                    if (isSwipe) {
                        moveEvent.stopPropagation();
                        moveEvent.preventDefault();

                        touch.diff = diff;
                        touch.direction = self._getDirection(touchStart, touch, opt.direction);
                        touch.event = moveEvent;
                        if (self._gestureCallback('move', touch) === false) {
                            return;
                        }
                        if (self.triggerHandler('gesturemove', touch) === false) {
                            return;
                        }
                    }
                }).on('mouseup' + eventNS + ' mousecancel' + eventNS + ' touchend' + eventNS + ' touchcancel' + eventNS, function (upEvent) {
                    if (isSwipe && touchStart) {
                        var touch = self._getEventPoint(upEvent, 'end');
                        touch.diff = self._getDiff(touch, touchStart);

                        touch.direction = self._getDirection(touchStart, touch, opt.direction);
                        touch.event = upEvent;
                        if (Math.abs(touch.diff.x) > opt.threshold || Math.abs(touch.diff.y) > opt.threshold) {
                            self._gestureCallback('end', touch);
                            self.triggerHandler('gestureend', touch);
                        } else {
                            self._gestureCallback('cancel', touch);
                            self.triggerHandler('gesturecancel', touch);
                        }

                        self.$el.off('mousemove' + eventNS + ' touchmove' + eventNS);

                        switch (touch.direction) {
                            case 'left':
                            case 'right':
                                if (Math.abs(touch.diff.x) > opt.threshold && self.isHoriz) {
                                    self._gestureCallback(touch.direction, touch);
                                    self.triggerHandler('gesture' + touch.direction, touch);
                                }
                                break;
                            case 'up':
                            case 'down':
                                if (Math.abs(touch.diff.y) > opt.threshold && self.isVerti) {
                                    self._gestureCallback(touch.direction, touch);
                                    self.triggerHandler('gesture' + touch.direction, touch);
                                }
                                break;
                        }
                    }

                    touchStart = null;
                    isScroll = false;
                    $(opt.container).off(eventNS);
                });
            }).on('click' + eventNS, 'a, button', function (e) {
                if (!downPos) {
                    return;
                }
                var pos = self._getEventPoint(e);
                if (downPos.x != pos.x || downPos.y != pos.y) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        },

        _gestureCallback: function _gestureCallback(type, data) {
            var self = this,
                ret;
            self.options['gesture' + type] && (ret = self.options['gesture' + type].call(self, data));
            self.options['gesture'] && (ret = self.options['gesture'].call(self, type, data));
            return ret;
        },

        destroy: function destroy() {
            var eventNS = '.gesture' + this.cid;
            this.$el.off(eventNS);
            $(this.options.container).off(eventNS);
            this.supr();
        }
    }));

    core.ui.bindjQuery(Gesture, 'Gesture');

    return Gesture;
});
/*!
 * @module vcui.helper.BreakpointDispatcher
 * @bechmark https://github.com/paulirish/matchMedia.js
 * @license MIT License
 * @description 반응형 분기점을 지날때마다 이벤트를 발생시켜주는 헬퍼
 * @copyright VinylC UID Group
 */


vcui.define('helper/breakpointDispatcher', ['jquery', 'vcui'], function($, core) {
    "use strict";

    window.matchMedia || (window.matchMedia = function() {
        "use strict";

        var styleMedia = (window.styleMedia || window.media);
        if (!styleMedia) {
            var style = document.createElement('style'),
                script = document.getElementsByTagName('script')[0],
                info = null;

            style.type = 'text/css';
            style.id = 'matchmediajs-test';

            if (!script) {
                document.head.appendChild(style);
            } else {
                script.parentNode.insertBefore(style, script);
            }

            info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

            styleMedia = {
                matchMedium: function(media) {
                    var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                    if (style.styleSheet) {
                        style.styleSheet.cssText = text;
                    } else {
                        style.textContent = text;
                    }

                    return info.width === '1px';
                }
            };
        }

        return function(media) {
            return {
                matches: styleMedia.matchMedium(media || 'all'),
                media: media || 'all'
            };
        };
    }());

    (function() {
        if (window.matchMedia && window.matchMedia('all').addListener) {
            return false;
        }

        var localMatchMedia = window.matchMedia,
            hasMediaQueries = localMatchMedia('only all').matches,
            isListening = false,
            timeoutID = 0, // setTimeout for debouncing 'handleChange'
            queries = [], // Contains each 'mql' and associated 'listeners' if 'addListener' is used
            handleChange = function(evt) {
                // Debounce
                clearTimeout(timeoutID);

                timeoutID = setTimeout(function() {
                    for (var i = 0, il = queries.length; i < il; i++) {
                        var mql = queries[i].mql,
                            listeners = queries[i].listeners || [],
                            matches = localMatchMedia(mql.media).matches;

                        if (matches !== mql.matches) {
                            mql.matches = matches;

                            for (var j = 0, jl = listeners.length; j < jl; j++) {
                                listeners[j].call(window, mql);
                            }
                        }
                    }
                }, 30);
            };

        window.matchMedia = function(media) {
            var mql = localMatchMedia(media),
                listeners = [],
                index = 0;

            mql.addListener = function(listener) {

                if (!hasMediaQueries) {
                    return;
                }

                if (!isListening) {
                    isListening = true;
                    window.addEventListener('resize', handleChange, true);
                }

                if (index === 0) {
                    index = queries.push({
                        mql: mql,
                        listeners: listeners
                    });
                }

                listeners.push(listener);
            };

            mql.removeListener = function(listener) {
                for (var i = 0, il = listeners.length; i < il; i++) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1);
                    }
                }
            };

            return mql;
        };
    }());

    /**
     * @class
     * @name vcui.helper.BreakpointDispatcher
     */
    var BreakpointDispatcher = core.helper.BreakpointDispatcher = /** @lends  vcui.helper.BreakpointDispatcher */ vcui.BaseClass.extend({
        $singleton: true,
        initialize: function(options) {
            var self = this;

            self.options = core.extend({
                matches: {}
            }, options);
        },
        /**
         *
         */
        start: function() {
            var self = this,
                data;

            core.each(self.options.matches, function(item, key) {
                var mq = window.matchMedia(key);

                mq.addListener(item);
                item(mq);
            });
        }
    });

    return BreakpointDispatcher;
});
/*!
 * @module vcui.helper.Sharer
 * @license MIT License
 * @description Sharer 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('helper/sharer', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var detect = {
        PC: 1,
        MOBILE: 2,
        APP: 4
    };

    var defaultOption = {
        appKey : 'ba072a14b79cfe820b96a13b10e9bb27',
        selector: '.ui-sharer',
        attr: 'data-service',
        metas: {
            url:{},
            title: {},
            description: {},
            image: {}
        },
        onBeforeShare: function (el, data) {
            if (data.service == 'copy_url') {
                // url 복사하기 인 경우
                var url = $(el).attr('data-url');
                vcui.dom.copyToClipboard((!url?location.href:url), {
                    onSuccess: function () {
                        alert('URL을 복사했습니다.');
                    }
                });

                // false를 반환하면 공유를 위한 팝업을 안띄운다.
                return false;
            }
        },
        onShrered: function () {
        }
    };

    
    var Sharer = /** @lends axl.module.Sharer */{
        support: detect,
        services: /** @lends axl.module.Sharer.services */{ //['facebook', 'twitter', 'kakaotalk'],
            'facebook': /** @lends axl.module.Sharer.services.facebook */{
                name: 'facebook',
                support: detect.PC | detect.MOBILE,
                size: [500, 300],
                url: 'https://www.facebook.com/sharer.php?',
                makeParam: function makeParam(data) {
                    data.url = core.uri.addParam(data.url, {
                        '_t': +new Date()
                    });
                    return {u: data.url, t: data.title || ''};
                }
            },
            'twitter': /** @lends axl.module.Sharer.services.twitter */{
                name: 'twitter',
                support: detect.PC | detect.MOBILE,
                size: [550, 300],
                url: 'https://twitter.com/intent/tweet?',
                makeParam: function makeParam(data) {
                    data.desc = data.desc || '';

                    var length = 140 - data.url.length - 6,
                        // ... 갯수
                        txt = data.title + ' - ' + data.desc;

                    txt = txt.length > length ? txt.substr(0, length) + '...' : txt;
                    return {text: txt + ' ' + data.url};
                }
            },            
            'pinterest': /** @lends axl.module.Sharer.services.pinterest */{
                name: 'pinterest',
                support: detect.PC | detect.MOBILE,
                size: [740, 740],
                url: 'https://www.pinterest.com/pin/create/button/?',
                makeParam: function makeParam(data) {
                    return {
                        url: data.url,
                        media: data.image,
                        description: data.desc
                    };
                }
            },
            'kakaotalk': /** @lends axl.module.Sharer.services.kakaotalk */{
                name: 'kakaotalk',
                support: detect.PC | detect.MOBILE,
                makeParam: function makeParam(data) {
                    return {     
                        objectType : 'feed',
                        content : {
                            title : data.title,
                            description: data.desc,
                            imageUrl : data.image,
                            link : {
                                mobileWebUrl : data.url,
                                webUrl : data.url
                            }
                        }
                    };
                }
            },
            'copy_url': {
                support: detect.PC | detect.MOBILE,
                run: function(data) {
                    /* 
                    core.dom.copyToClipboard(data.url, {
                        onSuccess: function () {
                            alert('Copied!');
                        }
                    });
                    */
                }
            }
        },
        addService: function (name, options) {
            this.services[name] = options;
        },

        /**
         * 전송
         * @param {string} type facebook|twitter|kakaotalk|pinterest
         * @param {Object} params
         * @param {string} params.url url 주소
         * @param {string} params.title 타이틀
         * @param {string} params.image 이미지
         * @param {string} params.desc 설명
         */
        share: function share(type, params) {
            var service = this.services[type];
            var sizeFeature = '';
            if (!service) {
                return;
            }

            if (service.support & (detect.PC | detect.MOBILE)) {
                if (core.isFunction(service.run)) {
                    service.run(params);
                } else {

                    if(type === 'kakaotalk'){
                        Kakao.Link.sendDefault(service.makeParam(params));
                    }else{
                        if (service.size) {
                            sizeFeature += ', height=' + service.size[1] + ', width=' + service.size[0];
                        }
                        window.open(service.url + core.json.toQueryString(service.makeParam(params)), type,'menubar=no' + sizeFeature);
                    }
                }
            } else if (service.support & detect.APP) {

            }
        },

        _getMetaInfo: function (type, service) {
            var metas = this.options.metas;
            var name = metas[type][service] || type;

            if (core.isFunction(name)) {
                return name(type, service);
            } else {
                //Attribute Ends With Selector [name$=”value”]

                var $meta = $('head meta').filter('[name$="' + name + '"], [property$="' + name + '"]');
                var content = '';
                $meta.each(function(idx, item){
                    if($(item).attr('content') !==""){
                        content = $(item).attr('content');
                        return;
                    }
                });

                return content;
            }

            return '';
            /*
            switch (type) {
                case 'title':
                case 'description':
                case 'image':
                    if (core.isFunction(name)) {
                        return name(type, service);
                    } else {
                        return $('head meta').filter('[name$="' + name + '"], ' +
                            '[property$="' + name + '"]').eq(0).attr('content') || '';
                    }
            }
            return '';
            */
        },

        /**
         * 공유하기 실행
         * @param {jQuery|Element|string} el 버튼
         * @param {string} service sns벤더명
         */
        _share: function _share(el, service) {
            var $el = $(el),
                url = $el.attr('data-url') || this._getMetaInfo('url', service) || location.href, //$el.attr('href') || 
                title = $el.attr('data-title') || this._getMetaInfo('title', service) || document.title,
                desc = $el.attr('data-desc') || this._getMetaInfo('description', service) || '',
                image = $el.attr('data-image') || this._getMetaInfo('image', service) || '',
                data;

            url = url.split('#')[0];

            this.share(service, data = {
                target: el,
                url: url,
                title: title,
                desc: desc,
                image: image
            });
            
            data.service = service;
            this.options.onShrered($el, data);
        },

        init: function init(options) {
            var self = this,
                services = core.object.keys(this.services);

            self.options = core.extend(true, defaultOption, options);

            if(Kakao && Kakao.isInitialized() === false) {
                try{
                     Kakao.init(self.options.appKey);
                } catch(e) { }
            }


            function hasClass($el) {
                var service;
                core.each(self.services, function (item, svc) {
                    if ($el.hasClass(svc)) {
                        service = svc;
                        return false;
                    }
                });
                return service;
            }


            $(document).on('click.sharer', self.options.selector, function (e) {

                e.preventDefault();

                var $el = $(this),
                    service = '';

                if (self.options.attr === 'class') {
                    service = hasClass($el);
                } else {
                    service = $el.attr(self.options.attr);
                }

                if (self.options.onBeforeShare($el, {service: service}) === false) {
                    return;
                }
                
                if (!service || !core.array.include(services, service)) {
                    alert('공유할 SNS타입을 지정해주세요.');
                    return;
                }

                self._share($el.get(0), service);
            });
        }
    };

    return Sharer;
});
/*!
 * @module vcui.ui.Accordion
 * @license MIT License
 * @description 아코디온 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('ui/accordion', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var ui = core.ui,
        name = 'accordion',
        eventBeforeCollapse = name + 'beforecollapse',
        eventCollapse = name + 'collapse',
        eventBeforeExpand = name + 'beforeexpand',
        eventExpand = name + 'expand';

    /**
     * @class
     * @description 아코디언 컴포넌트
     * @name vcui.ui.Accordion
     * @extends vcui.ui.View
     */
    var Accordion = ui('Accordion', /**@lends vcui.ui.Accordion# */{
        $statics: {
            ON_BEFORE_COLLAPSE: eventBeforeCollapse,
            ON_COLLAPSE: eventCollapse,
            ON_BEFORE_EXPAND: eventBeforeExpand,
            ON_EXPAND: eventExpand
        },
        bindjQuery: name,
        defaults: {
            singleOpen: false,
            useAnimate: true,
            duration: 200,
            autoScroll: false,
            scrollTopOffset: 0,
            activeClass: "active",
            selectedClass: 'on',
            itemClosest: 'li',
            itemSelector: '>ul>li',
            toggleSelector: ">.head>.ui_accord_toggle",
            contentSelector: ">.ui_accord_content"
        },

        /**
         * 생성자
         * @param el 모듈 요소
         * @param {object} [options] 옵션(기본값: defaults 속성 참조)
         * @param {boolean} [options.singleOpen = false] 단일열림 / 다중열림 여부
         * @param {number} [options.duration = 200] 펼쳐지거나 닫혀지거나 할 때 애니메이션 속도
         * @param {string} [options.activeClass = 'active'] 활성화됐을 때 추가할 css 클래스명
         * @param {string} [options.selectedClass = 'on'] 버튼이 토글될 때 추가할 css 클래스명
         * @param {string} [options.itemClosest = 'li']
         * @param {string} [options.itemSelector = '>ul>li']
         * @param {string} [options.toggleSelector = '>.head>.ui_accord_toggle'] 토글버튼
         * @param {string} [options.contentSelector = '>.ui_accord_content'] 컨텐츠
         */
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self._buildARIA();
            self._bindEvent();

            var openIndex = self.options.openIndex;
            openIndex = openIndex!==undefined? openIndex : -1;
            if (openIndex === 'all') {
                self.options.singleOpen = false;
                self.expandAll();                
            } else {
                self.collapseAll();
                var indexes = [].concat(openIndex);
                

                //collapaseAll() 떄문인지 열리지 않는 오류로 setTimeout 후 실행...
                setTimeout(function(){
                    if (self.options.singleOpen) {
                        self.expand(indexes[0], false);
                    } else {
                        core.each(indexes, function (index) {
                            self.expand(index, false);
                        });
                    }
                }, 10);
            }
            
        },

        _buildARIA: function _buildARA() {
            var self = this;
            var o = self.options;

            self._updateSelectors();

            self.$el.attr('role', 'presentation');            


            self.$items.each(function () {
                var $btn = $(this).find(o.toggleSelector);               
                var $content = $(this).find(o.contentSelector);
                var id = core.string.random(10);

                $btn.attr({
                    'id': 'accrod_toggle_' + id,
                    'aria-controls': 'accord_content_' + id,
                    'aria-expanded': $btn.attr('aria-expanded') === 'true'
                }).parent().attr('role', 'heading');

                $content.attr({
                    'id': 'accord_content_' + id,
                    'role': 'region',
                    'aria-labelledby': 'accord_toggle_' + id
                });
            });
        },

        update: function update() {
            this._buildARIA();
        },

        _updateSelectors: function _updateSelectors() {
            var self = this;
            var o = self.options;
            self.$items = self.$(o.itemSelector);
        },
        

        /**
         * 해제 메소드
         */
        // destroy: function () {
        //     var self = this;
        //     self.off("click", o.itemSelector + o.toggleSelector);
        //     self.off(eventBeforeExpand);

        // },

        /**
         * 이벤트 바인딩
         * @private
         */
        _bindEvent: function _bindEvent() {
            var self = this,
                o = self.options;
            // 토글버튼 클릭됐을 때

            self.on("click", o.itemSelector + o.toggleSelector, function (e) {
                e.preventDefault();

                //self.updateSelectors();
                var $item = $(this).closest(o.itemClosest),
                    $items = self._findItems(),
                    index = $items.index($item);

                if ($item.hasClass(o.selectedClass)) {
                    self.collapse(index, self.options.useAnimate, function () {
                        $item.addClass(o.activeClass);
                    });
                } else {
                    self.expand(index, self.options.useAnimate);
                }
            });

            if (o.accordGroup && o.singleOpen) {
                // 아코디언 요소가 따로 떨어져 있는 것을 data-accord-group속성을 묶고,
                // 하나가 열리면 그룹으로 묶여진 다른 아코디언에 열려진게 있으면 닫아준다.
                self.on(eventBeforeExpand, function (e) {
                    $('.ui_accordion[data-accord-group=' + o.accordGroup + '], ' + '.ui_accordion_list[data-accord-group=' + o.accordGroup + ']').not(self.$el).vcAccordion('collapse').find(o.itemSelector).removeClass(o.selectedClass);
                });
            }
        },

        _findSelected: function _findSelected() {
            return this.$items.filter('.' + self.options.selectedClass);
        },

        // 재정의
        _findItems: function _findItems() {
            var self = this,
                o = self.options,
                $items;

            if (o.accordType === 'detailview') {
                $items = self.$el;
            } else {
                $items = o.itemSelector ? self.$(o.itemSelector) : self.$el;
            }
            return $items;
        },

        _postCollapse: function _postCollapse(data) {
            var self = this;
        },
        _postExpand: function _postExpand(data) {
            var self = this,
                o = self.options;

            self._autoScroll(data);
        },

        _autoScroll: function _autoScroll(data) {
            var self = this,
                o = self.options,
                $con,
                scrollTop,
                top,
                sto;

            if (o.autoScroll) {
                if (o.autoScroll === true) {
                    $con = $('html, body');
                    scrollTop = $(data.header).offset().top;
                } else {
                    top = $(data.header).position().top;
                    $con = $(o.autoScroll);
                    scrollTop = top + $(o.autoScroll).scrollTop();
                }
                if (typeof o.scrollTopOffset === 'function') {
                    sto = o.scrollTopOffset();
                } else {
                    sto = o.scrollTopOffset;
                }
                $con.animate({
                    scrollTop: scrollTop + sto
                }, 'fast');
            }
        },
        /**
         * @param {number} index 인댁스
         * @param {boolean} isAni 애니메이션 여부
         * @param {function} callback 콜백함수
         * @fires vcui.ui,Accordion#accordion:beforeCollapse
         * @fires vcui.ui,Accordion#accordion:collapse
         */
        collapse: function collapse(index, isAni, cb) {
            var self = this,
                opts = self.options,
                data = {},

            // 애니메이션 시간
            $items = self._findItems(),
                oldIndex = $items.filter('.' + opts.selectedClass).index();

            if (arguments.length === 0 || index === null) {
                // index가 안넘어보면 현재 활성화된 패널의 index를 갖고 온다.
                index = oldIndex;
            }


            if (index < 0) {
                return;
            }

            data.index = index;
            data.oldIndex = oldIndex;
            data.header = $items.eq(index);
            data.content = data.header.find(opts.contentSelector);

            /**
             * 닫히기 전에 발생하는 이벤트
             * @event vcui.ui.Accordion#accordionbeforecollapse
             * @type {object}
             * @property {number} index 접혀질 인덱스번호
             */
            var ev = $.Event(eventBeforeCollapse);
            self.$el.trigger(ev, data);
            if (ev.isDefaultPrevented()) {
                return;
            }

            if (typeof isAni === 'undefined') {
                isAni = self.options.useAnimate;
            }

            /**
             * 닫힌 후에 발생하는 이벤트
             * @event vcui.ui.Accordion#accordioncollapse
             * @type {object}
             * @property {number} index 닫힌 인덱스 번호
             */
            if (isAni !== false) {
                // 애니메이션 모드
                //if(this.isAnimate) { return; }
                data.header.removeClass(opts.selectedClass);
                data.content.slideUp(opts.duration, function () {
                    // 닫혀진 후에 이벤트 발생
                    self.trigger(eventCollapse, data);
                    self._updateButton(index, false);
                    self._postCollapse(data);
                    cb && cb();
                });
            } else {
                // 일반 모드
                data.header.removeClass(opts.selectedClass);
                data.content.hide();
                // 닫혀진 후에 이벤트 발생
                self.trigger(eventCollapse, data);
                self._updateButton(index, false);
                self._postCollapse(data);
                cb && cb();
            }
        },

        /**
         * 확장시키기
         * @param {number} index 인댁스
         * @param {boolean} isAni 애니메이션 여부
         * @param {function} callback 콜백함수
         * @fires vcui.ui,Accordion#accordion:beforeExpand
         * @fires vcui.ui,Accordion#accordion:expand
         */
        expand: function expand(index, isAni, callback) {
            var self = this,
                opts = self.options,
                $items,
                oldItem,
                oldIndex,
                newItem,
                data;

            if (arguments.length === 0) {
                return;
            }

            $items = self._findItems();
            newItem = $items.eq(index);
            

            oldItem = $items.filter('.' + opts.selectedClass);
            oldIndex = oldItem.index();


            data = {
                index: index,
                header: newItem,
                oldIndex: oldIndex,
                oldHeader: oldIndex < 0 ? null : oldItem
            };

            if (data.index === data.oldIndex) {
                return;
            }

            data.content = newItem.find(opts.contentSelector);
            data.oldContent = oldIndex < 0 ? null : oldItem.find(opts.contentSelector);

            /**
             * 열리기 전에 이벤트 발생
             * @event vcui.ui.Accordion#accordionbeforeexpand
             * @type {object}
             * @property {number} index 열린 인덱스
             */
            var ev = $.Event(eventBeforeExpand);
            self.triggerHandler(ev, data);
            if (ev.isDefaultPrevented()) {
                return;
            }

            if (typeof isAni === 'undefined') {
                isAni = self.options.useAnimate;
            }

            /**
             * @event vcui.ui.Accordion#accordionexpand
             * @type {object}
             * @property {number} index 열린 인덱스.
             */
            if (isAni !== false) {
                // 애니메이션 사용
                self.isAnimate = true;
                if (opts.singleOpen && data.oldHeader) {
                    // 하나만 열리는 모드
                    data.oldHeader.removeClass(opts.selectedClass);
                    data.oldContent.slideUp(opts.duration, function () {
                        self._updateButton(data.oldIndex, false);
                        callback && callback();
                    });
                }
                data.header.addClass(opts.selectedClass);
                data.content.slideDown(opts.duration, function () {
                    self.isAnimate = false;
                    // 열려진 후에 이벤트 발생
                    self.trigger(eventExpand, data);
                    self._updateButton(index, true);
                    self._postExpand(data);
                    callback && callback();
                });
            } else {
                // 에니메이션 미사용
                if (opts.singleOpen && data.oldHeader) {
                    // 하나만 열리는 모드
                    data.oldHeader.removeClass(opts.selectedClass);
                    data.oldContent.hide();
                }
                data.header.addClass(opts.selectedClass);
                data.content.show();

                // 열려진 후에 이벤트 발생
                self.trigger(eventExpand, data);
                self._updateButton(index, true);
                self._postExpand(data);
                callback && callback();
            }
        },

        getActivate: function getActivate() {
            var self = this,
                o = self.options,
                item = self._findItems().filter('.' + o.selectedClass);

            if (item.length === 0) {
                return {
                    index: -1,
                    header: null,
                    content: null
                };
            } else {
                return {
                    index: item.index(),
                    header: item,
                    content: item.find(o.contentSelector)
                };
            }
        },

        _updateButton: function _updateButton(index, toggle) {
            var self = this,
                options = self.options,
                activeClass = options.activeClass,
                toggleClass = options.toggleButtonClass,
                $btn = self._findItems().eq(index).find(options.toggleSelector);

            $btn.attr('aria-expanded', toggle ? 'true' : 'false');

            if ($btn.is('a')) {
                if (toggle) {
                    $btn.parent().parent().removeClass(activeClass).addClass(toggleClass);
                    $btn.find('.btn_txt').html('닫기');
                    $btn.find('.ui_accord_text').html(function () {
                        return $btn.attr('data-close-text') || '닫기';
                    }).parent().parent().replaceClass('btn_open', 'btn_close');
                } else {
                    $btn.parent().parent().removeClass(toggleClass);
                    $btn.find('.btn_txt').html('상세보기');
                    $btn.find('.ui_accord_text').html(function () {
                        return $btn.attr('data-open-text') || '상세보기';
                    }).parent().parent().replaceClass('btn_close', 'btn_open');
                }
            } else {
                if (toggle) {
                    $btn.find('.btn_txt').html('닫기');
                    $btn.replaceClass('btn_open', 'btn_close').parent().parent().removeClass(activeClass).addClass(toggleClass);
                    $btn.find('.ui_accord_text').html(function () {
                        return $btn.attr('data-close-text') || '닫기';
                    });
                } else {
                    $btn.find('.btn_txt').html('상세보기');
                    $btn.replaceClass('btn_close', 'btn_open').parent().parent().removeClass(toggleClass);
                    $btn.find('.ui_accord_text').html(function () {
                        return $btn.attr('data-open-text') || '상세보기';
                    });
                }
            }
        },

        collapseAll: function collapseAll() {
            var self = this,
                count = self._findItems().length;

            self.collapseMode = 'all';
            for (var i = 0; i < count; i++) {
                self.collapse(i, false);
            }
            self.collapseMode = null;
        },

        expandAll: function expandAll() {

            if (this.options.singleOpen) {
                return;
            }
            
            var self = this,
                count = self._findItems().length;

            self.expandMode = 'all';
            for (var i = 0; i < count; i++) {
                self.expand(i, false);
            }
            self.expandMode = null;
        }
    });

    return Accordion;
});
/*!
 * @module vcui.ui.Carousel
 * @license MIT License
 * @description 
 * @copyright VinylC UID Group.
 * @version 1.1
 * 
 * Version: 1.7.1
  Author: Ken Wheeler
    Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues
 */



var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};



vcui.define('ui/carousel', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var prefixModule = 'ui_carousel_';
    var _N = 'carousel';
    var _V = {
        INDEX: prefixModule + 'index',
        ACTIVE: 'on', //'slick-active',
        ARROW: prefixModule + 'arrow',
        INITIALIZED: prefixModule + 'initialized',
        PLAY: prefixModule + 'play',
        HIDDEN: prefixModule + 'hidden',
        DISABLED: 'disabled',
        DOTS: prefixModule + 'dots',
        SLIDE: prefixModule + 'slide',
        SLIDER: prefixModule + 'slider',
        CLONED: prefixModule + 'cloned',
        TRACK: prefixModule + 'track',
        LIST: prefixModule + 'list',
        LOADING: prefixModule + 'loading',
        CENTER: prefixModule + 'center',
        VISIBLE: prefixModule + 'visible',
        CURRENT: prefixModule + 'current',
        SRONLY: 'blind', //'hide , blind',
        PREV: prefixModule + 'prev',
        NEXT: prefixModule + 'next',
        UNBUILD: 'unbuild'
    };

    function addEventNS(str) {
        var pairs = str.split(' ');
        for (var i = -1, item; item = pairs[++i];) {
            pairs[i] = item + '.' + _N;
        }
        return pairs.join(' ');
    }

    var REGEX_HTML = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
    var instanceUid = 0;
    var componentInitials = {
        animating: false,
        dragging: false,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        $playButton: null,
        scrolling: false,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        swiping: false,
        $list: null,
        touchObject: {},
        transformsEnabled: false,
        unbuilded: false
    };


    var Carousel = core.ui('Carousel', {
        bindjQuery: _N,
        defaults: {
            activeClass: _V.ACTIVE,         // 활성 css 클래스
            dotsSelector: '.' + _V.DOTS,    // 인디케이터 셀렉터
            playSelector: '.' + _V.PLAY,    // 재생 버튼 셀렉터
            carouselTitle: '',              // 제목
            indicatorNoSeparator : /{{no}}/,

            accessibility: true,            // 접근성 속성(aria-)들을 붙일것인가
            adaptiveHeight: false,          // 높이를 유동적으로 할것인가
            appendArrows: '.' + _V.ARROW,   // 좌우 버튼을 넣을 요소
            appendDots: '.' + _V.DOTS,      // 인디케이터를 넣을 요소
            arrows: true,                   // 좌우버튼을 표시할 것인가
            arrowsUpdate: 'disabled',       // or 'toggle', 좌우버튼이 비활성화될 때 처리할 방식
            asNavFor: null,                 // 두 Carousel간에 연동할 때 다른 Carousel 객체
            prevArrow: '.' + _V.PREV,       // 이전 버튼 셀렉터
            nextArrow: '.' + _V.NEXT,       // 이후 버튼 셀렉터
            autoplay: false,                // 자동 재생 여부
            autoplaySpeed: 5000,            // 자동 재생 속도
            centerMode: false,              // 활성화된 슬라이드를 가운데에 위치시킬 것인가...
            centerPadding: '50px',          // centerMode가 true일 때 슬라이드간의 간격
            cssEase: 'ease-in-out',                // css ease
            customPaging: function customPaging(carousel, i) {      // 인디케이터 버튼 마크업
                return $('<button type="button" />').text(i + 1);
            },
            dots: true,                     // 인디케이터 사용 여부
            buildDots: true,
            dotsClass: _V.DOTS,             // 인디케이터 css 클래스
            draggable: true,                // 마우스로 슬라이드가 되도록 허용할 것인가
            easing: 'linear',               // slide easing 타입 easeInOutQuad
            edgeFriction: 0.35,             // infinite:false일 때 끝에 다다랐을 때의 바운싱 효과 크기
            fade: false,                    // 슬라이딩이 아닌 fade in/out으로 할 것인가
            focusOnSelect: false,           // 선택한 요소에 포커싱 사용
            focusOnChange: false,           // 활성화후에 포커싱시킬 것인가
            infinite: true,                 // 무한루프 사용 여부
            initialSlide: 0,                // 처음 로딩시에 활성화시킬 슬라이드 인덱스
            autoScrollActive: false,        // 처음 로딘시 on클래스가 있는 슬라이드로 슬라이드 시킬 것인가
            lazyLoad: 'ondemand',           // or progressive. 지연로딩 방식을 설정
            mobileFirst: false,             // 반응형 모드일 때 모바일 사이즈를 우선으로 할 것인가
            pauseOnHover: true,             // 마우스가 들어왔을 때 잠시 자동재생을 멈출 것인가
            pauseOnFocus: true,             // 포커싱됐을 때 잠시 자동재생을 멈출 것인가
            pauseOnDotsHover: false,        // 인디케이터 영역에 마우스가 들어왔을 때 잠시 자동재생을 멈출 것인가
            respondTo: 'window',            // 반응형모드일 때 어느 요소의 사이즈에 맞출 것인가
            responsive: null,               // 브레이크포인트에 따른 설정값들
            rows: 1,                        // 1보가 크면 그리드모양으로 배치된다.
            rtl: false,                     // right to left
            slide: '.' + _V.TRACK + '>*',   // 슬라이드 셀렉터
            slidesPerRow: 1,                // rows가 1보다 클 경우 행별 슬라이드 수
            slidesToShow: 1,                // 표시할 슬라이드 수
            slidesToScroll: 1,              // 슬라이딩될 때 한번에 움직일 갯수
            speed: 500,                     // 슬라이딩 속도
            swipe: true,                    // 스와이핑 허용 여부
            swipeToSlide: false,            // 사용자가 slidesToScroll과 관계없이 슬라이드로 직접 드래그 또는 스 와이프 할 수 있도록 허용
            touchMove: true,                // 터치로 슬라이드 모션 사용
            touchThreshold: 5,              // 슬라이드를 진행하려면 사용자는 슬라이더의 너비 (1 / touchThreshold) * 너비를 스 와이프해야합니다
            useCSS: true,                   // CSS 전환 활성화 / 비활성화
            useTransform: true,             // CSS 변환 활성화 / 비활성화
            variableWidth: false,           // 가변 너비 슬라이드
            vertical: false,                // 세로 슬라이드 모드
            verticalSwiping: false,         // 수직 스 와이프 모드
            preventVertical: false,         // 슬라이딩 할 때 수직으로 움직이는 걸 막을 것인가.
            waitForAnimate: true,           // 애니메이션을 적용하는 동안 슬라이드를 앞으로 이동하라는 요청을 무시합니다.
            zIndex: 1000,                    // 슬라이드의 zIndex 값 설정, IE9 이하의 경우 유용함
            activeHover: false,
            additionWidth: 0,                // 모듈이 내부 너비를 제대로 계산 못할 때 가감할 너비를 설정
            lastFix : false
        },
        initialize: function initialize(element, options) {

            var self = this;
            var $el = $(element);
            $el.find('.' + _V.NEXT + ', .' + _V.PREV + ', .' + _V.DOTS + ', .' + _V.PLAY).hide();

            
            // if ($el.find('.' + _V.TRACK + '>*').length <= 1) {
            //     $el.find('.' + _V.NEXT + ', .' + _V.PREV + ', .' + _V.DOTS + ', .' + _V.PLAY).hide();
            //     return;
            // }

            if (self.supr(element, options) === false) {
                return;
            }

            core.extend(self, componentInitials);
            if (!self.options.activeClass) {
                self.options.activeClass = _V.ACTIVE;
            }

            

            self.touchObject = {};
            self.activeBreakpoint = null;
            self.animType = null;
            self.animProp = null;
            self.breakpoints = [];
            self.breakpointSettings = [];
            self.cssTransitions = false;
            self.focussed = false;
            self.interrupted = false;
            self.paused = true;
            self.positionProp = null;
            self.respondTo = null;
            self.rowCount = 1;
            self.shouldClick = true;
            self.$slider = $(element);
            self.$slidesCache = null;
            self.slidesToShow = self.options.slidesToShow;
            self.transformType = null;
            self.transitionType = null;
            self.hidden = 'hidden';
            self.visibilityChange = 'visibilitychange';
            self.windowWidth = 0;
            self.windowTimer = null;
            self.currentSlide = self.options.initialSlide;
            self.originalSettings = self.options;
            if (typeof document.mozHidden !== 'undefined') {
                self.hidden = 'mozHidden';
                self.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                self.hidden = 'webkitHidden';
                self.visibilityChange = 'webkitvisibilitychange';
            }

            self.autoPlay = self.autoPlay.bind(self);
            self.autoPlayClear = self.autoPlayClear.bind(self);
            self.autoPlayIterator = self.autoPlayIterator.bind(self);
            self.changeSlide = self.changeSlide.bind(self);
            self.clickHandler = self.clickHandler.bind(self);
            self.selectHandler = self.selectHandler.bind(self);
            self.setPosition = self.setPosition.bind(self);
            self.swipeHandler = self.swipeHandler.bind(self);
            self.keyHandler = self.keyHandler.bind(self);

            self.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            self.htmlExpr = REGEX_HTML;

            /* 무한 롤링 일괄적용
            self.options.infinite = true;            
            if(self.options.responsive){

                var responsiveArr = vcui.array.reduce(self.options.responsive, function (prev, cur) {

                    if(vcui.isString(cur['settings'])){
                        prev.push(cur);
                    }else{
                        var settings = $.extend({}, cur['settings']);
                        settings['infinite'] = true;
                        cur['settings'] = settings;
                        prev.push(cur);
                    }                    
                    return prev;
                }, []);
                self.options.responsive = responsiveArr;
            }
            */


            self.registerBreakpoints();
            self.init(true);

            
        },

        activateADA: function activateADA() {
            var self = this;
            var opt = self.options;

            self.$slideTrack.find('.' + opt.activeClass).attr({
                'aria-hidden': 'false'
            }).find('a, input, button, select').attr({
                'tabindex': ''
            });
        },
        addSlide: function addSlide(markup, index, addBefore) {

            var self = this;
            var opt = self.options;

            if (typeof index === 'boolean') {
                addBefore = index;
                index = null;
            } else if (index < 0 || index >= self.slideCount) {
                return false;
            }

            self.unload();

            if (typeof index === 'number') {
                if (index === 0 && self.$slides.length === 0) {
                    $(markup).appendTo(self.$slideTrack);
                } else if (addBefore) {
                    $(markup).insertBefore(self.$slides.eq(index));
                } else {
                    $(markup).insertAfter(self.$slides.eq(index));
                }
            } else {
                if (addBefore === true) {
                    $(markup).prependTo(self.$slideTrack);
                } else {
                    $(markup).appendTo(self.$slideTrack);
                }
            }

            self.$slides = self.$slideTrack.children(opt.slide);
            // comahead
            self.$slides.css('float', 'left');

            self.$slideTrack.children(opt.slide).detach();

            self.$slideTrack.append(self.$slides);

            self.$slides.each(function (index, element) {
                $(element).attr('data-' + _V.INDEX, index);
            });

            self.$slidesCache = self.$slides;

            self.reinit();
        },
        animateHeight: function animateHeight() {
            var self = this;
            var opt = self.options;

            if (opt.slidesToShow === 1 && opt.adaptiveHeight === true && opt.vertical === false) {
                var targetHeight = self.$slides.eq(self.currentSlide).outerHeight(true);
                self.$list.animate({
                    height: targetHeight
                }, opt.speed);
            }
        },
        animateSlide: function animateSlide(targetLeft, callback) {

            var animProps = {},
                self = this,
                opt = self.options;

            self.animateHeight();

            if (opt.rtl === true && opt.vertical === false) {
                targetLeft = -targetLeft;
            }
            if (self.transformsEnabled === false) {
                if (opt.vertical === false) {
                    self.$slideTrack.animate({
                        left: targetLeft
                    }, opt.speed, opt.easing, callback);
                } else {
                    self.$slideTrack.animate({
                        top: targetLeft
                    }, opt.speed, opt.easing, callback);
                }
            } else {

                if (self.cssTransitions === false) {
                    if (opt.rtl === true) {
                        self.currentLeft = -self.currentLeft;
                    }
                    $({
                        animStart: self.currentLeft
                    }).animate({
                        animStart: targetLeft
                    }, {
                        duration: opt.speed,
                        easing: opt.easing,
                        step: function step(now) {
                            now = Math.ceil(now);
                            if (opt.vertical === false) {
                                animProps[self.animType] = 'translate(' + now + 'px, 0px)';
                                self.$slideTrack.css(animProps);
                            } else {
                                animProps[self.animType] = 'translate(0px,' + now + 'px)';
                                self.$slideTrack.css(animProps);
                            }
                        },
                        complete: function complete() {
                            if (callback) {
                                callback.call();
                            }
                        }
                    });
                } else {

                    self.applyTransition();
                    targetLeft = Math.ceil(targetLeft);

                    if (opt.vertical === false) {
                        animProps[self.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                    } else {
                        animProps[self.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                    }
                    self.$slideTrack.css(animProps);

                    if (callback) {
                        setTimeout(function () {

                            self.disableTransition();

                            callback.call();
                        }, opt.speed);
                    }
                }
            }
        },
        getNavTarget: function getNavTarget() {

            var self = this,
                opt = self.options,
                asNavFor = opt.asNavFor;

            if (asNavFor && asNavFor !== null) {
                asNavFor = $(asNavFor).not(self.$slider);
            }

            return asNavFor;
        },
        asNavFor: function asNavFor(index) {

            var self = this,
                asNavFor = self.getNavTarget();

            if (asNavFor !== null && (typeof asNavFor === 'undefined' ? 'undefined' : _typeof(asNavFor)) === 'object') {
                asNavFor.each(function () {
                    var target = $(this).vcCarousel('instance');
                    if (!target.unbuilded) {
                        target.slideHandler(index, true);
                    }
                });
            }
        },
        applyTransition: function applyTransition(slide) {

            var self = this,
                transition = {},
                opt = self.options;

            if (opt.fade === false) {
                transition[self.transitionType] = self.transformType + ' ' + opt.speed + 'ms ' + opt.cssEase;
            } else {
                transition[self.transitionType] = 'opacity ' + opt.speed + 'ms ' + opt.cssEase;
            }

            if (opt.fade === false) {
                self.$slideTrack.css(transition);
            } else {
                self.$slides.eq(slide).css(transition);
            }
        },
        autoPlay: function autoPlay() {

            var self = this;
            var opt = self.options;

            self.autoPlayClear();

            if (self.slideCount > opt.slidesToShow) {
                self.autoPlayTimer = setInterval(self.autoPlayIterator, opt.autoplaySpeed);
            }
        },
        autoPlayClear: function autoPlayClear() {

            var self = this;

            if (self.autoPlayTimer) {
                clearInterval(self.autoPlayTimer);
            }
        },
        autoPlayIterator: function autoPlayIterator() {

            var self = this,
                opt = self.options,
                slideTo = self.currentSlide + opt.slidesToScroll;


            if (!self.paused && !self.interrupted && !self.focussed) {

                if (opt.infinite === false) {

                    if (self.direction === 1 && self.currentSlide + 1 === self.slideCount - 1) {
                        self.direction = 0;
                    } else if (self.direction === 0) {

                        slideTo = self.currentSlide - opt.slidesToScroll;

                        if (self.currentSlide - 1 === 0) {
                            self.direction = 1;
                        }
                    }
                }

                self.slideHandler(slideTo);
            }

        },
        buildArrows: function buildArrows() {

            var self = this,
                opt = self.options,
                $p,
                $n;

            if (opt.arrows === true) {
                $p = self.$prevArrow = self.$(opt.prevArrow).addClass(_V.ARROW);
                $n = self.$nextArrow = self.$(opt.nextArrow).addClass(_V.ARROW);

                if (self.slideCount > opt.slidesToShow) {

                    $p.removeClass(_V.HIDDEN).removeAttr('aria-hidden tabindex');
                    $n.removeClass(_V.HIDDEN).removeAttr('aria-hidden tabindex');

                    if (self.htmlExpr.test(opt.prevArrow)) {
                        $p.prependTo(opt.appendArrows);
                    }

                    if (self.htmlExpr.test(opt.nextArrow)) {
                        $n.appendTo(opt.appendArrows);
                    }

                    if (opt.infinite !== true) {
                        $p.addClass(_V.DISABLED).prop('disabled', true).attr('aria-disabled', 'true');
                    }
                } else {

                    $p.add(self.$nextArrow).addClass(_V.HIDDEN).attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });
                }
            }
        },
        buildDots: function buildDots() {

            var self = this,
                opt = self.options,
                i,
                dots,
                dot,
                cloned;


            if (opt.dots === true) {
                self.$slider.addClass(_V.DOTS);
                if (opt.dotsSelector) {
                    dots = self.$slider.find(opt.dotsSelector).show().addClass('ui_static');
                    if (opt.buildDots === false) {
                        self.$dots = dots;
                        dots.find('li').removeClass(opt.activeClass).first().addClass(opt.activeClass);
                        return;
                    }

                    if (dots.children().length || self.staticDot) {
                        if (self.staticDot) {
                            dot = self.staticDot;
                        } else {
                            dot = dots.children().first();
                            self.staticDot = dot;
                        }
                        dots.empty();
                        if (!opt.carouselTitle) {
                            opt.carouselTitle = dot.find('.' + _V.SRONLY).text();
                        }
                        for (i = 0; i <= self.getDotCount(); i += 1) {
                            dots.append(cloned = dot.clone().removeClass(opt.activeClass));
                           
                            cloned.find('.' + _V.SRONLY).text(opt.carouselTitle.replace(opt.indicatorNoSeparator, i + 1));                           
                            // cloned.find('.' + _V.SRONLY).text(opt.carouselTitle.replace(/{{no}}/, i + 1));
                           
                        }
                        dot = null;
                    } else {
                        for (i = 0; i <= self.getDotCount(); i += 1) {
                            dots.append($('<li />').append(opt.customPaging.call(this, self, i)));
                        }
                    }
                } else {
                    dots = $('<ul />');
                    dots.addClass(opt.dotsClass);
                    dots.appendTo(opt.appendDots);
                    for (i = 0; i <= self.getDotCount(); i += 1) {
                        dots.append($('<li />').append(opt.customPaging.call(this, self, i)));
                    }
                }
                self.$dots = dots;
                dots.find('li').first().addClass(opt.activeClass);
            } else {
                self.$dots = $();
            }
        },
        buildOut: function buildOut() {

            var self = this,
                opt = self.options;

            if (opt.rows > 1) {
                self.$slides = self.$slider.find('.' + _V.TRACK).children().addClass(_V.SLIDE);
            } else {
                self.$slides = self.$slider.find(opt.slide + ':not(' + _V.CLONED + ')').addClass(_V.SLIDE);
            }
            // comahead
            self.$slides.css('float', 'left');

            self.slideCount = self.$slides.length;

            self.$slides.each(function (index, element) {
                $(element).attr('data-' + _V.INDEX, index).data('originalStyling', $(element).attr('style') || '');
            });

            self.$slider.addClass(_V.SLIDER);

            if ((self.$slideTrack = self.$slider.find('.' + _V.TRACK)).length === 0) {
                self.$slideTrack = self.slideCount === 0 ? $('<div class="' + _V.TRACK + '"/>').appendTo(self.$slider) : self.$slides.wrapAll('<div class="' + _V.TRACK + '"/>').parent();
            } else {
                self.$slideTrack.addClass('ui_static');
            }

            if ((self.$list = self.$slider.find('.' + _V.LIST)).length === 0) {
                self.$list = self.$slideTrack.wrap('<div class="' + _V.LIST + '"/>').parent();
            } else {
                self.$list.addClass('ui_static');
            }

            self.$list.css('overflow', 'hidden');
            self.$slideTrack.css('opacity', 0);

            if (opt.centerMode === true || opt.swipeToSlide === true) {
                opt.slidesToScroll = 1;
            }

            $('img[data-lazy]', self.$slider).not('[src]').addClass(_V.LOADING);

            self.setupInfinite();

            self.buildArrows();

            self.buildDots();

            self.updateDots();

            self.setSlideClasses(typeof self.currentSlide === 'number' ? self.currentSlide : 0);

            if (opt.draggable === true) {
                self.$list.addClass('draggable');
            }
        },
        buildRows: function buildRows() {

            var self = this,
                opt = self.options,
                a,
                b,
                c,
                newSlides,
                numOfSlides,
                originalSlides,
                slidesPerSection;

            newSlides = document.createDocumentFragment();
            originalSlides = self.$slider.find('.' + _V.TRACK).children();

            if (opt.rows > 1) {

                slidesPerSection = opt.slidesPerRow * opt.rows;
                numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

                for (a = 0; a < numOfSlides; a++) {
                    var slide = document.createElement('div');
                    for (b = 0; b < opt.rows; b++) {
                        var row = document.createElement('div');
                        for (c = 0; c < opt.slidesPerRow; c++) {
                            var target = a * slidesPerSection + (b * opt.slidesPerRow + c);
                            if (originalSlides.get(target)) {
                                row.appendChild(originalSlides.get(target));
                            }
                        }
                        slide.appendChild(row);
                    }
                    newSlides.appendChild(slide);
                }

                self.$slider.find('.' + _V.TRACK).empty().append(newSlides);
                self.$slider.find('.' + _V.TRACK).children().children().children().css({
                    'width': 100 / opt.slidesPerRow + '%',
                    'display': 'inline-block'
                });
            }
        },

        _getTargetBreakpoint: function _getTargetBreakpoint() {
            var self = this,
                b = self.breakpoints,
                breakpoint,
                respondToWidth,
                targetBreakpoint = null;

            switch (self.responseTo) {
                case 'carousel':
                    respondToWidth = self.$slider.width();
                    break;
                case 'min':
                    respondToWidth = Math.min(window.innerWidth || $(window).width(), self.$slider.width());
                    break;
                default:
                    respondToWidth = window.innerWidth || $(window).width();
                    break;
            }

            for (breakpoint in b) {
                if (b.hasOwnProperty(breakpoint)) {
                    if (self.originalSettings.mobileFirst === false) {
                        if (respondToWidth < b[breakpoint]) {
                            targetBreakpoint = b[breakpoint];
                        }
                    } else {
                        if (respondToWidth > b[breakpoint]) {
                            targetBreakpoint = b[breakpoint];
                        }
                    }
                }
            }
            return targetBreakpoint;
        },

        checkResponsive: function checkResponsive(initial, forceUpdate) {

            var self = this,
                opt = self.options,
                bs = self.breakpointSettings,
                targetBreakpoint,
                triggerBreakpoint = false;

            if (opt.responsive && opt.responsive.length) {

                targetBreakpoint = self._getTargetBreakpoint();

                if (targetBreakpoint !== null) {
                    if (self.activeBreakpoint !== null) {

                        if (targetBreakpoint !== self.activeBreakpoint || forceUpdate) {
                            self.activeBreakpoint = targetBreakpoint;

                            if (bs[targetBreakpoint] === _V.UNBUILD) {
                                self.unbuild(targetBreakpoint);
                                
                            } else {
                                self.options = opt = $.extend({}, self.originalSettings, bs[targetBreakpoint]);
                                if (initial === true) {
                                    self.currentSlide = opt.initialSlide;
                                }

                                self.refresh(initial);
                            }
                            triggerBreakpoint = targetBreakpoint;
                        }
                    } else {
                        self.activeBreakpoint = targetBreakpoint;
                        if (bs[targetBreakpoint] === _V.UNBUILD) {
                            self.unbuild(targetBreakpoint);
                        } else {
                            self.options = $.extend({}, self.originalSettings, bs[targetBreakpoint]);
                            if (initial === true) {
                                self.currentSlide = opt.initialSlide;
                            }
                            self.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    if (self.activeBreakpoint !== null) {
                        self.activeBreakpoint = null;
                        self.options = opt = self.originalSettings;
                        if (initial === true) {
                            self.currentSlide = opt.initialSlide;
                        }
                        self.refresh(initial);
                        triggerBreakpoint = targetBreakpoint;
                    }
                }

                // only trigger breakpoints during an actual break. not on initialize.
                if (!initial && triggerBreakpoint !== false) {
                    self.triggerHandler(_N+'breakpoint', [self, triggerBreakpoint]);
                }
            }
        },
        changeSlide: function changeSlide(event, dontAnimate) {

            var self = this,
                opt = self.options,
                $target = $(event.currentTarget),
                indexOffset,
                slideOffset,
                unevenOffset;

            // If target is a link, prevent default action.
            if ($target.is('a')) {
                event.preventDefault();
            }

            // If target is not the <li> element (ie: a child), find the <li>.
            if (!$target.is('li')) {
                $target = $target.closest('li');
            }

            unevenOffset = self.slideCount % opt.slidesToScroll !== 0;
            indexOffset = unevenOffset ? 0 : (self.slideCount - self.currentSlide) % opt.slidesToScroll;

            switch (event.data.message) {

                case 'previous':
                    slideOffset = indexOffset === 0 ? opt.slidesToScroll : opt.slidesToShow - indexOffset;
                    if (self.slideCount > opt.slidesToShow) {
                        self.slideHandler(self.currentSlide - slideOffset, false, dontAnimate);
                    }
                    break;

                case 'next':
                    slideOffset = indexOffset === 0 ? opt.slidesToScroll : indexOffset;
                    if (self.slideCount > opt.slidesToShow) {
                        self.slideHandler(self.currentSlide + slideOffset, false, dontAnimate);
                    }
                    break;

                case 'index':
                    var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * opt.slidesToScroll;

                    self.slideHandler(self.checkNavigable(index), false, dontAnimate);
                    $target.children().trigger('focus');
                    break;

                default:
                    return;
            }
        },
        checkNavigable: function checkNavigable(index) {

            var self = this,
                opt = self.options,
                navigables,
                prevNavigable;

            navigables = self.getNavigableIndexes();
            prevNavigable = 0;
            if (index > navigables[navigables.length - 1]) {
                index = navigables[navigables.length - 1];
            } else {
                for (var n in navigables) {
                    if (index < navigables[n]) {
                        index = prevNavigable;
                        break;
                    }
                    prevNavigable = navigables[n];
                }
            }

            return index;
        },
        cleanUpEvents: function cleanUpEvents() {
            var self = this,
                opt = self.options;

            if (opt.dots && self.$dots !== null) {

                $('li', self.$dots).off(addEventNS('click'), self.changeSlide).off(addEventNS('mouseenter')).off(addEventNS('mouseleave'));

                if (opt.accessibility === true) {
                    self.$dots.off(addEventNS('keydown'), self.keyHandler);
                }
            }

            self.$slider.off(addEventNS('focus blur'));

            if (opt.arrows === true && self.slideCount > opt.slidesToShow) {
                self.$prevArrow && self.$prevArrow.off(addEventNS('click'), self.changeSlide);
                self.$nextArrow && self.$nextArrow.off(addEventNS('click'), self.changeSlide);
            }
           

            self.$list.off(addEventNS('touchstart mousedown'), self.swipeHandler);
            self.$list.off(addEventNS('touchmove mousemove'), self.swipeHandler);
            self.$list.off(addEventNS('touchend mouseup'), self.swipeHandler);
            self.$list.off(addEventNS('touchcancel mouseleave'), self.swipeHandler);
            self.$list.off(addEventNS('click'), self.clickHandler);


            $(document).off(self.visibilityChange, self.visibility);

            self.cleanUpSlideEvents();

            if (opt.accessibility === true) {
                self.$list.off(addEventNS('keydown'), self.keyHandler);
            }

            if (opt.focusOnSelect === true) {
                $(self.$slideTrack).children().off(addEventNS('click'), self.selectHandler);
            }

            // $(window).off('orientationchange.' + _N + '-' + self.instanceUid, self.orientationChange);
            // $(window).off('resize.' + _N + '-' + self.instanceUid, self.resize);

            $(window).off(addEventNS('resize') +'-' + self.instanceUid);
            $(window).off(addEventNS('orientationchange') + '-' + self.instanceUid);

            // $(window).off('resize.' + _N + '-' + self.instanceUid, self.resize);


            $(window).off(addEventNS('load') + '-' + self.instanceUid, self.setPosition);
            $(document).on(addEventNS('ready') + '-' + self.instanceUid, self.setPosition);



            $('[draggable!=true]', self.$slideTrack).off(addEventNS('dragstart'), self.preventDefault);

            // $(window).off('load.' + _N + '-' + self.instanceUid, self.setPosition);
            // $(document).off('ready.' + _N + '-' + self.instanceUid, self.setPosition);
        },
        cleanUpSlideEvents: function cleanUpSlideEvents() {

            var self = this,
                opt = self.options;

            self.$list.off(addEventNS('mouseenter'));
            self.$list.off(addEventNS('mouseleave'));
        },
        cleanUpRows: function cleanUpRows() {

            var self = this,
                opt = self.options,
                originalSlides;

            if (opt.rows > 1) {
                originalSlides = self.$slides.children().children();
                originalSlides.removeAttr('style');
                self.$slider.find('.' + _V.TRACK).empty().append(originalSlides);
            }
        },
        clickHandler: function clickHandler(event) {

            var self = this,
                opt = self.options;

            if (self.shouldClick === false) {
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
            }
        },
        destroy: function destroy(refresh) {
            var self = this,
                opt = self.options;

            self.autoPlayClear();

            self.touchObject = {};

            self.cleanUpEvents();

            $(_V.CLONED, self.$slider).detach();

            if (self.$dots) {
                var dot = self.$dots.children().first().clone(true);

                if (self.$dots.hasClass('ui_static')) {

                    self.$dots.empty().removeClass('ui_static');
                    if(dot) self.$dots.append(dot);

                } else {
                    self.$dots.remove();
                    if(dot) self.$dots.append(dot);                  

                }

                self.$dots.hide();
            }

            if (self.$prevArrow && self.$prevArrow.length) {

                self.$prevArrow.removeClass(_V.DISABLED + ' ' + _V.ARROW + ' ' + _V.HIDDEN).prop('disabled', false).removeAttr('aria-hidden aria-disabled tabindex').css('display', 'none');

                if (self.htmlExpr.test(opt.prevArrow)) {
                    self.$prevArrow.remove();
                }
            }

            if (self.$nextArrow && self.$nextArrow.length) {

                self.$nextArrow.removeClass(_V.DISABLED + ' ' + _V.ARROW + ' ' + _V.HIDDEN).prop('disabled', false).removeAttr('aria-hidden aria-disabled tabindex').css('display', 'none');

                if (self.htmlExpr.test(opt.nextArrow)) {
                    self.$nextArrow.remove();
                }
            }

            if (self.$slides) {

                var isMarkuped = self.$slideTrack.hasClass('ui_static');

                self.$slides.removeClass(_V.SLIDE + ' ' + opt.activeClass + ' ' + _V.CENTER + ' ' + _V.VISIBLE + ' ' + _V.CURRENT).removeAttr('aria-hidden data-' + _V.INDEX + ' tabindex role').each(function () {
                    $(this).attr('style', $(this).data('originalStyling'));
                });

                self.$slides.css('float', '');

                if (isMarkuped) {
                    self.$list.off().removeClass('ui_static');
                    self.$slideTrack.attr('style', '').off().removeClass('ui_static');
                    self.$slideTrack.empty().append(self.$slides);
                } else {
                    self.$slideTrack.children(this.options.slide).detach();
                    self.$slideTrack.detach();
                    if (opt.rows > 1) {
                        self.$list.append(self.$slides);
                    } else {
                        self.$list.detach();
                        self.$slider.append(self.$slides);
                    }
                }

                
            } 
                        
            self.cleanUpRows();

            self.$slider.removeClass(_V.SLIDER);
            self.$slider.removeClass(_V.INITIALIZED);
            self.$slider.removeClass(_V.DOTS);

            self.unbuilded = true;

            if (!refresh) {
                self.triggerHandler('destroy', [self]);
                self.supr();
            }
            
        },
        disableTransition: function disableTransition(slide) {

            var self = this,
                opt = self.options,
                transition = {};

            transition[self.transitionType] = '';

            if (opt.fade === false) {
                if(self.$slideTrack) self.$slideTrack.css(transition);
            } else {
                if(self.$slides) self.$slides.eq(slide).css(transition);
            }
        },
        fadeSlide: function fadeSlide(slideIndex, callback) {

            var self = this,
                opt = self.options;

            if (self.cssTransitions === false) {

                self.$slides.eq(slideIndex).css({
                    //zIndex: opt.zIndex
                });

                self.$slides.eq(slideIndex).animate({
                    opacity: 1
                }, opt.speed, opt.easing, callback);
            } else {

                self.applyTransition(slideIndex);

                self.$slides.eq(slideIndex).css({
                    opacity: 1,
                    //zIndex: opt.zIndex
                });

                if (callback) {
                    setTimeout(function () {

                        self.disableTransition(slideIndex);

                        callback.call();
                    }, opt.speed);
                }
            }
        },
        fadeSlideOut: function fadeSlideOut(slideIndex) {

            var self = this,
                opt = self.options;

            if (self.cssTransitions === false) {

                self.$slides.eq(slideIndex).animate({
                    opacity: 0,
                    //zIndex: opt.zIndex - 2
                }, opt.speed, opt.easing);
            } else {

                self.applyTransition(slideIndex);

                self.$slides.eq(slideIndex).css({
                    opacity: 0,
                    //zIndex: opt.zIndex - 2
                });
            }
        },
        filterSlides: function filterSlides(filter) {

            var self = this,
                opt = self.options;

            if (filter !== null) {

                self.$slidesCache = self.$slides;

                self.unload();

                self.$slideTrack.children(this.options.slide).detach();

                self.$slidesCache.filter(filter).appendTo(self.$slideTrack);

                self.reinit();
            }
        },
        focusHandler: function focusHandler() {

            var self = this;
            var focusTimer;

            self.on(addEventNS('mouseenter mouseleave'), function (e) {
                clearTimeout(focusTimer);
                switch(e.type) {
                    case 'mouseenter': self.triggerHandler('carouselactive'); break;
                    case 'mouseleave': self.triggerHandler('carouseldeactive'); break;
                }
            });

            self.on(addEventNS('focusin focusout'), function (e) {
                switch(e.type) {
                    case 'focusin':
                        if (!self.focussed) {
                            self.focussed = true;
                            self.autoPlay();
                            self.triggerHandler('carouselactive');
                        }
                        break;
                    case 'focusout':

                        if (self.$slider && self.$slider[0] && e.relatedTarget && !$.contains(self.$slider[0], e.relatedTarget)) {
                            self.focussed = false;
                            self.autoPlay();
                            self.triggerHandler('carouseldeactive');
                        }
                        break;
                }
            });

            /*var self = this,
                opt = self.options;

            self.$slider.off('focus.' + _N + ' blur.' + _N).on('focus.' + _N + ' blur.' + _N, '*', function (event) {

                // TODO: ?? event.stopImmediatePropagation();
                var $sf = $(this);
                console.log(event.type);
                setTimeout(function () {
                    if (opt.pauseOnFocus) {
                        self.focussed = $sf.is(':focus');
                        self.autoPlay();
                    }
                }, 0);
            });*/
        },
        getCurrent: function getCurrent() {

            var self = this,
                opt = self.options;
            return self.currentSlide;
        },
        getDotCount: function getDotCount() {

            var self = this,
                opt = self.options;

            var breakPoint = 0;
            var counter = 0;
            var pagerQty = 0;

            if (opt.infinite === true) {
                if (self.slideCount <= opt.slidesToShow) {
                    ++pagerQty;
                } else {
                    while (breakPoint < self.slideCount) {
                        ++pagerQty;
                        breakPoint = counter + opt.slidesToScroll;
                        counter += opt.slidesToScroll <= opt.slidesToShow ? opt.slidesToScroll : opt.slidesToShow;
                    }
                }
            } else if (opt.centerMode === true) {
                pagerQty = self.slideCount;
            } else if (!opt.asNavFor) {
                pagerQty = 1 + Math.ceil((self.slideCount - opt.slidesToShow) / opt.slidesToScroll);
            } else {
                while (breakPoint < self.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + opt.slidesToScroll;
                    counter += opt.slidesToScroll <= opt.slidesToShow ? opt.slidesToScroll : opt.slidesToShow;
                }
            }

            return pagerQty - 1;
        },
        getLeft: function getLeft(slideIndex) {

            var self = this,
                opt = self.options,
                targetLeft,
                verticalHeight,
                verticalOffset = 0,
                targetSlide,
                coef;

            self.slideOffset = 0;
            verticalHeight = self.$slides.first().outerHeight(true);

            if (opt.infinite === true) {
                if (self.slideCount > opt.slidesToShow) {
                    self.slideOffset = self.slideWidth * opt.slidesToShow * -1;
                    coef = -1;

                    if (opt.vertical === true && opt.centerMode === true) {
                        if (opt.slidesToShow === 2) {
                            coef = -1.5;
                        } else if (opt.slidesToShow === 1) {
                            coef = -2;
                        }
                    }
                    verticalOffset = verticalHeight * opt.slidesToShow * coef;
                }
                if (self.slideCount % opt.slidesToScroll !== 0) {
                    if (slideIndex + opt.slidesToScroll > self.slideCount && self.slideCount > opt.slidesToShow) {
                        if (slideIndex > self.slideCount) {
                            self.slideOffset = (opt.slidesToShow - (slideIndex - self.slideCount)) * self.slideWidth * -1;
                            verticalOffset = (opt.slidesToShow - (slideIndex - self.slideCount)) * verticalHeight * -1;
                        } else {
                            self.slideOffset = self.slideCount % opt.slidesToScroll * self.slideWidth * -1;
                            verticalOffset = self.slideCount % opt.slidesToScroll * verticalHeight * -1;
                        }
                    }
                }
            } else {
                if (slideIndex + opt.slidesToShow > self.slideCount) {
                    self.slideOffset = (slideIndex + opt.slidesToShow - self.slideCount) * self.slideWidth;
                    verticalOffset = (slideIndex + opt.slidesToShow - self.slideCount) * verticalHeight;
                }
            }

            if (self.slideCount <= opt.slidesToShow) {
                self.slideOffset = 0;
                verticalOffset = 0;
            }

            if (opt.centerMode === true && self.slideCount <= opt.slidesToShow) {
                self.slideOffset = self.slideWidth * Math.floor(opt.slidesToShow) / 2 - self.slideWidth * self.slideCount / 2;
            } else if (opt.centerMode === true && opt.infinite === true) {
                self.slideOffset += self.slideWidth * Math.floor(opt.slidesToShow / 2) - self.slideWidth;
            } else if (opt.centerMode === true) {
                self.slideOffset = 0;
                self.slideOffset += self.slideWidth * Math.floor(opt.slidesToShow / 2);
            }

            if (opt.vertical === false) {
                targetLeft = slideIndex * self.slideWidth * -1 + self.slideOffset;
            } else {
                targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
            }

            if (opt.variableWidth === true) {

                if (self.slideCount <= opt.slidesToShow || opt.infinite === false) {
                    targetSlide = self.$slideTrack.children('.' + _V.SLIDE).eq(slideIndex);
                } else {
                    targetSlide = self.$slideTrack.children('.' + _V.SLIDE).eq(slideIndex + opt.slidesToShow);
                }

                if (opt.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (self.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft = 0;
                    }
                    
                } else {

                    // 추가 김두일                    
                    if(opt.infinite === true){

                        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;                        

                    }else{
                        
                        if(opt.lastFix===true){
                            var lastTarget = self.$slideTrack.children('.' + _V.SLIDE).last();
                            if(targetSlide[0] && lastTarget[0] && (lastTarget[0].offsetLeft - targetSlide[0].offsetLeft + lastTarget.width() < self.listWidth)){  
                                var dt = self.listWidth - (lastTarget[0].offsetLeft - targetSlide[0].offsetLeft + lastTarget.width());
                                targetLeft = targetSlide[0]? (targetSlide[0].offsetLeft * -1) + dt : 0;
                            }else{
                                targetLeft = targetSlide[0]? targetSlide[0].offsetLeft * -1 : 0;
                            }
                            
                        }else{
                            targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                        }
                    }
                    // 추가 end
                    
                }

                if (opt.centerMode === true) {
                    if (self.slideCount <= opt.slidesToShow || opt.infinite === false) {
                        targetSlide = self.$slideTrack.children('.' + _V.SLIDE).eq(slideIndex);
                    } else {
                        targetSlide = self.$slideTrack.children('.' + _V.SLIDE).eq(slideIndex + opt.slidesToShow + 1);
                    }

                    if (opt.rtl === true) {
                        if (targetSlide[0]) {
                            targetLeft = (self.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                        } else {
                            targetLeft = 0;
                        }
                    } else {
                        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                    }

                    targetLeft += (self.$list.width() - targetSlide.outerWidth()) / 2;
                }
            }


            return targetLeft;
        },
        getOption: function getOption(option) {

            var self = this,
                opt = self.options;

            return opt[option];
        },
        getNavigableIndexes: function getNavigableIndexes() {

            var self = this,
                opt = self.options,
                breakPoint = 0,
                counter = 0,
                indexes = [],
                max;

            if (opt.infinite === false) {
                max = self.slideCount;
            } else {
                breakPoint = opt.slidesToScroll * -1;
                counter = opt.slidesToScroll * -1;
                max = self.slideCount * 2;
            }

            while (breakPoint < max) {
                indexes.push(breakPoint);
                breakPoint = counter + opt.slidesToScroll;
                counter += opt.slidesToScroll <= opt.slidesToShow ? opt.slidesToScroll : opt.slidesToShow;
            }

            return indexes;
        },
        getCarousel: function getCarousel() {

            return this;
        },
        getSlideCount: function getSlideCount() {

            var self = this,
                opt = self.options,
                slidesTraversed,
                swipedSlide,
                centerOffset;

            centerOffset = opt.centerMode === true ? self.slideWidth * Math.floor(opt.slidesToShow / 2) : 0;

            if (opt.swipeToSlide === true) {
                self.$slideTrack.find('.' + _V.SLIDE).each(function (index, slide) {
                    if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > self.swipeLeft * -1) {
                        swipedSlide = slide;
                        return false;
                    }
                });

                slidesTraversed = Math.abs($(swipedSlide).attr('data-' + _V.INDEX) - self.currentSlide) || 1;

                return slidesTraversed;
            } else {
                return opt.slidesToScroll;
            }
        },
        goTo: function goTo(slide, dontAnimate) {

            var self = this,
                opt = self.options;

            self.changeSlide({
                data: {
                    message: 'index',
                    index: parseInt(slide)
                }
            }, dontAnimate);
        },
        init: function init(creation) {
            var self = this,
                opt = self.options;

            if (!$(self.$slider).hasClass(_V.INITIALIZED)) {

                $(self.$slider).addClass(_V.INITIALIZED);

                self.buildRows();
                self.buildOut();
                self.setProps();
                self.startLoad();
                self.loadSlider();
                self.initializeEvents();
                self.updateArrows();
                self.updateDots();
                self.checkResponsive(true);
                self.focusHandler();

                self.buildPlayButton();
                self.buildAccessbility();


            }

            if (creation) {
                self.triggerHandler(_N + 'init', [self, self.currentSlide]);
            }

            /*
            if(self.$slider.find(opt.slide + ':not(' + _V.CLONED + ')').length <= opt.slidesToShow){
                self.$slider.find(opt.slide + ':not(' + _V.CLONED + ')').addClass(opt.activeClass);               
            }
            */


            if (opt.accessibility === true) {
                self.initADA();
            }

            if (opt.autoplay) {
                self.paused = false;
                self.autoPlay();
                self.triggerHandler(_N + 'play', [self]);
            }

            if (creation) {
                if (opt.autoScrollActive && !opt.infinite) {
                    var index = self.$slides.filter(opt.autoScrollActive).index();
                    if (index > -1) {
                        self.changeSlide({
                            data: {
                                message: 'index',
                                index: index
                            }
                        }, true);
                    }
                }
            }

            if(self.$el.find('.indi-wrap').find('li').length < 2){
                self.$el.find('.indi-wrap').hide();
                self.$el.addClass('slide-solo');
            }

            setTimeout(function(){
                self.startTransition(self.currentSlide);
            }, 100);
        },
        buildPlayButton: function buildPlayButton() {
            var self = this,
                opt = self.options;

            self.$playButon = self.$('.' + _V.PLAY).show();
            if (self.$playButon.length) {
                opt.pauseOnHover = true;

                self.$playButon.on('click', function (e) {
                    if (self.paused === false) {
                        self.pause();
                    } else {
                        self.play();
                    }
                });
            }
        },
        buildAccessbility: function buildAccessbility() {
            var self = this;

            if (self.$playButon.length) {

                self.$slider.on(_N + 'play ' + _N + 'stop destroy', function (e) {
                    var $items = self.$playButon.find('[data-bind-text]');
                    var state = e.type === _N + 'play' ? 'stop' : 'play';

                    self.$playButon.removeClass('play stop').addClass(state);
                    $items.each(function () {
                        var $this = $(this),
                            data = $this.data('bindText');

                        $this.text(data[state]);
                    }); //
                });
            }

            if (self.$dots.length) {
                self.$slider.on(_N + 'afterchange', function (e, carousel, index) {
                    //if(self.$dots.find('[data-bind-text]')) self.$dots.find('[data-bind-text]').text('');

                    if(self.$dots){
                        self.$dots.find('[data-bind-text]').text('');
                        self.$dots.eq(index).find('[data-bind-text]').text(function () {
                            return this.getAttribute('data-bind-text') || '';
                        });
                    } 

                    
                });
            }
        },
        initADA: function initADA() {
            var self = this,
                opt = self.options,
                numDotGroups = Math.ceil(self.slideCount / opt.slidesToShow),
                tabControlIndexes = self.getNavigableIndexes().filter(function (val) {
                    return val >= 0 && val < self.slideCount;
                }),
                $cloned = self.$slideTrack.find('.' + _V.CLONED);

                //접근성 관련 수정
            self.$slides.add($cloned).attr({
                'aria-hidden': 'true'
            }).find('a, input, button, select').attr({
                //'tabindex': '-1'
                'tabindex': ''
            });

            if (self.$dots !== null) {
                self.$slides.not($cloned).each(function (i) {
                    var slideControlIndex = tabControlIndexes.indexOf(i);

                    $(this).attr({
                        'role': 'tabpanel',
                        'id': _V.SLIDE + self.instanceUid + i//,
                        //aria: 'tabindex': -1
                    });

                    if (slideControlIndex !== -1) {
                        $(this).attr({
                            'aria-describedby': _V.SLIDE + '-control' + self.instanceUid + slideControlIndex
                        });
                    }
                });

                self.$dots.attr('role', 'tablist').find('li').each(function (i) {
                    var mappedSlideIndex = tabControlIndexes[i];

                    $(this).attr({
                        'role': 'presentation'
                    });

                    $(this).find('button').first().attr({
                        'role': 'tab',
                        'id': _V.SLIDE + '-control' + self.instanceUid + i,
                        'aria-controls': _V.SLIDE + self.instanceUid + mappedSlideIndex,
                        'aria-label': i + 1 + ' of ' + numDotGroups,
                        'aria-selected': null //,
                        //'tabindex': '-1'
                    });
                }).eq(self.currentSlide).find('button').attr({
                    'aria-selected': 'true',
                    'tabindex': '0'
                }).end();
            }

            for (var i = self.currentSlide, max = i + opt.slidesToShow; i < max; i++) {
                self.$slides.eq(i);//aria: .attr('tabindex', 0);
            }

            self.activateADA();
        },
        initArrowEvents: function initArrowEvents() {

            var self = this,
                opt = self.options;

            if (opt.arrows === true && self.slideCount > opt.slidesToShow) {
                self.$prevArrow.off(addEventNS('click')).on(addEventNS('click'), {
                    message: 'previous'
                }, self.changeSlide);
                self.$nextArrow.off(addEventNS('click')).on(addEventNS('click'), {
                    message: 'next'
                }, self.changeSlide);

                if (opt.accessibility === true) {
                    self.$prevArrow.on(addEventNS('keydown'), self.keyHandler);
                    self.$nextArrow.on(addEventNS('keydown'), self.keyHandler);
                }
            }
        },
        initDotEvents: function initDotEvents() {

            var self = this,
                opt = self.options;

            if (opt.dots === true) {
                $('li', self.$dots).on(addEventNS('click'), {
                    message: 'index'
                }, function (e) {
                    e.preventDefault();
                    self.changeSlide.apply(this, [].slice.call(arguments));
                });

                if (opt.accessibility === true) {
                    self.$dots.on(addEventNS('keydown'), self.keyHandler);
                }
            }

            if (opt.dots === true && opt.pauseOnDotsHover === true) {

                $('li', self.$dots).on(addEventNS('mouseenter'), $.proxy(self.interrupt, self, true)).on(addEventNS('mouseleave'), $.proxy(self.interrupt, self, false));
            }
        },
        initSlideEvents: function initSlideEvents() {

            var self = this,
                opt = self.options;

            if (opt.pauseOnHover) {

                self.$list.on(addEventNS('mouseenter'), $.proxy(self.interrupt, self, true));
                self.$list.on(addEventNS('mouseleave'), $.proxy(self.interrupt, self, false));
            }
        },
        initializeEvents: function initializeEvents() {

            var self = this,
                opt = self.options;

            self.initArrowEvents();

            self.initDotEvents();
            self.initSlideEvents();

            
            self.$list.on(addEventNS('touchstart mousedown'), {
                action: 'start'
            }, self.swipeHandler);
            self.$list.on(addEventNS('touchmove mousemove'), {
                action: 'move'
            }, self.swipeHandler);
            self.$list.on(addEventNS('touchend mouseup'), {
                action: 'end'
            }, self.swipeHandler);
            self.$list.on(addEventNS('touchcancel mouseleave'), {
                action: 'end'
            }, self.swipeHandler);

            self.$list.on(addEventNS('click'), self.clickHandler);

            
            $(document).on(self.visibilityChange, $.proxy(self.visibility, self));

            if (opt.accessibility === true) {
                self.$list.on(addEventNS('keydown'), self.keyHandler);
            }

            if (opt.focusOnSelect === true) {
                $(self.$slideTrack).children().on(addEventNS('click'), self.selectHandler);
            }

            $(window).on(addEventNS('orientationchange') + '-' + self.instanceUid, $.proxy(self.orientationChange, self));
            $(window).on(addEventNS('resize') +'-' + self.instanceUid, $.proxy(self.resize, self));

            $('[draggable!=true]', self.$slideTrack).on('dragstart', self.preventDefault);

            $(window).on(addEventNS('load') + '-' + self.instanceUid, self.setPosition);
            $(document).on(addEventNS('ready') + '-' + self.instanceUid, self.setPosition);
        },
        initUI: function initUI() {

            var self = this,
                opt = self.options;

            if (opt.arrows === true && self.slideCount > opt.slidesToShow) {
                self.$prevArrow.show();
                self.$nextArrow.show();
            }

            if (opt.dots === true && self.slideCount > opt.slidesToShow) {
                self.$dots.show();
            }
        },
        keyHandler: function keyHandler(event) {

            var self = this,
                opt = self.options;
            //Dont slide if the cursor is inside the form fields and arrow keys are pressed
            if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
                if (event.keyCode === 37 && opt.accessibility === true) {
                    event.preventDefault();
                    self.changeSlide({
                        data: {
                            message: opt.rtl === true ? 'next' : 'previous'
                        }
                    });
                } else if (event.keyCode === 39 && opt.accessibility === true) {
                    event.preventDefault();
                    self.changeSlide({
                        data: {
                            message: opt.rtl === true ? 'previous' : 'next'
                        }
                    });
                }
            }
        },
        lazyLoad: function lazyLoad() {

            var self = this,
                opt = self.options,
                loadRange,
                cloneRange,
                rangeStart,
                rangeEnd;

            function loadImages(imagesScope) {

                $('img', imagesScope).each(function () {
                    var image = $(this);
                    image.on('load', function (e) {
                        if(!(image.hasClass('pc-only') || image.hasClass('mo-only') || image.hasClass('pc') || image.hasClass('mobile'))) {
                            image.css('display','inline-block');
                        }
                        self.setPosition();
                        self.triggerHandler(_N + 'lazyloaded', [self, image, image.attr('src')]);
                    });
                });

                $('img[data-lazy]', imagesScope).each(function () {

                    var image = $(this),
                        imageSource = $(this).attr('data-lazy'),
                        imageSrcSet = $(this).attr('data-srcset'),
                        imageSizes = $(this).attr('data-sizes') || self.$slider.attr('data-sizes');

                        image.css({opacity:1});

                        if (imageSrcSet) {
                            image.attr('srcset', imageSrcSet);

                            if (imageSizes) {
                                image.attr('sizes', imageSizes);
                            }
                        }

                        image.onerror = function () {
                            image.onerror = null;
                            image.removeAttr('data-lazy').removeClass(_V.LOADING).addClass(_N + '-lazyload-error').css({opacity:1});
                            self.triggerHandler(_N + 'lazyloadrrror', [self, image, imageSource]);
                        };
                        image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass(_V.LOADING);
                        
                        //imageToLoad = document.createElement('img');


                        /*
                    imageToLoad.onload = function () {

                        // image.animate({opacity: 0}, 100, function () {

                        //     if (imageSrcSet) {
                        //         image.attr('srcset', imageSrcSet);

                        //         if (imageSizes) {
                        //             image.attr('sizes', imageSizes);
                        //         }
                        //     }

                        //     image.attr('src', imageSource).animate({opacity: 1}, 0, function () {
                        //         image.removeAttr('data-lazy data-srcset data-sizes').removeClass(_V.LOADING);
                        //     });
                        //     self.triggerHandler(_N + 'lazyloaded', [self, image, imageSource]);
                        // });

                        image.css({opacity:1});

                        if (imageSrcSet) {
                            image.attr('srcset', imageSrcSet);

                            if (imageSizes) {
                                image.attr('sizes', imageSizes);
                            }
                        }

                        image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass(_V.LOADING);
                        
                        self.triggerHandler(_N + 'lazyloaded', [self, image, imageSource]);
                    };

                    imageToLoad.onerror = function () {

                        image.removeAttr('data-lazy').removeClass(_V.LOADING).addClass(_N + '-lazyload-error').css({opacity:1});

                        self.triggerHandler(_N + 'lazyloadrrror', [self, image, imageSource]);
                    };

                    imageToLoad.src = imageSource;
                    */
                });
            }

            if (opt.centerMode === true) {
                if (opt.infinite === true) {
                    rangeStart = self.currentSlide + (opt.slidesToShow / 2 + 1);
                    rangeEnd = rangeStart + opt.slidesToShow + 2;
                } else {
                    rangeStart = Math.max(0, self.currentSlide - (opt.slidesToShow / 2 + 1));
                    rangeEnd = 2 + (opt.slidesToShow / 2 + 1) + self.currentSlide;
                }
            } else {
                rangeStart = opt.infinite ? opt.slidesToShow + self.currentSlide : self.currentSlide;
                rangeEnd = Math.ceil(rangeStart + opt.slidesToShow);
                if (opt.fade === true) {
                    if (rangeStart > 0) rangeStart--;
                    if (rangeEnd <= self.slideCount) rangeEnd++;
                }
            }

            //임시 : 추가로 한개 더 가져오기 위함 화면사이즈가 이상한 폰
            if (rangeEnd <= self.slideCount) rangeEnd++;

            loadRange = self.$slider.find('.' + _V.SLIDE).slice(rangeStart, rangeEnd);

            if (opt.lazyLoad === 'anticipated') {
                var prevSlide = rangeStart - 1,
                    nextSlide = rangeEnd,
                    $slides = self.$slider.find('.' + _N);

                for (var i = 0; i < opt.slidesToScroll; i++) {
                    if (prevSlide < 0) prevSlide = self.slideCount - 1;
                    loadRange = loadRange.add($slides.eq(prevSlide));
                    loadRange = loadRange.add($slides.eq(nextSlide));
                    prevSlide--;
                    nextSlide++;
                }
            }

            loadImages(loadRange);

            if (self.slideCount <= opt.slidesToShow) {
                cloneRange = self.$slider.find('.' + _V.SLIDE);
                loadImages(cloneRange);
            } else if (self.currentSlide >= self.slideCount - opt.slidesToShow) {
                cloneRange = self.$slider.find('.' + _V.CLONED).slice(0, opt.slidesToShow);
                loadImages(cloneRange);
            } else if (self.currentSlide === 0) {
                cloneRange = self.$slider.find('.' + _V.CLONED).slice(opt.slidesToShow * -1);
                loadImages(cloneRange);
            }
        },
        loadSlider: function loadSlider() {

            var self = this,
                opt = self.options;


            
            // 추가
            // var slidecw = self.$slideTrack.children('.' + _V.SLIDE).children().first().css('width');
            // self.widthUnit = slidecw.indexOf('%') > 0 ? '%' : 'px';
            // self.initSlideWidth = self.$slideTrack.children('.' + _V.SLIDE).children().first().width();
            // self.slideMaxWidth = self.$slideTrack.children('.' + _V.SLIDE).children().first().css('max-width');




            self.setPosition();

            self.$slideTrack.css({
                opacity: 1
            });

            self.$slideTrack.children('.' + _V.SLIDE).show(); // 210327 추가
            self.$slider.removeClass(_V.LOADING);

            self.initUI();
            if (opt.lazyLoad === 'progressive') {
                
                // 임시 response 이미지 체크 루틴
                //2021-03-10 정승우
                var $imgsToLoad = $('img[data-pc-src][data-m-src],img[data-lazy]', self.$slider);
                $imgsToLoad.each(function () {
                    var image = $(this);
                    image.on('load', function (e) {
                        if(!(image.hasClass('pc-only') || image.hasClass('mo-only') || image.hasClass('pc') || image.hasClass('mobile'))) {
                            image.css('display','inline-block');
                        }
                        self.setPosition();
                        self.triggerHandler(_N + 'lazyloaded', [self, image, image.attr('src')]);
                    });
                });
                ////임시 response 이미지 체크 루틴
                self.progressiveLazyLoad();
            }
        },
        next: function next() {

            var self = this,
                opt = self.options;

            self.changeSlide({
                data: {
                    message: 'next'
                }
            });
        },
        orientationChange: function orientationChange() {

            var self = this,
                opt = self.options;

            self.checkResponsive();
            self.setPosition();
        },
        stop: function stop() {
            this.pause();
        },
        pause: function pause() {

            var self = this,
                opt = self.options;

            self.autoPlayClear();
            self.triggerHandler(_N + 'stop', [self]);
            self.paused = true;
        },
        play: function play() {

            var self = this,
                opt = self.options;

            self.autoPlay();
            self.triggerHandler(_N + 'play', [self]);
            opt.autoplay = true;
            self.paused = false;
            self.focussed = false;
            self.interrupted = false;
        },

        /** startTransition 기능추가*/
        startTransition: function startTransition(idx) {
            var self = this;    

            if(!self.$slides) return;
            var $target, startCss, endCss,  aniObj, obj;  
            var $currentTarget = $(self.$slides.get(idx));
            var $obj = $currentTarget.find('[data-p-ani]');            

            if(idx == self.previousSlide) return;

            self.setCssPosition(idx);
            
            $obj.each(function () {
                $target = $(this);
                startCss = $target.data('pStart');
                endCss = $target.data('pEnd');
                aniObj = $target.data('pAni');
                if (startCss && endCss && aniObj) {
                    obj = {
                        duration: aniObj.speed || 500,
                        delay: aniObj.delay || 0,
                        easing: aniObj.easing || 'easeInOutQuad'
                    };
                    $target.css(startCss).transition($.extend(endCss, obj));
                }
            });


            var $obj2 = $currentTarget.find('[data-p-ani2]');       
            
            $obj2.each(function () {
                $target = $(this);
                startCss = $target.data('pStart2');
                endCss = $target.data('pEnd2');
                aniObj = $target.data('pAni2');
                if (startCss && endCss && aniObj) {
                    obj = {
                        duration: aniObj.speed || 500,
                        delay: aniObj.delay || 0,
                        easing: aniObj.easing || 'easeInOutQuad'
                    };
                    $target.transition($.extend(endCss, obj));
                }
            });
            
        },

        setCssPosition: function setCssPosition(idx) {
            var self = this;
            var $target, startCss, aniObj,  aniObj, $obj;

            self.$slideTrack.children('.' + _V.SLIDE).each(function(i, target){

                if(!$(target).hasClass('on')){
                    
                    $obj = $(target).find('[data-p-ani]');
                    $obj.each(function () {
                        $target = $(this);
                        startCss = $target.data('pStart');
                        aniObj = $target.data('pAni');
                        if (startCss && aniObj) {                    
                            $target.css(startCss);
                        }
                    });
                }
            });

        },



        postSlide: function postSlide(index) {

            var self = this,
                opt = self.options;

            if (!self.unbuilded) 
            {
                self.triggerHandler(_N + 'afterchange', [self, index]);
                self.startTransition(index);

                self.animating = false;

                if (self.slideCount > opt.slidesToShow) {
                    self.setPosition();
                }

                self.swipeLeft = null;

                if (opt.autoplay) {
                    self.autoPlay();
                }

                if (opt.accessibility === true) {
                    self.initADA();

                    if (opt.focusOnChange) {
                        var $currentSlide = $(self.$slides.get(self.currentSlide));
                        $currentSlide.attr('tabindex', 0).focus();
                    }
                }

                ////self.$slider.find('.' + _V.SLIDE).not('.' + _V.CURRENT).css('visibility', 'hidden');
            }
        },
        prev: function prev() {

            var self = this,
                opt = self.options;

            self.changeSlide({
                data: {
                    message: 'previous'
                }
            });
        },
        preventDefault: function preventDefault(event) {

            event.preventDefault();
        },
        progressiveLazyLoad: function progressiveLazyLoad(tryCount) {

            tryCount = tryCount || 1;

            var self = this,
                opt = self.options,
                $imgsToLoad = $('img[data-lazy]', self.$slider),
                image,
                imageSource,
                imageSrcSet,
                imageSizes;
                //imageToLoad;

            if ($imgsToLoad.length) {

                image = $imgsToLoad.first();
                imageSource = image.attr('data-lazy');
                imageSrcSet = image.attr('data-srcset');
                imageSizes = image.attr('data-sizes') || self.$slider.attr('data-sizes');
                
                image.onerror = function () {
                    if (tryCount < 2) {

                        setTimeout(function () {
                            self.progressiveLazyLoad(tryCount + 1);
                        }, 500);
                    } else {

                        image.removeAttr('data-lazy').removeClass(_V.LOADING).addClass(_N + '-lazyload-error');

                        self.triggerHandler(_N + 'lazyloaderror', [self, image, imageSource]);

                        self.progressiveLazyLoad();
                    }
                };
                image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass(_V.LOADING);
                /*
                imageToLoad = document.createElement('img');

                imageToLoad.onload = function () {

                    if (imageSrcSet) {
                        image.attr('srcset', imageSrcSet);

                        if (imageSizes) {
                            image.attr('sizes', imageSizes);
                        }
                    }

                    image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass(_V.LOADING);

                    if (opt.adaptiveHeight === true) {
                        self.setPosition();
                    }
                    image.animate({'opacity':1});
                    self.triggerHandler(_N + 'lazyloaded', [self, image, imageSource]);
                    self.progressiveLazyLoad();
                };

                imageToLoad.onerror = function () {

                    if (tryCount < 3) {

                        setTimeout(function () {
                            self.progressiveLazyLoad(tryCount + 1);
                        }, 500);
                    } else {

                        image.removeAttr('data-lazy').removeClass(_V.LOADING).addClass(_N + '-lazyload-error');

                        self.triggerHandler(_N + 'lazyloaderror', [self, image, imageSource]);

                        self.progressiveLazyLoad();
                    }
                };

                imageToLoad.src = imageSource;
                */
            } else {
                self.triggerHandler(_N + 'allimagesloaded', [self]);
            }
        },
        refresh: function refresh(initializing) {

            var self = this,
                opt = self.options,
                currentSlide,
                lastVisibleIndex;

            lastVisibleIndex = self.slideCount - opt.slidesToShow;

            // in non-infinite sliders, we don't want to go past the
            // last visible index.
            if (!opt.infinite && self.currentSlide > lastVisibleIndex) {
                self.currentSlide = lastVisibleIndex;
            }

            // if less slides than to show, go to start.
            if (self.slideCount <= opt.slidesToShow) {
                self.currentSlide = 0;
            }

            currentSlide = self.currentSlide;

            self.destroy(true);

            $.extend(self, componentInitials, {currentSlide: currentSlide});

            self.init();

            if (!initializing) {

                self.changeSlide({
                    data: {
                        message: 'index',
                        index: currentSlide
                    }
                }, false);
            }
        },
        registerBreakpoints: function registerBreakpoints() {

            var self = this,
                opt = self.options,
                breakpoint,
                currentBreakpoint,
                l,
                responsiveSettings = opt.responsive || null;

            if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {

                self.respondTo = opt.respondTo || 'window';

                for (breakpoint in responsiveSettings) {

                    l = self.breakpoints.length - 1;

                    if (responsiveSettings.hasOwnProperty(breakpoint)) {
                        currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                        // loop through the breakpoints and cut out any existing
                        // ones with the same breakpoint number, we don't want dupes.
                        while (l >= 0) {
                            if (self.breakpoints[l] && self.breakpoints[l] === currentBreakpoint) {
                                self.breakpoints.splice(l, 1);
                            }
                            l--;
                        }

                        self.breakpoints.push(currentBreakpoint);
                        self.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
                    }
                }

                self.breakpoints.sort(function (a, b) {
                    return opt.mobileFirst ? a - b : b - a;
                });

                var r = self._getTargetBreakpoint();
                if (r) {
                    self.options.slidesToScroll = self.breakpointSettings[r].slidesToScroll;
                    self.options.slidesToShow = self.breakpointSettings[r].slidesToScroll;
                }
            }
        },
        reinit: function reinit() {

            var self = this,
                opt = self.options;

            if (opt.rows > 1) {
                self.buildRows();
                self.buildOut();
            } else {
                self.$slides = self.$slideTrack.children(opt.slide).addClass(_V.SLIDE);
            }

            self.currentSlide = opt.initialSlide;
            self.slideCount = self.$slides.length;

            if (self.currentSlide >= self.slideCount && self.currentSlide !== 0) {
                self.currentSlide = self.currentSlide - opt.slidesToScroll;
            }

            if (self.slideCount <= opt.slidesToShow) {
                self.currentSlide = 0;
            }

            self.registerBreakpoints();

            self.setProps();
            self.setupInfinite();
            self.buildArrows();
            self.updateArrows();
            self.initArrowEvents();
            self.buildDots();
            self.updateDots();
            self.initDotEvents();
            self.cleanUpSlideEvents();
            self.initSlideEvents();

            self.checkResponsive(false, true);

            if (opt.focusOnSelect === true) {
                $(self.$slideTrack).children().on(addEventNS('click'), self.selectHandler);
            }

            self.setSlideClasses(typeof self.currentSlide === 'number' ? self.currentSlide : 0);

            self.setPosition();
            self.focusHandler();

            self.paused = !opt.autoplay;
            self.autoPlay();
            self.resize();
            self.triggerHandler(_N + 'reinit', [self]);

        },
        resize: function resize() {

            var self = this,
                opt = self.options;
            

            //if ($(window).width() !== self.windowWidth) {
                clearTimeout(self.windowDelay);
                self.windowDelay = window.setTimeout(function () {
                    self.windowWidth = $(window).width();
                    self.checkResponsive();
                    if (!self.unbuilded) {
                        self.setPosition();
                    }

                    if(self.$el && self.$el[0]){

                        if (self.$el.find('.indi-wrap').find('li').length < 2){
                            self.$el.find('.indi-wrap').hide();
            
                            self.$el.addClass('slide-solo');
                        } else {
                            self.$el.find('.indi-wrap').show();
            
                            self.$el.removeClass('slide-solo');
                        }
                    }

                    self.triggerHandler(_N + 'resize', [self, self.currentSlide]);

                }, 50);
            //}
        },
        removeSlide: function removeSlide(index, removeBefore, removeAll) {

            var self = this,
                opt = self.options;

            if (typeof index === 'boolean') {
                removeBefore = index;
                index = removeBefore === true ? 0 : self.slideCount - 1;
            } else {
                index = removeBefore === true ? --index : index;
            }

            if (self.slideCount < 1 || index < 0 || index > self.slideCount - 1) {
                return false;
            }

            self.unload();

            if (removeAll === true) {
                self.$slideTrack.children().remove();
            } else {
                self.$slideTrack.children(opt.slide).eq(index).remove();
            }

            self.$slides = self.$slideTrack.children(opts.slide);

            self.$slideTrack.children(opt.slide).detach();

            self.$slideTrack.append(self.$slides);

            self.$slidesCache = self.$slides;

            self.reinit();
        },
        setCSS: function setCSS(position) {

            var self = this,
                opt = self.options,
                positionProps = {},
                x,
                y;

            if (opt.rtl === true) {
                position = -position;
            }
            x = self.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
            y = self.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

            positionProps[self.positionProp] = position;

            if (self.transformsEnabled === false) {
                self.$slideTrack.css(positionProps);
            } else {
                positionProps = {};
                if (self.cssTransitions === false) {
                    positionProps[self.animType] = 'translate(' + x + ', ' + y + ')';
                    self.$slideTrack.css(positionProps);
                } else {
                    positionProps[self.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                    self.$slideTrack.css(positionProps);
                }
            }
        },
        setDimensions: function setDimensions() {

            var self = this,
                opt = self.options;

            if (opt.vertical === false) {
                if (opt.centerMode === true) {
                    self.$list.css({
                        padding: '0px ' + opt.centerPadding
                    });
                }
            } else {
                self.$list.height(self.$slides.first().outerHeight(true) * opt.slidesToShow);
                if (opt.centerMode === true) {
                    self.$list.css({
                        padding: opt.centerPadding + ' 0px'
                    });
                }
            }
        
            // 추가
            // var paddingleft = parseInt(self.$list.css('padding-left'));
            // self.$list.css('padding-left', 0);

            // var slidecont = self.$slideTrack.children('.' + _V.SLIDE).children().first();
            // var maxwidth = parseInt(slidecont.css('max-width'));
            // var marginleft = parseInt(slidecont.css('margin-left'));
            // var marginright = parseInt(slidecont.css('margin-right'));

            // var slidew;
            // if(self.widthUnit == 'px'){
            //     slidew = self.initSlideWidth;
            // } else{
            //     slidew = $('#wrap').width() * (self.initSlideWidth/100);
            // }
            // if(slidew == 0) slidew = self.$el.width();
            // else if(slidew > maxwidth) slidew = maxwidth;

            // self.$slideTrack.children('.' + _V.SLIDE).children().first().width(slidew);
            // 추가 end



            //self.$slideTrack.css('width', '');
            self.listWidth = self.$list.width();
            self.listHeight = self.$list.height();

            if (opt.vertical === false && opt.variableWidth === false) {
                self.slideWidth = Math.ceil(self.listWidth / opt.slidesToShow);
                self.$slideTrack.width(Math.ceil(self.slideWidth * self.$slideTrack.children('.' + _V.SLIDE).length) + opt.additionWidth);
            } else if (opt.variableWidth === true) {
                self.$slideTrack.width((5000 * self.slideCount) + opt.additionWidth);
            } else {
                self.slideWidth = Math.ceil(self.listWidth);
                self.$slideTrack.height(Math.ceil(self.$slides.first().outerHeight(true) * self.$slideTrack.children('.' + _V.SLIDE).length));
            }

            if (opt.variableWidth === false) {
                var offset = self.$slides.first().outerWidth(true) - self.$slides.first().width();
                self.$slideTrack.children('.' + _V.SLIDE).width(self.slideWidth - offset);
            }
        },
        update: function () {
            this.setDimensions();
        },

        setFade: function setFade() {

            var self = this,
                opt = self.options,
                targetLeft;

            self.$slides.each(function (index, element) {
                targetLeft = self.slideWidth * index * -1;
                if (opt.rtl === true) {
                    $(element).css({
                        position: 'relative',
                        right: targetLeft,
                        top: 0,
                        //zIndex: opt.zIndex - 2,
                        opacity: 0
                    });
                } else {
                    $(element).css({
                        position: 'relative',
                        left: targetLeft,
                        top: 0,
                        //zIndex: opt.zIndex - 2,
                        opacity: 0
                    });
                }
            });

            self.$slides.eq(self.currentSlide).css({
                //zIndex: opt.zIndex - 1,
                opacity: 1
            });
        },
        setHeight: function setHeight() {

            var self = this,
                opt = self.options;

            if (opt.slidesToShow === 1 && opt.adaptiveHeight === true && opt.vertical === false) {
                var targetHeight = self.$slides.eq(self.currentSlide).outerHeight(true);
                self.$list.css('height', targetHeight);
            }
        },
        setOption: function setOption() {

            /**
             * accepts arguments in format of:
             *
             *  - for changing a single option's value:
             *     .slick("setOption", option, value, refresh )
             *
             *  - for changing a set of responsive options:
             *     .slick("setOption", 'responsive', [{}, ...], refresh )
             *
             *  - for updating multiple values at once (not responsive)
             *     .slick("setOption", { 'option': value, ... }, refresh )
             */

            var self = this,
                opt = self.options,
                l,
                item,
                option,
                value,
                refresh = false,
                type;

            if ($.type(arguments[0]) === 'object') {

                option = arguments[0];
                refresh = arguments[1];
                type = 'multiple';
            } else if ($.type(arguments[0]) === 'string') {

                option = arguments[0];
                value = arguments[1];
                refresh = arguments[2];

                if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {

                    type = 'responsive';
                } else if (typeof arguments[1] !== 'undefined') {

                    type = 'single';
                }
            }

            if (type === 'single') {

                opt[option] = value;
            } else if (type === 'multiple') {

                $.each(option, function (item, val) {
                    opt[item] = val;
                });
            } else if (type === 'responsive') {

                for (item in value) {

                    if ($.type(opt.responsive) !== 'array') {

                        opt.responsive = [value[item]];
                    } else {

                        l = opt.responsive.length - 1;

                        // loop through the responsive object and splice out duplicates.
                        while (l >= 0) {

                            if (opt.responsive[l].breakpoint === value[item].breakpoint) {

                                opt.responsive.splice(l, 1);
                            }

                            l--;
                        }

                        opt.responsive.push(value[item]);
                    }
                }
            }

            if (refresh) {

                self.unload();
                self.reinit();
            }
        },
        setPosition: function setPosition() {

            var self = this,
                opt = self.options;

            if (!self.el || !self.$el.is(':visible')) {
                return;
            }

            self.setDimensions();

            self.setHeight();

            if (opt.fade === false) {
                self.setCSS(self.getLeft(self.currentSlide));
            } else {
                self.setFade();
            }

            self.triggerHandler(_N + 'setposition', [self]);
        },
        setProps: function setProps() {

            var self = this,
                opt = self.options,
                bodyStyle = document.body.style;

            self.positionProp = opt.vertical === true ? 'top' : 'left';

            if (self.positionProp === 'top') {
                self.$slider.addClass(_N + '-vertical');
            } else {
                self.$slider.removeClass(_N + '-vertical');
            }

            if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
                if (opt.useCSS === true) {
                    self.cssTransitions = true;
                }
            }

            if (opt.fade) {
                if (typeof opt.zIndex === 'number') {
                    if (opt.zIndex < 3) {
                        opt.zIndex = 3;
                    }
                } else {
                    opt.zIndex = self.defaults.zIndex;
                }
            }

            if (bodyStyle.OTransform !== undefined) {
                self.animType = 'OTransform';
                self.transformType = '-o-transform';
                self.transitionType = 'OTransition';
                if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) self.animType = false;
            }
            if (bodyStyle.MozTransform !== undefined) {
                self.animType = 'MozTransform';
                self.transformType = '-moz-transform';
                self.transitionType = 'MozTransition';
                if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) self.animType = false;
            }
            if (bodyStyle.webkitTransform !== undefined) {
                self.animType = 'webkitTransform';
                self.transformType = '-webkit-transform';
                self.transitionType = 'webkitTransition';
                if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) self.animType = false;
            }
            if (bodyStyle.msTransform !== undefined) {
                self.animType = 'msTransform';
                self.transformType = '-ms-transform';
                self.transitionType = 'msTransition';
                if (bodyStyle.msTransform === undefined) self.animType = false;
            }
            if (bodyStyle.transform !== undefined && self.animType !== false) {
                self.animType = 'transform';
                self.transformType = 'transform';
                self.transitionType = 'transition';
            }
            self.transformsEnabled = opt.useTransform && self.animType !== null && self.animType !== false;
        },
        setSlideClasses: function setSlideClasses(index) {

            var self = this,
                opt = self.options,
                centerOffset,
                allSlides,
                indexOffset,
                remainder;

            allSlides = self.$slider.find('.' + _V.SLIDE).removeClass(opt.activeClass + ' ' + _V.CENTER + ' ' + _V.CURRENT).attr('aria-hidden', 'true');

            self.$slides.eq(index).addClass(_V.CURRENT);

            if (opt.centerMode === true) {

                var evenCoef = opt.slidesToShow % 2 === 0 ? 1 : 0;

                centerOffset = Math.floor(opt.slidesToShow / 2);

                if (opt.infinite === true) {

                    if (index >= centerOffset && index <= self.slideCount - 1 - centerOffset) {
                        self.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass(opt.activeClass).attr('aria-hidden', 'false');
                    } else {

                        indexOffset = opt.slidesToShow + index;
                        allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass(opt.activeClass).attr('aria-hidden', 'false');
                    }

                    if (index === 0) {

                        allSlides.eq(allSlides.length - 1 - opt.slidesToShow).addClass(_V.CENTER);
                    } else if (index === self.slideCount - 1) {

                        allSlides.eq(opt.slidesToShow).addClass(_V.CENTER);
                    }
                }

                self.$slides.eq(index).addClass(_V.CENTER);
            } else {

                if (index >= 0 && index <= self.slideCount - opt.slidesToShow) {

                    self.$slides.slice(index, index + opt.slidesToShow).addClass(opt.activeClass).attr('aria-hidden', 'false');
                } else if (allSlides.length <= opt.slidesToShow) {

                    allSlides.addClass(opt.activeClass).attr('aria-hidden', 'false');
                } else {

                    remainder = self.slideCount % opt.slidesToShow;
                    indexOffset = opt.infinite === true ? opt.slidesToShow + index : index;

                    if (opt.slidesToShow == opt.slidesToScroll && self.slideCount - index < opt.slidesToShow) {

                        allSlides.slice(indexOffset - (opt.slidesToShow - remainder), indexOffset + remainder).addClass(opt.activeClass).attr('aria-hidden', 'false');
                    } else {

                        allSlides.slice(indexOffset, indexOffset + opt.slidesToShow).addClass(opt.activeClass).attr('aria-hidden', 'false');
                    }
                }
            }

            if (opt.lazyLoad === 'ondemand' || opt.lazyLoad === 'anticipated') {
                self.lazyLoad();
            }
        },
        setupInfinite: function setupInfinite() {

            var self = this,
                opt = self.options,
                i,
                slideIndex,
                infiniteCount;

            if (opt.fade === true) {
                opt.centerMode = false;
            }

            if (opt.infinite === true && opt.fade === false) {

                slideIndex = null;


                if (self.slideCount > opt.slidesToShow) {

                    if (opt.centerMode === true) {
                        infiniteCount = opt.slidesToShow + 1;
                    } else {
                        infiniteCount = opt.slidesToShow;
                    }

                    for (i = self.slideCount; i > self.slideCount - infiniteCount; i -= 1) {
                        slideIndex = i - 1;
                        $(self.$slides[slideIndex]).clone(true).attr('id', '').attr('data-' + _V.INDEX, slideIndex - self.slideCount).prependTo(self.$slideTrack).addClass(_V.CLONED);
                    }
                    for (i = 0; i < infiniteCount; i += 1) {
                        slideIndex = i;
                        $(self.$slides[slideIndex]).clone(true).attr('id', '').attr('data-' + _V.INDEX, slideIndex + self.slideCount).appendTo(self.$slideTrack).addClass(_V.CLONED);
                    }
                    self.$slideTrack.find('.' + _V.CLONED).find('[id]').each(function () {
                        $(this).attr('id', '');
                    });
                }
            }
        },
        interrupt: function interrupt(toggle) {

            var self = this,
                opt = self.options;

            if (!toggle) {
                self.autoPlay();
            }
            self.interrupted = toggle;
        },
        selectHandler: function selectHandler(event) {

            var self = this,
                opt = self.options;

            var targetElement = $(event.target).is('.' + _V.SLIDE) ? $(event.target) : $(event.target).parents('.' + _V.SLIDE);

            var index = parseInt(targetElement.attr('data-' + _V.INDEX));

            if (!index) index = 0;

            if (self.slideCount <= opt.slidesToShow) {

                self.slideHandler(index, false, true);
                return;
            }

            self.slideHandler(index);
        },
        slideHandler: function slideHandler(index, sync, dontAnimate) {

            var targetSlide,
                animSlide,
                oldSlide,
                slideLeft,
                targetLeft = null,
                self = this,
                opt = self.options,
                navTarget;

            sync = sync || false;

            if (self.animating === true && opt.waitForAnimate === true) {
                return;
            }

            if (opt.fade === true && self.currentSlide === index) {
                return;
            }

            targetSlide = index;
            targetLeft = self.getLeft(targetSlide);
            slideLeft = self.getLeft(self.currentSlide);

            self.currentLeft = self.swipeLeft === null ? slideLeft : self.swipeLeft;

            if (opt.infinite === false && opt.centerMode === false && (index < 0 || index > self.getDotCount() * opt.slidesToScroll)) {
                if (opt.fade === false) {
                    targetSlide = self.currentSlide;
                    if (dontAnimate !== true) {
                        self.animateSlide(slideLeft, function () {
                            self.postSlide(targetSlide);
                        });
                    } else {
                        self.postSlide(targetSlide);
                    }
                }
                return;
            } else if (opt.infinite === false && opt.centerMode === true && (index < 0 || index > self.slideCount - opt.slidesToScroll)) {
                if (opt.fade === false) {
                    targetSlide = self.currentSlide;
                    if (dontAnimate !== true) {
                        self.animateSlide(slideLeft, function () {
                            self.postSlide(targetSlide);
                        });
                    } else {
                        self.postSlide(targetSlide);
                    }
                }
                return;
            }

            if (opt.autoplay) {
                clearInterval(self.autoPlayTimer);
            }

            if (targetSlide < 0) {
                if (self.slideCount % opt.slidesToScroll !== 0) {
                    animSlide = self.slideCount - self.slideCount % opt.slidesToScroll;
                } else {
                    animSlide = self.slideCount + targetSlide;
                }
            } else if (targetSlide >= self.slideCount) {
                if (self.slideCount % opt.slidesToScroll !== 0) {
                    animSlide = 0;
                } else {
                    animSlide = targetSlide - self.slideCount;
                }
            } else {
                animSlide = targetSlide;
            }

            self.animating = true;

            self.triggerHandler(_N + 'beforechange', [self, self.currentSlide, animSlide]);

            oldSlide = self.currentSlide;
            self.previousSlide = oldSlide;
            self.currentSlide = animSlide;

            self.setSlideClasses(self.currentSlide);

            if (opt.asNavFor) {

                navTarget = self.getNavTarget();
                navTarget = navTarget.vcCarousel('instance');

                if (navTarget.slideCount <= navTarget.options.slidesToShow) {
                    navTarget.setSlideClasses(self.currentSlide);
                }

                if (sync === false) {
                    self.asNavFor(self.currentSlide);
                }
            }

            self.updateDots();
            self.updateArrows();

            if (opt.fade === true) {
                if (dontAnimate !== true) {

                    self.fadeSlideOut(oldSlide);

                    self.fadeSlide(animSlide, function () {
                        self.postSlide(animSlide);
                    });
                } else {
                    self.postSlide(animSlide);
                }
                self.animateHeight();
                return;
            }

            if (dontAnimate !== true) {
                self.animateSlide(targetLeft, function () {
                    self.postSlide(animSlide);
                });
            } else {
                self.postSlide(animSlide);
            }
        },
        startLoad: function startLoad() {

            var self = this,
                opt = self.options;

            if (opt.arrows === true && self.slideCount > opt.slidesToShow) {
                self.$prevArrow.hide();
                self.$nextArrow.hide();
            }

            if (opt.dots === true && self.slideCount >= opt.slidesToShow) {
                self.$dots.hide();
            }

            self.$slider.addClass(_V.LOADING);
        },
        swipeDirection: function swipeDirection() {

            var xDist,
                yDist,
                r,
                swipeAngle,
                self = this,
                opt = self.options;

            xDist = self.touchObject.startX - self.touchObject.curX;
            yDist = self.touchObject.startY - self.touchObject.curY;
            r = Math.atan2(yDist, xDist);

            swipeAngle = Math.round(r * 180 / Math.PI);
            if (swipeAngle < 0) {
                swipeAngle = 360 - Math.abs(swipeAngle);
            }

            if (swipeAngle <= 45 && swipeAngle >= 0) {
                return opt.rtl === false ? 'left' : 'right';
            }
            if (swipeAngle <= 360 && swipeAngle >= 315) {
                return opt.rtl === false ? 'left' : 'right';
            }
            if (swipeAngle >= 135 && swipeAngle <= 225) {
                return opt.rtl === false ? 'right' : 'left';
            }
            if (opt.verticalSwiping === true) {
                if (swipeAngle >= 35 && swipeAngle <= 135) {
                    return 'down';
                } else {
                    return 'up';
                }
            }

            if (self.options.preventVertical) {
                return xDist < 0 ? 'right' : 'left';
            }

            return 'vertical';
        },
        swipeEnd: function swipeEnd(event) {

            var self = this,
                opt = self.options,
                slideCount,
                direction;

            self.dragging = false;
            self.swiping = false;

            if (self.scrolling) {
                self.scrolling = false;
                return false;
            }

            self.interrupted = false;
            self.shouldClick = self.touchObject.swipeLength > 10 ? false : true;

            if (self.touchObject.curX === undefined) {
                return false;
            }

            if (self.touchObject.edgeHit === true) {
                self.triggerHandler(_N + 'edge', [self, self.swipeDirection()]);
            }


            if (self.touchObject.swipeLength >= self.touchObject.minSwipe) {

                direction = self.swipeDirection();

                switch (direction) {

                    case 'left':
                    case 'down':

                        slideCount = opt.swipeToSlide ? self.checkNavigable(self.currentSlide + self.getSlideCount()) : self.currentSlide + self.getSlideCount();
                        self.currentDirection = 0;

                        break;

                    case 'right':
                    case 'up':

                        slideCount = opt.swipeToSlide ? self.checkNavigable(self.currentSlide - self.getSlideCount()) : self.currentSlide - self.getSlideCount();
                        self.currentDirection = 1;

                        break;

                    default:

                }

                if (direction != 'vertical') {
                    self.slideHandler(slideCount);
                    self.touchObject = {};
                    self.triggerHandler(_N + 'swipe', [self, direction]);

                }
            } else {

                if (self.touchObject.startX !== self.touchObject.curX) {
                    self.slideHandler(self.currentSlide);
                    self.touchObject = {};
                }
            }
        },
        swipeHandler: function swipeHandler(event) {

            var self = this,
                opt = self.options;


            if (opt.swipe === false || 'ontouchend' in document && opt.swipe === false) {
                return;
            } else if (opt.draggable === false && event.type.indexOf('mouse') !== -1) {
                return;
            }

            self.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;

            self.touchObject.minSwipe = self.listWidth / opt.touchThreshold;

            if (opt.verticalSwiping === true) {
                self.touchObject.minSwipe = self.listHeight / opt.touchThreshold;
            }

            // console.log(event.data.action);

            switch (event.data.action) {

                case 'start':
                    self.swipeStart(event);
                    break;

                case 'move':
                    self.swipeMove(event);
                    break;

                case 'end':
                    self.swipeEnd(event);
                    break;

            }
        },
        swipeMove: function swipeMove(event) {

            var self = this,
                opt = self.options,
                edgeWasHit = false,
                curLeft,
                swipeDirection,
                swipeLength,
                positionOffset,
                touches,
                verticalSwipeLength;

            touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

            if (!self.dragging || self.scrolling || touches && touches.length !== 1) {
                return false;
            }

            curLeft = self.getLeft(self.currentSlide);

            self.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
            self.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

            self.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(self.touchObject.curX - self.touchObject.startX, 2)));

            verticalSwipeLength = Math.round(Math.sqrt(Math.pow(self.touchObject.curY - self.touchObject.startY, 2)));


            if (!opt.verticalSwiping && !self.swiping && verticalSwipeLength > 4) {
                self.scrolling = true;
                return false;
            }

            if (opt.verticalSwiping === true) {
                self.touchObject.swipeLength = verticalSwipeLength;
            }

            swipeDirection = self.swipeDirection();

            if (opt.preventVertical && self.swiping) {
                event.stopPropagation();
                event.preventDefault();
            }

            if (event.originalEvent !== undefined && self.touchObject.swipeLength > 4) {
                self.swiping = true;
                event.preventDefault();
            }

            positionOffset = (opt.rtl === false ? 1 : -1) * (self.touchObject.curX > self.touchObject.startX ? 1 : -1);
            if (opt.verticalSwiping === true) {
                positionOffset = self.touchObject.curY > self.touchObject.startY ? 1 : -1;
            }

            swipeLength = self.touchObject.swipeLength;

            self.touchObject.edgeHit = false;

            if (opt.infinite === false) {
                if (self.currentSlide === 0 && swipeDirection === 'right' || self.currentSlide >= self.getDotCount() && swipeDirection === 'left') {
                    swipeLength = self.touchObject.swipeLength * opt.edgeFriction;
                    self.touchObject.edgeHit = true;
                }
            }

            if (opt.vertical === false) {
                self.swipeLeft = curLeft + swipeLength * positionOffset;
            } else {
                self.swipeLeft = curLeft + swipeLength * (self.$list.height() / self.listWidth) * positionOffset;
            }
            if (opt.verticalSwiping === true) {
                self.swipeLeft = curLeft + swipeLength * positionOffset;
            }
            self.triggerHandler(_N + 'swipestart', [self]);

            if (opt.fade === true || opt.touchMove === false) {
                return false;
            }

            if (self.animating === true) {
                self.swipeLeft = null;
                return false;
            }

            self.setCSS(self.swipeLeft);
        },
        swipeStart: function swipeStart(event) {

            var self = this,
                opt = self.options,
                touches;

            self.interrupted = true;

            if (self.touchObject.fingerCount !== 1 || self.slideCount <= opt.slidesToShow) {
                self.touchObject = {};
                return false;
            }

            if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
                touches = event.originalEvent.touches[0];
            }

            self.touchObject.startX = self.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
            self.touchObject.startY = self.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

            self.dragging = true;

            /////self.$slider.find('.' + _V.SLIDE).css('visibility', '');
        },
        unfilterSlides: function unfilterSlides() {

            var self = this,
                opt = self.options;

            if (self.$slidesCache !== null) {

                self.unload();

                self.$slideTrack.children(opt.slide).detach();

                self.$slidesCache.appendTo(self.$slideTrack);

                self.reinit();
            }
        },
        unload: function unload() {

            var self = this,
                opt = self.options;

            $('.' + _V.CLONED, self.$slider).remove();

            if (self.$dots) {
                self.$dots.remove();
            }

            if (self.$prevArrow && self.htmlExpr.test(opt.prevArrow)) {
                self.$prevArrow.remove();
            }

            if (self.$nextArrow && self.htmlExpr.test(opt.nextArrow)) {
                self.$nextArrow.remove();
            }

            self.$slides.removeClass(_V.SLIDE + ' ' + opt.activeClass + ' ' + _V.VISIBLE + ' ' + _V.CURRENT).attr('aria-hidden', 'true').css('width', '');
        },
        unbuild: function unbuild(fromBreakpoint) {

            var self = this,
                opt = self.options;
            self.triggerHandler(_V.UNBUILD, [self, fromBreakpoint]);
            self.destroy();
        },
        updateArrows: function updateArrows() {

            var self = this,
                opt = self.options,
                centerOffset;

            //centerOffset = Math.floor(opt.slidesToShow / 2);

            if (opt.arrows === true && self.slideCount > opt.slidesToShow && !opt.infinite) {
                self._updateArrow(self.$prevArrow, true);
                self._updateArrow(self.$nextArrow, true);

                if (self.currentSlide === 0) {
                    self._updateArrow(self.$prevArrow, false);
                } else if (self.currentSlide >= self.slideCount - opt.slidesToShow && opt.centerMode === false) {
                    self._updateArrow(self.$nextArrow, false);
                } else if (self.currentSlide >= self.slideCount - 1 && opt.centerMode === true) {
                    self._updateArrow(self.$nextArrow, false);
                }
            }
        },
        _updateArrow: function ($arrow, flag) {
            var self = this;
            var opts = self.options;

            switch (opts.arrowsUpdate) {
                case 'disabled':
                    $arrow[flag ? 'removeClass' : 'addClass'](_V.DISABLED)
                        .prop('disabled', !flag)
                        .attr('aria-disabled', (!flag).toString());
                    break;
                case 'toggle':
                    $arrow.toggle(flag);
                    break;
            }
        },
        updateDots: function updateDots() {

            var self = this,
                opt = self.options;

            self.$dots.show();

            if (self.$dots.length) {
                self.$dots.find('li').removeClass(opt.activeClass).eq(Math.floor(self.currentSlide / opt.slidesToScroll)).addClass(opt.activeClass);
            }
        },
        visibility: function visibility() {

            var self = this,
                opt = self.options;

            if (opt.autoplay) {
                self.interrupted = !!document[self.hidden];
            }
        }
    });

    return Carousel;
});

vcui.define('ui/toggleCarousel', ['jquery', 'vcui', 'ui/carousel'], function ($, core) {
    "use strict";

    var ToggleCarousel = core.ui('ToggleCarousel', {
        bindjQuery: 'toggleCarousel',
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self._setting();
            self._bindEvents();
        },

        _bindEvents: function(){
            var self = this;

            $(window).off("breakpointchange.togglecarousel").on("breakpointchange.togglecarousel", function(){
                self._setting();
            })
        },

        _setting: function(){
            var self = this;

            var options = window.breakpoint.name == "mobile" ? self.options.mobileOption : self.options.pcOption;
            if(options !== "unbuild"){
                self.$el.vcCarousel(options);
            } else{
                self.$el.vcCarousel('destroy');

            }
        },

        update: function(){
            var self = this;            
            var options = window.breakpoint.name == "mobile" ? self.options.mobileOption : self.options.pcOption;
            if(options !== "unbuild"){
                self.$el.vcCarousel('update');
            }
        },
        destroy: function () {
            var self = this;
            $(window).off("breakpointchange.togglecarousel");
            if(self.$el) self.$el.vcCarousel('destroy');            

            self.supr();
            
        }
    });

    return ToggleCarousel;
});
/*!
 * @module vcui.ui.Dropdown
 * @license MIT License
 * @description 드롭다운 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('ui/dropdown', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var $doc = $(document);
    var prefixClass = '.ui_dropdown_';

    var Dropdown = core.ui('Dropdown', {
        bindjQuery: 'dropdown',
        defaults: {
            appendToBody: false,
            disabled: false,
            autoHideClicked: false,
            autoHideFocusout: true,
            toggleSelector: '.ui_dropdown_toggle',
            listSelector: '.ui_dropdown_list'
        },
        isBindEvent:false,

        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self.$list = self.$(self.options.listSelector);
            if (self.options.appendToBody) {
                self.$list.after(self.$holder = $('<span style="display:none"></span>'));
            }
            
            self._bindEvents();
        },
        _bindEvents: function _bindEvents() {
            var self = this;
            var opt = self.options;

            self.on('click', prefixClass + 'toggle', function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (opt.disabled) {
                    return self.close();
                }

                self.isBindEvent = true;
                self[self.$el.hasClass('open') ? 'close' : 'open']();
            });
        },
        _bindEventsByOpen: function _bindEventsByOpen() {
            var self = this;
            var opt = self.options;

            self.on('keydown', self._unhandleKeydown = function (e) {
                if (27 == e.keyCode) {
                    e.stopPropagation();
                    self.close();
                    self.$(':focusable:first').focus();
                }
            });

            self.on('click', prefixClass + 'list', self._unhandleClick = function (e) {

                if (!opt.autoHideFocusout) {
                    return;
                }
                if (opt.autoHideClicked) {
                    self.close();
                }
            });

            self.winOne('resize', self._unhandleResize = function () {
                self.close();
            });

            setTimeout(function () {
                // click 이벤트와 겹치지 않도록 한타임 늦게 바인딩한다.
                self.docOn("mousedown keydown", self._unhandleDocEvents = function (e) {
                    if (e.type === 'mousedown') {
                        var $list = self.$(prefixClass + 'list');
                        if (core.dom.contains(self.el, e.target, true) || core.dom.contains($list[0], e.target)) {
                            e.stopPropagation();
                        } else {
                            self.close();
                        }
                    } else {
                        var $toggle = self.$(prefixClass + 'toggle');
                        if (27 === e.keyCode) {
                            self.close(), $toggle.focus();
                        }
                    }
                });
            }, 10);

            self.docOn("focusin focusout", '.ui_dropdown_list', self._unhandleFocus = function (e) {

                clearTimeout(self.focusTimer), self.focusTimer = null;

                if ("focusout" === e.type && self.$el.hasClass("open")) {
                    self.focusTimer = setTimeout(function () {
                        //self.close();
                    }, 10);
                }
            });
        },
        _unbindEventsByClose: function _unbindEventsByClose() {
            var self = this;
            var opt = self.options;
            if(self.isBindEvent) {
                self.off('keydown', self._unhandleKeydown);
                self.off('click', self._unhandleClick);
                self.winOff('resize', self._unhandleResize);
                self.docOff("focusin focusout", self._unhandleFocus);
                self.docOff('mousedown keydown', self._unhandleDocEvents);
            }
        },
        open: function open() {
            var self = this;
            var opt = self.options;

            if (opt.appendToBody) {
                var $toggle = self.$(prefixClass + 'toggle');
                var offset = $toggle.offset();

                $('body').append(self.$list.css({
                    position: 'absolute',
                    left: offset.left,
                    top: offset.top + $toggle.outerHeight()
                }).show());
            }

            self._bindEventsByOpen();
            self.$el.addClass('open');
            self.$el.find(prefixClass + 'toggle').attr('aria-expanded',true);
        },
        close: function close() {
            var self = this;
            var opt = self.options;

            if (opt.appendToBody) {
                self.$holder.before(self.$list.css({ position: '', left: '', top: '' }).hide());
            }

            self.$el.removeClass('open');
            self.$el.find(prefixClass + 'toggle').attr('aria-expanded',false);
            clearTimeout(self.focusTimer);
            self._unbindEventsByClose();
        },
        disenabled: function(){

        },
        enabled: function(){
            
        }
    });

    return Dropdown;
});
/*!
 * @module vcui.ui.Modal
 * @license MIT License
 * @description 모달 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('ui/modal', ['jquery', 'vcui'], function ($, core) {
    "use strict";
    
    var $doc = $(document),
        $win = $(window),
        detect = core.detect,
        ui = core.ui,
        isTouch = detect.isTouch,
        _zIndex = 9000;

    var ModalManager = {
        templates: {
            //wrap: '<div class="ui_modal_wrap" style="position:fixed;top:0;left:0;right:0;bottom:0;overflow:auto;"></div>',
            wrap: '<div class="ui_modal_wrap" style="position:fixed;top:0;left:0;right:0;bottom:0;"></div>',
            dim: '<div class="ui_modal_dim" style="position:fixed;top:0;left:0;bottom:0;right:0;background:#000;"></div>',
            modal: '<div class="ui_modal ui_modal_ajax" style="display:none"></div>'
        },
        options: {
            opacity: 0.7
        },
        init: function init(options) {
            var self = this;

            self.options = core.extend(self.options, options);
            self.stack = [];
            self.active = null;

            self._bind();
        },

        _bind: function _bind() {
            var self = this;

            $win.on('resizeend.modalmanager', function () {
                for (var i = -1, modal; modal = self.stack[++i];) {
                    modal.isShown && modal.center();
                }
            });

            $doc.on('modalshow.modalmanager', '.ui_modal_container', self._handleModalShow.bind(self)).on('modalhidden.modalmanager', '.ui_modal_container', self._handleModalHidden.bind(self)).on('modalhide.modalmanager', '.ui_modal_container', self._handleModalHide.bind(self)).on('focusin.modalmanager', self._handleFocusin.bind(self)).on('click.modalmanager', '[data-control=modal]', self._handleClick.bind(self)).on('click.modalmanager', '.ui_modal_dim', self._handleDimClick.bind(self));
        },
        _handleModalHide: function _handleModalHide(e) {
            var self = this,
                $modal = $(e.currentTarget),
                modal = $modal.vcModal('instance');

            // 모달이 전부 닫힐 때 document에 알린다.
            if (self.stack.length === 1) {
                $(document).triggerHandler('modallastbeforeclose');
            }
        },
        _handleModalShow: function _handleModalShow(e, opts) {
            var self = this,
                $modal = $(e.currentTarget),
                modal = $modal.vcModal('instance'),
                zIndex = self.nextZIndex();

            if (!modal.$el.parent().hasClass('ui_modal_wrap')) {
                if (opts.left != undefined){
                    modal.$el.wrap(self.templates.wrap);
                    modal.$el.parent().css('left', opts.left);
                } else {
                    modal.$el.wrap(self.templates.wrap);
                }
                modal.$el.before($(self.templates.dim).css('opacity', self.options.opacity));
            }

            if (opts.left != undefined){
                modal.$el && modal.$el.parent().css('zIndex', zIndex++).css('left', opts.left);
            } else {
                modal.$el && modal.$el.parent().css('zIndex', zIndex++);
            }
            

            self.active = modal;
            self.add(modal);
            if (self.stack.length === 1) {
                $(document).triggerHandler('modalfirstopen');

                var ignoreOverflow = $('body').hasClass('ignore-overflow-hidden');
                if(!ignoreOverflow){
                    $('html, body').css({
                        overflow:"hidden"
                    });
                }

                //앱에서 처리 못할때를 대비
                lgkorUI.appIsLayerPopup(true);
                
            }
        },
        _handleModalHidden: function _handleModalHidden(e) {
            var self = this,
                $modal = $(e.currentTarget),
                modal = $modal.vcModal('instance');

            modal.$el.siblings('.ui_modal_dim').remove();
            modal.$el.unwrap();
            self.revertZIndex();
            self.remove(modal);

            if (self.stack.length) {
                self.active = self.stack[self.stack.length - 1];
            } else {
                self.active = null;
                $(document).triggerHandler('modallastclose');

                var ignoreOverflow = $('body').hasClass('ignore-overflow-hidden');
                if(!ignoreOverflow){
                    $('html, body').css({
                        overflow:"visible"
                    });
                }
                

                //앱에서 처리 못할때를 대비
                lgkorUI.appIsLayerPopup(false);
            }
        },
        _handleFocusin: function _handleFocusin(e) {
            var self = this;            
            if (!self.active) {
                return;
            }            

            if (self.active.$el[0] !== e.target && !$.contains(self.active.$el[0], e.target)) {

                var $first = self.active.$el.find(':visible:focusable').first(); 
                $first.focus(); 
                    
                e.stopPropagation();
            }
        },
        _handleClick: function _handleClick(e) {
            e.preventDefault();
            var self = this,
                $el = $(e.currentTarget),
                target = $el.attr('href') || $el.attr('data-href'),
                $modal;

            if (target) {
                // ajax형 모달인 경우
                if (!/^#/.test(target)) {
                    $.ajax({
                        url: target
                    }).done(function (html) {
                        $modal = ModalManager.getRealModal(html);

                        $modal.addClass('ui_modal_ajax').hide().appendTo('body').vcModal(core.extend({
                            removeOnClose: true,
                            opener: $el[0]
                        }, $el.data())).on('modalhidden', function (e) {
                            $el[0].focus();
                            $modal.off('modalhidden');
                        });
                    });
                } else {
                    // 인페이지 모달인 경우
                    $(target).vcModal(core.extend({
                        opener: $el[0]
                    }, $el.data())).on('modalhidden', function (e) {
                        $el[0].focus();
                        $(this).off('modalhidden');
                    });
                }
            }
        },
        _handleDimClick: function _handleDimClick(e) {
            var $dim = $(e.currentTarget);
            if ($dim.hasClass('ui_modal_dim')) {
                var modal = $dim.siblings('.ui_modal_container').vcModal('instance');
                if (modal.getOption('closeByDimmed') === true) {
                    modal.close();
                }
            }
        },
        add: function add(modal) {
            this.stack.push(modal);
        },
        remove: function remove(modal) {
            this.stack = core.array.remove(this.stack, modal);
        },
        nextZIndex: function nextZIndex() {
            var zi = _zIndex;
            _zIndex += 2;
            return zi;
        },
        revertZIndex: function revertZIndex() {
            _zIndex -= 2;
        },
        getRealModal: function getRealModal(html) {
            var $tmp = $(html),
                $modal;
            if ($tmp.length > 1) {
                for (var i = 0, len = $tmp.length; i < len; i++) {
                    if ($tmp[i].nodeType === Node.ELEMENT_NODE) {
                        return $tmp.eq(i);
                    }
                }
            }
            return $tmp;
        }
    };
    ModalManager.init();

    // Modal ////////////////////////////////////////////////////////////////////////////
    /**
     * 모달 클래스
     * @class
     * @name vcui.ui.Modal
     * @extends vcui.ui.View
     */
    var Modal = ui('Modal', /** @lends vcui.ui.Modal# */{
        bindjQuery: 'modal',
        defaults: {
            overlay: true,
            clone: true,
            closeByEscape: true,
            removeOnClose: false,
            closeByDimmed: false,
            draggable: true,
            dragHandle: 'header h1',
            show: true,
            effect: 'fade', // slide | fade
            cssTitle: '.ui_modal_title',
            useTransformAlign: true,
            variableWidth: true, 
            variableHeight: true,
            removeModalCss: false,
            isHash : true,
            alertType : false,
            webAccessibility : false, // 웹접근성 대응 유무 true로 변경시 닫기버튼이 모달 header 태그 위쪽을 이동함.

        },

        events: {
            'click button[data-role], a[data-role]': function clickButtonDataRole(e) {
                var self = this,
                    $btn = $(e.currentTarget),
                    role = $btn.attr('data-role') || '',
                    ev;

                if (role) {
                    self.triggerHandler(ev = $.Event('modal' + role), [self]);
                    if (ev.isDefaultPrevented()) {
                        return;
                    }
                }

                this.close();
            },
            'click .ui_modal_close': function clickUi_modal_closeui_modal_close(e) {
                e.preventDefault();
                e.stopPropagation();

                this.close();
            }
        },
        /**
         * 생성자
         * @param {String|Element|jQuery} el
         * @param {Object} options
         * @param {Boolean}  options.overlay:true 오버레이를 깔것인가
         * @param {Boolean}  options.clone: true    복제해서 띄울 것인가
         * @param {Boolean}  options.closeByEscape: true    // esc키를 눌렀을 때 닫히게 할 것인가
         * @param {Boolean}  options.removeOnClose: false   // 닫을 때 dom를 삭제할것인가
         * @param {Boolean}  options.draggable: true                // 드래그를 적용할 것인가
         * @param {Boolean}  options.dragHandle: 'h1.title'     // 드래그대상 요소
         * @param {Boolean}  options.show: true                 // 호출할 때 바로 표시할 것인가...
         */
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            // 열릴때 body로 옮겼다가, 닫힐 때 다시 원복하기 위해 임시요소를 넣어놓는다.
            self._createHolder();
            if (self.options.overlay !== false) {
                self._overlay(); // 오버레이 생성
            }
            self.$el.addClass('ui_modal_container');

            self.isShown = false;
            self._originalDisplay = self.$el.css('display');
            //self.$el.find(self.options.dragHandle).attr('tabindex', 0); // 210322 수정
            //self.$el.attr('tabindex', 0); // 210322 수정


            var removeModalCss = self.$el.data('removeModalCss');
            self.options.removeModalCss = removeModalCss ? removeModalCss : false;

            /* 
            // self.$el.css('left') : % 값도 px 값으로 출력됨.    
            // 센터정렬이 아니고 위치를 잡을땐 variableWidth, variableHeight 을 false 설정필요

            if (/[0-9]+px/.test(self.$el.css('left'))) {
                self.options.variableWidth = false;
            }            
            if (/[0-9]+px/.test(self.$el.css('top'))) {
               self.options.variableHeight = false;
            }
            */

            if (self.options.show) {
                setTimeout(function () {
                    core.util.waitImageLoad(self.$('img')).done(function () {
                        self.show();
                    });
                });
            }

            // 210409 하단에 있는 닫기버튼을 강제로 위로 올려서 웹접근성에 대응.
            if(self.options.webAccessibility && !self.options.alertType){
                var $closeBtn = self.$el.find('header').siblings('.ui_modal_close');
                if($closeBtn && $closeBtn[0]){
                    self.$el.find('header').before($closeBtn);
                }
            }


            self._bindAria(); // aria 셋팅


        },

        _hashchange:function _hashchange(e){
            var self = this;            
            var hash = window.location.hash;
            if(hash.search(self.randomKey) < 0) {
                self.close();
            }
        },

        _bindAria: function _bindAria() {
            var self = this;
            // TODO
            self.$el.attr({
                'role': 'dialog',
                'aria-hidden': 'false',
                'aria-describedby': self.$('section').attr('id') || self.$('section').attr('id', self.cid + '_content').attr('id'),
                'aria-labelledby': self.$('h1').attr('id') || self.$('h1').attr('id', self.cid + '_title').attr('id')
            });
        },
        /**
         * zindex때문에 모달을 body바로 위로 옮긴 후에 띄우는데, 닫을 때 원래 위치로 복구시켜야 하므로,
         * 원래 위치에 임시 홀더를 만들어 놓는다.
         * @private
         */
        _createHolder: function _createHolder() {
            var self = this;

            if (self.$el.parent().is('body')) {
                return;
            }

            self.$holder = $('<span class="ui_modal_holder" style="display:none;"></span>').insertAfter(self.$el);
            self.$el.appendTo('body');
        },
        /**
         * 원래 위치로 복구시키고 홀더는 제거
         * @private
         */
        _replaceHolder: function _replaceHolder() {
            var self = this;

            if (self.$holder) {
                self.$el.insertBefore(self.$holder);
                self.$holder.remove();
            }
        },

        getOpener: function getOpener() {
            return $(this.options.opener);
        },

        /**
         * 토글
         */
        toggle: function toggle() {
            var self = this;

            self[self.isShown ? 'hide' : 'show']();
        },

        /**
         * 표시
         */
        show: function show() {
            if (this.isShown) {
                return;
            }

            var self = this,
                opts = self.options,
                showEvent = $.Event('modalshow');

            self.trigger(showEvent, opts);
            if (showEvent.isDefaultPrevented()) {
                return;
            }

            self.isShown = true;

            if (opts.title) {
                self.$(opts.cssTitle).html(opts.title || '알림');
            }

            self.layout();
            var defer = $.Deferred();
            if (opts.effect === 'fade') {
                self.$el.hide().fadeIn(250, function () {
                    defer.resolve();
                });
            } else if (opts.effect === 'slide') {
                self.$el.css('top', -self.$el.height()).animate({ top: '50%' }, function () {
                    defer.resolve();
                });
            } else {
                self.$el.show();
                defer.resolve();
            }

            defer.done(function () {
                self.trigger('modalshown', {
                    module: self
                });

                //////$('body').attr('aria-hidden', 'true');    // body를 비활성화(aria)
                self._draggabled(); // 드래그 기능 빌드
                self._escape(); // esc키이벤트 바인딩
                self.$el.css('min-height', self.$el.css('min-height', '').prop('scrollHeight'));
                ///////////me._enforceFocus();   // 탭키로 포커스를 이동시킬 때 포커스가 레이어팝업 안에서만 돌도록 빌드

                self.on('mousewheel', function (e) {
                    e.stopPropagation();
                });


                var $focusEl = self.$el.find('[data-autofocus=true]');

                // 레이어내에 data-autofocus를 가진 엘리먼트에 포커스를 준다.
                if ($focusEl.length > 0) {
                    $focusEl.eq(0).focus();
                } else {
                    // 레이어에 포커싱
                    

                    if(opts.webAccessibility){
                        var $first = self.$el.find(':visible:focusable').first(); 
                        $first.focus(); 
                    }else{
                        self.$el.attr('tabindex', 0).focus();
                    }

                }

                var $focusEl = self.$('[data-autofocus=true]');
                if ($focusEl.length > 0) {
                    $focusEl.eq(0).focus();
                } else {

                    if(opts.webAccessibility){
                        var $first = self.$el.find(':visible:focusable').first(); 
                        $first.focus(); 
                    }else{
                        self.$el.attr('tabindex', 0).focus();
                    }

                }



                // 버튼
                /**************if (me.options.opener) {
                    var modalid;
                    if (!(modalid = me.$el.attr('id'))) {
                        modalid = 'modal_' + core.getUniqId(16);
                        me.$el.attr('id', modalid);
                    }
                    $(me.options.opener).attr('aria-controls', modalid);
                }**********/
            });

            if(opts.isHash){
                lgkorUI.addHistoryBack(self.cid, function(){
                    self.close();
                });
            }
            
        
        

        },

        /**
         * 숨김
         */
        hide: function hide(e) {
            if (e) {
                e.preventDefault();
            }

            var self = this;
            e = $.Event('modalhide');
            self.trigger(e);
            if (!self.isShown || e.isDefaultPrevented()) {
                return;
            }

            var defer = $.Deferred();
            self.isShown = false;
            if (self.options.effect === 'fade') {
                self.$el.fadeOut(250, function () {
                    defer.resolve();
                });
            } else if (self.options.effect === 'slide') {
                self.$el.animate({
                    top: -self.$el.outerHeight()
                }, function () {
                    defer.resolve();
                });
            } else {
                self.$el.hide();
                defer.resolve();
            }

            defer.done(function () {

                

                self.trigger('modalhidden', {
                    module: self
                });

                self.$el.removeClass('ui_modal_container'); // dom에 추가된 것들 제거
                self._escape(); // esc 키이벤트 제거
                self._replaceHolder(); // body밑으로 뺀 el를 다시 원래 위치로 되돌린다.

                if (self.options.removeOnClose) {
                    self.$el.remove(); // 닫힐 때 dom에서 삭제하도록 옵션이 지정돼있으면, dom에서 삭제한다.
                }
                /*if (me.options.opener) {
                 $(me.options.opener).removeAttr('aria-controls').focus();    // 레이어팝업을 띄운 버튼에 포커스를 준다.
                 }*/
                //:if (self.$overlay) {
                //:    self.$overlay.remove(), self.$overlay = null;    // 오버레이를 제거
                //:}
                ////// $('body').removeAttr('aria-hidden');    // 비활성화를 푼다.

                self.destroy();

            });
            
            if(self.options.isHash){                
                lgkorUI.removeHistoryBack(self.cid);
            }



            
        },

        _removeLocationHash : function(){
            var noHashURL = window.location.href.replace(/#.*$/, '');
            window.history.replaceState('', document.title, noHashURL) 
        },

        

        /**
         * 도큐먼트의 가운데에 위치하도록 지정
         */
        layout: function layout() {
            var self = this,
                width,
                height,
                css,
                isOverHeight,
                isOverWidth,
                top,
                left,
                winHeight = core.dom.getWinHeight(),
                winWidth = core.dom.getWinWidth(),
                scrollHeight = self.$el.css('min-height', '').prop('scrollHeight');

            if (!self.isShown) {
                self.$el.css({
                    'display': 'inline'
                });
            }
            width = self.$el.outerWidth();
            height = self.$el.outerHeight();
            isOverHeight = height > winHeight;
            isOverWidth = width > winWidth;
            css = {
                display: 'block',
                position: 'absolute',
                //backgroundColor: '#ffffff',
                // outline: 'none',
                minHeight: scrollHeight,
                backgroundClip: 'padding-box' //,
                //top: top = isOverHeight ? '0%' : '50%'//,
                //left: left = isOverWidth ? '0%' : '50%'
            };

            css.transform = '';
            if (self.options.variableWidth !== false) {
                css.left = isOverWidth ? '0%' : '50%';
                if (self.options.useTransformAlign) {
                    css.transform += 'translateX(-' + css.left + ') ';
                } else {
                    css.marginLeft = isOverWidth ? '' : Math.ceil(width / 2) * -1;
                }
            }

            if (self.options.variableHeight !== false) {
                css.top = isOverHeight ? '0%' : '50%';
                if (self.options.useTransformAlign) {
                    css.transform += 'translateY(-' + css.top + ') ';
                } else {
                    css.marginTop = isOverHeight ? '' : Math.ceil(height / 2) * -1;
                }
            }

            if(self.options.removeModalCss) {
                self.$el.stop();
            } else {
                if( $('.contents.support').length ) {
                    self.$el.css(css);
                } else {
                    self.$el.stop().css(css);
                }
            }
        },

        /**
         * 타이틀 영역을 드래그기능 빌드
         * @private
         */
        _draggabled: function _draggabled() {
            var self = this,
                options = self.options;

            if (!options.draggable || self.bindedDraggable) {
                return;
            }
            self.bindedDraggable = true;

            if (options.dragHandle) {
                self.$el.css('position', 'absolute');
                core.css3.prefix('user-select') && self.$(options.dragHandle).css(core.css3.prefix('user-select'), 'none');
                self.on('mousedown touchstart', options.dragHandle, function (e) {
                    e.preventDefault();
                    var isMouseDown = true,
                        pos = self.$el.position(),
                        oriPos = {
                        left: e.pageX - pos.left,
                        top: e.pageY - pos.top
                    },
                        _handler;

                    $doc.on(self.makeEventNS('mousemove mouseup touchmove touchend touchcancel'), _handler = function handler(e) {                        
                        switch (e.type) {
                            case 'mousemove':
                            case 'touchmove':
                                if (!isMouseDown) {
                                    return;
                                }
                                self.$el.css({
                                    left: e.pageX - oriPos.left,
                                    top: e.pageY - oriPos.top
                                });
                                break;
                            case 'mouseup':
                            case 'touchend':
                            case 'touccancel':
                                isMouseDown = false;
                                $doc.off(self.getEventNS(), _handler);
                                break;
                        }
                    });
                });

                self.$(options.dragHandle).css('cursor', 'move');
            }
        },

        /**
         * 모달이 띄워진 상태에서 탭키를 누를 때, 모달안에서만 포커스가 움직이게
         * @private
         */
        _enforceFocus: function _enforceFocus() {
            if (!isTouch) {
                return;
            }
            var self = this;
            var $focusEl = self.$el.find('[data-autofocus=true]');

            
            // 레이어내에 data-autofocus를 가진 엘리먼트에 포커스를 준다.
            if ($focusEl.length > 0) {
                $focusEl.eq(0).focus();
            } else {
                // 레이어에 포커싱

                if(self.options.webAccessibility){
                    var $first = self.$el.find(':visible:focusable').first(); 
                    $first.focus(); 
                }else{
                    self.$el.attr('tabindex', 0).focus();
                }
                
            }

            
            $doc.off('focusin' + self.getEventNS()).on('focusin' + self.getEventNS(), self.proxy(function (e) {
                if (self.$el[0] !== e.target && !$.contains(self.$el[0], e.target)) {
                    self.$el.find(':focusable:visible').first().focus();                    
                    e.stopPropagation();
                }
            }));
        },

        /**
         * esc키를 누를 때 닫히도록
         * @private
         */
        _escape: function _escape() {
            if (isTouch) {
                return;
            }
            var self = this;

            if (self.isShown && self.options.closeByEscape) {
                self.docOff('keyup');
                self.docOn('keyup', function (e) {
                    e.which === 27 && self.hide();
                });
            } else {
                self.docOff('keyup');
            }
        },

        /**
         * 오버레이 생성
         * @private
         */
        _overlay: function _overlay() {
            return;

            var self = this;
            if (!self.options.overlay || self.$overlay) {
                return false;
            } //140123_추가

            self.$overlay = $('<div class="ui_modal_overlay" />');
            self.$overlay.css({
                'backgroundColor': '#ffffff',
                'opacity': 0.6,
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'right': 0,
                'bottom': 0
            }).appendTo('body');

            self.$overlay.off('click.modal').on('click.modal', function (e) {
                if (e.target != e.currentTarget) {
                    return;
                }
                self.$overlay.off('click.modal');
                self.hide();
            });
        },

        /**
         * 모달의 사이즈가 변경되었을 때 가운데위치를 재조절
         * @example
         * $('...').modal(); // 모달을 띄운다.
         * $('...').find('.content').html( '...');  // 모달내부의 컨텐츠를 변경
         * $('...').modal('center');    // 컨텐츠의 변경으로 인해 사이즈가 변경되었으로, 사이즈에 따라 화면가운데로 강제 이동
         */
        center: function center() {
            this.layout();
        },

        /**
         * 열기
         */
        open: function open() {
            this.show();
        },

        /**
         * 닫기
         */
        close: function close() {

            this.hide();
        },

        /**
         *
         */
        destroy: function destroy() {
            var self = this;

            self.supr();
        }
    });

    /**
     * 열려 있는 레이어팝업을 가운데에 위치시키는 글로벌이벤트
     * @example
     * vcui.PubSub.trigger('resize:modal')
     */
    /*core.PubSub.on('resize:modal', function() {
     if(Modal.active){
     Modal.active.center();
     }
     });*/

    //윈도우가 리사이징 될때 가운데에 자동으로 위치시킴
    /*$(window).on('resize.modal', function() {
     if(Modal.active){
     Modal.active.center();
     }
     });*/

    core.modal = function (el, options) {
        $(el).vcModal(options);
    };

    /**
     * @class
     * @name vcui.ui.AjaxModal
     * @description ajax로 불러들인 컨텐츠를 모달로 띄워주는 모듈
     * @extends vcui.ui.View
     */
    core.ui.ajaxModal = function (ajaxOptions, options) {
        if (typeof ajaxOptions === 'string') {
            ajaxOptions = {
                url: ajaxOptions
            };
        }
        return $.ajax(ajaxOptions).then(function (html) {
            var $modal = ModalManager.getRealModal(html).appendTo('body').data('removeOnClose', true);
            return $modal.vcModal(core.extend(options, {
                removeOnClose: true,
                events: {
                    modalhidden: function modalhidden() {
                        $(options.opener).focus();
                    }
                }
            }));
        });
    };

    core.ui.alert = function () {
        /**
         * 얼럿레이어
         * @memberOf vcui.ui
         * @name alert
         * @function
         * @param {string} msg 얼럿 메세지
         * @param {Object} options 모달 옵션
         * @example
         * vcui.ui.alert('안녕하세요');
         */
        return function (msg, options) {
            if (typeof msg !== 'string' && arguments.length === 0) {
                options = msg;
                msg = '';
            }
            var el = $(core.ui.alert.tmpl).appendTo('body').find('div.ui_modal_content').html(msg).end();
            var modal = $(el).vcModal(core.extend({ removeOnClose: true }, options)).vcModal('instance');
            modal.getElement().buildUIControls();
            modal.on('modalhidden', function () {
                el = null;
                modal = null;
            });
            return modal;
        };
    }();
    core.ui.alert.tmpl = ['<div class="layer_popup small ui_alert" role="alert" style="display:none">', '<h1 class="title ui_modal_title">알림창</h1>', '<div class="cntt">', '<div class="ui_modal_content">&nbsp;</div>', '<div class="wrap_btn_c">', '<button type="button" class="btn_emphs_small" data-role="ok"><span><span>확인</span></span></button>', '</div>', '</div>', '<button type="button" class="ui_modal_close"><span>닫기</span></button>', '<span class="shadow"></span>', '</div>'].join('');
    ///////////////////////////////////////////////////////////////////////////////////////

    return Modal;
});
/*!
 * @module vcui.ui.Selectbox
 * @license MIT License
 * @description 모달 컴포넌트
 * @copyright VinylC UID Group
 * ver 1.1
 * placeholder 추가
 */
vcui.define('ui/selectbox', ['jquery', 'vcui', 'helper/gesture'], function ($, core, Gesture) {
    "use strict";

    var $doc = $(document),
        $win = $(window),
        isTouch = core.detect.isTouch;

    var BaseSelectbox = core.ui.View.extend({
        name: 'Selectbox',
        templates: {
            notextOption: '<span class="ui-select-text"></span><span class="blind"></span><span class="ico"></span>',
            labelOption: '<span class="ui-select-text">{{text}}</span><span class="blind">선택됨</span><span class="ico"></span>'
        },
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            if (self.$el.attr('data-class') && self.$el.attr('data-class').indexOf('read') > -1) {
                self.$el.prop('readonly', true);
            }

            //접근성 관련 수정
            self.$el.parents('.select-wrap').on('keydown', function (e) {
                switch (e.keyCode) {
                    case core.keyCode.ENTER:
                        self.show();
                        break;
                }
            });
        },
        _options: function _options(cb) {
            core.each(core.toArray(this.el.options), cb);
        },

        _isDeactive: function _isDeactive() {
            var self = this;
            return self.$el.prop('disabled') || self.$el.prop('readonly') === true;
        },

        /**
         * @param option
         * @param type
         * @returns {*}
         * @private
         */

        _itemHTML: function _itemHTML(option, type) {
            var self = this;

            if (!option) {
                return self.tmpl('notextOption');
            }
            if (type === 'label') {
                return self.tmpl('labelOption', option);
            } else {
                return option.text;
            }
        },

        selectedIndex: function selectedIndex(index, trigger) {
            if (arguments.length === 0) {
                return this.el.selectedIndex;
            } else {
                if (this.el.options.length === 0) {
                    return;
                }

                var e = $.Event('beforechange');
                this.$el.trigger(e);
                if (e.isDefaultPrevented()) {
                    return;
                }

                this.el.selectedIndex = index;
                if (trigger !== false) {
                    this.$el.trigger('change', { selectedIndex: this.el.selectedIndex });
                } else {
                    this._updateLabel();
                }
            }
        },
        value: function value(val, trigger) {
            var self = this;
            if (arguments.length === 0) {
                return self.el.value;
            } else {
                if ( /*self._isDeactive() ||*/self.el.options.length === 0) {
                    return;
                }
                this._options(function (option, i) {
                    if (option.value === val + "") {
                        self.selectedIndex(i, trigger);
                        return false;
                    }
                });
            }
        },
        text: function text(txt, trigger) {
            var self = this;
            if (arguments.length === 0) {
                return this.el.value;
            } else {
                if ( /*self._isDeactive() || */self.el.options.length === 0) {
                    return;
                }
                this._options(function (option, i) {
                    if (option.text === txt + "") {
                        self.selectedIndex(i, trigger);
                        return false;
                    }
                });
            }
        },
        selectedOption: function selectedOption() {
            return this.el.options[this.el.selectedIndex];
        },

        /**
         * 레이블 갱신
         * @param index
         * @private
         */
        _updateLabel: function _updateLabel(index) {
            var self = this,
                isActive = !self._isDeactive(),
                $label = self.$label.children(),
                isReadonly = self.$el.hasClass('read') || self.$el.prop('readonly') === true,
                isDisabled = self.$el.prop('disabled');

            index = typeof index === 'undefined' ? self.el.selectedIndex : index;
            if (index < 0 && self.el.options.length > 0) {
                self.el.selectedIndex = index = 0;
            }
            self.attrTitle = self.$el.attr('title') || self.$el.attr('data-title');

            self.$selectbox.toggleClass('read', isReadonly && !isDisabled).toggleClass('disabled', isDisabled).toggleClass('warn', self.$el.is('[data-class*=warn]'));

            $label.attr('title', self.attrTitle + ' 열기').find('.hide').text(isActive ? '선택됨' : '선택불가');

            if($(self.el.options[index]).hasClass('placeholder')){
                $label.addClass('placeholder');
            }else{
                $label.removeClass('placeholder');
            }

            $label.html(self._itemHTML(index < 0 ? null : self.el.options[index], 'label'));
            if (isActive) {
                $label.removeAttr('tabindex');
            } else {
                if (self.$el.prop('disabled')) {
                    $label.attr('tabindex', -1);
                }
            }
        },

        update: function update(list, selectedValue) {
            var self = this;

            if ( /*self._isDeactive() ||*/!list) {
                return;
            }
            if (core.is(list, 'array')) {
                // list 값이 있으면 select를 갱신시킨다.
                self.el.options.length = 0;
                core.each(list, function (item, i) {
                    
                    if ('text' in item) {
                        self.el.options.add(new Option(item.text || item.value, item.value));
                        if(item.placeholder) $(self.el.options).addClass('placeholder');
                    } else {
                        core.each(item, function (txt, val) {
                            self.el.options.add(new Option(txt, val));                            
                            return false;
                        });
                        if(item.placeholder) $(self.el.options).addClass('placeholder');                        
                    }
                });
            } else if (core.is(list, 'json')) {
                self.el.options.length = 0;
                core.each(list, function (key, value) {
                    self.el.options.add(new Option(key, value));
                });
            }


            if (selectedValue) {
                self.el.value = selectedValue;
                // self.el.selectedIndex = selectedValue;
            }
        },

        /**
         * 셀렉트박스 UI 표시
         */
        show: function show() {
            this.display = true;
            this.$selectbox.toggle(this.display);
        },

        /**
         * 셀렉트박스 UI 숨김
         */
        hide: function hide() {
            this.display = false;
            this.$selectbox.toggle(this.display);
        },

        /**
         * 셀렉트박스 UI 토글링
         * @param {Boolean} flag 표시 여부
         */
        toggle: function toggle(flag) {
            if (arguments.length === 0) {
                flag = !this.display;
            }
            this.display = flag;
            this.$selectbox.toggle(this.display);
        },

        readonly: function readonly(flag) {
            this.$el.toggleClass('read', flag).prop('readonly', flag);
            this.update();
        },
        disabled: function disabled(flag) {
            this.$el.toggleClass('disabled', flag).prop('disabled', flag);
            this.update();
        }
    });

    //Selectbox////////////////////////////////////////////////////////////////////////////
    /**
     * 커스텀 셀렉트박스<br />
     *
     * @class
     * @name vcui.ui.Selectbox
     * @extends vcui.ui.View
     */
    var CustomSelectbox = core.ui('CusomtSelectbox', BaseSelectbox, {
        //bindjQuery: 'selectbox',
        $statics: {
            ON_CHANGED: 'selectboxchanged'
        },
        defaults: {
            classSort: ['sup', 'cnum', 'cname'],
            allowScrollbar: true,
            containerMargin: 2,
            where: 'inline',
            wrapClasses: '',
            disabledClass: 'disabled',
            widthClass: ' '
        },

        templates: {
            label: '<div class="ui-selectbox-view"><a href="#0" class="ui-select-button" title="">{{#raw html}}</a></div>',
            list: '<div class="ui-selectbox-list" id="{{cid}}_menu"><div class="ui-select-scrollarea"></div></div>',
            scrollbar: '<div class="ui-select-scroll" style="top: 0px;">' + 
            '<span class="bg_top"></span><span class="bg_mid" style=""></span>' + 
            '<span class="bg_btm"></span></div>',
            option: '<li><a href="#{{num}}" data-value="{{value}}" data-text="{{text}}" title="{{attrTitle}}">{{#raw html}}</a></li>'
        },
        /**
         * 생성자
         * @param {string|Element|jQuery} el 해당 엘리먼트(노드, id, jQuery 어떤 형식이든 상관없다)
         * @param {Object} [options] 옵션값
         * @param {string} [options.wrapClasses = ''] wrap 클래스명
         * @param {string} [options.disabledClass = 'disabled'] disabled 클래스명
         */
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self.display = self.$el.css('display') !== 'none';
            self.$el.hide();

            self._create();
            self.update();
        },

        /**
         * select 컨트롤을 기반으로 UI DOM 생성
         * @private
         */
        _create: function _create() {
            var self = this,
                cls = self.$el.attr('data-class') || 'ui-selectbox-wrap',
                elId = !self.options.id ? '' : ' id="' + self.options.id + '"';

            self.originalWidth = parseInt(self.$el.css('width'), 10) + 22;
            self.attrTitle = self.options.title || self.$el.attr('title') || '셀렉트박스';
            if (self.options.wrapClasses) {
                cls = cls + ' ' + self.options.wrapClasses;
            }

            // 셀렉트박스
            self.$selectbox = $('<div class="' + cls + '" ' + elId + '></div>');
            if (!self.options.widthClass) {
                self.$selectbox.css('width', self.originalWidth);
            } else {
                self.$selectbox.addClass(self.options.widthClass);
            }
            self.$selectbox.insertAfter(self.$el);

            self._createLabel();
            self._createList();
            self._bindEvents();
        },

        /**
         * 이벤트 바인딩
         * @private
         */
        _bindEvents: function _bindEvents() {
            var self = this;
            var timer;
            //
            self.on('selectboxopen selectboxclose', function (e) {
                if (self._isDeactive()) {
                    return;
                }

                var isOpen = e.type === 'selectboxopen';

                self.$selectbox.toggleClass('on', isOpen);
                self.$el.closest('div.select_wrap').toggleClass('on', isOpen);

                if (isOpen) {
                    self._reposition();
                    self.$list.show();

                    self._refreshScroll();
                    self._scrollToItem();

                    $doc.on('touchstart.selectbox' + self.cid + ' mousedown.selectbox' + self.cid, function (e) {
                        if (!$.contains(self.$selectbox[0], e.target)) {
                            clearTimeout(timer), timer = null;
                            self.close();
                        }
                    });

                    Selectbox.active = self;
                } else {
                    self.$list.hide();
                    Selectbox.active = null;
                    clearTimeout(timer), timer = null;
                    $doc.off('.selectbox' + self.cid);
                }
                self.isShown = isOpen;
                var atitle = self.attrTitle == undefined ? "" : self.attrTitle;
                self.$label.find('.ui-select-button').attr('title', atitle + (isOpen ? ' 닫기' : ' 열기'));

                self.triggerHandler('selectboxtoggle');
            });

            self.$el.on('change', function () {
                self._updateLabel(this.selectedIndex);
            });

            // 비터치 기반일 때에 대한 이벤트 처리
            if (!isTouch) {
                // 셀렉트박스에서 포커스가 벗어날 경우 자동으로 닫히게
                self.$selectbox.on('mouseenter.selectbox mouseleave.selectbox ' + 'focusin.selectbox focusout.selectbox', function (e) {
                    clearTimeout(timer), timer = null;
                    if (self.$el.prop('disabled')) {
                        return;
                    }
                    if (e.type === 'mouseenter' || e.type === 'focusin') {
                        self.$selectbox.addClass('active');
                    } else if (e.type === 'mouseleave' || e.type === 'focusout') {
                        self.$selectbox.removeClass('active');
                        if (e.type === 'focusout' && self.$selectbox.hasClass('on')) {
                            timer = setTimeout(function () {
                                self.close();
                            }, 200);
                        }
                    }
                }).on('keydown', function (e) {
                    if (!self.isShown) {
                        return;
                    }
                    switch (e.keyCode) {
                        case core.keyCode.ESCAPE:
                            self.close();
                            self.$label.find('a').focus();
                            break;
                    }
                });
            }

            var changemediasizeCallback;
            $(window).on('changemediasize.' + self.cid, changemediasizeCallback = function changemediasizeCallback(e, data) {
                if (self.isShown) {
                    self._refreshScroll();
                }
                self._updateLabel();
            });
            changemediasizeCallback();

            $(self.el.form).on('reset', function () {
                setTimeout(function () {
                    self.update();
                });
            });
        },

        /**
         * 레이블 생성
         * @private
         */
        _createLabel: function _createLabel() {
            var self = this;

            self.$label = $(self.tmpl('label', {
                html: self._itemHTML(self.el.selectedIndex >= 0 ? self.el.options[self.el.selectedIndex] : null, 'label')
            }));

            self.$label.attr({
                'id': self.cid + '_button'
            }).on('click', '.ui-select-button', function (e) {
                e.preventDefault();
                if (self === Selectbox.active) {
                    self.close();
                    return;
                }

                // 현재 셀렉트박스가 열려있으면 닫고, 닫혀있으면 열어준다.
                if (self.$selectbox.hasClass('on')) {
                    self.close();
                } else {
                    if (self._isDeactive()) {
                        return;
                    }
                    self.open();
                }
            });
            !isTouch && self.$selectbox.on('keydown', '.item_view a', function (e) {
                if (self._isDeactive()) {
                    return;
                }
                if (e.keyCode === 40) {
                    // down
                    if (!self.isShown) {
                        self.open();
                    }
                    self.$list.find('li>a:eq(0)').focus();
                    e.preventDefault();
                }
            });

            self.$selectbox.append(self.$label);
        },


        focus: function() {
            var self = this;
            self.$selectbox.find('.ui-select-button').focus();
        },


        /**
         * 리스트 생성
         * @private
         */
        _createList: function _createList() {
            var self = this;

            self.$list = $(self.tmpl('list', { cid: self.cid }));

            self.$selectbox.append(self.$list);
            self.$listWrapper = self.$list.children();

            self.$selectbox.on('click', '.ui-selectbox-list', function (e) {
                self.$list.focus();
            }).on('click', '.ui-selectbox-list li>a', function (e) {
                // 아이템을 클릭했을 때
                e.preventDefault();
                e.stopPropagation();

                self.selectedIndex($(this).parent().index());
                self.close();
                self.$label.find('a').focus();
            });

            !isTouch && self.$selectbox.on('mousedown', '.ui-selectbox-list li>a', function () {
                this.focus();
            }).on('keydown', '.ui-selectbox-list a', function (e) {
                if (e.keyCode != 38 && e.keyCode != 40) {
                    return;
                }
                if (!self.isShown) {
                    return;
                }
                e.preventDefault();

                // 키보드의 위/아래 키로 이동
                var $links = self.$selectbox.find('a'),
                    index = $links.index(this),
                    count = $links.length;

                switch (e.keyCode) {
                    case 38:
                        // up
                        $links.eq(Math.max(0, index - 1)).focus();
                        break;
                    case 40:
                        // down
                        $links.eq(Math.min(count, index + 1)).focus();
                        break;
                }
            });
            self.maxHeight = parseInt(self.$listWrapper.css('max-height'), 10);

            self.$scrollbar = $(self.tmpl('scrollbar'));
            self.$list.append(self.$scrollbar);
            if (!isTouch) {
                self.$list.on('mouseenter mouseleave', function (e) {
                    self.isScrollbarActive = e.type === 'mouseenter';
                    self.$scrollbar.toggleClass('active', self.isScrollbarDown || self.isScrollbarActive);
                });
            }
            /* TODO
             if (!core.detect.isTouch) {
             self.$list.on('mouseenter mouseleave', function (e){
             self.isScrollbarActive = e.type === 'mouseenter';
             self.$scrollbar.toggleClass('active', self.isMouseDown || self.isScrollbarActive);
             });
             }
             */
        },

        /**
         * 스크롤박스를 버튼 위에 놓을지 아래에 놓을지 결정
         * @private
         */
        _reposition: function _reposition() {
            var self = this,
                $scrollarea,
                scrollTop,
                offset,
                listHeight,
                selectHeight,
                scrollHeight;

            $scrollarea = self.$selectbox.parentsUntil('body').filter(function () {
                var overflow = $(this).css('overflowY');
                return overflow === 'hidden' || overflow === 'auto';
            });
            if ($scrollarea.length === 0) {
                return;
            }

            scrollTop = $scrollarea.scrollTop();
            scrollHeight = $scrollarea.prop('scrollHeight');
            selectHeight = self.$selectbox.innerHeight();
            offset = self.$selectbox.offset().top - $scrollarea.offset().top + scrollTop;
            self.$list.css('visibility', 'hidden').show();
            listHeight = self.$listWrapper.innerHeight();
            self.$list.css('visibility', '').hide();
            
            if (offset + listHeight + selectHeight > scrollHeight && offset - scrollTop > listHeight) {
                self.$selectbox.addClass('up');
                //var margintop = (listHeight + selectHeight + 3) * -1;
                var margintop = (listHeight + selectHeight) * -1;
                self.$list.css('marginTop', margintop);
            } else {
                self.$selectbox.removeClass('up');
                self.$list.css('marginTop', '');
            }
        },

        /**
         * 리스트 표시
         * @fires vcui.ui.Selectbox#selectboxopen
         */
        open: function open() {
            var self = this;
            Selectbox.active && Selectbox.active.close();

            if (self.options.where === 'body') {
                self.$list.css({
                    position: 'absolute',
                    zIndex: 9000,
                    top: self.$label.offset().top + self.$label.height(),
                    left: self.$label.offset().left
                }).appendTo('body');
            }

            /**
             * 셀렉트박스가 열릴 때 발생
             * @event vcui.ui.Selectbox#selectboxopen
             */ //self.$selectbox.triggerHandler('selectboxopen');
            self.triggerHandler('selectboxopen', [self.$el]);
        },

        /**
         * 리스트 닫기
         * @fires vcui.ui.Selectbox#selectboxclose
         */
        close: function close() {
            var self = this;

            /**
             * 셀렉트박스가 닫힐 때 발생
             * @event vcui.ui.Selectbox#selectboxclose
             */
            self.triggerHandler('selectboxclose', [self.$el]);

            if (self.options.where === 'body') {
                self.$label.after(self.$list.css({
                    position: '',
                    zIndex: '',
                    top: '',
                    left: ''
                }));
            }
        },

        /**
         * index에 해당하는 option항목을 선택
         *
         * @param {number} index 선택하고자 하는 option의 인덱스
         * @param {boolean} trigger change이벤트를 발생시킬 것인지 여부
         */
        selectedIndex: function selectedIndex(index, trigger) {
            var self = this;

            if (arguments.length === 0) {
                return self.el.selectedIndex;
            }
            //if (self._isDeactive()) { return; }
            self.supr.apply(self, core.toArray(arguments));
            self.$list.find('li').removeClass('on').eq(self.el.selectedIndex).addClass('on');
        },

        /**
         * value 에 해당하는 option항목을 선택, 인자가 없을땐 현재 선택되어진 value를 반환
         *
         * @param {string} index 선택하고자 하는 option의 인덱스
         * @param {boolean} trigger change이벤트를 발생시킬 것인지 여부
         * @return {string}
         * @example
         * &lt;select id="sel">&lt;option value="1">1&lt;/option>&lt;option value="2">2&lt;/option>&lt;/select>
         *
         * $('#sel').vcSelectbox('value', 2);
         * value = $('#sel').vcSelectbox('value'); // = $('#sel')[0].value 와 동일
         */
        value: function value(_value, trigger) {
            var self = this;

            if (arguments.length === 0) {
                return self.el.options[self.el.selectedIndex].value;
            } else {
                //if (self._isDeactive()) { return; }
                self.supr.apply(self, core.toArray(arguments));
            }
        },

        text: function(){
            var self = this;
            
            return self.el.options[self.el.selectedIndex].text;
        },

        /**
         * 동적으로 select의 항목들이 변경되었을 때, UI에 반영
         *
         * @param {json} (optional) list 만약 option들을 새로 갱신하고자 할 경우
         * @example
         * &lt;select id="sel">&lt;option value="1">1&lt;/option>&lt;option value="2">2&lt;/option>&lt;/select>
         *
         * $('#sel')[0].options[2] = new Option(3, 3);
         * $('#sel')[0].options[3] = new Option(4, 4);
         * $('#sel').vcSelectbox('update');
         */
        update: function update(list, selectedValue) {
            var self = this,
                html = '',
                text = '',
                num = 1;

            var isDisabled = self.$el.prop('disabled');
            var isReadonly = self.$el.prop('readonly') === true;

            self.close();
            if (list) {
                self.supr(list, selectedValue);
            }

            self._updateLabel();
            if (isReadonly || isDisabled) {
                return;
            }

            // select에 있는 options를 바탕으로 UI를 새로 생성한다.
            self._options(function (item, i) {
                html += self.tmpl('option', {
                    num: num++,
                    value: item.value,
                    text: item.text,
                    attrTitle: self.attrTitle,
                    html: self._itemHTML(item)
                });
            });


            self.$listWrapper.empty().html('<ul>' + html + '</ul>').find('li:eq(' + self.el.selectedIndex + ')').addClass('on');
            if(selectedValue) self.selectedIndex(selectedValue);

            self.$selectbox.toggle(self.display);
        },

        setTitle: function setTitle(title) {
            this.$listWrapper.find('a').attr('title', this.attrTitle = title);
        },

        /**
         * readonly 모드로 변경
         * @param flag
         */
        readonly: function readonly(flag) {
            var self = this;

            self.supr(flag);
            self.close();
            self.update();
        },

        /**
         * disabled 모드로 변경
         * @param flag
         */
        disabled: function disabled(flag) {
            var self = this;

            self.supr(flag);
            self.close();
            self.update();
        },

        /**
         * 스크롤바 이벤트 바인딩
         * @private
         */
        _bindScrollEvent: function _bindScrollEvent() {
            var self = this;
            var $listChild = self.$listWrapper;

            $listChild.on('scroll', function () {
                if (!self.isScrollbarDown) {
                    self._scrollUpdate();
                }
            });

            if (!isTouch) {
                if (self.options.allowScrollbar) {
                    // 스크롤바 드래그 바인딩

                    self.$scrollbar.vcGesture({
                        direction: 'vertical',
                        gesture: function () {
                            var currY, top, rate, scrollbarHeight, wrapperHeight, scrollHeight;
                            return function (type, data) {
                                if (!self.isVisibleScrollbar) {
                                    return false;
                                }
                                switch (type) {
                                    case 'start':
                                        self.isScrollbarDown = true;
                                        currY = parseInt(self.$scrollbar.css('top'), 10);
                                        scrollbarHeight = self.$scrollbar.height();
                                        wrapperHeight = self.$listWrapper.height();
                                        scrollHeight = self.$listWrapper.prop('scrollHeight');
                                        break;
                                    case 'move':
                                        if (!self.isScrollbarDown) {
                                            return;
                                        }
                                        top = self._scrollbarMove(currY + data.diff.y);
                                        rate = top / (wrapperHeight - scrollbarHeight);
                                        self.$listWrapper.scrollTop(rate * (scrollHeight - wrapperHeight));
                                        break;
                                    default:
                                        self.isScrollbarDown = false;
                                        !self.isScrollbarActive && self.$scrollbar.removeClass('active');
                                        break;
                                }
                            };
                        }()
                    });
                }

                // 휠스크롤 바인딩
                self.$selectbox.on('mousewheel DOMMouseScroll wheel', function (event) {
                    if (!self.isVisibleScrollbar) {
                        return;
                    }
                    //event.preventDefault();
                    var e = event.originalEvent,
                        delta = core.dom.getDeltaY(e) * 40,
                        scrollTop = $listChild.scrollTop();

                    $listChild.scrollTop(scrollTop - delta);
                    //if ($listChild.scrollTop() == scrollTop) {
                    event.preventDefault();
                    event.stopPropagation();
                    //}
                });
            } else {
                // 리스트 드래그 바인딩

                self.$list.vcGesture({
                    direction: 'vertical',
                    gesture: function () {
                        var currY = 0;
                        return function (type, data) {
                            if (!self.isVisibleScrollbar) {
                                return false;
                            }
                            switch (type) {
                                case 'start':
                                    currY = $listChild.scrollTop();
                                    break;
                                case 'move':
                                    $listChild.scrollTop(currY - data.diff.y);
                                    break;
                            }
                        };
                    }()
                });
            }
            // ScrollBar Event Bind End
        },

        /**
         * 스크롤바 삭제
         * @private
         */
        _hideScroll: function _hideScroll() {
            var self = this;

            self.isVisibleScrollbar = false;
            self.$scrollbar.hide().css({ 'height': 0, 'top': 0 }).find('span.bg_mid').css('height', 0);
        },

        /**
         * 스크롤바 갱신
         * @private
         */
        _scrollUpdate: function _scrollUpdate() {
            var self = this;
            if (!self.isVisibleScrollbar) {
                return;
            }
            var rate = (self.wrapperHeight - self.scrollBarHeight) / (self.scrollerHeight - self.wrapperHeight);
            self._scrollbarMove(self.$listWrapper.scrollTop() * rate);
        },

        /**
         * 스크롤바 이동
         * @param top
         * @returns {number|*}
         * @private
         */
        _scrollbarMove: function _scrollbarMove(top) {
            var self = this;

            if (!self.isVisibleScrollbar) {
                return;
            }
            top = Math.min(self.scrollHeight, Math.max(0, top));
            self.$scrollbar.css({
                'height': Math.ceil(self.scrollBarHeight),
                'top': top
            }).find('span.bg_mid').css('height', Math.ceil(self.scrollBarHeight) - 24);
            return top;
        },

        // 스크롤링
        _scrollTop: function _scrollTop(top) {
            var self = this;

            self.$listWrapper.scrollTop(top * self.scrollRate);
            self._scrollUpdate();
        },

        /**
         * 활성화된 아이템을 가시영역에 보이도록 강제 스크롤
         * @private
         */
        _scrollToItem: function _scrollToItem() {
            var self = this,
                selIndex = self.el.selectedIndex;

            if (selIndex > 0) {
                var $option = self.$list.find('li').eq(selIndex),
                    scrollTop = self.$listWrapper.scrollTop(),
                    optionTop = $option.position().top + scrollTop,
                    wrapperHeight = self.$list.height(),
                    optionHeight,
                    listHeight;

                if (optionTop < scrollTop || optionTop >= wrapperHeight + scrollTop) {
                    optionHeight = $option.height();
                    listHeight = self.$listWrapper.height();
                    self.$listWrapper.scrollTop(optionTop - listHeight / 2 + optionHeight / 2);
                }
            } else {
                self.$listWrapper.scrollTop(0);
            }
        },

        /**
         * 스크롤바 재배치(꼭 해야되는 상황일 때만 갱신함)
         * @private
         */
        _refreshScroll: function _refreshScroll() {
            var self = this;

            self.scrollerHeight = self.$list.find('ul').height();
            if (self.maxHeight > self.scrollerHeight) {
                self._hideScroll();
                return;
            }

            self.wrapperHeight = self.$listWrapper.height(); // - (self.options.containerMargin * 2);
            if (self.scrollerHeight <= self.wrapperHeight) {
                self._hideScroll();
                return;
            } else if (self.$selectbox.hasClass('on')) {
                self.$scrollbar.show();
                self.isVisibleScrollbar = true;
            }
            if (!self._bindedOverEvents) {
                self._bindedOverEvents = true;
                self._bindScrollEvent();
            }
            self.scrollRate = self.wrapperHeight / self.scrollerHeight;
            self.scrollBarHeight = Math.max(30, self.wrapperHeight * self.scrollRate);
            self.scrollHeight = self.wrapperHeight - self.scrollBarHeight;
            self.isScrollbarDown = false;
            self.moveY = 0;

            self._scrollUpdate();
        },

        /**
         * 소멸자
         */
        release: function release() {
            var self = this;

            $doc.off('.selectbox' + self.cid);
            $win.off('.' + self.cid);
            self.$scrollbar.off();
            self.$label.off().remove();
            self.$list.off().remove();
            self.$selectbox.off().remove();
            self.$el.off('change.selectbox').show().unwrap('<div></div>');
            self.supr();
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    var PickerSelectbox = core.ui('PickerSelectbox', BaseSelectbox, {
        defaults: {
            widthClass:' '
        },
        templates: {
            label: '<div class="ui-selectbox-view"><a href="#0" class="ui-select-button" title="">{{#raw html}}</a></div>'
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self._create();
            self._bindEvents();
        },

        _create: function _create() {
            var self = this,
                cls = self.$el.attr('data-class') || 'ui-selectbox-wrap',
                elId = !self.options.id ? '' : ' id="' + self.options.id + '"';

            self.originalWidth = parseInt(self.$el.css('width'), 10) + 22;
            self.attrTitle = self.options.title || self.$el.attr('title') || '셀렉트박스';
            if (self.options.wrapClasses) {
                cls = cls + ' ' + self.options.wrapClasses;
            }

            // 셀렉트박스
            self.$selectbox = $('<div class="' + cls + '" ' + elId + '></div>');
            if (!self.options.widthClass) {
                self.$selectbox.css('width', self.originalWidth);
            } else {
                self.$selectbox.addClass(self.options.widthClass);
            }

            self.$el.css({
                '-webkit-appearance': 'none',
                '-moz-appearance': 'none',
                'border-radius': 0,
                'opacity': 0,
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'bottom': 0,
                'width': '100%'
            });
            self.$selectbox.insertBefore(self.$el);
            
            self.$label = $(self.tmpl('label', {
                html: self._itemHTML(self.el.options[self.el.selectedIndex], 'label')
            })).appendTo(self.$selectbox);

            self.$selectbox.prepend(self.$el);
            self.display = self.$el.css('display') !== 'none';
            self.$selectbox.toggle(self.display);
            self._updateLabel();
        },

        _bindEvents: function _bindEvents() {
            var self = this;

            self.$el.on('change', function () {
                self._updateLabel(self.el.selectedIndex);
            }).on('focusin focusout', function (e) {
                self.$selectbox.toggleClass('active', e.type === 'focusin');
            });
        },

        _updateLabel: function _updateLabel() {
            this.supr();
            if (this.$el.prop('readonly') === true) {
                this.$el.hide();
            }
        },

        update: function update(list, selectedValue) {
            list && this.supr(list, selectedValue);
            this._updateLabel();
        }
    });

    var Selectbox = core.ui('Selectbox', /** @lends vcui.ui.Selectbox# */{
        bindjQuery: 'Selectbox',
        defaults: {
            allowPicker: true
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }
            delete self.options.on;
            delete self.options.events;

            // 모바일에서 픽커가 아닌 커스텀셀렉트박스를 띄워야하는지 체크
            if (self.$el.attr('data-width-class') === 'f_wd_one') {
                self.options.allowPicker = false;
            }
            if (core.detect.isTouch && core.detect.isMobile && self.options.allowPicker !== false) {
                // picker
                self.sel = new PickerSelectbox(el, self.options);
            } else {
                // custom (dom ui)
                self.sel = new CustomSelectbox(el, self.options);
            }

            // puiblic 메소드를 외부에서 호출할 수 있도록 현재인스턴스에 추가
            self.$selectbox = self.sel.$selectbox;
            core.each(['selectedIndex', 'value', 'text', 'selectedOption', 'update', 'hide', 'show', 'toggle', 'readonly', 'disabled', 'focus'], function (name) {
                self[name] = function () {
                    return this.sel[name].apply(this.sel, [].slice.call(arguments, 0));
                };
            });
        }
    });

    core.ui.setDefaults('Selectbox', {
        events: {
            'selectboxopen': function selectboxopen(e) {
                if (this.options.preventZindex) {
                    return;
                }
                this.$el.parentsUntil('#wrap').filter(function (i) {
                    return $(this).css('position') === 'relative';
                }).addClass('zindex');
            },
            'selectboxclose': function selectboxclose(e) {
                if (this.options.preventZindex) {
                    return;
                }
                this.$el.parents('.zindex').removeClass('zindex');
            }
        }
    });

    return Selectbox;
});
/*!
 * @module vcui.ui.Tab
 * @license MIT License
 * @description 탭 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('ui/tab', ['jquery', 'vcui', 'ui/smoothScroll'], function ($, core) {
    "use strict";

    var name = 'tab',
        eventInit = name + 'init',
        eventBeforeChange = name + 'beforechange',
        eventChanged = name + 'change',
        selectedClass = 'on';

    var prefixClass = '.ui_tab_';
    /**
     * @class
     * @name vcui.ui.Tab
     * @description 페이징모듈
     * @extends vcui.ui.View
     */
    var Tab = core.ui('Tab', /** @lends vcui.ui.Tab# */{
        bindjQuery: 'tab',
        $statics: /** @lends vcui.ui.Tab */{
            ON_CHANGE: eventBeforeChange,
            ON_CHANGED: eventChanged
        },
        defaults: {
            selectedIndex: 0,
            selectedClass: selectedClass,
            selectedText: '선택됨',
            tabsSelector: '>ul>li',
            tabForceHeight: false,            
        },

        selectors: {
            prevButton : null,
            nextButton : null,
            smoothScroll : null
        },
        /**
         * 생성자
         * @param {string|Element|jQuery} el 해당 엘리먼트(노드, id, jQuery 어떤 형식이든 상관없다)
         * @param {object} [options] 옵션값
         * @param {number} [options.selectedIndex = 0]  초기선택값
         * @param {string} [options.selectedClass = 'on'] 활성 css클래스명
         * @param {string} [options.tabType = 'inner'] 탭형식(inner | outer)
         */
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            var $hide = self.$('.blind:first');
            self.$srText = $hide.length ? $hide : $('<em class="blind">' + self.options.selectedText + '</em>');

            var $child = self.$el.children().eq(0);

            if (!$child.is('ul')) {

                self.options.tabsSelector = '>' + $child[0].tagName.toLowerCase() + self.options.tabsSelector;
                if ($child.css('overflow') === 'hidden') {
                    self.$smoothScroll = $child;
                    self.$smoothScroll.vcSmoothScroll(); 

                }
            }
            if(self.$smoothScroll[0]){

                self.$smoothScroll.vcSmoothScroll({
                    center: true, 
                    autoCenterScroll:false, 
                    selectors:{ 
                        smoothScroll:self.$smoothScroll,
                        prevButton:self.$prevButton, 
                        nextButton:self.$nextButton
                    }
                });
            }

            self.panelNameArr = [];

            self.update();
            self._bindEvents();

            var index = self.$tabs.filter('.' + selectedClass).index();
            if (index >= 0) {
                self.options.selectedIndex = index;
            }
            self.select(self.options.selectedIndex, true);

            self.triggerHandler(eventInit, {
                selectedIndex: index,
                relatedTarget: self.$tabs.get(index),
                button: self.$tabs.eq(index).find('>a'),
                content: self.$contents.eq(index)
            });
        },
        

        update: function update() {
            var self = this;
            self._findControls();
            self._buildARIA();                 

            if(self.$smoothScroll && self.$smoothScroll[0]) self.$smoothScroll.vcSmoothScroll('refresh');  

        },
        getSelectIdx:function getSelectIdx(){
            return this.selectedIndex;
        },
        _findControls: function _findControls() {
            var self = this;
            var selectors = [];
            self.$tabs = self.$(self.options.tabsSelector);
            self.$contents = $();
            // 탭버튼의 href에 있는 #아이디 를 가져와서 컨텐츠를 조회
            self.$tabs.each(function () {
                var $tab = $(this),
                    $panel,
                    href = $tab.find('a').attr('href');
                if (href && /^(#|\.)\w+/.test(href)) {
                    if (($panel = $tab.find('>div')).length) {
                        self.$contents = self.$contents.add($panel);
                    } else {
                        self.panelNameArr.push(href);
                        self.$contents = self.$contents.add($(href));
                    }
                }
            });
            if (!self.$contents.length) {
                self.$contents = self.$('>' + prefixClass + 'panel');
            }
        },
        /**
         * @private
         */
        _bindEvents: function _bindEvents() {
            var self = this;
            self.on('click keydown', self.options.tabsSelector + '>a, ' + self.options.tabsSelector + '>button', function (e) {
                switch (e.type) {
                    case 'click':
                        e.preventDefault();
                        self.select($(e.currentTarget).parent().index());
                        break;
                    case 'keydown':
                        var index = $(e.currentTarget).parent().index(),
                            newIndex;
                        switch (e.which) {
                            case core.keyCode.RIGHT:
                                e.preventDefault();
                                newIndex = Math.min(self.$tabs.length - 1, index + 1);
                                break;
                            case core.keyCode.LEFT:
                                e.preventDefault();
                                newIndex = Math.max(0, index - 1);
                                break;
                            default:
                                return;
                        }
                        self.select(newIndex);
                        self.$tabs.eq(self.selectedIndex).find('>a, >button').focus();
                        break;
                }
            });
        },
        /**
         * aria 속성 빌드
         * @private
         */
        _buildARIA: function _buildARIA() {
            var self = this,
                tablistid = self.cid,
                tabid;
            self.$el.attr('role', 'tablist');
            self.$tabs.each(function (i) {
                tabid = $(this).children().attr('href').substr(1) || (tablistid + '_' + i);
                $(this)
                    .attr({
                        'role': 'presentation'
                    })
                    .children()
                    .attr({
                        //'id': tabid,
                        'role': 'tab',
                        'aria-selected': 'false',
                        'aria-controls': tabid
                    });
                if (!self.$contents.eq(i).attr('id')) {
                    self.$contents.eq(i).attr('id', tabid);
                }
                self.$contents.eq(i).attr({
                    'aria-labelledby': tabid,
                    'role': 'tabpanel',
                    'aria-hidden': self.selectedIndex === i ? 'false' : 'true'
                });
            });
        },
        _updateTabHeight: function () {
            var self = this;
            var maxHeight = 0;
            if (self.options.tabForceHeight) {
                self.$tabs.find('a').css('height', '').each(function (i) {
                    var h = $(this).height();
                    if (h > maxHeight) {
                        maxHeight = h;
                    }
                });
                self.$tabs.find('a').css('height', maxHeight);
            }
        },

        /**
         * name으로 해당하는 탭을 활성화
         * @param {string} name 패널이름
         * @example
         * $('#tab').tab('selectByName', '#패널이름');
         */
        selectByName:function selectByName(name, noTrigger){
            var self = this;
            if(self.panelNameArr.length == 0) return;
            var index = vcui.array.indexOf(self.panelNameArr, name);
            if(index>-1) self.select(index, noTrigger);
        },
        
        /**
         * index에 해당하는 탭을 활성화
         * @param {number} index 탭버튼 인덱스
         * @fires vcui.ui.Tab#tabbeforechange
         * @fires vcui.ui.Tab#tabchange
         * @example
         * $('#tab').tab('select', 1);
         * // or
         * $('#tab').tab('instance').select(1);
         */
        select: function select(index, noTrigger) {
            var self = this,
                e;

                // console.log('select', index, noTrigger);

            if(!noTrigger){
                //if (index < 0 || self.$tabs.length && index >= self.$tabs.length) {
                if (self.$tabs.length && index >= self.$tabs.length) {
                    return;
                    //throw new Error('index 가 범위를 벗어났습니다.');
                }
            }
            
            if(!noTrigger){

                /**
                 * 탭이 바뀌기 직전에 발생. e.preventDefault()를 호출함으로써 탭변환을 취소할 수 있다.
                 * @event vcui.ui.Tab#tabbeforechange
                 * @type {object}
                 * @property {number} selectedIndex 선택된 탭버튼의 인덱스
                 */

                self.triggerHandler(e = $.Event(eventBeforeChange), {
                    selectedIndex: index,
                    relatedTarget: self.$tabs.get(index),
                    button: self.$tabs.eq(index).find('>a'),
                    content: self.$contents.eq(index)
                });
                if (e.isDefaultPrevented()) {
                    return;
                }
            }

            self.selectedIndex = index;

            var $a, $hide;

            if(index<0){
                $a = self.$tabs.removeClass(selectedClass).children('a, button').attr('aria-selected', false);
            }else{
                $a = self.$tabs.removeClass(selectedClass).children('a, button').attr('aria-selected', false).end().eq(index).addClass(selectedClass).children('a, button').attr('aria-selected', true);
            }
        

            if (($hide = $a.find('.blind')).length) {
                self.$tabs.not(self.$tabs.eq(index)).find('>a .blind').text("");
                $hide.text(self.options.selectedText);
            } else {
                $a.append(self.$srText);
            }

            // 컨텐츠가 li바깥에 위치한 탭인 경우
            if(index<0){
                self.$contents.hide().attr('aria-hidden', 'true');
            }else{
                self.$contents.hide().attr('aria-hidden', 'true').eq(index).attr('aria-hidden', 'false').show();
            }

            self._updateTabHeight();

            if(!noTrigger){
                /**
                 * 탭이 바뀌기 직전에 발생. e.preventDefault()를 호출함으로써 탭변환을 취소할 수 있다.
                 * @event vcui.ui.Tab#tabchange
                 * @type {object}
                 * @property {number} selectedIndex 선택된 탭버튼의 인덱스
                 */

                //evt = $.Event(eventChanged)

                self.triggerHandler(eventChanged, {
                    selectedIndex: index,
                    relatedTarget: self.$tabs.get(index),
                    button: self.$tabs.eq(index).find('>a'),
                    content: self.$contents.eq(index)
                });
            }
        }

    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return Tab;
});
/*!
 * @module vcui.ui.ScrollNavi
 * @license MIT License
 * @description ScrollNavi
 * @copyright VinylC UID Group
 * 

 * 
 */
vcui.define('ui/scrollNavi', ['jquery', 'vcui', 'ui/smoothScroll'], function ($, core) {
    "use strict";

    var $win = $(window)

    /**
     * @class
     * @description .
     * @name vcui.ui.ScrollNavi
     * @extends vcui.ui.View
     */

    var ScrollNavi = core.ui('ScrollNavi', /** @lends vcui.ui.ScrollNavi# */{
        bindjQuery: 'scrollNavi',
        defaults: {    
            isSnap : true
        },
        selectors: {
            items : 'li'
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }
            

            self._build();
            self._bindEvent();   
            
        },

        _build: function _build() {
            var self = this;
            self.posArr = [];
            self.selectedIndex = 0;
            self.paddingLeft = parseInt(self.$el.css('paddingLeft'), 10);

            self.areaWidth = self.$el.width();

            self.smoothScroll = new vcui.ui.SmoothScroll(self.$el, {autoCenterScroll:false, center:false});



            //self.$el.vcSmoothScroll({autoCenterScroll:false, center:false});
        },

        _bindEvent  : function _bindEvent() {
            var self = this;
            $win.on('resizeend', function(e){
                self.update();
            });
            self.$el.on('smoothscrollstart smoothscrollend', function(e, data){

                if(e.type == 'smoothscrollstart'){
                    self.isScrollEnd = false;
                }else if(e.type == 'smoothscrollend'){

                    //if(!self.isScrollEnd) {
                        self.isScrollEnd = true;
                        self.selectedIndex = self._getIndexWithX(self.posArr, -data.x+self.areaWidth/2);
                        
                        /*
                        if(self.interval != null) {
                            clearInterval(self.interval);
                        }                    
                        self.interval = setInterval(function(){
                            self._scrollToIndex(self.selectedIndex, 200);
                            clearInterval(self.interval);
                        }, 1000);    
                        */                    

                        
                    //};                     
                }


            });

            $win.trigger('resizeend');
        },

        _getIndexWithX : function _getIndexWithX(pArr,xp){
            var self = this;
            var sIdx = 0;

            for(var i=0; i<pArr.length-1; i++){
                if(xp >= pArr[i] && xp < pArr[i+1]){
                    sIdx = i;
                    break;
                }
            }
            return sIdx;
        },

        update : function update(){
            var self = this;
            self.smoothScroll.scrollTo(0,0);
            var width = self.$el.width();
            var xp,fx=0,wd = 0;
            self.totalWidth = 0;
            self.posArr = [-self.paddingLeft];

            var target = self.$items.filter('.on');
            var sx = Math.ceil(target.length > 0? target.eq(0).position().left : 0);
            self.$items.each(function (idx) {
                xp = Math.ceil($(this).position().left);
                wd = Math.ceil($(this).outerWidth(true));
                if(width+fx < xp+wd+self.paddingLeft){
                    fx = xp;
                    self.posArr.push(fx);
                }
                if(idx===self.$items.length-1){
                    self.posArr.push(xp+wd);
                }
            });

            
            self.totalWidth = xp + wd - width;
            self.selectedIndex = self._getIndexWithX(self.posArr,sx);
            self._scrollToIndex(self.selectedIndex);
        },

        _scrollToIndex : function _scrollToIndex(idx, duration){
            var self = this;
            var px = self.posArr[idx];
            var dx = self.totalWidth - px;
            self.smoothScroll.scrollTo(dx<0? -px-dx : px*-1, 0, duration? duration : 0);
            //self.$el.vcSmoothScroll('scrollTo', dx<0? -px-dx : px*-1, 0, duration? duration : 0);
        },

        prevPage : function prevPage(){
            var self = this;
            self.selectedIndex = Math.max(self.selectedIndex-1, 0);
            self._scrollToIndex(self.selectedIndex, 200);
        },

        nextPage : function nextPage(){
            var self = this;
            self.selectedIndex = Math.min(self.selectedIndex+1, self.posArr.length-2);
            self._scrollToIndex(self.selectedIndex, 200);
        },



    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return ScrollNavi;
});
/*!
 * @module vcui.ui.SmoothScroll // 바이널 UI 라이브러리
 * @license MIT License
 * @description SmoothScroll
 * @copyright VinylC UID Group
 */
vcui.define('ui/smoothScroll', ['jquery', 'vcui'], function ($, core) {
    "use strict";
    /*! iScroll v5.1.2 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */

    var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    var _elementStyle = document.createElement('div').style;
    var _vendor = function () {
        var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
            transform,
            i = 0,
            l = vendors.length;

        for (; i < l; i++) {
            transform = vendors[i] + 'ransform';
            if (transform in _elementStyle) {
                return vendors[i].substr(0, vendors[i].length - 1);
            }
        }

        return false;
    }();

    function _prefixStyle(style) {
        if (_vendor === false) return false;
        if (_vendor === '') return style;
        return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    }

    var _transform = _prefixStyle('transform');

    var getTime = Date.now || function getTime() {
        return new Date().getTime();
    };

    var momentum = function momentum(current, start, time, lowerMargin, wrapperSize, deceleration) {
        var distance = current - start,
            speed = Math.abs(distance) / time,
            destination,
            duration;

        deceleration = deceleration === undefined ? 0.0006 : deceleration;

        destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
        duration = speed / deceleration;

        if (destination < lowerMargin) {
            destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
            distance = Math.abs(destination - current);
            duration = distance / speed;
        } else if (destination > 0) {
            destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
            distance = Math.abs(current) + destination;
            duration = distance / speed;
        }

        return {
            destination: Math.round(destination),
            duration: duration
        };
    };

    var browser = {
        hasTransform: _transform !== false,
        hasPerspective: _prefixStyle('perspective') in _elementStyle,
        hasTouch: 'ontouchstart' in window,
        hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
        hasTransition: _prefixStyle('transition') in _elementStyle
    };

    var easingType = {
        quadratic: {
            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fn: function fn(k) {
                return k * (2 - k);
            }
        },
        circular: {
            style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
            fn: function fn(k) {
                return Math.sqrt(1 - --k * k);
            }
        },
        back: {
            style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            fn: function fn(k) {
                var b = 4;
                return (k = k - 1) * k * ((b + 1) * k + b) + 1;
            }
        },
        bounce: {
            style: '',
            fn: function fn(k) {
                if ((k /= 1) < 1 / 2.75) {
                    return 7.5625 * k * k;
                } else if (k < 2 / 2.75) {
                    return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
                } else if (k < 2.5 / 2.75) {
                    return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
                } else {
                    return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
                }
            }
        },
        elastic: {
            style: '',
            fn: function fn(k) {
                var f = 0.22,
                    e = 0.4;

                if (k === 0) {
                    return 0;
                }
                if (k == 1) {
                    return 1;
                }

                return e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1;
            }
        }
    };

    var eventType = {
        touchstart: 1,
        touchmove: 1,
        touchend: 1,

        mousedown: 2,
        mousemove: 2,
        mouseup: 2,
        mouseleave: 2,

        pointerdown: 3,
        pointermove: 3,
        pointerup: 3,

        MSPointerDown: 3,
        MSPointerMove: 3,
        MSPointerUp: 3,

    };

    var style = {
        transform: _transform,
        transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
        transitionDuration: _prefixStyle('transitionDuration'),
        transitionDelay: _prefixStyle('transitionDelay'),
        transformOrigin: _prefixStyle('transformOrigin')
    };

    var SmoothScroll = core.ui('SmoothScroll', {
        bindjQuery: 'smoothScroll',
        defaults: {
            startX: 0,
            startY: 0,
            scrollX: true,
            scrollY: true,
            directionLockThreshold: 5,
            mouseWheelSpeed: 20,
            momentum: true,
            autoCenterScroll: true,            

            bounce: true,
            bounceTime: 600,
            bounceEasing: '',

            preventDefault: false,
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/i },

            HWCompositing: true,
            useTransition: true,
            useTransform: true,
            resizeRefresh: true
            
        },
        selectors: {
            scroller: '>*:first',
            prevButton: '',
            nextButton: ''
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            var opts = self.options;

            self.$wrapper = self.$el.css('user-select', 'none');
            self.isBadAndroid = /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion);
            self.translateZ = opts.HWCompositing && browser.hasPerspective ? ' translateZ(0)' : '';
            opts.useTransition = browser.hasTransition && opts.useTransition;
            opts.useTransform = browser.hasTransform && opts.useTransform;
            opts.eventPassthrough = opts.eventPassthrough === true ? 'vertical' : opts.eventPassthrough;
            opts.preventDefault = !opts.eventPassthrough && opts.preventDefault;
            opts.scrollY = opts.eventPassthrough == 'vertical' ? false : opts.scrollY;
            opts.scrollX = opts.eventPassthrough == 'horizontal' ? false : opts.scrollX;
            opts.freeScroll = opts.freeScroll && !opts.eventPassthrough;
            opts.directionLockThreshold = opts.eventPassthrough ? 0 : opts.directionLockThreshold;
            opts.bounceEasing = typeof opts.bounceEasing == 'string' ? easingType[opts.bounceEasing] || easingType.circular : opts.bounceEasing;
            opts.resizePolling = opts.resizePolling === undefined ? 60 : opts.resizePolling;
            opts.invertWheelDirection = opts.invertWheelDirection ? -1 : 1;

            self.x = 0;
            self.y = 0;
            self.directionX = 0;
            self.directionY = 0;

            self.$el.css('overflow', 'hidden');            

            self._initEvents();    
            self.scrollerStyle = self.$scroller[0].style;
            self.scrollTo(0,0,0);
            self.enable();

            if (opts.autoCenterScroll) {
                self.scrollToActive(true, false, 0);
            } else {
                self.scrollTo(opts.startX, opts.startY, 0);
                        
            }

            self.refresh();
            self._activateButtons();
            
        },

        _calcScrollerWidth: function _calcScrollerWidth() {
            var self = this,
                opts = self.options,
                width = 0,
                paddingWidth = self.$scroller.outerWidth() - self.$scroller.width();

            self.$items = self.$scroller.children();

            self.$items.each(function () {
                if(this.style.display!="none") {
                    width += $(this).outerWidth(true);
                }
            });
            self.$scroller.css('width', width + paddingWidth);
        },

        _activateButtons: function _activateButtons() {
            var self = this;
            if (self.$prevButton) {
                self.$prevButton.prop('disabled', self.x === 0);
                if (self.x === 0) {
                    self.$prevButton.addClass('disabled');
                } else {
                    self.$prevButton.removeClass('disabled');
                }
            }

            if (self.$nextButton) {
                self.$nextButton.prop('disabled', self.x === self.maxScrollX);
                if (self.x === self.maxScrollX) {
                    self.$nextButton.addClass('disabled');
                } else {
                    self.$nextButton.removeClass('disabled');
                }
            }

            

        },

        enable: function enable() {
            this.enabled = true;
        },

        toggleEnabled: function(chk){
            this.enabled = chk;
        },

        _initEvents: function _initEvents() {
            var self = this;
            var opt = self.options;

            //if (opt.prevButton && opt.nextButton) {
                self.$prevButton.on('click' + self.eventNS, function (e) {
                    e.preventDefault();
                    self.prevPage();
                });

                self.$nextButton.on('click' + self.eventNS, function (e) {
                    e.preventDefault();
                    self.nextPage();
                });

                self.on('smoothscrollend', function (e, data) {
                    self._activateButtons();
                });
            //}

            self._handle(self.$wrapper, 'mousedown');
            self._handle(self.$wrapper, 'mouseleave');
            self._handle(self.$wrapper, 'mouseup');
            self._handle(self.$wrapper, 'mousecancel');
            self._handle(self.$wrapper, 'touchstart');
            self._handle(self.$wrapper, 'selectstart');
            self._handle(self.$wrapper, 'click');

            if (self.options.useTransition) {
                self._handle(self.$scroller, 'transitionend');
                self._handle(self.$scroller, 'webkitTransitionEnd');
                self._handle(self.$scroller, 'oTransitionEnd');
                self._handle(self.$scroller, 'MSTransitionEnd');
            }

            self._initWheel();

            if (self.options.resizeRefresh) {
                self.winOn('resize', core.delayRun(function () {
                    self.refresh();
                }, self.options.resizePolling));
            }
        },
        _initWheel: function _initWheel() {
            var self = this;

            self._handle(self.$wrapper, 'wheel');
            self._handle(self.$wrapper, 'mousewheel');
            self._handle(self.$wrapper, 'DOMMouseScroll');
        },

        moveFirst: function moveFirst() {
            this.scrollTo(0, 0, 200);
        },

        moveLast: function moveLast() {
            this.scrollTo(this.maxScrollX, 0, 200);
        },

        _wheel: function _wheel(e) {
            var self = this;
            if (!self.enabled) {
                return;
            }

            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            e.stopPropagation ? e.stopPropagation() : e.cancalBubble = true;

            var wheelDeltaX, wheelDeltaY, newX, newY;

            if (self.wheelTimeout === undefined) {
                self.triggerHandler('smoothscrollstart', { x: self.x, y: self.y });
            }

            // Execute the scrollEnd event after 400ms the wheel stopped scrolling
            clearTimeout(self.wheelTimeout);
            self.wheelTimeout = setTimeout(function () {
                self.triggerHandler('smoothscrollend', {
                    x: self.x,
                    y: self.y,
                    isStart: self.x === 0,
                    isEnd: self.x === self.maxScrollX
                });
                self.wheelTimeout = undefined;
            }, 400);

            e = e.originalEvent || e;
            if ('deltaX' in e) {
                if (e.deltaMode === 1) {
                    wheelDeltaX = -e.deltaX * self.options.mouseWheelSpeed;
                    wheelDeltaY = -e.deltaY * self.options.mouseWheelSpeed;
                } else {
                    wheelDeltaX = -e.deltaX;
                    wheelDeltaY = -e.deltaY;
                }
            } else if ('wheelDeltaX' in e) {
                wheelDeltaX = e.wheelDeltaX / 120 * self.options.mouseWheelSpeed;
                wheelDeltaY = e.wheelDeltaY / 120 * self.options.mouseWheelSpeed;
            } else if ('wheelDelta' in e) {
                wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * self.options.mouseWheelSpeed;
            } else if ('detail' in e) {
                wheelDeltaX = wheelDeltaY = -e.detail / 3 * self.options.mouseWheelSpeed;
            } else {
                return;
            }

            wheelDeltaX *= self.options.invertWheelDirection;
            wheelDeltaY *= self.options.invertWheelDirection;

            if (!self.hasVerticalScroll) {
                wheelDeltaX = wheelDeltaY;
                wheelDeltaY = 0;
            }

            newX = self.x + Math.round(self.hasHorizontalScroll ? wheelDeltaX : 0);
            newY = self.y + Math.round(self.hasVerticalScroll ? wheelDeltaY : 0);

            if (newX > 0) {
                newX = 0;
            } else if (newX < self.maxScrollX) {
                newX = self.maxScrollX;
            }

            if (newY > 0) {
                newY = 0;
            } else if (newY < self.maxScrollY) {
                newY = self.maxScrollY;
            }

            self.scrollTo(newX, newY, 0);
        },

        _handle: function _handle($el, eventName, isBind) {
            var self = this;
            if (isBind !== false) {
                $el.on(eventName + '.' + self.cid, self.handleEvent.bind(self));
            } else {
                $el.off(eventName + '.' + self.cid);
            }
        },

        handleEvent: function handleEvent(e) {
            var self = this;

            switch (e.type) {
                case 'mousedown':
                case 'touchstart':
                    self._start(e);
                    break;
                case 'selectstart':
                    e.preventDefault ? e.preventDefault : e.returnValue = false;
                    break;
                case 'mousemove':
                case 'touchmove':
                    self._move(e);
                    break;
                case 'mouseup':  
                    self._end(e);
                    break;                   
                case 'mouseleave':
                    self._end(e);
                    break; 
                case 'mousecancel':   
                    self._end(e);
                    break;                                     
                case 'touchend':
                case 'touchcancel':
                    self._end(e);
                    break;
                case 'transitionend':
                case 'webkitTransitionEnd':
                case 'oTransitionEnd':
                case 'MSTransitionEnd':
                    self._transitionEnd(e);
                    break;
                case 'wheel':
                case 'mousewheel':
                case 'DOMMouseScroll':
                    self._wheel(e);
                    break;
                //case 'click':
                //    me._click(e);
                //    break;
            }
        },

        prevPage: function prevPage() {
            var self = this;
            self.scrollTo(Math.min(0, self.x + self.wrapperWidth), 0, 200);
        },

        nextPage: function nextPage() {
            var self = this;
            self.scrollTo(Math.max(self.maxScrollX, self.x - self.wrapperWidth), 0, 200);
        },

        getPosition: function getPosition() {
            var matrix = this.scrollerStyle,
                x,
                y;

            if (this.options.useTransform) {
                matrix = matrix[style.transform].match(/-?[0-9]+/g);
                x = +matrix[0];
                y = +matrix[1];
            } else {
                x = +matrix.left.replace(/[^-\d.]/g, '');
                y = +matrix.top.replace(/[^-\d.]/g, '');
            }

            return { x: x, y: y };
        },

        _animate: function _animate(destX, destY, duration, easingFn) {
            var self = this,
                startX = this.x,
                startY = this.y,
                startTime = getTime(),
                destTime = startTime + duration;

            function step() {
                var now = getTime(),
                    newX,
                    newY,
                    easing;

                if (now >= destTime) {
                    self.isAnimating = false;
                    self._translate(destX, destY);

                    if (!self.resetPosition(self.options.bounceTime)) {
                        self.triggerHandler('smoothscrollend', {
                            x: self.x,
                            y: self.y,
                            isStart: self.x === 0,
                            isEnd: self.x === self.maxScrollX
                        });
                    }

                    return;
                }

                now = (now - startTime) / duration;
                easing = easingFn(now);
                newX = (destX - startX) * easing + startX;
                newY = (destY - startY) * easing + startY;
                self._translate(newX, newY);

                if (self.isAnimating) {
                    rAF(step);
                }
            }

            this.isAnimating = true;
            step();
        },

        _transitionTime: function _transitionTime(time) {
            time = time || 0;

            this.scrollerStyle[style.transitionDuration] = time + 'ms';

            /*if ( !time && utils.isBadAndroid ) {
             this.scrollerStyle[style.transitionDuration] = '0.001s';
             }*/
        },

        _transitionTimingFunction: function _transitionTimingFunction(easing) {
            this.scrollerStyle[style.transitionTimingFunction] = easing;
        },

        _translate: function _translate(x, y) {
            var self = this;

            if (self.options.useTransform) {
                self.scrollerStyle[style.transform] = 'translate(' + x + 'px,' + y + 'px)' + self.translateZ;

            } else {
                x = Math.round(x);
                y = Math.round(y);
                self.scrollerStyle.left = x + 'px';
                self.scrollerStyle.top = y + 'px';

            }

            self.x = x;
            self.y = y;

            
            self.triggerHandler('smoothscrollmove', { x: self.x, y: self.y });
        },

        resetPosition: function resetPosition(time) {
            var self = this,
                x = self.x,
                y = self.y;

            time = time || 0;

            if (!self.hasHorizontalScroll || self.x > 0) {
                x = 0;
            } else if (self.x < self.maxScrollX) {
                x = self.maxScrollX;
            }

            if (!self.hasVerticalScroll || self.y > 0) {
                y = 0;
            } else if (self.y < self.maxScrollY) {
                y = self.maxScrollY;
            }
            
            if (x == self.x && y == self.y) {
                return false;
            }

            
            self.scrollTo(x, y, time, self.options.bounceEasing);
            return true;
        },

        scrollTo: function scrollTo(x, y, time, easing) {
            var self = this;
            easing = easing || easingType.circular;

            self.isInTransition = self.options.useTransition && time > 0;

            if (!time || self.options.useTransition && easing.style) {
                self._transitionTimingFunction(easing.style);
                self._transitionTime(time);
                self._translate(x, y);
                self.triggerHandler('smoothscrollend', { x: self.x, y: self.y, isStart: self.x === 0, isEnd: self.x === self.maxScrollX });
            } else {
                self._animate(x, y, time, easing.fn);
            }
        },

        scrollToElement: function scrollToElement(el, time, offsetX, offsetY, easing) {
            var self = this;
            el = el.nodeType ? el : self.$scroller.querySelector(el);

            if (!el) {
                return;
            }

            var $el = $(el);
            var xy = core.dom.getTranslateXY(self.$scroller[0]);
            var pos = $el.position();
            var maxX = Math.abs(self.maxScrollX);
            var maxY = Math.abs(self.maxScrollY);
            var width = $el.outerWidth();
            var itemLeft = pos.left;

            if (itemLeft >= Math.abs(self.x) && itemLeft + width < Math.abs(self.x) + self.wrapperWidth) {
                return;
            }

            pos.left += Math.abs(xy.x);
            pos.top += Math.abs(xy.y);

            pos.left -= parseInt($el.parent().css('paddingLeft'), 10);
            pos.top -= parseInt($el.parent().css('paddingTop'), 10);

            if (offsetX === true) {
                offsetX = Math.round(el.offsetWidth / 2 - self.$wrapper[0].offsetWidth / 2);
            }
            if (offsetY === true) {
                offsetY = Math.round(el.offsetHeight / 2 - self.$wrapper[0].offsetHeight / 2);
            }

            pos.left += offsetX || 0;
            pos.top += offsetY || 0;
            pos.left = Math.min(maxX, pos.left < 0 ? 0 : pos.left);
            pos.top = Math.min(maxY, pos.top < 0 ? 0 : pos.top);

            time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(self.x - pos.left), Math.abs(self.y - pos.top)) : time;

            self.scrollTo(-pos.left, -pos.top, time, easing);
        },

        
        scrollToActive: function scrollToActive(time, easing) {
            var $item = this.$scroller.children().filter('.on');
            if ($item.length) {
                this.scrollToElement($item[0], time? time:200, this.options.center);
            }
        },

        preventDefaultException: function preventDefaultException(el) {
            var self = this;

            if (el && el.tagName && self.options.preventDefaultException.tagName.test(el.tagName)) {
                return true;
            } else {
                return false;
            }
        },

        /***
         _isDownable: function(el){
            if(el && el.tagName && this.options.preventDefaultException.tagName.test(el.tagName)){
                return true;
            } else {
                return false;
            }
        },
         _click: function(e) {
            var me = this,
                point = e.touches ? e.touches[0] : e;
              if(!(me.downX === point.pageX && me.downY === point.pageY)) {
                console.log('prevent click', me.downX, me.downY, e.pageX, e.pageY);
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
            }
        },
         ***/
        _start: function _start(ev) {
            var self = this;
            var opt = self.options;
            var e = ev.originalEvent || ev;


            if (eventType[e.type] != 1) {
                if (e.button !== 0) {
                    return;
                }
            }

            if (!self.enabled || self.initiated && eventType[e.type] !== self.initiated) {
                return;
            }

            if ( /*!self.isBadAndroid && */self.preventDefaultException(e.target)) {
                e.preventDefault();
            }

            var $doc = $(document),
                point = e.touches ? e.touches[0] : e,
                pos;

            /***if(!me._isDownable($(e.target).closest(':focusable').get(0))) {
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
            }***/
            self._handle(self.$wrapper, 'mousemove');
            self._handle(self.$wrapper, 'touchmove');
            self._handle($doc, 'touchend');
            self._handle($doc, 'mouseup');
            self._handle($doc, 'mousecancel');
            self._handle($doc, 'touchcancel');


            self.initiated = eventType[e.type];
            self.moved = false;
            self.distX = 0;
            self.distY = 0;
            self.directionX = 0;
            self.directionY = 0;
            self.directionLocked = 0;

            self._transitionTime();
            

            self.startTime = getTime();
            if (opt.useTransition && self.isInTransition) {
                self.isInTransition = false;
                pos = self.getPosition();

                if(self.hasHorizontalScroll){
                    self._translate(Math.round(pos.x), 0);
                }else if(self.hasVerticalScroll){
                    self._translate(0, Math.round(pos.y));
                }
                //self._translate(Math.round(pos.x), Math.round(pos.y));
               
                self.triggerHandler('smoothscrollend', {
                    x: self.x,
                    y: self.y,
                    isStart: self.x === 0,
                    isEnd: self.x === self.maxScrollX
                });
            } else if (!opt.useTransition && self.isAnimating) {
                self.isAnimating = false;
                self.triggerHandler('smoothscrollend', {
                    x: self.x,
                    y: self.y,
                    isStart: self.x === 0,
                    isEnd: self.x === self.maxScrollX
                });
            }

            self.startX = self.x;
            self.startY = self.y;
            self.absStartX = self.x;
            self.absStartY = self.y;
            self.pointX = self.downX = point.pageX;
            self.pointY = self.downY = point.pageY;

        },

        _move: function _move(ev) {
            var self = this;
            var opt = self.options;
            var e = ev.originalEvent || ev;

            if (!self.enabled || eventType[e.type] !== self.initiated) {
                return;
            }

            if (opt.preventDefault) {
                // increases performance on Android? TODO: check!
                e.preventDefault ? e.preventDefault() : e.defaultValue = false;
            }

            var point = e.touches ? e.touches[0] : e,
                deltaX = point.pageX - self.pointX,
                deltaY = point.pageY - self.pointY,
                timestamp = getTime(),
                newX,
                newY,
                absDistX,
                absDistY;

            self.pointX = point.pageX;
            self.pointY = point.pageY;

            self.distX += deltaX;
            self.distY += deltaY;
            absDistX = Math.abs(self.distX);
            absDistY = Math.abs(self.distY);

            // We need to move at least 10 pixels for the scrolling to initiate
            if (timestamp - self.endTime > 300 && absDistX < 10 && absDistY < 10) {
                return;
            }

            // If you are scrolling in one direction lock the other
            if (!self.directionLocked && !opt.freeScroll) {
                if (absDistX > absDistY + opt.directionLockThreshold) {
                    self.directionLocked = 'h'; // lock horizontally
                } else if (absDistY >= absDistX + opt.directionLockThreshold) {
                    self.directionLocked = 'v'; // lock vertically
                } else {
                    self.directionLocked = 'n'; // no lock
                }
            }

            if (self.directionLocked == 'h') {
                if (opt.eventPassthrough == 'vertical') {
                    e.preventDefault ? e.preventDefault() : e.defaultValue = false;
                } else if (opt.eventPassthrough == 'horizontal') {
                    self.initiated = false;
                    return;
                }

                deltaY = 0;
            } else if (self.directionLocked == 'v') {
                if (opt.eventPassthrough == 'horizontal') {
                    e.preventDefault ? e.preventDefault() : e.defaultValue = false;
                } else if (opt.eventPassthrough == 'vertical') {
                    self.initiated = false;
                    return;
                }

                deltaX = 0;
            }

            deltaX = self.hasHorizontalScroll ? deltaX : 0;
            deltaY = self.hasVerticalScroll ? deltaY : 0;

            newX = self.x + deltaX;
            newY = self.y + deltaY;

            // Slow down if outside of the boundaries
            if (newX > 0 || newX < self.maxScrollX) {
                newX = opt.bounce ? self.x + deltaX / 3 : newX > 0 ? 0 : self.maxScrollX;
            }
            if (newY > 0 || newY < self.maxScrollY) {
                newY = opt.bounce ? self.y + deltaY / 3 : newY > 0 ? 0 : self.maxScrollY;
            }

            self.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
            self.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

            if (!self.moved) {
                self.triggerHandler('smoothscrollstart', { x: self.x, y: self.y });
            }
            self.moved = true;
            self._translate(newX, newY);

            if (timestamp - self.startTime > 300) {
                self.startTime = timestamp;
                self.startX = self.x;
                self.startY = self.y;
            }
        },

        _end: function _end(e) {
            var self = this;

            if (!self.enabled || eventType[e.type] !== self.initiated) {
                return;
            }

            var $doc = $(document),
                opt = self.options,


            //point = e.changedTouches ? e.changedTouches[0] : e,
            momentumX,
                momentumY,
                duration = getTime() - self.startTime,
                newX = Math.round(self.x),
                newY = Math.round(self.y),


            //distanceX = Math.abs(newX - me.startX),
            //distanceY = Math.abs(newY - me.startY),
            time = 0,
                easing = '';

            $doc.off('.' + self.cid);

            self.isInTransition = 0;
            self.initiated = 0;
            self.endTime = getTime();

            // reset if we are outside of the boundaries
            if (self.resetPosition(self.options.bounceTime)) {
                return;
            }

            self.scrollTo(newX, newY); // ensures that the last position is rounded

            if (!self.moved) {
                return;
            }

            // start momentum animation if needed
            if (opt.momentum && duration < 300) {
                momentumX = self.hasHorizontalScroll ? momentum(self.x, self.startX, duration, self.maxScrollX, opt.bounce ? self.wrapperWidth : 0, opt.deceleration) : {
                    destination: newX,
                    duration: 0
                };
                momentumY = self.hasVerticalScroll ? momentum(self.y, self.startY, duration, self.maxScrollY, opt.bounce ? self.wrapperHeight : 0, opt.deceleration) : {
                    destination: newY,
                    duration: 0
                };
                newX = momentumX.destination;
                newY = momentumY.destination;
                time = Math.max(momentumX.duration, momentumY.duration);
                self.isInTransition = 1;
            }

            if (newX != self.x || newY != self.y) {
                // change easing function when scroller goes out of the boundaries
                if (newX > 0 || newX < self.maxScrollX || newY > 0 || newY < self.maxScrollY) {
                    easing = easingType.quadratic;
                }

                self.scrollTo(newX, newY, time, easing);
                return;
            }

            self.triggerHandler('smoothscrollend', {
                x: self.x,
                y: self.y,
                isStart: self.x === 0,
                isEnd: self.x === self.maxScrollX
            });
        },

        refresh: function refresh() {
            //var rf = this.$wrapper[0].offsetHeight;           // Force reflow
            var self = this;
            var opts = self.options;
            self.update();

            // if(opts.startX || opts.startY){
            //     self.scrollTo(opts.startX? opts.startX : 0, opts.startY? opts.startY : 0);
            // }
            self.triggerHandler('smoothscrollrefresh', self);

        },

        update: function update() {
            var self = this;
            var opt = self.options;


            self._calcScrollerWidth();

            self.wrapperWidth = opt.getWrapperWidth ? opt.getWrapperWidth.call(self) : self.$wrapper.innerWidth();
            self.wrapperHeight = opt.getWrapperHeight ? opt.getWrapperHeight.call(self) : self.$wrapper.innerHeight();

            var style = window.getComputedStyle ? getComputedStyle(self.$wrapper[0], null) : self.$wrapper[0].currentStyle;
            self.wrapperWidth -= (parseInt(style.paddingLeft) || 0) + (parseInt(style.paddingRight) || 0);
            self.wrapperHeight -= (parseInt(style.paddingTop) || 0) + (parseInt(style.paddingBottom) || 0);
            self.wrapperOffset = self.$wrapper.offset();

            self.scrollerWidth = opt.getScrollerWidth ? opt.getScrollerWidth.call(self) : self.$scroller.innerWidth();
            self.scrollerHeight = opt.getScrollerHeight ? opt.getScrollerHeight.call(self) : self.$scroller.innerHeight();

            self.maxScrollX = self.wrapperWidth - self.scrollerWidth;
            self.maxScrollY = self.wrapperHeight - self.scrollerHeight;

            self.hasHorizontalScroll = opt.scrollX && self.maxScrollX < 0;
            self.hasVerticalScroll = opt.scrollY && self.maxScrollY < 0;
            

            if (!self.hasHorizontalScroll) {
                self.maxScrollX = 0;
                self.scrollerWidth = self.wrapperWidth;
                self.toggleEnabled(false); // 0330 vertical 스크롤 허용

            }else{
                self.toggleEnabled(true); // 0330 vertical 스크롤 허용
            }
            
            if (!self.hasVerticalScroll) {
                self.maxScrollY = 0;
                self.scrollerHeight = self.wrapperHeight;
            }

            self.endTime = 0;
            self.directionX = 0;
            self.directionY = 0;

            self.resetPosition();
        },

        _transitionEnd: function _transitionEnd(e) {
            if (e.target != this.$scroller[0] || !this.isInTransition) {
                return;
            }

            this._transitionTime();
            if (!this.resetPosition(this.options.bounceTime)) {
                this.isInTransition = false;
                this.triggerHandler('smoothscrollend', {
                    x: this.x,
                    y: this.y,
                    isStart: this.x === 0,
                    isEnd: this.x === this.maxScrollX
                });

                // this.triggerHandler('smoothscrolltransnend', {
                //     x: this.x,
                //     y: this.y,
                //     isStart: this.x === 0,
                //     isEnd: this.x === this.maxScrollX
                // });
            }
        },

        getMaxScrollX: function getMaxScrollX() {
            return this.maxScrollX;
        },
        getMaxScrollY: function getMaxScrollY() {
            return this.maxScrollY;
        },
        destroy: function destroy() {
            var self = this;
            var $doc = $(document);

            if (self.$prevButton) {
                self.$prevButton.off(self.eventNS);
            }
            if (self.$nextButton) {
                self.$nextButton.off(self.eventNS);
            }

            self.$scroller[0].style.cssText = '';

            self._handle($doc, 'mousemove', false);
            self._handle($doc, 'touchmove', false);
            self._handle($doc, 'touchend', false);
            self._handle($doc, 'mouseup', false);
            self._handle($doc, 'mousecancel', false);
            self._handle($doc, 'touchcancel', false);
            self._handle(self.$wrapper, 'mousedown', false);
            self._handle(self.$wrapper, 'touchstart', false);
            self._handle(self.$wrapper, 'selectstart', false);
            self._handle(self.$wrapper, 'click', false);
            self._handle(self.$scroller, 'transitionend', false);
            self._handle(self.$scroller, 'webkitTransitionEnd', false);
            self._handle(self.$scroller, 'oTransitionEnd', false);
            self._handle(self.$scroller, 'MSTransitionEnd', false);
            self._handle(self.$wrapper, 'wheel', false);
            self._handle(self.$wrapper, 'mousewheel', false);
            self._handle(self.$wrapper, 'DOMMouseScroll', false);
            

            this.supr();
        }
    });

    return SmoothScroll;
});
/*!
 * @module vcui.ui.SmoothScrollTab
 * @license MIT License
 * @description SmoothScrollTab
 * @copyright VinylC UID Group
 * 

 * 
 */
vcui.define('ui/smoothScrollTab', ['jquery', 'vcui', 'ui/smoothScroll'], function ($, core) {
    "use strict";

    var $win = $(window)

    /**
     * @class
     * @description .
     * @name vcui.ui.SmoothScrollTab
     * @extends vcui.ui.View
     */

    var SmoothScrollTab = core.ui('SmoothScrollTab', /** @lends vcui.ui.SmoothScrollTab# */{
        bindjQuery: 'smoothScrollTab',
        defaults: {
            tabname: 'ui_smooth_tab',
            ctrlname: 'ui_smooth_controls',
            prevname: 'ui_smooth_prev',
            nextname: 'ui_smooth_next',
            tabItem: "li",
            selectclass: "on",
            selectedText: '선택됨',
            tabIndex:0,
            scrollOption:{
                autoCenterScroll: false,
                center: true
            },
            usedTabLink: true
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self.tabIndex = self.options.tabIndex;
            
            self._build();
            self._bindEvent();            
        },

        _build: function() {
            var self = this;

            self.smoothScroll = new vcui.ui.SmoothScroll(self.$el.find('.' + self.options.tabname), self.options.scrollOption);

            self.controls = self.$el.find('.'+self.options.ctrlname);
            if(self.controls.length){
                self.prevCtrler = self.controls.find('.'+self.options.prevname);
                self.nextCtrler = self.controls.find('.'+self.options.nextname);

                self.prevCtrler.hide();
                self._setArrowCtrlStatus();
            }

            if(self.options.usedTabLink) self._setTabIndex();
        },

        _bindEvent  : function() {
            var self = this;
            
            self.nextCtrler.on('click', function(e){
                e.preventDefault();
                self.smoothScroll.nextPage();
            })

            self.prevCtrler.on('click', function(e){
                e.preventDefault();
                self.smoothScroll.prevPage();
            });

            if(self.options.usedTabLink){
                self.$el.on('click', self.options.tabItem, function(e){
                    self.$el.find('a > em.blind').remove();

                    var $aT = $(this).find('a');
                    if($aT.length > 0) {
                        var cid = $aT.attr('href');
                        if(cid){
                            if($(cid).length) e.preventDefault();
                        }

                        $aT.append('<em class="blind">' + self.options.selectedText + '</em>');
                    }

                    var idx = $(this).index();
                    if(idx != self.tabIndex){
                        self.tabIndex = idx;
                        self._setTabIndex();
    
                        self.trigger("smoothscrolltabselecttab", [self.tabIndex])
                    }
                });
            }

            self.smoothScroll.on('smoothscrollrefresh smoothscrollend', function(e){
                self._setArrowCtrlStatus();
            });
        },

        _setArrowCtrlStatus: function(){
            var self = this;


            if(self.smoothScroll.maxScrollX >= 0){
                self.controls.hide();
            } else{
                self.controls.show();

                if(self.smoothScroll.x == 0) self.prevCtrler.hide();
                else self.prevCtrler.show();

                if(self.smoothScroll.x == self.smoothScroll.maxScrollX) self.nextCtrler.hide();
                else self.nextCtrler.show();
            }
        },

        _setTabIndex: function(){
            var self = this;

            var tabwrap = self.$el.find('.' + self.options.tabname);
            var items = tabwrap.find(self.options.tabItem);
            
            items.removeClass(self.options.selectclass);
            items.eq(self.tabIndex).addClass(self.options.selectclass);

            self._setTabContents();
        },

        _setTabContents: function(){
            var self = this;
            
            var contID;
            var tabwrap = self.$el.find('.' + self.options.tabname);
            var items = tabwrap.find(self.options.tabItem);
            items.each(function(idx, item){
                contID = $(item).find('a').attr('href');
                if($(contID).length){
                    $(contID).stop().hide().css({opacity:0});
                }
            });

            contID = items.eq(self.tabIndex).find('a').attr('href');
            $(contID).stop().show().animate({opacity:1}, 220);
            $(contID).find('.ui_carousel_slider').vcCarousel('update');
        },

        setTabIndex: function(idx){
            var self = this;

            self.tabIndex = idx;
            self._setTabIndex();
        },

        getTabIndex: function(){
            var self = this;

            return self.tabIndex;
        },

        resetStatus: function(selectIdx){
            var self = this;

            self.setTabIndex(selectIdx);

            self.smoothScroll.update();
            
            self._setArrowCtrlStatus();
        },

        refresh: function refresh() {
            var self = this;
            self.smoothScroll.refresh();
        },

        initPosition: function(chk){
            var self = this;

            self.smoothScroll.moveFirst();
            self.smoothScroll.toggleEnabled(chk);
        }
        
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return SmoothScrollTab;
});
/*!
 * @module vcui.ui.LazyLoader
 * @license MIT License
 * @description LazyLoader 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('ui/lazyLoader', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var LazyLoader = core.ui('LazyLoader', {
        bindjQuery: 'lazyLoader',
        defaults: {
            range: 200,
            selector: 'img',
            mode: 'vertical',
            container: 'window',
            dataAttribute: 'data-src',
            useFade: false
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self.scrollTimer = null;

            self.isVert = self.options.mode === 'vertical';
            self.largestPosition = 0;
            self.$items = $(self.options.selector+"[data-src]");
            self.$con = self.$el.css('overflow') === 'scroll' ? self.$el : $(window);
            

            self._bindEvents();
        },

        _bindEvents: function _bindEvents() {
            var self = this;

            self.$con.on('scroll' + self.eventNS, function () {
                if(self.scrollTimer) {
                    clearTimeout(self.scrollTimer);
                }
                self.scrollTimer = setTimeout(function(){
                    self._action();
                }, 200);
            }).trigger('scroll' + self.eventNS);
            /*
            self.$con.on('scroll' + self.eventNS, function () {
                self._action();
            }).trigger('scroll' + self.eventNS);
            */
        },

        _getContainerSize: function _getContainerSize() {
            return this.$con[this.isVert ? 'height' : 'width']();
        },

        _getScrollValue: function _getScrollValue() {
            return this.$con[this.isVert ? 'scrollTop' : 'scrollLeft']();
        },

        _action: function _action() {
            var self = this;

            var scrollValue = self._getScrollValue();

            if (scrollValue >= self.largestPosition) {
                self.$items = self.$items.filter(function () {
                    var $el = $(this),
                        pos = $el.offset()[self.isVert ? 'top' : 'left'];

                    if (scrollValue + self.options.range + self._getContainerSize() >= pos) {
                        if (self.options.useFade) {
                            //$el.css('opacity', 0);
                        }
                        self._loadImage($el, function () {
                            if (self.options.useFade) {
                                $el.stop().animate({ opacity: 1 });
                            }
                        });
                        return false;
                    }
                    return true;
                });
                self.largestPosition = scrollValue;
            }

            self.triggerHandler('lazyLoaderscroll');
            if (!self.$items.length) {
                self.triggerHandler('lazyLoadercomplete');
                self.$con.off(self.eventNS);
            }
        },
        _loadImage: function _loadImage($img, cb) {
            var src = $img.attr('data-src');
            $img.attr("src", src);
            if ($img[0].complete) {
                cb.call($img);
            } else {
                $img.one('load', cb);
            }
        }
    });

    return LazyLoader;
});

vcui.define('ui/imageSwitch', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var ImageSwitch = core.ui('ImageSwitch', {
        bindjQuery: true,
        defaults: {
            pc_prefix: "pc",
            mobile_prefix: "m"
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };
            
            self.mode = "";
            
            self._resize();
            $(window).trigger('addResizeCallback', self._resize.bind(self));
        },

        _resize: function(){
            var self = this,
                mode, winwidth;

            winwidth = $(window).outerWidth(true);
            if(winwidth > 767) mode = self.options.pc_prefix;
            else mode = self.options.mobile_prefix;
            if(self.mode != mode) self._changeImage(mode);
        },

        _changeImage: function(mode){
            var self = this;
            
            self.mode = mode;
            //self.mode = "m";
            self.$el.find('.ui_bg_switch').each(function(idx, item){
                /*
                var imgsrc = $(item).attr("data-" + self.mode + "-src");
                $(item).css({
                    'background-image': 'url(' + imgsrc + ')'
                });
                */
                var imgsrc = item.dataset[(self.mode + "Src")];
                if(imgsrc && item.dataset.backgroundImage != imgsrc) {
                    item.style.backgroundImage = 'url(' + imgsrc + ')';
                    item.dataset.backgroundImage = imgsrc;
                }
            });

            self.$el.find('img[data-pc-src],img[data-m-src]').each(function(idx, item){
                /*
                var imgsrc = $(item).attr("data-" + self.mode + "-src");
                if(!imgsrc) {
                    imgsrc = $(item).attr('data-pc-src');
                }
                $(item).attr('src', imgsrc);
                */
                var imgsrc = item.dataset[(self.mode + "Src")];
                //imgsrc += '?test=test2';
                //var test = imgsrc.substring(imgsrc.lastIndexOf('/') + 1);
                if(imgsrc && imgsrc != item.dataset.currentImage) {
                    item.src = imgsrc;
                    item.dataset.currentImage = imgsrc;
                }
            })
        },

        reload: function(){
            var self = this;
            self.mode = "";
            self._resize();
        },
    });

    return ImageSwitch;
});
/*!
 * @module vcui.ui.LazyLoader
 * @license MIT License
 * @description LazyLoader 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('ui/lazyLoaderSwitch', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var LazyLoaderSwitch = core.ui('LazyLoaderSwitch', {
        bindjQuery: 'lazyLoaderSwitch',
        defaults: {
            range: 200,
            selector: "",
            mode: 'vertical',
            container: 'window',
            //dataAttribute: 'data-src',
            pc_prefix: "pc",
            mobile_prefix: "m",
            useFade: false
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self.mode = "";
            self.scrollTimer = null;

            self.isVert = self.options.mode === 'vertical';
            self.largestPosition = 0;
            self.$items = $(self.options.selector +":not(.ignore-lazyload)img[data-pc-src][data-m-src],.ui_bg_switch");

            self.$imgSwitch = $(self.options.selector +"img[data-pc-src][data-m-src],.ui_bg_switch").filter('.ignore-lazyload');
            
            self.$imgSwitch.each(function(idx, item){
                self._loadImage($(item),null);
            });

            self.$con = self.$el.css('overflow') === 'scroll' ? self.$el : $(window);

            self._bindEvents();
        },

        _bindEvents: function _bindEvents() {
            var self = this;

            self.$con.on('scroll' + self.eventNS, function () {
                if(self.scrollTimer) {
                    clearTimeout(self.scrollTimer);
                }
                self.scrollTimer = setTimeout(function(){
                    self._action();
                }, 200);
            }).trigger('scroll' + self.eventNS);

            $(window).on('resizeend', function(e){
                self._resize();
            });
        },

        _getContainerSize: function _getContainerSize() {
            return this.$con[this.isVert ? 'height' : 'width']();
        },

        _getScrollValue: function _getScrollValue() {
            return this.$con[this.isVert ? 'scrollTop' : 'scrollLeft']();
        },

        _action: function _action() {
            
            var self = this;

            var scrollValue = self._getScrollValue();

            if (scrollValue >= self.largestPosition) {
                self.$items = self.$items.filter(function () {
                    var $el = $(this),
                        pos = $el.offset()[self.isVert ? 'top' : 'left'];

                    if (scrollValue + self.options.range + self._getContainerSize() >= pos) {
                        if (self.options.useFade) {
                            $el.css('opacity', 0);
                        }
                        self._loadImage($el, /*function () {
                            if (self.options.useFade) {
                                $el.stop().animate({ opacity: 1 });
                            }
                        }*/null);
                        return false;
                    }
                    return true;
                });
                self.largestPosition = scrollValue;
            }

            self.triggerHandler('lazyLoaderscroll');
            if (!self.$items.length) {
                self.triggerHandler('lazyLoadercomplete');
                self.$con.off(self.eventNS);
            }
        },
        /*
        _loadImage: function _loadImage($img, cb) {
            var src = $img.attr('data-pc-src');
            $img.attr("src", src);
            if ($img[0].complete) {
                cb.call($img);
            } else {
                $img.one('load', cb);
            }
        },
        */

        reload: function($dm){
            var self = this;

            var $items = $dm.find("img[data-pc-src][data-m-src],.ui_bg_switch");
            $items.each(function(idx, item){
                self._loadImage($(item),null);
            });
        },

        _resize: function(){
            var self = this,
                mode, winwidth;

            winwidth = $(window).outerWidth(true);
            if(winwidth > 767) mode = self.options.pc_prefix;
            else mode = self.options.mobile_prefix;
            if(self.mode != mode) {
                self.mode = mode;
                var $items = $(self.options.selector +"img[data-pc-src][data-m-src][data-current-image],.ui_bg_switch[data-current-image]");
                $items.each(function(idx,item){
                    var $img = $(item);
                    var src = $img.attr('data-' + mode + '-src');
                    var currentImage = $img.attr('data-current-image');
                    if(src && src != currentImage) {
                        if($img.hasClass("ui_bg_switch")) {
                            $img.css({
                                'background-image': 'url(' + src + ')'
                            });
                            $img.attr('data-current-image',src);
                        } else {
                            $img.attr("src", src);
                            //$img.attr("data-lazy", src);
                            $img.attr('data-current-image',src);
                        }
                    }
                });
            }
        },

        _loadImage: function _loadImage($img, cb) {
            var self = this;
            var mode, winwidth;

            winwidth = $(window).outerWidth(true);
            (winwidth > 767) ? mode = self.options.pc_prefix : mode = self.options.mobile_prefix;

            //if(self.mode != mode) {
                //self.mode = mode;
                var src = $img.attr('data-' + mode + '-src');
                var currentImage = $img.attr('data-current-image');
                if(src && src != currentImage) {
                    if($img.hasClass("ui_bg_switch")) {
                        $img.css({
                            'background-image': 'url(' + src + ')'
                        });
                        $img.attr('data-current-image',src);
                    } else {
                        $img.attr("src", src); 
                        //$img.attr("data-lazy", src);
                        $img.attr('data-current-image',src);
                    }
                    /*
                    if ($img[0].complete) {
                        cb.call($img);
                    } else {
                        $img.one('load', cb);
                    }
                    */
                }
                // $img.attr("src", src);
                // if ($img[0].complete) {
                //     cb.call($img);
                // } else {
                //     $img.one('load', cb);
                // }
                /*
                var imgsrc = item.dataset[(self.mode + "Src")];
                if(imgsrc && imgsrc != item.dataset.currentImage) {
                    item.dataset.currentImage = imgsrc;
                    item.src = imgsrc;
                    var $img = $(item);
                    if ($img[0].complete) {
                        cb.call($img);
                    } else {
                        $img.one('load', cb);
                    }
                }
                */
            //}
        }
    });

    return LazyLoaderSwitch;
});
/*!
 * @module vcui.ui.PinchZoom
 * @license MIT License
 * @description PinchZoom 컴포넌트
 * @copyright VinylC UID Group
 * https://github.com/manuelstofer/pinchzoom
 * 
 */
  

vcui.define('ui/pinchZoom', ['jquery', 'vcui', 'libs/jquery.transit.min'], function ($, core) {
    "use strict";
    var $win = $(window);

    var detectGestures = function (el, target) {
        var interaction = null,
            fingers = 0,
            lastTouchStart = 0,
            lastMouseDown = 0,
            startTouches = null,
            isDragging = null,
            firstMove = true;

        function setInteraction(newInteraction, event) {
            if (interaction !== newInteraction) {
                if (interaction && !newInteraction) {
                    switch (interaction) {
                        case "zoom":
                            target._handleZoomEnd(event);
                            break;
                        case 'drag':
                            target._handleDragEnd();
                            break;
                    }
                }
                switch (newInteraction) {
                    case 'zoom':
                        target._handleZoomStart(event);
                        break;
                    case 'drag':                            
                        target._handleDragStart(event);
                        break;
                }
            }
            interaction = newInteraction;
        }

        function updateInteraction(event) {
            if (fingers === 2) {
                setInteraction('zoom');
            } else if (fingers === 1 && target._canDrag()) {
                setInteraction('drag', event);
            } else {
                setInteraction(null, event);
            }
        }

        function targetTouches(touches) {
            return core.array.map(touches, function (touch) {
                return {
                    x: touch.pageX,
                    y: touch.pageY
                };
            });
        }

        function getDistance(a, b) {
            var x, y;
            x = a.x - b.x;
            y = a.y - b.y;
            return Math.sqrt(x * x + y * y);
        }

        function calculateScale(startTouches, endTouches) {
            var startDistance = getDistance(startTouches[0], startTouches[1]),
                endDistance = getDistance(endTouches[0], endTouches[1]);
            return endDistance / startDistance;
        }

        function cancelEvent(event) {
            event.stopPropagation();
            event.preventDefault();
        }

        function detectDoubleTap(event) {
            var time = (new Date()).getTime();

            if (fingers > 1) {
                lastTouchStart = null;
            }

            if (time - lastTouchStart < 300) {

                cancelEvent(event);
                target._handleDoubleTap(event);
                switch (interaction) {
                    case "zoom":
                        target._handleZoomEnd(event);
                        break;
                    case 'drag':
                        target._handleDragEnd();
                        break;
                }
            } else {
                target.isDoubleTap = false;
            }

            if (fingers === 1) {
                lastTouchStart = time;
            }
        }      
        
        function checkDoubleTap() {
            var time = (new Date()).getTime();
            var flag = false;
            if (time - lastMouseDown < 300) {
                flag = true;
            } else {
                flag = false;
            }

            lastMouseDown = time;
            return flag;
        }   


        if(core.detect.isTouch){ // touch 

            $(el).on('touchstart.pinchzoom', function (event) {
                if(target.enabled) {
                    firstMove = true;
                    fingers = event.originalEvent.touches.length;
                    detectDoubleTap(event.originalEvent); 
                       
                }                
            });

            $(el).on('touchmove.pinchzoom', function (event) {
                if(target.enabled && !target.isDoubleTap) {
                    if (firstMove) {
                        updateInteraction(event.originalEvent);
                        if (interaction) {
                            cancelEvent(event.originalEvent);
                        }
                        startTouches = targetTouches(event.originalEvent.touches);
                    } else {
                        switch (interaction) {
                            case 'zoom':
                                if (startTouches.length == 2 && event.originalEvent.touches.length == 2) {
                                    target._handleZoom(event.originalEvent, calculateScale(startTouches, targetTouches(event.originalEvent.touches)));
                                }
                                break;
                            case 'drag':
                                target._handleDrag(event.originalEvent);
                                break;
                        }
                        if (interaction) {
                            cancelEvent(event.originalEvent);
                            target.update();
                        }
                    }
    
                    firstMove = false;
                }
            });

            $(el).on('touchend.pinchzoom', function (event) {
                if(target.enabled) {
                    fingers = event.originalEvent.touches.length;
                    updateInteraction(event.originalEvent);
                }
            });

        }else{ // mouse

            $(el).on('mousedown.pinchzoom', function (event) {
                if(target.enabled) {
                    firstMove = true;
                    if(checkDoubleTap()){
                        target._handleDoubleTap(event.originalEvent);
                    }else{
                        target.isDoubleTap = false;
                        if(!isDragging){
                            isDragging = true;
                        }

                    }
                }   
            });

            $(el).on('mousemove.pinchzoom', function (event) {   
                if(target.enabled){
                    if(isDragging) {
                        if (firstMove) {
                            target._handleDragStart(event.originalEvent); 
                        } else {
                            target._handleDrag(event.originalEvent);
                            target.update();
                        }    
                        firstMove = false;                        
                    }
                }
            });

            $(window).on('mouseup.pinchzoom', function (event) {
                if(target.enabled){
                    if(isDragging){
                        isDragging = false;
                        target._handleDragEnd(true);
                    }
                }
            });

        }       

    };

    var PinchZoom = core.ui('PinchZoom', {/**@lends vcui.ui.PinchZoom# */
        bindjQuery: 'pinchZoom',
        defaults: {
            tapZoomFactor: 2,
            zoomOutFactor: 1.3,
            animationDuration: 300,
            maxZoom: 4,
            minZoom: 0.5,
            draggableUnzoomed: false,
            lockDragAxis: false,
            setOffsetsOnce: false,
            zoomStartEventName: 'pz_zoomstart',
            zoomUpdateEventName: 'pz_zoomupdate',
            zoomEndEventName: 'pz_zoomend',
            dragStartEventName: 'pz_dragstart',
            dragUpdateEventName: 'pz_dragupdate',
            dragEndEventName: 'pz_dragend',
            doubleTapEventName: 'pz_doubletap',
            verticalPadding: 0,
            horizontalPadding: 0,
            fixedAspectRatio : true,
            enableDoubleTab : false,
        },
        

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }   

            self.zoomFactor = 1;
            self.lastScale = 1;
            self.offset = {
                x: 0,
                y: 0
            };
            self.initialOffset = {
                x: 0,
                y: 0,
            };

            self._setupMarkup();
            self._bindEvents();

            // self.$$(el).find('img').onImgLoaded(function(e){
            //     // self.update(true);
            // });

            self.update(true);
            self.enable();

        },


        destroy:function destroy(){
            this.$container.off('touchstart.pinchzoom');
            this.$container.off('touchmove.pinchzoom');
            this.$container.off('touchend.pinchzoom');
            this.$container.off('mousedown.pinchzoom');
            this.$container.off('mousemove.pinchzoom');
            $(window).off('mouseup.pinchzoom');
            this.supr();
        },


        /**   
         * Event handler for 'dragstart'
         * @param event
         */

        _handleDragStart: function _handleDragStart(event) {
            var self = this;
            self.triggerHandler(self.options.dragStartEventName);
            self._stopAnimation();
            self.lastDragPosition = false;
            self.hasInteraction = true;
            self._handleDrag(event);
        },

        /**
         * Event handler for 'drag'
         * @param event
         */
        _handleDrag: function _handleDrag(event) {
            
            var touch = this._getTouches(event)[0];
            this._drag(touch, this.lastDragPosition);
            this.offset = this._sanitizeOffset(this.offset);
            this.lastDragPosition = touch;
        },

        _handleDragEnd: function _handleDragEnd(flag) {
            this.triggerHandler(this.options.dragEndEventName);
            this._end(flag);
        },


        /**
         * Event handler for 'zoomstart'
         * @param event
         */
        _handleZoomStart: function _handleZoomStart(event) {
            this.triggerHandler(this.options.zoomStartEventName);
            this._stopAnimation();
            this.lastScale = 1;
            this.nthZoom = 0;
            this.lastZoomCenter = false;
            this.hasInteraction = true;
        },

        /**
         * Event handler for 'zoom'
         * @param event
         */
        _handleZoom: function _handleZoom(event, newScale) {
            // a relative scale factor is used

            var touchCenter = this._getTouchCenter(this._getTouches(event)),
                scale = newScale / this.lastScale;
            this.lastScale = newScale;

            // the first touch events are thrown away since they are not precise
            this.nthZoom += 1;
            if (this.nthZoom > 3) {

                this._scale(scale, touchCenter);
                this._drag(touchCenter, this.lastZoomCenter);
            }
            this.lastZoomCenter = touchCenter;
        },

        _handleZoomEnd: function _handleZoomEnd() {
            this.triggerHandler(this.options.zoomEndEventName);
            this._end();
        },

        /**
         * Event handler for 'doubletap'
         * @param event
         */
        _handleDoubleTap: function _handleDoubleTap(event) {
            var self = this;
            if(!this.options.enableDoubleTab) return;
            var center = this._getTouches(event)[0],
                zoomFactor = this.zoomFactor > 1 ? 1 : this.options.tapZoomFactor,
                startZoomFactor = this.zoomFactor;

            if (this.hasInteraction) {
                return;
            }
            this.isDoubleTap = true;

            if (startZoomFactor > zoomFactor) {
                center = this._getCurrentZoomCenter();
            }

            this._animate(this.options.animationDuration, 
                function (progress) {
                    self._scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
                }
            );
            this.triggerHandler(this.options.doubleTapEventName);           
        },
    

        _setupOffsets: function _setupOffsets() {
            if (this.options.setOffsetsOnce && this._isOffsetsSet) {
              return;
            }
            this._isOffsetsSet = true;

            //Compute the initial offset
            this.initialOffset = {
                x: -Math.abs(this.$el.outerWidth() * this._getInitialZoomFactor() - this.$container.outerWidth()) / 2,
                y: -Math.abs(this.$el.outerHeight() * this._getInitialZoomFactor() - this.$container.outerHeight()) / 2,
            };

            //Reset current image offset to that of the initial offset
            this.offset.x = this.initialOffset.x;
            this.offset.y = this.initialOffset.y;
        },


        /**
         * Max / min values for the offset
         * @param offset
         * @return {Object} the sanitized offset
         */
        _sanitizeOffset: function _sanitizeOffset(offset) {
            var elWidth = this.$el.outerWidth() * this._getInitialZoomFactor() * this.zoomFactor;
            var elHeight = this.$el.outerHeight() * this._getInitialZoomFactor() * this.zoomFactor;
            var maxX = elWidth - this.$container.outerWidth() + this.options.horizontalPadding,
                maxY = elHeight - this.$container.outerHeight() + this.options.verticalPadding,
                maxOffsetX = Math.max(maxX, 0),
                maxOffsetY = Math.max(maxY, 0),
                minOffsetX = Math.min(maxX, 0) - this.options.horizontalPadding,
                minOffsetY = Math.min(maxY, 0) - this.options.verticalPadding;

            var xp = Math.min(Math.max(offset.x, minOffsetX), maxOffsetX);
            var yp = Math.min(Math.max(offset.y, minOffsetY), maxOffsetY);

            return {
                x: isNaN(xp)? 0 : xp,
                y: isNaN(yp)? 0 : yp
            };
        },

        /**
         * Scale to a specific zoom factor (not relative)
         * @param zoomFactor
         * @param center
         */
        _scaleTo: function _scaleTo(zoomFactor, center) {
            this._scale(zoomFactor / this.zoomFactor, center);
        },

        /**
         * Scales the element from specified center
         * @param scale
         * @param center
         */
        _scale: function _scale(scale, center) {
            scale = this._scaleZoomFactor(scale);
            this._addOffset({
                x: (scale - 1) * (center.x + this.offset.x),
                y: (scale - 1) * (center.y + this.offset.y)
            });
            this.triggerHandler(this.options.zoomUpdateEventName);
        },

        /**
         * Scales the zoom factor relative to current state
         * @param scale
         * @return the actual scale (can differ because of max min zoom factor)
         */
        _scaleZoomFactor: function _scaleZoomFactor(scale) {
            var originalZoomFactor = this.zoomFactor;
            this.zoomFactor *= scale;
            this.zoomFactor = Math.min(this.options.maxZoom, Math.max(this.zoomFactor, this.options.minZoom));
            return this.zoomFactor / originalZoomFactor;
        },

        /**
         * Determine if the image is in a draggable state
         *
         * When the image can be dragged, the drag event is acted upon and cancelled.
         * When not draggable, the drag event bubbles through this component.
         *
         * @return {Boolean}
         */
        _canDrag: function _canDrag() {
            return this.options.draggableUnzoomed || !(this.zoomFactor > 1 - 0.01 && this.zoomFactor < 1 + 0.01);
        },

        /**
         * Drags the element
         * @param center
         * @param lastCenter
         */
        _drag: function _drag(center, lastCenter) {
            if (lastCenter) {
              if(this.options.lockDragAxis) {
                // lock scroll to position that was changed the most
                if(Math.abs(center.x - lastCenter.x) > Math.abs(center.y - lastCenter.y)) {
                  this._addOffset({
                    x: -(center.x - lastCenter.x),
                    y: 0
                  });
                }
                else {
                  this._addOffset({
                    y: -(center.y - lastCenter.y),
                    x: 0
                  });
                }
              }
              else {
                this._addOffset({
                  y: -(center.y - lastCenter.y),
                  x: -(center.x - lastCenter.x)
                });
              }
              this.triggerHandler(this.options.dragUpdateEventName);
            }
        },

        /**
         * Calculates the touch center of multiple touches
         * @param touches
         * @return {Object}
         */
        _getTouchCenter: function _getTouchCenter(touches) {
            return {
                x: core.array.reduce(touches, function (prev, cur) { return prev+cur.x; }, 0) / touches.length,
                y: core.array.reduce(touches, function (prev, cur) { return prev+cur.y; }, 0) / touches.length
            };

        },

        /**
         * Adds an offset
         * @param offset the offset to add
         * @return return true when the offset change was accepted
         */
        _addOffset: function _addOffset(offset) {
            this.offset = {
                x: this.offset.x + offset.x,
                y: this.offset.y + offset.y
            };
        },

        _sanitize: function _sanitize() {
            if (this.zoomFactor < this.options.zoomOutFactor) {
                this._zoomOutAnimation();
            } else if (this._isInsaneOffset(this.offset)) {
                this._sanitizeOffsetAnimation();
            }
            
        },

        /**
         * Checks if the offset is ok with the current zoom factor
         * @param offset
         * @return {Boolean}
         */
        _isInsaneOffset: function _isInsaneOffset(offset) {
            var sanitizedOffset = this._sanitizeOffset(offset);
            return sanitizedOffset.x !== offset.x || sanitizedOffset.y !== offset.y;
        },

        /**
         * Creates an animation moving to a sane offset
         */
        _sanitizeOffsetAnimation: function _sanitizeOffsetAnimation() {
            var self = this;
            var targetOffset = this._sanitizeOffset(this.offset),
                startOffset = {
                    x: this.offset.x,
                    y: this.offset.y
                };

            this._animate(
                this.options.animationDuration,
                function (progress) {
                    self.offset.x = startOffset.x + progress * (targetOffset.x - startOffset.x);
                    self.offset.y = startOffset.y + progress * (targetOffset.y - startOffset.y);
                    self.update();
                }
            );
        },

        /**
         * Zooms back to the original position,
         * (no offset and zoom factor 1)
         */
        _zoomOutAnimation: function _zoomOutAnimation() {
            var self = this;
            if (this.zoomFactor === 1) {
                //return;
            }

            var startZoomFactor = this.zoomFactor,
                zoomFactor = 1,
                center = this._getCurrentZoomCenter();

            this._animate(
                this.options.animationDuration*0.6,
                function (progress) {
                    self._scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
                }
            );
        },
       
        _updateAspectRatio: function _updateAspectRatio() {

            if(this.options.fixedAspectRatio){
                this.$el.find('img').css({
                    //'position': 'absolute',
                    'max-width': '100%',
                    'max-height': '100%',
                    'top' :'0',
                    'left' : '0',
                    'bottom': '0',
                    'right': '0',
                    'margin':'auto',
                    'draggable':'false',
                    'user-drag':'none',
                    'user-select':'none'
                })
            }else{
                this.$container.css({'height':''}).height(this.$container.parent().outerHeight());
            }
            
        },

        /**
         * Calculates the initial zoom factor (for the element to fit into the container)
         * @return {number} the initial zoom factor
         */
        _getInitialZoomFactor: function _getInitialZoomFactor() {
            var xZoomFactor = this.$container.outerWidth() / this.$el.outerWidth();
            var yZoomFactor = this.$container.outerHeight() / this.$el.outerHeight();
            return Math.min(xZoomFactor, yZoomFactor);
        },

        /**
         * Calculates the virtual zoom center for the current offset and zoom factor
         * (used for reverse zoom)
         * @return {Object} the current zoom center
         */
        _getCurrentZoomCenter: function _getCurrentZoomCenter() {
            
            var offsetLeft = this.offset.x - this.initialOffset.x;
            var centerX = -1 * this.offset.x - offsetLeft / (1 / this.zoomFactor - 1);
            var offsetTop = this.offset.y - this.initialOffset.y;
            var centerY = -1 * this.offset.y - offsetTop / (1 / this.zoomFactor - 1);

            return {
                x: isNaN(centerX)? 0 : centerX,
                y: isNaN(centerY)? 0 : centerY
            };
        },

        /**
         * Returns the touches of an event relative to the container offset
         * @param event
         * @return array touches
         */
        _getTouches: function _getTouches(event) {

            var pos = this._getContainerPos();
            if(event.type.indexOf('mouse')>-1){                
                return [{ x : event.pageX - pos.x, y : event.pageY - pos.y}];
            }else{
                return core.array.map(event.touches, function (touch) {
                    return {
                        x: touch.pageX - pos.x,
                        y: touch.pageY - pos.y,
                    };
                });

            }            
        },

        _getContainerPos: function _getContainerPos() {

            var rect = this.$container[0].getBoundingClientRect();
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

            return {
                x: rect.left + scrollLeft,
                y: rect.top + scrollTop,
            };          
        },

        _easeInOut : function _easeInOut(t){
            return t > 0.5 ? 4*Math.pow((t-1),3)+1 : 4*Math.pow(t,3);
        },

        /**
         * Animation loop
         * does not support simultaneous animations
         * @param duration
         * @param framefn
         * @param timefn // -Math.cos(p * Math.PI) / 2  + 0.5;
         * @param callback
         */
        _animate: function _animate(duration, framefn, callback) {
            var startTime = new Date().getTime();

            if(this.renderAnimate) cancelAnimationFrame(this.renderAnimate);

            var renderFrame = (function () {
                if (!this.inAnimation) { return; }
                var frameTime = new Date().getTime() - startTime,
                    progress = frameTime / duration;
                if (frameTime >= duration) {
                    framefn(1);
                    if (callback) {
                        callback();
                    }
                    this.update();
                    this._stopAnimation();
                    this.update();
                } else {
                    progress = this._easeInOut(progress)//-Math.cos(progress * Math.PI) / 2  + 0.5;                        
                    framefn(progress);
                    this.update();
                    this.renderAnimate = requestAnimationFrame(renderFrame);
                    //requestAnimationFrame(renderFrame);
                }
            }).bind(this);

            this.inAnimation = true;
            this.renderAnimate = requestAnimationFrame(renderFrame);
            //requestAnimationFrame(renderFrame);
        },

        _stopAnimation: function _stopAnimation() {
            this.inAnimation = false;
        },

        /**
         * Creates the expected html structure
         */
        _setupMarkup: function _setupMarkup() {

            this.$container = this.$el.parent();//('.pinch-zoom-container');             

            this.$container.css({
                //'position' : 'relative',
                'overflow' : 'hidden',
                'transformOrigin' : '0% 0%'
            });            

            if(this.options.fixedAspectRatio){
                this.$el.css({
                    //'position' :'absolute',
                    'transformOrigin' : '0% 0%',
                    'width' : '100%',
                    'height' : '100%'
                });
                
            }else{
                this.$el.css({
                    //'position' :'absolute',
                    'transformOrigin' : '0% 0%'
                });
            }

            
        },

        _end: function _end(flag) {
            this.hasInteraction = false;
            if(!flag) this._sanitize();
            this.update();
        },

        /**
         * Binds all required event listeners
         */
        _bindEvents: function _bindEvents() {
            var self = this;
            detectGestures(this.$container[0], this);
            $win.on('resizeend', function(e){
                self.update(true);
            });
        },

        /**
         * Updates the css values according to the current zoom factor and offset
         */
        update: function update(isAspect) { 
            var self = this;
            if(isAspect){
                self._updateAspectRatio();                
                self._setupOffsets();
                self.zoomFactor = 1;
            }

            var zoomFactor = self._getInitialZoomFactor() * self.zoomFactor,
                offsetX = -self.offset.x / zoomFactor,
                offsetY = -self.offset.y / zoomFactor;

            var transform3d = 'scale3d('+ zoomFactor + ',' + zoomFactor + ',1) translate3d('+ offsetX + 'px,' + offsetY + 'px,0px)';
            // var transform2d = 'scale('+ zoomFactor + ', '  + zoomFactor + ') translate('+ offsetX+ 'px,' + offsetY+ 'px)';
            
            self.$el.css('transform', transform3d);
                
        },

        runZoom: function runZoom(zoom, animation) {
            var self = this;

            var center = {x: this.$container.outerWidth()/2, y:this.$container.outerHeight()/2};
            self.offset = this._sanitizeOffset(this.offset);
            self.lastDragPosition = center;

            var zoomFactor = Math.min(self.options.maxZoom, Math.max(zoom,1));
            var startZoomFactor = this.zoomFactor;
            
            if (this.hasInteraction){
                return;
            }

            if(startZoomFactor == zoomFactor){
                return;
            }

            if (startZoomFactor > zoomFactor){
                center = this._getCurrentZoomCenter();                
            }

            if(animation) {
                this._animate(this.options.animationDuration, 
                    function (progress) {
                        self._scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
                    }
                );
            } else {
                this._animate(100, 
                    function (progress) {
                        self._scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
                    }
                );
            }
        },    

        /**
         * Calculates the aspect ratio of the element
         * @return the aspect ratio
         */
        getAspectRatio: function getAspectRatio() {
            return this.$el.outerWidth() / this.$el.outerHeight();
        },



        getZoomFactor : function getZoomFactor(){
            return this.zoomFactor;
        },

        /**
         * Enables event handling for gestures
         */
        enable: function enable() {
          this.enabled = true;
        },

        /**
         * Disables event handling for gestures
         */
        disable: function disable() {
          this.enabled = false;
        }

    });

    return PinchZoom;
});
/*!
 * @module vcui.ui.Calendar
 * @license MIT License
 * @description 달력 컴포넌트
 * @copyright VinylC UID Group
 */

vcui.define('ui/calendar', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var $doc = $(document),
        ui = core.ui,
        dateUtil = core.date,
        detect = core.detect;

    //Calendar ////////////////////////////////////////////////////////////////////////////
    /**
     * @class
     * @description 달력 모듈
     * @name vcui.ui.Calendar
     * @extends vcui.ui.View
     * @fires vcui.ui.Calendar#calendarshow
     * @fires vcui.ui.Calendar#calendarshown
     * @fires vcui.ui.Calendar#calendarhide
     * @fires vcui.ui.Calendar#calendarhidden
     * @fires vcui.ui.Calendar#calendarselected
     * @fires vcui.ui.Calendar#calendarinsertdate
     */
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var dateRegex = /[0-9]{4}.?[0-9]{2}.?[0-9]{2}/;

    var Calendar = ui('Calendar', /** @lends scui.ui.Calendar# */{
        bindjQuery: 'calendar',
        defaults: {
            mobileMode : false,
            weekNames: ['일', '월', '화', '수', '목', '금', '토'],
            monthNames: '1월,2월,3월,4월,5월,6월,7월,8월,9월,10월,11월,12월'.split(','),
            titleFormat: 'yyyy년 MM월 dd일',
            weekendDisabled: false, // 주말을 disabled시킬 것인가
            type: 'button', // 날짜가 선택되게 할 것인가
            inputTarget: '', // 날짜를 선택했을 때, 날짜가 들어갈 인풋박스의 셀렉터
            showOtherMonths: false, // 이전, 다음달의 날짜를 표시할 것인가
            isBubble: false, // 달력이벤트의 버블링을 허용할 것인가
            date: new Date(), // 처음에 표시할 기본 날짜
            today: new Date(), // 오늘 날짜
            isClickActive: true, // 인라인모드에서 클릭했을 때 active효과를 줄 것인가.
            showByInput: false, // 인풋박스에 의해서도 달력을 열 것인가
            where: 'inline', // 달력 dom을 어디에 두고 열것인가 설정:(body(body 맨 하단, inline(버튼 바로 밑)
            minDate: '-5y',//new Date∂(), //'-5y' 날짜 하한값
            maxDate: '+5y', // 날짜 상한값
            template: {
                header: '<div class="ui-calendar-header-second">' + '<a href="#" class="ui-calendar-prev">&lt;</a>' + '<span class="ui-calendar-now">01</span>' + '<a href="#" class="ui-calendar-next">&gt;</a>' + '</div>',
                label: '<span class="ui-calendar-day" title="{{title}}">{{day}}</span>',
                button: '<button type="button" class="ui-calendar-day{{disabled?" disabled":""}}" title="{{title}}" {{disabled?"disabled=disabled style=cursor:default":""}}>{{day}}</button>'
            },
            holidays: [], // 휴일 날짜 -> ['2014-04-05', '2014-05-12'],
            disabledDays: [], // 특정일을 선택 못하게 할때 사용 -> ['2014-04-05', '2014-05-12'],
            holidaysAlertMsg: '',
            caption: '캘린더입니다. 글은 일요일, 월요일, 화요일, 수요일, 목요일, 금요일, 토요일 순으로 나옵니다.',
            monthCaption: '월 선택 캘린더입니다. 1월부터 12월까지 순서대로 나옵니다.',
            colWidth: '32px', // 셀 너비
            format: 'yyyy.MM.dd'
        },

        events: {},

        /**
         *
         * @param {jquery|element} el 엘리먼트
         * @param {object} [options] 옵션
         * @param {array<string>} [options.weekNames] 주의 한글명
         * @param {array<string>} [options.monthNames] 월의 한글명
         * @param {boolean} [options.isClickable=true] 날짜를 선택할 수 있게 할 것인가
         * @param {string} [options.titleFormat=yyyy년 MM월 dd일] 제목 포맷
         * @param {boolean} [options.weekendDisabled = false] 주말을 disabled시킬 것인가
         * @param {string} [options.inputTarget] 날짜를 선택했을 때, 날짜가 들어갈 인풋박스의 셀렉터
         * @param {boolean} [options.showOtherMonths = false] 이전, 다음달의 날짜를 표시할 것인가
         * @param {date} [options.date = Date.now()] 처음에 표시할 기본 날짜
         * @param {date} [options.today = Date.now()] 오늘 날짜
         * @param {boolean} [options.isHoverCell = true] 인라인모드에서 클릭했을 때 active효과를 줄 것인가.
         * @param {string} [minDate="-5y"] 이전 몇년까지 표시할 것인가
         * @param {string} [minDate="+5y"] 이전 몇년까지 표시할 것인가
         * @param {string} [options.caption] 달력 캡션
         * @param {string} [options.format="yyyy-MM-dd"] 표시할 날짜의 형식 ㅇ) self.format
         * @param {string} [options.colWidth="32px"] 컬럼너비
         * @param {string} [options.where="inline"] 달력 dom을 어디에 두고 열것인가 설정:(body(body 맨 하단, inline(버튼 바로 밑)
         * @param {boolean} [options.showByInput=false]
         * @returns {boolean}
         */
        initialize: function initialize(el, options) {
            var self = this,
                d;
            if (self.supr(el, options) === false) {
                return self.release();
            }

            self._normalizeOptions();
            self._parseMinMaxDate();

            self.isInline = !self.$el.is('button, input, a');

            // console.log("## self.options.inputTarget:",self.options.inputTarget)
            if (self.options.inputTarget) {
                self.$input = $(self.options.inputTarget);
                self.$input.data('ui_calendar', self);
            } else {
                throw new Error('data-input-target 속성을 설정해주세요.');
            }

            self.options.header = true;

            if (self.isInline) {
                self.currDate = d = dateUtil.parse(self.options.date), isNaN(d) ? new Date() : d;
                self.isShown = true;
                self._readInput();
                self._render();
            } else {

                if (detect.isMobile && self.options.mobileMode) {
                    self.currDate = d = dateUtil.parse(self.$input.val() || self.options.date), isNaN(d) ? new Date() : d;
                    self._renderMobileCalendar();

                    self.off('.calendar').on('click.calendar', function (e) {
                        e.preventDefault();
                        self.$input.focus().click();
                    });

                    return;
                } else {
                    self.options.showByInput && self.$input.on('click', function (e) {
                        if (self.isShown) {
                            return;
                        }
                        self.opener = this;
                        self.open();
                    });

                    self.$input.addClass('ui_formatter').attr({
                        'data-format': 'date',
                        'maxlength': 10
                    }).prop('readonly', true);
                    self.$input.on('keyup paste change', function (e) {

                        if (!self.isShown || this.value.length !== 10) {
                            return;
                        }
                        if (self._isValidDate(this.value)) {
                            self.setDate(this.value);
                        }
                    });

                    var val = self.$input.val();
                    if(val && val.length){
                        self.$input.addClass('selected');
                    }
                }

                self.options.type = 'button';
                self.off('.calendar').on('click.calendar', function (e) {
                    e.preventDefault();
                    if (self.isShown) {
                        self.close();
                        return;
                    }
                    self.opener = this;
                    self.open();
                });
            }
        },

        /**
         * 날짜 유효 체크
         * @param val
         * @returns {boolean}
         * @private
         */
        _isValidDate: function _isValidDate(val) {

            if (!val || val.length < 8) {
                return false;
            }
            val = dateUtil.parse(val);
            if (!dateUtil.isValid(val)) {
                return false;
            }
            if (this.minDate > val) {
                return false;
            }
            if (this.maxDate < val) {
                return false;
            }
            return true;
        },

        /**
         * 옵션 중에서 날짜옵션에 문자열로 된게 있으면 파싱해서 date형으로 변환한다.
         * @private
         */
        _normalizeOptions: function _normalizeOptions() {
            var self = this,
                opts = self.options;

            if (!core.is(opts.today, 'date')) {
                opts.today = dateUtil.parse(opts.today + '');
            }

            //data-holidays속성을 이용한 경우 문자열로 넘어오기 때문에 배열로 변환해주어야 한다.
            if (core.is(opts.holidays, 'string')) {
                try {
                    //opts.holidays = eval(opts.holidays);
                    opts.holidays = new Function('return ' + opts.holidays)();
                } catch (e) {
                    opts.holidays = [];
                }
            }

            //data-disabled-days속성을 이용한 경우 문자열로 넘어오기 때문에 배열로 변환해주어야 한다.
            if (core.is(opts.disabledDays, 'string')) {
                try {
                    //opts.disabledDays = eval(opts.disabledDays);
                    opts.disabledDays = new Function('return ' + opts.disabledDays)();
                } catch (e) {
                    opts.disabledDays = [];
                }
            }
        },

        /**
         * 옵션에 있는 최소날짜와 최대날짜를 Date형으로 변환
         */
        _parseMinMaxDate: function _parseMinMaxDate() {
            var self = this,
                opts = self.options,
                minDate = opts.minDate,
                maxDate = opts.maxDate;

            self.setMinDate(minDate);
            self.setMaxDate(maxDate);
        },

        /**
         * 미선택 여부
         * @param {number} y 년도
         * @param {number} m 월
         * @param {number} d 일
         * @returns {boolean} 미선택여부
         * @private
         */
        _isDisabledDay: function _isDisabledDay(y, m, d) {
            var self = this,
                disabledDays = self.options.disabledDays,
                i,
                date,
                item;

            for (var i = -1; item = disabledDays[++i];) {
                date = dateUtil.parse(item);
                if (date.getFullYear() === y && date.getMonth() + 1 === m && date.getDate() === d) {
                    return true;
                }
            }

            return false;
        },

        /**
         * 휴일 여부
         * @param {number} y 년도
         * @param {number} m 월
         * @param {number} d 일
         * @returns {boolean} 휴일여부
         * @private
         */
        _isHoliday: function _isHoliday(y, m, d) {
            var self = this,
                holidays = self.options.holidays,
                i,
                date,
                item;

            for (var i = -1; item = holidays[++i];) {
                date = dateUtil.parse(item);
                if (date.getFullYear() === y && date.getMonth() + 1 === m && date.getDate() === d) {
                    return true;
                }
            }

            return false;
        },

        /**
         * 최소날짜 설정
         *
         * @param {Date|String} minDate '2014-12-12', '-2M'
         */
        setMinDate: function setMinDate(m, isRender) {
            var self = this,
                today = core.clone(self.options.today),
                minDate,
                val;

            if (!m) {
                minDate = core.clone(self.options.minDate);
            } else {
                minDate = m;
            }

            if (core.is(minDate, 'date')) {
                self.minDate = core.clone(minDate);
            } else if (dateRegex.test(minDate)) {
                self.minDate = core.date.parse(minDate);
            } else {
                if (val = core.date.calc(today, minDate)) {
                    self.minDate = val;
                }
            }

            if (!core.is(self.minDate, 'date')) {
                self.minDate = new Date(today.getFullYear() - 5, 0, 1, 0, 0, 0, 0);
            }

            self.minDate.setHours(0, 0, 0, 0);

            if (dateUtil.isValid(self.currDate) && self.currDate < self.minDate) {
                self.currDate = core.clone(self.minDate);
            }
            if (self.isShown && isRender !== false) {

                self._renderHeader();
                self._renderDate();
            }

            if (detect.isMobile && self.options.mobileMode) {
                if(self.$input) self.$input.prop({ 'min': dateUtil.format(self.minDate, self.format) });
            }

            if (self.$input && dateUtil.isValid(self.$input.val()) && dateUtil.compare(self.minDate, self.$input.val()) === -1) {

                /*
                if (detect.isMobile && self.options.mobileMode) {
                    self.$input.val(dateUtil.format(self.minDate, self.format));
                } else {
                    self.$input.val(dateUtil.format(self.minDate));
                }
                */
               self.$input.val(dateUtil.format(self.minDate, self.options.format));
            }
        },

        /**
         * 최대날짜 설정
         *
         * @param {Date|String} maxDate '2014-12-12', '+2M'
         */
        setMaxDate: function setMaxDate(m, isRender) {
            var self = this,
                today = core.clone(self.options.today),
                maxDate,
                val;

            if (!m) {
                maxDate = core.clone(self.options.maxDate);
            } else {
                maxDate = m;
            }

            if (core.is(maxDate, 'date')) {
                self.maxDate = core.clone(maxDate);
            } else if (dateRegex.test(maxDate)) {
                self.maxDate = core.date.parse(maxDate);
            } else {
                if (val = core.date.calc(today, maxDate)) {
                    self.maxDate = val;
                }
            }

            if (!core.is(self.maxDate, 'date')) {
                self.maxDate = new Date(today.getFullYear() + 5, 11, 31, 0, 0, 0, 0);
            }

            self.maxDate.setHours(0, 0, 0, 0);

            if (dateUtil.isValid(self.currDate) && self.currDate > self.maxDate) {
                self.currDate = core.clone(self.maxDate);
            }
            if (self.isShown && isRender !== false) {
                self._renderHeader();
                self._renderDate();
            }

            if (detect.isMobile && self.options.mobileMode) {
                if(self.$input) self.$input.prop({ 'max': dateUtil.format(self.maxDate, self.format) });
            }

            if (self.$input && dateUtil.isValid(self.$input.val()) && dateUtil.compare(self.maxDate, self.$input.val()) === 1) {
                if (detect.isMobile && self.options.mobileMode) {
                    self.$input.val(dateUtil.format(self.maxDate, self.format));
                } else {
                    self.$input.val(dateUtil.format(self.maxDate));
                }
            }
        },

        /**
         * 최소/최대 날짜 지정
         * @param {date|string} minDate 최소 날짜
         * @param {date|string| maxDate 최대 날짜
         */
        setRangeDate: function setRangeDate(minDate, maxDate) {
            var self = this;

            self.setMinDate(minDate, false);
            self.setMaxDate(maxDate, false);
            if (self.isShown) {
                self._renderHeader();
                self._renderDate();
            }
        },

        /**
         * 모바일 버전 렌더링
         * @private
         */
        _renderMobileCalendar: function _renderMobileCalendar() {
            var self = this;
            self.oldTxt = "";

            self.$input.val(dateUtil.format(self.$input.val(), self.format)).attr({
                'type': 'date',
                'data-module': 'calendar'
            }).prop({
                'readonly': false,
                'min': dateUtil.format(self.minDate, self.format),
                'max': dateUtil.format(self.maxDate, self.format)
            }).on('change', function (e) {

                var newDate = $(e.currentTarget).val();
                var evtData = {
                    target: e.currentTarget,
                    //year: $this.data('year'),month: $this.data('month'),day: $this.data('day'),value: format,calendar: self.$calendar[0],
                    date: newDate

                };
                self.$input.triggerHandler('calendarinsertdate', evtData);
            });
        },

        /**
         * 위치 재조절
         */
        _reposition: function _reposition() {
            if (this.options.type !== 'button' || this.options.isInline) {
                return;
            }

            var self = this,
                util = core.util,
                calWidth = self.$calendar.outerWidth(),
                calHalfWidth = Math.ceil(calWidth / 2),
                calHeight = self.$calendar.outerHeight(),
                calHalfHeight = Math.ceil(calHeight / 2),
                inpWidth,
                inpHalfWidth,
                offset,
                docWidth,
                top,
                left,
                absLeft;

            inpWidth = self.$input.outerWidth();
            inpHalfWidth = Math.ceil(inpWidth / 2);
            top = self.$input[self.options.where === 'body' ? 'offset' : 'position']().top + self.$input.outerHeight() + 10;
            left = inpHalfWidth - calHalfWidth;

            if (self.options.where === 'body') {
                self.$calendar.css({
                    top:'50%',
                    left:'50%'
                });
            } else {
                // self.$calendar.css({
                //     left: left,
                //     top: top
                // });
            }
            return self;
        },

        /**
         * 모달 띄우기
         * @returns {Calendar}
         */
        open: function open() {
            var self = this;

            if (self.isInline) {
                return;
            }
            Calendar.active && Calendar.active.close();
            Calendar.active = this;

            var ev = $.Event('calendarshow');
            self.trigger(ev);

            if (ev.isDefaultPrevented()) {
                return;
            }

            self._readInput();
            self._render();
            self._reposition();
            self.show();
            self.isShown = true;
            self.$calendar.attr('tabindex', 0).focus();

            return self;
        },

        /**
         * 인풋에 있는 값을 달력에 반영
         * @private
         */
        _readInput: function _readInput() {
            var self = this,
                val = self.$input.val(),
                valDate = val && val.length < 8 ? null : dateUtil.parse(val);

            if (core.date.isValid(valDate)) {
                if (!valDate || isNaN(valDate.getTime())) {
                    self.currDate = core.clone(self.options.date);
                    self.activeDate = core.clone(self.options.today);
                    if (val) {
                        self.$input.val(dateUtil.format(self.activeDate));
                    }
                } else {
                    var cmp = self._compareDate(valDate);
                    if (cmp < 0) {
                        valDate = self.currDate = core.clone(self.minDate);
                    } else if (cmp > 0) {
                        valDate = self.currDate = core.clone(self.maxDate);
                    } else {
                        self.currDate = valDate;
                    }
                    self.activeDate = core.clone(valDate);

                    if (val && cmp !== 0) {
                        self.$input.val(dateUtil.format(valDate));
                    }
                }
            } else {
                self.currDate = core.clone(self.options.date);
                self.activeDate = core.clone(self.options.today);
            }
        },

        /**
         * 모달 닫기
         * @returns {Calendar}
         */
        close: function close() {
            var self = this;

            if (self.isInline) {
                return;
            }

            self.isShown = false;
            self._trigger('hidden');
            self._remove();
            $doc.off('.calendar');
            Calendar.active = null;

            return this;
        },

        /**
         * 모달 표시
         * @returns {Calendar}
         */
        show: function show() {
            var self = this;

            if (!self.isInline) {
                if (self.$el.prop('disabled') || self.$el.hasClass('disabled')) {
                    return;
                }

                $doc.on('mousedown.calendar', function (e) {
                    if (self.$input && self.$input[0] !== e.target && !$.contains(self.$el[0], e.target) && !$.contains(self.$calendar[0], e.target) && self.$el[0] != e.target) {
                        //e.preventDefault();
                        self.close();
                    }
                });

                if (!core.isTouch) {
                    self._escape();
                }

                self.$calendar.show(); //showLayer({opener: self.$el});
                self._trigger('shown');
            }

            return self;
        },

        /**
         * esc 키를 누르면 닫히도록 이번트 바인딩
         * @private
         */
        _escape: function _escape() {
            var self = this;

            self.$calendar.add(self.$el).add(self.$input).off('keyup.calendar').on('keyup.calendar', function (e) {
                if (e.keyCode === core.keyCode.ESCAPE) {
                    self.close();
                    $(self.opener).focus();
                }
            });
        },

        /**
         * DOM 삭제
         * @returns {Calendar}
         */
        _remove: function _remove() {
            var self = this;

            if (self.$calendar) {
                //self.$selectboxYears.vcSelectbox('release');
                self.$calendar.off();
                self.$calendar.remove();
                // self.$dim.remove();
                self.$calendar = null;
            }

            return self;
        },

        /**
         * 렌더링
         */
        _render: function _render() {
            var self = this,
                opts = self.options,
                timer,
                dim,
                tmpl;

            if (!dateUtil.isValid(self.currDate)) {
                self.currDate = dateUtil.parse(self.options.date);
            }
            if (self.currDate < self.minDate) {
                self.currDate = core.clone(self.minDate);
            }
            if (self.currDate > self.maxDate) {
                self.currDate = core.clone(self.maxDate);
            }

            tmpl = '<div class="ui-calendar-container"><div class="ui-select-day">' + (opts.header !== false ? opts.template.header : '') + '<div class="ui-calendar-date"></div></div></div>';
            // dim = '<div class="ui-calendar-dim">&nbsp;</div>'

            self._remove();
            self.$calendar = $(tmpl);
            // self.$dim = $(dim);

            if (opts.header) {
                self.$calendar.on('change', '.ui-calendar-sel-years', function (e) {
                    var date = core.clone(self.currDate);
                    date.setYear(this.value | 0);
                    self.setCurrentDate(date);
                });
            }

            if (self.isInline) {
                // 인라인
                self.$el.empty().append(self.$calendar);
                self.$el.find('.ui-calendar-close').remove();
            } else {
                // 모달
                // self.$calendar.css({
                //     position: 'fixed',
                //     zIndex: 9000
                // });
                if (self.options.where === 'body') {
                    // $('body').append(self.$dim);
                    $('body').append(self.$calendar);
                } else {
                    self.$el.parent().append(self.$calendar);
                }
            }

            self.$calendar.off('.calendar').on('click.calendar', '.ui-calendar-prev, .ui-calendar-next', function (e) {
                // 이전 / 다음
                e.preventDefault();
                if (self.$el.hasClass('disabled')) {
                    return;
                }

                var $el = $(e.currentTarget),
                    isPrev = $el.hasClass('ui-calendar-prev');

                self[isPrev ? 'prev' : 'next']();
                self.$calendar.find('.ui-calendar-' + (isPrev ? 'prev' : 'next')).focus();
            }).on('click.calendar', '.ui-calendar-day:not(.disabled)', function (e) {
                // 날짜 클릭
                e.preventDefault();
                if (self.$el.hasClass('disabled')) {
                    return;
                }
                if (self.options.holidaysAlertMsg !== '' && ($(this).parent().hasClass('ui-calendar-holiday') || $(this).parent().hasClass('ui-calendar-sunday') || $(this).parent().hasClass('ui-calendar-saturday'))) {
                    alert(self.options.holidaysAlertMsg);
                    return;
                }

                var $this = $(this).closest('td'),
                    data = $this.data(),
                    date = new Date(data.year, data.month - 1, data.day),
                    format = dateUtil.format(date, opts.format || ''),
                    e,
                    evtData = {
                    target: this,
                    year: $this.data('year'),
                    month: $this.data('month'),
                    day: $this.data('day'),
                    value: format,
                    date: date,
                    calendar: self.$calendar[0]
                };

                e = $.Event('calendarselected');
                e.target = e.currentTarget = this;
                self[opts.isBubble ? 'trigger' : 'triggerHandler'](e, evtData);
                if (e.isDefaultPrevented()) {
                    return;
                }

                if (opts.inputTarget) {
                    self.$input.val(format);
                    e = $.Event('calendarinsertdate');
                    e.target = e.currentTarget = this;
                    self.$input[opts.isBubble ? 'trigger' : 'triggerHandler'](e, evtData);
                    self.$input.addClass('selected'); // 날짜 선택 시 selected

                    /*if (e.isDefaultPrevented()) {
                     return;
                     }*/
                }

                if (self.isInline && opts.isClickActive !== false) {
                    self.$calendar.find('.ui-calendar-active').removeClass('ui-calendar-active');
                    $this.addClass('ui-calendar-active');
                    self._readInput();
                }
                if (!self.isInline) {
                    self.close();
                    self.$input.focus();
                }
            }).on('click.calendar', '.ui-calendar-set-today', function (e) {
                // 오늘 클릭
                e.preventDefault();
                self.activeDate = core.clone(self.options.today);
                self.currDate = core.clone(self.options.today);

                // 달력 그리기
                self._renderDate();
            }).on('click.calendar', '.ui-calendar-close', function (e) {
                // 닫기 클릭
                e.preventDefault();

                self.close();
                $(self.opener).focus();
            }).on('mouseenter.calendar mouseleave.calendar', 'td.ui-calendar-cell:not(.disabled)', function (e) {
                $(this).toggleClass('active', e.type === 'mouseenter');
            }).on('mouseenter.calendar mouseleave.calendar', '.ui-calendar-table tbody', function (e) {
                $(this).toggleClass('ui-calendar-over', e.type === 'mouseenter');
            });

            self._renderHeader();
            self._renderDate();
            self._enforceFocus();

            return self;
        },

        /**
         * 달력을 새로 그리기
         */
        update: function update() {
            if (!this.isShown) {
                return;
            }
            this._render();
            this._reposition();
        },

        /**
         * 헤더에 현재 날짜에 대한 정보 표시
         * @private
         */
        _renderHeader: function _renderHeader() {
            var self = this,
                opts = self.options;

            if (!opts.header) {
                return;
            }

            // self.$calendar.find('.ui-calendar-header-first').css('z-index', 1);
            // self.$selectboxYears = self.$calendar.find('.ui-calendar-sel-years');

            // self.$selectboxYears.empty();
            // for (var i = self.minDate.getFullYear(); i <= self.maxDate.getFullYear(); i++) {
            //     self.$selectboxYears[0].options.add(new Option(i, i));
            // }

            // self.$selectboxYears.val(self.currDate.getFullYear()).prop("selected", true); // default selectbox;

            // 일달력(.ui-calendar-header-first)의 년도 선택 버튼에 년도 설정
            //self.$selectboxYears.vcSelectbox('option', 'preventZindex', true);
            //self.$selectboxYears.vcSelectbox('value', self.currDate.getFullYear(), false);


            // 일달력(.ui-calendar-header-second)의 월선택 버튼에 월 설정
            var currDate = new Date(self.currDate.getTime()),
                html,
                $second = self.$calendar.find('.ui-calendar-header-second'),
                isFirst = currDate.getFullYear() === self.minDate.getFullYear() && currDate.getMonth() === self.minDate.getMonth(),
                isLast = currDate.getFullYear() === self.maxDate.getFullYear() && currDate.getMonth() === self.maxDate.getMonth();

            currDate = core.date.calcDate(currDate, '-1M');
            $second.children().each(function (val, name) {
                html = '<span class="year">' + currDate.getFullYear() + '<span class="blind">년</span></span>';
                html += core.number.zeroPad(currDate.getMonth() + 1, 2);
                if (val === 1) {
                    html += '<span class="blind">월이 선택됨</span>';
                } else {
                    html += '<span class="blind">월로 이동</span>';
                }
                $(this).html(html);
                currDate = core.date.calcDate(currDate, '1M');
            });

            $second.find('.ui-calendar-prev').toggleClass('disabled', isFirst).attr('tabindex', isFirst ? '-1' : '0');
            $second.find('.ui-calendar-next').toggleClass('disabled', isLast).attr('tabindex', isLast ? '-1' : '0');
        },

        /**
         * 해제 메소드
         */
        destroy: function destroy() {
            var self = this;

            self.$input && self.$input.removeData('calendar');
            self._remove();
            self.close();
            self.supr();
        },

        /**
         * 주어진 월이 유효한 범위에 있는가 체크
         * @param date
         * @returns {*}
         * @private
         */
        _compareMonth: function _compareMonth(date) {
            var self = this;
            date = core.clone(date);
            date.setDate(self.minDate.getDate());
            date.setHours(0, 0, 0, 0);

            if (date.getTime() < self.minDate.getTime()) {
                return -1;
            }
            date.setDate(self.maxDate.getDate());
            if (date.getTime() > self.maxDate.getTime()) {
                return 1;
            }
            return 0;
        },

        /**
         * 주어진 날짜가 유효한 범위에 있는가 체크
         * @param date
         * @returns {*}
         * @private
         */
        _compareDate: function _compareDate(date) {
            var self = this;
            if (!(date instanceof Date)) {
                date = dateUtil.parse(date);
            }
            if (!date || isNaN(date)) {
                return null;
            }
            date.setHours(0, 0, 0, 0);

            if (date.getTime() < self.minDate.getTime()) {
                return -1;
            }
            if (date.getTime() > self.maxDate.getTime()) {
                return 1;
            }
            return 0;
        },

        /**
         * 표시할 날짜 설정
         * @param date
         */
        setCurrentDate: function setCurrentDate(date) {
            if (!(date instanceof Date)) {
                date = dateUtil.parse(date);
            }
            if (!date || isNaN(date)) {
                return;
            }
            var self = this,
                result = self._compareMonth(date);
            if (result < 0) {
                date.setYear(self.minDate.getFullYear());
                date.setMonth(self.minDate.getMonth());
            } else if (result > 0) {
                date.setYear(self.maxDate.getFullYear());
                date.setMonth(self.maxDate.getMonth());
            }
            self.currDate = date;
            //self.$selectboxYears.val(date.getFullYear());
            if (self.isShown) {
                self._renderDate();
            }
        },

        /**
         * 달력 그리기
         * @returns {Calendar}
         * @private
         */
        _renderDate: function _renderDate() {
            var self = this,
                opts = self.options,
                beforeRenderDay = opts.beforeRenderDay,
                date = self._getDateList(self.currDate),
                html = '',
                tmpl = core.template(opts.template[opts.type] || opts.template.button),
                isHoliday = false,
                isDisabledDay = false,
                isToday = false,
                isSelectDay = false,
                isOtherMonth = false,
                isDisabled = false,
                i,
                j,
                y,
                m,
                d,
                week,
                len,
                cell,
                nowd;

            html += '<table class="ui-calendar-table" border="0"><caption>' + opts.caption + '</caption>';
            html += '<colgroup>';
            for (i = 0; i < 7; i++) {
                html += '<col width="' + opts.colWidth + '" />';
            }
            html += '</colgroup><thead>';
            for (i = 0; i < 7; i++) {
                html += '<th class="ui-calendar-dayname ' + (i === 0 ? ' ui-calendar-sunday' : i === 6 ? ' ui-calendar-saturday' : '') + '" scope="col">';
                html += opts.weekNames[i];
                html += '</th>';
            }
            html += '</thead><tbody>';

            for (i = 0, len = date.length; i < len; i++) {
                week = date[i];

                html += '<tr>';
                for (j = 0; j < 7; j++) {
                    y = week[j].year, m = week[j].month, d = week[j].day;
                    nowd = new Date(y, m - 1, d);

                    if (self.activeDate) {
                        isSelectDay = self.activeDate.getFullYear() === y && self.activeDate.getMonth() + 1 === m && self.activeDate.getDate() === d;
                    }
                    isToday = opts.today.getFullYear() === y && opts.today.getMonth() + 1 === m && opts.today.getDate() === d;
                    isOtherMonth = self.currDate.getMonth() + 1 != m;
                    isDisabled = self._compareDate(nowd) !== 0 || opts.weekendDisabled && (j === 0 || j === 6) || self._isDisabledDay(y, m, d);
                    isHoliday = self._isHoliday(y, m, d);

                    if (beforeRenderDay) {
                        cell = beforeRenderDay.call(me, y, m, d, {
                            isSaturday: j === 6,
                            isSunday: j === 0,
                            isHoliday: isHoliday,
                            isToday: isToday,
                            isOtherMonth: isOtherMonth
                        }) || { cls: '', html: '', disabled: '' };
                    } else {
                        cell = { cls: '', html: '', disabled: '' };
                    }
                    cell.cls = '';

                    html += '<td class="ui-calendar-' + dateUtil.format(nowd, 'yyyyMMdd') + ' ui-calendar-cell' + (isDisabled ? " disabled" : "");
                    if (opts.showOtherMonths && isOtherMonth || !isOtherMonth) {
                        html += (isHoliday ? ' ui-calendar-holiday' : '') + (j === 0 ? ' ui-calendar-sunday' : j === 6 ? ' ui-calendar-saturday' : '') + (isToday ? ' ui-calendar-today' : '') + (!isDisabled && isSelectDay ? ' ui-calendar-active' : '');
                    }
                    html += (isOtherMonth ? ' ui-calendar-other' : '') + cell.cls + '" data-year="' + y + '" data-month="' + m + '" data-day="' + d + '">';

                    if (!isOtherMonth || opts.showOtherMonths) {
                        if (cell.html) {
                            html += cell.html;
                        } else {
                            html += tmpl({
                                title: dateUtil.format(nowd, opts.titleFormat) + (isToday ? ' 오늘' : '') + (isDisabled ? " 선택할 수 없음" : isSelectDay ? ' 선택일' : ''),
                                isHoliday: isHoliday,
                                isToday: isToday,
                                isOtherMonth: isOtherMonth,
                                isSunday: j === 0,
                                isSaturday: j === 6,
                                day: d,
                                date: nowd,
                                disabled: isDisabled
                            });
                        }
                    } else {
                        html += '&nbsp;';
                    }
                    html += '</td>';
                } // for
                html += '</tr>';
            } // for
            html += '</tbody></table>';

            self.$calendar.find('.ui-calendar-date').html(html);
            self.$calendar.find('.ui-calendar-text').text(dateUtil.format(self.currDate, 'yyyy-MM'));

            if (opts.header) {
                self._renderHeader();
            }

            return self;
        },

        /**
         * 화면 갱신
         */
        refresh: function refresh() {
            this._renderDate();
        },

        /**
         * 주어진 날짜에 해당하는 dom요소를 반환
         * @param day
         * @returns {*}
         */
        findDateCell: function findDateCell(day) {
            return this.$calendar.find('.data-' + day.getFullYear() + '' + (day.getMonth() + 1) + '' + day.getDate());
        },

        /**
         * 입력요소를 활성화
         */
        enable: function enable() {
            var self = this;
            if (!self.options.isInline) {
                self.$input.disabled(false);
            }
            self.$el.disabled(false);
        },

        /**
         * 입력요소를 비활성화
         */
        disable: function disable() {
            var self = this;

            self.close();
            if (self.options.inputTarget) {
                self.$input.disabled(true);
            }
            self.$el.disabled(true);
        },

        /**
         * 날짜 변경
         * @param date
         */
        setDate: function setDate(date, options) {
            if (!date) {
                return;
            }
            var self = this;

            if (options) {
                self.options = $.extend(true, self.options, self.$el.data(), options);
                self._normalizeOptions();
            }

            //console.log('setdate:',date);
            try {
                if (dateUtil.isValid(date)) {
                    self.activeDate = dateUtil.parse(date);
                } else {
                    return;
                    //self.activeDate = new Date();
                }
                self.currDate = core.clone(self.activeDate);
                if (self.isShown) {
                    self.setCurrentDate(core.clone(self.currDate));
                }

                // console.log("self.options.inputTarget:",self.options.inputTarget)
                if (self.options.inputTarget) {
                    self.$input.val(dateUtil.format(date, self.options.format));
                    var e = $.Event('calendarinsertdate');
                    e.target = e.currentTarget = this;
                    var evtData = {
                        target: e.currentTarget,
                        date: date
                    };
                    self.$input[self.options.isBubble ? 'trigger' : 'triggerHandler'](e, evtData);
                }

            } catch (e) {
                throw new Error('Calendar#setDate(): 날짜 형식이 잘못 되었습니다.');
            }
            return this;
        },

        /**
         * 오늘날짜 변경
         * @param today
         */
        setToday: function setToday(today) {
            var self = this;

            if (!core.is(today, 'date')) {
                try {
                    self.options.today = core.date.parse(today);
                } catch (e) {
                    throw new Error('calendar#setToday: 날짜 형식이 잘못 되었습니다.');
                }
            }
            self._renderDate();
        },

        /**
         * 오늘날짜 반환
         * @returns {Date} 오늘날짜
         */
        getToday: function getToday() {
            return this.options.today;
        },

        /**
         * 현재 날짜를 반환
         * @returns {*}
         */
        getCurrentDate: function getCurrentDate() {
            return this.currDate;
        },

        getyyyyMMdd: function getyyyyMMdd() {
            var str = this.$input.val() ? this.$input.val().replace(/\D/g,'') : null;
            return str; 
        },

        /**
         * 이전달
         * @returns {Calendar}
         */
        prev: function prev() {
            var self = this,
                currDate = core.date.add(self.currDate, 'M', -1);
            if (self.options.header && self._compareMonth(currDate) !== 0) {
                return this;
            }
            self.currDate = currDate;
            self._renderDate();

            return this;
        },

        /**
         * 다음달
         * @returns {Calendar}
         */
        next: function next() {
            var self = this,
                currDate = core.date.add(self.currDate, 'M', 1);
            if (self.options.header && self._compareMonth(currDate) !== 0) {
                return this;
            }
            self.currDate = currDate;
            self._renderDate();

            return this;
        },

        /**
         * 날짜 데이타 계산
         * @param {Date} date 렌더링할 날짜 데이타 생성
         * @return {Array}
         */
        _getDateList: function _getDateList(date) {
            date.setDate(1);

            var self = this,
                month = date.getMonth() + 1,
                year = date.getFullYear(),
                startOnWeek = date.getDay() + 1,
                last = daysInMonth[date.getMonth()],
                // 마지막날
            prevLast = daysInMonth[date.getMonth() === 0 ? 11 : date.getMonth() - 1],
                // 이전달의 마지막날
            startPrevMonth = prevLast - startOnWeek,
                // 이전달의 시작일
            y = year,
                m = month;

            if (month > 12) {
                month -= 12, year += 1;
            } else {
                if (month == 2 && self._isLeapYear(year)) {
                    last = 29;
                }
            }

            var data = [],
                week = [];

            if (startOnWeek > 0) {
                if (month == 3 && self._isLeapYear(year)) {
                    startPrevMonth += 1;
                }
                if ((m = month - 1) < 1) {
                    m = 12, y = year - 1;
                }
                for (var i = 1; i < startOnWeek; i++) {
                    week.push({ year: y, month: m, day: startPrevMonth + i + 1 }); // ***** +1
                }
                if (week.length > 6) {
                    data.push(week), week = [];
                }
            }

            for (var i = 1; i <= last; i++) {
                week.push({ year: year, month: month, day: i });
                if (week.length > 6) {
                    data.push(week), week = [];
                }
            }

            if (week.length > 0 && week.length < 7) {
                if ((m = month + 1) > 12) {
                    m -= 12, y = year + 1;
                }
                for (var i = week.length, d = 1; i < 7; i++, d++) {
                    week.push({ year: y, month: m, day: d });
                }
            }
            week.length && data.push(week);
            return data;
        },

        /**
         * 다음달
         * @returns {Calendar}
         */
        _enforceFocus: function _enforceFocus() {
            var self = this,
                isKeyDown = false;

            $doc.off('keydown.calendar keyup.calendar').on('keydown.calendar keyup.calendar', function (e) {
                isKeyDown = e.type === 'keydown';
            }).off('focusin.calendar').on('focusin.calendar', self.proxy(function (e) {
                if (!isKeyDown) {
                    return;
                }
                if (self.$calendar[0] !== e.target && !$.contains(self.$calendar[0], e.target)) {
                    self.$calendar.find('div:visible').find(':focusable').first().focus();
                    e.stopPropagation();
                }
            }));
        },

        /**
         * 윤년 여부
         * @param {Date} date 렌더링할 날짜 데이타 생성
         * @return {boolean} 윤년 여부
         */
        _isLeapYear: function _isLeapYear(year) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        }
    });

    return Calendar;
});

vcui.define('ui/videoBox', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var VideoBox = core.ui('VideoBox', {
        bindjQuery: true,
        defaults: {
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self.$videos = self.$el.find("video");
            var leng = self.$videos.length;
            for(var i=0; i<leng;i++){
                var video = self.$videos.get(i);
                video.setAttribute('playsinline', true);
                video.style.backgroundColor="#000000";
            }

            //self.$video = self.$el.find("video").get(0);
            //self.$video.setAttribute('playsinline', true);
            //self.$video.style.backgroundColor="#000000";
            //self.$defaultVname = self.$el.find("video").find('source').attr('src');
            self.$ctrler = self.$el.find('.controller-wrap button');
            self.$acctrler = self.$el.find(".play-animaion-btn");

            self.$captionBtn = self.$el.find('.caption-wrap button');

            if(self.$el.find("video").attr("autoplay") != 'autoplay'){
                self.$ctrler.removeClass("pause").addClass("play");
                self._ariaBuild();
            }
            
            self._addEvent();
        },

        _getCurrentVideo: function(){
            var self = this;

            var leng = self.$videos.length;
            if(leng < 2){
                return self.$videos.get(0);
            } else{
                var video;
                for(var i=0;i<leng;i++){
                    var video = self.$videos.get(i);
                    if($(video).css('display') == "block"){
                        break;
                    }
                }

                return video;
            }
        },

        _addEvent: function(){
            var self = this;
            self.$ctrler.on("click", function(e){
                e.preventDefault();

                self.$video = self._getCurrentVideo();
                
                var name = $(this).attr('name');
                if(name == "pause"){
                    self.$video.pause();
                } else if(name == "play"){
                    self.$video.play();
                }
            });

            self.$acctrler.on('click', function(e){
                e.preventDefault();

                self.$video = self._getCurrentVideo();
                
                if($(this).hasClass('acc-btn')){
                    var aniText = $(this).data('ani-text');					    
                    $(this).attr('aria-label', aniText).addClass('ani-btn').removeClass('acc-btn').text(aniText);
                    
                    self.$video.setAttribute('src', $(this).data('src'));
                    self.$video.setAttribute('muted', false);
                    self.$video.load();
                }else{
                    var accAniText = $(this).data('acc-ani-text');
                    $(this).attr('aria-label', accAniText).addClass('acc-btn').removeClass('ani-btn').text(accAniText);
                    
                    self.$video.setAttribute('src', self.$el.find("video").find('source').attr('src'));
                    self.$video.setAttribute('muted', true);
                    self.$video.load();
                }

                if(self.$el.find("video").attr("autoplay") != 'autoplay'){
                    self.$ctrler.removeClass("pause").addClass("play");
                    self._ariaBuild();
                }
            });

            self.$video = self._getCurrentVideo();
            $(self.$videos).on("play playing pause ended", function(e){
                switch(e.type){
                    case "ended":
                    case "pause":
                        self.$ctrler.removeClass("pause").addClass("play");
                        break;

                    case "play":
                    case "playing":
                        self.$ctrler.removeClass("play").addClass("pause");
                        break;
                }

                self._ariaBuild();
            });

            self.$captionBtn.on('click', function(e){
                e.preventDefault();

                self._addCaption();
            })
        },

        _addCaption: function(){
            var self = this;

            $('.component.ani-caption').remove();

            var caption = self.$el.find('article.cap-section');
            
            $('body').append('<div class="component ani-caption"><button type="button" class="btn-close"><span class="blind">닫기</span></button></div>');
            $('.component.ani-caption').prepend(caption.clone().show());
            $('.component.ani-caption').css({y:'100%'}).transition({y:0}, 350, 'easeOutQuart');
            $('.component.ani-caption').on('click', '.btn-close', function(e){
                e.preventDefault();

                $('.component.ani-caption').off('click', '.btn-close');
                $('.component.ani-caption').transition({y:'100%'}, 350, 'easeOutQuart', function(){
                    $('.component.ani-caption').remove();
                });
            })
        },

        _ariaBuild: function(){
            var self = this;
            
            if(self.$ctrler.hasClass('play')){
                self.$ctrler.attr('name', 'play')
                .attr("aria-label", "Play Video")
                .text(self.$ctrler.data("playText"));
            } else{
                self.$ctrler.attr('name', 'pause')
                .attr("aria-label", "Pause Video")
                .text(self.$ctrler.data("pauseText"));
            }
        },

        pause: function(){
            var self = this;

            self.$video = self._getCurrentVideo();
            self.$video.pause();
        },

        play: function(){
            var self = this;

            self.$video = self._getCurrentVideo();
            self.$video.play();
        },

        reset: function(){
            var self = this;
            if(!(self.$acctrler.hasClass('acc-btn'))) {
                self.$acctrler.trigger("click");
            }
            self.pause();
        }
    });

    return VideoBox;
});

vcui.define('ui/youtubeBox', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var YoutubeBox = core.ui('youtubeBox', {
        bindjQuery: true,
        defaults: {
            videoTitle : null, //'Simplicity &amp; LG SIGNATURE',
            videoInfo : null, //'단순함이 궁극의 세련미를 만듭니다.<br>가전, 작품이 되다',
            linkClass:'.see-video',
            modalTitleTemplate:                 
                '<div id="{{videoId}}" class="video-modal video-box-closeset animation">'+
                '   <div class="modal-video-asset">'+
                '       <div class="video-asset">'+
                '           <div class="video-box">'+
                '               <video controls autoplay {{params}}>'+
                '                   <source src="{{video_url}}" type="video/mp4">'+
                '               </video>'+
                // '               <div class="video-controller">'+
                // '                   <button type="button" class="btn-video"><span class="blind">영상 재생</span></button>'+
                // '               </div>'+
                '           </div>'+
                '           <div class="video-info">'+
                '                <span class="title">{{#raw video_title}}</span>'+
                '                <p class="body-copy">{{#raw video_info}}</p>'+
                '            </div>'+
                '       </div>'+
                '   </div>'+
                '   <button class="close-video">동영상 닫기</button>'+
                '</div>',
            modalTemplate:                 
                '<div class="video-modal video-box-closeset youtube">'+
                '   <div class="modal-video-asset">'+
                '       <div class="video-asset">'+
                '           {{#if videoType == "youtube"}}'+
                '           <iframe id="videoPlayerCode" frameborder="0" allowfullscreen="1" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="360" src="{{video_url}}"></iframe>'+
                '           {{#else}}'+
                '           <video controls {{params}} style="width:100%;height:100%">'+
                '               <source src="{{video_url}}" type="video/mp4">'+
                '           </video>'+
                '           {{/if}}'+
                '       </div>'+
                '   </div>'+
                '   <button class="close-video">동영상 닫기</button>'+
                '</div>',
            layerTemplate:
                '<div class="video-asset video-box-closeset">'+
                '   {{#if videoType == "youtube"}}'+
                '   <iframe id="videoPlayerCode" frameborder="0" allowfullscreen="1" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="360" src="{{video_url}}"></iframe>'+
                '   {{#else}}'+
                '   <video controls {{params}} style="width:100%;height:100%">'+
                '       <source src="{{video_url}}" type="video/mp4">'+
                '   </video>'+
                '   {{/if}}'+
                '   <button class="close-video">Close Video</button>'+
                '</div>'
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };
            
            self._bindEvent();
        },

        _bindEvent: function(){
            var self = this;

            var linkClass = self.options.linkClass;

            self.$el.find(linkClass).on('click', function(e){
                e.preventDefault();
                self._addVideo($(this));
            });
        },

        _addVideo: function(item){
            var self = this,
                isModal, videoTemplate, video_url, videoLayer, videoType;

            isModal = item.data('target') == "modal" ? true : false;

            video_url = item.attr('data-src');
            
            var params = "";
            var urlsplit = video_url.split("?");
            var isMp4 = urlsplit[0].indexOf(".mp4");
            // console.log("isMp4:", isMp4)
            if(isMp4 < 0){
                videoType = "youtube";
            } else{
                videoType = "mp4";
                params = urlsplit.length > 1 ? urlsplit[1].split("&").join(" ") : "";
            }
            self.$el.data('boxCloseType', videoType);
            // console.log("videoType:",videoType);
            // console.log("video_url:",urlsplit[0]);                
            // console.log("params:",params);

            var videoTitle = self.options.videoTitle;
            var videoInfo = self.options.videoInfo;
            var videoId = vcui.getUniqId(8);

            videoTemplate = isModal ? (videoTitle? self.options.modalTitleTemplate:self.options.modalTemplate) : self.options.layerTemplate;
            videoLayer = vcui.template(videoTemplate, {videoId:videoId, videoType: videoType, video_title:videoTitle, video_info:videoInfo, video_url:urlsplit[0], params:params});

            self.$videoLayer = $(videoLayer).get(0);
            $(self.$videoLayer).find(".close-video").on('click', function(e){
                e.preventDefault();
                self._removeVideoLayer(e);
            });

            var caption = self.$el.find('article.cap-section');
            if(caption.length) $(self.$videoLayer).find('.modal-video-asset').append(caption.clone().show());

            if(isModal){ 
                $('body').addClass('modal-open').append(self.$videoLayer);
                var ignoreOverflow = $('body').hasClass('ignore-overflow-hidden');
                if(!ignoreOverflow){
                    $('html, body').css({
                        overflow:"hidden"
                    });
                }
                setTimeout(function(){
                    if(videoType == 'youtube') {
                        $(self.$videoLayer).find('iframe').focus();
                    } else {
                        $(self.$videoLayer).find('video').focus();
                    }
                }, 300);
            }else{
                self.$el.append(self.$videoLayer);
            };

            var baseVideos = self.$el.find("div.video-asset");
            if(baseVideos.length > 1) {
                self.$baseVideo = $(baseVideos[0]).detach();
                self.baseIsModal = isModal;
            }

            /*
            // play
            $(document).on('click', '#'+videoId+' .video-controller .btn-video', function(e){                
                var $video = $('#'+videoId).find('video');
                if($video[0]) {
                    $video[0].play();
                }
            });

            // pause 
            $(document).on('click', '#'+videoId+' .video-controller .btn-pause', function(e){                
                var $video = $('#'+videoId).find('video');
                if($video[0]) {
                    $video[0].pause();
                }
            });
            */

        },

        _removeVideoLayer: function(e){
            var self = this;

            if(self.$baseVideo) {
                if(self.baseIsModal) $('body').addClass('modal-open').append(self.$baseVideo);
                else self.$el.append(self.$baseVideo);
                self.$baseVideo = null;
            }

            var videoLayer = $(e.currentTarget).parent('div');
            $(e.currentTarget).off('click');
            videoLayer.remove();
            //$(self.$videoLayer).find(".close-video").off('click');
            //$(self.$videoLayer).remove();
            self.$videoLayer = null;

            $('body').removeClass('modal-open');

            var ignoreOverflow = $('body').hasClass('ignore-overflow-hidden');
            if(!ignoreOverflow){
                $('html, body').css({
                    overflow:"visible"
                });
            }

            var closeType = self.$el.data('boxCloseType');
            var elType = self.$el.attr('data-type');
            if(elType && closeType && elType == closeType) {
                self.$el.focus();
            } else if(closeType) {
                var t = self.$el.find('[data-type="' + closeType +'"]:eq(0)');
                if(t.length > 0) {
                    t.focus();
                }
            }
        },

        close: function(){
            var self = this;
            self._removeVideoLayer();
        }
    });

    return YoutubeBox;
});
/*!
 * @module vcui.ui.TextControl
 * @license MIT License
 * @description 문자수 카운팅 텍스트컨트롤
 * @copyright VinylC UID Group
 */

 vcui.define('ui/textControl', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var detect = core.detect,
        numUtil = core.number,
        byteLength = core.string.byteLength,
        charsByByte = core.string.indexByByte;

    /**
     * 입력제한 기능을 담당하는 클래스
     * @class
     * @name vcui.ui.TextCounter
     * @extends vcui.ui.View
     * @example
     * new TextCounter( $('input.d_textcounter'), {});
     * // 혹은 jquery 플러그인 방식으로도 호출 가능
     * $('input.d_textcounter').textCounter({});
     */
    var TextCounter = core.ui('TextCounter', /** @lends vcui.ui.TextCounter# */{
        bindjQuery: 'textcounter',
        $statics: {
            ON_TEXTCOUNT_CHANGE: 'textcounter:change' // 글자수가 변경되었을 때 발생
        },
        defaults: {
            countType: 'char',
            limit: 100 // 최대 글자 수(charType)
        },

        /**
         * 생성자
         * @param {string|element|jquery} el 해당 엘리먼트(노드, id, jQuery 어떤 형식이든 상관없다)
         * @param {object} options 옵션값
         */
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self.currentLength = 0;
            self.placeholder = self.$el.attr('placeholder');

            if (detect.isGecko) {
                self._forceKeyup();
            }

            self.on('keydown keyup cut paste blur', function (e) {
                var isOver = self._checkLimit();
                if (e.type === 'keyup' || e.type === 'paste') {
                    if (isOver) {
                        alert('입력하신 글자 수가 초과되었습니다.');
                        this.focus();
                    }
                }
                self.trigger(TextCounter.ON_TEXTCOUNT_CHANGE, { textLength: self.currentLength });
            });
            self._checkLimit();
            self.trigger(TextControl.ON_TEXTCOUNT_CHANGE, { textLength: self.currentLength });
        },

        /**
         * str의 길이 계산(options.countType이 char일 땐, 글자수, byte일땐 바이트수로 계산)
         */
        textLength: function textLength(str) {
            var self = this;

            if (self.options.countType === 'byte') {
                return byteLength(str);
            }
            return (str || '').length;
        },

        /**
         */
        _checkLimit: function _checkLimit() {
            var self = this,
                o = self.options,
                isOver = false;

            self.currentLength = self.textLength(self.$el.val());
            if (self.currentLength > o.limit) {
                self._truncateValue();
                isOver = true;
            }
            return isOver;
        },

        /**
         * 텍스트박스의 문자열이 제한길이를 초과했을 경우, 자르는 역할을 담당
         * @private
         */
        _truncateValue: function _truncateValue() {
            var self = this,
                $el = self.$el,
                value = $el.trimVal(),
                limit = self.options.limit,
                countingByte = self.options.countType === 'byte',
                chars = 0;

            if (limit === 0) {
                $el[0].value = self.placeholder;
                self.currentLength = limit;
            } else if (limit < self.currentLength) {
                chars = countingByte ? charsByByte(value, limit) : limit;
                $el[0].blur();
                $el[0].value = value.substring(0, chars);
                $el[0].focus();
                self.currentLength = countingByte ? byteLength($el[0].value) : limit;
            }
        },

        /**
         * 파이어폭스에서 한글을 입력할 경우, keyup이벤트가 발생하지 않는 버그가 있어서,
         * timeout를 이용하여 value값이 변경됐을 때 강제로 keyup를 이벤트 날려주는 로직을 설정하는 함수
         * @private
         */
        _forceKeyup: function _forceKeyup() {
            // 파이어폭스에서 한글을 입력할 때 keyup이벤트가 발생하지 않는 버그가 있어서 
            // 타이머로 value값이 변경된걸 체크해서 강제로 keyup 이벤트를 발생시켜 주어야 한다.
            var self = this,
                $el = self.$el,
                el = $el[0],
                prevValue,
                win = window,
                doc = document,


            // keyup 이벤트 발생함수: 크로스브라우징 처리
            fireEvent = function () {
                if (doc.createEvent) {
                    // anti ie
                    return function () {
                        var e;
                        if (win.KeyEvent) {
                            e = doc.createEvent('KeyEvents');
                            e.initKeyEvent('keyup', true, true, win, false, false, false, false, 65, 0);
                        } else {
                            e = doc.createEvent('UIEvents');
                            e.initUIEvent('keyup', true, true, win, 1);
                            e.keyCode = 65;
                        }
                        el.dispatchEvent(e);
                    };
                } else {
                    // ie: :(
                    return function () {
                        var e = doc.createEventObject();
                        e.keyCode = 65;
                        el.fireEvent('onkeyup', e);
                    };
                }
            }();

            self.timer = null;

            self.on('focus', function () {
                if (self.timer) {
                    return;
                }
                self.timer = setInterval(function () {
                    if (prevValue !== el.value) {
                        prevValue = el.value;
                        fireEvent();
                    }
                }, 60);
            }).on('blur', function () {
                if (self.timer) {
                    clearInterval(self.timer);
                    self.timer = null;
                }
            });
        },

        /**
         * 파괴자 : 자동으로 호출되지 않으므로, 필요할 땐 직접 호출해주어야 한다.
         */
        destroy: function destroy() {
            var self = this;

            self.timer && clearInterval(self.timer);
            self.supr();
        }
    });

    /**
     * textarea, input에서 글자수 체크 및 자동리사이징 처리를 담당하는 클래스
     * @class
     * @name vcui.ui.TextControl
     * @extends vcui.ui.View
     * @example
     * new ui.TextControl( $('textarea'), {checkcount: true});
     * // or
     * $('textarea').textControl({checkcount: true});
     */
    var TextControl = core.ui('TextControl', TextCounter, /** @lends vcui.ui.TextControl# */{
        $statics: {
            ON_INIT: 'init',
            ON_CHANGE: 'textcontrol:change'
        },
        bindjQuery: 'textcontrol',
        defaults: {
            limit: 100,
            checkCount: true,
            countTarget: '',
            countText: '<em>{{len}}</em> / {{limit}}자',

            autoResize: false,
            allowPaste: true
        },
        /**
         * 생성자
         * @param {string|element|jquery} el 해당 엘리먼트(노드, id, jQuery 어떤 형식이든 상관없다)
         * @param {object} options 옵션값
         */
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self._initTextControl();
            self.trigger(TextControl.ON_INIT);
        },

        /**
         * 초기화 작업
         * @private
         */
        _initTextControl: function _initTextControl() {
            var self = this,
                o = self.options;

            // 붙여넣기
            if(o != undefined){
                if (!o.allowPaste) {
                    self.on('paste', function (e) {
                        e.preventDefault();
                        alert("죄송합니다. \n도배글 등을 방지하기 위해 붙여넣기를 하실 수 없습니다.");
                    });
                }
    
                // 자동 리사이징
                if (self.$el.is('textarea') && o.autoResize) {
                    self._autoResize();
                }
    
                // 입력글자 수 체크
                if (o.checkCount) {
                    // subviews에다 설정하면 release가 호출될 때, subviews에 들어있는 컨트롤들의 release도 알아서 호출해준다.
                    self.on('textcounter:change', function () {
                        var $countTarget = $(self.options.countTarget),
                            strUtil = core.string,
                            showCount = function showCount(len, limit) {
                            $countTarget.html(strUtil.format(self.options.countText, {
                                len: numUtil.addComma(len) || 0,
                                limit: numUtil.addComma(limit) || 0
                            }));
                        };
    
                        showCount(self.currentLength, o.limit);
                        return function (e, data) {
                            if (self.$el.val() === self.$el.attr('placeholder')) {
                                return;
                            }
                            showCount(data.textLength, o.limit);
                        };
                    }());
                }
            }
        },

        /**
         * 텍스트박스의 리사이징을 위한 이벤트 바인딩
         * @private
         */
        _autoResize: function _autoResize() {
            var self = this,
                isOldIE = detect.isOldIE,
                $clone,
                oriHeight,
                offset = 0;

            self.$el.css({ overflow: 'hidden', resize: 'none' /*, height: 'auto'*/ });

            $clone = isOldIE ? self.$el.clone().removeAttr('name').removeAttr('id').addClass('d-tmp-textarea').val('').appendTo(self.$el.parent()) : self.$el;
            oriHeight = $clone.height();
            $clone[0].scrollHeight; // for ie6 ~ 8

            if ($clone[0].scrollHeight !== oriHeight) {
                offset = $clone.innerHeight() - oriHeight;
            }
            isOldIE && $clone.hide();

            self.on('keyup change input paste focusin focusout', function () {
                this._layout(this, this.$el, $clone, oriHeight, offset);
            }.bind(self));
            self._layout(self, self.$el, $clone, oriHeight, offset);
        },

        /**
         * 텍스트박스의 scrollHeight에 따라 height를 늘려주는 역할을 담당
         * @private
         */
        _layout: function _layout(self, $el, $clone, initialHeight, offset) {
            var self = this,
                current = $el.val(),
                prev = self.prevVal,
                isOldIE = detect.isOldIE,
                scrollHeight,
                height;

            if (current === prev) {
                return;
            }
            self.prevVal = current;

            $clone.css('height', '');
            isOldIE && $clone.val(current).show()[0].scrollHeight; // for IE6-8
            scrollHeight = $clone[0].scrollHeight;
            height = scrollHeight - offset;
            isOldIE && $clone.hide();

            $el.height(height = Math.max(height, initialHeight));
            self.triggerHandler(TextControl.ON_CHANGE, [height]);
        },

        /**
         * 파괴자 : 자동으로 호출되지 않으므로, 직접 호출해주어야 한다.
         */
        destroy: function destroy() {
            var self = this;

            self.supr();
        }
    });

    // TextControl.prototype.defaults.countText = '{{len}} / {{limit}}byte';

    return TextControl;
});
vcui.define('ui/fileInput', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var selectFiles = [],
        totalSize = 0;

    var message = {
        length: '첨부 파일은 최대 3개까지 가능합니다.',
        name: '파일 명에 특수기호(? ! , . & ^ ~ )를 제거해 주시기 바랍니다.',
        format: 'jpg, jpeg, png, gif 파일만 첨부 가능합니다.',
        size: '첨부파일 전체 용량은 10MB 이내로 등록 가능합니다'
    }

    var FileInput = core.ui('FileInput', {
        bindjQuery: 'fileinput',
        defaults: {
            regex: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,
            format: 'jpg|jpeg|png|gif',
            totalSize: '10000000',
            maxLength: 3,
            templateFileListItem : '<li><span class="file-name">{{name}}</span><button type="button" class="btn-del"><span class="blind">삭제</span></button></li>',
            templateAlert: '<article id="fileAlert" class="lay-wrap"><section class="lay-conts"><h6>{{message}}</h6></section><div class="btn-wrap laypop"><button type="button" class="btn pink ui_modal_close"><span>확인</span></button></div></article>'
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            };

            selectFiles = [];
            self.$el.closest(".file-box").find(".file-lists").empty();
            self._bindEvents();
        },
        getSelectFiles: function getSelectFiles() {
            return selectFiles;
        },
        _checkFileLength: function _checkFileLength() {
            return selectFiles.length < this.options.maxLength;
        },
        _checkFileName: function _checkFileName(file) {
            var name = file.name.split('.').slice(0,-1).join('.') || file.name + '';
            return !this.options.regex.test(name);
        },
        _checkFileSize: function _checkFileSize(file) {
            return totalSize + file.size <= this.options.totalSize
        },
        _checkFileFormat: function _checkFileFormat(file) {
            var optArr = this.options.format.split('|'),
                formatArr = file.name.split('.'),
                format = formatArr[formatArr.length - 1].toLowerCase();
            
            if (!vcui.array.has(optArr, format)) {
                return false;
            }

            return true; 
        },
        _checkFile: function _checkFile(file) {
            var self = this,
                success = true,
                msgType;

            if (!self._checkFileLength()) {
                success = false;
                msgType = 'length';
            } else if (!self._checkFileSize(file)) {
                success = false;
                msgType = 'size';
            } else if (!self._checkFileFormat(file)) {
                success = false;
                msgType = 'format';
            } else if (!self._checkFileName(file)) {
                success = false;
                msgType = 'name';
            }

            return {
                success: success,
                message: msgType
            };
        },
        _callAlert: function _callError(msg) {
            var self = this,
                tmpl;

            tmpl = vcui.template(self.options.templateAlert, {
                message: message[msg]
            });

            $('body').append(tmpl);
            $('#fileAlert').vcModal({
                removeOnClose: true
            });
        },
        _bindEvents: function _bindEvents() {
            var self = this;

            self.$el.on("change",function(e) {
                if(e.currentTarget.files.length > 0) {
                    var file = e.currentTarget.files[0],
                        result = self._checkFile(file); 

                    if (result.success) {
                        $(this).closest(".file-box").find(".file-lists").append(core.template(self.options.templateFileListItem, file));
                        
                        totalSize += file.size;
                        selectFiles.push(file);
                        
                        $(this).closest(".file-box").find(".file-lists li:nth-child(" + selectFiles.length +") .btn-del").on("click",function(e) {
                            var index = $(this).closest(".file-lists").find('.btn-del').index($(this));
                            selectFiles.splice(index,1);
                            $(this).closest(".file-lists").find("li:nth-child(" + (index+1) +")").remove();
                        });
                    } else {
                        self._callAlert(result.message);
                    }

                    $(this).val("");
                }
            })
        },
    });

    return FileInput;
});

/*!
 * @module vcui.ui.RadioShowHide
 * @license MIT License
 * @description VR 컴포넌트
 * @copyright VinylC UID Group
 * 
 * 
 */
vcui.define('ui/radioShowHide', ['jquery', 'vcui'], function ($, core) {
    "use strict";
   
    /**
     * @class
     * @description .
     * @name vcui.ui.RadioShowHide
     * @extends vcui.ui.View
     */

    var RadioShowHide = core.ui('RadioShowHide', /** @lends vcui.ui.ElShowHide# */{
        bindjQuery: 'radioShowHide',
        defaults: {
        },
        selectors: {
            radios:'[data-visible-target][type=radio]'
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self._build();
            self._bindEvent();
        },

        _build: function _build() {
            var self = this;
            var opts = self.options;
            var radioName = self.$radios[0].name;
            self.$target = self.$radios.filter('input[name='+ radioName +']');
            self.change();          
        },

        _bindEvent: function _bindEvent() {

            var self = this;

            self.$target.on('change', function(e){
                self.change();
            });

        },


        change: function change() {

            var self = this;
            var showTarget = [];

            self.$target.each(function(){
                    
                var targetStr = $(this).attr('data-visible-target');
                var arr = targetStr? targetStr.split(','):[];
                var isChecked = this.checked;

                core.each(arr, function(value){
                    if(isChecked){
                        showTarget.push(core.string.trim(value));
                        // $(core.string.trim(value)).show();
                    }else{
                        $(core.string.trim(value)).hide();
                    }
                });		
            });

            core.each(showTarget, function(value) {
                $(value).show();
            });
        }

    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return RadioShowHide;
});
vcui.define('ui/inputClearButton', ['jquery', 'vcui'], function ($, core) {
    "use strict";
    var InputClearButton = core.ui('InputClearButton', {
        bindjQuery: 'inputClearButton',
        defaults: {
            alway: false
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            var query = self.$el.attr("data-clear-button");
            var target = self.$el.next().find(query).first();
            if(target.length < 1) {
                target = self.$el.parent().find(query).first();
                if(target.length < 1) {
                    target = self.$el.parent().parent().find(query).first();
                }
            }
            self.$clearButton = target;

            self._bindEvents();

            self._update();
        },

        changeVal: function changeVal(v) {
            var self = this;
            self.$el.val(v).trigger("input");
        },

        _update: function update() {
            var self = this;
            if(self.options.alway) {
                self.$clearButton.show();
                self.$el.parent().addClass('clear');
            } else {
                var value = self.$el.val();
                if(value && value.length > 0) {
                    self.$clearButton.show();
                    self.$el.parent().addClass('clear');
                } else {
                    if(!self.options.alway) {
                        self.$clearButton.hide();
                        self.$el.parent().removeClass('clear');
                    }
                }
            }

        },

        _bindEvents: function _bindEvents() {
            var self = this;

            self.$el.on('update',function(e) {
                self._update();
            });

            self.$el.on('input focus',function(e) {
                self._update();
            });

            self.$clearButton.on('click', function() {
                self.$el.val('').focus();
                self.$el.trigger('input');
                self.$el.trigger('change');
                if(!self.options.alway) {
                    $(this).hide();
                }
            });
        },
    });

    return InputClearButton;
});
/*!
 * @module vcui.ui.starRating
 * @license MIT License
 * @description VR 컴포넌트
 * @copyright VinylC UID Group
 * 
 * 
 */
vcui.define('ui/starRating', ['jquery', 'vcui'], function ($, core) {
    "use strict";
   
    /**
     * @class
     * @description .
     * @name vcui.ui.starRating
     * @extends vcui.ui.View
     */

    var StarRating = core.ui('starRating', /** @lends vcui.ui.ElShowHide# */{
        bindjQuery: 'starRating',
        defaults: {
            activeClass: 'on',
            wrapperClass: 'ui-rating-wrap',
            title: '선택',
            label: false
        },
        templates: {
            label: '<span class="ui-select-label"><em class="score">{{score}}</em>/5점</span>',
            option: '<a href="#" data-value="{{value}}" data-text="{{text}}" title="{{title}}">{{text}}</a>'
        },
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self.display = self.$el.css('display') !== 'none';
            self.$el.hide();

            self._creat();
            self._bindEvent();
        },
        _creat: function _creat() {
            var self = this,
                wrapperClass = self.options.wrapperClass;

            self.attrTitle = self.$el.attr('title') || self.options.title;
            self.$ratingBox = $('<div class="' + wrapperClass + '"></div>');

            self.$ratingBox.insertAfter(self.$el);

            self._creatOption();
            self._creatLabel();
            self._update();
        },
        _creatOption: function _creatOption() {
            var self = this,
                html = '';

            core.each(core.toArray(self.el.options), function(item, i) {
                if (item.value) {
                    html += self.tmpl('option', {
                        value: item.value,
                        text: item.innerText,
                        title: self.attrTitle
                    });
                } else {
                    self.$ratingBox.data({
                        'defaultValue': item.value,
                        'defaultText': item.innerText
                    });
                }
            });

            self.$ratingBox.html(html);
        },
        _creatLabel: function _creatLabel() {
            var self = this;
            var opts = self.options;

            if (!opts.label) return;
 
            self.$label = $(self.tmpl('label', {
                score: self.el.value
            }));
            self.$ratingBox.append(self.$label);
        },
        _bindEvent: function _bindEvent() {
            var self = this;

            self.$ratingBox.on('click', 'a', function(e) {
                e.preventDefault();

                self.selectedIndex($(this).index() + 1);
                self.triggerHandler('starRatingChange', {
                    value: self.el.value,
                    index: self.el.selectedIndex
                });
            });
        },
        _update: function _update() {
            var self = this;
            var opts = self.options,
                index = self.el.selectedIndex;

            self.$ratingBox.find('a span.blind').remove();
            self.$ratingBox.find('a').removeClass('on');
            
            if (opts.label) {
                self.$label.find('.score').html(self.el.value); 
            }

            if (index > 0) {
                self.$ratingBox.find('a').eq(index - 1).append('<span class="blind">선택됨</span>')
                self.$ratingBox.find('a').slice(0, index).addClass('on');
            }
        },
        selectedIndex: function update(index) {
            var self = this;

            if (arguments.length === 0) {
                return self.el.selectedIndex;
            } else {
                if (self.el.options.length - 1 >= index) {
                    self.el.selectedIndex = index;
                    self.$el.trigger('change');
                    self._update();
                }
            }
        },
        value: function value(value) {
            var self = this;

            if (arguments.length === 0) {
                return self.el.value;
            } else {
                core.each(core.toArray(self.el.options), function(item, i) {
                    if (item.value == value) {
                        self.selectedIndex(i);
                        return false;
                    } 
                });
            }
        }
    });

    return StarRating;
});
vcui.define('ui/tooltipTarget', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var TooltipTarget = core.ui('TooltipTarget', /** @lends vcui.ui.TooltipTarget# */{
        //$singleton: true,
        bindjQuery: 'tooltipTarget',
        defaults: {
            interval: 200,
            tooltip: '.tooltip-box',
            type : 'click', //click, over
            layerOutClose : true, // 툴팁 바깥을 터치할 경우 닫기를 원함 (type over시 무시)
            closeButtonClass : 'btn-close',
            offsetParentClass : 'tooltip-wrap',
            fixed : null
        },

        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self._setting();
            self._bindEvents();
        },

        changeType: function changeType(tooltipType) {
            var self = this;

            if(self.options.tooltip != tooltipType) {
                var eventEnter = self.options.type=='over'? 'mouseenter mouseleave focusin focusout click' : 'click';
                self.options.type = tooltipType;
                self.off(tooltipType,self.options.type,eventEnter);
                self.$tooltip.off('click','> .'+self.options.closeButtonClass);

                self._bindEvents();
            }
        },

        _setting: function() {
            var self = this;
            self.$tooltip = self.$el.siblings(self.options.tooltip);
            self.tooltipStyle = self.$tooltip.attr('style');
            var fixed = self.$el.attr('data-fixed');
            if(fixed) {
                self.options.fixed = fixed;
            }
        },

        _bindEvents: function() {
            var self = this;
            var eventEnter = self.options.type=='over'? 'mouseenter mouseleave focusin focusout click' : 'click';
            self.on(eventEnter, function (e) {
                switch (e.type) {
                    case 'mouseenter':
                    case 'focusin':
                    case 'click':
                        e.preventDefault();
                        self._open(true);
                        break;
                    case 'mouseleave':
                    case 'focusout':
                        e.preventDefault();
                        self._close();
                        break;
                }
            });

            if(self.options.type=='over'){
                self.on('mousedown', function () {
                    self._close();
                });
            }            

            self.$tooltip.on('click','> .'+self.options.closeButtonClass, function () {
                self._close();
            });

            $(window).on('resizeend', function(){
                self._positionCheck();
            });
        },

        _positionCheck: function() {
            var self = this;
            var isParentIsTooltipWarap = self.$tooltip.offsetParent().hasClass(self.options.offsetParentClass);

            var fixedClass = self.options.fixed;
            if(fixedClass) {
                if (isParentIsTooltipWarap) {
                    if(!self.$tooltip.hasClass(fixedClass)) {
                        self.$tooltip.addClass(self.options.fixed);
                    }
                } else {
                    if(self.$tooltip.hasClass(fixedClass)) {
                        self.$tooltip.removeClass(self.options.fixed);
                    }
                }
                return;    
            }

            if(self.isShow) {
                self._resetStyle();
                var windowWidth = $(window).width();
                var offset = self.$tooltip.offset();
                if (isParentIsTooltipWarap) {
                    var width = self.$tooltip.outerWidth(true);
                    if((offset.left + width) > windowWidth) {
                        offset.left = windowWidth - width;
                        offset.left = offset.left > 0 ? offset.left : 0;
                    }
                    self.$tooltip.offset(offset);
                }
                /*
                세로 위치 조정은 아직 필요없을듯 하다 (미완성)
                var documentHeight = $(document).height();
                var height = self.$tooltip.outerHeight(true);
                if((offset.top + height) > documentHeight) {
                    offset.top = documentHeight - height;
                    offset.height = offset.height > 0 ? offset.height : 0;
                }
                */
            }
        },

        _resetStyle: function() {
            var self = this;
            if(self.tooltipStyle) {
                self.$tooltip.attr('style',self.tooltipStyle);
            } else {
                self.$tooltip.removeAttr("style");
                //self.$tooltip.attr('style','');
            }
        },

        _open: function(effect) {
            var self = this;
            if(!self.options.tooltip) return;

            self.showTimer = setTimeout(function () {
                self.$el.parent("." + self.options.offsetParentClass).addClass('active');

                self.$tooltip.attr('aria-hidden', 'false');
                self.isShow = true;
                self._positionCheck();

                if (effect) {
                    self.$tooltip.fadeIn('fast', function(){
                        self.$tooltip.attr('tabindex', -1).focus();
                        self.$tooltip.removeAttr('tabindex');
                    });
                } else {
                    self.$tooltip.show();
                    self.$tooltip.attr('tabindex', -1).focus();
                    self.$tooltip.removeAttr('tabindex');
                }
                
                /*
                self.$tooltip.attr('aria-hidden', 'false');
                self.isShow = true;
                self._positionCheck();
                */
                self.setOuterTouchEvent(true);
            }, self.options.interval);
        },

        _close: function(effect) {
            var self = this;
            clearTimeout(self.showTimer);
            clearTimeout(self.hideTimer);
            self.hideTimer = self.showTimer = null;

            if (!self.isShow) {
                return;
            }
            self.isShow = false;

            var $parent = self.$el.parent("." + self.options.offsetParentClass);
            if (effect) {
                self.$tooltip.fadeOut('fast', function(){
                    $parent.attr('tabindex', -1).focus();
                    $parent.removeAttr('tabindex');
                });
            } else {
                self.$tooltip.hide();
                $parent.attr('tabindex', -1).focus();
                $parent.removeAttr('tabindex');
            }
            self.$tooltip.attr('aria-hidden', 'true');
            $parent.removeClass('active');
            self.setOuterTouchEvent(false);
        },

        setOuterTouchEvent: function(enable) {
            var self = this;
            if(enable) {
                if(self.options.layerOutClose) {
                    $(document).off('.tooltipTarget').on('click.tooltipTarget',function(e){
                        if(self.isShow) {
                            var $this = $(e.target);
                            if($this.hasClass('tooltip-box') || $(this).parents('tooltip-box').length > 0) {
                                //툴팁내부
                            } else {
                                //툴팁외부
                                self._close();
                            }
                        }
                    });
                }
            } else {
                $(document).off('.tooltipTarget');
            }
        },
    });

    return TooltipTarget;
});
/*!
 * @module vcui.ui.Sticky
 * @license MIT License
 * @description Sticky 컴포넌트
 * @copyright VinylC UID Group
 * 
 */
vcui.define('ui/sticky', ['jquery', 'vcui', 'libs/jquery.transit.min'], function ($, core) {
    "use strict";
    var $win = $(window);

    var Sticky = core.ui('Sticky', {/**@lends vcui.ui.Sticky# */
        bindjQuery: 'sticky',
        defaults: {
            wrap: true,
            wrapWith: '<div>',
            firstMarginTop : 0,
            marginTop: 0,
            marginBottom: 0,
            stickyFor: 0,
            stickyClass: 'fixed',
            stickyContainer: 'body',
            usedAnchor: false,
            isHidden: false,
            actClass: "active",
            anchorClass: "a",
            isContainerAbled: true
        },
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }
            
            self.isFirstRender = false;

            self.$container = self.$el.closest(self.options.stickyContainer);

            self.$anchor = self.$el.find(self.options.anchorClass);
            
            self.scrollCourse = "down";
            self.prevScrollTop = $win.scrollTop();
            // core.util.loadImages(self.$container.find('img[data-src]')).done(function(){
            //     self.update();
            //     self._bindEvents();
            //     console.log('loadImages complete');
            // });           
            self.update();
            self._bindEvents();

            self.docHeight = $(document).outerHeight(true);

            if(self.options.usedAnchor){
                var idx = self.$anchor.parent('.on').index();
                if(idx>0) self.scollToIndex(idx, 0);
            }
        },


        _bindEvents: function _bindEvents() {
            var self = this;
            var idx;

            if(self.options.usedAnchor){
                self.$el.on('click.sticky', self.options.anchorClass, function(e){
                    e.preventDefault();
                    var idx = vcui.array.indexOf(self.anchorArr, $(this).attr('href'));                
                    self.scollToIndex(idx, 300);
                });
            }
            $win.on('scroll.sticky resize.sticky load.sticky', function(e) {
                self.scrollTop = $win.scrollTop();

                var docheight = $(document).outerHeight(true);
                if(self.docHeight != docheight){
                    //console.log("### update ###");
                    self.update();
                    self.docHeight = $(document).outerHeight(true);
                }

                if(self.options.usedAnchor){
                    idx = self._getSelectIdx(self.scrollTop);
                    if(idx != self.selectedIndex){
                        self.selectedIndex = idx;
                        self._activeBtn(self.selectedIndex);
                    }
                }

                self.stickyRect = self._getRectangle(self.$el);
                self.containerRect = self._getContainerRectangle();

                if(e.type == "scroll"){
                    var dist = self.scrollTop - self.prevScrollTop;
                    if(dist < 0){
                        self.scrollCourse = "down";
                    } else{
                        self.scrollCourse =  "up";
                    }
                    self.prevScrollTop = self.scrollTop;
                }

                switch (e.type) {
                    case 'resize':
                        self.vpHeight = $win.height();
                        self.vpWidth = $win.width();
                        self._handleResize(e);
                        break;
                    default:
                        if (self.active) {
                            self._setPosition();
                        }
                }
            });

            $win.trigger('resize');
        },

        _activeBtn : function _activeBtn(idx){
            var self = this;            
            var $target = self.$anchor.parent();
            if(idx<0) {
                $target.removeClass(self.options.actClass);
            }else{
                $target.eq(idx).addClass(self.options.actClass).siblings().removeClass(self.options.actClass);
            }            

            self.$el.trigger("changeanchor", {selectIdx:idx})
        },


        update : function update(){
            var self = this;
            var opt = self.options;

            self.active = false;

            self.$anchor = self.$el.find(self.options.anchorClass);
            
            self.stickyRect = self._getRectangle(self.$el);
            self.containerRect = self._getContainerRectangle();
            self.marginTop = opt.marginTop;
            self.marginBottom = opt.marginBottom;
            self.firstMarginTop = opt.firstMarginTop;

            if(self.options.usedAnchor){
                self.anchorArr = [];
                self.$anchor.each(function(index, item){
                    self.anchorArr.push($(item).attr('href'));
                });
            }

            if(!self.isFirstRender && opt.wrap){
                self.isFirstRender = true;
                self.wrapper = self.$el.wrap(opt.wrapWith).parent().css({ 
                    height: self.$el.outerHeight(true)
                });
            }

            if (self.stickyRect.bottom < self.containerRect.bottom && opt.stickyFor < self.vpWidth && !self.active) {
                self.active = true;
            }
            self._calcPos();
            self._setPosition();
        },

        _calcPos: function () {
            var self = this;

            self.posArr = [];
            self.stickyRect = self._getRectangle(self.$el);
            self.containerRect = self._getContainerRectangle();
            var lasty = $(document).outerHeight() - $(window).height();
            var $target,top,anchorName;
            
            if(self.options.usedAnchor){
                self.$anchor.each(function(index, item){
    
                    anchorName = $(item).attr('href');
                    try{
                        $target = self.$container.find(anchorName);
        
                        if(index==-1){
                            self.posArr.push(self.containerRect.top - self.marginTop);
                        }else{
                            //2020.10.16 $target이 없을 시...
                            if ($target.length){
                                top = $target.offset().top - (self.stickyRect.height + self.marginTop);
                                
                                if(index == 0) top -= self.firstMarginTop;

                                self.posArr.push(top>lasty? lasty-10 : top);
                                if(index == self.$anchor.length-1){
                                    top = $target.outerHeight() + $target.offset().top;
                                    self.posArr.push(top);
                                }
                            }
                        }   
                    } catch(err){}         
                });
            }
            // console.log(self.posArr);
        },

        _setPosition: function _setPosition() {
            var self = this;
            var opt = self.options;
            var $el = self.$el;
            self._clearCss();

            if (self.vpHeight < self.stickyRect.height || !self.active ) {
                return; 
            }
            if (!self.stickyRect.width) {
                self.stickyRect = self._getRectangle($el);                
            }

            if (self.stickyRect.top === 0 && self.$container[0] === document.body) {                
                $el.css({
                    position: 'fixed',
                    top: self.stickyRect.top,
                    left: self.stickyRect.left,
                    right: 0,
                    //width: $el.width(),
                    'z-index': 90
                });
                
                $el.addClass(opt.stickyClass);

            } else if (self.scrollTop > self.stickyRect.top - self.marginTop) {
                $el.css({
                    position: 'fixed',
                    //width: $el.width(), 
                    left: self.stickyRect.left,
                    right: 0,
                    'z-index': 90
                });

                if (self.scrollTop + self.stickyRect.height + self.marginTop > self.containerRect.bottom - self.marginBottom) {
                    $el.removeClass(opt.stickyClass);
                    $el.css({
                        top: self.containerRect.bottom - (self.scrollTop + self.stickyRect.height + self.marginBottom)
                    });
                } else {
                    $el.addClass(opt.stickyClass);
                    $el.css({
                        top: self.marginTop
                    });
                }
            } else {
                $el.removeClass(opt.stickyClass);
                self._clearCss();
            }

            self.wrapper.height(self.$el.outerHeight(true));

            self.scrollDistance = self.scrollTop - (self.stickyRect.top + self.marginTop);
            
            if(opt.isHidden) self._setStickyMobileStatus();
        },

        _handleResize: function _handleResize(e) {
            var self = this;
            var opt = self.options;

            var outerheight = self.$el.outerHeight(true);
            var wrapheight = self.$el.parent().height();
            if(wrapheight != outerheight) self.$el.parent().height(outerheight);

            self.vpHeight = $win.height();
            self.vpWidth = $win.width();
            self._calcPos();

            if (self.stickyRect.bottom < self.containerRect.bottom && opt.stickyFor < self.vpWidth && !self.active) {
                self.active = true;
            } else if (self.stickyRect.bottom >= self.containerRect.bottom || opt.stickyFor >= self.vpWidth && self.active) {
                self.active = false;
            }
            
            self._setPosition();
        },

        //모바일에서 스크롤방향에 따라 
        _setStickyMobileStatus: function(){
            if(vcui.detect.isMobileDevice){
                var self = this;
                
                var mode = self.$el.data("mode");
                if(self.$el.hasClass(self.options.stickyClass)){                    
                    if(mode != self.scrollCourse){ 
                        if(self.scrollCourse == "down"){
                            self.$el.stop().transition({y:0}, 450, "easeOutCubic");                            
                        } else{
                            if(self.scrollDistance < self.$el.outerHeight(true)){
                                return
                            }
                            self.$el.stop().transition({y:-self.$el.outerHeight(true)}, 350, "easeOutCubic");
                        }
                        self.$el.data('mode', self.scrollCourse);
                    }
                } else{
                    if (mode != 'none'){
                        self.$el.data('mode', 'none');
                        self.$el.stop().transition({y:0}, 450, "easeOutCubic");
                    }
                }
            }
        },

        _clearCss: function _clearCss() {
            var self = this;
            self.$el.css({
                position: '',
                width: '',
                top: '',
                left: '',
                right: '',
                'z-index': ''
            });
        },

        _getRectangle: function _getRectangle($el) {
            var self = this;
            self._clearCss();
            var top = $el.offset().top;        
            var left = $el.offset().left;
            var width = $el.outerWidth();            
            var height = $el.outerHeight();
            return { top: top, bottom: top + height , left: left, right: left + width, width: width, height: height };
        },

        _getContainerRectangle: function(){
            var self = this;

            if(self.options.isContainerAbled){
                return self._getRectangle(self.$container);
            } else{
                var leng = self.$anchor.length;
                var firstAnchorName = self.$anchor[0].attr('href');
                var lastAnchorName = self.$anchor[leng-1].attr('href');
                var firstarget = self.$container.find(firstAnchorName);
                var lastarget = self.$container.find(lastAnchorName);

                var top = firstarget.offset().top;
                var left = firstarget.offset().left;
                var width = firstarget.outerWidth();
                var height = lastarget.offset().top + lastconty.outerHeight() - top;
                return{
                    top: top,
                    bottom: top + height,
                    left: left,
                    right: left + width,
                    height: height
                }
            }
        },

        _getSelectIdx:function _getSelectIdx(y){
            var self = this;
            var idx = -1, lastconty, anchorname;
            var leng = self.posArr.length; 
            for(var i=0; i<leng-1; i++){
                if(self.posArr[i] <= y && self.posArr[i+1] > y){
                    idx = i;
                    break;
                }
            }

            return idx;
        },

        setMarginTop : function setMarginTop(top){
            var self = this;
            self.marginTop = top;
            self._setPosition();
        },

        setMarginBottom : function setMarginBottom(bottom){
            var self = this;
            self.marginBottom = bottom;
            self._setPosition();
        },

        scollToIndex : function scollToIndex(idx, speed){
            var self = this;
            var y = self.posArr[idx]+1;
            if(speed){
                $('html, body').stop().animate({scrollTop:y}, speed);
            }else{ 
                setTimeout(function(){   
                    $('html, body').stop().scrollTop(y);
                }, 100);
            }
        },
        reposition: function reposition(){
            this._calcPos();
            this._setPosition();
        },
        destroy: function destroy() {
            var self = this;

            self._clearCss();
            self.$anchor.removeClass(self.options.actClass);
            self.$el.removeClass(self.options.stickyClass);
            self.$el.off('click.sticky')
            $win.off('scroll.sticky resize.sticky load.sticky');

            if (self.options.wrap) {
                self.$el.unwrap();
            }
            
            this.supr();
        }
    });

    return Sticky;
});
/*!
 * @module vcui.ui.Formatter
 * @license MIT License
 * @description 형식이 있는 인풋 컴포넌트
 * @copyright VinylC UID Group
 *
 * Benchmark
 * github: https://github.com/firstopinion/formatter.js
 * License: The MIT License (MIT) Copyright (c) 2013 First Opinion
 */
vcui.define('ui/formatter', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    // {{9999}}-{{9999}}-{{9999}}
    // comma
    // tel
    // mobile
    // email

    var utils = {
        numRegex: /[^0-9]/g,
        engRegex: /[^a-zA-Z\s]/g,
        alphaRegex: /[^a-zA-Z]/g,
        alnumRegex: /[^a-zA-Z0-9]/g,
        engnumRegex: /[^a-zA-Z0-9\s]/g,
        korengRegex: /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z\s]/g,

        isPressedMetaKey: function isPressedMetaKey(e) {
            return e.ctrlKey || e.shiftKey || e.altKey;
        },
        numKey: function numKey(e) {
            var kc = e.keyCode;
            return e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105;
        },
        engKey: function engKey(e) {
            var kc = e.keyCode;
            return kc >= 65 && kc <= 90 || kc >= 97 && kc <= 122 || kc === 32; // 32: space bar
        },
        alphaKey: function alphaKey(e) {
            var kc = e.keyCode;
            return kc >= 65 && kc <= 90 || kc >= 97 && kc <= 122;
        },
        alnumKey: function alnumKey(e) {
            var kc = e.keyCode;
            return kc >= 65 && kc <= 90 || kc >= 97 && kc <= 122 || kc >= 48 && kc <= 57;
        },
        engnumKey: function engnumKey(e) {
            var kc = e.keyCode;
            return kc >= 65 && kc <= 90 || kc >= 97 && kc <= 122 || kc >= 48 && kc <= 57 || kc === 32; // 32: space bar
        },
        isInvalidKey: function isInvalidKey(e, type, ignoreKeys) {
            return !utils.isPressedMetaKey(e) && !utils[type + 'Key'](e) && !core.array.include(ignoreKeys, e.keyCode);
        },
        cleanChars: function cleanChars(type, el, focusin) {
            var caret = core.dom.getCaretPos(el);
            el.value = el.value.replace(utils[type + 'Regex'], '');
            if (type != 'koreng') {
                if (focusin) {
                    core.dom.setCaretPos(el, Math.min(caret.begin, el.value.length));
                }
            }
        },
        korengKey: function korengKey(e) {
            var kc = e.keyCode;
            return !(kc < 31 || (kc > 33 &&  kc < 65) || (kc > 122 && kc <= 127) || (kc > 90 && kc <= 96) && kc !== 32)
        }
    };

    // placeholder 지원여부
    var supportPlaceholder = 'placeholder' in document.createElement('input');

    var Formatter = core.ui('Formatter', /** @lends axl.ui.Formatter# */{
        $statics: {
            // 허용할 기능키
            byPassKeys: [8, 9, 16, 17, 18, 35, 36, 37, 38, 39, 40, 46, 91, 116],
            // 각 코드에 대한 정규식
            translation: {
                '0': { pattern: /\d/ },
                '9': { pattern: /\d/, optional: true },
                '#': { pattern: /\d/, recursive: true },
                'A': { pattern: /[a-zA-Z0-9]/ },
                'S': { pattern: /[a-zA-Z]/ }
            },
            // 마스킹 타입
            masks: {
                // 현금
                comma: { format: '000,000,000,000,000,000,000,000,000', reverse: true },
                // 전화번호
                tel: {
                    format: function format(val, e, field, options) {
                        return val.replace(/\D/g, '').length < 8 ? '000-0000' : '0000-0000';
                    }
                },
                // 핸드폰 번호
                mobile: {
                    format: function format(val, e, field, options) {
                        return val.replace(/\D/g, '').length < 8 ? '000-0000' : '0000-0000';
                    }
                },
                // 숫자
                num: { format: '0000000000000000000' },
                // 카드
                card: { format: '0000 - 0000 - 0000 - 0000' },
                // 아멕스카드
                amexcard: { format: '0000-000000-00000' },
                // 운전면허번호
                driverno: { format: '00-000000-00' },
                // 사업자번호
                bizno: { format: '000-00-00000' },
                // 법인번호
                corpno: { format: '000000-0000000' },
                // 날짜
                date: { format: '0000.00.00' },
                // 영문
                eng: { format: 'S' },
                // 영수증
                receipt: { format: '00000000-00000000' },
            }
        },
        bindjQuery: 'formatter',
        defaults: {
            format: 'comma', // 기본 포맷
            watch: false, // 수정을 감시할건가
            watchInterval: 300 // 감시 인터벌
        },
        /**
         * 생성자
         * @param el
         * @param options
         * @returns {boolean}
         */
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return false;
            }

            // 자동완성 끜
            self.$el.attr('autocomplete', 'off');
            // 숫자 와 같이 단순한 포맷은 걍 키만 막고 빠져나간다
            if (self._isSimpleFormat() === true) {
                self.clean = function () {
                    return self.$el.val() === self.txtPlaceholder ? '' : self.$el.val();
                };
                return;
            }

            // 이벤트 바인딩
            self._bindEvents();

            self.oldValue = self.$el.val(); // 원래 값
            self.byPassKeys = Formatter.byPassKeys; // alias
            self.translation = core.extend({}, Formatter.translation, self.options.translation); // alias
            self.invalid = [];
            if (!supportPlaceholder) {
                // placeholder를 지원하지 않는 브라우저면 placeholder 문구를 보관하고 있는다.
                self.notSupportPlaceholder = true;
                self.txtPlaceholder = self.$el.attr('placeholder');
            }

            self._reloadMask();
            var caret = core.dom.getCaretPos(self.el).begin; // 캐럿 위치를 보관
            self.update();
            if (self.$el.is(':focus')) {
                core.dom.setCaretPos(self.el, caret + self._getMCharsBeforeCount(caret, true));
            }
            // 마스킹에 대한 전체 정규식을 가져온다
            self.regexMask = self._getRegexMask();
            // 값이 변경됐는지 감시
            if (self.options.watch) {
                self._watchStart();
            }
        },

        /**
         * 마스킹처리된 값을 인풋에 넣어준다
         */
        update: function update() {
            var self = this,
                val = self.$el.val();
            if (val) {
                self.$el.val(this._getMasked());
            }
        },

        /**
         * 마스킹 옵션이 변경됐을 수도 있기 때문에 다시 정규화 한다.
         * @private
         */
        _reloadMask: function _reloadMask() {
            var self = this,
                m,
                mask;

            if (m = Formatter.masks[self.options.format]) {
                if (core.is(m.format, 'function')) {
                    self.mask = m.format.call(self, self.$el.val());
                } else {
                    self.mask = m.format;
                }
                self.options.reverse = !!m.reverse;
            } else {
                self.mask = core.is(self.options.format, 'function') ? self.options.format.call(self) : self.options.format;
            }
        },

        /**
         * 숫자, 영문자 만 입력하는거면 마스킹 처리는 하지 않고 키보드만 막는다.
         * @returns {boolean}
         * @private
         */
        _isSimpleFormat: function _isSimpleFormat() {
            var self = this,
                format = self.options.format,
                old;

            if (format === 'eng' || format === 'alnum' || format === 'num' || format === 'koreng') {
                self.$el.on('keydown focusin keyup focusout paste', function (e) {
                    var el = this;
                    switch (e.type) {
                        case 'keydown':
                            if (utils.isInvalidKey(e, format, [].concat(Formatter.byPassKeys, 16))) {
                                e.preventDefault();
                            }
                        // break;
                        case 'focusin':
                            old = this.value;
                            break;
                        case 'keyup':
                        case 'focusout':
                        case 'paste':
                            setTimeout(function () {
                                if (old != el.value) {
                                    utils.cleanChars(format, el, e.type !== 'focusout');
                                    old = el.value;
                                }
                            });
                            break;
                    }
                });
                return true; // 마스킹은 처리안하도록 true 반환
            } else if (core.array.include(['card', 'amexcard', 'tel', 'mobile', 'bizno', 'corpno', 'comma', 'date'], format)) {
                if (window.IS_DEBUG && core.browser.isMobile) {
                    self.$el.attr('type', 'tel');
                }
                // 숫자
                self.$el.on('keydown focusin', function (e) {
                    if (e.type === 'keydown') {
                        if (utils.isInvalidKey(e, 'num', Formatter.byPassKeys)) {
                            e.preventDefault();
                        }
                    }
                    old = this.value;
                });
            }
        },

        /**
         * 이벤트 바인딩
         * @private
         */
        _bindEvents: function _bindEvents() {
            var self = this;

            self.$el.on('keyup', function (e) {
                self._reloadMask();
                self._process(e);
            }).on('paste drop', function () {
                setTimeout(function () {
                    self.$el.keydown().keyup();
                });
            }).on('change', function () {
                self.$el.data('changed', true);
            }).on('blur', function (e) {
                if (self.oldValue != self.$el.val() && !self.$el.data('changed')) {
                    self.$el.triggerHandler('change');
                }
                self.$el.data('change', false);
                self._watchStart();
            }).on('keydown blur', function () {
                self.oldValue = self.$el.val();
            }).on('focusin', function () {
                // 포커싱될 때 셀렉트시킬 것인가..
                if (self.options.selectOnFocus === true) {
                    $(e.target).select();
                }
                self._watchStop();
            }).on('focusout', function () {
                // 포커스가 나갈 때 안맞는 값을 지울것인가
                if (self.options.clearIfNotMatch && !self.regexMask.test(self.$el.val())) {
                    self.$el.val('');
                }
            });

            // comma 형식일 땐 ,가 제거된 상태로 넘어가게
            self.options.format === 'comma' && $(self.el.form).on('submit', function (e) {
                self.remove();
                self.oldValue = '';
            });
        },

        /**
         * 값이 변경됐는지 감시 시작
         * @private
         */
        _watchStart: function _watchStart() {
            var self = this;
            self._watchStop();

            if (!self.options.watch || self.$el.prop('readonly') || self.$el.prop('disabled')) {
                return;
            }

            var dur = self.options.watchInterval;
            self.watchTimer = setInterval(function () {
                if (self.$el[0].disabled || 0 <= self.$el[0].className.indexOf('disabled')) {
                    return;
                }

                var val = self.$el.val();
                if (val && self.oldValue != val) {
                    self.update();
                }
            }, dur);
        },

        /**
         * 값 변경 감시 중지
         * @private
         */
        _watchStop: function _watchStop() {
            var self = this;
            clearInterval(self.watchTimer);
            self.watchTimer = null;
        },

        /**
         * 마스킹에 대한 정규식 반환
         * @returns {RegExp}
         * @private
         */
        _getRegexMask: function _getRegexMask() {
            var self = this,
                maskChunks = [],
                translation,
                pattern,
                optional,
                recursive,
                oRecursive,
                r,
                ch;

            for (var i = 0, len = self.mask.length; i < len; i++) {
                ch = self.mask.charAt(i);
                if (translation = self.translation[ch]) {
                    pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
                    optional = translation.optional;
                    if (recursive = translation.recursive) {
                        maskChunks.push(ch);
                        oRecursive = { digit: ch, pattern: pattern };
                    } else {
                        maskChunks.push(!optional ? pattern : pattern + '?');
                    }
                } else {
                    maskChunks.push(ch.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
                }
            }

            r = maskChunks.join('');
            // 기준을 끝으로 했을 때
            if (oRecursive) {
                r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?').replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
            }

            return new RegExp(r);
        },
        /**
         * index위치의 마스킹처리된 문자수
         * @param index
         * @param onCleanVal
         * @returns {number}
         * @private
         */
        _getMCharsBeforeCount: function _getMCharsBeforeCount(index, onCleanVal) {
            var self = this,
                mask = self.mask;
            for (var count = 0, i = 0, maskL = mask.length; i < maskL && i < index; i++) {
                if (!self.translation[mask.charAt(i)]) {
                    index = onCleanVal ? index + 1 : index;
                    count++;
                }
            }
            return count;
        },
        /**
         * 캐럿 위치
         * @param originalCaretPos
         * @param oldLength
         * @param newLength
         * @param maskDif
         * @returns {*}
         * @private
         */
        _caretPos: function _caretPos(originalCaretPos, oldLength, newLength, maskDif) {
            var self = this,
                mask = self.mask,
                translation = self.translation[mask.charAt(Math.min(originalCaretPos - 1, mask.length - 1))];

            return !translation ? self._caretPos(originalCaretPos + 1, oldLength, newLength, maskDif) : Math.min(originalCaretPos + newLength - oldLength - maskDif, newLength);
        },
        /**
         * 마스킹처리
         * @param e
         * @returns {*}
         * @private
         */
        _process: function _process(e) {
            var self = this,
                keyCode = e.keyCode;
            // TODO
            if (keyCode === 17 || keyCode === 65 && e.ctrlKey) {
                return;
            }

            self.invalid = [];
            if ($.inArray(keyCode, self.byPassKeys) === -1 || keyCode === 46 || keyCode === 8) {
                var caretPos = core.dom.getCaretPos(self.$el).begin,
                    currVal = self.$el.val(),
                    currValL = currVal.length,
                    changeCaret = caretPos < currValL,
                    newVal = self._getMasked(),
                    newValL = newVal.length,
                    maskDif = self._getMCharsBeforeCount(newValL - 1) - self._getMCharsBeforeCount(currValL - 1);

                self.$el.val(newVal).change();

                // change caret but avoid CTRL+A
                if (changeCaret && !(keyCode === 65 && e.ctrlKey)) {
                    // Avoid adjusting caret on backspace or delete
                    if (!(keyCode === 8 || keyCode === 46)) {
                        caretPos = self._caretPos(caretPos, currValL, newValL, maskDif);
                    }
                    if (self.$el.is(':focus')) {
                        core.dom.setCaretPos(self.el, caretPos);
                    }
                }

                return self._callbacks(e);
            }
        },
        /**
         * 마스킹처리 코어부분
         * @param skipMaskChars
         * @returns {string}
         * @private
         */
        _getMasked: function _getMasked(skipMaskChars) {
            var self = this,
                mask = self.mask,
                buf = [],
                value = self.$el.val(),
                m = 0,
                maskLen = mask.length,
                v = 0,
                valLen = value.length,
                offset = 1,
                addMethod = 'push',
                resetPos = -1,
                lastMaskChar,
                check;

            if (self.options.reverse) {
                addMethod = 'unshift';
                offset = -1;
                lastMaskChar = 0;
                m = maskLen - 1;
                v = valLen - 1;
                check = function check() {
                    return m > -1 && v > -1;
                };
            } else {
                lastMaskChar = maskLen - 1;
                check = function check() {
                    return m < maskLen && v < valLen;
                };
            }

            while (check()) {
                var maskDigit = mask.charAt(m),
                    valDigit = value.charAt(v),
                    translation = self.translation[maskDigit];

                if (translation) {
                    if (valDigit.match(translation.pattern)) {
                        buf[addMethod](valDigit);
                        if (translation.recursive) {
                            if (resetPos === -1) {
                                resetPos = m;
                            } else if (m === lastMaskChar) {
                                m = resetPos - offset;
                            }

                            if (lastMaskChar === resetPos) {
                                m -= offset;
                            }
                        }
                        m += offset;
                    } else if (translation.optional) {
                        m += offset;
                        v -= offset;
                    } else if (translation.fallback) {
                        buf[addMethod](translation.fallback);
                        m += offset;
                        v -= offset;
                    } else {
                        self.invalid.push({ p: v, v: valDigit, e: translation.pattern });
                    }
                    v += offset;
                } else {
                    if (!skipMaskChars) {
                        buf[addMethod](maskDigit);
                    }

                    if (valDigit === maskDigit) {
                        v += offset;
                    }

                    m += offset;
                }
            }

            var lastMaskCharDigit = mask.charAt(lastMaskChar);
            if (maskLen === valLen + 1 && !self.translation[lastMaskCharDigit]) {
                buf.push(lastMaskCharDigit);
            }

            return buf.join('');
        },
        /**
         * 콜백함수 바인딩
         * @param e
         * @private
         */
        _callbacks: function _callbacks(e) {
            var self = this,
                mask = self.mask,
                val = self.$el.val(),
                changed = val !== self.oldValue,
                defaultArgs = [val, e, self.el, self.options],
                callback = function callback(name, criteria, args) {
                if (typeof self.options[name] === 'function' && criteria) {
                    self.options[name].apply(this, args);
                }
            };

            callback('onChange', changed === true, defaultArgs);
            callback('onKeyPress', changed === true, defaultArgs);
            callback('onComplete', val.length === mask.length, defaultArgs);
            callback('onInvalid', self.invalid.length > 0, [val, e, self.el, self.invalid, self.options]);
        },
        /**
         * 지우기
         */
        remove: function remove() {
            var self = this,
                caret = core.dom.getCaretPos(self.el).begin;
            self._watchStop();
            self.$el.off();
            self.$el.val(self.clean());
            if (self.$el.is(':focus')) {
                core.dom.setCaretPos(self.el, caret - self._getMCharsBeforeCount(caret));
            }
        },
        /**
         * 마스킹 제거
         * @returns {*|string}
         */
        clean: function clean() {
            return this._getMasked(true);
        },

        destroy: function destroy() {
            clearInterval(this.watchTimer);
            this.supr();
        }
    });

    return Formatter;
});

vcui.define('ui/toast', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var toastTemplate = 
    '<div class="toast-message-box">'+
    '   <div class="inner">'+
    '       <p class="toast-text"></p>'+
    '       <a href="#" role="button" class="btn-area"><span class="blind">확인</span></a>'+
    '   </div>'+
    '</div>';

    var Toast = core.ui('Toast', {
        bindjQuery: true,
        defaults: {
            delaytime: 3000
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self.$el.empty();
            self.$el.html(toastTemplate);
            
            self._delayTimer = null;

            self._bindEvent();
        },

        _bindEvent: function(){
            var self = this;

            self.$el.on('click', '.btn-area', function(e){
                e.preventDefault();
                
                self.close();
            });

            $(window).on('toastshow', function(e, msg){
                self.show(msg);
            });
        },

        show: function(msg){
            var self = this;

            self.$el.find('.toast-text').text(msg);
            self.$el.stop().css({
                display:'block', 
                opacity:0,
                left: $(window).width()/2 - self.$el.width()/2
            }).animate({opacity:1}, 150);

            self._delayTimer = setTimeout(function(){
                self.close();
            }, self.options.delaytime);
        },

        close: function(){
            var self = this;

            clearTimeout(self._delayTimer);
            self._delayTimer = null;

            self.$el.stop()
            .animate({opacity:0}, 120, function(){
                self.$el.css('display', 'none');
            });
        }
        
    });

    return Toast;
});
/*!
 * @module vcui.ui.Spinner
 * @license MIT License
 * @description https://spin.js.org
 * 
 */
vcui.define('ui/spinner', ['jquery', 'vcui'], function ($, core) {
    "use strict";
    

    function importCss() {
        var keyFramePrefixes = ["-webkit-","-o-","-moz-", ""];
        var keyFrames, textNode;
        var cssElement = document.createElement('style');
        cssElement.type = 'text/css';
        
        for(var i in keyFramePrefixes){
            keyFrames = '@'+keyFramePrefixes[i]+'keyframes ui-spinner-line-fade-more{' +
            '0%,100% {opacity:0;} ' +
            '1% {opacity:1;}' +
            '}';
            textNode = document.createTextNode(keyFrames);
            cssElement.appendChild(textNode);
        
            keyFrames = '@'+keyFramePrefixes[i]+'keyframes ui-spinner-line-fade-quick{' +
            '0%,39%,100% {opacity:0.25;} ' +
            '40% {opacity:1;}' +
            '}';
            textNode = document.createTextNode(keyFrames);
            cssElement.appendChild(textNode);
        
            keyFrames = '@'+keyFramePrefixes[i]+'keyframes ui-spinner-line-fade-default{' +
            '0%,100% {opacity:0.22;} ' +
            '1% {opacity:1;}' +
            '}';
            textNode = document.createTextNode(keyFrames);
            cssElement.appendChild(textNode);
        }

        cssElement.appendChild( document.createTextNode('.ui-spinner-msg{ text-align:center; font-weight:bold; margin-top:16px;}') );        
        document.getElementsByTagName('head')[0].appendChild(cssElement);
    }

    
    function getColor(color, idx) {
        return typeof color == 'string' ? color : color[idx % color.length];
    }
    
    function parseBoxShadow(boxShadow) {
        var regex = /^\s*([a-zA-Z]+\s+)?(-?\d+(\.\d+)?)([a-zA-Z]*)\s+(-?\d+(\.\d+)?)([a-zA-Z]*)(.*)$/;
        var shadows = [];
        for (var _i = 0, _a = boxShadow.split(','); _i < _a.length; _i++) {
            var shadow = _a[_i];
            var matches = shadow.match(regex);
            if (matches === null) {
                continue; // invalid syntax
            }
            var x = +matches[2];
            var y = +matches[5];
            var xUnits = matches[4];
            var yUnits = matches[7];
            if (x === 0 && !xUnits) {
                xUnits = yUnits;
            }
            if (y === 0 && !yUnits) {
                yUnits = xUnits;
            }
            if (xUnits !== yUnits) {
                continue; // units must match to use as coordinates
            }
            shadows.push({
                prefix: matches[1] || '',
                x: x,
                y: y,
                xUnits: xUnits,
                yUnits: yUnits,
                end: matches[8],
            });
        }
        return shadows;
    }
    /**
     * Modify box-shadow x/y offsets to counteract rotation
     */
    function normalizeShadow(shadows, degrees) {
        var self = this;
        var normalized = [];
        for (var _i = 0, shadows_1 = shadows; _i < shadows_1.length; _i++) {
            var shadow = shadows_1[_i];
            var xy = convertOffset(shadow.x, shadow.y, degrees);
            normalized.push(shadow.prefix + xy[0] + shadow.xUnits + ' ' + xy[1] + shadow.yUnits + shadow.end);
        }
        return normalized.join(', ');
    }

    function convertOffset(x, y, degrees) {
        var radians = degrees * Math.PI / 180;
        var sin = Math.sin(radians);
        var cos = Math.cos(radians);
        return [
            Math.round((x * cos + y * sin) * 1000) / 1000,
            Math.round((-x * sin + y * cos) * 1000) / 1000,
        ];
    }

    var $doc = $(document),
        detect = core.detect

    /**
     * @class
     * @description 
     * @name vcui.ui.Spinner
     * @extends vcui.ui.View
     */

    var Spinner = core.ui('Spinner', /** @lends vcui.ui.Spinner# */{
        bindjQuery: 'spinner',
        defaults: {
            lines: 8,   // The number of lines to draw
            length: 8, // The length of each line
            width: 8,  // The line thickness
            radius: 16, // The radius of the inner circle
            scale: 1.0, // Scales overall size of the spinner
            corners: 0.8,       // Corner roundness (0..1)
            color: '#ffffff',   // CSS color or array of colors
            fadeColor: 'transparent', // CSS color or array of colors
            animation: 'ui-spinner-line-fade-quick', //'ui-spinner-line-fade-default', //ui-spinner-line-fade-more, ui-spinner-line-fade-quick
            rotate: 0,      // The rotation offset
            direction: 1,   // 1: clockwise, -1: counterclockwise
            speed: 1.3,     // Rounds per second
            zIndex: 2e9,    // The z-index (defaults to 2000000000)
            className: 'ui-spinner', // The CSS class to assign to the spinner
            msgClassName: 'ui-spinner-msg', // The CSS class to assign to the spinner message
            top: '50%',     // Top position relative to parent
            left: '50%',    // Left position relative to parent
            shadow: '0 0 2px 2px #000000', // Box-shadow for the lines
            position: 'fixed',           // Element positioning
            msg:'' // message
            
        },
        
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }
            importCss();
        },

        spin: function spin(options) {
            var self = this;
            var opts = $.extend(self.options, options);

            self.stop();

            self.$contents = $('<div></div>');        
            self.$contents.attr('role', 'progressbar');

            // var yp = (opts.msg && opts.msg != '')? 'calc('+opts.top+' - 20px)' : opts.top;
            
            self.$contents.css({
                position: opts.position,
                width: 0,
                zIndex: opts.zIndex,
                left: opts.left,
                top: opts.top,
                transform: "scale(" + opts.scale + ")",
            });

            if(opts.className) self.$contents.addClass(opts.className);
            self.$el.append(self.$contents);             
            
            self._build();
        },

        stop: function stop() {
            var self = this;

            if(self.$contents) {
                self.$contents.remove();
            }
            
        },

        _build: function _build() {
            var self = this;
            var opts = self.options;

            var borderRadius = (Math.round(opts.corners * opts.width * 500) / 1000) + 'px';
            var shadow = 'none';
            if (opts.shadow === true) {
                shadow = '0 2px 4px #000'; // default shadow
            }else if (typeof opts.shadow === 'string') {
                shadow = opts.shadow;
            }
            var shadows = parseBoxShadow(shadow);
            for (var i = 0; i < opts.lines; i++) {
                var degrees = ~~(360 / opts.lines * i + opts.rotate); // Math.floor()

                var $backgroundLine = $('<div></div>').css({
                    position: 'absolute',
                    top: -opts.width / 2,
                    width: (opts.length + opts.width),
                    height: opts.width,
                    background: getColor(opts.fadeColor,i),
                    borderRadius: borderRadius,
                    transformOrigin: 'left',
                    transform: "rotate(" + degrees + "deg) translateX(" + opts.radius + "px)"
                });


                var delay = i * opts.direction / opts.lines / opts.speed;
                delay -= 1 / opts.speed; // so initial animation state will include trail
                var $line = $('<div></div>').css({
                    width: '100%',
                    height: '100%',
                    background: getColor(opts.color, i),
                    borderRadius: borderRadius,
                    boxShadow: normalizeShadow(shadows, degrees),
                    animation: 1 / opts.speed + "s linear " + delay + "s infinite " + opts.animation,
                });
                $backgroundLine.append($line);
                self.$contents.append($backgroundLine);
            }

            if(opts.msg && opts.msg != ''){

                var $msg = $('<div>' + opts.msg + '</div>').css({
                    position: 'absolute',
                    top: (opts.radius + opts.length + opts.width),
                    left: -200,//-(opts.radius + opts.length + opts.width),
                    width: 400,//(opts.radius + opts.length + opts.width)*2,
                    color:getColor(opts.color, 0)
                });
                
                if(opts.msgClassName) $msg.addClass(opts.msgClassName);    
                self.$contents.append($msg);

            }
            

        }

        


    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return Spinner;
});
vcui.define('ui/imageFileInput', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var selectFiles = [],
        totalSize = 0;

    var ImageFileInput = core.ui('ImageFileInput', {
        bindjQuery: 'imageFileInput',
        defaults: {
            regex: /[?!,.&^~]/,
            format: 'jpg|jpeg|png|gif',
            totalSize: 10 * 1024 * 1024,
            individualFlag: false,
            individual: {
                size: 10 *  1024 * 1024
            },
            templateAlert: '<article id="fileAlert" class="lay-wrap"><section class="lay-conts"><h6>{{message}}</h6></section><div class="btn-wrap laypop"><button type="button" class="btn pink ui_modal_close"><span>확인</span></button></div></article>',
            message: {
                name: '파일 명에 특수기호(? ! , . & ^ ~ )를 제거해 주시기 바랍니다.',
                format: 'jpg, jpeg, png, gif 파일만 첨부 가능합니다.',
                size: '첨부파일 전체 용량은 10MB 이내로 등록 가능합니다'
            }
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            };

            self._bindEvents();
        },
        removeAll:function() {
            var self = this;

            self.$el.find('input[type="file"]').val('');
            self.$el.find('.file-item').removeClass('on');
            self.$el.find('.file-preview').html('');
            self.$el.find('.name').val('');

            totalSize = 0;
            selectFiles = [];
        },
        getSelectFiles: function getSelectFiles() {
            return selectFiles;
        },
        _checkFileName: function _checkFileName(file) {
            var name = file.name.split('.').slice(0,-1).join('.') || file.name + '';
            return this.options.regex.test(name);
        },
        _checkFileSize: function _checkFileSize(file) {
            return totalSize + file.size <= this.options.totalSize
        },
        _checkFileFormat: function _checkFileFormat(file) {
            var optArr = this.options.format.split('|'),
                formatArr = file.name.split('.'),
                format = formatArr[formatArr.length - 1].toLowerCase();
            
            if (!vcui.array.has(optArr, format)) {
                return false;
            }

            return true; 
        },
        _checkIndividualFileSize: function _checkIndividual(file) {
            return file.size <= this.options.individual.size
        },
        _checkFile: function _checkFile(file) {
            var self = this,
                success = true,
                msgType;


            if (self.options.individualFlag) {
                if (!self._checkIndividualFileSize(file)) {
                    success = false;
                    msgType = 'size';

                    return {
                        success: success,
                        message: msgType
                    };
                }
            } 
            
            if (!self._checkFileSize(file)) {
                success = false;
                msgType = 'size';
            } else if (!self._checkFileFormat(file)) {
                success = false;
                msgType = 'format';
            } else if (self._checkFileName(file)) {
                success = false;
                msgType = 'name';
            }

            return {
                success: success,
                message: msgType
            };
        },
        _callAlert: function _callError(msg) {
            var self = this,
                tmpl;

            tmpl = vcui.template(self.options.templateAlert, {
                message: self.options.message[msg]
            });

            $('body').append(tmpl);
            $('#fileAlert').vcModal({
                removeOnClose: true
            });
        },
        _setPreview: function _setPreview($input, file) {
            var $fileBox = $input.closest('.file-item'),
                reader = new FileReader();
            
            reader.readAsDataURL(file);
            reader.onload = function(e){
                $fileBox.addClass('on');
                $fileBox.find('.file-preview').html('<img src="'+e.target.result+'" alt="첨부파일 썸네일">')
                $fileBox.find('.name').val(file.name);
            }
        },
        _bindEvents: function _bindEvents() {
            var self = this;

            self.$el.find('input[type="file"]').change(function(e) {
                var $this = $(e.currentTarget);
                
                if ($this[0].files.length > 0) {
                    var file = e.currentTarget.files[0],
                        result = self._checkFile(file); 

                    if (result.success) {
                        totalSize += file.size;
                        selectFiles.push(file);
                        
                        self._setPreview($(this), file);

                        $this.siblings('.btn-del').off('click').on('click', function() {
                            var $btn = $(this);

                            lgkorUI.confirm('', {
                                title:'삭제하시겠습니까?',
                                okBtnName: '예',
                                cancelBtnName: '아니오',
                                ok: function() {
                                    var $box = $this.closest('.file-item');
                
                                    $this[0].value = '';
                                    $box.removeClass('on');
                                    $box.find('.file-preview').html('');
                                    $box.find('.name').val('');

                                    var index = $btn.closest('.image-file-wrap').find('.btn-del').index($btn);
                                    totalSize -= selectFiles[index].size;
                                    selectFiles.splice(index,1);

                                    $(this).vcModal('hide');
                                }
                            });
                        });         
                    } else {
                        $this[0].value = '';
                        self._callAlert(result.message);
                    }
                }
            });
        },
    });

    return ImageFileInput;
});

/*!
 * @module vcui.ui.CheckboxAllChecker
 * @license MIT License
 * @description CheckboxAllChecker 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('ui/checkboxAllChecker', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    return core.ui('CheckboxAllChecker', {
        bindjQuery: 'checkboxAllChecker',
        defaults: {
            allCheckClass: '.ui_all_checker', //전체 선택 체크박스 클래스...
            checkBoxItemsTargetQuery: null,
            disabled: false
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self.$allChecker = self.$el.find(self.options.allCheckClass);

            self.update();
            /*          
            if (self.total === 0) {
                return;
            }
            */

            self._bindEvents();
        },

        _bindEvents: function _bindEvents() {
            var self = this;

            // 전체선택 체크박스 선택시
            self.$allChecker.on('change', function (e) {
                self._toggleAllChecked();
            });

            // 소속 체크박스를 선택시
            self.$items.off('change');
            self.$items.on('change', function (e) {
                self._allChecked();
            });
        },

        update: function update() {
            var self = this;

            if(self.options.checkBoxItemsTargetQuery) {
                self.$items = self.$el.find(self.options.checkBoxItemsTargetQuery);
            } else {
                self.$items = self.$el.find('input[type=checkbox]').not(self.options.allCheckClass).not(":disabled");
            }
            self.total = self.$items.size();

            self.$items.off('change');
            self.$items.on('change', function (e) {
                self._allChecked();
            });
        },

        _toggleAllChecked: function(){
            var self = this;

            if(!self.options.disabled){
                var chk = self.$allChecker.prop('checked');
                self.$items.prop('checked', chk);
    
                self.trigger('allCheckerChange', [self.getAllChecked()]);
            }
        },

        _allChecked: function(){
            var self = this;

            if(!self.options.disabled){
                var leng = self.$items.closest(':checked').length;
                self.$allChecker.prop('checked', self.total === leng);

                self.trigger('allCheckerChange', [self.getAllChecked()]);
            }
        },

        setChecked: function(iptname, chk){
            var self = this;

            self.$items.closest('[name='+iptname+']').prop('checked', chk);
            self._allChecked();
        },
        
        getAllChecked: function(){
            var self = this;

            var leng = self.$items.closest(':checked').length;
            return self.total === leng;
        },

        setAllChecked: function(){
            var self = this;

            self.$items.prop('checked', true);
            self.$allChecker.prop('checked', true);
        },

        setAllNoneChecked: function(){
            var self = this;

            self.$items.prop('checked', false);
            self.$allChecker.prop('checked', false);
        },

        getCheckItems: function(){
            var self = this;

            return self.$items.closest(':checked');
        },

        setDisenabled: function(disabled){
            var self = this;

            self.options.disabled = disabled;
        }
    });
});