# Tag Filterview Design
The "Tag Filterview," as I'm calling it, refers to the skill list displayed at the foot of this application's [home page](/). Despite the component-like name, this filterview is not actually a registered component. It's just a root vue instance that uses a `v-for` binding to display a databound list of `<filterable-tag>` components.

```html
<div id="vm-skill-filterview" class="skill-filterview pure-g pure-form hidden">
    <h2>Professional Skills</h2>
    <div class="pure-u-1 skill-filter">
        <input type="text" class="pure-input-1" v-on:keyup="updateFilter" placeholder="Filter skills"/>
    </div>
    <div class="skill-list pure-g">
        <div class="skill pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 pure-u-xl-1-4" v-for="(skill, key) in skills">
            <filterable-tag :data-key="key" :data-item="skill" :filter-str="filterStr" :on-filter="setVisibility"></filterable-tag>
        </div>
        <div class="fade-out" v-if="hasNoFilters()"></div>
    </div> 
</div>
```

## Filterable Tag
Let's cover the pivotal component, first. A filterable tag takes a `dataItem` and does two things:
1. Style itself as a clickable two-part tag (Logo + Shorthand Descriptor)
2. Watch a `filterStr` prop (managed by the parent) and run a keyword search anytime that filter changes to update its own visibility.

For the full Tag API specs, go [here](/TagApi)

### Updating Tag Visbility
The visibility of a tag is controlled by _the parent Vue Instance_:

```html
<div id="vm-skill-filterview">
    <!-- ... -->
    <div class="skill-list pure-g">
        <div class="skill pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 pure-u-xl-1-4" v-for="(skill, key) in skills">
            <filterable-tag :data-key="key" :data-item="skill" :filter-str="filterStr" :on-filter="setVisibility"></filterable-tag>
        </div>
    </div>
</div>
<script>
    window.vms["vm-skill-filterview"] = new Vue({
        el: "#vm-skill-filterview",
        components: [ FilterableTag ],
        data: {
            skills: skillMap, //Skill objects. Schema explained in API doc
        },
        methods: {
            //...
            setVisibility: function(e) {
                if(e.isVisible) {
                    e.$el.parentElement.classList.remove("hidden");
                } else {
                    e.$el.parentElement.classList.add("hidden");
                }
            }
        }
    });
</script>
```

The reason for controlling visibility at the parent level is simple: The parent is responsible for tag positioning, padding, margins, etc.
  
If each tag toggled its own display, the css for the `.skill-list .skill` class relation would still need to be updated. Leaving the responsibility of visibility to the parent allows the `FilterableTag` component to be atomic in the way that a component should be. Many fledgling Component developers make the mistake of putting logic inside components that eliminates the components portability.

### So what does the tag actually do?
The tag does two things: (1) Style itself as a two-part button, and (2) Watch a parent-provided `filterStr` prop to see if the filter matches any of the keywords from its own `dataItem`:

```js
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
                // ... Filtering Algorithm covered in the next section of this document
            }).then(() => {
                if(this.onFilter) {
                    this.onFilter(this);
                }
            })
        },
    },
});
```

For good measure, here's the body of the `shorthand-ft-tag` that is referenced above. It's a functionless styling component that was written so I could later add a togglable `expanded-ft-tag` for added details regarding each skill in my skill-list:

```js
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
});
```

## The Filtering Algorithm
To explain the filtering algorithm, some explanation of my tag's data structure is necessary. First, the data source:

```js
export let skills = [
    {
        shorthand: "HTML",
        logo: "html5Logo.png",
        url: "https://www.w3schools.com/html/default.asp",
        keywords: ["web", "html", "ux", "ui", "ui/ux", "design", "frontend", "client"]
    },
    {
        shorthand: "Javascript",
        logo: "javascriptLogo.png",
        url: "https://www.javascript.com/",
        keywords: ["web", "script", "javascript", "frontend", "client"]
    },
    {
        shorthand: "CSS",
        logo: "css3Logo.png",
        url: "https://www.w3schools.com/css/",
        keywords: ["web", "css", "ux", "ui", "ui/ux", "design", "style", "styles", "css3", "sass", "scss", "animation", "animations", "frontend", "client"]
    },
    {
        shorthand: "VueJS",
        logo: "vueLogo.png",
        url: "https://vuejs.org/",
        keywords: ["vue", "vuejs", "web", "modern", "javascript", "framework", "components", "databind", "databinding", "frontend", "client", "ui", "ux", "ui/ux", "modular", "module"]
    },
    // ...
]
```

Eventually, this data would be housed in a database, but building a DB wasn't my priority here. The key thing to watch here are the `shorthand` and `keywords` fields. Searching them as is wouldn't be that costly, since its such a small data set. I could perform a basic iterative `startsWith` search on all of these and my website wouldn't suffer a performance hit.

But I wanted to showcase something less basic:

### Hash Matching
When the data source is imported, I convert the keyword array into a key/value paired JSON map:

```js
import { skills } from "/static/js/localData/skills.js";
import { mapSkillArray, mapSkillKeywords } from "/static/js/util/mapper.js";

let skillMap = mapSkillArray(skills);
mapSkillKeywords(skillMap);

window.vms["vm-skill-filterview"] = new Vue({
    el: "#vm-skill-filterview",
    data: {
        skills: skillMap,
        //...
    },
});
```

The `mapSkillArray` and `mapSkillKeyword` algorithms above would take the single-item array:

```json
[ 
    {
        "shorthand" : "HTML",
        "logo" : "html5Logo.png",
        "url" : "https://www.w3schools.com/html/default.asp",
        "keywords" : ["web", "html", "ux", "ui", "ui/ux", "design", "frontend", "client"]
    }
]
```

And convert it to the following:

```json
{
    "HTML" : {
        "shorthand" : "HTML",
        "logo" : "html5Logo.png",
        "url" : "https://www.w3schools.com/html/default.asp",
        "keywords" : ["web", "html", "ux", "ui", "ui/ux", "design", "frontend", "client"],
        "keywordMap" : {
            "web" : "web",
            "html" : "html",
            "ux" : "ux",
            "ui" : "ui",
            "ui/ux" : "ui/ux",
            "design" : "design",
            "frontend" : "frontend",
            "client" : "client"
        }
    }
}
```

Now, with keywords mapped, our searching algorithm in the `filterStr` watch function can provide results in O(1) linear time (Technically `O(n)` because it runs for all `n` skills every time the filter changes):

```js
export let FilterableTag = Vue.component('filterable-tag', {
    data: function() {
        return {
            isVisible: true,
        }
    },
    watch: {
        filterStr: function() {
            let testFilter = new Promise((resolve) => {
                if(this.dataKey.toLowerCase() == this.filterStr.toLowerCase() || this.dataItem.keywordMap[this.filterStr.toLowerCase()]) {
                    this.isVisible = true;
                    resolve();
                    return;
                }
    
                this.isVisible = false;
                resolve();
            }).then(() => {
                if(this.onFilter) {
                    this.onFilter(this);
                }
            })
        },
    },
});
```

### Drawbacks
This sort of hashmap searching only works for exact-match searches. If you use my skill-filterview, you might be able to tell that it also supports `startsWith` matching. The honest answer for how I accomplished that is that I cheated. I also do a `startsWith` search that runs in O(n * m) time (`n == number of keywords`, `m == char length of each keyword`).

This brings the total searching algorithmic complexity to O(n<sup>3</sup>), with one magnitude each for `numSkills`, `numKeywords`, and `length(keyword)`:

```js
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
```

Because my dataset is so small, I can cheat like this and it won't hurt my application's performance at all:
* `numSkills`: ~30
* `numKeywords`: max(12), min(4), median(6)
* `length(keyword)`: max(20), min(3), median(8)
* Median-case searching cost: 30 * 6 * 8 = 1,440 operations (not bad as long as each operation doesn't do anything costly).

### But what about large datasets?
The two options that I immediately considered (there are others):

1. Expand the `mapSkillKeywords` function to extract additional key values from the existing keywords. 
    * This, in and of itself, could be a costly operation, and should preferrably be done once at the server level and then the extracted partial match keys should be stored along with the skill item itself in the database. Tag data items would get big, but likely not so big that it wouldn't be worth the immense time savings on the filter operation.

2. Extract the `startsWith` portion of the search into an asynchronous, cancellable method that continues to add items to the filterview as it finds them.
    * This would require a fair amount of refactoring from my current implementation, but it's a very viable search model. 
    * I initially set out to use this approach, but it's a non-trivial level of complexity creep on this component (This is why my current implementation uses a promise, even though the current algorithm doesn't need it).