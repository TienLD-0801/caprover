<template>
  <div class="loader-wrapper" v-if="showSite || true" >
    <div class="loader">
    </div>
    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

let myVar;
const showSite = ref(true);

const myFunction = () => {
  myVar = showPage;
}

onMounted(() => myFunction());

const showPage = () => {
  showSite.value = false;
}
</script>

<style lang="scss" scoped>
.loader-wrapper {
  --line-width: .5px;
  --curtain-color: #f5f7ff;
  --outer-line-color: #787ce6;
  --middle-line-color: #4c459d;
  --inner-line-color: #384deb;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.loader {
  display: block;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border: var(--line-width) solid transparent;
  border-top-color: var(--outer-line-color);
  border-radius: 100%;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  z-index: 1001;
}

.loader:before {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: var(--line-width) solid transparent;
  border-top-color: var(--inner-line-color);
  border-radius: 100%;
  -webkit-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
}

.loader:after {
  content: "";
  position: absolute;
  top: 14px;
  left: 14px;
  right: 14px;
  bottom: 14px;
  border: var(--line-width) solid transparent;
  border-top-color: var(--middle-line-color);
  border-radius: 100%;
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.loader-wrapper .loader-section {
  position: fixed;
  top: 0;
  background: var(--curtain-color);
  width: 51%;
  height: 100%;
  z-index: 1000;
}

.loader-wrapper .loader-section.section-left {
  left: 0;
}

.loader-wrapper .loader-section.section-right {
  right: 0;
}

/* Loaded Styles */
.loaded .loader-wrapper .loader-section.section-left {
  transform: translateX(-100%);
  transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.loaded .loader-wrapper .loader-section.section-right {
  transform: translateX(100%);
  transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.loaded .loader {
  opacity: 0;
  transition: all 0.3s ease-out;
}

.loaded .loader-wrapper {
  visibility: hidden;
  transform: translateY(-100%);
  transition: all 0.3s 1s ease-out;
}

::-moz-selection {
  /* Code for Firefox */
  color: #fff;
  background: var(--color-primary);
}

::selection {
  color: #fff;
  background: var(--color-primary);
}

#box {
  height: 500px;
  width: 500px;
  border: 2px solid var(--color-primary);
  position: relative;
}

#tooltip {
  opacity: 0;
  position: absolute;
  background-color: black;
  color: white;
  top: 10px;
  left: 0;
}

#box:hover #tooltip {
  opacity: 1;
}

.mouse-hover #listcontainer .li1 {
  display: block;
  width: 210px;
  height: 130px;
  border: 1px solid var(--color-primary);
  position: relative;
}
.mouse-hover .li1 span {
  position: absolute;
  top: 140px;
  left: 0px;
  right: 0;
  width: 220px;
  padding: 2px 0;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.65);
  color: #fff;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  text-align: center;
  font-family: Arial;
  font-size: 14px;
}
.mouse-hover .li1:hover span {
  opacity: 1;
}
.mouse-hover .li1:hover span:hover {
  opacity: 0;
}

.tp-img-reveal-wrapper {
  width: auto;
  height: auto;
}

.rts-hover-wrapper {
  border-radius: 10px;
  display: inline-block;
}
.rts-hover-wrapper .rts-hover-title {
  color: #fff !important;
  margin-bottom: 6px;
  font-size: 24px;
  line-height: 24px;
  padding: 7px 20px;
  background-color: rgba(0, 0, 0, 0.788);
  margin-bottom: 3px;
}
.rts-hover-wrapper .rts-hover-subtitle {
  color: #fff !important;
  margin-bottom: 10px;
  padding: 7px 20px;
  background-color: rgba(0, 0, 0, 0.726);
  font-size: 14px;
  max-width: max-content;
}
.rts-hover-wrapper p {
  display: none;
}
</style>