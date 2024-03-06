import { Divider, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  CloseButton,
  Input,
  Paper,
  Table,
  Card,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { randomId } from "@mantine/hooks";
import { Pagination, Text } from "@mantine/core";
import axios from "axios";
import AddProject from "./AddProject";

import { IconEdit, IconSearch } from "@tabler/icons-react";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewListIcon from "@mui/icons-material/ViewList";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import Detail from "./Detail";
import UpdateProject from "./UpdateProject";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useDeleteProjectMutation,
  useGetProjectListQuery,
} from "../../Redux/features/projectApi";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../Redux/SearchSlice/SearchSlice";

const Projects = () => {
  const [value, setValue] = useState("");

  const [projectId, setProjectId] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleCloseModal1 = () => {
    setOpen1(false);
  };
  const handleCloseModal2 = () => {
    setOpen2(false);
  };
  const handleCloseModal3 = () => {
    setOpen3(false);
  };

  const token = localStorage.getItem("token");
  const [isActive1, setIsActive1] = useState(false);

  const [deleteProject] = useDeleteProjectMutation();

  const handleDelete = async (projectId, projectTitle) => {
    if (window.confirm("Would you like to delete " + projectTitle + "?")) {
      try {
        await deleteProject(projectId);
        // console.log("Task deleted successfully");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  // Fetch Project List

  const { data: projectsData, isLoading, isError } = useGetProjectListQuery();

  // const [projectsData, setProjectData] = useState([]);
  // const fetchProjectData = async () => {
  //   try {
  //     const projectResponse = await axios.get(
  //       "https://task-management-opll.onrender.com/api/projects/get-projects",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Pass the JWT token in the Authorization header
  //         },
  //       }
  //     );
  //     console.log("Projects fetched successfully");
  //     const responseData = projectResponse.data;
  //     const projects = responseData.data;
  //     setProjectData(projects);
  //   } catch (error) {
  //     console.error("An error occurred while fetching project data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProjectData();
  // }, []);

  let no = 1;
  const handleView = (projectId) => {
    setProjectId(projectId);
    setOpen2(true);
  };

  const handleEdit = (projectId) => {
    setProjectId(projectId);
    setOpen3(true);
  };

  return (
    <div>
      <ToastContainer
        style={{ width: "300px", height: "80px" }}
        position="bottom-right"
        autoClose={1700}
        closeButton={false}
      />
      <div className="flex justify-between mb-3">
        <div>
          <Button
            variant="outline"
            className="ml-16"
            mt="md"
            size="md"
            onClick={() => setOpen1(true)}
          >
            Add Project
          </Button>
        </div>
        <div className="flex justify-end gap-x-4">
          <div>
            <Input
              mt="md"
              leftSection={<IconSearch size={18} />}
              title="Search name of position"
              size="md"
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
      </div>
      <Divider />

      <Card shadow="sm" padding="lg" radius="md" mt="md" withBorder>
        <div className="flex justify-center">
          <Table
            className="table-auto"
            style={{
              width: "1200px",
              margin: "10 auto",
              borderRadius: "40px",
              paddingTop: "20px",
            }}
            stickyHeaderOffset={60}
            horizontalSpacing="sm"
            verticalSpacing="sm"
            borderRadius="50px"
            mt="md"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>NO. </Table.Th>
                <Table.Th>Project Title</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Is Active</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {projectsData?.filter((item) => {
                  return search.trim() === ""
                    ? true
                    : item.title.toLowerCase().includes(search.toLowerCase());
                }).map((project) => (
                  <Table.Tr key={project.id}>
                    <Table.Td>{no++}</Table.Td>
                    <Table.Td>
                      <p className="text-justify">
                        {project.title.slice(0, 30)}
                      </p>
                    </Table.Td>
                    <Table.Td>
                      <p className="text-justify">
                        {project.description.slice(0, 40)}...
                      </p>
                    </Table.Td>
                    <Table.Td>
                      <p className="text-justify">
                        {project.isActive ? "Yes" : "No"}
                      </p>
                    </Table.Td>
                    <Table.Td>
                      <Group justify="center">
                        <Button
                          onClick={() => handleView(project.id)}
                          variant="outline"
                        >
                          <ViewListIcon />
                        </Button>
                        <Button
                          onClick={() => handleEdit(project.id)}
                          variant="outline"
                        >
                          <IconEdit />
                        </Button>
                        <Button
                          onClick={() =>
                            handleDelete(project.id, project.title)
                          }
                          className=""
                          variant="outline"
                        >
                          <DeleteIcon />
                        </Button>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
            </Table.Tbody>
          </Table>
        </div>
      </Card>

      <Modal
        opened={open1}
        onClose={handleCloseModal1}
        yOffset="12vh"
        // xOffset= "0hv"
      >
        <AddProject projectId={projectId} onCloseModal={handleCloseModal1} />
      </Modal>

      <Modal opened={open2} onClose={handleCloseModal2} yOffset="13vh">
        <Detail projectId={projectId} onCloseModal={handleCloseModal3} />
      </Modal>
      <Modal opened={open3} onClose={handleCloseModal3} yOffset="13vh">
        <UpdateProject projectId={projectId} onCloseModal={handleCloseModal3} />
      </Modal>
    </div>
  );
};

export default Projects;
