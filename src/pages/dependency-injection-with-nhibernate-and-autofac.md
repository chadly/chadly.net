---
id: 256ee2a2-a2a4-563f-ab43-61684c707701
title: Dependency Injection with NHibernate and Autofac
date: '2009-05-28'
redirect_from:
  - /post/2009/05/28/Dependency-Injection-with-NHibernate-and-Autofac.aspx
  - /2009/05/dependency-injection-with-nhibernate-and-autofac
  - /2009/05/dependency-injection-with-nhi
---

[Fabio](http://fabiomaulo.blogspot.com) just recently committed changes to NHibernate which centralize all of NHibernate’s `Activator.CreateInstance` calls to an `IObjectsFactory` instance. This is exciting because this gives us an opportunity to provide dependency injection services to all of those NHibernate-specific infrastructure types (IUserType, etc.).

To give you a concrete example of what I am talking about, check back to [Ayende’s EncryptedStringUserType](http://ayende.com/Blog/archive/2008/07/31/Entities-dependencies-best-practices.aspx). Rather than getting an instance of `ICryptoProvider` via a singleton accessor, it is now possible to have NHibernate inject the `ICryptoProvider` dependency through the constructor. This is very valuable in cases where the `ICryptoProvider` has other dependencies or has some parameters that need to come from configuration. You get full support from the container for that.

Fabio wrote up a post describing the [implementations for Castle and Spring](http://fabiomaulo.blogspot.com/2009/05/nhibernate-ioc-integration.html). So, I thought I'd follow suit with an implementation for my new favorite container, [Autofac](http://code.google.com/p/autofac/) (why it is my new favorite container will be a topic for another post).

To use it, make sure you are using the latest trunk of NHibernate.  Then, just add a reference in your project to `Autofac.Integration.NHibernate`. At this time, the only way to configure the `BytecodeProvider` is programmatically. So, **BEFORE** you call `new NHibernate.Cfg.Configuration().Configure()`, you need to set the `BytecodeProvider` to the `AutofacBytecodeProvider`.

```csharp
containerProvider = new ContainerProvider(builder.Build());

Environment.BytecodeProvider = new AutofacBytecodeProvider(
    containerProvider.ApplicationContainer, new ProxyFactoryFactory());
```

Then just enjoy the DI goodness integrated with NHibernate. If any type NHibernate needs is not registered with the container, it will fall back to creating the type with `Activator.CreateInstance`.

~~The code can be found here.  I am going to contact the Autofac guys and see about putting this into the Autofac.Contrib project.~~

<div class="alert alert-warning">
<i class="fa fa-exclamation-circle" title="Update"></i>

This is now included in the [Autofac.Contrib project](http://code.google.com/p/autofac/downloads/list) – [check it out here](http://code.google.com/p/autofac/source/browse/#svn/trunk/contrib/Source/AutofacContrib.NHibernate).

</div>