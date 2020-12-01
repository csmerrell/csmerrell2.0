export let CodeSample1 = `<block-carousel id="bc-samples" v-cloak>
    <block>
        <block-title>
            Demo: Carousel Component
        </block-title>
        <block-content>
            <highlightjs autodetect :code="codeSample1" />                
        </block-content>
        <block-action-list>
            <block-action href="docs/BlockCarousel/GettingStarted" target="_blank">
                Usage
            </block-action>
            <!-- Additional Action/Nav Buttons -->
        </block-action-list>
    </block>
    <!-- Additional blocks as needed -->
</block-carousel>
<!-- Block Carousel vm mounting and data config -->
<script type="module">
    import { BlockCarousel, Block } from "/static/js/components/blockCarousel.js";
    import { CodeSample1, CodeSample2, CodeSample3 } from "/static/js/localData/codeSamples.js";

    window.vms["vm-carousel"] = new Vue({
        el: "#vm-carousel",
        components: [ BlockCarousel, Block ],
        data: {
            codeSample1: CodeSample1,
            codeSample2: CodeSample2,
            codeSample3: CodeSample3
        },
        mounted: function() {
            setTimeout(() => {
                window.mainLoaderEl.style.display ="none";
                window.homeEl.style.display = "block";
            }, 1000)
        }
    })
</script>`

export let CodeSample2 = `export let FilterableTag = Vue.component('filterable-tag', {
    data: function() {
        return {
            isVisible: true,
        }
    },
    props: {
        dataKey: String,
        dataItem: Object,
        filterStr: String,
        onFilter: Function
    },
    template: /* html */\`
        <div :id="'ft-' + dataKey" class="ft-container" v-on:click="openUrl">
            <shorthand-ft-tag :data-item="dataItem"></shorthand-ft-tag>
        </div>
    \`,
    watch: {
        filterStr: function() {
            let testFilter = new Promise((resolve) => {
                if(this.dataKey.toLowerCase() == this.filterStr.toLowerCase() || this.dataItem.keywordMap[this.filterStr.toLowerCase()]) {
                    this.isVisible = true;
                    resolve();
                    return;
                }
    
                this.isVisible = false;
    
                //An instant match against the hashes wasn't found. Execute a 'starts with' matching search that may take longer.
                //For big datasets, this would ideally move to the server as an asynchronous, cancellable function and results would iteratively load in as they are found
                for(var kw of this.dataItem.keywords) {
                    if(kw.toLowerCase().startsWith(this.filterStr.toLowerCase())) {
                        //A 'starts with' match was found
                        this.isVisible = true;
                        resolve();
                        return;
                    }    
                };

                resolve();
            }).then(() => {
                if(this.onFilter) {
                    this.onFilter(this);
                }
            })
        },
    },
    methods: {
        toggleView: function() {
            //TODO: Convert these to detailed views
            // this.isExpanded = !this.isExpanded;
            // this.ontoggle(this);
        },
        openUrl: function() {
            //Until skill detailed views are implemented, make the tags serve as anchors to a homepage for the library/concept
            if(this.dataItem.url) {
                window.open(this.dataItem.url, '_blank');
            }
        }
    },
})`

export let CodeSample3 = `:root[theme='dark'] {
    --clr-bg: var(--clr-dk-base);
    --clr-bg-alt: var(--clr-dk-alt);
    --clr-bg-hover: var(--clr-dk-hover);
    --clr-bg-active: var(--clr-dk-active);

    --clr-fonts-base: var(--clr-fonts-white);
    --clr-fonts-alt: var(--clr-fonts-white-alt);
    --clr-fonts-active: var(--clr-fonts-white-active);
    --clr-fonts-inactive: var(--clr-fonts-white-inactive);

    --clr-primary: var(--clr-dk-primary);
    /* ... Primary Color Variants */

    --clr-accent: var(--clr-dk-accent);
    /* ... Accent Color Variants */
}

body {
    background-color: var(--clr-bg);
    color: var(--clr-fonts-base);

    .pure-button {
        background-color: var(--clr-accent);
        color: var(--clr-accent-font);
    
        &:hover {
            background-color: var(--clr-accent-alt);
        }
    
        &:active {
            background-color: var(--clr-accent-active);
        }
    
        &:disabled {
            background-color: var(--clr-accent-inactive);
        }
    }
}`