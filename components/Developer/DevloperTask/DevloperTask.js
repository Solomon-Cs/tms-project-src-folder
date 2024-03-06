import React, { useState } from "react";
import Navbar from "../Header/Navbar";
import {
  Button,
  Card,
  CloseButton,
  Divider,
  Group,
  Input,
  Modal,
  NativeSelect,
  Text,
} from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconSearch, IconChevronDown } from "@tabler/icons-react";
import { useGetUserTasksQuery } from "../../Redux/features/taskApi";
import { Loader } from "@mantine/core";
import ChangeStatus from "./ChangeStatus";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../Redux/SearchSlice/SearchSlice";
import { setFilters } from "../../Redux/FilterSlice/FilterSlice";

const DevloperTask = () => {
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState("");

  const search = useSelector((state) => state.search);
  const filters = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const handleChange = (id) => {
    setTaskId(id);
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const [value, setValue] = useState("");
  const loginUserName = localStorage.getItem("loginUserName");
  const loginUserid = localStorage.getItem("loginUserid");
  const loginUseremail = localStorage.getItem("loginUseremail");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginUserName");
    localStorage.removeItem("loginUserid");
    localStorage.removeItem("loginUseremail");
    navigate("/");
  };

  //Fetch developer Tasks

  const {
    data: userTasks,
    isLoading,
    isError,
  } = useGetUserTasksQuery(loginUserid);

  if (isLoading) {
    return <Loader color="blue" size="lg" />;
  }
  if (isError) {
    return (
      <div>
        <h4>Network Connection Error....</h4>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        style={{ width: "300px", height: "80px" }}
        position="bottom-right"
        autoClose={1700}
        closeButton={false}
      />
      <Navbar />
      <div className="flex justify-end gap-x-4 mr-24">
        <div>
          <NativeSelect
            withAsterisk
            rightSection={<IconChevronDown style={{ width: 16, height: 16 }} />}
            data={["Low", "Medium", "High"]}
            mt="md"
            size="md"
            name="priorityFilter"
            value={filters}
            onChange={(e) => dispatch(setFilters(e.target.value))}
          />
        </div>
        <div>
          <Input
            mt="md"
            leftSection={<IconSearch size={18} />}
            title="Search name of position"
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

      <div className="flex justify-evenly pl-20 pr-20 gap-8">
        {userTasks
          .filter((item) => {
            return search.trim() === ""
              ? true
              : item.title.toLowerCase().includes(search.toLowerCase());
          })
          .filter((item) => {
            return filters.trim() === ""
              ? true
              : item.priority.toLowerCase().includes(filters.toLowerCase());
          })
          .map((task) => (
            <div className="mt-6 ">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mt="md" mb="xs">
                  <div className="text-blue-600/100 ">
                    <p className="  text-[20px]">
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
                    <div>
                      {" "}
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-sky-600 rounded-md"
                        onClick={() => handleChange(task.id)}
                      >
                        Change Status
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
                </Group>
              </Card>
            </div>
          ))}
      </div>

      <Modal opened={open} onClose={handleCloseModal} yOffset="15vh" size="20%">
        <ChangeStatus taskId={taskId} onCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
};

export default DevloperTask;
