import { AppRegistry } from "react-native";
import App from "./App";
import store from "./store/store.js";
import BackgroundJob from "react-native-background-job";

// if no foreground service, this only runs when app has the focus
setInterval(function() {
  console.log("*** index.js setInterval", new Date());
  //store.dispatch({ type: "TIMESTAMP" });
}, 10000);

const backgroundJob = {
  jobKey: "timestamp",
  job: () => store.dispatch({ type: "TIMESTAMP" })
};
BackgroundJob.register(backgroundJob);
var backgroundSchedule = {
  jobKey: "timestamp",
  period: 10000,
  exact: true,
  allowWhileIdle: true
 } 
BackgroundJob.schedule(backgroundSchedule);

AppRegistry.registerComponent("ForegroundTest", () => App);
