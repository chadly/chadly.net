---
id: 25161217-87af-5368-b95d-70ffb5569388
title: Publishing a React Component to npm
description: Learning to publish compiled code to npm like a noob.
date: '2015-04-25'
redirect_from:
  - /2015/04/publishing-react-to-npm
  - /2015/04/publishing-a-react-component-to-npm
---

I recently had the need to publish a [React](http://facebook.github.io/react/) component to [npm](https://www.npmjs.com/) and had trouble finding any best practices on the subject. So, I decided to make some up. The ideas here can really be applied to any npm package targeted at a browser environment, but I'm dealing with React specifically.

If you want to see the code for a component doing everything that is described here, checkout my [react-bs-notifier repo](https://github.com/chadly/react-bs-notifier) on GitHub.

## Publishing to npm

Evan Hahn has a good article on the technical details of [how to make an npm baby](http://evanhahn.com/make-an-npm-baby/). Go read that if you are a noob (like I was).

## Dealing with your `JSX`

When you are publishing a React component, you are probably using [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) to build your component. `JSX` compiles to javascript, but node won't be able to `require` it by default unless the consumer of your package does something to support it. You, as the component author, should strive to make it as easy as possible for someone to use your package. They should be able to just `npm install`, `require` your package, and be on their merry way through their own code again. Nobody wants to sit and have to figure out / debug someone else's code if they don't have to.

### Option 1

If someone is using your React component with npm, they are most likely packaging up their scripts with [browserify](http://browserify.org/). If that is true, they are also probably using [reactify](https://github.com/andreypopp/reactify) to transform their `JSX` into vanilla javascript. In that case, their build step should pick up your `JSX` as well and compile it just fine. Easy enough, [except...](https://github.com/andreypopp/reactify#code-in-3rd-party-packages-isnt-being-transformed-by-reactify)

> By default Browserify applies transforms only for modules in the current package. That means that if there are modules with JSX in packages in `node_modules/` directory then browserify will throw SyntaxError left and right even if you are using reactify.

There is an easy fix for this. Browserify will look in a component's `package.json` and try to find any transform options for that component. We just need to let browserify know in our component's `package.json` that it should use reactify for transformation.

```json
"browserify": {
  "transform": ["reactify"]
}
```

### Option 2

But what if your consumer isn't using browserify. What if they are using [webpack](http://webpack.github.io/)? What if they are a total hipster and using something you never even heard of?

Call me old fashioned, but I think if your package is in npm, it should already be compiled down to javascript from whatever language your source is in ([JSX](https://facebook.github.io/react/docs/jsx-in-depth.html), [CoffeeScript](http://coffeescript.org/), [TypeScript](http://www.typescriptlang.org/), whatever). It is the easiest option for your consumer.

One thing Evan doesn't talk about in [his post](http://evanhahn.com/make-an-npm-baby/) which is very useful for this particular scenario is the [npm prepublish step](https://docs.npmjs.com/misc/scripts). It is a script which npm will automatically run before you publish your package. For a react component, to compile JSX:

```json
"scripts": {
  "build": "jsx main.jsx > main.js",
  "prepublish": "npm run build"
}
```

Assuming you ran `npm install react-tools --save-dev` in your package (to get the `jsx` binary), you can now run `npm run build` in your package to compile to JS at any time. That command will also automatically be run before you publish to npm.

Now that you have your JSX compiling automatically, you probably don't want to commit the output of that build script to source control. You will want to add it to your `.gitignore`:

```
node_modules
main.js
```

But, npm will use the `.gitignore` to decide which things to publish. You _want_ the compiled js file to go to npm but not to source control. Luckily, you can add an [`.npmignore` file](https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package) to deal with this exact situation:

```
*.jsx
```

Yeah, not much to that. It is pretty much the opposite of your `.gitignore`. JSX source is in your repo; compiled JS in the published package.

## Market your component

To make your component more discoverable, [fill in the `description` and `keywords` fields](http://browsenpm.org/package.json) in your `package.json`. Make sure to include the `react-component` keyword in order to get your component to show up on [react-components.com](http://react-components.com/).

## Profit?

Now that your open source component is available on npm for all to easily use, sit back, relax & wait for the benjamins to come rolling in.