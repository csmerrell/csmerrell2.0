export let FilterableTag = Vue.component('filterable-tag', {
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
    template: /* html */`
        <div :id="'ft-' + dataKey" class="ft-container" v-on:click="openUrl">
            <shorthand-ft-tag :data-item="dataItem"></shorthand-ft-tag>
        </div>
    `,
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
})

export let ShorthandTag = Vue.component('shorthand-ft-tag', {
    props: {
        dataItem: Object,
    },
    template: /* html */`
        <div class="ft-shorthand">
            <div class="ft-ico-block">
                <img class="ft-img" :alt="dataItem.shorthand + ' logo'" v-if="dataItem.logo" :src="'/static/img/logos/' + dataItem.logo" />
                <span class="ft-ico fa" :class="dataItem.altIcon" v-if="!dataItem.logo"></span>
            </div>
            <div class="ft-label-block">
                {{dataItem.shorthand}}
            </div>
        </div>
    `
})

export let FullTag = Vue.component('full-ft-tag', {
    props: {
        dataItem: Object,
    },
    template: /* html */`
        <div class="ft-full">
            <div class="ft-ico-block">
                <img class="ft-img" :alt="dataItem.shorthand + ' logo'" v-if="dataItem.logo" :src="'/static/img/logos/' + dataItem.logo" />
                <span class="ft-ico fa" :class="dataItem.altIcon" v-if="!dataItem.logo"></span>
            </div>
            <div class="ft-details-block">
                <ul>
                    <li>{{dataItem.shorthand}}</li>
                    <li>Years: {{dataItem.years}}</li>
                    <li>Proficiency: {{dataItem.proficiency}}</li>
                    <li>Notes:</li>
                </ul>
            </div>
        </div>
    `
})