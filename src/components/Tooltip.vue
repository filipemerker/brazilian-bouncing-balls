<template>
  <div v-if="visible" class="tooltip-wrapper" v-bind:style="styleObject" v-on:click="open">
  </div>
</template>

<script>
export default {
  name: 'tooltip',
  props: ['config'],
  watch: { 
    config: function(newVal) { // watch it
      if(newVal) {

        this.styleObject.left = `${newVal.x}px`
        this.styleObject.top = `${newVal.y}px`
        this.styleObject.width = `${newVal.radius + 10}px`
        this.styleObject.height = `${newVal.radius + 10}px`

        this.visible = true
      } else {
        this.visible = false
      }
    }
  },
  data() {
    return {
      visible: false,
      data: {},
      styleObject: {
        left: '0px',
        top: '0px',
        width: '0px',
        height: '0px'
      }
    }
  },
  methods: {
    open() {
      this.$router.push({ name: 'detail', params: this.config}) // eslint-disable-line
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tooltip-wrapper {
  position: absolute;
  transform: translate(-50%, -50%);
  margin-top: 22px;
  margin-left: 4px;
  cursor: pointer;
}


</style>
