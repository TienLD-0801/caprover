interface Customer {
  id: number;
  first_name: string | null;
  last_name: string | null;
  full_name: string;
  phone: string;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  gender: string | null;
  birthday: string | null;
  create_at: string;
  update_at: string;
  status: string | null;
  group_id: number | null;
  note: string | null;
  parent_id: number | null;
  rating: number | null;
  is_yelp: boolean | null;
  reachable_email: number | null;
  reachable_push: number | null;
  reachable_sms: number | null;
  visit_count: number | null;
  last_visited: string | null;
  image_url: string | null;
  address2: string | null;
  postal_code: string | null;
  is_send_sms: number | null;
  is_import: number | null;
  is_checked_in: number | null;
  is_blocked_from_booking: boolean | null;
  source: string | null;
  type_customer: number | null;
}

interface Service {
    id: string;
    name: string | null;
    name_price: string | null;
    price: number | null;
    point_bonus: number | null;
    type: string | null;
    duration: string | null;
    start_time: string | null;
    end_time: string | null;
    employee_id: number | null;
    employee_name: string | null;
  }
  
  interface Staff {
    user_id: number;
    name: string | null;
    code: number | null;
    created_at: string | null;
    updated_at: string | null;
    color_code: string | null;
    image_url: string | null;
    delete_image_url: string | null;
    priority: number | null;
    commission_type: string | null;
    turn_priority: number | null;
    last_turn_priority: number | null;
    phone: string | null;
    address: string | null;
    nickname: string | null;
    priority_calendar: number | null;
    hotkey: string | null;
  }
  
  interface Appointment {
    id: number;
    backgroundColor: string | null;
    borderColor: string | null;
    note: string | null;
    start: string;
    end: string;
    title: string | null;
    checkin_id: number | null;
    order_id: number | null;
    status: string | null;
    created_by: number | null;
    parent_id: number | null;
    parent_id_repeat: number | null;
    is_ready: boolean | null;
    list_service: Service[] | null;
    list_staff: Staff[] | null;
  }
  

export type { Customer,  Appointment};
