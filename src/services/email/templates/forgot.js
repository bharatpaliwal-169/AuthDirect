const forgotPasswordBody = (TOKEN) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous"></link>
      <title>AuthDirect</title>
    </head>
    <body>
      <main>
        <header style="align-items: center; justify-content: center; text-align: center;">
          <h1 style="font-size: 2rem; font-weight: 900; color: #787cd1;">
            AuthDirect
          </h1>
          <p style="font-size: 14px; font-weight: 600; color: #9ca3af;">
            Mordern Authencation Solution
          </p>
        </header>
      
      <section style="margin: 1rem; border-radius: 0.375rem; border: 1px solid #9ca3af; background-color: #f8fafc; padding: 1rem; font-family:'Times New Roman', Times, serif; color: #000; box-shadow: 0 0.5rem 1rem 0 rgba( 31, 38, 135, 0.37 );">
        <h3 style="margin-bottom: 0.5rem; margin-top: 0.5rem; font-weight: 700; font-size:1.5rem;">
          Forgot Password
        </h3>
        <h4>Dear User,</h4>
        <p>Click on the following button to get back to your account.</p>
        
        <div style="margin-bottom: 1rem; margin-top: 0.75rem; align-items: center; justify-content: center; text-align: center;">
          <a href="${process.env.PROD_URL}/api/v2/auth/forgotpassword/?token=${TOKEN}">
            <button style="border-radius: 0.75rem; background-color: #a5b4fc; padding: 12px 24px 12px 24px; font-weight: 700; color: #1e1b4b; border:none; cursor:pointer;">
              Get back to My Account
            </button>
          </a>
        </div>

        <p style="margin-top: 1rem;">
          Best Regards,
        </p>
        <p style="font-weight: 600;">
          AuthDirect
        </p>
      </section>

      <div style="text-align: center; font-size: 14px; font-weight: 400; color: #6b7280;">
        <p>Developed by 
          <span>Bharat Paliwal</span>
        </p>
      </div>
    
      </main>
    </body>
    </html>
  `;
}

export default forgotPasswordBody;