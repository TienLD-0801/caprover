<template>
  <Loader v-if="isLoading" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { userInfo } from '@/types/apiResponse';
const route = useRoute();
const router = useRouter();
const { mqttClient } = useMqttClient();
const businessStore = useBusinessStore();
const dnsStore = useDnsStore();
const appointmentStore = useAppointmentStore();
const authStore = useAuthStore();

const tenantId: string | string[] = route.params?.id as string;
const phone = ref(route.query?.phone as string);
const isLoading = ref(false);

const customerInfo = computed(() => appointmentStore.customerInfo);
const infoUser = computed(() => authStore.infoUser);

loginChannel.onmessage = async (event) => {
  if (event.data == 'change_user') {
    const userInfo: userInfo = getLocalStorage('user_info');
    await router.push(`/${userInfo.business_id}?phone=${userInfo.phone}`);
    location.reload();
  }
};

const getInit = async () => {
  try {
    isLoading.value = true;
    const userInfo: userInfo = getLocalStorage('user_info');
    await dnsStore.getDns(tenantId);
    await businessStore.getBusinessInfo();
    if (!phone.value) phone.value = userInfo.phone;
    await appointmentStore.getAppointmentHistory(phone.value);
    const bodyLogin: typeBodyLogin = {
      phone: phone.value,
      business_id: tenantId,
      username: customerInfo.value?.full_name || null,
    };
    await authStore.login(bodyLogin);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (mqttClient?.connected) {
    if (!infoUser) return;
    mqttClient.publish(
      'status/customer',
      JSON.stringify({
        customer_id: infoUser.value?.id,
        customer_phone: infoUser.value?.phone,
        is_online: true,
      })
    );
  }
});

await getInit();
</script>
