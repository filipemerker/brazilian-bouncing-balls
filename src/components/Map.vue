<template>
  <div>
    <div class="map-container" ref="map"></div>
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

import {
  particlesRadiusRange,
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
    createMap(bounds) {
      this.generatingBounds = false;
      this.bounds = bounds;

      this.getHugs();
    },

    getHugs() {
      const hugs = require('@/assets/json/hugs.json');

      this.createParticlesFromHugs(hugs.slice(0, this.particlesLimit));
    },

    createParticlesFromHugs(hugs) {
      this.particles = hugs.map(hug => this.createParticle({
        fake: false,
        id: hug.id,
        radius: likesToRadius(hug.likes, this.particlesRadiusRange),
        rgb: feelingToRGB(hug.feeling || 1),
        message: hug.comment,
        address: {
          city: hug.address.city,
          state: hug.address.state
        },
        author: hug.name
      }));

      this.particlesAmount = hugs.length;
      this.createFakeParticles();
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

    createFakeParticles() {
      let remainningParticles = this.particlesLimit - this.particlesAmount;
      if (remainningParticles > 0) {
        for (var i = 0; i < remainningParticles; i++) {
          this.particles.push(this.createParticle({
            id: false,
            fake: true,
            radius: likesToRadius(getRandom(0, 40), this.particlesRadiusRange),
            rgb: {r: 235, g:214, b:180}
          }));
        }
      }
      this.particlesAmount = this.particlesLimit;
    },

    particleCanHover(id) {
      let canHover = false;
      let hoveredParticle = this.particles.filter(particle => {
        return particle.state.isHovered
      });
      canHover = (hoveredParticle.length === 0) ? true : false;
      canHover = (canHover || hoveredParticle && hoveredParticle.id === id) ? true : false;

      return canHover;
    },

    getParticleIndex(id) {
      let index;
      this.particles.map((particle, i) => {
        if(id === particle.state.id) index = i;
      })
      return index;
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
.map-container {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  background: url('../assets/svg/brasil.svg') no-repeat center center;
  padding: 30px 10px 20px 10px;
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
