export const getForgotPasswordTemplate = (
  name: string,
  email: string,
  resetLink: string
): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #4f46e5; margin-bottom: 20px;">Password Reset Request</h2>
      <p>Hello ${name},</p>
      <p>We received a request to reset the password for your account associated with the email <strong>${email}</strong>.</p>
      <p>Please click the button below to reset your password. This link will remain active for 15 minutes:</p>
      <div style="margin: 30px 0; text-align: center;">
        <a href="${resetLink}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
      </div>
      <p style="color: #64748b; font-size: 14px;">If you did not make this request, you can safely ignore this email. Your password will remain unchanged.</p>
    </div>
  `;
};
