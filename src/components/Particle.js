import { particlesAlpha } from '@/config';
import colisionSystem from '@/helpers/colisionSystem';

class Particle {
  constructor(config) {
    const { rgb: { r, g, b }, alpha = particlesAlpha } = config

    this.state = {
      ...config,
      rgba: `rgba(${r}, ${g}, ${b}, ${alpha})`,
      stroke: 0,
      antiSlideLeft: 0,
      antiSlideRight: 0,
      antiRebounce: false,
      antiRebounceCornerUp: false,
      isAnimating: false,
      isHovered: false
    }

    this.actions = config.actions
  }

  // Animate the particle when entering or leaving
  displayToggle(toggle) {
    this.state.isAnimating = toggle
  }

  strokeToggle() {
    if (this.state.stroke >= 0.2 && this.state.stroke <= 1) {
      this.state.stroke += -0.2
    } else {
      return false
    }
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
            x: state.x + (state.radius / 2),
            y: state.y + (state.radius / 2),
            radius: state.radius * 2,
            author: state.author,
            message: state.message,
            address: state.address,
            image: state.image,
            thumb: state.thumb,
            id: state.id,
            state: state.address.state,
            city: state.address.city,
          })
        }
        if(actions.getParticleIndex(state.id) > 0) {
          actions.putParticleOnTop(state.id)
        }
        state.isHovered = true
      }
    } else {
      if(state.isHovered) {
        actions.toggleTooltip()
      }
      state.isHovered = false
    }
  }

  // Draw our particle to the canvas.
  draw(ctx) {
    const { state } = this
    ctx.fillStyle = state.rgba
    ctx.beginPath()
    ctx.arc(state.x, state.y, state.radius, 0, TWO_PI) //eslint-disable-line
    ctx.strokeStyle = `rgba(255, 255, 255, ${state.stroke})`
    ctx.lineWidth = 1
    ctx.fill()
    // if (!state.fake) {
    //   const label [state.feeling].label;
    //   const width = ctx.measureText(label).width;
    //   ctx.fillText(label, state.x - (width / 2), state.y - state.radius)
    // }
    ctx.stroke()
  }

  // Update our position.
  update() {
    let state = this.state
    if(!state.fake) {
      // Check if it's hovered
      this.hoverChecker()
    }
    
    // If is hovered, animate border and stop the ball
    if(!state.isHovered) {
      state.x += state.vx
      state.y += state.vy
      this.strokeToggle(0)
    } else {
      state.stroke = 1
    }
    state = colisionSystem(state)
  }
}

export default Particle
