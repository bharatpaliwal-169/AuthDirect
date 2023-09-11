const verifyEmail = (TOKEN,user) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AuthDirect</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
    <body>
      <div>  
        <div style="align-items: center; justify-content: center; text-align: center;">
          <h1 style="font-size: 2rem; font-weight: 900; color: #787cd1;">
            AuthDirect
          </h1>
          <p style="font-size: 14px; font-weight: 600; color: #9ca3af;">
            Mordern Authencation Solution
          </p>
        </div>
        
        <div style="margin: 1rem; border-radius: 0.375rem; border: 1px solid #9ca3af; background-color: #f8fafc; padding: 1rem; font-family:'Times New Roman', Times, serif; color: #000; box-shadow: 0 0.5rem 1rem 0 rgba( 31, 38, 135, 0.37 );">
          <h3 style="margin-bottom: 0.5rem; margin-top: 0.5rem; font-weight: 700; font-size:1.5rem;">
            Email verification
          </h3>
          <h4>Hi ${user},</h4>
          <p>Team AuthDirect welcomes you on-board. Please click on the button below to verify your email.</p>
          
          <div style="margin-bottom: 1rem; margin-top: 0.75rem; align-items: center; justify-content: center; text-align: center;">
            <a href="${process.env.DEV_URL}/api/v2/auth/verification/?token=${TOKEN}">
              <button style="border-radius: 0.75rem; background-color: #a5b4fc; padding: 12px 24px 12px 24px; font-weight: 700; color: #1e1b4b; border:none; cursor:pointer;">
                Verify Email
              </button>
            </a>
          </div>
  
          <p style= "font-size: 14px;">
            <span style="font-weight: 600;">Note:</span> Verifing your email will get you a verified account on our application.
          </p>
  
          <p style="margin-top: 1rem;">
            Best Regards,
          </p>
          <p style="font-weight: 600;">
            AuthDirect
          </p>
        </div>
  
        <div style="text-align: center; font-size: 14px; font-weight: 400; color: #6b7280;">
          <p>Developed by 
            <span>Bharat Paliwal</span>
          </p>
        </div>
      </div>
    </body>
  </html>
  `
}

export default verifyEmail;