import React from "react";
import {
  Box,
  Button,
  Group,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Radio } from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddProject = ({ onCloseModal }) => {
  const schema = Yup.object().shape({
    title: Yup.string().min(3, "Name should have at least 3 letters"),
    description: Yup.string().min(3, "Name should have at least 3 letters"),
    isActive: Yup.string().required("Select Gender pleace"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      isActive: "",
    },
  });

  const notifyAdd = () =>
    toast.success("Sucessfully Save user!", { autoClose: 1000 });

  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: "https://task-management-opll.onrender.com/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/projects/create-project", {
        title: data.title,
        description: data.description,
        isActive: data.isActive === "true", // Convert string value to boolean
      });

      if (response.status === 201) {
        console.log("Project created successfully");
        notifyAdd();
        onCloseModal();
        console.log(data);
      } else {
        console.log("Failed to create project");
      }
    } catch (error) {
      console.error("An error occurred while creating project:", error);
    }
  };

  return (
    <div>
      <Box maw={340} mx="auto">
        <h4 className="mt-0">Add New Developer</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="Project Title"
            size="sm"
            mt="sm"
            title="Enter Project Title"
            required
            {...register("title")}
          />
          {errors.title && (
            <span style={{ color: "red" }}>** {errors.title.message}</span>
          )}

          <Textarea
            withAsterisk
            label="Description"
            placeholder="Description"
            size="sm"
            mt="md"
            minRows={2}
            maxRows={5}
            required
            title="Enter Project Description"
            {...register("description")}
          />
          {errors.description && (
            <span style={{ color: "red" }}>
              ** {errors.description.message}
            </span>
          )}

          <Radio.Group
            label="Is Active? "
            mt="sm"
            withAsterisk
            required
            title="Select whither Project Is Acrive"
          >
            <Group mt="sm">
              <Radio
                value="true"
                label="Yes"
                {...register("isActive", { required: true })}
              />
              <Radio
                value="false"
                label="No"
                {...register("isActive", { required: true })}
              />
            </Group>
          </Radio.Group>

          {errors.isActive && (
            <span style={{ color: "red" }}>** {errors.isActive.message} </span>
          )}

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

export default AddProject;
