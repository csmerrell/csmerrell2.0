export let CodeSample1 = `<div id="app">
<block-carousel id="bc-samples" v-cloak>
    <block>
        <block-title>
            DEMO: Component Web Frameworks
        </block-title>
        <block-content>
            <highlightjs autodetect :code="codeSample1" />                
        </block-content>
        <block-action>
            View Source
        </block-action>
    </block>
    <block>
        <block-title>
            Event-driven UX
        </block-title>
        <block-content>
            <highlightjs autodetect :code="codeSample2" />                
        </block-content>
    </block>
</block-carousel>
</div\>
<script type="module">
import { BlockCarousel, Block } from "/static/js/components/blockCarousel.js";

window.vms["vm-carousel"] = new Vue({
    el: "#app",
    components: [ BlockCarousel, Block ],
    data: { /* ... */ },
})
</script\>`

export let CodeSample2 = `methods: {
setActive: function() {
    this.isActive = true;
},
toggleActive: function() {
    let isFadeIn = !this.isActive;

    if(isFadeIn) {
        this.isActive = !this.isActive;
    }

    return new Promise((resolve, reject) => {
        if(!isFadeIn) {
            this.setAnimation("fadeOut", resolve);
        } else {
            this.setAnimation("fadeIn", resolve);
        }
    }).then(() => {
        this.isActive = isFadeIn;
        this.$el.classList.remove("fade-out");
        this.$el.classList.remove("pre-fade-in");
        this.$el.classList.remove("fade-in");
    })
},
setAnimation: function(animationName, resolve) {
    this.$el.addEventListener('transitionend', () => { this.onAnimationComplete(resolve) });
    
    if(animationName == "fadeOut") {
        this.$el.classList.add("fade-out");
    } else {
        this.$el.classList.add("pre-fade-in");
        this.isActive = true;
        debugger;
        this.$el.classList.add("fade-in");
    }
},
onAnimationComplete: function(resolve) {
    this.$el.removeEventListener('transitionend', this.onAnimationComplete);
    resolve();
}
},`
