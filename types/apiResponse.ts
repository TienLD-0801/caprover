interface DateCreated {
  created_at: Date;
  updated_at: Date;
}

interface ApiResponse<T> {
  result: {
    status: string;
    data: T;
    error: string;
    message: string;
  };
  error: any;
  message: any;
  data: any;
  status: string;
}

interface ApiKeyData {
  api_key: string;
}

interface userInfo {
  id: number;
  phone: string;
  business_id: string;
  username: string;
  color: string;
  unread_message_count: number
}

interface ApiLogin {
  user: userInfo;
}

interface ApiCreateConversation extends DateCreated {
  conversation_id: number;
  sender_id: number;
  receiver_id: number;
}

export type {
  ApiResponse,
  ApiKeyData,
  ApiLogin,
  ApiCreateConversation,
  userInfo,
};
