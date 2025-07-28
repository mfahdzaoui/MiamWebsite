import { initializeApp, getApps, getApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAnkKWV9lXQeM5HRLPhDRCQR71HWQxJBJA",
  authDomain: "dzmiam.firebaseapp.com",
  projectId: "dzmiam",
  storageBucket: "dzmiam.firebasestorage.app",
  messagingSenderId: "705879581427",
  appId: "1:705879581427:web:a14548d64393b7e7b60d86",
  measurementId: "G-C8BWSG0MVQ",
}
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }

        return null
    } catch (err) {
        return null
    }
})()

export const fetchToken = async (setFcmToken) => {
    return getToken(await messaging, {
        vapidKey:
            'BEe3flUSV8l-wmG8c0fTjMDmYHTVEQjRKpZBLha3Wd1iRmoQDCCJGgQvHP6giKayXq_xnWt-OMhEaWeklExEPww',
    })
        .then((currentToken) => {
            if (currentToken) {
                setFcmToken(currentToken)
            } else {
                setFcmToken()
            }
        })
        .catch((err) => {
            console.error(err)
        })
}

export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            onMessage(messagingResolve, (payload) => {
                resolve(payload)
            })
        })()
    )
export const auth = getAuth(firebaseApp)
