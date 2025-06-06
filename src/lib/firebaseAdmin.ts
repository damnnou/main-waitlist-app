import * as admin from "firebase-admin";

const serviceAccount = {
    projectId: process.env.FIREBASE_SERVICE_PROJECT_ID,
    privateKey: process.env.FIREBASE_SERVICE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
};

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();
export { db };
