export type ApiProviderStatus = "disabled" | "configured" | "active" | "error";

export type ApiProviderCategory =
  | "AI_TEXT"
  | "AI_IMAGE"
  | "AI_VIDEO"
  | "VOICE"
  | "MAPS"
  | "STORAGE"
  | "NOTIFICATIONS"
  | "SOCIAL"
  | "JOBS"
  | "PAYMENTS"
  | "ANALYTICS"
  | "MODERATION";

export interface ApiProviderConfig {
  id: string;
  name: string;
  category: ApiProviderCategory;
  status: ApiProviderStatus;
  environment: "development" | "staging" | "production";
  enabled: boolean;
  baseUrl?: string;
  webhookUrl?: string;
  apiKeyMasked?: string;
  apiSecretMasked?: string;
  accessTokenMasked?: string;
  hasOAuth: boolean;
  budgetLimit?: number;
  usageAlertLimit?: number;
  lastTestAt?: string;
  lastTestStatus?: "success" | "failed";
  updatedAt: string;
}
