<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>TestSphere - Login</title>

  <style>

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }


    body {
      min-height: 100vh;

      display: flex;
      justify-content: center;
      align-items: center;

      background-color: #f6f7fb;

      font-family: Arial, sans-serif;
      color: #292936;
    }


    .login-container {
      width: 100%;
      max-width: 420px;
      padding: 20px;
    }


    .login-box {
      background-color: white;

      padding: 40px 36px;

      border: 1px solid #eeeeF5;
      border-radius: 14px;

      box-shadow:
        0 10px 30px rgba(60, 50, 120, 0.08);
    }


    /* Website Logo */

    .logo {
      text-align: center;

      font-size: 30px;
      font-weight: bold;

      color: #6847c7;

      margin-bottom: 10px;
    }


    .subtitle {
      text-align: center;

      color: #777784;

      font-size: 14px;

      margin-bottom: 35px;
    }


    /* Form */

    .form-group {
      margin-bottom: 20px;
    }


    label {
      display: block;

      font-size: 14px;
      font-weight: 500;

      color: #454553;

      margin-bottom: 8px;
    }


    input[type="email"],
    input[type="password"],
    input[type="text"] {

      width: 100%;
      height: 48px;

      padding: 0 14px;

      border: 1px solid #d9d9e3;
      border-radius: 7px;

      font-size: 14px;

      transition: 0.2s;
    }


    input:focus {
      outline: none;

      border-color: #7259c7;

      box-shadow:
        0 0 0 3px rgba(114, 89, 199, 0.12);
    }


    input::placeholder {
      color: #a2a2af;
    }


    /* Password */

    .password-wrapper {
      position: relative;
    }


    .password-wrapper input {
      padding-right: 48px;
    }


    .eye-button {
      position: absolute;

      right: 14px;
      top: 50%;

      transform: translateY(-50%);

      background: none;
      border: none;

      cursor: pointer;
    }


    .eye-icon {
      width: 20px;
      height: 20px;

      fill: none;
      stroke: #70707c;

      stroke-width: 2;
    }


    /* Forgot Password */

    .forgot-password {
      display: inline-block;

      margin-top: 10px;

      font-size: 14px;

      color: #6847c7;

      text-decoration: none;
    }


    .forgot-password:hover {
      text-decoration: underline;
    }


    /* Remember Me */

    .remember-row {
      display: flex;
      align-items: center;

      margin: 22px 0;
    }


    .remember-row input {
      width: 18px;
      height: 18px;

      margin-right: 10px;

      accent-color: #7259c7;

      cursor: pointer;
    }


    .remember-row label {
      margin: 0;

      font-weight: normal;

      cursor: pointer;
    }


    /* Sign In Button */

    .sign-in-button {
      width: 100%;
      height: 48px;

      border: none;
      border-radius: 7px;

      background-color: #7259c7;
      color: white;

      font-size: 15px;
      font-weight: 600;

      cursor: pointer;

      transition: 0.2s;
    }


    .sign-in-button:hover {

      background-color: #6248b8;

      transform: translateY(-1px);

      box-shadow:
        0 6px 15px rgba(114, 89, 199, 0.25);
    }


    .sign-in-button:active {
      transform: translateY(0);
    }


    /* Mobile */

    @media (max-width: 480px) {

      .login-container {
        padding: 15px;
      }

      .login-box {
        padding: 32px 24px;
      }

    }

  </style>

</head>


<body>

  <div class="login-container">

    <div class="login-box">

      <div class="logo">
        TestSphere
      </div>

      <p class="subtitle">
        Sign in to your testing workspace
      </p>

      <form>

        <div class="form-group">
          <label for="email">Email address</label>

          <input
            type="email"
            id="email"
            placeholder="Enter email ID"
          >
        </div>


        <div class="form-group">
          <label for="password">Password</label>

          <input
            type="password"
            id="password"
            placeholder="Enter password"
          >

          <a href="#" class="forgot-password">
            Forgot Password?
          </a>
        </div>


        <div class="remember-row">

          <input
            type="checkbox"
            id="remember"
          >

          <label for="remember">
            Remember me
          </label>

        </div>


        <button type="submit" class="sign-in-button">
          Sign in
        </button>

      </form>

    </div>

  </div>

</body>

</html>