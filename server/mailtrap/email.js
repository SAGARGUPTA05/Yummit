require("dotenv").config(); // Load environment variables
const { Resend } = require("resend");
const { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } = require("./htmlEmail");

const resend = new Resend(process.env.MAILTRAP_API_TOKEN); // Use Resend API key
const sender = "Acme <onboarding@resend.dev>"; // Update sender email to a verified domain

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    if (typeof htmlContent !== 'string') {
      throw new Error("Email content is invalid");
    }

    const emailHtml = htmlContent.replace("{verificationToken}", verificationToken);
    const response = await resend.emails.send({
      from: sender,
      to: [email],
      subject: "Verify Your Email",
      html: emailHtml,
    });
    
    console.log("Verification email sent:", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await resend.emails.send({
      from: sender,
      to: [email],
      subject: "Welcome to Foodplus",
      html: generateWelcomeEmailHtml(name),
    });
    
    console.log("Welcome email sent:", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    const response = await resend.emails.send({
      from: sender,
      to: [email],
      subject: "Reset Your Password",
      html: generatePasswordResetEmailHtml(resetUrl),
    });
    
    console.log("Password reset email sent:", response);
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

const sendResetSuccessEmail = async (email) => {
  try {
    const response = await resend.emails.send({
      from: sender,
      to: [email],
      subject: "Password Reset Successful",
      html: generateResetSuccessEmailHtml(),
    });
    
    console.log("Password reset success email sent:", response);
  } catch (error) {
    console.error("Error sending reset success email:", error);
  }
};

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail };
