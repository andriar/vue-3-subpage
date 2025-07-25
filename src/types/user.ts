export interface IUser {
  id: number;
  name: string;
  authentication_token: string;
  created_at: string;
  updated_at: string;
  is_available: boolean;
  type: number;
  avatar_url: string;
  app_id: number;
  is_verified: boolean;
  notifications_room_id: string | null;
  bubble_color: string | null;
  direct_login_token: string;
  last_login: string;
  force_offline: boolean;
  deleted_at: string | null;
  is_toc_agree: boolean;
  totp_token: string;
  is_req_otp_reset: boolean | null;
  last_password_update: string;
  type_as_string: string;
  assigned_rules: string | null;
  expired_on: number;
  expiration_day: number;
}

export interface ISdkUser {
    id: number;
    token: string;
    display_name: string;
    avatar_url: string;
    extras: ISdkUserExtras;
}

export interface ISdkUserExtras {
  type: string;
  user_bubble_color: string | null;
}