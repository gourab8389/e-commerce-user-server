import nodemailer from "nodemailer";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
    
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Verify Your Email',
      html: `
        <h1>Email Verification</h1>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationUrl}">Verify Email</a>
      `,
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Password Reset',
      html: `
        <h1>Password Reset</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
      `,
    });
  }

  async sendSellerApprovalEmail(email: string, businessName: string, approved: boolean) {
    const subject = approved ? 'Seller Account Approved' : 'Seller Account Rejected';
    const message = approved 
      ? `Congratulations! Your seller account for ${businessName} has been approved.`
      : `Unfortunately, your seller account for ${businessName} has been rejected.`;

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject,
      html: `<h1>${subject}</h1><p>${message}</p>`,
    });
  }
}

export const emailService = new EmailService();