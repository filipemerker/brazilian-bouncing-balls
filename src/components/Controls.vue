<template>
  <div class="controls">
    <div class="control">
      <vue-slider
        ref="slider"
        v-model="value"
        v-bind="options"
        v-on:callback="update"
      />
      
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import vueSlider from 'vue-slider-component'
import { particlesColorRange } from '@/config'

export default {
  components: {
    vueSlider
  },
  data () {
    return {
      value: 'TODOS',
      options:{
        width: 2,
        height: 500,
        data: [
          "AMOR",
          "SAUDADE",
          "CARINHO",
          "CONFORTO",
          "ALEGRIA",
          "AMIZADE",
          "GRATIDÃO",
          "INSPIRAÇÃO",
          "PAIXÃO",
          "ESPERANÇA",
          "TODOS",
        ],
        direction: "vertical",
        lazy: true,
        show: true,
        tooltip: "false",
        piecewise: true,
        piecewiseLabel: true,
        realTime: true,
        piecewiseStyle: {
          "backgroundColor": "#ccc",
          "visibility": "visible",
          "width": "12px",
          "height": "12px",
          "margin-left": '-10px',
        },
        labelStyle: {
          "margin-left": '0px',
          'color': '#ccc',
          'font-weight': '900',
          'font-size': '10px'
        },
        style: {
          "marginTop": "30px"
        },
        bgStyle: {
          "backgroundColor": "#ccc",
        },
        sliderStyle: {
          "backgroundColor": "#689349"
        },
        tooltipStyle: {
          "backgroundColor": "#689349",
          "borderColor": "#689349"
        },
        processStyle: {
          "backgroundColor": "#ccc"
        },
      }
    }
  },
  methods: {
    update: function (value) {
      const feeling = value.toLowerCase()
      
      this.$emit('update', feeling)
      this.changeColor(feeling)
    },
    changeColor: function(feeling) {
      const particleConfig = particlesColorRange.find(item => feeling === item.label.toLowerCase())
      let backgroundColor = `rgb(204, 204, 204)`

      if (particleConfig) {
        const { color: c } = particleConfig

        backgroundColor = `rgb(${c.r}, ${c.g}, ${c.b}`
      }

      this.options.sliderStyle = { backgroundColor }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.controls {
  width: 100%;
  margin-left: 50px;
  display: inline-block;
}

</style>
