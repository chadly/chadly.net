---
id: e94cf2f8-6941-44b3-b1d4-f6cdc2cfcbbd
title: Creating NHibernate Linq Query from Criteria
created: 2009-10-30
template: layout.hbs
rtemplate: post.jsx
redirects:
  - /post/2009/10/30/Creating-NHibernate-Linq-Query-from-arbitrary-Criteria.aspx
  - /creating-nhibernate-linq-query-from-arbitrary-criteria/
  - /2009/10/creating-nhibernate-linq-query-from-arbitrary-criteria/
---

I just added this gem to NHibernate.Linq (of the NHContrib variety – not to be confused with [that other one](http://blogs.imeta.co.uk/sstrong/archive/2009/10/22/791.aspx)). I’ll let the test speak for itself:

```cs
[Test]
public void can_create_linq_query_from_arbitrary_criteria_query()
{
    var criteria = session.CreateCriteria<User>();
    criteria.Add(Restrictions.Le("RegisteredAt", new DateTime(2000, 1, 1)));

    var query = session.Linq<User>(criteria)
        .Where(u => u.Name == "nhibernate" || u.Name == "ayende");

    var list = query.ToList();
    Assert.AreEqual(1, list.Count);
    Assert.AreEqual("nhibernate", list.Single().Name);
}
```

My specific reason for adding this has to do with a custom `ICriterion` (more on that later) I needed to use in one of our criteria queries that I wanted to expose as an `IQueryable`. This method of being able to build a linq query from an arbitrary criteria seemed to solve my problem rather elegantly.

Let me know if you think this is crazy or if you like.

As of now, it is available in the trunk r1099.