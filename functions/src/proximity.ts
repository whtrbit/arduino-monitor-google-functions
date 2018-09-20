import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors')({
    origin: true,
});

try {
    admin.initializeApp();
} catch {}

const db = admin.firestore();

export const saveProximityAlarm = functions.https.onRequest(async (request, response) => {
    try {
        cors(request, response, () => {
            // ...
        });

        if (!request.body.date || !request.body.distance) {
            response.status(500).send('Please provide date and distance fields.');
        }
        db.collection('/proximityAlarms').add({
            date: request.body.date,
            distance: request.body.distance
        })
          .then(function (docReference) {
              docReference.get()
                .then(function (data) {
                    response.status(201).send(data.data());
                })
                .catch(function (err) {
                    response.status(500).send('Could not read from docRef Promise:\n' + err);
                });
          })
          .catch((err) => {
              response.status(500).send('Firestore collection add() catch statement:\n' + err);
          });
    } catch(err) {
        cors(request, response, () => {
            response.status(500).send('functions.https.onRequest catch statement:\n' + err);
        });
    }
});
