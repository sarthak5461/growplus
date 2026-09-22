export async function sendMail({ to, subject, text }) {
  if (!process.env.EMAIL_PROVIDER_KEY) {
    return { skipped: true, to, subject };
  }
  console.info("email stub", { to, subject, text });
  return { skipped: true, to, subject };
}
