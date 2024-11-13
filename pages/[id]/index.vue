<template>
  <Loader v-if="isLoading" />
  <div class="bg-C01 rounded-[18px] p-2 sm:p-10 wrapper">
    <p class="flex items-center justify-center">
      <img
        src="/assets/images/welcome.png"
        alt="social"
        class="sm:mt-0 mt-3 p-4 sm:p-0"
      />
    </p>
    <p class="font-medium text-black leading-[30px] text-center mt-0 sm:mt-5">
      {{ customerInfo?.full_name }}
    </p>
    <p class="text-grey text-sm leading-6 text-center">
      {{ customerInfo?.email ? customerInfo?.email + '|' : '' }}
      {{ formatPhone(customerInfo?.phone) }}
    </p>
    <div class="flex items-center justify-center mt-[20px] flex-col">
      <button
        class="min-w-[260px] sm:min-w-[320px] lg:min-w-[420px] text-white text-md sm:text-xl leading-[30px] rounded-[16px] wrapper_btn_book mb-[20px]"
      >
        <p class="p-3 sm:p-4 bg-primary rounded-[12px] hover:opacity-80">
          Book Appointment
        </p>
      </button>
      <p
        class="wrapper_text_or text-sm text-grey leading-[19px] text-center min-w-[260px] sm:min-w-[320px] lg:min-w-[420px]"
      >
        Or
      </p>
    </div>
    <div
      class="flex items-center justify-center gap-4 mt-4 mb-3 sm:mb-6 md:mb-9"
    >
      <div
        class="p-[13px] bg-white rounded-[50%] hover:cursor-pointer hover:opacity-70 shadow-box_shadow"
      >
        <img
          src="/assets/images/ic_call.png"
          alt="social"
          class="min-w-[30px] min-h-[30px]"
        />
      </div>
      <div
        class="p-[13px] bg-white rounded-[50%] hover:cursor-pointer hover:opacity-70 shadow-box_shadow relative"
        @click="handleMessage"
      >
        <img
          src="/assets/images/ic_messages.png"
          alt="social"
          class="min-w-[30px] min-h-[30px]"
        />
        <div
          v-if="infoUser?.unread_message_count"
          class="absolute -top-2 -right-2 bg-main text-white text-[12px] px-2 rounded-full"
        >
          {{ infoUser?.unread_message_count }}
        </div>
      </div>
    </div>
    <!-- show detail appointment -->
    <div class="bg-white rounded-[18px] p-3 sm:p-6 md:p-9 md:text-md text-sm">
      <div
        class="leading-6 font-medium flex gap-4 items-center justify-center sm:flex-row flex-col"
      >
        <button
          v-for="(item, idx) in tabAppointment"
          :key="idx"
          :class="
            item.active
              ? 'bg-main text-white'
              : 'border-main border-[1px] text-main'
          "
          class="py-4 rounded-[8px] hover:opacity-80 w-full"
          @click="handleAppointment(idx)"
        >
          {{ item.text }}
        </button>
      </div>
      <div class="max-h-[573px] overflow-y-auto mt-4 sm:mt-6 md:mt-9">
        <div v-for="(item, idx) in dataAppointment" :key="idx">
          <!-- row1 -->
          <div
            class="font-semibold flex justify-between leading-[20px] sm:leading-[30px]"
          >
            <div class="flex items-center gap-2">
              <p class="w-5 h-5 sm:w-6 sm:h-6">
                <img src="/assets/images/ic_calendar.png" alt="social" />
              </p>
              <p>{{ formatDate(item?.start) }}</p>
            </div>
            <div class="sm:flex items-center gap-1 hidden">
              <span class="text-main hover:cursor-pointer hover:opacity-80"
                >Detail</span
              >
              <span>|</span>
              <span class="text-error hover:cursor-pointer hover:opacity-80">
                Delete
              </span>
            </div>
          </div>
          <!-- row2 -->
          <div
            class="flex mt-2 sm:mt-4 text-[13px] sm:text-sm md:text-[18px] sm:flex-row flex-col"
          >
            <p class="flex-[0.8]">
              {{ formatHour(item.start) }} - {{ formatHour(item.end) }}
            </p>
            <div class="flex flex-col flex-1">
              <div
                v-for="(service, id) in item.list_service"
                :key="id"
                class="flex items-center gap-2 flex-[1.2] justify-between"
              >
                <div class="flex items-center gap-1">
                  <span
                    class="font-semibold left-3 sm:leading-5 md:leading-7"
                    >{{ service.name }}</span
                  >
                  <img
                    v-if="service.duration"
                    src="/assets/images/ic_dot.png"
                  />
                  <span class="text-grey">{{
                    service.duration ? service.duration + 'm' : ''
                  }}</span>
                </div>
                <p v-if="service.price" class="font-semibold">
                  {{ '$' + service.price }}
                </p>
              </div>
            </div>
          </div>
          <div class="sm:hidden flex gap-2 items-center">
            <span class="text-main hover:cursor-pointer hover:opacity-80"
              >Detail</span
            >
            <span>|</span>
            <span class="text-error hover:cursor-pointer hover:opacity-80">
              Delete
            </span>
          </div>
          <div class="h-[1px] w-full my-[14px] bg-grey" />
        </div>
      </div>
    </div>
  </div>
  <Notification ref="refNotification" :notifications="notifications" />
</template>
<script lang="ts" setup>
import type { Notification } from '#build/components';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import type { typeNotification } from '~/components/notification/index.vue';
import { formatPhone } from '~/utils/formatPhoneNumber';

type typeTabAppointment = {
  text: string;
  active: boolean;
};
const { mqttClient } = useMqttClient();
const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();
const appointmentStore = useAppointmentStore();
const messageStore = useMessageStore();
const businessStore = useBusinessStore();

const tenant_id = route.params?.id as string;
const notifications = ref<typeNotification | null>(null);
const refNotification = ref<InstanceType<typeof Notification> | null>(null);
const isLoading = ref(false);
const tabAppointment = reactive<typeTabAppointment[]>([
  { text: 'Upcoming Appointment', active: true },
  { text: 'Appointment History', active: false },
]);

const customerInfo = computed(() => appointmentStore.customerInfo);
const appointmentHistory = computed(() => appointmentStore.appointmentHistory);
const infoUser = computed(() => authStore.infoUser);
const businessInfo = computed(() => businessStore.businessInfo);

const handleAppointment = (index: number) => {
  tabAppointment.forEach((tab, idx) => {
    tab.active = idx === index;
  });
};

const dataAppointment = computed(() => {
  if (tabAppointment[1].active) {
    return appointmentHistory.value;
  }
  const currentDateTime = dayjs();
  const appointmentUpcoming = appointmentHistory.value?.filter((e) => {
    return dayjs(e.start).isAfter(currentDateTime);
  });
  return appointmentUpcoming;
});

const handleMessage = async () => {
  try {
    isLoading.value = true;
    messageStore.dataMessage = [];
    await router.push({ path: `${tenant_id}/message` });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const listenTopic = (topic: string, message: any) => {
  const parsedMessage = JSON.parse(message.toString());
  if (topic == `chat/conversation/unread_message/${infoUser.value?.id}`) {
    if (infoUser.value) {
      console.log(parsedMessage);
      infoUser.value.unread_message_count =
        parsedMessage?.total_unread_messages || 0;
    }
  }
  if (topic == `chat/message/notification/${infoUser.value?.id}`) {
    refNotification.value?.addNotification({
      id: parsedMessage?.id,
      type: 'message',
      title: businessInfo.value.name,
      content: parsedMessage?.message,
    });
  }
};

onMounted(async () => {
  if (mqttClient?.connected) {
    mqttClient.subscribe(
      `chat/conversation/unread_message/${infoUser.value?.id}`,
      (err: any, granted: any) => {
        if (err) console.log('Connect Error', err);
        else console.log('Subscribed to topic:', granted);
      }
    );
    mqttClient.subscribe(
      `chat/message/notification/${infoUser.value?.id}`,
      (err: any, granted: any) => {
        if (err) console.log('Connect Error', err);
        else console.log('Subscribed to topic:', granted);
      }
    );
    mqttClient.on('message', listenTopic);
  }
});

onUnmounted(() => {
  mqttClient?.off('message', listenTopic);
});
</script>
<style lang="scss">
.date-picker-appointment-start-time {
  .dp__input {
    border: none;
    color: #2f2c35;
    font-weight: 00;
    font-size: 18px;
    text-align: center;
    width: 200px;
  }

  .dp__input_icon {
    left: 5px;
  }

  .dp__month_year_wrap {
    justify-content: center !important;
  }

  @media (max-width: 760px) {
    .dp__input {
      font-size: 16px;
      padding: 6px 0 6px 20px;
      width: 160px;
    }

    .dp__input_icon {
      left: 12px;
    }
  }
}
</style>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background: #222222;
  border-radius: 40px;
}

.wrapper {
  &_btn_book {
    background: linear-gradient(90deg, #c9b7ff 0%, #4059ff 100%);
    padding: 5px;
  }

  &_text_or {
    display: flex;
    gap: 5px;
    align-items: center;

    &::after {
      content: '';
      display: block;
      height: 1px;
      background-color: var(--color-grey);
      width: 100%;
    }

    &::before {
      content: '';
      height: 1px;
      display: block;
      background-color: var(--color-grey);
      width: 100%;
    }
  }
}
</style>
