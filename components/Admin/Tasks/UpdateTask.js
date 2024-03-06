import {
  Box,
  Button,
  Group,
  NativeSelect,
  TextInput,
  Textarea,
} from "@mantine/core";

import React, { useEffect, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@mantine/core";
import {
  useGetTaskQuery,
  useGetTasksListQuery,
  useUpdateTaskMutation,
} from "../../Redux/features/taskApi";
import { useGetProjectListQuery } from "../../Redux/features/projectApi";
import { useGetUsersListQuery } from "../../Redux/features/usersApi";

const UpdateTask = ({ taskId, onCloseModal }) => {
  const { data } = useGetTaskQuery(taskId);
  const { data: tasksData, isLoading, isError ,error} = useGetTasksListQuery();
  const { data: projectsData } = useGetProjectListQuery();
  const { data: usersData } = useGetUsersListQuery();
  const [updateTask] = useUpdateTaskMutation();


  const [editmode, setEditmode] = useState(false);
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    projectName: "",
    assigneeTo: "",
    priority: "",
    id: taskId,
  });

  const { title, description, projectName, assigneeTo, priority } = formValue;
  const notifyUpdate = () =>
    toast.success("Sucessfully Updated!", { autoClose: 1000 });

  useEffect(() => {
    if (error && taskId) {
      console.log("error has been");
    }
  }, [error]);

  useEffect(() => {
    if (taskId) {
      setEditmode(true);
      if (data) {
        setFormValue({ ...data });
      }
    } else {
      setEditmode(false);
      setFormValue({});
    }
  }, [taskId, data]);

  const handleInputValue = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(formValue);
    notifyUpdate();
    onCloseModal();
  };

  return (
    <div>
      <Box maw={550} mx="auto">
        <h4 className="ml-10 mt-0">Update Project Task  </h4>
        <form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                withAsterisk
                label="Title"
                placeholder="Developer Name"
                size="sm"
                mt="sm"
                name="title"
                value={title}
                onChange={handleInputValue}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NativeSelect
                withAsterisk
                rightSection={
                  <IconChevronDown style={{ width: 16, height: 16 }} />
                }
                label="Project Title"
                data={projectsData?.map((project) => project.title)}
                mt="md"
                minRows={2}
                maxRows={5}
                name="projectName"
                value={projectName}
                onChange={handleInputValue}
                required
              />
            </Grid.Col>
          </Grid>

          <Textarea
            withAsterisk
            label="Description"
            placeholder="description"
            size="sm"
            mt="sm"
            name="description"
            value={description}
            onChange={handleInputValue}
            required
          />

          <Grid>
            <Grid.Col span={6}>
              <NativeSelect
                withAsterisk
                rightSection={
                  <IconChevronDown style={{ width: 16, height: 16 }} />
                }
                label="Assignee To"
                data={usersData?.map((user) => user.name)}
                mt="md"
                name="assigneeTo"
                value={assigneeTo}
                onChange={handleInputValue}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NativeSelect
                rightSection={
                  <IconChevronDown style={{ width: 16, height: 16 }} />
                }
                label="Priority"
                data={["Low", "Medium", "High"]}
                mt="md"
                name="priority"
                value={priority}
                onChange={handleInputValue}
                required
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <NativeSelect
                rightSection={
                  <IconChevronDown style={{ width: 16, height: 16 }} />
                }
                label="Status "
                data={["backlog", "To do", "On Doing", "Done"]}
                mt="md"
                name="status"
                // value={status}
                onChange={handleInputValue}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>

            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="md">
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default UpdateTask;
