#simple

Simple is a static blog generator with a single static page. You can write you blog online, and it will generate static html files at your repo named `username.github.io` which is supported by [github pages](https://pages.github.com)

##Demo

[simple](http://isnowfy.github.io/simple)

[blog demo](http://isnowfy.github.io/)

[lightweight markdown editor](http://isnowfy.github.io/simple/editor.html)

##Usage

With simple and github pages you can easily create your static blog. Here is what you need to do.

1. Create github account.
2. Create a repo named `your_user_name.github.io` (remember to check `Initilize and create README`).
3. Sign in [simple](http://isnowfy.github.io/simple) with your github account.
4. Click `Initilize` to set up basic file for your static blog site.
5. Click `Go` and start writing.

![simple](http://isnowfy.github.io/img/Simple.png)

If you want use your own custom domain, you can modify the `CNAME` file.(see [here](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages)).

If you want use disqus comment system, you can modify the `main.json` file, and change `disqus_shortname=""` to `disqus_shortname="your_shortname"`.

##Features

* Simple, no backend need
* Static blog
* Markdown editor
* Code highlight support
* Tex formula support

##Custom

The template files are at `/src/template`, so you can modify the template files and css files. If you want use your own theme you can clone the project, modify the template files and push the entire `src` folder in your `gh-pages` branch which will allow you generate your own static blog.

##Todo

Search, Sitemap, Rss

##License

MIT licensed.
