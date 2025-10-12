export function welcomeEmailTemplate(name, clientURL) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Chat App</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f5f5; font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
    <!-- HEADER -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" 
      style="background:linear-gradient(90deg,rgba(242,92,84,1) 0%,rgba(247,178,103,1) 100%);height:40vh;">
      <tr>
        <td align="center" valign="middle" style="padding:40px 0;">
          <!-- Logo -->
          <table role="presentation" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" valign="middle" style="background-color:#ffffff;width:80px;height:80px;border-radius:50%;">
                <img src="https://cdn-icons-png.freepik.com/256/9149/9149357.png" alt="Chat App" width="60" style="display:block;max-width:90px;">
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:10px;">
                <h1 style="font-weight:bold;font-size:2rem;color:#ffffff;margin:0;">Welcome to Chat App</h1>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- CONTENT -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding:0 20px;">
          <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" 
            style="max-width:800px;background-color:#fdfdfd;border:1px solid #ddd;border-radius:20px;margin-top:-60px;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
            <tr>
              <td align="center" style="padding:40px 20px;">
                <p style="font-size:24px;font-weight:bold;margin:0 0 10px;">Hello ${name},</p>
                <span style="display:block;margin-bottom:30px;font-weight:600;font-size:1rem;line-height:1.4;">
                  Let's create many interesting conversations with your friends in here.
                </span>
                <a href="${clientURL}" 
                   style="display:inline-block;padding:12px 24px;border-radius:10px;background-color:#f7b267;
                          color:#f25c54;font-size:20px;font-weight:bold;text-decoration:none;">
                  Let's start
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

export function resetPassword(resetURL) {
  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Password Reset</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;background:#f4f6f8;margin:0;padding:0;display:flex;align-items:center;justify-content:center;height:100vh}
    .box{background:#fff;padding:28px;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.08);max-width:420px;text-align:center}
    h1{font-size:18px;margin:0 0 10px}
    p{color:#555;margin:0 0 18px}
    .btn{display:inline-block;padding:12px 20px;border-radius:6px;text-decoration:none;background:#1d72ff;color:#fff;font-weight:600}
    .note{font-size:13px;color:#888;margin-top:12px}
  </style>
</head>
<body>
  <div class="box">
    <h1>Reset your password</h1>
    <p>Press the button below to open the password reset page.</p>

    <a class="btn" href="${resetURL}">Reset password</a>

    <div class="note">If the button doesn't work, copy & paste the reset link into your browser.</div>
  </div>
</body>
</html>

  `;
}

export function changePasswordSuccessfully() {
  return `
  <!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Reset password successfully</title>
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
      color: #222;
    }
    .card {
      background: #fff;
      padding: 28px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      max-width: 420px;
      width: 90%;
      text-align: center;
    }
    h1 { margin: 0 0 10px; font-size: 20px; }
    p { margin: 0 0 18px; color: #555; }
    .btn {
      display: inline-block;
      padding: 12px 20px;
      border-radius: 8px;
      text-decoration: none;
      background: #2563eb;
      color: #fff;
      font-weight: 600;
    }
    .hint { margin-top: 12px; font-size: 13px; color: #888; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Reset password successfully</h1>
    <p>Your password has been updated. You can now sign in with your new password.</p>

    <!-- Replace __LOGIN_URL__ with your real login URL on the server -->
    <a class="btn" href="http://localhost:5173/login">Go to login in</a>

    <div class="hint">If the button doesn't work, navigate to your app's login page manually.</div>
  </div>
</body>
</html>

  `;
}
