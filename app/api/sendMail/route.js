// app/api/send-email/route.js
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    // Configura el transportador de correo
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Configura el contenido del correo
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: 'Nuevo mensaje desde el formulario de contacto',
      text: `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`,
      html: `<p>Nombre: ${name}</p><p>Correo: ${email}</p><p>Teléfono: ${phone}</p><p>Mensaje: ${message}</p>`
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: `Tu correo se envió correctamente.\nEn breve nos pondremos en contacto con vos!` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return new Response(JSON.stringify({ message: 'Error al enviar el correo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
