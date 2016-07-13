/*
* Prevent touching reload
*/
var target = window; // this can be any scrollable element
var last_y = 0;
target.addEventListener('touchmove', function(e){
    var scrolly = target.pageYOffset || target.scrollTop || 0;
    var direction = e.changedTouches[0].pageY > last_y ? 1 : -1;
    if(direction>0 && scrolly===0){
        e.preventDefault();
    }
    last_y = e.changedTouches[0].pageY;
});


/*
* Smart resize
*/
(function($,sr){
  var debounce = function (func, threshold, execAsap) {
    var timeout;
    return function debounced () {
      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap)
          func.apply(obj, args);
        timeout = null; 
      };
      if (timeout)
          clearTimeout(timeout);
      else if (execAsap)
          func.apply(obj, args);
      timeout = setTimeout(delayed, threshold || 100); 
    };
  }
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');
 

var app_window = $('.app');
$(window).smartresize(function(){  
	app_window.outerHeight(window.innerHeight - 16 + 'px');
});
$(document).ready(function () {
	app_window.outerHeight(window.innerHeight - 16 + 'px');
});


/*
* Toggle friends block
*/
var Friends_block = function () {
  this.friends_toggle = $('.friends_toggle');
  this.friends_block = $('.friends_block');

  this.init_events();

};

Friends_block.prototype.init_events = function () {
  var that = this;
  that.friends_toggle.on('click', function (ev) {
    that.friends_block.toggleClass('opened');
    that.friends_toggle.toggleClass('opened');
  });
};

var friends_block = new Friends_block();


/*
* Go back to top
*/
var GoBack = function () {
  this.chat_toggle = $('.back_to_top');
  this.chat_block = $('.chat_block');

  this.init_events();

};

GoBack.prototype.init_events = function () {
  var that = this;
  that.chat_toggle.on('click', function () {
    that.chat_block.animate({
      scrollTop: 0
    }, 1000);
  });
};

var goback = new GoBack();


