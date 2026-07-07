import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY!)
  return _resend
}

export async function sendOrderConfirmation(to: string, name: string, orderId: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  await getResend().emails.send({
    from: 'LastingWords <noreply@lastingwords.co>',
    to,
    subject: `Your tribute for ${name} is ready`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #44403c;">
        <h1 style="font-size: 24px; font-weight: normal; color: #292524; margin-bottom: 8px;">
          Your tribute is ready
        </h1>
        <p style="font-size: 16px; line-height: 1.6; color: #57534e;">
          Thank you for trusting us to help honor ${name}. Your complete tribute package is now available.
        </p>
        <a href="${appUrl}/success?order_id=${orderId}"
           style="display: inline-block; margin: 24px 0; padding: 14px 28px; background-color: #292524; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px;">
          View Your Tribute
        </a>
        <p style="font-size: 14px; line-height: 1.6; color: #78716c;">
          You have one complimentary revision available if you'd like any changes made.
        </p>
        <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;" />
        <p style="font-size: 12px; color: #a8a29e;">
          With compassion, The LastingWords Team
        </p>
      </div>
    `,
  })
}
