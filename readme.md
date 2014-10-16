# Personal Website

Built with [Bootstrap](http://getbootstrap.com/) and [Wintersmith](https://github.com/jnordberg/wintersmith).

[Read a full introduction](http://chadly.net/2013/12/automate-all-the-things-with-wercker/) to how this site is built & deployed.

## How to run

Note: you will need [bower](http://bower.io/) and [grunt-cli](http://gruntjs.com/getting-started) installed to install and build web assets. Install them if you don't already have them:

```bash
npm install grunt-cli bower -g
```

From the project directory, install dependencies using npm:

```bash
npm install
```

Then build the web assets and preview the site:

```bash
grunt dev
```

This will spin up a server running at `localhost:8080`. The preview server uses `dev.json` for configuration.

## Changing the Site Theme

The site uses [Bootstrap](http://getbootstrap.com/) in combination with [Bootswatch](http://bootswatch.com/) for theming. Both are pulled in via [Bower](http://bower.io/). If you see a bootswatch theme you like and you want to switch the site to use that theme, simply change the relevant lines in `gruntfile.js`:

```js
bootswatch: {
	expand: true,
	cwd: "bower_components/bootswatch/darkly/",
	src: ["*.less"],
	dest: "contents/vendor/bootswatch/"
}
```

These lines tell grunt which bootswatch theme to copy to the vendor folder. Change `darkly` to whatever other theme you want to try.

## How to Build

In order to build the site to deploy to a static hosting provider, just run:

```bash
grunt dist
```

and copy the contents of `/build` to your provider. The `dist` task uses `prod.json` to configure the Wintersmith build.

## License

All `.md` files (post contents) are licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/deed.en_US). Everything else is MIT Licensed.

#### The MIT License (MIT)

Copyright &copy; 2013 William Chad Lee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
