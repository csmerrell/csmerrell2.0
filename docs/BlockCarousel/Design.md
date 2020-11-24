# Block Carousel Design
This document will mostly cover some of the more nuanced highlights of this component's design, with some reasoning why I chose each particular design direction.

View the component's source code [here (js)](https://github.com/csmerrell/csmerrell2.0/static/js/components/blockCarousel.js) and [here (css)](https://github.com/csmerrell/csmerrell2.0/static/scss/components/blockCarousel.scss).

## Separation of Responsibilities
I split the full component into 6 different components:

* BlockCarousel (root component)
    * Block [List]
        * BlockTitle
        * BlockContent
        * BlockActionList
            * BlockAction

My approach to separating these components followed single responsibility design theory.

### Block Carousel
This is the root component. The only thing it does is manage which block is currently showing. navArrows, navDots, and the actual blocks are housed here.
  
The bulk of this component's use boils down to its slide functions:
```js
slidePrev: function() {
    //Called when the left arrow is clicked. Grabs the previous block (cycles back at beginning)
    if(!this.actionLocked) {
        //Lock the action flag so the user can't trigger several slides at once.
        //This could have also been done with promises, among other things, 
        //  but the code wouldn't be any simpler than this.
        this.actionLocked = true;

        let nextBlockIdx = this.currentBlockIdx - 1;
        if(nextBlockIdx < 0) {
            nextBlockIdx = this.$children.length - 1;
        }

        this.transition(this.currentBlockIdx, nextBlockIdx)
    }
},
slideNext: function() {
    //Called when the right arrow is clicked. Grabs the next block (cycles back at end)
},
slideTo: function(idx) {
    //Called when a navdot is clicked (can skip indices)
},
```

Nothing too exciting in these functions. The **transition** function has more meat:

```js
transition: function(currIdx, nextIdx) {
    //Generic transition function called by all slide functions when they identify origin/destination indices
    
    if(this.beforeSlide) { //Fire the "before" event hook function if it exists.
        this.beforeSlide(this.$children(nextIdx), nextIdx);
    }

    //Change which navdot is highlighted
    this.blocks[currIdx].isSelected = false;
    this.blocks[nextId].isSelected = false;

    //Ask the current block to fade itself out. It returns a promise that signifies when it's done.
    let fadeOutPromise = this.$children[currIdx].fadeOut();

    //When the active block is done fading out, start fading in the new block.
    this.$children[nextIdx].fadeIn(fadeOutPromise).then(() => {
        this.currentBlockIdx = nextIdx;

        if(this.onSlide) { //Fire the "after" event hook function if it exists.
            this.onSlide(this.$children(this.currentBlockIdx), this.currentBlockIdx);
        }

        this.actionLocked = false;        
    });   
}
```

I think the code & comments here speak for themselves.

## Block
Contains 3 core elements (components): **BlockTitle**, **BlockContent**, **BlockActionList**

Before talking about those components, though, let me talk about the block's two main functions:

### Fade Out & Fade In
```js
fadeOut: function() {
    return new Promise((resolve, reject) => {
        this.$el.addEventListener('transitionend', () => {
            this.fadeOutComplete(resolve);
        });
        this.$el.classList.add('fade-out');    
    })
},
fadeOutComplete: function(resolve) {
    this.$el.classList.remove('fade-out');
    this.isActive = false;
    resolve();
},
fadeIn: function(prevBlockFadePromise) {
    return new Promise((resolve, reject) => {
        this.$el.addEventListener('transitionend', () => { 
            this.fadeInComplete(resolve) 
        });

        this.$el.classList.add('pre-fade-in');
        prevBlockFadePromise.then(() => {
            this.$el.classList.add('fade-in');
        }, 400)
    })
},
fadeInComplete: function(resolve) {
    this.$el.classList.remove('pre-fade-in');
    this.$el.classList.remove('fade-in');
    this.isActive = true;
    resolve();
}
```

The main notes for these functions:

1. All behavior is ultimately being done by css3 animations. I use CSS3 to handle all animations where I can, because it's orders of magnitude better optimized than scripting them, in web. Luckily, the animations for these used very easy, standard css:
```scss
.block {
        /* Applied to a visible block to fade it out */
        &.fade-out {
            opacity: 0;
            -webkit-transition: .5s;
            -moz-transition: .5s;
            transition: .5s;
        }

        /* Applied to an incoming block to baseline its opacity to 0 before fading it in. */
        &.pre-fade-in {
            position: absolute;
            opacity: 0;
            display: block !important;
        }

        /* Fades the incoming block in */
        &.fade-in {
            position: relative;
            opacity: 1;
            -webkit-transition: .5s;
            -moz-transition: .5s;
            transition: .5s;
        }
}
```

2. CSS transitions are asynchronous. There's no thread of code to wait on them, so the only reliable way to await them is with a **transitionend** event listener.
```js
fadeOut: function() {
        return new Promise((resolve, reject) => {
            this.$el.addEventListener('transitionend', () => {
                this.fadeOutComplete(resolve);
            });
            this.$el.classList.add('fade-out');    
        })
},
```

3. The easiest way for the carousel to know that a block is done fading out is to give it a promise and wait for it to resolve:
```js
transition: function(currIdx, nextIdx) { //Carousel's transition event
        ...
        //Ask the current block to fade itself out. It returns a promise that signifies when it's done.
        let fadeOutPromise = this.$children[currIdx].fadeOut();

        //When the active block is done fading out, start fading in the new block.
        this.$children[nextIdx].fadeIn(fadeOutPromise).then(() => { ... });
}
```

That's it for Blocks. Let's talk about their children components:

## Block Title
This is really just a pair of divs and an h1 with styling to position it correctly. 

```js
export let BlockTitle = Vue.component('block-title', {
    template: /* html */`
        <div class="bc-block-title">
            <div class="bc-block-title-wrapper">
                <h1>
                    <slot></slot>
                </h1>
            </div>
        </div>
    `
})
```

With such a simple structure, this component didn't _really_ need to be abstracted into a component. I ultimately chose to abstract it for a few boring reasons:
1. The template has two nested divs, and the component simplifies them to a single element in the core markup file.
2. Other parts of the block were already abstracted, so I wanted to stay consistent.
3. Abstracting the 3 components made it much easier for a human to read and separate the distinct elements of the block in the markup.

This class doesn't "do" anything, though, so I can see arguments against choosing to abstract it.

## Block Content
Like the Block Title, this component is just divs and styling:

```js
export let BlockContent = Vue.component('block-content', {
    template: /* html */`
        <div class="bc-block-content pure-g  fade-container">
            <div class="pure-u-xs-1-24 pure-u-md-1-12 pure-u-lg-1-8 pure-u-xl-1-4"></div>
            <div class="code-slot pure-u-1 pure-u-xs-11-12 pure-u-md-5-6 pure-u-lf-3-4 pure-u-xl-1-2">
                <slot>
                </slot>
            </div>
            <div class="pure-u-sm-1-24 pure-u-md-1-12 pure-u-lg-1-8 pure-u-xl-1-4"></div>
            <div class="fade-out-bottom"></div>
        </div>
    `
})
```

This one had a lot more divs, so I feel much better about abstracting it and keeping the up front markup clean.

DRAWBACKS:
This component exposes the biggest weakness of this component >> An implicit (and improperly documented) dependency on the [PureCss](https://purecss.io/) responsive grids library. I accepted this for the purposes of this application because it made it easy for the carousel to have the _exact_ same sizing as the parent page.

Were I to make this component _durable_ and _portable_, this would be one of the first things to refactor. I would remove the dependency, so the tool can be used in contexts where PureCss is not present.

Additional revisions to consider:
* Allow developers to configure the carousel & its content to a variety of display setups (i.e. `position: absolute|fixed|relative` or `display: block|inline|inline-block`).
    * Drawbacks: This is a non-trivial revision when considering the variety of contexts the component could be used in.
* Let developers simply position the carousel themselves.
    * Drawbacks: This makes my current 'ultra-wide with deep side margins' display relatively problematic for anyone else to achieve, as they would have to open up the component's css and start overriding classes to keep the arrows wide while the code blocks remain compact.
    * (My Recommendation) If the component needed to be portable I'd go this route, even though it sacrifices some value. I know the tool well enough to override my own css and document for my own contexts and needs.
* Implement some deeper class configurables to enable more options
    * Drawbacks: This gets bloated fast. I don't recommend it.

## Block Action List
```js
export let BlockActionList = Vue.component('block-action-list', {
    template: /* html */`
        <div class="bc-block-action-list">
            <div class="pure-u-1 bc-list-center">
                <slot></slot>
            </div>
        </div>
    `
})
```

Another ultra simple component. Even though it's only two divs, I feel good about choosing to abstract this one because abstracting it makes it more implicit that the list can handle several **BlockAction** components, and position them correctly at various screen sizes.

```css
.bc-block-action-container {
    position: absolute;
    bottom: 3rem;
    width: 100%;
    text-align: center;
    z-index: 10;

    .bc-block-action {
        font-size: $font-size-med;
        box-shadow: 0 0 1rem var(--clr-bg-alt);

        a {
            color: var(--clr-fonts-base);
            text-decoration: none;

            &:hover {
                color: var(--clr-fonts-base);
            }
        }
    }
}
```

The css is not even complex. But it works, and abstracting the List into a component serves as a sort of guarantee that it works.

(It won't look good with tons of actions, but anything more than 3 actions is excessive, anyway).

## Block Action
The last component, and the one that actually needs some refactoring to be worth its weight. I moved this to another document, as its design problems deserve a space of their own: [Block Action Design Issues](/docs/BlockCarousel/actionDesignRevisions)

## Sass/CSS
Consider checking the full Sass of my component, as I haven't given it due attention in these documents: [Source SCSS](https://github.com/csmerrell/csmerrell2.0/static/scss/components/blockCarousel.scss)