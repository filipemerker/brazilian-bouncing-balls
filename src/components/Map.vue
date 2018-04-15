<template>
  <div>
    <div class="map-container" ref="map-container"></div>
    <bounds-generator
      :bounceCriteria="bounceCriteria"
      :widgetHeight="width"
      :widgetWidth="height"
      :mapPath="mapPath"

      v-on:boundsready="createMap"
      v-if="generatingBounds"
    />
    <div id="brazil">
      <canvas ref="map" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Sketch from 'sketch-js'
import BoundsGenerator from '@/components/BoundsGenerator'
import {
  particlesLimit,
  bounceCriteria,
  widgetSize,
  mapPath,
} from '@/config'

export default {
  name: 'Map',
  components: {
    BoundsGenerator
  },
  props: {
    msg: String
  },
  data() {
    return {
      // States
      loading: true,
      generatingBounds: true,

      // Configs
      width: widgetSize.height,
      height: widgetSize.width,
      particlesRadiusRange,
      particlesLimit,
      bounceCriteria,
      mapPath,

      // Defaults
      particlesAmount: 0,
      particles: [],
      bounds: [],
      filters: {
        creatorId: '',
        feelingId: '',
        stateId: '',
        startDate: '',
        finishDate: ''
      },
      mouse: {
        in: false,
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    createMap: function(bounds) {
      this.generatingBounds = false;
      this.bounds = bounds;
    }
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
