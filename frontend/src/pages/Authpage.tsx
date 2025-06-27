import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import TextfieldWrapper from "../components/FormUI/TextfieldWrapper";
import { RegisterInput, LoginInput } from "../types/auth";
import Grid from '@mui/material/Grid';


const API_URL = "http://localhost:5000";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Login mutation
  const loginMutation = useMutation<
    { token: string; user: { id: string; name: string; email: string } },
    unknown,
    LoginInput
  >({
    mutationFn: (data) =>
      axios.post(`${API_URL}/api/auth/login`, data).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate(`/profile/${data.user.id}`);
      setError(null);
    },
    onError: () => setError("Login failed. Please try again."),
  });

//   register mutation
  const registerMutation = useMutation<void, unknown, RegisterInput>({
    mutationFn: (data) =>
      axios.post(`${API_URL}/api/auth/register`, data).then(() => {}),
    onSuccess: (_, variables) => {
      setError(null);
      setIsLogin(true);
      loginMutation.mutate({ email: variables.email, password: variables.password });
    },
    onError: () => setError("Registration failed. Please try again."),
  });

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 10, p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          {isLogin ? "Login" : "Register"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: "10px" }}>
            {error}
          </Alert>
        )}

        {isLogin ? (
          <LoginForm mutate={loginMutation.mutate} />
        ) : (
          <RegisterForm mutate={registerMutation.mutate} />
        )}

        <Box textAlign="center" mt={2}>
          <Button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Register" : "Back to Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

const LoginForm: React.FC<{ mutate: any }> = ({ mutate }) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    validationSchema={Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    })}
    onSubmit={(values, { setSubmitting }) => {
      mutate(values);
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextfieldWrapper name="email" label="Email" />
          </Grid>
          <Grid item xs={12}>
            <TextfieldWrapper
              name="password"
              label="Password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Form>
    )}
  </Formik>
);

const RegisterForm: React.FC<{ mutate: any }> = ({ mutate }) => (
  <Formik
    initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
    validationSchema={Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6).required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    })}
    onSubmit={(values, { setSubmitting }) => {
      mutate({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextfieldWrapper name="name" label="Full Name" />
          </Grid>
          <Grid item xs={12}>
            <TextfieldWrapper name="email" label="Email" />
          </Grid>
          <Grid item xs={12}>
            <TextfieldWrapper
              name="password"
              label="Password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextfieldWrapper
              name="confirmPassword"
              label="Confirm Password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Form>
    )}
  </Formik>
);

export default AuthPage;
