<template>
  <div>
    <div class="map-container" ref="map-container"></div>
    <bounds-generator
      :bounceCriteria="bounceCriteria"
      :widgetHeight="widgetHeight"
      :widgetWidth="widgetWidth"
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
import {mapPath, widgetSize, bounceCriteria} from '@/config'

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
      loading: true,
      generatingBounds: true,

      bounds: [],

      widgetHeight: widgetSize.height,
      widgetWidth: widgetSize.width,
      bounceCriteria,
      mapPath,
    }
  },
  methods: {
    createMap: function(bounds) {
      this.generatingBounds = false;
      this.bounds = bounds;
    }
  },
  mounted() {
    this.$nextTick(() => {

    })

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
