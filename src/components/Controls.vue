<template>
  <div class="controls">
    <vue-slider ref="slider" v-model="value" v-bind="options"></vue-slider>
  </div>
</template>

<script>
/* eslint-disable */
import vueSlider from 'vue-slider-component'

export default {
  components: {
    vueSlider
  },
  data () {
    return {
      value: 200,
      options:{
        width: "100%",
        height: 4,
        dotSize: 15,
        min: 0,
        max: 200,
        lazy: true,
        show: true,
        tooltip: "always",
        tooltipDir: "top",
        piecewise: false,
        realTime: true,
        style: {
          "marginBottom": "30px"
        },
        bgStyle: {
          "backgroundColor": "#fff",
        },
        sliderStyle: {
          "backgroundColor": "#689349"
        },
        tooltipStyle: {
          "backgroundColor": "#689349",
          "borderColor": "#689349"
        },
        processStyle: {
          "backgroundImage": "-webkit-linear-gradient(left, #3b6f42, #689349)"
        },
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.controls {
  width: 100%;
  margin-left: 20px;
  display: inline-block;
}

</style>
