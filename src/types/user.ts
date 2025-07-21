export interface IUser {
    id: number;
    name: string;
    authentication_token: string;
    is_available: boolean;
    type: number;
    avatar_url: string;
    app_id: number;
    is_verified: boolean;
    last_password_update: string;
    type_as_string: string;
    expired_on: string;
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