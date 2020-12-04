# Block Carousel
A simple fading carousel [VueJS](https://vuejs.org) component designed to showcase code samples.

## Usage
First, import the js and css files:

```html
<link href="path/to/file.css" rel="stylesheet" />
<script src="path/to/file.js" type="text/javascript"></script>
```

Alternatively, you can use the "modularized" version of the js file, which exports each component as a separate let:

```html
<script type="module">
    import { BlockCarousel } from "path/to/file.js";
</script>
```

Now add component elements to your body:

```html
<block-carousel id="bc-samples">
    <block>
        <block-title>
            Demo: Hello World 1
        </block-title>
        <block-content>
            Hi!
        </block-content>
        <block-action-list>
            <block-action href="/somenav" target="_blank">
                Nav To somenav
            </block-action>
        </block-action-list>
    </block>
    <block>
        <block-title>
            Demo: Hello World 2
        </block-title>
        <block-content>
            Hello!
        </block-content>
        <block-action-list>
            <block-action>
                Execute myFunc
            </block-action>
        </block-action-list>
    </block>
</block-carousel>
```

It won't work yet, because we need a vue instance to manage it.

```html
<div id="vm-carousel">
    <block-carousel id="bc-samples">
        <block>
            ...
        </block>
        <block>
            ...
        </block>
    </block-carousel>
</div>
<script type="module">
    import { BlockCarousel } from "path/to/file.js";

    let vm = new Vue({
        el: "#vm-carousel"
    })
</script>
```

That's the basic instance. It's not much use, though, without some code samples to go inside the contents.

## Binding Block Content
The two blocks in the samples just have plain text in them, which doesn't pick up the carousel's styling properly. We can convert that to code:

```html
<block-carousel id="bc-samples">
    <block>
        ...
        <block-content>
            <pre>
                <code>
                    &lt;div> Hello World! &lt;/div>
                </code>
            </pre>
        </block-content>
        ...
    </block>
    <block>
        ...
        <block-content>
            <pre>
                <code>
                    &lt;div> Sample #2! &lt;/div>
                </code>
            </pre>
        </block-content>
        ...
    </block>
</block-carousel>
```

Writing plain text code with escape characters is a pain. I recommend using the VueJS `highlightjs` plugin. Import it and use it right after you import VueJS:

```html
<script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/highlight.min.js"></script>
<script>
    Vue.use(hljs.vuePlugin);
</script>
```

Now we can bind a string value to the block's contents:

```html
<block-carousel id="bc-samples">
    <block>
        ...
        <block-content>
            <highlightjs autodetect :code="sample1">
        </block-content>
        ...
    </block>
    <block>
        ...
        <block-content>
            <highlightjs language="javascript" :code="sample2">
        </block-content>
        ...
    </block>
</block-carousel>
<script type="module">
    import { BlockCarousel } from "path/to/file.js";

    let vm = new Vue({
        el: "#vm-carousel",
        data: {
            sample1: `<div>Hello World!</div>`,
            sample2: `alert("Hello World!)`
        }
    })
</script>
```

And we're done! Except our block-actions are incomplete...

## Binding Block Actions
Lets look at the block actions from up above:

```html
<block-carousel id="bc-samples">
    <block>
        ...
        <block-action-list>
            <block-action href="/somenav" target="_blank">
                Nav To somenav
            </block-action>
        </block-action-list>
    </block>
    <block>
        ...
        <block-action-list>
            <block-action>
                Execute myFunc
            </block-action>
        </block-action-list>
    </block>
</block-carousel>
```

The first one works as is. It takes an href (string), and an optional `target="_blank"` attr (Currently, "_blank" is the only supported target value, because my time is limited).
  

The second one says it wants to call a function, but no function is provided to it. Let's fix that:

```html
<block-carousel id="bc-samples">
    ...
    <block>
        ...
        <block-action-list>
            <block-action :action="myFunc">
                Execute myFunc
            </block-action>
        </block-action-list>
    </block>
</block-carousel>
<script type="module">
    import { BlockCarousel } from "path/to/file.js";

    let vm = new Vue({
        el: "#vm-carousel",
        data: { ... },
        methods: {
            myFunc() {
                alert("Hello World!")
            }
        }
    })
</script>
```

And we're done! We've successfully bound code samples and actions to each of our carousel blocks. 

