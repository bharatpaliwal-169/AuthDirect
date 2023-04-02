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
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-md-10">
            <h1 class="display-4">AuthDirect</h1>
            <h3>Forgot Password!</h3>
            <h4 class="text-success-emphasis">No worries, we are at your rescue.</h4>
            <p class="text-muted">Please click on the below link to go back to your account.</p>
            <a href="http://localhost:5000/api/v2/auth/forgotpassword/?token=${TOKEN}" class="text-bg-primary link-underline">verify my email</a>
          </div>
        </div>
        <div class="row">
          <h4 class="display-6">
            Welcome to AuthDirect Saas service.
          </h4>
          <h6 class="text-muted">This application is developed by 
            <a href="#" class="link-underline-info">Bharat Paliwal</a>
          </h6>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default forgotPasswordBody;