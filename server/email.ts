import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'LandNest Properties <onboarding@resend.dev>', // Change this to your verified domain
      to: [to],
      subject: 'Welcome to LandNest Properties! 🏡',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2d5f3f 0%, #4a8c5f 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: #2d5f3f; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🏡 Welcome to LandNest Properties!</h1>
              </div>
              <div class="content">
                <h2>Hello ${name}!</h2>
                <p>Thank you for joining LandNest Properties - your trusted partner in real estate across Rajnandgaon, Chhattisgarh.</p>
                
                <p><strong>What you can do now:</strong></p>
                <ul>
                  <li>Browse premium properties for sale and rent</li>
                  <li>List your own properties</li>
                  <li>Connect with potential buyers and sellers</li>
                  <li>Manage your property portfolio</li>
                </ul>
                
                <p style="text-align: center;">
                  <a href="${process.env.APP_URL || 'http://localhost:5000'}/properties" class="button">
                    Browse Properties
                  </a>
                </p>
                
                <p>If you have any questions, feel free to reach out to us at:</p>
                <p>📞 Phone: 6261642203<br>
                📧 Email: businesswithabhivrat@gmail.com</p>
                
                <p><strong>Find Your Nest, Invest the Best!</strong></p>
              </div>
              <div class="footer">
                <p>&copy; 2025 LandNest Properties. All rights reserved.</p>
                <p>Rajnandgaon, Chhattisgarh</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Email error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(to: string, name: string, resetToken: string) {
  const resetUrl = `${process.env.APP_URL || 'http://localhost:5000'}/reset-password?token=${resetToken}`;
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'LandNest Properties <onboarding@resend.dev>',
      to: [to],
      subject: 'Reset Your LandNest Password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #2d5f3f 0%, #4a8c5f 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: #2d5f3f; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔐 Password Reset Request</h1>
              </div>
              <div class="content">
                <h2>Hello ${name},</h2>
                <p>We received a request to reset your password for your LandNest Properties account.</p>
                
                <p style="text-align: center;">
                  <a href="${resetUrl}" class="button">
                    Reset Password
                  </a>
                </p>
                
                <div class="warning">
                  <strong>⚠️ Security Notice:</strong>
                  <ul>
                    <li>This link will expire in 1 hour</li>
                    <li>If you didn't request this, please ignore this email</li>
                    <li>Never share this link with anyone</li>
                  </ul>
                </div>
                
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; background: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                  ${resetUrl}
                </p>
                
                <p>If you need help, contact us at:</p>
                <p>📞 Phone: 6261642203<br>
                📧 Email: businesswithabhivrat@gmail.com</p>
              </div>
              <div class="footer">
                <p>&copy; 2025 LandNest Properties. All rights reserved.</p>
                <p>Rajnandgaon, Chhattisgarh</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Email error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error };
  }
}
