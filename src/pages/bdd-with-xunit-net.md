---
id: 964175c5-5180-503d-abbd-8d59ddb96369
title: BDD with xUnit.net
date: '2009-04-20'
redirect_from:
  - /post/2009/04/20/BDD-with-xUnit.aspx
  - /2009/04/bdd-with-xunit-net
---

I've been looking a lot into Behavior Driven Development lately as a better way to structure my TDD tests. If you’ve never heard of BDD, check here for [an intro](http://www.lostechies.com/blogs/sean_chambers/archive/2008/12/07/starting-with-bdd-vs-starting-with-tdd.aspx) (or here for [another good one](http://codebetter.com/blogs/ian_cooper/archive/2009/03/31/seizing-the-bdd-nettle.aspx)). What it boils down to is a way to organize and name your tests in a way that makes it explicit what it is – an executable specification for what the code under test _should_ do.

One particular quote that stood out in my mind when getting to know BDD was this:

> Language you use shapes how you think… and if you want to change how you think it can help to first change your language.

It is true in that just changing seemingly insignificant things like the language and syntax of your tests can affect how you think about your tests and ultimately how and what tests you end up writing.

I set out to find a solution to help me start writing BDD-style tests (ehh, I mean specs) in an existing project which already used xUnit.net. I really liked some of the things from [SpecUnit](http://code.google.com/p/specunit-net/), but I didn’t want to be tied to NUnit. I also found the [xUnit BDD Extensions](https://github.com/BjRo/xunitbddextensions) project but I took issue with some of the syntax with that. Also, it seemed to be trying to do too much. I just wanted simple BDD style integration with xUnit without any excess baggage.

One of the things I really like about xUnit (and the reason why I use it over MBUnit and NUnit) is its simplicity. It is clean, elegant, and efficient at what it does. It provides exactly what you need and nothing more. It also makes use of native C# semantics for its syntax. For instance, rather than relying on a `TestSetup` or `TestTearDown` attribute for a setup method to a test, it relies on C# constructors and the `IDisposable` interface to handle such things. When writing test cases with this syntax, it feels much more natural.

Anyway, I ended up finding this [BDD solution for xUnit](http://iridescence.no/post/Extending-xUnit-with-a-Custom-ObservationAttribute-for-BDD-Style-Testing.aspx) by Fredrik Kalseth. This was almost exactly what I was looking for, except that I didn't like having to override `InitializeContext` in my spec classes. I wanted to include the context in the constructor of the class like normal xUnit test classes.

Also, some of my current test code relies on test base classes for some of its functionality – and I didn't want to force my tests to inherit from a `Specification` class just to get BDD style testing done.

Last but not least, up until the latest 1.1 release of xUnit, the xunit.extensions assembly contained these nice .Net 3.5 extension methods for assertions in a very BDD style way. It allowed you to write code like this:

```csharp
customer.Email.ShouldEqual("test@example.com");
```

With the latest release, however, these extension methods were deemed unworthy and moved to the xUnit Samples project. Boo I say to you. I want, neigh, _need_ these extension methods back.

Long story short, I ended up taking elements from all three of these solutions along with the extension methods from the samples project and created my own. I present to you [Chad’s version of xUnit BDD Extensions](https://github.com/chadly/xUnit-BDD-Extensions).

Some of the design goals of this project:

* Use natural C# constructs to control things such as BDD contexts and concerns. For example, the context of the specification is defined in the class constructor and the concern for the fixture is defined by its namespace.

* Don't force me to inherit from any base class to get BDD style tests working. There is an interface `ISpecification` with one method `Observe()` to accomplish this. A `Specification` base class is also provided for convenience.

For completeness, I am including the cliché BDD example of an account transfer fixture using this framework.

```csharp
namespace Banking.Specs.FundsTransferSpecs
{
    public abstract class behaves_like_bank_account_transfer : Specification
    {
        protected readonly Account fromAccount;
        protected readonly Account toAccount;

        public behaves_like_bank_account_transfer()
        {
            fromAccount = new Account { Balance = 1m };
            toAccount = new Account { Balance = 1m };
        }
    }

    public class when_transferring_between_two_accounts
        : behaves_like_bank_account_transfer
    {
        protected override void Observe()
        {
            fromAccount.Transfer(1m, toAccount);
        }

        [Observation]
        public void should_debit_the_from_account_by_the_amount_transferred()
        {
            fromAccount.Balance.ShouldEqual(0m);
        }

        [Observation]
        public void should_credit_the_to_account_by_the_amount_transferred()
        {
            toAccount.Balance.ShouldEqual(2m);
        }
    }

    public class when_transfering_amount_greater_than_balance_of_from_account
        : behaves_like_bank_account_transfer
    {
        private Exception exception;

        protected override void Observe()
        {
            exception = ((MethodThatThrows)delegate
            {
                fromAccount.Transfer(2m, toAccount);
            })
            .GetException();
        }

        [Observation]
        public void should_not_allow_the_transfer()
        {
            exception.ShouldNotBeNull();
        }

        [Observation]
        public void should_raise_argument_out_of_range_exception()
        {
            exception.ShouldBeType<ArgumentOutOfRangeException>();
        }
    }
}

namespace Banking
{
    public class Account
    {
        public decimal Balance { get; set; }

        public void Transfer(decimal amount, Account toAccount)
        {
            if (amount > Balance)
            {
                throw new ArgumentOutOfRangeException("amount", amount,
                    String.Format(@"Cannot transfer ${0}.
                        The available balance is ${1}.", amount, Balance));
            }

            Balance -= amount;
            toAccount.Balance += amount;
        }
    }
}
```

Note the use of the namespace `Banking.Specs.FundsTransferSpecs` to denote the current concern – funds transfer.  Also note the use of how easily it is to reuse context setup code via constructor overrides. It's nothing new as far as BDD goes, it just puts a nicer xUnit-style syntax on it.

It is a very simple project. All credit goes to the authors of the previous three solutions. I just cobbled together the best (at least what I think is the best) of those solutions.

The code for this (in cased you missed it before) can be found on the [BDD Extensions project on Github](https://github.com/chadly/xUnit-BDD-Extensions).