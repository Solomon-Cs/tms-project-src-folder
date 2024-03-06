import React from "react";
import {
  Box,
  Button,
  Grid,
  Group,
  NativeSelect,
  TextInput,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { Radio } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useAddUserMutation } from "../../Redux/features/usersApi";

const AddUser = ({ onCloseModal }) => {
  const schema = Yup.object().shape({
    name: Yup.string().min(3, "Name should have at least 3 letters"),
    email: Yup.string().email().required("Email is required"),
    phoneNumber: Yup.string().matches(
      /^(\+?)(251)(\d{9})$/,
      "Invalid phoneNumber number"
    ),
    jobTitle: Yup.string().required("Job Title is required"),
    gender: Yup.string().required("Select Gender pleace"),
    password: Yup.string().min(3, "pleace inter atlice 3 character"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      jobTitle: "",
      gender: "",
      password: "",
    },
  });

  const notifyAdd = () =>
    toast.success("Sucessfully Save user!", { autoClose: 1000 });
  const token = localStorage.getItem("token");

  const [addUser] = useAddUserMutation();
  const onSubmit = async (data) => {
    await addUser(data);
    notifyAdd();
    onCloseModal();
    console.log(data);
  };

  return (
    <div>
      <Box maw={500} mx="auto">
        <h4 className="mt-0">Add New Developer</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                label="Name"
                placeholder="Developer Name"
                size="sm"
                mt="sm"
                required
                {...register("name")}
              />
              {errors.name && (
                <span style={{ color: "red" }}>** {errors.name.message}</span>
              )}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                label="Email"
                placeholder="Email"
                size="sm"
                mt="sm"
                required
                {...register("email")}
              />
              {errors.email && (
                <span style={{ color: "red" }}>** {errors.email.message}</span>
              )}
            </Grid.Col>
          </Grid>

          <TextInput
            withAsterisk
            label="phoneNumber Number"
            placeholder="phone Number "
            size="sm"
            mt="sm"
            required
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <span style={{ color: "red" }}>
              ** {errors.phoneNumber.message}
            </span>
          )}

          <Radio.Group label="Gender? " mt="sm" withAsterisk required>
            <Group mt="sm">
              <Radio
                value="male"
                label="Male"
                {...register("gender", { required: true })}
              />
              <Radio
                value="female"
                label="Female"
                {...register("gender", { required: true })}
              />
            </Group>
          </Radio.Group>

          {errors.gender && (
            <span style={{ color: "red" }}>** {errors.gender.message} </span>
          )}

          <NativeSelect
            mt="sm"
            label="Job Title"
            rightSection={<IconChevronDown style={{ width: 16, height: 16 }} />}
            required
            {...register("jobTitle")}
          >
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
          </NativeSelect>
          {errors.jobTitle && (
            <span style={{ color: "red" }}>** {errors.jobTitle.message} </span>
          )}
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                label="Password"
                placeholder="Password"
                type="password"
                size="sm"
                mt="sm"
                required
                {...register("password")}
              />
              {errors.password && (
                <span style={{ color: "red" }}>
                  ** {errors.password.message}
                </span>
              )}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                label="Confirm Password"
                placeholder="Password"
                type="password"
                size="sm"
                mt="sm"
                required
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="sm">
            <Button size="sm" type="submit">
              Save
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default AddUser;
