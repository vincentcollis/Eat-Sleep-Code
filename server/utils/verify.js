import admin from 'firebase-admin';
admin.initializeApp({
    credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
    //  databaseURL: process.env.FIREBASE_DATABASE_URL as string,
});
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        res.locals.decodedToken = decodedToken;
        next();
    }
    catch (error) {
        return res.status(403).json({ error: 'Forbidden' });
    }
};
export default verifyToken;
