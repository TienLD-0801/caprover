<template>
  <Loader v-if="isLoading" />
  <div v-else class="bg-C01 rounded-[12px] sm:rounded-[18px] p-2 sm:p-10">
    <!-- header -->
    <div class="flex items-start justify-between pb-5 gap-2">
      <div
        @click="handleBack"
        class="p-2 sm:p-[10px] bg-main rounded-[8px] hover:cursor-pointer hover:opacity-80 flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10"
      >
        <img src="/assets/images/ic_back.png" alt="" class="w-full h-full" />
      </div>
      <div>
        <h1 class="text-main text-md leading-[30px] font-semibold text-center">
          Chat
        </h1>
        <p
          class="text-center text-[9px] sm:text-[10px] leading-[13px] text-C02"
        >
          Welcome to N-Social! Thank you for reaching out to us.
        </p>
        <p
          class="text-center text-[9px] sm:text-[10px] leading-[13px] text-C02"
        >
          If you have any questions, feel free to send them our way!
        </p>
      </div>
      <div
        class="p-1 sm:p-[10px] bg-white rounded-[8px] hover:cursor-pointer hover:opacity-80 shadow-box_shadow flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10"
      >
        <img src="/assets/images/call.png" alt="" />
      </div>
    </div>
    <div
      class="h-[717px] py-3 sm:py-5 px-3 sm:px-7 md:px-10 rounded-[20px] bg-white flex flex-col justify-between"
    >
      <div
        class="overflow-y-auto h-[618px] flex flex-col-reverse"
        @scroll="handleScrollMessage"
        ref="messageContainer"
      >
        <div
          class="flex gap-2 flex-col"
          v-for="item in dataMessage"
          :key="item.id"
        >
          <!-- Message box -->
          <div
            v-if="conversationInfo?.sender_id != item.sender_id"
            class="flex items-start justify-start gap-[6px] text-[13px] leading-[18.5px] my-1"
          >
            <img
              :src="businessInfo?.logo_image"
              class="w-[44px] h-[44px] object-cover rounded-full"
            />
            <div class="flex items-start flex-col gap-2 flex-1">
              <div
                v-if="item.message"
                v-html="item.message"
                class="py-[13px] px-[10px] rounded-[24px] shadow-box_shadow_1 hover:cursor-pointer whitespace-pre-wrap break-all max-w-[75%]"
              ></div>
              <div
                v-if="item.attachments.length > 0"
                class="flex flex-col gap-2"
              >
                <div v-for="(img, idx) in item.attachments" :key="idx">
                  <img
                    class="w-[80%] max-h-[500px] h-auto object-cover rounded-[10px] hover:cursor-pointer"
                    :src="img.file_path"
                    alt=""
                    @click="showImage(img.file_path)"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- My Message  My screen-->
          <div v-else class="flex items-center justify-end">
            <div
              class="flex items-center gap-[6px] text-[13px] leading-[18.5px] my-1 flex-1"
            >
              <div class="flex items-end flex-col gap-2 flex-1">
                <div
                  v-if="item.message"
                  v-html="item.message"
                  class="py-[13px] px-[10px] rounded-[24px] shadow-box_shadow_1 bg-C03 hover:cursor-pointer whitespace-pre-wrap break-all max-w-[75%] flex-1"
                ></div>
                <div
                  v-if="item.attachments.length > 0"
                  class="flex flex-col gap-2"
                >
                  <div
                    v-for="(img, idx) in item.attachments"
                    :key="idx"
                    class="flex items-center justify-end"
                  >
                    <img
                      class="w-[calc(80%-40px)] sm:w-[80%] sm:max-h-[500px] h-auto object-cover rounded-[10px] hover:cursor-pointer"
                      :src="img.file_path"
                      alt=""
                      @click="showImage(img.file_path)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="isLoadingMessage"
          class="flex items-center justify-center h-full"
        >
          <LoadingMessage />
        </div>
      </div>
      <!-- Footer -->
      <div :class="isLoadingButton ? 'pointer-events-none opacity-60' : ''">
        <div class="flex items-end justify-between gap-[6px] sm:gap-[10px]">
          <div
            class="p-[10px] bg-primary rounded-full hover:cursor-pointer hover:opacity-80 w-10 h-10 flex items-center justify-center"
            @click="handleChooseImage"
          >
            <img
              src="/assets/images/ic_image.png"
              alt=""
              class="w-full h-full"
            />
            <input
              type="file"
              ref="refInputImage"
              class="hidden"
              accept=".png, .jpeg, .jpg"
              @change="handleFileChange"
            />
          </div>
          <div class="flex-1">
            <div class="flex items-center rounded-[24px] bg-C04">
              <textarea
                ref="refTextarea"
                rows="1"
                class="w-full py-2 outline-none pl-4 pr-2 bg-C04 rounded-l-[24px] text-sm"
                placeholder="Type a message here"
                @input="inputTextMessage"
                v-model="messageValue"
                @keydown="handleKeyDown"
                @focus="isShowIcon = false"
              />
              <img
                src="/assets/images/ic_face.png"
                alt=""
                class="px-3 hover:cursor-pointer"
                @click="handleShowIcon"
              />
              <span ref="refInput" class="invisible whitespace-pre"></span>
            </div>
          </div>
          <div
            @click="handleSendMessage"
            class="p-[10px] bg-primary rounded-full hover:opacity-80 w-10 h-10 flex items-center justify-center shadow-box_shadow_2 hover:cursor-pointer"
          >
            <img
              src="/assets/images/ic_send.png"
              alt=""
              class="w-full h-full"
            />
          </div>
        </div>
        <EmojiPicker
          :native="true"
          class="!mt-2"
          v-show="isShowIcon"
          @select="selectEmoji"
        />
      </div>
    </div>
  </div>
  <vue-easy-lightbox
    :move-disabled="true"
    :visible="visibleRef"
    :imgs="[imageSrc]"
    @hide="onHide"
  >
    <template #close-btn="{ close }">
      <button class="btn-close" @click="close">
        <svg
          class="text-black text-[30px] p-1"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
          />
        </svg>
      </button>
    </template>
  </vue-easy-lightbox>
</template>
<script lang="ts" setup>
import type { paramsGetMessage } from '~/types/apiRequest';
import type { userInfo } from '~/types/apiResponse';
import type { paramsReadMessage } from '~/types/messageResponse';

definePageMeta({
  middleware: ['auth'],
});

const router = useRouter();

const messageStore = useMessageStore();
const conversationStore = useConversationStore();
const authStore = useAuthStore();
const businessStore = useBusinessStore();

const visibleRef = ref(false);
const valueButton = ref<HTMLElement | any>();
const imageSrc = ref('');
const messageValue = ref('');
const refTextarea = ref<HTMLTextAreaElement | null>(null);
const refInput = ref();
const isShowIcon = ref<boolean>(false);
const refInputImage = ref();
const isLoading = ref(false);
const isLoadingMessage = ref(false);
const isLoadingButton = ref(false);
const messageContainer = ref<any>();
const pages = ref(1);
const { mqttClient } = useMqttClient();
const userInfo: userInfo = getLocalStorage('user_info');

const conversationInfo = computed(() => conversationStore.conversationInfo);
const dataMessage = computed(() => {
  return messageStore.dataMessage;
});
const pagination = computed(() => {
  return messageStore.pagination;
});
const infoUser = computed(() => authStore.infoUser);
const businessInfo = computed(() => businessStore.businessInfo);

watch(
  () => isShowIcon.value,
  (value) => {
    if (value) {
      scrollBottom();
    }
  }
);

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (event.shiftKey) {
      messageValue.value += '\n';
      inputTextMessage();
      event.preventDefault();
    } else {
      event.preventDefault();
      handleSendMessage();
    }
  }
};

const scrollBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = 0;
    }
  });
};

const handleShowIcon = () => {
  nextTick(() => {
    window.requestAnimationFrame(() => {
      isShowIcon.value = !isShowIcon.value;
    });
  });
};

const inputTextMessage = () => {
  const refTextArea = refTextarea.value;
  const refSpan = refInput.value;
  const line = messageValue.value.split('\n').length;
  if (refTextArea && refSpan) {
    refSpan.textContent = refTextArea.value;
    const textWidthSpan = refSpan.offsetWidth;
    const textareaWidth =
      refTextArea.clientWidth -
      parseInt(getComputedStyle(refTextArea).paddingLeft) -
      parseInt(getComputedStyle(refTextArea).paddingRight);
    if (Math.floor(textWidthSpan / textareaWidth) + line <= 4) {
      refTextArea.rows = Math.floor(textWidthSpan / textareaWidth) + line;
    }
  }
};

const handleBack = () => {
  router.back();
};

const handleChooseImage = () => {
  refInputImage.value.click();
};

const selectEmoji = (emoji: any) => {
  messageValue.value += emoji.i;
  inputTextMessage();
};

const handleSendMessage = async () => {
  try {
    isLoadingButton.value = true;
    if (!messageValue.value) return;
    const formData = new FormData();
    formData.append('receiver_id', userInfo.business_id);
    formData.append('message', messageValue.value);
    await messageStore.sendMessage(formData);
  } catch (error) {
    console.error(error);
  } finally {
    scrollBottom();
    messageValue.value = '';
    if (refTextarea.value) {
      refTextarea.value.rows = 1;
    }
    isLoadingButton.value = false;
  }
};

const handleFileChange = async () => {
  try {
    isLoadingButton.value = true;
    const formData = new FormData();
    formData.append('receiver_id', userInfo.business_id);
    formData.append('attachments', refInputImage.value.files[0]);
    await messageStore.sendMessage(formData);
  } catch (error) {
    console.log(error);
  } finally {
    scrollBottom();
    refInputImage.value.value = null;
    isLoadingButton.value = false;
  }
};

const handleScrollMessage = async () => {
  if (
    Math.floor(
      messageContainer.value.clientHeight - messageContainer.value.scrollTop + 1
    ) == messageContainer.value.scrollHeight
  ) {
    if (pages.value < pagination.value.page_count) {
      pages.value++;
      let oldScrollHeight: number;
      if (messageContainer.value) {
        oldScrollHeight =
          messageContainer.value?.clientHeight -
          messageContainer.value.scrollHeight;
      }
      await getMessage();
      nextTick(() => {
        if (messageContainer.value) {
          messageContainer.value.scrollTop = oldScrollHeight;
        }
      });
    }
  }
};

const getMessage = async () => {
  try {
    isLoadingMessage.value = true;
    const params: paramsGetMessage = {
      receiverId: userInfo.business_id,
      page: pages.value,
    };
    await messageStore.getMessage(params);
  } catch (error) {
    console.log(error);
  } finally {
    isLoadingMessage.value = false;
  }
};
const readMessage = async () => {
  try {
    const params: paramsReadMessage = {
      conversationId: conversationInfo.value?.conversation_id,
    };
    await messageStore.readMessage(params);
  } catch (error) {
    console.log(error);
  }
};

const handleMessage = async (topic: string, message: any) => {
  const parsedMessage = JSON.parse(message.toString());

  if (topic == `chat/message/${conversationInfo.value?.conversation_id}`) {
    console.log(topic, parsedMessage);
    messageStore.addMessage(parsedMessage);
    if (userInfo.id == parsedMessage?.sender_id) return;
    await readMessage();
  }

  if (topic == `chat/conversation/unread_message/${userInfo?.id}`) {
    console.log(topic);
    if (infoUser.value) {
      console.log(parsedMessage);
      infoUser.value.unread_message_count =
        parsedMessage?.total_unread_messages || 0;
    }
  }
};

onMounted(async () => {
  await init();
  if (mqttClient?.connected) {
    mqttClient.subscribe(
      `chat/message/${conversationInfo.value?.conversation_id}`,
      (err: any, granted: any) => {
        if (err) console.log('Connect Error', err);
        else console.log('Subscribed to topic:', granted);
      }
    );
    mqttClient.subscribe(
      `chat/conversation/unread_message/${userInfo.id}`,
      (err: any, granted: any) => {
        if (err) console.log('Connect Error', err);
        else console.log('Subscribed to topic:', granted);
      }
    );
    mqttClient.on('message', handleMessage);
  }
});

const showImage = (image: string) => {
  imageSrc.value = image;
  visibleRef.value = true;
  nextTick(() => {
    const btnClose = document.querySelector('.btn-close') as HTMLElement;
    if (btnClose) {
      btnClose.style.display = 'none';
    }
  });
  setTimeout(() => {
    nextTick(() => {
      const wrapper = document.querySelector('.vel-img-wrapper');
      const btnClose = document.querySelector('.btn-close') as HTMLElement;
      const btnImage = document.querySelector('.btn-close svg');
      if (btnClose) {
        btnClose?.classList.add('btn-close');
        btnClose.style.display = 'block';
        btnImage?.classList.add('btn-image');
      }
      wrapper?.appendChild(btnClose);
      valueButton.value = btnClose;
    });
  }, 400);
};

const onHide = () => (visibleRef.value = false);

const init = async () => {
  try {
    isLoading.value = true;
    await conversationStore.createConversation(userInfo.business_id);
    await getMessage();
    if (!infoUser.value?.unread_message_count) return;
    await readMessage();
  } catch (error) {
    console.error(error);
  } finally {
    scrollBottom();
    isLoading.value = false;
  }
};

onUnmounted(async () => {
  mqttClient?.off('message', handleMessage);
});
</script>
<style lang="scss">
.btn-close {
  position: absolute;
  display: block;
  right: -15px;
  top: -15px;
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 100%;
}
</style>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgb(100, 96, 96);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}

textarea {
  resize: none;
}

.invisible {
  visibility: hidden;
  position: absolute;
  top: -9999px;
  white-space: pre;
}

textarea::-webkit-input-placeholder {
  font-size: 13px;
  color: #a4b3d8;
}

.v3-emoji-picker {
  margin: 0;
  width: 100%;
}
</style>

<style lang="scss">
.v3-footer {
  display: none !important;
}
</style>
