import {
  Box,
  Table,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import axios from "axios";


const Detail = ({ projectId }) => {
  const token = localStorage.getItem("token");

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    isActive: false,
    createdAt: "",
    updatedAt: "",
  });

  const fetchProjectData = async () => {
    try {
      const projectResponse = await axios.get(
        `https://task-management-opll.onrender.com/api/projects/get-project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Project is fetched successfully");
      const responseData = projectResponse.data;
      console.log(responseData);
      setProjectData(responseData);
    } catch (error) {
      console.error("An error occurred while fetching project data:", error);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  return (
    <div>
      <Box maw={340} mx="auto">
        <h4>Project Detail Explanation</h4>
        <Table striped highlightOnHover withColumnBorders verticalSpacing="lg">
          <Table.Tr>
            <Table.Th>Project Title:</Table.Th>
            <Table.Td> {projectData.title} </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Project Discription:</Table.Th>
            <Table.Td>{projectData.description}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Is Active:</Table.Th>
            <Table.Td>{projectData.isActive ? "Yes" : "No"} </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Create At:</Table.Th>
            <Table.Td>{projectData.createdAt}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Updated At:</Table.Th>
            <Table.Td>{projectData.updatedAt}</Table.Td>
          </Table.Tr>
        </Table>
      </Box>
    </div>
  );
};

export default Detail;
