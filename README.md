# backwall
Lightweight pure-javascript plugin to add responsive, smooth-loading background images to a web page. For more info and demos, see the [github.io project website](http://blake01.github.io/backwall/)

## Why use backwall?
[Full-page backgrounds](https://css-tricks.com/perfect-full-page-background-image/) are extremely popular on the web nowadays. However, developers have a few headaches whenever such backgrounds are required:
- How will the site look on legacy browsers that don't support background-size: cover?
- If the background image resolution is small, is it acceptable for users of large screens to see a poor-quality image?
- Conversely, if the background image resolution is large, is it acceptable to force users on small screens to download and wait for an unnecessarily large file?
- Is stuttery, pixel-row-by-pixel-row image loading acceptable on slow internet connections, regardless of the background image size?

Enter *backwall*. *backwall* is an MIT licensed, dependency-free javascript plugin that magics away all of these problems in a progressive way. It allows you to:
- Detect browser support for background-size: cover using Modernizr and provide an appropriate fallback, e.g. a solid color background
- Detect the user's screen size and pixel ratio, and serve up a medium- or high-resolution background image
- For users with slow connections, serve up a low-resolution background image while the higher-resolution image loads
- Smoothly fade in background images when fully loaded using CSS3 transitions when the browser supports them

## Get me started! 

Here's what you need to know to deploy *backwall* on your site:

```
<!DOCTYPE html>
<html>
<head>
  ...
	<style>
	body, html {
	  min-height: 100%;
	}
	html {
	  // Define a fallback full-page background here
	  background-color: black;
	}
	</style>
</head>

<body>
  ...
  <script src="backwall.standalone.min.js"></script>
  <script>
  new Backwall({
    imgLoRes: "background_200.jpg", // Optional
    imgMidRes: "background_810.jpg",
    imgHiRes: "background_1620.jpg", // Optional
    hiResThreshPx: 1080, // Optional
    fadeTimeSecs: 0.4  // Optional
  });
  </script>

</body>
</html>
```

If you're already using Modernizr in your project, ensure that it's loaded before *backwall* and that your build includes 'bgsizecover' detection. Then use backwall.min.js instead of the standalone version in the code snippet above.

If you're really keen on having your background images load as quickly as possible, consider [inlining](https://developers.google.com/speed/pagespeed/module/filter-js-inline?hl=en#operation) *backwall* for maximum performance.

## API

### Options

*backwall* takes a number of optional parameters and one compulsory parameter.

**imgLoRes**
- *Type*: Optional, no default
- *Description*: Filepath to a low-resolution background image that can load quickly and provide a placeholder until a higher-resolution image is done loading

**imgMidRes**
- *Type*: Compulsory
- *Description*: Filepath to an image that will load on top of imgLoRes (if specified) if no imgHiRes is specified, or the user's available screen pixels (screen width * pixel ratio) value is below hiResThreshPx

**imgHiRes**
- *Type*: Optional, no default
- *Description*: Filepath to an image that will load on top of imgLoRes (if specified) if the user's available screen pixels value is equal to or above hiResThreshPx

**hiResThreshPx**
- *Type*: Optional, default = 1080
- *Description*: The cutoff point at which *backwall* decides to load imgMidRes or imgHiRes (see above)

**fadeTimeSecs**
- *Type*: Optional, default = 0.5
- *Description*: The cross-fade transition time from 0% to 100% opacity when each image loads. Will effectively be 0 on browsers that do not support CSS3 transitions.

### Callbacks

None yet. Future enhancements to include callbacks when images have loaded.
