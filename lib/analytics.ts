// lib/analytics.ts
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * logEvent - generic analytics logger
 * @param eventType string - one of 'session', 'pivot_view', 'generate', 'download_word', 'download_pdf', 'job_click'
 * @param payload object - extra fields: userEmail?, pivotRole?, pivotSlug?, extra?
 */
export async function logEvent(eventType: string, payload: Record<string, any> = {}) {
  try {
    const docRef = await addDoc(collection(db, "events"), {
      eventType,
      ...payload,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (err) {
    // Fail silently in UI but print to server console during dev
    console.error("logEvent error:", err);
    return null;
  }
}
