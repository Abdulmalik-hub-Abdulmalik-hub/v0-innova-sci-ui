/**
 * Production Email Service logic
 * Note: Replace console.log with an actual provider like Resend or Nodemailer
 */
export class EmailService {
  static async sendVerificationEmail(email: string, token: string) {
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;
    
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2>InnovaSci AI Labs</h2>
        <p>Thank you for joining. Please verify your email to activate your account.</p>
        <a href="${verifyUrl}" style="background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify Email Address
        </a>
        <p>This link expires in 24 hours.</p>
      </div>
    `;

    console.log(`[EMAIL] Verification sent to ${email}: ${verifyUrl}`);
    // implementation: await resend.emails.send({ to: email, subject: 'Verify Account', html: htmlContent });
  }
}
