export let BlockCarousel = Vue.component('block-carousel', {
    data: function() {
        return {
            blocks: [],
            currentBlockIdx: 0,
            countdown: 20,
            actionLocked: false
        }
    },
    props: {
        beforeSlide: Function,
        onSlide: Function,
    },
    methods: {
        slidePrev: function() {
            if(!this.actionLocked) {
                this.actionLocked = true;

                let nextBlockIdx = this.currentBlockIdx - 1;
                if(nextBlockIdx < 0) {
                    nextBlockIdx = this.$children.length - 1;
                }

                this.transition(this.currentBlockIdx, nextBlockIdx)
            }
        },
        slideNext: function() {
            if(!this.actionLocked) {
                this.actionLocked = true;

                let nextBlockIdx = this.currentBlockIdx + 1;
                if(nextBlockIdx > this.$children.length - 1) {
                    nextBlockIdx = 0;
                }

                this.transition(this.currentBlockIdx, nextBlockIdx)
            }
        },
        slideTo: function(idx) {
            if(!this.actionLocked) {
                this.actionLocked = true;

                this.transition(this.currentBlockIdx, idx)
            }
        },
        transition: function(currIdx, nextIdx) {
            if(this.beforeSlide) {
                this.beforeSlide(this.$children(nextIdx), nextIdx);
            }
            this.blocks[nextIdx].isSelected = true;
            this.blocks[currIdx].isSelected = false;

            let fadeOutPromise = this.$children[currIdx].fadeOut();

            //let the leaving block fade roughly halfway (~.25s) before starting the next block's fade-in
            this.$children[nextIdx].fadeIn(fadeOutPromise).then(() => {
                this.currentBlockIdx = nextIdx;

                if(this.onSlide) {
                    this.onSlide(this.$children(this.currentBlockIdx), this.currentBlockIdx);
                }

                this.actionLocked = false;        
            });   
        },
        timer: function() {

        },
    },
    created: function() {
    },
    mounted: function() {
        this.$children[this.currentBlockIdx].setActive();
        this.blocks = this.$children.map((child) => {
            return {
                isSelected: child.$data.isActive
            }
        });

        setTimeout(() => {
            //Wait for all children to mount before showing the parent component
            this.$el.classList.remove("hidden");
        }, 100)
    },
    template: /* html */`
        <div class="bc-block-carousel pure-g hidden">
            <div class="bc-slide-trigger left-anchor" v-on:click="slidePrev">
                <span class="fa fa-chevron-left"></span>
            </div>
            <div class="pure-u-1">
                <slot></slot>
            </div>
            <div class="bc-slide-trigger right-anchor" v-on:click="slideNext">
                <span class="fa fa-chevron-right"></span>
            </div>
            <div class="bc-nav-dots">
                <span v-for="(block, idx) in blocks" class="fa fa-circle nav-dot" :class="{ selected: block.isSelected }" v-on:click="slideTo(idx)"></span>
            </div>
        </div>
    `
})

export let Block = Vue.component('block', {
    data: function() {
        return {
            title: "",
            contentBody: {},
            actions: [],
            isActive: false
        }
    },
    computed: {
        BlockType: function() {
            return this.blockType ? this.blockType : "code";
        }
    },
    props: {
        name: String,
        blockType: String
    },
    methods: {
        setActive: function() {
            this.isActive = true;
        },
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
    },
    mounted: function() {
    },
    template: /* html */`
        <div class="bc-block" v-show="isActive">
            <slot></slot>
        </div>
    `
})

export let BlockTitle = Vue.component('block-title', {
    data: function() {
        return {
            test: {}
        }
    },
    props: {
        
    },
    methods: {
        isImageBlock: function() {
            return this.$parent.blockType == "image";
        }
    },
    template: /* html */`
        <div class="bc-block-title">
            <div class="bc-block-title-wrapper">
                <h1>
                    <slot></slot>
                </h1>
                <div v-if="isImageBlock()" class="obfuscation-row">
                </div>
            </div>
        </div>
    `
})

export let BlockContent = Vue.component('block-content', {
    data: function() {
        return {

        }
    },
    props: {
        
    },
    methods: {

    },
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

export let BlockActionList = Vue.component('block-action-list', {
    template: /* html */`
        <div class="bc-block-action-list">
            <div class="pure-u-1 bc-list-center">
                <slot></slot>
            </div>
        </div>
    `
})

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
