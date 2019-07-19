---
id: b5203ae6-7fb8-5a93-81d7-4c1d297ce3fc
title: Lazy Loading an Observable Array with Knockout JS
date: '2012-09-12'
twitterId: '246084928851292160'
redirect_from:
  - /lazy-loading-an-observable-array-with-knockout-js
  - /2012/09/lazy-loading-an-observable-array-with-knockout-js
---

I recently had the need to lazy load a list of items using Knockout JS. Luckily, this problem [has already been solved](http://www.knockmeout.net/2011/06/lazy-loading-observable-in-knockoutjs.html)…mostly. I suggest you go read that post for the concept behind how lazy loading with Knockout works in general.

The part that was missing from that implementation for me was the Knockout array methods that are usually on an `observableArray`. E.g., when you do this using the code from the aforementioned post:

```javascript
this.lazyItems = ko.lazyObservable(function() {
    $.post("/get/some/json", function(data) {
        //where data is an array of items
        this.lazyItems(data);
    });
}, this);

//...... somewhere else far away ......
this.lazyItems.push(myNewItem);
```

You will get an error saying push is undefined on your lazy observable. The problem lies in the fact that `ko.lazyObservable` is returning a computed observable that wraps another observable with some lazy loading behavior. The computed observable that is returned has none of the knockout methods for manipulating arrays. Even if we simply update the inner value to be an `observableArray` rather than a plain observable within the `lazyObservable`, we are still never exposing that object. It is safely tucked away as a private variable in our `lazyObservable`.

To make a long story short, I ended up adding another lazy method, `lazyObservableArray` which exposes all of the underlying knockout methods for manipulating arrays.

```javascript
define(["knockout"], function (ko) {
    //http://www.knockmeout.net/2011/06/lazy-loading-observable-in-knockoutjs.html

    ko.lazyObservable = function (callback, context) {
        var value = ko.observable();
        return lazyComputed(callback, value, context);
    };

    ko.lazyObservableArray = function (callback, context) {
        var value = ko.observableArray();

        var result = lazyComputed(callback, value, context);

        //add underlying array methods onto computed observable
        ko.utils.arrayForEach(["remove", "removeAll", "destroy", "destroyAll", "indexOf", "replace", "pop", "push", "reverse", "shift", "sort", "splice", "unshift", "slice"], function (methodName) {
            result[methodName] = function () {
                value[methodName].apply(value, arguments);
            };
        });

        return result;
    };

    function lazyComputed(callback, value, context) {
        var result = ko.computed({
            read: function () {
                //if it has not been loaded, execute the supplied function
                if (!result.loaded()) {
                    callback.call(context);
                }
                //always return the current value
                return value();
            },
            write: function (newValue) {
                //indicate that the value is now loaded and set it
                result.loaded(true);
                value(newValue);
            },
            deferEvaluation: true  //do not evaluate immediately when created
        });

        //expose the current state, which can be bound against
        result.loaded = ko.observable();

        //load it again
        result.refresh = function () {
            result.loaded(false);
        };

        return result;
    }
});
```

That technique for delegating calls to an underlying object I stole directly from the knockout source code since that is how it does some of its magic with `observableArray` methods.

Using this new method, we can now run our previous code with a `lazyObservableArray` and happily push, pop, remove or do whatever we want to our array without fear of undefined functions.