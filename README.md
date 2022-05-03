# zurb-f6-boilerplate

This is a macOS-optimized [foundation-zurb-template](https://github.com/zurb/foundation-zurb-template) workflow. The build requires a Macintosh computer, specifically running the programs [Codekit 3](https://incident57.com/codekit/index.html) and [MAMP](https://www.mamp.info/en/). You can use your text editor of choice.

## Features

* [Foundation 6](http://foundation.zurb.com/sites.html) Framework – ([v6.5.3](https://github.com/zurb/foundation-sites/releases/tag/v6.5.3))

* Cache-busting auto-versioning for CSS and JS [(CREDIT)](http://www.particletree.com/notebook/automatically-version-your-css-and-javascript-files/)

* Easy SASS and JS compilation tools with a nice GUI ([Codekit App](https://incident57.com/codekit/index.html))

## Setup
In order:

* `cd` Terminal into your install directory

* Clone the repo: `git clone https://github.com/nico-watine/zurb-f6-boilerplate.git`

* `yarn`

* `bower install`

* Ensure 'External Server Address' is correct in 'config.codekit' file

### Notes
There is an invisible `.htaccess` file located in `/assets`. This `.htaccess` file **cannot** be deleted. It is auto imported into `/dist` and is necessary for autoversioning to function correctly

`_settings.scss` can greatly change between core Foundation updates. Keep track of your custom tweaks by adding an inline comment following the variable's ending semicolon. The comment should begin with `// "Vanilla:"` and end with the variable's original value.

`$black: #000; // Vanilla: #0a0a0a`
