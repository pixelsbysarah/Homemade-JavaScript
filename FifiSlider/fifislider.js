/*
* 
* FifiSlider 0.9
* January 2016
* 
*/


/*** Prep Work ***/

/* Simple JavaScript Inheritance. By John Resig http://ejohn.org/ MIT Licensed. */
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  this.Class = function(){};

  Class.extend = function(prop) {
    var _super = this.prototype;

    initializing = true;
    var prototype = new this();
    initializing = false;
   
    for (var name in prop) {
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            this._super = _super[name];
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    function Class() {
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    Class.prototype = prototype;
    Class.prototype.constructor = Class;
    Class.extend = arguments.callee;
   
    return Class;
  };
})();

/*** The Good Stuff ***/

var FifiSlide = Class.extend({

     fsContainer: "fifislider",
     fsSlideTemplate: "slideBuild",
     fsHeight: 500,
     timer: 3000,
     startSlide: 0,
     currSlide: 0,
     
     slideData: { slides: [
          {
               'imgSrc': 'http://www.pixelsbysarah.com/_common/images/chihuly-glass-disney-dream-comp.jpg',
               'title': 'Headline of Awesomeness Here', 'description':'Description goes here.',
               'cta': 'Call to Action',
               'ctaLink': 'http://www.chihuly.com'
          },
          {
               'imgSrc': 'http://www.pixelsbysarah.com/_common/images/pmba-48-etch-2015-comp.jpg',
               'title': 'Another Headline of Awesomeness Here', 'description':'Description of improving self.',
               'cta': 'Learn Something',
               'ctaLink': 'http://www.rollins.edu'
          },
          {
               'imgSrc': 'http://www.pixelsbysarah.com/_common/images/castaway-cay-bahamas-comp.jpg',
               'title': 'One More Headline of Awesomeness Here', 'description':'Description of something nice.',
               'cta': 'Relax',
               'ctaLink': 'http://www.disneycruise.com'
          }]
     },
     init: function(config){
          this.buildSlider();
     },
     buildSlider: function(){
          var self = this,
               fsView = $('#'+self.fsSlideTemplate).html(),
               sliderTemplate = Handlebars.compile(fsView),
               compiledSlides = sliderTemplate(self.slideData),
               extras = "<div class='dots'></div><div class='arrow left'><span class='fa fa-angle-left'></span></div><div class='arrow right'><span class='fa fa-angle-right'></span></div>";

          $('#'+self.fsContainer).html('<div class="sliderwrap">'+ compiledSlides + extras + '</div>');
          
          $('.arrow.right').on('click',function(){
               self.nextSlide();
          });
           $('.arrow.left').on('click',function(){
               self.prevSlide();
          });
          
     },
     nextSlide: function(){
          //0 and 1, change the first to last to only worry about 0 and 1
          var self = this,
               slides = this.slideData.slides,
               first = slides[0];
               out = slides.shift();
               newSlides = slides.push(out);
               
               this.buildSlider();
          
     },
     prevSlide: function(){
          var self = this,
               slides = this.slideData.slides,
               last = slides.pop();
               newSlides = slides.unshift(last);
               
               this.buildSlider();
     }
});

// engage
var sliderOverrides = {
          'timer':  6000
     };
     
var slider = new FifiSlide(sliderOverrides);

/* still need:
* variables: timer, classname, targets(arrows, dots, slides)
* timer function
* passthrough variables: time, speed, width?, height?
* animation
*/

if(typeof jQuery == 'undefined') {
     window.console && console.log("jQuery not found! Please install to use FifiSlider.");
};