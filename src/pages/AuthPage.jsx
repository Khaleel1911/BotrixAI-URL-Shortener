import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import  BotrixAI_Light  from "../assets/BotrixAI_Light.avif";
import  BotrixAI_Dark  from "../assets/BotrixAI_Dark.avif";
import { login, register } from "../api/authService";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const navigate = useNavigate();

  const handleToggleMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (isLogin) {
        const res = await login({
          email: formData.email,
          password: formData.password,
        });
  
        localStorage.setItem("token", res.data.token);
        navigate("/generate", { replace: true });
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }
  
        const res = await register({
          email: formData.email,
          password: formData.password,
        });
  
        localStorage.setItem("token", res.data.token);
        navigate("/generate", { replace: true });
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Authentication failed. Please try again."
      );
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleMode();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/generate", { replace: true });
    }
  }, []);

  return (
    <>

      <div className="min-h-screen bg-bg-primary-light dark:bg-bg-primary-dark flex items-center justify-center py-12 px-4">
        <div className="max-w-[500px] w-full">
          {/* Logo */}
          <div className="flex justify-center mb-8">
          <img src={BotrixAI_Light} className="h-16 w-auto dark:hidden"/>
          <img src={BotrixAI_Dark} className="h-16 w-auto hidden dark:block"/>

          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-4 mb-8 bg-bg-primary-light dark:bg-bg-primary-dark p-1 rounded-xl dark:shadow-md dark:shadow-gray-700">
            <button
              type="button"
              onClick={handleToggleMode}
              onKeyDown={handleKeyDown}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all duration-200 cursor-pointer ${
                isLogin
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-transparent text-black dark:text-dark-text'
              }`}
              aria-label={isLogin ? 'Currently on login mode' : 'Switch to login mode'}
              tabIndex={0}
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleToggleMode}
              onKeyDown={handleKeyDown}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all duration-200  cursor-pointer ${
                !isLogin
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-transparent text-black dark:text-dark-text '
              }`}
              aria-label={!isLogin ? 'Currently on signup mode' : 'Switch to signup mode'}
              tabIndex={0}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 text-gray-900 dark:text-dark-text">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="
                    w-full h-12 px-4 border border-gray-300 rounded-lg text-base outline-none
                    text-gray-900 dark:text-dark-text
                    placeholder:text-gray-400 dark:placeholder:text-gray-300
                    focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all
                  "
                  placeholder="Enter your full name"
                  aria-label="Enter your full name"
                />
              </div>
            )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="
                w-full h-12 px-4 border border-gray-300 rounded-lg text-base outline-none
                text-gray-900 dark:text-dark-text
                placeholder:text-gray-400 dark:placeholder:text-gray-300
                focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all
              "
              placeholder="Enter your email"
              aria-label="Enter your email address"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="
                w-full h-12 px-4 border border-gray-300 rounded-lg text-base outline-none
                text-gray-900 dark:text-dark-text
                placeholder:text-gray-400 dark:placeholder:text-gray-300
                focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all
              "
              placeholder="Enter your password"
              aria-label="Enter your password"
              minLength={6}
            />
          </div>

          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={!isLogin}
                className="
                  w-full h-12 px-4 border border-gray-300 rounded-lg text-base outline-none
                  text-gray-900 dark:text-dark-text
                  placeholder:text-gray-400 dark:placeholder:text-gray-300
                  focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition-all
                "
                placeholder="Confirm your password"
                aria-label="Confirm your password"
                minLength={6}
              />
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-teal border-gray-300 rounded focus:ring-teal"
                  aria-label="Remember me"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-dark-text">Remember me</span>
              </label>
              <a
                href="#forgot-password"
                className="text-sm text-teal hover:text-teal-dark font-medium"
                aria-label="Forgot password"
              >
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="
              w-full h-12 bg-teal-500 text-white font-semibold text-lg rounded-lg
              shadow-[0_6px_18px_rgba(14,165,164,0.35)] transition-all
              hover:bg-teal-dark hover:shadow-[0_8px_22px_rgba(14,165,164,0.40)]
              hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2
            "
            aria-label={isLogin ? "Submit login form" : "Submit signup form"}
            tabIndex={0}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          </form>
          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full h-12 border border-gray-300 rounded-lg font-medium text-gray-700 dark:text-dark-text bg-white dark:bg-bg-primary-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer flex items-center justify-center gap-2"
              aria-label="Continue with Google"
              tabIndex={0}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full h-12 border border-gray-300 rounded-lg font-medium text-gray-700 dark:text-dark-text bg-white dark:bg-bg-primary-dark cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
              aria-label="Continue with GitHub"
              tabIndex={0}
              onClick={() =>
                window.location.href = `${import.meta.env.VITE_OAUTH_BASE_URL || "http://localhost:8081"}/oauth2/authorization/github`
              }
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthPage;

