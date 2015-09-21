/*! Backwall | MIT license: https://github.com/blake01/backwall/blob/master/LICENSE.txt !*/

// Create an immediately invoked functional expression to wrap our code
(function() {

  // Define our constructor
  this.Backwall = function() {

    // Define option defaults
    var defaults = {
      hiResThreshPx: 1080,
      fadeTimeSecs: 0.5
    }

    // Create options by extending defaults with the passed in arguments
    var options = defaults
    if (arguments[0] && typeof arguments[0] === "object") {
      options = extendDefaults(defaults, arguments[0]);
    }
    
    // If the browser doesn't support background-size: cover, abort.
    if (!Modernizr.bgsizecover) return
    
    // PLUGIN CONTENT HERE       
    if (options.hasOwnProperty('imgLoRes')) makeBackground(options.imgLoRes, 0)
    if (options.hasOwnProperty('imgHiRes')) {
      var dpr = 1
      if (window.hasOwnProperty('devicePixelRatio')) dpr = window.devicePixelRatio
      var screenMaxDimension = Math.max(screen.height, screen.width) * dpr
      if (screenMaxDimension >= options.hiResThreshPx) {
        makeBackground(options.imgHiRes, 1)
        return
      }
    } 
    makeBackground(options.imgMidRes, 1)
    
    // Define factory function to inject DOM elements with Cover backgrounds
    function makeBackground(url, i) {
      // Make an image and a DOM element to put it in
      var img = new Image();
      var element = document.createElement("div")
      // Add the image to the DOM element after it's done loading
      img.onload = function() {
        element.style.backgroundImage = 'url('+url+')'
        element.style.opacity = '1'
      }
      // Start the image loading
      img.src = url;
      // Meanwhile, style the DOM element and insert it into document.body
      element.classList.add('backwall')
      element.style.backgroundSize = 'cover'
      element.style.backgroundRepeat = 'no-repeat'
      element.style.backgroundPosition = 'center'
      element.style.backgroundAttachment = 'fixed'
      element.style.display = 'block'
      element.style.left = element.style.right = '0'
      element.style.top = element.style.bottom = '0'
      element.style.position = 'fixed'
      element.style.opacity = '0'
      element.style.transition = 'opacity ' + options.fadeTimeSecs + 's'
      var zIndex = i - 10
      element.style.zIndex = zIndex.toString()
      document.body.insertBefore(element, document.body.childNodes[0])
    }

  }

  // Utility method to extend defaults with user options
  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

}());