import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineAcademicCap,
} from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AuthContext";
import { notify } from "../utils/notify";
import { APP_NAME } from "../constants";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);

      notify.success("Welcome back! Logged in successfully.");

      navigate("/");
    } catch (err) {
      notify.error(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Teacher Login — {APP_NAME}</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.1,
              type: "spring",
              stiffness: 200,
            }}
            className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-btn-secondary"
          >
            <HiOutlineAcademicCap className="w-9 h-9 text-white" />
          </motion.div>

          <h1 className="text-h2 font-heading font-bold text-erp-heading dark:text-erp-dark-heading">
            {APP_NAME}
          </h1>

          <p className="text-sm text-erp-muted dark:text-erp-dark-text mt-1">
            Teacher Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="card p-8 space-y-6 bg-white dark:bg-erp-dark-card shadow-modal">
          <div>
            <h2 className="text-h3 font-heading font-bold text-erp-heading dark:text-erp-dark-heading">
              Sign In
            </h2>

            <p className="text-sm text-erp-text dark:text-erp-dark-text mt-1">
              Enter your credentials to access the teacher panel
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Email */}
            <div className="space-y-1.5">
              <label className="form-label">
                Email Address <span className="text-danger">*</span>
              </label>

              <div className="relative">
                <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-erp-muted" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`form-input pl-10 ${
                    errors.email ? "border-danger focus:ring-red-100" : ""
                  }`}
                  {...register("email")}
                />
              </div>

              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="form-label mb-0">
                  Password <span className="text-danger">*</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-erp-muted" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`form-input pl-10 pr-10 ${
                    errors.password ? "border-danger focus:ring-red-100" : ""
                  }`}
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-erp-muted hover:text-erp-text transition-colors"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <HiOutlineEye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded text-primary border-erp-border"
              />

              <label
                htmlFor="remember"
                className="text-sm text-erp-text dark:text-erp-dark-text cursor-pointer"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{
                scale: isSubmitting ? 1 : 1.01,
              }}
              whileTap={{
                scale: isSubmitting ? 1 : 0.99,
              }}
              className="btn-primary w-full py-3 text-base"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>
        </div>

        {/* Copyright */}
        <p className="text-center text-caption text-erp-muted dark:text-erp-dark-text mt-6">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </motion.div>
    </>
  );
}
