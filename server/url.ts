const URL_LOGIN = '/v1/chat/auth/login';
const URL_LOGOUT = '/v1/chat/auth/logout';

// ## Conversation
const URL_CREATE_CONVERSATION = '/v1/chat/conversation/start-conversation';
const URL_GET_CONVERSATION = '/v1/chat/conversation/get-conversations';
const URL_GET_CONVERSATION_TOTAL = '/v1/chat/conversation/get-total-conversation';
const URL_GET_CONVERSATION_ONLINE = '/v1/chat/conversation/get-online-status';


//## Business
const URL_BUSINESS_INFO = '/v1/new_appointment/booking/business/info';

//## Message
const URL_MESSAGE_SEND = '/v1/chat/message/send-message';
const URL_GET_MESSAGE = '/v1/chat/message/get-message';
const URL_READ_MESSAGE = '/v1/chat/message/mark-as-read';

//## Appointment
const URL_APPOINTMENT_HISTORY = '/v1/new_appointment/booking/customer/history';

export {URL_GET_CONVERSATION_ONLINE, URL_LOGOUT, URL_READ_MESSAGE, URL_LOGIN, URL_CREATE_CONVERSATION, URL_BUSINESS_INFO, URL_MESSAGE_SEND, URL_GET_MESSAGE, URL_APPOINTMENT_HISTORY, URL_GET_CONVERSATION, URL_GET_CONVERSATION_TOTAL };
