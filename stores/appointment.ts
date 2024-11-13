import { defineStore } from 'pinia';
import type { Customer, Appointment } from '~/types/appointmentResponse';

export const useAppointmentStore = defineStore('appointmentStore', {
  state: () => ({
    appointmentHistory: null as Appointment[] | null,
    customerInfo: null as Customer | null,
  }),
  actions: {
    getAppointmentHistory(phone: any): Promise<any> {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await $fetch('/api/appointment/get-history-appointment', {
            method: 'GET',
            params: { phone: phone },
          });
          if (res.result?.data) {
            this.appointmentHistory = res.result?.data.appointment;
            this.customerInfo = res.result.data?.customer;
          }
          resolve(res);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
