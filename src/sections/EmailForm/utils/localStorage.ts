import { UserInfo } from "@/features/EmailForm";

export function localStorageEmail(userFormInfo: UserInfo) {
  const today = new Date();
  const tomorrow = new Date().setDate(today.getDate() + 1);
  const sentDateExpiry = new Date(tomorrow);

  const key = "email";
  const keyValue = {
    today,
    sentDateExpiry,
    email: userFormInfo.userEmail,
    message: userFormInfo.userMsg,
  };

  localStorage.setItem(key, JSON.stringify(keyValue));
}
