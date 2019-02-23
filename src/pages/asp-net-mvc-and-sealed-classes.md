---
id: af624e87-a849-51f6-9dbe-fdb2036fd2f8
title: Asp.Net MVC and Sealed Classes
date: '2009-03-14'
redirect_from:
  - /post/2009/03/14/AspNet-MVC-and-Sealed-Classes.aspx
  - /2009/03/asp-net-mvc-and-sealed-classes
---

I just created a project from the Asp.Net MVC default template (yes, I am a little late to this game – sorry, I have been living happily with Monorail) and ran across this in the `AccountController` class:

> The FormsAuthentication type is sealed and contains static members, so it is difficult to unit test code that calls its members. The interface and helper class below demonstrate how to create an abstract wrapper around such a type in order to make the AccountController code unit testable.

Ha, after experiencing the pain so many times in so many ways running into these sealed / internal classes when trying to unit test, I find it somewhat satisfying to see MS have to workaround their own issues.

I am just glad that it seems like the paradigm is finally shifting at Microsoft and that maybe, just maybe, we’ll start to see less internal sealed classes and more unit testable frameworks (unit testable from my – the user’s – point of view).