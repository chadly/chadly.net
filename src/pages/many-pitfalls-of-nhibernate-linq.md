---
id: c748febf-03e7-5052-abc6-8641a0a3dead
title: The Many Pitfalls of NHibernate.Linq
date: '2009-08-26'
twitterId: '3562481113'
redirect_from:
  - /post/2009/08/26/The-Many-Pitfalls-of-NHibernateLinq.aspx
  - /the-many-pitfalls-of-nhibernate-linq
  - /2009/08/the-many-pitfalls-of-nhibernate-linq
---

Working with the [recently released NHibernate.Linq](/nhibernate-linq-1/) is not without its (many) pitfalls. In one of my current projects, we are using the specification pattern to build dynamic linq queries based off of persistable specification objects. This has led to more than one hair-pulling session on the limitations of the current NH Linq provider. For instance, did you know that this query will work just fine:

```csharp
(from p in db.Patients 
from r in p.PatientRecords 
where r.Type.TypeCode == 7 
select r).Sum(r => r.Amount);
```

yet, this query (which is equivalent) will blow up in your face:

```csharp
db.Patients.SelectMany(p => p.PatientRecords) 
    .Where(r => r.Type.TypeCode == 7).Sum(r => r.Amount);
```

The reason it fails is very implementation-specific. Under the covers, the C# compiler will convert that first query into an expression looking something like this:

```csharp
db.Patients.SelectMany(p => p.PatientRecords, (p, r) => new { p = p, r = r }) 
    .Where(pr => pr.r.Type.TypeCode == 7).Sum(pr => pr.r.Amount);
```

Our second query which uses the overload of `SelectMany` that doesn't specify the result selector fails because NHibernate.Linq specifically requires that result selector in order to know which alias to use for that subcriteria for the rest of the query (yes, this is a really bad implementation and requires that you use the same lambda parameter names throughout your query).

Simple enough, let's just drive around the pothole and explicitly state our parameter name by changing our second query to look like this:

```csharp
db.Patients.SelectMany(p => p.PatientRecords, (p, r) => r) 
    .Where(r => r.Type.TypeCode == 7).Sum(r => r.Amount);
```

Ahh, explosions still abound. That query will generate an error similar to: `Type is not an association` or `Could not resolve property: Type`.

It turns out,that NHibernate.Linq's `SelectMany` support depends on that anonymous type leading the entity types in the query (`pr.r` in the compiled first query). Without this leading anonymous type, the parser does not assign a subcriteria to that many-to-one traversal through `r.Type`. That is highly upsetting because the query that we are writing is actually more like this:

```csharp
db.Patients.SelectMany(p => p.PatientRecords, (p, r) => r) 
    .Where(specification.IsSatisfied()).Sum(r => r.Amount);
```

where `specification.IsSatisfied()` returns a dynamically generated `Expression<Func<PatientRecord, bool>>`. I can't rewrite those specifications to use some query-specific anonymous type and I shouldn't have to.

On a mission, I fired up the NHibernate.Linq source code and hacked away at it until this specific scenario was supported. There is still the limitation that you must use the second overload of `SelectMany` that accepts the result selector. There is no way of easily getting around that with the current implementation based off of the Criteria API. However, despite all of NHibernate.Linq's shortcomings, my specifications now work just fine (running some pretty complex queries).

If you are having similar frustrations, go grab the [latest trunk r1010](https://nhcontrib.svn.sourceforge.net/svnroot/nhcontrib/trunk/src/NHibernate.Linq/).

…until the next bug

P.S. I am very much looking forward to NH.Linq 2.0 using relinq and the new AST parser.