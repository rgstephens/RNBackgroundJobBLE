//  Created by react-native-create-bridge

import { NativeModules } from 'react-native'

const { FGServiceBridge } = NativeModules

export default {
  exampleMethod () {
    return FGServiceBridge.exampleMethod()
  },
  startService () {
    console.log("FGServiceBridgeNativeModule startService");
    return FGServiceBridge.exampleMethod()
  },
  stopService () {
    return FGServiceBridge.stopService()
  }
}
