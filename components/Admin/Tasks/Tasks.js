import {
  Button,
  CloseButton,
  Grid,
  Box,
  Input,
  Group,
  Card,
  Divider,
  Text,
  Badge,
  Modal,
  NativeSelect,
  Table,
  Loader,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconEdit } from "@tabler/icons-react";

import { IconSearch, IconChevronDown } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTask from "./AddTask";
import UpdateTask from "./UpdateTask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useDeleteTaskMutation,
  useGetTasksListQuery,
  useGetUserProjectCountQuery,
  useGetUserProjectQuery,
} from "../../Redux/features/taskApi";
import { useGetProjectListQuery } from "../../Redux/features/projectApi";
import { setSearch } from "../../Redux/SearchSlice/SearchSlice";
import { setFilters } from "../../Redux/FilterSlice/FilterSlice";

const Tasks = () => {
  const [value, setValue] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const search = useSelector((state) => state.search);
  const filters = useSelector((state) => state.filters);

  const handleCloseModal = () => {
    setOpen1(false);
    setOpen2(false);
  };
  const [deleteTask] = useDeleteTaskMutation();
  const [projectId, setProjectId] = useState();
  const [isClicked, setIsClicked] = useState(false);

  const { data: selectProjectTask } = useGetUserProjectQuery(projectId);
  const handleClickProject = (projectId) => {
    setProjectId(projectId);
    setIsClicked(!isClicked);
  };

  // console.log(isClicked);

  const handleDelete = async (taskId, taskTitle) => {
    if (window.confirm("Would you like to delete " + taskTitle + "?")) {
      try {
        await deleteTask(taskId);
        console.log("Task deleted successfully");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };
  const [taskId, setTaskId] = useState("");

  const handleEdit = (taskid) => {
    setTaskId(taskid);
    setOpen2(true);
  };

  // redux toolkit RTK query for fetch data from api

  const dispatch = useDispatch();
  const { data: tasksData, isLoading, isError } = useGetTasksListQuery();
  const { data: projectsData } = useGetProjectListQuery();

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (isError) {
    return <div>Error occurred while fetching tasks.</div>;
  }

  return (
    <div>
      <ToastContainer
        style={{ width: "300px", height: "80px" }}
        position="bottom-right"
        autoClose={1700}
        closeButton={false}
      />
      <Grid>
        <Grid.Col span={3} h={"1000px"}>
          <Box sx={{ height: "100%" }}>
            {/* Left Side Content */}
            <div>
              <Button
                onClick={() => setOpen1(true)}
                w={110}
                mt="md"
                mb="md"
                variant="outline"
              >
                Add Task
              </Button>
            </div>
            <Divider />
            <div className="mt-6">
              <Table
                striped
                highlightOnHover
                style={{ red: "red" }}
                withColumnBorders
                verticalSpacing="lg"
              >
                {projectsData?.map((project) => (
                  <Table.Tr>
                    <Table.Th
                      onClick={() => handleClickProject(project.id)}
                      className="text-left cursor-pointer"
                    >
                      {project.title}
                    </Table.Th>
                  </Table.Tr>
                ))}
              </Table>
            </div>
          </Box>
        </Grid.Col>

        <Grid.Col span={9} h={700}>
          <Box sx={{ height: "100%" }}>
            {/* Taks head */}
            <div className="flex justify-end gap-x-4">
              <div>
                <NativeSelect
                  withAsterisk
                  rightSection={
                    <IconChevronDown style={{ width: 16, height: 16 }} />
                  }
                  data={["Low", "Medium", "High"]}
                  mt="md"
                  size="md"
                  title="Filter Task By thire Priority"
                  value={filters}
                  onChange={(e) => dispatch(setFilters(e.target.value))}
                />
              </div>
              <div>
                <Input
                  mt="md"
                  leftSection={<IconSearch size={18} />}
                  title="Search here by Task Title"
                  size="md"
                  mb="md"
                  w={350}
                  placeholder="Search....."
                  required
                  name="name"
                  value={search}
                  onChange={(e) => dispatch(setSearch(e.target.value))}
                  rightSectionPointerEvents="all"
                  rightSection={
                    <CloseButton
                      aria-label="Clear input"
                      onClick={() => dispatch(setSearch(""))}
                      style={{ display: search ? undefined : "none" }}
                    />
                  }
                />
              </div>
            </div>
            <Divider />

            {/* Task body */}

            {isClicked && (
              <div className="mt-6 ">
                {selectProjectTask?.map((task) => (
                  <div className="mt-6 ">
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                      <Group justify="space-between" mt="md" mb="xs">
                        <div className="text-blue-600/100 ">
                          <p className="indent-3  text-[20px]">
                            {"Title : "}
                            {task.title}{" "}
                          </p>
                        </div>
                        <div className="flex gap-x-4">
                          <div className="mt-2">
                            <Text c="dimmed" fw={300}>
                              Priority: {task.priority}
                            </Text>
                          </div>
                          <div>
                            <Button
                              variant="default"
                              size="sm"
                              style={{
                                backgroundColor:
                                  task.status === "backlog"
                                    ? "#FF8787"
                                    : task.status === "To do"
                                    ? "#FFE066"
                                    : task.status === "On Doing"
                                    ? "#74C0FC"
                                    : task.status === "Done"
                                    ? "#8CE99A"
                                    : null,
                              }}
                            >
                              Task Status: {task.status}
                            </Button>
                          </div>
                        </div>
                      </Group>

                      <article className="indent-14 text-justify text-wrap">
                        <p
                          className="text-wrap indent-8"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {task.description}
                        </p>
                      </article>
                      <Group justify="flex-end" mt="md" mb="xs">
                        <div>
                          <Text c="dimmed">
                            {" "}
                            Created At: {task.createdAt.slice(0, 10)}{" "}
                          </Text>
                        </div>
                        <div>
                          <Text c="dimmed">
                            {" "}
                            Updated At:{task.updatedAt.slice(0, 10)}
                          </Text>
                        </div>
                        <div className="flex gap-x-4">
                          <div>
                            <Text
                              className="hover:text-lg text-cyan-600 "
                              onClick={() => handleEdit(task.id)}
                            >
                              <IconEdit  />
                            </Text>
                          </div>
                          <div>
                            <Text
                              className="hover:text-lg text-cyan-600 "
                              onClick={() => handleDelete(task.id, task.title)}
                            >
                              <DeleteIcon />
                            </Text>
                          </div>
                        </div>
                      </Group>
                    </Card>
                  </div>
                ))}
              </div>
            )}
            {!isClicked && (
              <div className="mt-6 ">
                {tasksData
                  .filter((item) => {
                    return search.trim() === ""
                      ? true
                      : item.title.toLowerCase().includes(search.toLowerCase());
                  })
                  .filter((item) => {
                    return filters.trim() === ""
                      ? true
                      : item.priority && filters
                          ? item.priority.toLowerCase().includes(filters.toLowerCase())
                          : false;
                  })
                  .map((task) => (
                    <div className="mt-6 ">
                      <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group justify="space-between" mt="md" mb="xs">
                          <div className="text-blue-600/100 ">
                            <p className="indent-3  text-[20px]">
                              {"Title: "}
                              {task.title}{" "}
                            </p>
                          </div>
                          <div className="flex gap-x-4">
                            <div className="mt-2">
                              <Text c="dimmed" fw={300}>
                                Priority: {task.priority}
                              </Text>
                            </div>
                            <div>
                              <Button
                                variant="default"
                                size="sm"
                                style={{
                                  backgroundColor:
                                    task.status === "backlog"
                                      ? "#FF8787"
                                      : task.status === "To do"
                                      ? "#FFE066"
                                      : task.status === "On Doing"
                                      ? "#74C0FC"
                                      : task.status === "Done"
                                      ? "#8CE99A"
                                      : null,
                                }}
                              >
                                Task Status: {task.status}
                              </Button>
                            </div>
                          </div>
                        </Group>
                        <article className="indent-14 text-justify text-wrap">
                          <p
                            className="text-wrap indent-8"
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {task.description}
                          </p>
                        </article>

                        <Group justify="flex-end" mt="md" mb="xs">
                          <div>
                            <Text c="dimmed">
                              {" "}
                              Created At: {task.createdAt.slice(0, 10)}{" "}
                            </Text>
                          </div>
                          <div>
                            <Text c="dimmed">
                              {" "}
                              Updated At:{task.updatedAt.slice(0, 10)}
                            </Text>
                          </div>
                          <div className="flex gap-x-4">
                            <div>
                              <Text
                                className="hover:text-lg text-cyan-600 "
                                onClick={() => handleEdit(task.id)}
                              >
                                <IconEdit />
                              </Text>
                            </div>
                            <div>
                              <Text
                                className="hover:text-lg text-cyan-600 "
                                onClick={() =>
                                  handleDelete(task.id, task.title)
                                }
                              >
                                <DeleteIcon />
                              </Text>
                            </div>
                          </div>
                        </Group>
                      </Card>
                    </div>
                  ))}
              </div>
            )}
          </Box>
        </Grid.Col>
      </Grid>

      <Modal
        opened={open1}
        onClose={handleCloseModal}
        yOffset="11vh"
        size="55%"
      >
        <AddTask onCloseModal={handleCloseModal} />
      </Modal>
      <Modal
        opened={open2}
        onClose={handleCloseModal}
        yOffset="13vh"
        size="55%"
      >
        <UpdateTask taskId={taskId} onCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Tasks;
