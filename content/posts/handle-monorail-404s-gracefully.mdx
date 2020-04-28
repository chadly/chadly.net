---
id: 8fe768c8-de26-5cc4-931a-40d099d76f20
title: Handle MonoRail 404s gracefully
description: How to handle 404s in the web framework that preceded ASP.NET MVC.
date: '2009-03-10'
twitterId: '1308416566'
redirect_from:
  - /post/2009/03/10/Custom-MonorailHttpHandlerFactory-to-handle-404s-gracefully.aspx
  - /custom-monorailhttphandlerfactory-to-handle-404s-gracefully
  - /2009/03/custom-monorailhttphandlerfactory-to-handle-404s-gracefully
  - /2009/03/handle-monorail-404s-gracefully
---

I need to display user-friendly 404 pages when a request is made for a controller that cannot be found. Monorail provides a built-in way to handle this. When faced with a request for a controller it cannot find, Monorail will look for a view named 404 in the rescues folder and render that. That is good enough for most people, I guess. It wasn't good enough for me. I needed my 404 view to use a layout (dynamically chosen based on some configuration settings) and to display some data.

To give you an example of what I am talking about, consider an ecommerce site.  When someone requests a page that doesn't exist, you would want to show them a friendly error page that shows some featured products - some products that the user might be interested in. We don't want to turn the user away or show a sparsely populated page when our poor, unsuspecting user types a wrong URL.

First of all, I set out to use a [custom rescue controller](http://justinram.wordpress.com/2009/01/09/monorail-custom-rescue-controller-irescuecontroller/) to solve all my problems.  Here is the relevant code:

```csharp
[Layout("Default")]
public class RescueController : SmartDispatcherController, IRescueController
{
    public void Rescue(Exception exception, IController controller, IControllerContext controllerContext)
    {
        if (Is404(exception))
        {
            Handle404();
            return;
        }

        RenderSharedView("rescues\general", true);
    }

    private bool Is404(Exception ex)
    {
        var httpEx = ex as HttpException;
        var mrEx = ex as MonoRailException;

        return (httpEx != null && httpEx.GetHttpCode() == 404)
            || (mrEx != null && mrEx.HttpStatusCode.GetValueOrDefault() == 404);
    }

    public void Handle404()
    {
        BindFeaturedProductsToView();

        Response.StatusCode = 404;
        Response.StatusDescription = "Not found";
        RenderSharedView("rescues\404");
    }

    private void BindFeaturedProductsToView()
    {
        /* bind some data to the view here */
    }
}
```

I then append this little attribute to all of my controllers (or to the base class that all of my controllers inherit from - if you happen to have one of those…):

```csharp
[Rescue(typeof(RescueController))]
```

That actually got me 90% of the way there. A request for an action that didn't exist on any controller would now be handled by my custom RescueController which could attach a layout and bind any necessary data that the 404 view needs.

## The Devil is in the Details
Back to the original problem of this post - I need to be able to show this same view (and render it with the same logic) when a request is made for a controller that does not exist. After digging through the Monorail source code a bit, and after a lot of trial and error, I eventually found a way to accomplish this. First of all, I had to make my `Handle404` method on `RescueController` public so that it could be accessible via a URL. Then I ended up sub-classing `MonoRailHttpHandlerFactory` to handle the case of a missing controller.

```csharp
public class CustomHttpHandlerFactory : MonoRailHttpHandlerFactory
{
    public override IHttpHandler GetHandler(HttpContext context, string requestType, string url, string pathTranslated)
    {
        IHttpHandler handler = base.GetHandler(context, requestType, url, pathTranslated);

        if (handler is NotFoundHandler)
        {
            //The default NotFoundHandler renders the 404 view in the
            //rescues folder if it finds one, otherwise it throws an exception.
            //We want to reuse our 404-handling logic in RescueController.
            context.RewritePath("~/rescue/handle404");
            return base.GetHandler(context, requestType, url, pathTranslated);
        }

        return handler;
    }
}
```

Note the use of `context.RewritePath`. This keeps the requested URL the same in the user's browser and simply reroutes the request internally to our RescueController. We don't want to just do a redirect to our `RescueController` as this would be very bad for SEO purposes. We want to send a 404 status code to the user when they request our missing page -- we just want to do it in a user-friendly way.

## Gotchas
Make sure you update your `web.config` to use this new handler instead of the default Monorail one. Also note that I am using routing to route `/rescue/handle404` to the `Handle404` action on `RescueController`.  If you were not using routing, you could change that URL to `~/rescue/handle404.castle` or `~/rescue/handle404.rails` depending on your configuration.  Overall, I like this solution very much. It is very DRY and accomplishes everything I wanted to accomplish.