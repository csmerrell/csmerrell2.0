# Block Carousel API
A simple fading carousel [VueJS](https://vuejs.org) component designed to showcase code samples.

Usage:
```html
<head>
    <link href='/static/css/compiled/components/blockCarousel.css' rel="stylesheet" />
</head>
<body>
    <div id="vm-carousel" class="code-carousel">
        <block-carousel id="bc-samples" v-cloak>
            <block>
                <block-title>
                    Hello World
                </block-title>
                <block-content>
                    <highlightjs autodetect :code="codeSample1" />
                </block-content>
                <block-action-list>
                    <block-action href="/">
                        Nav to href
                    </block-action>
                </block-action-list>
            </block>
            <block>
                <block-title>
                    Sample 2
                </block-title>
                <block-content>
                    <highlightjs autodetect :code="codeSample2" />                
                </block-content>
                <block-action-list>
                    <block-action :action="myFunc">
                        View Documentation
                    </block-action>
                </block-action-list>
            </block>
        </block-carousel>
    </div>

    <script type="module">
        import { BlockCarousel } from "/static/js/components/blockCarousel.js";
        import { CodeSample1, CodeSample2 } from "/path/to/localdata.js";

        window.vms["vm-carousel"] = new Vue({
            el: "#vm-carousel",
            components: [ BlockCarousel ],
            data: {
                codeSample1: CodeSample1,
                codeSample2: CodeSample2,
            },
            methods: {
                myFunc: () => { alert("Hi!"); }
            }
        })
    </script>
</body>
```

## Block Carousel: `<block-carousel>`
The root component. Manages which code block is currently displayed. Houses events for nav arrows and nav dots.
  
Only supports children elements of type `<block>`.

```html
<block-carousel>
    <block>...</block>
    <block>...</block>
    <block>...</block>
    <block>...</block>
</block-carousel>
```

### Props
* `beforeSlide`: Function
    * Default Value: `null`
    * A callback event that fires before a user-triggered block change event occurs.
    * Params:
        * `e`: Object (EventArgs)
            * `currBlock`: Object (Vue Component - Block)
                * The current (fading out) block component.
            * `currIdx`: Number
                * Index of the current block in the root component's children array.
            * `nextBlock`: Object (Vue Component)
                * The next (fading in) block component.
            * `nextIdx`: Number
                * Index of the next block in the root component's children array.
    * Usage:
    ```html
        <block-carousel :beforeSlide="myFunc">
            ...
        </block-carousel>
        <script type="module">
            window.vms["vm-carousel"] = new Vue({
                ...
                methods: {
                    myFunc: (e) => { 
                        console.log(e.currBlock); 
                    }
                }
            })
        </script>
    ```
* `onSlide`: Function
    * Default Value: `null`
    * A callback event that fires after a user-triggered block change event occurs and the new block is fully transitioned in.
    * Params:
        * `e`: Object (EventArgs)
            * `currBlock`: Object (Vue Component - Block)
                * The current (fading out) block component.
            * `currIdx`: Number
                * Index of the current block in the root component's children array.
            * `nextBlock`: Object (Vue Component)
                * The next (fading in) block component.
            * `nextIdx`: Number
                * Index of the next block in the root component's children array.
    * Usage:
    ```html
        <block-carousel :onSlide="myFunc">
            ...
        </block-carousel>
        <script type="module">
            window.vms["vm-carousel"] = new Vue({
                ...
                methods: {
                    myFunc: (e) => { 
                        console.log(e.currBlock); 
                    }
                }
            })
        </script>
    ```

## Block - `<block>`
A display panel within the carousel intended for showing raw code strings. Can contain exactly 3 child components: `BlockTitle`, `BlockContent`, `BlockActionList`

```html
<block>
    <block-title>...</block-title>
    <block-content>...</block-content>
    <block-action-list>...</block-action-list>
</block>
```

### Props
None

## BlockTitle - `<block-title>`
A slim component for styling the block's header title.

```html
<block-title> Demo: Code Carousel </block-title>
```

### Props
None

## BlockContent - `<block-content>`
A slim component for styling the block's header title.

```html
<block-content>
    <pre>
        <code language="html">
            &lt;div> Hello World! &lt;div>
        </code>
    </pre>
</block-content>
```

### Props
None

## Block Action List - `<block-action-list>`
A wrapper component to position and style several `BlockAction` components.

```html
<block-action-list>
    <block-action>...</block-action>
    <block-action>...</block-action>
    <block-action>...</block-action>
</block-action-list>
```

### Props
None

## Block Action `<block-action>`
A component for action buttons floating over the bottom of the carousel.

```html
<block-action>
    Do Something
</block-action>
```

## Props
* `href`: String
    * Default Value: `null`
    * A link that the button to navigate to when clicked
    * Usage
    ```html
        <block-action href="https://somewhere.com">
            Go Somewhere
        </block-action>
    ```
* `target`: String
    * Default Value: `null`
    * Supported Values: `"_blank"`
    * If present and has the value `"_blank"`, href links will be opened in a new browser tab, instead of the current one.
    * Usage
    ```html
        <block-action href="https://somewhere.com" target="_blank">
            Go Somewhere
        </block-action>
    ```
* `action`: Function
    * Default Value: `null`
    * A callback function that fires if the BlockAction element is clicked.
    * Usage
    ```html
        <block-action :action="doSomething">
            Do Something
        </block-action>
        ...
        <script>
            new Vue({
                ...
                methods: {
                    doSomething: () => { ... }
                }
            })
        </script>
    ```
    * NOTE: Action is pre-empted if an href is present.
    * NOTE: Alternatively, native html `onclick` can be used to similar effect. `onclick` will not be pre-empted when an `href` is supplied.