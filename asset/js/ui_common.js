$(function() {

  fn.horizonTable();
  fn.hrefReset();
  fn.tab();
  fn.popup.init();
  fn.slider();
  fn.agreeCheck();
  fn.inputUnit();
});


const fn = {
  horizonTable : function() {
    var $tblName = $('.horizon_scrollbar');

    if(!!$tblName.length){
      $tblName.mCustomScrollbar({
        horizontalScroll:true,
        advanced:{
          autoScrollOnFocus:true,
          updateOnContentResize:true
        }
      });
    }
  },
  hrefReset : function() {
    $(document).on('click', 'a', function(e) {
      var $href = $(this).attr('href');
      if($href == "#" || $href == "#none") {
        e.preventDefault();
      }      
    });
  },
  accodian : function() {
    $(document).on('click', '.ui-acco-btn', function() {
        var $accoWrap = $(this).parents('.ui-acco-wrap');
        var $accoPanel = $(this).parent().next();
      
        if(!$accoWrap.hasClass('active')) {
            $accoWrap.addClass('active');    
            $accoPanel.slideDown(300);
            $accoPanel.attr('aria-hidden', false);
            $(this).attr('aria-expanded', true);

            if($(this).attr('href')) {
                $(this).attr('aria-expanded',false); 
                $accoWrap.removeClass('active');
            }
        } else{
            $accoWrap.removeClass('active');
            $accoPanel.slideUp(300);
            $accoPanel.attr('aria-hidden', true);
            $(this).attr('aria-expanded', false);
        }
    });
  },
  tab : function() {
    var $tabmenu = $('.ui-tab'),
        $selectItem = null;

    $tabmenu.each(function() {
        var $this = $(this),
            $menuItem = $this.find('> .ui-tab-btns').children(),
            $panelItem = $this.find('> .ui-tab-panels').children();
            
            $menuItem.on('click', function() {
                setSelectItem($(this), $panelItem);
                $(this).siblings().removeClass('selected').attr('aria-selected', false);
            });
            firstSelect($menuItem, $panelItem);
    });
    
    function firstSelect($menu, $cont) {
      $menu.first().addClass('selected').attr('aria-selected', true);
      $cont.first().addClass('selected').attr('aria-hidden', false);
    }

    function setSelectItem($item, $pnl) {
        if($selectItem) {
            $selectItem.removeClass('selected').attr('aria-selected', false);
            $pnl.removeClass('selected').attr('aria-hidden', true);
        }
        $selectItem = $item;
        $selectItem.addClass('selected').attr('aria-selected', true);
        $pnl.addClass('selected').attr('aria-hidden', false);

        $item.each(function() {
            var idx = $item.index();
            $pnl.eq(idx).addClass('selected').attr('aria-hidden', false);
            $pnl.eq(idx).siblings().removeClass('selected').attr('aria-hidden', true);    
        });
    }
  },
  popup : {
    gBtn: null,
    gTarget: null,
    gModal: null,
    gWinH: null,
    gHtml: null,
    gScrollT: null,
    sFixedClass: 'ui-fixed', // 스크롤 길경우
    callback: null,
    scrollVal: function() {
      var o = this;
      o.gScrollT =  $(window).scrollTop();
    },
    hideModal: function(callback) {
      var o = this;
      o.gHtml.removeClass(o.sFixedClass).removeAttr('style').scrollTop(o.gScrollT);
      o.gTarget.removeClass('show');
      o.gTarget.attr({'tabindex': '-1', 'aria-hidden': 'true'});
      setTimeout(function() {
        o.gBtn.focus();
      }, 100);

      if(typeof callback === 'function') {
        o.callback = callback;
        o.callback();
      }
    },
    showModal: function() {
      var o = this;
      o.scrollVal();
        
      setTimeout(function() {
          o.gHtml.addClass(o.sFixedClass).height(o.gWinH).scrollTop(o.gScrollT);
          o.gTarget.focus();
      }, 100);

      o.gTarget.addClass('show');
      o.gTarget.attr({'tabindex': '0', 'aria-hidden': 'false'});
    },
    init: function(t, target, callback) {
      var o = this;
      o.gBtn = $(t);
      o.gTarget = $(target);
      o.gWinH = $(window).height();
      o.gHtml = $('body, html');

      o.showModal();

      if(typeof callback === 'function') {
        o.callback = callback;
        o.callback();
      }

      o.gTarget.find('.dialog_close').off().on('click', function() {
        o.hideModal();
      });
    }
  },
  slider : function(target, autoCheck) {
    var $slickSlider = $(target);
    $slickSlider.on('init reInit afterChange', function (event, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.slide_num').html('<span>'+i+'</span>'+ (slick.$dots[0].children.length));
    });
        
    $slickSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed:3000,
        speed:1000,
        autoplay: autoCheck,
        arrows: false,
        dots:true
    });
  },
  inputUnit : function() {
    $('.unit_box input').on('focusin', function() {
      $(this).parent().addClass('on');
    });
    $('.unit_box input').on('focusout mouseleave ')

  },
  agreeCheck : function() {
    var $input = $('.agree_list input[name="inpCheckAgree"]');

    function event() {
      $(document).on('change', 'input[name="allCheck"]', function() {
        var $this = $(this);
        inpAllCheck($this);
      });

      $('input[name="inpCheckAgree"]').on('change', function() {
        var inp_length = $('input[name="inpCheckAgree"]').length;
        var check_list = [];

        $('input[name="inpCheckAgree"]:checked').each(function() {
          var chkIndex = $(this).index();

          check_list.push(chkIndex);   
        });

        if (check_list.length === inp_length) {
            $('input[name="allCheck"]').prop('checked', true);
        } else {
            $('input[name="allCheck"]').prop('checked', false);
        }       
      });
    }

    // 전체체크 
    function inpAllCheck(_this) {
      if(!!_this.is(':checked')) {
        $input.prop('checked', true);
      } else {
        $input.prop('checked', false);
      }
    }
  

    event();

  }
}

// tooltip
$.fn.uiToolTip = function() {
  return this.each(function() {
    var $t = $(this),
        _parent = '.ui-tooltip-wrap',
        _tooltip = '.toolTip',
        _edge = '.toolTip > i',
        _closeBtn = '.typeModalClose',
        $parent = $t.closest(_parent),
        $tootip = $t.closest(_parent).find(_tooltip),
        $edge = $t.closest(_parent).find(_edge),
        $closeBtn = $tootip.find(_closeBtn),
        edgePos = '30px',
        $winW = $(window).width(),
        whiteSpace = 20; // 모바일에서 툴팁의 좌우 여백

    $t.on('click', function() {
        
      if($tootip.is(':visible')) return;
      
      $tootip.show();
      if($tootip.offset().left + $tootip.innerWidth() > $(window).width()) { // 툴팁의 offset left 값 + 가로값이 브라우자 가로폭보도 큰경우, 즉 화면을 넘어간 경우
        $tootip.css('right', '-' + edgePos);
        $edge.css('right', edgePos);
      } else {
        console.log($winW, $tootip.offset().left, Math.floor($tootip.offset().left) + whiteSpace);
        $tootip.css({
          'width': $winW - (whiteSpace * 2),
          'left': Math.floor(whiteSpace - $tootip.offset().left) + 'px',
        });
        $edge.css('left', $t.offset().left - $tootip.offset().left);
      }
      setTimeout(function() {
        $parent.addClass('active');
      },100);

      $closeBtn.off().on('click', function() {
        $parent.removeClass('active');
        setTimeout(function() {
          $tootip.removeAttr('style');
          $edge.removeAttr('style');
          $t.focus();
        },100);
      });
    });
  });
}