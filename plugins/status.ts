export default defineNuxtPlugin((nuxtApp) => {
  //   const { mqttClient } = useMqttClient();
  //   const updateUserStatus = (status: boolean) => {
  //     const infoUser = getLocalStorage('user_info');
  //     if (!infoUser) return;
  //     mqttClient?.publish(
  //       'status/customer',
  //       JSON.stringify({
  //         customer_id: infoUser?.id,
  //         customer_phone: infoUser?.phone,
  //         is_online: status,
  //       })
  //     );
  //   };
  //   const handleVisibilityChange = debounce(() => {
  //     if (document.hidden) {
  //       updateUserStatus(false);
  //     } else {
  //       updateUserStatus(true);
  //     }
  //   }, 5000);
  //   const handleBeforeunload = () => {
  //     const infoUser = getLocalStorage('user_info');
  //     if (!infoUser) return;
  //     mqttClient?.publish(
  //       'status/customer',
  //       JSON.stringify({
  //         customer_id: infoUser?.id,
  //         customer_phone: infoUser?.phone,
  //         is_online: false,
  //       })
  //     );
  //   };
  //   nuxtApp.hook('app:mounted', () => {
  //     document.addEventListener('visibilitychange', handleVisibilityChange);
  //     window.addEventListener('beforeunload', handleBeforeunload, { once: true });
  //   });
});
