<template>
  <div class="map">
    <div v-bind:class="['map-container', loading ? 'loading' : '']" ref="map">
      <transition name="fade" mode="out-in">
        <spinner v-if="loading" />
      </transition>
    </div>
    <div class="controls-container">
      <transition name="fade" mode="out-in">
        <controls v-on:update="filter" v-if="!loading" />
      </transition>
    </div>
    
    <bounds-generator
      :bounceCriteria="bounceCriteria"
      :widgetHeight="width"
      :widgetWidth="height"
      :mapPath="mapPath"

      v-on:boundsready="createMap"
      v-if="generatingBounds"
    />
  </div>
</template>

<script>
/* eslint-disable */
import Sketch from 'sketch-js'

import BoundsGenerator from '@/components/BoundsGenerator'
import Particle from '@/components/Particle'
import Controls from '@/components/Controls'
import Spinner from '@/components/Spinner'

import {
  particlesRadiusRange,
  particlesColorRange,
  particlesLimit,
  bounceCriteria,
  widgetSize,
  mapPath,
} from '@/config'
import {
  getRandom,
  likesToRadius,
  feelingToRGB
} from '@/helpers/formatters'

export default {
  name: 'Map',
  components: {
    BoundsGenerator,
    Controls,
    Spinner
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
      data:[],
      particleList: [],
      bounds: [],
      filterValue: '',
      mouse: {
        in: false,
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    particles () {
      const { filterValue } = this
      let list = this.particleList.slice()

      if (filterValue !== '') {
        list = list.filter(({ state: { feeling } }) => feeling === filterValue)
      }

      return this.addFakeParticles(list);
    }
  },
  methods: {
    createMap(bounds) {
      this.generatingBounds = false;
      this.bounds = bounds;

      this.getHugs();

      setTimeout(() => (this.loading = false), 1500);
    },

    getHugs() {
      const hugs = require('@/assets/json/hugs.json');

      this.createParticlesFromHugs(hugs.slice(0, this.particlesLimit));
    },

    filter(feeling) {
      const filter = particlesColorRange.findIndex(({ label }) => label.toLowerCase() === feeling)
      
      if (filter < 0) {
        this.filterValue = ''
      } else {
        this.filterValue = filter
      }
    },

    createParticlesFromHugs(hugs) {
      this.particleList = hugs.map(hug => this.createParticle({
        ...hug,
        radius: likesToRadius(hug.likes, this.particlesRadiusRange),
        rgb: feelingToRGB(hug.feeling),
        fake: false,
      }));

      this.particlesAmount = hugs.length;
    },

    createParticle(config) {
      return new Particle(Object.assign(config, {
        x: getRandom(0, this.width),
        y: getRandom(0, this.height),
        vx: getRandom(-0.6, 0.6),
        vy: getRandom(-0.6, 0.6),
        bounds: this.bounds,
        mouse: this.mouse,
        widgetSize: {
          width: this.width,
          height: this.height
        },
        actions: {
          particleCanHover: (id) => this.particleCanHover(id),
          putParticleOnTop: (id) => this.putParticleOnTop(id),
          getParticleIndex: (id) => this.getParticleIndex(id)
        }
      }));
    },

    addFakeParticles(list) {
      let remainningParticles = this.particlesLimit - (list.length )
      if (remainningParticles > 0) {
        for (var i = 0; i < remainningParticles; i++) {
          list.push(this.createParticle({
            id: false,
            fake: true,
            alpha: .15,
            radius: likesToRadius(getRandom(0, 40), this.particlesRadiusRange),
            rgb: {r: 235, g:214, b:180}
          }))
        }
      }

      return list
    },

    particleCanHover(id) {
      let canHover = false;
      let hoveredParticle = this.particles.filter(({ state: { isHovered } }) => isHovered)
      canHover = (hoveredParticle.length === 0) ? true : false
      canHover = (canHover || hoveredParticle && hoveredParticle.id === id) ? true : false

      return canHover
    },

    getParticleIndex(id) {
      return this.particles.findIndex(({ state }) => (state.id === id))
    },

    putParticleOnTop(id) {
      let oldIndex = this.getParticleIndex(id);

      this.particles.splice(0, 0, this.particles.splice(oldIndex, 1)[0]);
    }
  },
  mounted() {
    const update = function() {
      let i = this.particlesAmount;
      while (i--) {
        this.particles[i].update();
      }
    }
    const draw = function() {
      let i = this.particlesAmount;
      while (i--) {
        this.particles[i].draw(sketch);
      }
    }
    const mouseover = function() {
      this.mouse.in = true;
    }
    const mouseout = function() {

      this.mouse = Object.assign(this.mouse, {
        x: sketch.mouse.x,
        y: sketch.mouse.y,
        in: false
      });
    }
    const mousemove = function() {
      this.mouse = Object.assign(this.mouse, {
        x: sketch.mouse.x,
        y: sketch.mouse.y
      });
    }

    const sketch = Sketch.create({
      container: this.$refs.map,
      fullscreen: false,
      width: this.width,
      height: this.height,
      update: update.bind(this),
      draw: draw.bind(this),
      mouseover: mouseover.bind(this),
      mouseout: mouseout.bind(this),
      mousemove: mousemove.bind(this),
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.map {
  display: flex;
  align-items: center;
  justify-content: center;
}
.map-container {
  width: 500px;
  height: 500px;
  background: url('../assets/svg/brasil.svg') no-repeat center center;
  padding: 30px 10px 20px 10px;
  position: relative;
}
.controls-container {
  width: 200px;
}
.map-container .sketch{
  opacity: 1;
  transition: opacity .45s;
}
.map-container.loading .sketch{
  opacity: 0;
}
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
