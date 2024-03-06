import React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Button from "@mui/material/Button";
import Navbar from "../Header/Navbar";
import profile from "../../Images/profile.png";

const Login = () => {
  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(3, "incorect Password"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(
        "https://task-management-opll.onrender.com/api/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      console.log(data.password);
      console.log(data.email);

      if (response.status === 201) {
        if (response.data.profile.isAdmin) {
          navigate("/AdminDashboard");
        } else {
          navigate("/DevTasks");
        }

        console.log("Login successful");
        const token = response.data.accessToken;
        const loginUserName = response.data.profile.name;
        const loginUserid = response.data.profile.id;
        const loginUseremail = response.data.profile.email;
        localStorage.setItem("token", token);
        localStorage.setItem("loginUserid", loginUserid);
        localStorage.setItem("loginUserName", loginUserName);
        localStorage.setItem("loginUseremail", loginUseremail);
        console.log("User's phone number:", response.data.profile.phoneNumber);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      window.alert("User Does not Exist");
      console.error("An error occurred during login:", error);
    }
  };

  //   try {
  //     const response = await axios.post(
  //       "https://task-management-opll.onrender.com/api/auth/login",
  //       {
  //         email,
  //         password,
  //       }
  //     );

  //     console.log(values.email);
  //     console.log(values.password);

  //     if (response.status === 201) {
  //       if (response.data.profile.isAdmin) {
  //         navigate("/AdminDashboard");
  //       } else {
  //         navigate("/DevTasks");
  //       }

  //       console.log("Login successful");
  //       const token = response.data.accessToken;
  //       const loginUserName = response.data.profile.name;
  //       const loginUserid = response.data.profile.id;
  //       const loginUseremail = response.data.profile.email;
  //       localStorage.setItem("token", token);
  //       localStorage.setItem("loginUserid", loginUserid);
  //       localStorage.setItem("loginUserName", loginUserName);
  //       localStorage.setItem("loginUseremail", loginUseremail);
  //       console.log("User's phone number:", response.data.profile.phoneNumber);
  //     } else {
  //       console.log("Login failed");
  //     }
  //   } catch (error) {
  //     window.alert("User Does not Exist");
  //     console.error("An error occurred during login:", error);
  //   }
  // };

  // const pageNavigation = async () => {
  //   await handleLogin(values.email, values.password); // Wait for login to complete
  //   console.log(values.email);
  //   console.log(values.password);
  // };

  return (
    <section>
      <>
        <Navbar />
        <div className="flex justify-center text-center p-10 bg-slate-300">
          <div className="flex justify-center pt-14 h-[500px] w-[400px] bg-white rounded-[40px] shadow-2xl ">
            <div>
              <div className="flex justify-center pt-1">
                <div className="flex justify-center h-[115px] w-[115px]  bg-slate-300 rounded-[120px] ">
                  <img src={profile} alt="profile" />
                </div>
              </div>
              <div>
                <h2 className="text-lg  text-zinc-950 ">Login page</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    sx={{ m: 1, width: "30ch" }}
                    id="outlined-textarea"
                    label="User Name"
                    size="medium"
                    placeholder="User Name"
                    className="name11"
                    name="email"
                    multiline
                    variant="outlined"
                    required
                    {...register("email")}
                  />
                  {errors.email && (
                    <p
                      style={{
                        paddingRight: "130px",
                        fontSize: "15px",
                        color: "red",
                      }}
                    >
                      * {errors.email.message}
                    </p>
                  )}

                  <TextField
                    sx={{ width: "30ch" }}
                    name="password"
                    variant="outlined"
                    margin="normal"
                    size="medium"
                    fullWidth
                    label="Password"
                    placeholder="Password"
                    type="password"
                    id="password"
                    required
                    {...register("password")}
                  />
                  {errors.password && (
                    <p
                      style={{
                        paddingRight: "130px",
                        fontSize: "15px",
                        color: "red",
                      }}
                    >
                      * {errors.password.message}
                    </p>
                  )}
                  <Button
                    sx={{ m: 1, width: "30ch" }}
                    variant="contained"
                    size="large"
                    color="primary"
                    type="submit"
                  >
                    login
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default Login;
