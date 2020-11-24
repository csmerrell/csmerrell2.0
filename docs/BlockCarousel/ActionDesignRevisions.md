# Block Action Design Concerns
At the bottom level of my `BlockCarousel` component, I have a `BlockAction` component that is currently little more than a styled/positioned, less-functional `<a>` tag written in 26 lines of code. Its not intensely problematic to revise, but I had enough thoughts on how I might refactor it that I decided to write this document to showcase my thought process when tackling component design.

```js
export let BlockAction = Vue.component('block-action', {
    props: {
        href: String,
        action: Function,
        target: String
    },
    methods: {
        performAction: function() {
            if(this.href) {
                if(this.target == "_blank") {
                    window.open(this.href)
                } else {
                    window.location = this.href;
                }
            } else if(this.action) {
                this.action();
            }
        },
    },
    template: /* html */`
        <div class="bc-block-action-container">
            <div class="bc-block-action pure-button" v-on:click="performAction">
                <slot></slot>
            </div>
        </div>
    `
})
```

The **performAction** method above is horribly underbaked, and signifies everything about this component that needs refactoring. The functionality of this component is _less than a properly css-styled a-tag_. It can open urls either in `target="_self"` or in `target="_blank"`, but the former is just a default, undocumented behavior. It can also execute an `action` function which is really just an `onclick`. I could have just let people use `onclick`

The only benefit to component abstraction here was clean parent markup, and I left the dirty code in here so I could document considerations I'd take for revision:

1. Let developers implement, style, & position actions themself.
    * Drawback: This sacrifices a huge facet of the component's value. Almost definitely a NO.
    * I _would_, however, allow developers a route where they could _opt in_ to this choice. Options to relinquish control are always great in components.

2. Adhere to a strict rule that only plain text or `a` tags can be nested inside an action.
    * Drawback: Maintenance developers using the component have to learn less implicitly communicated rules to use the component.
    * Drawback: My supported content list might not reflect all desired use cases (what about iconography on the action buttons? Guarantee'ing support is non-trivial)

3. Replace the current template wrapper with a `<label for="someId" ...>` solution. Allow developers to place any element they want inside the action and just configure one of them with anm id such that clicking the action label triggers the desired event/behavior on that element.
    * Drawback: Might require me to strip visibility of parts of the BlockAction's contents. I'd have to consider possible use cases and review with other developers. 
    * Drawback: Slight learning curve, as developers would need to know how to configure the id of the action element and link it to a `prop` in the containing `BlockAction` element.
    * I'd consider taking this route, and make the documentation of the design choice prominent in the overall component documentation. It guarantees the greatest flexibility for a small added learning curve and is quick to implement.  

4. Drop the component abstraction at the `BlockAction` level all together and just require that developers place a certain class on whatever contents they place here.
    * Drawback: Class assignment for contents of the `BlockAction` aren't necessarily straightforward. Different use cases could have very different structures. This would need a non-trivial amount of iteration to get it just right for most users, and would still require a lot of documentation explaining nuance. Not recommended.

5. Keep the current design and add more functionality to the `performAction` function so it supports all of the relevant attr's provided by `a` tags and document those options. Strip the `action` method and just let users use `onclick`, which is natively supported without my implementation.
    * Drawback: It takes parameters like an `a` tag, but isn't an `a` tag. This would be a weird code smell for me if I was using this component as a separate party.
    * Pro: This path still generates the most readable markup, and the easiest markup to showcase in usage docs.
    * (My recommendation) - I'd probably go this route, honestly. But I'd review with other developers, first, since a good course seems unclear.
    * I would still pair this decision with (1), and maybe provide/document styling/positioning css classes as well to give the option of more control to the later developers.
