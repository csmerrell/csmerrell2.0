export let CodeSample1 = `<block-carousel id="bc-samples" v-cloak>
    <block>
        <block-title>
            Demo: Carousel Component
        </block-title>
        <block-content>
            <highlightjs autodetect :code="codeSample1" />                
        </block-content>
        <block-action-list>
            <block-action href="docs/BlockCarousel" target="_blank">
                View Documentation
            </block-action>
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
            <shorthand-ft-tag v-if="!isExpanded" :data-item="dataItem"></shorthand-ft-tag>
            <full-ft-tag v-else :data-item="dataItem"></full-ft-tag>
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
    --clr-bg: var(--clr-lt-base);
    --clr-bg-rgb: var(--clr-lt-base-rgb);
    --clr-bg-alt: var(--clr-lt-alt);
    --clr-bg-alt-rgb: var(--clr-lt-alt-rgb);
    --clr-bg-hover: var(--clr-lt-hover);
    --clr-bg-active: var(--clr-lt-active);
    --clr-bg-input: var(--clr-lt-input);
    --clr-border: var(--clr-lt-border);        

    --clr-fonts-base: var(--clr-fonts-black);
    --clr-fonts-alt: var(--clr-fonts-black-alt);
    --clr-fonts-active: var(--clr-fonts-black-active);
    --clr-fonts-inactive: var(--clr-fonts-white-inactive);

    --clr-primary: var(--clr-lt-primary);
    --clr-primary-alt: var(--clr-lt-primary-alt);
    --clr-primary-active: var(--clr-lt-primary-active);
    --clr-primary-inactive: var(--clr-lt-primary-inactive);

    --clr-accent: var(--clr-lt-accent);
    --clr-accent-alt: var(--clr-lt-accent-alt);
    --clr-accent-active: var(--clr-lt-accent-active);
    --clr-accent-inactive: var(--clr-lt-accent-inactive);
    --clr-accent-font: var(--clr-lt-accent-font);
}`