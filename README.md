# zurb-f6-boilerplate

This is a macOS-optimized [foundation-zurb-template](https://github.com/zurb/foundation-zurb-template) workflow. The build requires the programs [Codekit 3](https://incident57.com/codekit/index.html) and [MAMP](https://www.mamp.info/en/).

## Features

* [Foundation 6](https://get.foundation/sites/docs/) Framework – ([v6.7.4](https://github.com/foundation/foundation-sites/releases/tag/v6.7.4))

* Cache-busting auto-versioning for CSS and JS [(CREDIT)](http://www.particletree.com/notebook/automatically-version-your-css-and-javascript-files/)

## Setup
In order:

* `cd` Terminal into your install directory

* Clone the repo: `git clone https://github.com/nico-watine/zurb-f6-boilerplate.git`

* `yarn`

* `bower install`

* Ensure 'External Server Address' is correct in 'config.codekit' file

### Notes
There is an invisible `.htaccess` file located in `/assets`. This `.htaccess` file **cannot** be deleted. It is auto imported into `/dist` and is necessary for autoversioning to function correctly
