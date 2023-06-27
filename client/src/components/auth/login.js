import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authcontext';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const { login, errors, setErrors, setIsSubmitting, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (errors) {
      setErrors('Email is not registered. Please try again.');
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/listings');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container">
      <div>
        <h2>Login</h2>
      </div>
      <form autoComplete="off" onSubmit={handleSignIn}>
        <div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              ref={emailRef}
              placeholder="Email Address"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          {errors && <div className="error">{errors}</div>}
          <div>
            <div>
              <span>
                Don't have an account? Sign up{' '}
                <Link to="/register" className="text-yellow-400 hover:underline">
                  {' '}
                  here.
                </Link>
              </span>
            </div>
          </div>
          <div className="text-center">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
