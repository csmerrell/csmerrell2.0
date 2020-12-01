# CSS3 Theming
I remember a time in my second year of my career when I learned about Sass and thought it was the coolest thing in the world, with its ability to do Variables, Mixins, and Nested classes--and it still is! Sass is an important part of writing durable stylesheets.

But I have found a distinct use for native CSS3 variables: User-controlled Theming

## CSS3 Variables
Syntax for native variables is a bit clunkier than in Sass.

Compare:
```scss
$font-size-std: 16px;

body {
    font-size: $font-size-std;
}
```

To:
```css
--font-size-std: 16px;

body {
    font-size: var(--font-size-std);
}
```

But CSS3 variables are evaluated at runtime, and therefore have an advantage over pre-processed sass variables: The user can swap them at will without having to strip and replace classes en masse with scripts. Additionally, the maintenance cost of css3 theming is ultra-light. I have run a production dual-themed application at my current workplace for over a year now, and we have rarely had issues with maintaining theme-compatibility as we add features. I recreated the same structure for this sample application.

## Theme Design
Up front, there's a [`_colors.scss`](https://github.com/csmerrell/csmerrell2.0/blob/main/static/sass/globals/_colors.scss) file that declares all the theme variables.

**_colors.scss**:
```css
:root {
    /* NEUTRAL Colors */
    /* 
        Non-dynamic. 
        These stay static regardless of selected theme. 
    */
    --clr-fonts-white: #fcfcfc;
    --clr-fonts-white-alt: #b0b0b0;
    --clr-fonts-white-active: #909090;
    --clr-fonts-white-inactive: #606060;

    --clr-fonts-black: #101010;
    --clr-fonts-black-alt: #303030;
    --clr-fonts-black-active: #505050;
    --clr-fonts-black-inactive: #808080;

    /* DARK theme colors */
    --clr-dk-base: #2f2f2f;
    --clr-dk-alt: #221f1f;
    --clr-dk-hover: #363636;
    --clr-dk-active: #201a1a;
    --clr-dk-input: #3a3a3a;
    --clr-dk-border: #4f4f4f;

    --clr-dk-primary: #ffb3e6;
    --clr-dk-primary-alt: #ff80d5;
    --clr-dk-primary-active: #ff4dc4;
    --clr-dk-primary-inactive: #ffe6f7;

    --clr-dk-accent: #da255b;
    --clr-dk-accent-alt: #c42152;
    --clr-dk-accent-active: #991a40;
    --clr-dk-accent-inactive: #f4bece;
    --clr-dk-accent-font: #ffffff;

    /* LIGHT theme colors */
    /* -lt- base/primary/accent colors + variants similar to the -dk- variables */
    --clr-lt-base: #ffffff;
    /* .. */

    --clr-lt-primary: #ff80d5;
    /* .. */

    --clr-lt-accent: #007399;
    /* .. */
}

:root[theme='dark'] {
    /* DYNAMIC variables. These will be used for the bulk of development, 
        that way they swap automatically when the theme changes */
    --clr-bg: var(--clr-dk-base);
    --clr-bg-rgb: var(--clr-dk-base-rgb);
    --clr-bg-alt: var(--clr-dk-alt);
    --clr-bg-alt-rgb: var(--clr-dk-alt-rgb);
    --clr-bg-hover: var(--clr-dk-hover);
    --clr-bg-active: var(--clr-dk-active);
    --clr-bg-input: var(--clr-dk-input);
    --clr-border: var(--clr-dk-border);    

    --clr-fonts-base: var(--clr-fonts-white);
    --clr-fonts-alt: var(--clr-fonts-white-alt);
    --clr-fonts-active: var(--clr-fonts-white-active);
    --clr-fonts-inactive: var(--clr-fonts-white-inactive);

    --clr-primary: var(--clr-dk-primary);
    --clr-primary-alt: var(--clr-dk-primary-alt);
    --clr-primary-active: var(--clr-dk-primary-active);
    --clr-primary-inactive: var(--clr-dk-primary-inactive);

    --clr-accent: var(--clr-dk-accent);
    --clr-accent-alt: var(--clr-dk-accent-alt);
    --clr-accent-active: var(--clr-dk-accent-active);
    --clr-accent-inactive: var(--clr-dk-accent-inactive);
    --clr-accent-font: var(--clr-dk-accent-font);
}

:root[theme='light'] {
    /* DYNAMIC variables. These will be used for the bulk of development, 
        that way they swap automatically when the theme changes */

/* Similar to dark theme, but use the "-lt-" variables */
    --clr-bg: var(--clr-lt-base);
    --clr-bg-alt: var(--clr-lt-alt);
    --clr-bg-hover: var(--clr-lt-hover);
    --clr-bg-active: var(--clr-lt-active);
    --clr-bg-input: var(--clr-lt-input);
    --clr-border: var(--clr-lt-border);        

    --clr-fonts-base: var(--clr-fonts-black);
    /* ... */

    --clr-primary: var(--clr-lt-primary);
    /* ... */

    --clr-accent: var(--clr-lt-accent);
    /* ... */
}

body {
    background-color: var(--clr-bg);
    color: var(--clr-fonts-base);
}
```

With the themed variables set up, now we just use them anytime we need to set colors. Take my `FilterableTag` component's stylesheet, for example:

```scss
.ft-container {
    border: 1px solid var(--clr-border);
    background-color: var(--clr-bg-input);

    .ft-ico-block {
        border-right: 1px solid var(--clr-border);

        .ft-ico {
            color: var(--clr-accent);
        }
    }
}
```

Each of these color values swaps automatically any time the page root's theme is changed.

## Changing the theme
As you would expect, changing the theme is incredibly simple:

```js
function themeToggle() {
    if(document.documentElement.getAttribute('theme') == 'dark') {
        document.documentElement.setAttribute('theme', 'light');
    }
    else {
        document.documentElement.setAttribute('theme', 'dark');
    }
}
```

That's it. Hook that function up to a theme-toggling button's `onclick` and your application supports dual themes.

## CSS-heavy solutions
Where possible, it is often best to use CSS and Element class bindings as much as possible. The browser is already applying stylesheets to the page, regardless of what we want it to do, so a CSS solution that adds functionality to a page will almost always be better optimized than a comparable javascript solution.

There is a somewhat-niche school of UX engineering focused around [Pure CSS Design](/docs/themeselector/purecss) that seeks to optimize interactions by replacing scripted behaviors with CSS solutions.

