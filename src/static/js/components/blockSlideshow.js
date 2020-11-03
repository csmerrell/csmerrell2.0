export let BlockSlideshow = Vue.component('block-slideshow', {
    data: function() {
        return {
            blocks: [],
            actionLocked: false,
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

                //await beforeSlide if it exists

                //do stuff;

                //await onSlide if it exists

                this.actionLocked = false;
            }
        },
        slideNext: function() {
            if(!this.actionLocked) {
                this.actionLocked = true;

                //await beforeSlide if it exists

                //do stuff;

                //await onSlide if it exists

                this.actionLocked = false;
            }
        }
    },
    created: function() {
        debugger;
    },
    mounted: function() {
        debugger;
        // this.blocks = this.
    },
    template: /* html */`
        <div class="bs-block-slideshow pure-g">
            <style>
                @import '../css/components/blockSlideshow.css';
            </style>
            <div class="trigger-btn pure-u-md-1-12 pure-u-xl-1-24" v-bind:click="slidePrev">
                <div class="left-anchor">
                    <span class="fa fa-left-chevron"></span>
                </div>
            </div>
            <div class="block-container pure-u-md-5-6 pure-u-xl-11-12">
                <slot></slot>
            </div>
            <div class="trigger-btn pure-u-md-1-12 pure-u-xl-1-24" v-bind:click="slideNext">
                <span class="fa fa-right-chevron"></span>
            </div>
        </div>
    `
})

export let Block = Vue.component('block', {
    data: function() {
        return {
            title: "",
            contentBody: {},
            actions: []
        }
    },
    methods: {

    },
    mounted: function() {
        debugger;
        // this.blocks = this.
    },
    template: /* html */`
        <div class="bs-block">
            
        </div>
    `
})

export let BlockTitle = Vue.component('block-title', {
    data: function() {
        return {

        }
    },
    props: {
        
    },
    methods: {

    },
    template: /* html */`
        <div class="bs-block-title">
            <slot></slot>            
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
        <div class="bs-block-content">
            <slot></slot>
        </div>
    `
})

export let BlockAction = Vue.component('block-action', {
    data: function() {
        return {

        }
    },
    template: /* html */`
        <div class="bs-block-action">
            <slot></slot>
        </div>
    `
})
