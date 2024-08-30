import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: import.meta.env.VITE_APP_ID,
    safari_web_id: import.meta.env.VITE_SAFARI_WEB_ID,
    welcomeNotification: { disable: true },
  });
  await OneSignal.Slidedown.promptPush();
}
