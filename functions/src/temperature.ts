import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors')({
    origin: true,
});

admin.initializeApp();

const db = admin.firestore();

export const getTemperature = functions.https.onRequest(async (request, response) => {
    try {
        cors(request, response, () => {
            // ...
        });
        response.status(200).send(await getTemperatures());
    } catch(err) {
        cors(request, response, () => {
            // ...
        });
        response.status(500).send(err);
    }
});

export const saveTemperature = functions.https.onRequest(async (request, response) => {
    try {
        cors(request, response, () => {
            // ...
        });

        if (!request.body.date || !request.body.celsius) {
            response.status(500).send('Please provide date and celsius fields.');
        }
        db.collection('/temperatures').add({
            date: request.body.date,
            celsius: request.body.celsius
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

async function getTemperatures(): Promise<any[]> {
    return (await db.collection('/temperatures').get()).docs.map(val => {
        return val.data();
    });
}
