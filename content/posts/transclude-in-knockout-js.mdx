---
id: bd2bc27d-b9b3-5059-bc75-9dea327215e6
title: A Poor Man's Transclude in Knockout.js
description: Trying to make Knockout a little more like Angular.
date: '2013-12-13'
redirect_from:
  - /a-poor-mans-transclude-in-knockout-js
  - /2013/12/a-poor-mans-transclude-in-knockout-js
  - /2013/12/a-poor-man-s-transclude-in-knockout-js
---

If you've ever used [angular.js](http://angularjs.org/), you might have come across the transclude feature. From the [angular.js docs](http://docs.angularjs.org/guide/directive#creating-custom-directives_demo_creating-a-directive-that-wraps-other-elements):

> Transclude makes the contents of a directive with this option have access to the scope outside of the directive rather than inside.

This allows you to create directives that wrap other elements. e.g., if you have a small tooltip component with a bunch of boilerplate markup, you can abstract that away into a directive.

```html
<div class="tooltip">
	<div class="inner-thing">
    	<i class="icon"></i>
        <div class="content">
        	--SOME DYNAMIC CONTENT--
        </div>
    </div>
</div>
```

That is a lot of boilerplate to include if you want a bunch of tooltips on a page. With angular, you can create a custom element that will abstract this away. The problem is, you want your `--SOME DYNAMIC CONTENT--` to bind against the outer scope, not the isolated scope of your directive. This is where angular's transclude comes in. It will bind the dynamic content against the scope where the directive is being used and pass that result to the directive allowing the directive to use it but still keep its own isolated scope.

After you create your awesome little directive, you can then do something like this:

```html
<my-tooltip>
	--SOME DYNAMIC CONTENT--
</my-tooltip>
```

If this doesn't make sense, I encourage you to read the newly updated (and much better than it used to be) [angular.js docs](http://docs.angularjs.org/guide/directive#creating-custom-directives_demo_creating-a-directive-that-wraps-other-elements) on this.

### Transclude in Knockout.js

Anyway, in [knockout.js](http://knockoutjs.com/), which is the library we are using on one of my projects, there is no such thing as transclude. You can still abstract away components like this, but you would do it with a binding handler.

```html
<div data-bind="myTooltip: 'unique-name'">
	--SOME DYNAMIC CONTENT--
</div>
```

Not as nice of a syntax, but it still gets us there (see below for why we need to pass `unique-name`). The problem is that the `--SOME DYNAMIC CONTENT--`, if you just include it in your template, will _not_ bind against the original model (which is what we want). The trick is to treat the inner html of our element as another template and bind it manually in our binding handler to the original model.

```javascript
ko.bindingHandlers.myTooltip = {
	init: function (element) {
		//let knockout know that we'll manually bind the child HTML of our element
		return { controlsDescendantBindings: true };
	},
	updated: function (element, valueAccessor, allBindingsAccessor, model) {
		//get a unique template name from the caller
		var name = ko.utils.unwrapObservable(valueAccessor());

		//populate a knockout template with our inner HTML
		ko.templates[name] = $(element).html();
		
		//render our tooltip template like normal passing a new viewmodel
		//with our inner template name and the original viewmodel it should be bound against
		ko.renderTemplate("knockout-tippy-main", {
			name: name,
			model: model
		}, null, element, "replaceNode");
	}
};

//in the real world, this can be included in an external HTML file
//see https://github.com/ArchonInfoSys/knockout-require-templates
ko.templates["knockout-tippy-main"] =
	'<div class="tooltip">' +
		'<div class="inner-thing">' + 
    			'<i class="icon"></i>' +
        		'<div class="content" data-bind="template: { name: name, data: model }">' +
        		'</div>' +
    		'</div>' +
	'</div>';
```

The key parts of this binding handler are:

1. Making use of the lesser known fourth parameter of the update function - the original view model being used where this handler is being called from
2. Using the inner HTML of our element as a new template and binding that template with the original view model

This could probably be abstracted into a separate component that provides this service, but I think it works better as just a reference example. In the end, I think it is an easy technique to get some really nice functionality.