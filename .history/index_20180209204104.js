import { AppRegistry } from "react-native";
import App from "./App";
import store from "./store/store.js";
import BackgroundJob from "react-native-background-job";

const jobInterval = 10000;
let lastRun = null;

function myJob(callerName) {
  let ms = Number.MAX_SAFE_INTEGER;
  if (lastRun) {
    const diff = new Date() - lastRun;
    ms = new Date(diff).toISOString().slice(14, 21);
  }
  if (ms >= jobInterval) {
    console.log("run from caller " + callerName + ", " + new Date());
    store.dispatch({ type: "TIMESTAMP" });
  } else {
    console.log(
      "suppressing run from caller " + callerName + ", " + new Date()
    );
  }
}

// if no foreground service, this only runs when app has the focus
setInterval(function() {
  myJob("setInterval");
  //console.log("*** index.js setInterval", new Date());
  //store.dispatch({ type: "TIMESTAMP" });
}, jobInterval);

const backgroundJob = {
  jobKey: "timestamp",
  job: () => myJob("backgroundJob")
  //job: () => console.log("Running in background", new Date())
  //  job: () => store.dispatch({ type: "TIMESTAMP" })
};
BackgroundJob.register(backgroundJob);
var backgroundSchedule = {
  jobKey: "timestamp",
  period: jobInterval,
  exact: true,
  allowWhileIdle: true
};
BackgroundJob.schedule(backgroundSchedule);

AppRegistry.registerComponent("ForegroundTest", () => App);
