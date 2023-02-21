# Fizzy Jam

Fizzy Jam is an out-of-the-box jamstack web app practice.

It's much more than a starter. 😉

> If you happen to encounter [the Fizzy Theme][the Fizzy Theme], a legacy project built solely for Ghost or another tweaked version for Gridea, you may find this project more independent in terms of JAMStack.

## 🤔 Philosophy

1. Everything lives in a git repo. This means you can host the site on GitHub, rather than paying monthly fees for web servers and database.
2. An user-friendly yet pre-configured CMS. This allows you to focus on creating wonderful content, not the architecture or code. (you may also use the CMS offline, then push the static site to Github manually to activate CI)
3. Decoupled everywhere. Customize the site is fun by adding micro-services.

## Live Demo

* Netlify: [https://fizzy-jam.netlify.app/](https://fizzy-jam.netlify.app/)
* CloudFlare: [https://fizzy-jam.pages.dev/](https://fizzy-jam.pages.dev/)
* Vercel: [https://fizzy-jam.vercel.app/](https://fizzy-jam.vercel.app/)

## Deployment
### One-click Deployment
Deployment to a serverless platform like Netlify, CloudFlare and Vercel is pretty straightforward. By clicking the following one-click deploy buttons, a cloned repository will be created in your GitHub account and then deployed by the platform.

Enjoy blogging!

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/huangyuzhang/Fizzy-Jam/ "Deploy to Netlify")

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/huangyuzhang/Fizzy-Jam/ "Deploy to CLoudFlare")

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/huangyuzhang/Fizzy-Jam/ "Deploy to Vercel")
### Local Deployment for Developers
For developers who intent to modify the theme or to contribute to this project, use the following commands:

Branches:
* `main`: official branch with latest updates
* `dev`: the intermediate branch between your modification branch and the `main` branch
* `local`: uses local backend, so you can test the admin panel without login
* `demo`: for demo site, can be neglected

1. Clone this repository with all branches
   ```shell
   git clone https://github.com/huangyuzhang/Fizzy-Jam.git
   ```
2. Navigate to the directory
   ```shell
   cd Fizzy-Jam
   ```
3. Install dependencies
   ```shell
   npm install
   ```
4. Switch to other branches
   ```shell
   git checkout local

   git checkout dev
   ```
5. Run locally for testing (this will boot up a Browsersync web server to apply changes and refresh automatically)
   ```shell
   npm run local
   ```
6. Build for production
   ```shell
   npm run build
   ```

🔔 To keep your forked/cloned repository up-to-date, you may set this repository as the upstream of your project:
```shell
git remote add upstream https://github.com/huangyuzhang/Fizzy-Jam.git
```
ref: [Update a Forked GitHub Repository](https://fizzy.cc/update-a-forked-repository/)


## 🍹 Features & Usage

### Backend Configuration
Skip this section if you prefer to create content locally.

Since Netlify CMS supports two backend options, you may choose one that suits your site, see detail in [`src/admin/config.yml`](src/admin/config.yml).

### LOGO & ICON

LOGO elements will be shown by the following priority:
1. **LOGO**: if the site LOGO is uploaded;
2. **ICON + Site Name**: if the site ICON is uploaded;
3. **Site Name**: if site name is defined.

> customization: `src/_includes/partial/header.njk`

### Coloring

There are 2 main coloring variables used throughout the site (i.e. `main-color` & `link-color-hover`), you can change them that suits your style.

> customization: `src/static/css/components/_variables.scss`
> ```scss
> $main-color:#C668B9;
> $link-color-hover:#538FCD;
> ```

### Routing

By default, Eleventy will generate HTML files based on the file structure in the `src` folder. That is, all entries inside `src/collections/post/` folder will be generated to `_site/post/`. So posts can be viewed at `www.yourdomain.com/post/post-slug/index.html`.

> customization: `src/collections/<collection_name>/files.md`

However, you may define `permalink` in the frontmatter of each post or in `<collection_name>.json` for all files within the same folder. For example, in this project, posts are stored in `src/collections/post`. So we can define all posts permalink as `"permalink": "post/{{ slug }}/index.html"` by using `post.json` in the same folder.

> customization: `src/collections/<collection_name>/<collection_name>.json`

### Homepage
Between the header section and footer section of the page, the homepage contains a carousel showcase(TODO) at top, following by a list with latest N of posts.

The default number of posts shown on each page is 10, edit "pagination: size:" in `src/index.njk` to change this.

### Collection Entry Pages

* **Single Author**: Customize the author page by populate name, avatar, background image, social account links, location and bio.
* **Single Tag**: Contains the tag meta info and the posts with such tag.
* **Single Post**: The post page.


### Single Pages
Page is one type of collections. All pages are stored in the `src/page/` folder. You need to edit the `permalink`s for each page to customize their URL.

There are several layouts you can choose from:
* `single-page`: the post-like page, e.g. /about/
* `list-post`: post listing page, e.g. /post/
* `archive`: post archive page, e.g. /archives/
* `list-tag`: tag listing page, e.g. /tag/
* `list-author`: author listing page, e.g. /author/

> The `single-page` layout is sufficient for most of the time. However, you can always build your own layout for other purpose. 
> PRs are welcome!

### Primary Tag

The first tag will be treated as the "primary tag" in display.

### Primary Author

The first author will be treated as the "primary author" in display.

### LaTeX Support

KaTeX is used to support block LaTeX. Write the LaTeX equation directly into the post content, surrounded by two dollar signs:

```
Write equation like this: $$ e = mc^2 $$.
```

Then it will be rendered as:

$$ e = mc^2 $$

### Table of Content

By turning on the "Table of Content" option on post editing page, a TOC (generate based on the H2 & H3 titles) will be shown on the right of the post content. Table of Content is not available on mobile devices. 

### Code Highlight

Block code highlight is powered by Prism.js.

### Site Settings

Manually change site level settings.

#### Navigation
Add or remove items for the navbar or the footer area (coming soon!).

#### Settings
* **Site Meta**: Site Name, LOGO, ICON, description, footer info ...
* **Post Listing**: showFeatureImage, featureText
* **SEO Settings**: SEO title, Keywords
* **Appearance**: main color, link hover color ...
* **Components**: author box, code line numbers ...

### Comment System
TODO

### Other Features
1. Open external links in new pages.
2. Image Lazy Loading

## Project Structure

```shell
.
├─ 📜 package.json         # Project Configuration
├─ 📜 .eleventy.js         # Eleventy Configuration
├─ 📂 _site                # output dir
└─ 📂 src                  # input dir
   ├─ 📂 _data             # global data files (.yaml)
   ├─ 📂 _includes         # templates
   │  ├─ 📂 layouts        # page layouts (.njk)
   │  └─ 📂 partials       # reusable component parts (.njk)
   ├─ 📂 admin             # Netlify CMS admin & config.yml
   ├─ 📂 collections       # folder collections
   │  ├─ 📂 author
   │  │  ├─ 📜 *.md        # author entries
   │  │  └─ 📜 author.yaml # default settings for all authors (layout, path, permalink, tags) doc: https://www.11ty.dev/docs/data-template-dir/
   │  ├─ 📂 page
   │  │  ├─ 📜 *.md        # page entries
   │  │  └─ 📜 page.yaml   # default settings for all pages (layout, path, permalink, tags)
   │  ├─ 📂 post
   │  │  ├─ 📜 *.md        # post entries
   │  │  └─ 📜 post.yaml   # default settings for all posts (layout, path, permalink, tags)
   │  └─ 📂 tag
   │     ├─ 📜 *.md        # tag entries
   │     └─ 📜 tag.yaml    # default settings for all tags (layout, path, permalink, tags)
   ├─ 📂 static            # static files
   │  ├─ 📂 css
   │  ├─ 📂 fonts
   │  ├─ 📂 img
   │  └─ 📂 js
   ├─ 📜 404.njk           # 404 template
   └─ 📜 index.njk         # Homepage
```

## Netlify CMS Configuration

> file: `src/admin/config.yml`

### Collections

There are 5 collections by default: `post`, `tag`, `author`, `page` and `settings`.

`post`, `tag`, `author` and `page` are folder collections, so they need folders to store files with the same format. `settings` is a file collection, its embedded setting files are stored in `src/_data/`.

> more on [Collection Types - Netlify CMS](https://www.netlifycms.org/docs/collection-types/)

`tag` and `author` are relation collection used in post collection. So you need to first add new tags and authors before selecting them while editing a post.

#### Collection Slug
Slugs are used in routes, URLs and treated as the "id"s of entries. 
For example, the slug for a tag will be used in relation id stored in post files. It will be used also in generating the tag page: `/tag/{{slug}}`.

A slug only allows to contain "0\~9", "a\~z", "-", "\_" and "." (not start or end with "-", "_" and ".").

## Eleventy Configuration

> file: `.eleventy.js`

Several JavaScript functions are introduced, so they can be used in templates.

| JavaScript Function         | Nunjucks Syntax                        | Explain                                   |
| --------------------------- | -------------------------------------- | ----------------------------------------- |
| `string.split("seperator")` | `{{ myString \| split(",") }}`          | Seperate a string with defined seperator. |
| `array.includes(item)`      | `{{ myArray \| includes(item) }}`       | Check whether an item is in an array.     |
| `str.substring(start,end)`  | `{{ myString \| includes(start,end) }}` | Slice a range of characters of a string.  |

## Nunjucks Highlights

* Nunjucks passes parameters to included templates.

  > example
  > in `single-tag.njk`, we included `loop-post.njk`. So the `{{ slug }}`(tag slug) in single-tag will pass to loop-post, which allows us to filter the posts has the tag: `{{ slug }}`.

## Stacks

* Eleventy v1.0.2 (static-site generator, Nunjucks as the template engine)
* Bulma v0.9.4 (CSS Framework)
* Netlify CMS v2.10.192 (git-based CMS)
* Components
  * Swiper Slider(TODO)
  * KaTex (LaTeX support)
  * Prism.js (Code Highlight)

## Limitations & Known Issues

**All data lives in the `src` folder, the Netlify CMS has its limitations on respond to certain relation modifications.**

* Duplicate entries may cause problems when generating static pages.
* Delete tags(collection item) or change tag slugs will not remove the corresponding tag items in post files(.md).
  > Removed tags are not displaying in front-end, so users won't see those tags.
  > However, still recommend not to change the tag slugs after creation.

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md)

## 🍻 Contributors

A round of applause for all [Contributors][Contributors]!

## 📮 Discussion

Start to discuss on [GitHub Discussions][GitHub Discussions].

## 📍 Roadmap & TODOs
To know the future planning of this project, please visit our [Roadmap][Roadmap].
The priority of the list below is based on the number of requests.

* [x] Minify Assets (HTML & CSS)
* [x] 404 Page
* [x] Homepage Pagination
* [ ] Homepage Showcase
* [ ] Comment System
* [ ] Markdown highlight to mark `==highlight==` → `<mark>highlight</mark>`
* [ ] Search
  * [Adding Search to your Eleventy Static Site with Lunr][search-lunr]
* [ ] i18n
  * [i18n by eleventy](https://www.11ty.dev/docs/plugins/i18n/)
* [ ] Night Switch
* [ ] Markdown Footnotes

## Resources

* [Netlify CMS Docs](https://www.netlifycms.org/docs/)
* [Eleventy Docs](https://www.11ty.dev/docs/)
* [Nunjucks Templating Docs](https://mozilla.github.io/nunjucks/templating.html)
* [Nunjucks VSCode Plugin](https://marketplace.visualstudio.com/items?itemName=ronnidc.nunjucks)

## 💡 Contributing

1. Fork it (maybe give it a star too? 😉 )
2. Create your feature/modification branch (`git checkout -b feature-addSomeFeature`)
3. Commit your changes (`git commit -m 'Add something cool'`)
4. Push to the branch to your origin (`git push origin feature-addSomeFeature`)
5. Create a new Pull Request to `dev` branch on Github !!! NOT to "main" branch
6. Wait for code review and modify if necessary

[the Fizzy Theme]: https://github.com/huangyuzhang/Fizzy-Theme/
[Contributors]: https://github.com/huangyuzhang/Fizzy-Jam/graphs/contributors
[Roadmap]: https://github.com/huangyuzhang/Fizzy-Jam/projects/1
[GitHub Discussions]:https://github.com/huangyuzhang/Fizzy-Jam/discussions
[Telegram Channel]:https://t.me/FizzyJam
[Telegram Group]:https://t.me/FizzyJamChat
[search-lunr]:https://www.raymondcamden.com/2019/10/20/adding-search-to-your-eleventy-static-site-with-lunr
