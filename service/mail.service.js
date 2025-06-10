import nodemailer from "nodemailer";
import { getCursoById } from "./curso.service";
import dotenv from "dotenv";
import { get } from "http";
dotenv.config();

const EMAIL_EMISOR = process.env.EMAIL_EMISOR;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_EMISOR,
    pass: EMAIL_PASSWORD,
  },
});

export const enviarMailBienvenida = async (usuario) => {
  const mailOptions = {
    from: `Aprendix <${EMAIL_EMISOR}>`,
    to: usuario.email,
    subject: "¡Bienvenido a Aprendix!",
    html: `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f4;">
        <h2 style="color: #3e64ff;">¡Hola ${usuario.nombre}!</h2>
        <p>Gracias por registrarte en <strong>Aprendix</strong>. Estamos muy felices de tenerte en nuestra comunidad.</p>
        <p>¡Esperamos que disfrutes del aprendizaje!</p>
        <hr />
        <small>Si no fuiste vos quien creó esta cuenta, podés ignorar este correo.</small>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado:", info.response);
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
  }
};

export const enviarMailInscripcion = async (alumnoId, cursoId) => {
  const curso = await getCursoById(cursoId);
  const usuario = await getUserById(alumnoId);

  if (!curso || !usuario || !usuario.email) {
    console.warn("⚠️ No se enviará el mail: curso o usuario no encontrados.");
    return;
  }

  const mailOptions = {
    from: `Aprendix <${EMAIL_EMISOR}>`,
    to: usuario.email,
    subject: "¡Nueva inscripción a curso!",
    html: `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f4;">
        <h2 style="color: #3e64ff;">¡Hola ${usuario.nombre}!</h2>
        <p>Gracias por inscribirte al curso <strong>${curso.nombre}</strong>. Ahora vas a poder acceder a las clases del mismo, ¡No te olvides de mantener tu racha!.</p>
        <p>¡A seguir aprendiendo! Y recuerda que ante cualquier duda puedes comunicarte con tu profesor</p>
        <hr />
        <small>Equipo APRENDIX.</small>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado:", info.response);
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
  }
};
