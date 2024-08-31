import Resend from '@resend/node';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function post({ request }) {
  const { firstName, lastName, email, phone, message } = await request.json();

  try {
    await resend.sendEmail({
      from: 'dignation@send.husky.nz',
      to: 'form@dignation.nz',
      subject: `New message from ${firstName} ${lastName}`,
      html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Message:</strong></p><p>${message}</p>`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
