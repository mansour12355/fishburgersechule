// ===================================
// Firebase Admin SDK Configuration (Optional)
// ===================================

// Firebase Admin is optional for this app
// The frontend uses client-side Firebase which works without this

let admin = null;
let db = null;

try {
    admin = require("firebase-admin");
    const serviceAccount = require("./serviceAccountKey.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    db = admin.firestore();
    console.log('✅ Firebase Admin initialized successfully');
} catch (error) {
    console.log('ℹ️  Firebase Admin not configured (optional)');
    console.log('   The app will use client-side Firebase instead');
}

// Export for use in API routes
function getFirestore() {
    return db;
}

module.exports = {
    admin,
    db,
    getFirestore
};
