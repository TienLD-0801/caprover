interface reqSendMessage {
  receiver_id: string;
  message: string;
  attachments?: any;
}

interface paramsGetMessage {
  receiverId: any;
  page?: number;
}

export type { reqSendMessage, paramsGetMessage };
