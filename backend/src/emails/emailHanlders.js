import { resendClient, sender } from "../lib/resend.js";
import {
  changePasswordSuccessfully,
  resetPassword,
  welcomeEmailTemplate,
} from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURl) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: `Welcome to Chat App`,
    html: welcomeEmailTemplate(name, clientURl),
  });

  if (error) {
    console.error("Error sending welcome email", error);
    throw new Error("Failed to send welcome email");
  }

  console.log("Welcome email sent successfully", data);
};

export const sendEmailResetPassword = async (email, resetURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: `Reset password`,
    html: resetPassword.replace("{resetURL}", resetURL),
  });

  if (error) {
    console.error("Error sending reset password email", error);
    throw new Error("Failed to send reset password email");
  }

  console.log("Reset password email sent successfully", data);
};

export const ResetPasswordSuccessfully = async (email) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: `Password reset successfully`,
    html: changePasswordSuccessfully,
  });

  if (error) {
    console.error("Error sending successfully reset password email", error);
    throw new Error("Failed to send successfully reset password email");
  }

  console.log("Reset password email sent successfully", data);
};
