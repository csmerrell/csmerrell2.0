import { hashString } from "/static/js/util/hasher.js";

export let FilterableTag = Vue.component('filterable-tag', {
    data: function() {
        return {
            hash: -1,
            isVisible: true,
        }
    },
    props: {
        dataKey: Number,
        dataItem: Object,
        filterStr: String
    },
    watch: {
        filterStr: function() {
            let filterHash = hashString(this.filterStr);
            if(this.hash == filterHash || this.dataItem.keywordMap[filterHash]) {
                //A matching hash was found. Check to be sure it's an actual match
                if(this.dataItem.shorthand == this.filterStr) {
                    //exact match!
                    this.isVisible = true;
                    return;
                }

                let keywordIdx = this.dataItem.keywords.findIndex((kw) => {
                    return kw == this.filterStr;
                });
                if(keywordIdx >= 0) {
                    //matched one of the keywords successfully
                    this.isVisible = true;
                    return;
                }
            }

            this.isVisible = false;

            //An instant match against the hashes wasn't found. Execute a 'starts with' matching search that may take longer.
            //For big datasets, this would ideally move to the server as an asynchronous, cancellable function.
            for(var kw of this.dataItem.keywords) {
                if(kw.startsWith(this.filterStr)) {
                    //A 'starts with' match was found
                    this.isVisible = true;
                    return;
                }    
            };
        },
    },
    methods: {
        checkKeywordArray: async function() {
            for(var kw of this.dataItem.keywords) {
                if(kw.indexOf(this.filterStr) >= 0) {
                    //A substring, or 'contains' match was found
                    this.isVisible = true;
                    return;
                }
            }

            return;
        }
    },
    mounted: function() {
        this.hash = parseInt(this.dataKey);
    },
    template: /* html */`
        <div class="ft-tag" v-show="isVisible">
            <link href="static/css/compiled/components/filterableTag.css" rel="stylesheet" />
            <img class="ft-tag-img" v-if="dataItem.logo" :src="'/static/img/logos/' + dataItem.logo" />
            {{dataItem.shorthand}}
        </div>
    `
})