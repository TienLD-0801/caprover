<template>
  <div class="wrapper_app">
    <div class="container !pb-4 sm:!pb-6 md:!pb-9">
      <p class="flex justify-center pt-10 pb-[5px]">
        <img
          :src="businessInfo?.logo_image"
          alt="social"
          class="w-[70px] h-[70px] rounded-full"
        />
      </p>
      <p class="text-md leading-[30px] font-medium text-center">
        {{ businessInfo?.name }}
      </p>
      <div class="mt-2 mb-4">
        <p class="text-grey text-[14px] leading-[21px] text-center">
          {{ businessInfo?.phone }}
        </p>
        <p class="text-grey text-[14px] leading-[21px] text-center">
          {{ businessInfo?.address }}
        </p>
      </div>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const businessStore = useBusinessStore();
const businessInfo = computed(() => businessStore.businessInfo);
</script>
<style lang="scss" scoped>
.wrapper_app {
  min-height: 100vh;
  background-size: cover;
  background-image: url('/assets/images/background.png');
  background-repeat: no-repeat;
}
</style>
