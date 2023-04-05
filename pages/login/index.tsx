import {useRouter} from "next/router";
import {useState} from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {parseCookies, setCookie} from "nookies";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`,
        {
          identifier: username,
          password: password
        }
      );
      const token = response.data.jwt;
      const user = jwtDecode(token);
      // Cookies.set('jwt', token, { expires: 365 })
      setCookie(null, "jwt", token, {
        maxAge: 365 * 24 * 60 * 60,
      })
      // localStorage.setItem("token", token);
      // localStorage.setItem("user", JSON.stringify(user));

      router.push("/");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

Login.getInitialProps = async (ctx) => {
    const jwt = parseCookies(ctx).jwt;

    if (jwt) {
        ctx.res.writeHead(302, { Location: "/" });
        ctx.res.end();
    }

    return {};
}

export default Login