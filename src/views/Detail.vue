<template>
  <div v-if="$route.params.id" class="detail">
    <div class="detail-container">
      <h1 class="title-cover">{{ address }}</h1>
      <div :style="{ 'background-image': `url(${hug.thumb})` }" class="cover animation">
        <img v-if="hug.image" v-lazy="hug.image">
      </div>
      <div class="data">
        <div class="paragraph">
          <h2 class="animated">{{ hug.author }}</h2>
          <p class="animated">{{ hug.message }}</p>
        </div>
      </div>
      <router-link :to="'/'">
        <div class="ribbon">
          <div class="back">
            <div class="arrow"></div>
            VOLTAR
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      hug: {
        address: {},
        thumb: ''
      }
    }
  },
  computed: {
    address() {
      return `${this.hug.address.city}, ${this.hug.address.stateAbbreviation}`
    }
  },
  mounted() {
    this.hug = this.$route.params;

    if (!this.$route.params.id) {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.detail {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: hidden;
}
.detail-container {
  width: 850px;
  height: 500px;
  position: relative;
  background: white;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  box-shadow: 0 19px 58px rgba(0,0,0,0.30), 0 15px 22px rgba(0,0,0,0.22);
}
.data {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 20px 50px;
  height: 100%;
  width: 300px;
  position: relative;
  z-index: 0;
}
.data .paragraph {
  margin-top: -35px;
}
.data .animated {
  opacity: 0;
  animation-name: fadeInDown;
  animation-duration: .6s; 
  animation-timing-function: cubic-bezier(0.56, 0.17, 0.58, 1); 
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.data p {
  font-size: 12px;
  text-align: left;
  flex: 1 100%;

  animation-delay: 3.542s;
}
.data h2 {
  font-size: 35px;
  font-weight: 100;
  line-height: 1em;
  text-align: left;
  margin-bottom: 10px;
  margin-top: 10px;
  flex: 1 100%;
  animation-delay: 3.462s;
}
.ribbon {
  height: 70px;
  width: 0px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  background-color: #728669;

  transition: background-color .3s ease-in-out;

  animation-name: ribbonParallax;
  animation-duration: 1.1s; 
  animation-timing-function: cubic-bezier(0.7, 0.21, 0.61, 0.69); 
  animation-delay: 2.2s;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.back {
  color: white;
  line-height: 4.2rem;
  text-indent: 50px;
  opacity: 0;

  animation-name: fadeIn;
  animation-duration: .5s; 
  animation-timing-function: cubic-bezier(0.7, 0.21, 0.61, 0.69); 
  animation-delay: 3.642s;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.arrow {
  position: absolute;
  top: 50%;
  margin-top: -6px;
  right: 100%;
  margin-right: -159px;
  width: 0px;
  overflow: hidden;
  transition: margin-right .3s ease-in-out;

  animation-name: arrowParallax;
  animation-duration: .4s; 
  animation-timing-function: cubic-bezier(0.7, 0.21, 0.61, 0.69); 
  animation-delay: 3.542s;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.arrow:before {
  content: "";
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid white;
  display: block;
}
.arrow:after {
  content: "";
  width: 80px;
  height: 1px;
  background-color: white;
  display: block;
  position: relative;
  top: -5px;
  left: 5px;
}


.ribbon:hover {
  background-color: #648655;
}
.ribbon:hover .arrow {
  margin-right: -150px;
}

.cover {
  position: absolute;
  overflow: hidden;
  width: 850px;
  height: 500px;
  left: 0;
  top: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;


  animation-name: imageParallax;
  animation-duration: 1.2s; 
  animation-timing-function: cubic-bezier(0.85, 0.03, 0.47, 1.01); 
  animation-delay: 2.5s;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.cover img{
  position: absolute;
  overflow: hidden;
  width: 850px;
  height: 500px;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
}

.title-cover {
  position: absolute;
  top: calc(50% - 20px);
  left: 50%;
  transform: translate3d(-50%, -50%, 1px);
  color: black;
  z-index: 5;

  animation-name: fadeOut;
  animation-duration: .9s; 
  animation-timing-function: cubic-bezier(0.85, 0.03, 0.47, 1.01); 
  animation-delay: 2s;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes fadeInDown { 
    0% {
      opacity: 0;
      transform: translateY(-40px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    } 
}

@keyframes fadeOut { 
      0% { opacity: 1; }
    100% { opacity: 0; }
}

@keyframes fadeIn { 
      0% { opacity: 0; }
    100% { opacity: 1; }
}

@keyframes arrowParallax { 
      0% { width: 0; }
    100% { width: 85px; }
}

@keyframes ribbonParallax { 
      0% { width: 0; }
    100% { width: 380px; }
}

@keyframes imageParallax { 
      0% { width: 850px; }
    100% { width: 550px; }
}

</style>
