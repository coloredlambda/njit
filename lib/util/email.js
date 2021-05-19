import nodemailer from 'nodemailer'
import { equals } from '@meltwater/phi'

export const createSendEmail = ({ config: { env, email: { host, port, username, password } } }) => async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user: username, pass: password }
  })

  if (equals(env, 'production')) return transporter.sendMail({ from: username, to, subject, text })
}
