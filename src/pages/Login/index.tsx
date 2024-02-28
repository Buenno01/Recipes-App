function Login() {
  return (
    <div>
      <input type="email" data-testid="email-input" />
      <input type="password" data-testid="password-input" />
      <button data-testid="login-submit-btn">Enter</button>
    </div>
  );
}

export default Login;
