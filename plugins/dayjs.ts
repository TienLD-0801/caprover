import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.extend(customParseFormat);
  dayjs.extend(weekday);
  dayjs.extend(localeData);
});
