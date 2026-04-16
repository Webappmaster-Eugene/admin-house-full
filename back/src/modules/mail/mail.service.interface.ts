export interface IMailService {
  sendResetCode(email: string, code: string): Promise<void>;
}
