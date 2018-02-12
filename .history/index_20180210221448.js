import { AppRegistry } from "react-native";
import App from "./App";
import store from "./store/store.js";
import BackgroundJob from "react-native-background-job";
import { doScan } from "./bluetoothScan";

const scanInterval = 10000;  // Interval between scans in ms
const scanLength = 2000;     // How long to scan in ms
let lastRun = null;

function myJob(callerName) {
  let diff = Number.MAX_SAFE_INTEGER;
  if (lastRun) {
    const diff = new Date() - lastRun;
    //ms = new Date(diff).toISOString().slice(14, 21);
  }
  if ((diff + 500) >= scanInterval) {
    console.log("run from " + callerName + ", " + new Date());
    store.dispatch({ type: "TIMESTAMP" });
  } else {
    console.log(
      "suppressing run from " + callerName + ", " + (diff + 500) + " >= " + scanInterval
    );
  }
  lastRun = new Date();
}

// if no foreground service, this only runs when app has the focus
/* setInterval(function() {
  myJob("foreground");
}, scanInterval);
 */
const backgroundJob = {
  jobKey: "timestamp",
  job: () => myJob("background")
};
BackgroundJob.register(backgroundJob);
var backgroundSchedule = {
  jobKey: "timestamp",
  period: scanInterval,
  exact: true,
  allowExecutionInForeground: true,
  allowWhileIdle: true
};
BackgroundJob.schedule(backgroundSchedule);

AppRegistry.registerComponent("ForegroundTest", () => App);
