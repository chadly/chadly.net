---
id: 577777ee-5b8a-4e4b-8488-8e24d85af7ab
title: Configuring Beyond Compare 3 with Git
date: 2014-05-29
template: post.hbs
nav: blog
redirects:
  - /2014/05/git-bcompare/
---

<div class="alert alert-warning">
	<strong>Update:</strong>
	[See updated post for Beyond Compare 4](/2016/09/git-bcompare/).
</div>

[Beyond Compare](http://www.scootersoftware.com/) has been my [favorite comparison tool for a while now](/2009/04/tortoise-svn-settings-for-beyond-compare-3/). It is cross-platform and makes diffs and 3-way merges very easy to understand and visualize.

### [Git for Linux](http://www.scootersoftware.com/support.php?zz=kb_vcs#gitlinux)

To get it working on any linux flavor is pretty straight forward. Run these commands from terminal:

```bash
git config --global diff.tool bc3
git config --global difftool.prompt false
git config --global difftool.bc3 trustExitCode true

git config --global merge.tool bc3
git config --global mergetool.bc3 trustExitCode true
```

### [Git for Windows](http://www.scootersoftware.com/support.php?zz=kb_vcs#gitwindows)

On Windows, it is a little more work. In addition to the above, you need to tell git the path to `bcomp.exe`:

```bash
git config --global difftool.bc3.path "c:/program files (x86)/beyond compare 3/BCompare.exe"
git config --global mergetool.bc3.path "c:/program files (x86)/beyond compare 3/bcomp.exe"
```

The reason I am using `BCompare.exe` for the difftool instead of `bcomp.exe` is [described here](http://stackoverflow.com/a/13637243/316108). When using the new `--dir-diff` option of the `git difftool` command:

```bash
git difftool 4e560^^ --dir-diff
#4e560 is your commit hash that you want to show a whole directory-diff on in BC
```

Beyond Compare [has a bug](http://theo.im/blog/2012/10/27/directory-comparison-for-git-difftool/) that is not fixed as of v3.3.12 where you need to employ this workaround. If you don't do it, `bcomp.exe` will exit too early, and no files will be available to diff while you are viewing the directory diff.

Hopefully, this will be fixed in BC4.

### Using It

Once you have it setup, you can easily run

```bash
git difftool path/to/my/file.js
```

in your working copy to show unstaged changes. If you want to see a diff of the whole directory, you can run:

```bash
git difftool --dir-diff
```

which opens BC's directory comparison which can't be beat IMO.

To resolve merge conflicts:

```bash
git mergetool
```

That will cycle through each merge conflict in the working copy and as long as you save the file from BC, the conflict will be marked resolved by git (hence the `mergetool.bc3 trustExitCode` setting).
