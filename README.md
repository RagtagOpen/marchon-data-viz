# marchon-data-viz

Visualization of March On's Operation Marching Orders data

Here is a link to a preview for a current version of March On Comment webpage.
https://ragtagopen.github.io/marchon-data-viz/

## Installing Dependencies

1.  Install Node/NPM: If you're on a Mac running [Homebrew](https://brew.sh), run `brew install node` on the command line. Otherwise, [follow these instructions](https://www.npmjs.com/get-npm).
2.  Install Sass by running `npm -g install sass` on the command line.
3.  Install everything else by running `npm install` on the command line.

If you don't have Compass installed try `npm i compass`.  If your Grunt job still fails you can try another install method `sudo gem install compass -n /usr/local/bin`

## Compiling Assets with Grunt

In the root directory of the project run `grunt watch` on the command line. Any edits made to "assets/scss/app.scss" or one of the files in "assets/scss/base" will recompile "app.css" for you.

The configuration also supports Live Reload. Install one of [the browser extensions](http://livereload.com/extensions/) to have the page automatically refresh whenever an asset is recompiled.

