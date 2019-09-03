# chadly.net

> Personal blog powered by [Gatsby](https://www.gatsbyjs.org/)

## Running Locally

Run the following in a terminal:

```
npm install
npm start
```

This will start the gatsby development server at `localhost:8000`.

### Windows Machine

If you are running Windows and you get errors when installing dependencies, make sure to globally install the [Windows Build Tools](https://github.com/felixrieseberg/windows-build-tools):

```
npm install --global windows-build-tools
```

This will set Python & C++ up on your machine to compile some native node modules that are in the dependency tree for this project. Also, make sure you are running the latest version of `npm`:

```
npm install npm -g
```

### Webmentions

If you want to load webmentions while running locally, be sure to set the environment variable `WEBMENTIONS_TOKEN`. You can do that by creating a `.env` file with the contents:

```
WEBMENTIONS_TOKEN=my_token
```
