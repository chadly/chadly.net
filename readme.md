# Personal Website

> Built with [Bootstrap](http://getbootstrap.com/) and [Metalsmith](http://www.metalsmith.io/).

## TODO

* Fix permalinks (using title rather than folder name)
* resume ([use this](https://github.com/hacksalot/HackMyResume), why not?)
* get rid of grunt
* Use [cleanblog template](https://github.com/BlackrockDigital/startbootstrap-clean-blog)

## How to Use

### Running Locally

From the project directory, install dependencies using npm:

```
npm install
```

Then build the web assets and preview the site:

```
npm start
```

This will spin up a server running at `localhost:8080`. The preview server uses `site.dev.json` for configuration.

### Building for Deployment

In order to build the site to deploy to a static hosting provider, just run:

```
npm run dist
```

and copy the contents of `/build` to your provider. The `dist` task merges `site.dev.json` & `site.prod.json` to configure Metalsmith metadata.

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
