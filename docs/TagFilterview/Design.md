# Tag Filterview Design (Under Construction)
The "Tag Filterview," as I'm calling it, refers to the skill list displayed at the foot of this application's main page. Despite the name, this filterview is not actually a registered component. It's just a root vue instance that uses a `v-for` binding to display a databound list of `<filterable-tag>` components.

```html
<div id="vm-skill-filterview" class="skill-filterview pure-g pure-form hidden">
    <div class="pure-u-1-24 pure-u-lg-1-12 pure-u-xl-1-6"></div>
    <div class="pure-u-11-12 pure-u-lg-5-6 pure-u-xl-2-3">
        <h2>Professional Skills</h2>
        <div class="pure-u-1 skill-filter">
            <input type="text" class="pure-input-1" v-on:keyup="updateFilter" placeholder="Filter skills"/>
        </div>
        <div class="skill-list pure-g">
            <div class="skill pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 pure-u-xl-1-4" v-for="(skill, key) in skills">
                <filterable-tag :data-key="key" :data-item="skill" :filter-str="filterStr" :on-filter="setVisibility"></filterable-tag>
            </div>
            <div class="fade-out" v-if="hasNoFilters()"></div>
            \{{> loaders/centerAdjusted loaderId="skill-loader" pos="absolute" opacity="transparent" }}
        </div> 
    </div>
    <div class="pure-u-1-24 pure-u-lg-1-12 pure-u-xl-1-6"></div>
</div>
```

