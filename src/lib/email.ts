import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendPasswordResetEmail({
  to,
  resetUrl,
  userName
}: {
  to: string;
  resetUrl: string;
  userName?: string;
}) {
  const html = `
    <h2>Hola ${userName || 'usuario'},</h2>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="${resetUrl}" style="color: blue;">${resetUrl}</a>
    <p>Este enlace expirará en 1 hora.</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Restablece tu contraseña',
      html
    });

    return { success: true };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, error };
  }
}
