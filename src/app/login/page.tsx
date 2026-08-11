export default function LoginPage() {
  return (
    <main>
      <h1>Student Login</h1>

      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </main>
  );
}