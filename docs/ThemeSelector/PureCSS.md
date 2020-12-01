# Pure CSS & CSS-heavy Design
Pure CSS is both a [Bootstrap-like style library](https://purecss.io/), and a school of thought for replacing scripted behaviors with scriptless, CSS-driven behaviors.
  
Pure CSS web interactions can often be heavily optimized, when compared to their scripted counterparts, and I think there's value to be had in leveraging all of the browser's implicit processes to our advantage.

## This is not a novel concept
When done right, Pure CSS design ideology doesn't look like anything noteworthy. It just looks like a clean implementation. Take this sample validated form, for example:

```html
<!-- All classes below are strictly for behavioral purposes -->
<form action="/submit">
    <div>
        <label for="fname">Full Name:</label>
        <input type="text" placeholder="Enter your name" required>
        <span class="form-error">Name is required</span>
    </div>
    <div>
        <label for="fname">Phone Number:</label>
        <input type="text" pattern="[0-9]{10}">
        <span class="form-error">Phone number must be 10 numbers</span>
    </div>
</form>
```

Using just the single `form-error` class, let's add some functionality with only scss:

```scss
form {
    .form-error {
        display: none;
        color: red;
    }

    input:invalid ~ .form-error {
        display: block;
    }
}
```

Using the `:invalid` pseudo-class and the [General Sibling CSS Combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator), we can configure all elements of class `.form-error` to automatically show/hide when their sibling input is valid/invalid.

MVVM Javascript frameworks solve this problem using weighty `show` and `if` conditional attributes, which depend on a large amount of scripted overhead with observers and stateful logic. A Pure CSS solution requires one class and ~6 lines of scss, and the performance cost is effectively nothing.

It's a simple solution, and it doesn't seem that novel. If we need to run manual validation before an `ajax` event, we can even leverage the same CSS selectors in our script:

```js
function validate() {
    if(document.querySelector("input:invalid").length > 0) {
        //Validation failed. One or more inputs has the :invalid pseudo class.
    }
}
```

## Novel, sometimes unwieldy concepts
I have taken some deep dives into PureCSS components, or components that have 0 javascript in them. My theme toggler button in my navbar was birthed from one of these:

```html
<div id="theme-toggler" class="pure-menu-item theme-toggler hidden">
    <div class="theme-front">Theme:</div>
    <input class="toggler toggler-main" id="themeToggler" type="checkbox" />
    <label class="toggle-btn" data-tg-off="Dark" data-tg-on="Light" for="themeToggler"></label>
</div>
```

And the associated scss (This one's a lot to swallow, and I borrowed a lot of it from some real CSS gurus. I don't expect most people to follow it, so I'll summarize afterward): 
```scss
.toggler {
    display: none;
 
    &, &:after, &:before, & *, & *:after, & *:before, & + .toggle-btn {
        box-sizing: border-box;
        &::selection {
            background: none;
        }
    }
    
    + .toggle-btn {
        outline: 0;
        display: block;
        width: 4em;
        height: 2em;
        position: relative;
        cursor: pointer;
        user-select: none;
    
        &:after, &:before {
            position: relative;
            display: block;
            content: "";
            width: 50%;
            height: 100%;
        }
    
        &:after {
            left: 0;
        }

        &:before {
            display: none;
        }
    }
    
    &:checked + .toggle-btn:after {
            left: 50%;
    }
}

.toggler-main {
    + .toggle-btn {
        overflow: hidden;
        border-radius:2px;
        backface-visibility: hidden;
        -webkit-transition: all .2s ease;
        transition: all .2s ease;
        font-family: sans-serif;
        background: #888;

        &:after, &:before {
            display: inline-block;
            transition: all .2s ease;
            width: 100%;
            text-align: center;
            position: absolute;
            line-height: 2em;
            font-weight: bold;
            color: #fff;
            text-shadow: 0 1px 0 rgba(0,0,0,.4);
        }
    
        &:after {
            left: 100%;
            content: attr(data-tg-on);
        }

        &:before {
            left: 0;
            content: attr(data-tg-off);
        }

        &:active {
            background: #888;
            &:before {
                left: -10%;
            }
        }
    }
    &:checked + .toggle-btn {
        background: #86d993;
        &:before {
            left: -100%;
        }
        &:after {
            left: 0;
        }
        &:active:after {
            left: 10%;
        }
    }
}
```

The theme toggling button basically goes through the following steps:
1. Put a hidden `input[type="checkbox"]` inside a `div`. Give it an ID and assign it the `toggler-main` class.
2. Put a styled `label` right next to it and give it the `toggle-btn` class. Set this label's `for` attribute to the ID of the `toggler-main` checkbox from the previous step.
3. Anytime a label is clicked in HTML, it counts as if we clicked the element it points to with the `for` attribute's id. Now, clicking our styled `toggle-btn` label acts as if we've clicked the hidden `toggler-main` checkbox.
4. `input[type="checkbox"]` has an inherent state, which can be tracked using the `:checked` CSS pseudo class. We use this to control the button display text animation:
```scss
    .toggler-main {
        + .toggle-btn {
            overflow: hidden;
            transition: all .2s ease;

            &:after {
                left: 100%;
                content: attr(data-tg-on);
            }

            &:before {
                left: 0;
                content: attr(data-tg-off);
            }
        }
    }
```

When the `toggler-main` checkbox is in its default state (unchecked), "Dark" displays, because it's the `data-tg-off` attr's value.

```scss
.toggler-main{
    &:checked + .toggle-btn {
        background: #86d993;
        &:before {
            left: -100%;
        }
        &:after {
            left: 0;
        }
        &:active:after {
            left: 10%;
        }
    }
}
```

When the `toggler-main` checkbox is checked (when the label is clicked), we push the `:before` and `:after` content to the right 100% and "Light" becomes the display value, since it's the `data-tg-on` attr's value (the `:after` content).

Because overflow on the `toggle-btn` is hidden, you only see the display value that's at position `left: 0;`. Because all transitions are set to `.2s ease`, the position change associated with the checkbox's state toggling will trigger a "slide" animation, instead of instantly swapping the values.

## Is it worth it?
For this component, almost certainly not. This code will be a nightmare for a maintenance developer to navigate, because there's no event-stack giving it any sort of implicit traceability. It depends on hidden html elements, which are prone to confuse maintenance developers, and it doesn't even successfully execute its primary function yet.

Ultimately, the job of the theme toggler is to actually change the page's theme, and it needs script to do that. Here's the _actual_ toggler used in my navbar:
```html
<div id="theme-toggler" class="pure-menu-item theme-toggler hidden">
    <div class="theme-front">Theme:</div>
    <input class="toggler toggler-main" id="themeToggler" type="checkbox" onclick="themeToggle()" />
    <label class="toggle-btn" data-tg-off="Dark" data-tg-on="Light" for="themeToggler"></label>
</div>
```

Note the added `onclick` function on the `toggler-main` checkbox, which triggers the `themeToggle` function we talked about in the [CSS3 Theming Document](/docs/themeselector/csstheming):
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

Almost 100 lines of complex `scss` code, and it still needed an `onclick` to do its job. Clearly, the benefits of PureCSS here were not worth the complexity cost.

## So why did I do it this way?
Frankly, it's just because this app is showcase of my skills. Pure CSS _can_ be a useful design ideology for what it's worth. When properly tested and vetted, some basic facets of a web application can be black-boxed inside a PureCSS component like this one to truly optimize their runtime speed. Modern MVVM frameworks depend on costly observers and stateful javascript logic, and many developers underestimate how costly that can be.

When performance is king for certain facets of a web application, eliminating overhead can be important, and I wanted to showcase that I have spent time learning particular optimization strategies such as this one.