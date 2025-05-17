import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { name, email, message } = await req.json();

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `${name} <${email}>`,
            to: process.env.EMAIL_USER,
            subject: "New Contact Form Submission",
            text: message,
            html: `<p>${message}</p>`
        });
        return Response.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return Response.json({ message: "Failed to send email" }, { status: 500 });
    }
}