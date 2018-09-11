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
    } catch (e) {
        cors(request, response, () => {
            // ...
        });
        response.status(500).send(e);
    }
});

async function getTemperatures(): Promise<any[]> {
    return (await db.collection('/temperatures').get()).docs.map(val => {
        return val.data();
    });
}
