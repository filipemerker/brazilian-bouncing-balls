<template>
  <div ref="generator" />
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

    }
  },
  methods: {

  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('boundsready', {bounds: [1, 12, 14, 20]});
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
