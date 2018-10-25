# zurb-f6-boilerplate

This is a macOS-optimized [Foundation ZURB Template](https://github.com/zurb/foundation-zurb-template) workflow for web development. It requires a Macintosh computer, running the programs [Codekit 3](https://incident57.com/codekit/index.html), [Sublime Text 3](https://www.sublimetext.com/3) and [MAMP](https://www.mamp.info/en/)

#### **FEATURES**

* [Foundation 6](http://foundation.zurb.com/sites.html) Framework (inherently awesome)

* Cache-busting auto-versioning for CSS and JS [(CREDIT)](http://www.particletree.com/notebook/automatically-version-your-css-and-javascript-files/)

* Easy SASS and JS compilation tools with a nice GUI ([Codekit App](https://incident57.com/codekit/index.html))

* Optimized Google Analytics tracking code ([CREDIT](https://github.com/h5bp/html5-boilerplate/pull/1660#issuecomment-89815017))

* Can process PHP files (not just HTML)

### **Setup**
In order:

* cd Terminal

* Clone via HTTPS : [https://github.com/nico-watine/zurb-f6-boilerplate.git](https://github.com/nico-watine/zurb-f6-boilerplate.git)

* npm install

* bower install

* Ensure 'External Server Address' is correct in 'config.codekit' file

### **Notes**
There is an invisible .htaccess file located in '/assets'. This .htaccess file **cannot** be deleted. It is auto imported into '/dist' and it is necessary for autoversioning to function correctly

"settings.scss" can greatly change between core updates. Keep track of your custom tweaks by adding a comment in the following structure:

"// Vanilla: VAR" after the setting's semi-colon and on the same line
