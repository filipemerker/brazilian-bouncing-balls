import { widgetSize, particlesAlpha } from './config';
import { getRandom } from '../../utils/formatters';
import colisionSystem from './colisionSystem.js';

class Particle {
  constructor(config) {
    this.state = {
      fake: config.fake,
      id: config.id,
      x: config.x,
      y: config.y,
      vx: config.vx,
      vy: config.vy,
      widgetSize: config.widgetSize,
      radius: config.radius,
      bounds: config.bounds,
      mouse: config.mouse,
      address: config.address,
      author: config.author,
      friends: config.friends,
      imageURL: config.imageURL,
      rgba: `rgba(${config.rgb.r}, ${config.rgb.g}, ${config.rgb.b}, ${particlesAlpha})`,
      stroke: 0,
      antiSlideLeft: 0,
      antiSlideRight: 0,
      antiRebounce: false,
      antiRebounceCornerUp: false,
      isAnimating: false,
      isHovered: false
    }

    this.actions = {
      particleCanHover: (id) => config.actions.particleCanHover(id),
      putParticleOnTop: (id) => config.actions.putParticleOnTop(id),
      getParticleIndex: (id) => config.actions.getParticleIndex(id),
      toggleTooltip: (data)  => config.actions.toggleTooltip(data)
    };
  }

  // Animate the particle when entering or leaving
  displayToggle(toggle) {
    this.state.isAnimating = toggle;
  }

  strokeToggle(switcher) {
    if (this.state.stroke >= 0.2 && this.state.stroke <= 1) {
      this.state.stroke += -0.2;
    } else {
      return false;
    }
  }

  applyHover() {

  }

  hoverChecker () {
    let state = this.state;
    let actions = this.actions;
    if(
      state.mouse.x < state.x + state.radius
      && state.mouse.x > state.x - state.radius
      && state.mouse.y < state.y + state.radius
      && state.mouse.y > state.y - state.radius
    ) {
      if(actions.particleCanHover(state.id)) {
        if(!state.isHovered) {
          actions.toggleTooltip({
            x: state.x + state.radius,
            y: state.y,
            author: state.author,
            friends: state.friends,
            id: state.id,
            state: state.address.state,
            city: state.address.city,
            imageURL: state.imageURL
          });
        }
        if(actions.getParticleIndex(state.id) > 0) {
          actions.putParticleOnTop(state.id);
        }
        state.isHovered = true;
      }
    } else {
      if(state.isHovered) actions.toggleTooltip();
      state.isHovered = false;
    }
  }

  // Draw our particle to the canvas.
  draw(ctx) {
    ctx.fillStyle = this.state.rgba;
    ctx.beginPath();
    ctx.arc(this.state.x, this.state.y, this.state.radius, 0, TWO_PI);
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.state.stroke})`;
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
  };

  // Update our position.
  update() {
    let state = this.state;
    if(!state.fake) {
      // Check if it's hovered
      this.hoverChecker();
    }
    
    // If is hovered, animate border and stop the ball
    if(!state.isHovered) {
      state.x += state.vx;
      state.y += state.vy;
      this.strokeToggle(0);
    } else {
      state.stroke = 1;
    }
    state = colisionSystem(state);
  }
};

export default Particle;
