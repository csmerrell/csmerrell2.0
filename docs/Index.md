# CS Merrell - Demo Website 
A website showcasing what I can manage in 3-4 weeks of free time (~70 hours).

## Stack

* **Server:**
    * Node, Express
* **Front End:**
    * Vue, Sass, Pure, Handlebars
* **Database:**
    * None yet (Front end was the priority)
* **Build tools & packaging:**
    * NPM, Gulp, Puppeteer
* **Documentation:**
    * Markdown & Gulp

## Source Code Highlights
Depending on which skills you're interested in, I can point you to where you'll find them in the source code:

* Vue Components (I've done React/Angular in the past):
    * [BlockCarousel.js (Component definition)](https://github.com/csmerrell/csmerrell2.0/blob/main/static/js/components/blockCarousel.js), 
        * [Landing page markup](https://github.com/csmerrell/csmerrell2.0/blob/main/views/index.hbs#L70-L127), 
        * [Landing page script](https://github.com/csmerrell/csmerrell2.0/blob/main/views/index.hbs#L159-L179), 
        * [Scss stylesheet](https://github.com/csmerrell/csmerrell2.0/blob/main/static/sass/components/blockCarousel.scss).

    * [SkillFilterview (Landing page markup)](https://github.com/csmerrell/csmerrell2.0/blob/main/views/index.hbs#L128-L147), 
        * [SkillFilterview (Landing page script)](https://github.com/csmerrell/csmerrell2.0/blob/main/views/index.hbs#L181-L248), 
        * [FilterableTag.js (Component definition)](https://github.com/csmerrell/csmerrell2.0/blob/main/static/js/components/filterableTag.js), 
        * [Data hash-mapping](https://github.com/csmerrell/csmerrell2.0/blob/main/static/js/util/mapper.js), 
        * [Filter View scss styles](https://github.com/csmerrell/csmerrell2.0/blob/main/static/sass/views/home.scss#L192-L277), [Filterable Tag component scss styles](https://github.com/csmerrell/csmerrell2.0/blob/main/static/sass/components/filterableTag.scss).

* Dual-theme toggling:
    * [Documentation](/docs/ThemeSelector/CSSTheming), 
        * [Themed color enumerations](https://github.com/csmerrell/csmerrell2.0/blob/main/static/sass/globals/_colors.scss), 
        * [Navbar toggling](https://github.com/csmerrell/csmerrell2.0/blob/main/views/partials/navbar.hbs#L35-L59).

* Noteworthy SCSS snippets:
    * [Pure css form validation](/docs/ThemeSelector/PureCSS).

    * [Pure css sliding toggler button](https://github.com/csmerrell/csmerrell2.0/blob/main/static/sass/components/toggle-btn.scss) (Scriptless, Used on the theme toggler),    
        * [Documentation on how it works](/docs/ThemeSelector/PureCSS#novel-sometimes-unwieldy-concepts).

    * [Skill list bottom fade out](https://github.com/csmerrell/csmerrell2.0/blob/main/static/sass/views/home.scss#L238-L259).

    * [Flexbox, Responsive sizing](https://github.com/csmerrell/csmerrell2.0/blob/main/static/sass/views/home.scss#L44-L94).

* Interesting algorithms:
    * [Data hash-mapping](https://github.com/csmerrell/csmerrell2.0/blob/main/static/js/util/mapper.js), 
        * [Hash comparisons for O(1) searching](https://github.com/csmerrell/csmerrell2.0/blob/main/static/js/components/filterableTag.js#L19-L46).
        * [Why my search isn't actually O(1)](/docs/TagFilterview/Design#drawbacks).

    * Asynchronous carousel fade transition events (Promises): 
        * [Carousel (parent) triggers the fade-out, awaits promise resolution to start fade-in](https://github.com/csmerrell/csmerrell2.0/blob/main/static/js/components/blockCarousel.js#L49-L80), 
        * [Block (child) execution and resolution of the promise.](https://github.com/csmerrell/csmerrell2.0/blob/main/static/js/components/blockCarousel.js#L131-L161).

* Handlebars Templates (Partials & Layouts):
    * [Express.js Configuration](https://github.com/csmerrell/csmerrell2.0/blob/main/app.js#L10-L28), 
        * [Shared header meta-data](https://github.com/csmerrell/csmerrell2.0/blob/main/views/layouts/sharedTemplate.hbs), 
        * [Sample "centered" layout](https://github.com/csmerrell/csmerrell2.0/blob/main/views/layouts/centeredLayout.hbs), 
        * [Shared navbar partial](https://github.com/csmerrell/csmerrell2.0/blob/main/views/partials/navbar.hbs).

* Gulp automation:
    * [Sass & Markdown preprocessing, Puppeteer to detect source changes and refresh browser](https://github.com/csmerrell/csmerrell2.0/blob/main/gulpfile.js#L14-L58)

* Express MVC Content Delivery (Routing):
    * [Docs View Routing Controller](https://github.com/csmerrell/csmerrell2.0/blob/main/controllers/docs/docs.controller.js), 
        * [View Controller Routing Index](https://github.com/csmerrell/csmerrell2.0/blob/main/controllers/index.js), 
        * [App route importing](https://github.com/csmerrell/csmerrell2.0/blob/main/app.js#L42-L44). 

    * [REST API Controller Sample](https://github.com/csmerrell/csmerrell2.0/blob/main/api/test/test.controller.js), 
        * [API Endpoint Index](https://github.com/csmerrell/csmerrell2.0/blob/main/api/index.js).


## Where the time went (roughly)
Everything here was created in roughly 60-70 hours of dev time. **None of it was copied from past work**. This should give you an idea of how familiar I am with this stuff.

* **(8 hours)** - Standing up a custom MVC-tuned Node/Express boilerplate server and getting all my preferred libraries working together.

* **(6 hours)** - Writing the Block Carousel component
    * **(4 hours)** - [Overdocumenting](/docs/BlockCarousel/GettingStarted) - [the](/docs/BlockCarousel/API) - [Block Carousel](/docs/BlockCarousel/Design) - [Component](/docs/BlockCarousel/ActionDesignRevisions) 
        * I went overboard here to give you a feel for how comprehensive I am where documentation is a concern (for either users or maintenance developers).

* **(8 hours)** - Writing the skill filterview section of the landing page.
    * **(2 hours)** - Writing a more reasonable amount of [documentation](/docs/TagFilterview/Design) for the [filterview section](/docs/TagFilterview/TagAPI)

* **(2 hours)** - Implementing the dual-color theme
    * **(2 hours)** - Documenting the [dual-color theme](/docs/ThemeSelector/CSSTheming) and some particulars about [pure-css design](/docs/ThemeSelector/PureCSS).

* **(2 hours)** - Making the top-level welcome blurb section.
    * **(4 more hours)** - Endlessly<sup>TM</sup> revising the welcome blurb.

* **(6 hours)** - Testing and bugfixing everything.
    * **(4 more hours)** - Testing various screen widths & writing css media queries.
    * **(4 extra hours)** - Squashing a particular safari css bug where it can't handle alpha-channel `linear-gradient` animation using css3 hex or rgba **variables** (The variable has to be [*just* rgb, and the alpha has to be written as a separate literal](https://github.com/csmerrell/csmerrell2.0/blob/main/static/sass/views/home.scss#L255-L257) `¯\_(ツ)_/¯`).

* **(3 hours)** - Configuring heroku hosting and debugging their automated https cert.

* **(6 hours)** - Misc improvements (Loading animation, handlebars template improvements, navbar improvements, trimming deprecated code).

* **(8 hours)** - Designing 3 logos in Inkscape and screening them against my wife (and other friends).

* **(2 hours)** - Writing this guide.