<template>
  <div class="fixed right-4 bottom-4 z-[99999]">
    <TransitionGroup name="fade">
      <div
        v-for="(notification, index) in notificationItems"
        :key="index"
        :id="index.toString()"
        :class="{
          'bg-rose-200 border-rose-600': notification.type === 'error',
          'bg-green-200 border-green-600': notification.type === 'success',
          'bg-sky-200 border-sky-600': notification.type === 'info',
          'border-[2px] border-main bg-white opacity-80':
            notification.type === 'message',
        }"
        class="w-[250px] sm:w-[200px] md:w-[400px] rounded-2xl border-4 font-medium text-sm text-black mb-4"
      >
        <div class="flex items-center p-2 md:p-4 gap-2">
          <div v-if="notification.type === 'message'">
            <img
              src="/assets/images/ic_messages.png"
              alt="social"
              class="min-w-[30px] min-h-[30px]"
            />
          </div>
          <div>
            <div
              :class="{
                'text-rose-800': notification.type === 'error',
                'text-green-800': notification.type === 'success',
                'text-sky-800': notification.type === 'info',
              }"
              class="font-bold text-sm sm:text-md md:text-lg"
            >
              {{ notification.title }}
            </div>
            <div class="font-medium text-black last_message">
              {{ notification.content }}
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

export interface typeNotification {
  id: string;
  type: 'error' | 'success' | 'info' | 'message';
  title: string;
  content: string;
}

const notificationItems = ref<typeNotification[]>([]);
const soundManger = ref(new SoundManager());

const addNotification = (notification: typeNotification) => {
  soundManger.value.playOpenSound();
  notificationItems.value.push(notification);
  setTimeout(() => {
    removeNotification(notification.id);
  }, 3000);
};

const removeNotification = (id: string) => {
  const index = notificationItems.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    notificationItems.value.splice(index, 1);
  }
};

defineExpose({ addNotification });
</script>

<style lang="scss" scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}

.last_message {
  display: block;
  display: -webkit-box;
  word-break: break-all;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
