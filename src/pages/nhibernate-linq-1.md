---
id: cf479780-33d2-5d4b-b52f-2d2e1dbc375e
title: NHibernate.Linq 1.0 is out and about!
date: '2009-07-27'
twitterId: '2874398512'
redirect_from:
  - /post/2009/07/27/NHibernateLinq-10-is-out-and-about.aspx
  - /nhibernate-linq-1-0-is-out-and-about
  - /2009/07/nhibernate-linq-1-0-is-out-and-about
---

In case you haven't heard, NHibernate.Linq v1.0 has been released. This has been a long time in the making and Tuna has put the final touches on it to make it possible. You can get the binaries from the [NHibernate download area](http://sourceforge.net/projects/nhibernate/files/).

Here are some informal release notes:

The implementation uses the NHibernate Criteria API under the covers, so anything it doesn't support, NH.Linq won't support. Other things were just too hard to implement using the Criteria API. Some major things this includes are group joins, subqueries in select clauses, and groupby.

However, despite that, limited subqueries are supported in the where clause. Namely, using `Count`, `Sum`, `Max`, `Min`, `Avg`, and `Any` methods. You can also use `SelectMany` queries (rather than `GroupJoin`) to do queries like this:

```csharp
from o in db.Orders
from ol in o.LineItems
where ol.Price > 10
select o;
```

or this:

```csharp
from o in db.Orders
where o.LineItems.Any(ol => ol.Price > 10)
select o;
```

All in all, it is a tried and tested implementation. It has been used on number of projects in production for two years now. As long as you know where the pitfalls are and how to avoid them, it is a useful addition to your NH toolkit.

Now, if you are saying to yourself, "well, that sucks, I really wanted to use `GroupJoin` and I want to nest other queries in my select clause." Fear not, this is where [Steve Strong](http://blogs.imeta.co.uk/sstrong/archive/2009/06/11/708.aspx) and the [re-linq guys](http://www.re-motion.org/) come in to save the day. Steve has done <span class="correction">a lot of</span> all of the work on porting over the current HQL parser that is active in NHibernate 2.1. The new linq implementation will interact with it natively (rather than use the Criteria API as an intermediary). The current implementation has pretty much reached its upper limit on what it can do – limited by what the Criteria API can do. The new implementation has much more grandiose plans than the current release. It is the future, but, as most of us live in the present, [this release is now](http://sourceforge.net/projects/nhibernate/files/NHibernate/2.1.0.GA/NHibernate.Linq-1.0.0.GA-bin.zip/download).

For all intents and purposes, consider this a stopgap release. Again, that doesn’t mean it's not capable – just don’t expect major new features from this implementation.

Thanks to [Tuna](https://github.com/tunatoksoz) and [Oren](http://ayende.com/) for pushing this release out the door.