import * as temperature from "./temperature";
import * as proximity from "./proximity";
// import * as admin from "firebase-admin";

// admin.initializeApp();

exports.getTemperatures = temperature.getTemperature;
exports.saveTemperature = temperature.saveTemperature;
exports.saveProximityAlarm = proximity.saveProximityAlarm;
