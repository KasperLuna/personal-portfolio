export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  "cf-turnstile-response": string;
}

export type CloudFlareVerifyResponse = {
  success: boolean;
  score: number;
  "error-codes": string[];
};

export type SentMessageType = {
  accepted: string[];
  rejected: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: { from: string; to: string[] };
  messageId: string;
};
