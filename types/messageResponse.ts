interface PaginationInfo {
  total_count: number;
  page_count: number;
  current_page: number;
  per_page: number;
}


interface MessageInfo {
  id: number;
  conversation_id: number;
  sender_id: number;
  receiver_id: number;
  message: string | null;
  created_at: string;
  attachments: any[];
}

interface ResponseMessage {
  messages: MessageInfo[] | [];
  pagination: PaginationInfo;
}

interface paramsReadMessage {
  conversationId: any 
}
export type { ResponseMessage, MessageInfo, PaginationInfo,paramsReadMessage };
