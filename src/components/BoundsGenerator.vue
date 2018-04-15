<template>
  <div ref="generator">
    <canvas ref="map" class="invisibleMap"></canvas>
    <canvas ref="mapcanvg" class="invisibleMap"></canvas>
  </div>
</template>

<script>
/* eslint-disable */
import canvg from 'canvg-browser';

export default {
  name: 'BoundsGenerator',
  props: {
    mapPath: String,
    bounceCriteria: Number,
    widgetHeight: Number,
    widgetWidth: Number
  },
  data() {
    return {
      bounds: []
    }
  },
  methods: {
    getBoundsFromData: function() {
      const ctx = this.$refs.map.getContext('2d');
      const { widgetWidth: width, widgetHeight: height } = this;
      
      ctx.drawImage(this.$refs.mapcanvg, 0, 0, width, width, 2, 2, width - 5, height - 5);
      
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      let lastAlpha = 0;
      let currentAlpha = 0;
      let alphaMap = [];
      let bounds = [];
      let alphaMapInc = 4;
      let currentFraction;

      let fractionDividendHorizontal = this.bounceCriteria;
      const fractionHorizontal = height / fractionDividendHorizontal;

      // Creates a array with one index for every pixel's alpha
      for (let b=0, hs=height * width; b<hs; b++) {
        alphaMap[b] = data[alphaMapInc - 1];

        alphaMapInc += 4;
      }

      // Creates a map with the defined number of x bounds for particles reflection
      for (let y=0, hs=fractionDividendHorizontal; y<hs; y++) {
        for (let x=0, ws=width; x<ws; x++) {
          currentFraction = Math.round(fractionHorizontal * (y + 1));
          currentAlpha = alphaMap[(currentFraction * width) + x];
          if (lastAlpha === 0 && currentAlpha !== 0) {
            bounds.push([{y:currentFraction, x:x}]);
          }
          if (lastAlpha !== 0 && currentAlpha === 0) {
            if (bounds[bounds.length - 1][0].y !== currentFraction) {
              bounds.pop();
            } else {
              bounds[bounds.length - 1].push({y:currentFraction, x:x});
            }
          }
          lastAlpha = currentAlpha;
        }
      }

      this.bounds = bounds;
    }
  },
  async mounted() {
    const { widgetWidth: width, widgetHeight: height, mapPath } = this;
    const { map, mapcanvg } = this.$refs;

    map.width = mapcanvg.width = width;
    map.height = mapcanvg.height = height;

    await canvg(mapcanvg, mapPath, {
      scaleWidth: width,
      scaleHeight: height,
      renderCallback: () => this.getBoundsFromData()
    });

    this.$emit('boundsready', this.bounds);
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
