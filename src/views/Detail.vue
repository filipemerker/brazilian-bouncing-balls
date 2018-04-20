<template>
  <div class="detail">
    <div class="detail-container">
      <h1 class="title-cover">NORDIC FJORDS</h1>
      <picture class="cover animation">
        <img src="https://picsum.photos/850/500?image=11">
      </picture>
      <div class="data">
        <div class="paragraph">
          <h2 class="animated">Nordic Fjords</h2>
          <p class="animated">Lorem ipsum  dolor site amet consectetur Lorem ipsum  doetur Lorem ipsum  dolor site amet consectetur Lorem ipsum  dolor site amet consectetur Lorem ipsum  dolor site amet consectetur Lorem ipsum  dolor site amet consectetur </p>
        </div>
      </div>
      <div class="ribbon"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  mounted() {
    console.log(this);
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
.data.paragraph {
  margin-top: -35px;
}
.data .animated {
  opacity: 0;
  display: inline-block;
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

  animation-delay: 3.542s;
}
.data h2 {
  font-size: 35px;
  font-weight: 100;
  line-height: 1em;
  text-align: left;
  margin-bottom: 10px;

  animation-delay: 3.462s;
}
.ribbon {
  height: 70px;
  width: 0px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  background: #5d7155;

  animation-name: ribbonParallax;
  animation-duration: 1.1s; 
  animation-timing-function: cubic-bezier(0.7, 0.21, 0.61, 0.69); 
  animation-delay: 2.2s;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.cover {
  position: absolute;
  overflow: hidden;
  width: 850px;
  height: 500px;
  left: 0;
  top: 0;


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

@keyframes ribbonParallax { 
      0% { width: 0; }
    100% { width: 380px; }
}

@keyframes imageParallax { 
      0% { width: 850px; }
    100% { width: 550px; }
}

</style>
