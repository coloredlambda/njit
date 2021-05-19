import nodemailer from 'nodemailer'

export const createSendEmail = ({ config: { email: { host, port, username, password } } }) => async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user: username, pass: password }
  })
  return transporter.sendMail({ from: username, to, subject, text })
}
