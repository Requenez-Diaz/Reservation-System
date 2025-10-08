import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendPasswordResetEmailParams {
  to: string;
  resetUrl: string;
  userName?: string;
}

export async function sendPasswordResetEmail({
  to,
  resetUrl,
  userName
}: SendPasswordResetEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'alfredorequenez57libra@gmail.com',
      to: [to],
      subject: 'Restablece tu contraseña',
      html: getPasswordResetEmailTemplate(resetUrl, userName)
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}

function getPasswordResetEmailTemplate(
  resetUrl: string,
  userName?: string
): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Restablece tu contraseña</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f6f9fc;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                 Header 
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a1a1a;">
                      Restablece tu contraseña
                    </h1>
                  </td>
                </tr>
                
                 Content 
                <tr>
                  <td style="padding: 0 40px 40px 40px;">
                    ${userName ? `<p style="margin: 0 0 16px 0; font-size: 16px; line-height: 24px; color: #4a5568;">Hola ${userName},</p>` : ''}
                    
                    <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 24px; color: #4a5568;">
                      Recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón de abajo para crear una nueva contraseña.
                    </p>
                    
                    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #4a5568;">
                      Este enlace expirará en <strong>1 hora</strong> por razones de seguridad.
                    </p>
                    
                     Button 
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td align="center" style="padding: 0 0 24px 0;">
                          <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background-color: #0070f3; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 500;">
                            Restablecer contraseña
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 20px; color: #718096;">
                      Si no puedes hacer clic en el botón, copia y pega este enlace en tu navegador:
                    </p>
                    
                    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 20px; color: #0070f3; word-break: break-all;">
                      ${resetUrl}
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
                    
                    <p style="margin: 0; font-size: 14px; line-height: 20px; color: #718096;">
                      Si no solicitaste restablecer tu contraseña, puedes ignorar este email de forma segura.
                    </p>
                  </td>
                </tr>
                
                 Footer 
                <tr>
                  <td style="padding: 20px 40px; background-color: #f7fafc; border-radius: 0 0 8px 8px;">
                    <p style="margin: 0; font-size: 12px; line-height: 18px; color: #a0aec0; text-align: center;">
                      Este es un email automático, por favor no respondas a este mensaje.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
