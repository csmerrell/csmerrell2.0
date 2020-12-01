# Filterable Tag API
A styled tag that tracks whether it should be visible or not based on a supplied filter string.

## Usage
```html
<div id="vm-filterview" class="tag-list">
    <input type="text" v-model="userFilter">
    <div class="tag-spacing" v-for="(tag, key) in tagItems">
        <filterable-tag :data-key="key" :data-item="tag" :filter-str="userFilter" on-filter="setVisbility"></filterable-tag>
    </div>
</div>
<script type="module">
    let itemMap = {
        "item1" : {
            shorthand: "Item 1",
            url: "someUrl",
            logo: null, //path to a logo if available (png/svg)
            altIcon: "fa-check", //Current supports font-awesome style iconography as alternative to a logo file
            keywords: [/* string list */],
            keywordMap: {
                /* key/value pair mapped version of the keywords array */
            }
        },
        "item2" : {
            /* ... */
        },
        // ...
    }

    window.vms["vm-filterview"] = new Vue({
        el: "#vm-filterview",
        components: [ FilterableTag ],
        data: {
            tagItems: itemMap,
            userFilter: ""
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

## Props
* `dataKey`: String (Required)
    * Default Value: `null`
    * A key using the core string this tag would match against in a filter event.
    * Usage:
    ```html
        <filterable-tag :data-key="someVal"></filterable-tag>
    ```
* `dataItem`: Object (Required)
    * Default Value: `null`
    * The item to display in the tag's body.
    * Schema:
    ```json
        {
            "shorthand" : "Example", //String (Displays in the tag's right space)
            "logo" : "path/to/logo.png", //String (Displays in the tags left space)
            "altIcon" : "fa-check", //String (Font awesome icon class name. Displays in the logo space if logo not provided)
            "url" : "https://navToLink.dev", //String (Clicking the tag will open this link in a new tab)
            "keywordMap" : {
                "keyword1" : "keyword1",
                "keyword2" : "..." // Only the key's existence will be checked. The values can be anything (null-inclusive).
            },
            "keywords" : [ /* List of keyword strings */ ] //Only required for current implementation with temporary `startsWith` matching
        }
    ```
    * Usage:
    ```html
        <script>
            let exampleItem = {
                shorthand: "Example",
                logo : "path/to/logo.png",
                altIcon : "fa-check",
                url : "https://navToLink.dev",
                keywordMap : {
                    "keyword1" : "keyword1",
                    "keyword2" : null
                },
                keywords : [ "keyword1", "keyword2" ]
            }
        </script>
        <filterable-tag :dataItem="exampleItem"></filterable-tag>
    ```
* `filterStr`: String (Required)
    * Default Value: `null`
    * A string that will be run against the tag's filtering algorithm. 
        * If it matches the `dataKey` or a keyword in `dataItem.keywordMap`, the tag will report to its parent that its `isVisible` value has been set to `true`.
        * If no match is found, the tag will report to its parent that its `isVisible` value has been set to `false`.
    * Usage:
    ```html
        <script type="module">
            window.vms["vm-filterview"] = new Vue({
                el: "#vm-filterview",
                data: {
                    userFilter: ""
                }
            });
        </script>
        <div id="vm-filterview" class="tag-list">
            <input type="text" v-model="userFilter">
            <filterable-tag :filter-str="userFilter"></filterable-tag>
        </div>
    ```
* `onFilter`: Function
    * Default Value: `null`
    * A callback function that fires anytime the tag's `fiterStr` watch function completes.
    * Params:
        * `e` : EventArgs Object (`FilterableTag` component instance)
            * Schema:
            * `isVisible`: Boolean
                * Whether the tag should be visible, per the provided `filterStr`
            * (Other props inherited from `Vue.component`)
    * Usage:
    ```html
        <script type="module">
            window.vms["vm-filterview"] = new Vue({
                el: "#vm-filterview",
                data: {
                    userFilter: ""
                },
                methods: {
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
        <div id="vm-filterview" class="tag-list">
            <input type="text" v-model="userFilter">
            <filterable-tag :filter-str="userFilter" :on-filter="setVisibility"></filterable-tag>
        </div>
    ```

