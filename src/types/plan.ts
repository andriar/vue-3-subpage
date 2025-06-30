export interface IPlan {
  is_sku: boolean | null;
  sku_expired_date: string | null; // Assuming date can be represented as a string
  name: string;
  monthly_price: string;
  annual_price: string;
  mau_limit: number;
  admin_agent_limit: number;
  type: string;
  currency: string;
  subscription_date: string; // Assuming date can be represented as a string
  subscription_type: string;
  subscription_status: string;
  extra_mau: number;
  extra_mau_charge: string;
  plan_group: string;
  trial_remaining_days: number | null;
  usage_info: IUsageInfo;
  exclusive_user: Record<string, never>; // Represents an empty object
  max_wa_channel: number;
}

export interface IUsageInfo {
  mau_usage: number;
  admin_agent_usage: number;
  extra_mau: number;
  extra_mau_charge: number;
  current_mau: number;
}
