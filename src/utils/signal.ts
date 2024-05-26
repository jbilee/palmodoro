import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: "30bc5173-6569-493a-a154-38132e4cccb1",
    allowLocalhostAsSecureOrigin: true,
    safari_web_id: "web.onesignal.auto.630456c0-6fee-4c63-83c2-4e6e2f9684cf",
  });
  await OneSignal.Slidedown.promptPush();
}
