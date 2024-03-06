import {
  Box,
  Button,
  Group,
  NativeSelect,
  TextInput,
  Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  useAddTaskMutation,
  } from "../../Redux/features/taskApi";
import { useGetProjectListQuery } from "../../Redux/features/projectApi";
import { useGetUsersListQuery } from "../../Redux/features/usersApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@mantine/core";

const AddTask = ({ onCloseModal }) => {
  const [addTask] = useAddTaskMutation();

  const schema = Yup.object().shape({
    title: Yup.string().min(5, "Name should have at least 5 letters"),
    projectId: Yup.string().required("Project Name should be selected"),
    description: Yup.string().min(
      10,
      "description should have at least 10 letters"
    ),
    status: Yup.string().required("You should be selecte status "),
    assigneeId: Yup.string().required("You should be selecte Assignee "),
    priority: Yup.string().required("You should be selecte priority "),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      projectId: "",
      description: "",
      status:"",
      assigneeId: "",
      priority:""
    },
  });

  const notifyAdd = () =>
    toast.success("Sucessfully add Task !", { autoClose: 1000 });

  // redux toolkit RTK query for Fetch data from api
  const { data: projectsData, isLoading, isError } = useGetProjectListQuery();
  const { data: usersData } = useGetUsersListQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error occurred while fetching tasks.</div>;
  }

  const onSubmit = async (data) => {
    await addTask(data);
    notifyAdd();
    onCloseModal();
    console.log(data);
  };

  return (
    <div>
      <Box maw={550} mx="auto">
        <h4>Add New Task</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                label="Title"
                placeholder="Position Name"
                title="Enter Task Title"
                size="sm"
                mt="lg"
                required
                {...register("title")}
              />
              {errors.title && (
                <span style={{ color: "red" }}>** {errors.title.message}</span>
              )}
            </Grid.Col>
            <Grid.Col span={6}>
              <NativeSelect
                withAsterisk
                rightSection={
                  <IconChevronDown style={{ width: 16, height: 16 }} />
                }
                label="Project Title"
                title="Select Project id that task is exist"
                data={projectsData?.map((project) => ({
                  value: project.id,
                  label: project.title,
                }))}
                mt="md"
                {...register("projectId")}
              />
            </Grid.Col>
          </Grid>

          <Textarea
            withAsterisk
            label="Description"
            placeholder="Task Description"
            autosize
            mt="md"
            minRows={2}
            maxRows={5}
            required
            title="Enter Task Description"
            {...register("description")}
          />
          {errors.description && (
            <span style={{ color: "red" }}>
              ** {errors.description.message}
            </span>
          )}

          <Grid>
            <Grid.Col span={6}>
              <NativeSelect
                withAsterisk
                rightSection={
                  <IconChevronDown style={{ width: 16, height: 16 }} />
                }
                label="Assignee To"
                title="Select Task Worker"
                data={usersData?.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                mt="md"
                {...register("assigneeId")}
              />

            </Grid.Col>
            <Grid.Col span={6}>
              <NativeSelect
                rightSection={
                  <IconChevronDown style={{ width: 16, height: 16 }} />
                }
                label="Priority"
                title="Select Task priority"
                data={["Low", "Medium", "High"]}
                mt="md"
                {...register("priority")}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <NativeSelect
                rightSection={
                  <IconChevronDown style={{ width: 16, height: 16 }} />
                }
                label="Status"
                title="Select Task Status"
                data={["backlog", "To do", "On Doing", "Done"]}
                mt="md"
                {...register("status")}
              />
            </Grid.Col>
            <Grid.Col span={6}></Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="md">
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default AddTask;
