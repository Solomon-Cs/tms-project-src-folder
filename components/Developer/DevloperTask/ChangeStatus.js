import {
  Box,
  Button,
  Group,
  Loader,
  NativeSelect,
  TextInput,
  Textarea,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { IconChevronDown } from "@tabler/icons-react";

import {
  useAddTaskMutation,
  useGetTaskQuery,
  useGetTasksListQuery,
  useUpdateTaskMutation,
} from "../../Redux/features/taskApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@mantine/core";

const ChangeStatus = ({ taskId, onCloseModal }) => {
  const { data } = useGetTaskQuery(taskId);
  const { data: tasksData, isLoading, isError, error } = useGetTasksListQuery();
  const [updateTask] = useUpdateTaskMutation();

  const [editmode, setEditmode] = useState(false);
  const [formValue, setFormValue] = useState({
    status: "",
    id: taskId,
  });

  const notifyUpdate = () =>
    toast.success("Sucessfully Change Status!", { autoClose: 1000 });

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(formValue);
    notifyUpdate();
    onCloseModal();
  };

  return (
    <div>
      <Box maw={300} mx="auto">
        <h4>Change Status </h4>
        <form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Col span={12}>
            <NativeSelect
                rightSection={
                  <IconChevronDown style={{ width: 16, height: 16 }} />
                }
                label="Status "
                data={["backlog", "To do", "On Doing", "Done"]}
                mt="md"
                name="status"
                onChange={handleInputValue}
                required
              />
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

export default ChangeStatus;
