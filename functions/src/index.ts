import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

exports.getTemperatures = functions.https.onRequest(async (request, response) => {
    try {
        response.status(200).send(await getTemperatures());
    } catch (e) {
        response.status(500).send(e);
    }
});

async function getTemperatures(): Promise<any[]> {
    return (await db.collection('/temperatures').get()).docs.map(val => {
        return val.data();
    });
}
