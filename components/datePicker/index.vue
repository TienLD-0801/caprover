<template>
    <VueDatePicker v-model="date" :format="format" class="date-picker-appointment-start-time" position="left" >
        <template #input-icon>
        </template>    
    </VueDatePicker>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const date = ref(new Date);

const format = () => {
    return dayjs(date.value).format('dddd, DD MMMM YYYY');
}
</script>

<style lang="scss">
.date-picker-appointment-start-time {
  .dp__input {
    border: none;
    color: #2F2C35;
    font-weight: 00;
    font-size: 18px;
    text-align: center;
    width: fit-content;
    padding: 0 !important;
  }
  .dp__input_icon {
    left: 5px;
  }

  .dp__month_year_wrap {
    justify-content: center !important;
  }

//   @media (max-width: 760px) {
//     .dp__input {
//       font-size: 16px;
//       padding: 6px 0 6px 20px;
//       width: 160px;
//     }

//     .dp__input_icon {
//       left: 12px;
//     }
//   }
}
</style>