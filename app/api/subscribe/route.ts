// import clientPromise from "@/lib/mongodb";

// export async function POST(req: Request) {
//   try {
//     const { email, message } = await req.json();

//     if (!email) {
//       return Response.json(
//         { error: "Email is required" },
//         { status: 400 }
//       );
//     }

//     // ================
//     //  SAVE TO MONGODB
//     // ================
//     const client = await clientPromise;
//     const db = client.db("newsletter_db");

//     await db.collection("subscribers").insertOne({
//       email,
//       message,
//       date: new Date(),
//     });

//     // ===============
//     //  SEND EMAIL USING EMAILJS REST API
//     // ===============
//     const emailPayload = {
//       service_id: process.env.EMAILJS_SERVICE_ID,
//       template_id: process.env.EMAILJS_TEMPLATE_ID,
//       user_id: process.env.EMAILJS_PUBLIC_KEY,
//       accessToken: process.env.EMAILJS_PRIVATE_KEY,
//       template_params: {
//         to_email: email,
//         message: message || "Thank you for subscribing!",
//       },
//     };

//     const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(emailPayload),
//     });

//     if (!emailRes.ok) {
//       console.error(await emailRes.text());
//       return Response.json(
//         { error: "Failed to send email" },
//         { status: 500 }
//       );
//     }

//     return Response.json(
//       { success: true, message: "Subscription successful" },
//       { status: 200 }
//     );

//   } catch (err) {
//     console.error("Subscription error:", err);
//     return Response.json({ error: "Server error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { sendMail } from "@/lib/sendMail";
import { newsletterTemplate } from "@/lib/emailTemplate";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    await sendMail(
      email,
      "Welcome to ADD 2025 🚀",
      newsletterTemplate(email)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
