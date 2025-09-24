import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import crypto from "crypto";

const PAYHIP_API_KEY = process.env.PAYHIP_API_KEY || "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const signature = req.headers["x-payhip-signature"] as string;
    const bodyRaw = JSON.stringify(req.body);

    // ✅ Verify signature using HMAC + SHA256 with your API key
    const expectedSignature = crypto
      .createHmac("sha256", PAYHIP_API_KEY)
      .update(bodyRaw)
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(401).json({ message: "Invalid signature" });
    }

    const event = req.body;

    const email = event?.customer_email;
    const product = event?.product_name;

    if (!email || !product) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Decide tier
    let tier = "starter";
    if (product.toLowerCase().includes("pro")) tier = "pro";
    if (product.toLowerCase().includes("business")) tier = "business";

    // Save/update Firestore
    await setDoc(
      doc(db, "users", email),
      {
        email,
        tier,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return res.status(200).json({ message: "User upgraded", tier });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
