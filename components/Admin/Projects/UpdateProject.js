import {
  Box,
  Button,
  Group,
  NativeSelect,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Radio } from "@mantine/core";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { set } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUpdateProjectMutation } from "../../Redux/features/projectApi";
import { boolean } from "yup";

const UpdateProject = ({ projectId, onCloseModal }) => {
  const [updateProject] = useUpdateProjectMutation();
  const [editmode, setEditmode] = useState(false);
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    isActive: "",
  });

  const { title, description, isActive } = formValue;
  const notifyUpdate = () =>
    toast.success("Sucessfully Updated!", { autoClose: 1000 });

  const handleInputValue = (e) => {
    let { name, value } = e.target;
    if (name === "isActive") {
      value = value === "true"; // Convert the string value to a boolean
    }
    setFormValue({ ...formValue, [name]: value });
  };
  const token = localStorage.getItem("token");

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
      // console.log("Project is fetched successfully");
      const responseData = projectResponse.data;
      // console.log(responseData);
      setFormValue(responseData);
    } catch (error) {
      console.error("An error occurred while fetching project data:", error);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  const api = axios.create({
    baseURL: "https://task-management-opll.onrender.com/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(formValue);

  const handleSubmit = async (e) => {
    console.log(formValue);
    e.preventDefault();
    await updateProject(formValue);
    notifyUpdate();
    onCloseModal();
  };

  return (
    <div>
      <Box maw={340} mx="auto">
        <h4 className="mt-0">Update Project </h4>
        <form onSubmit={handleSubmit}>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="Project Title"
            size="sm"
            mt="sm"
            name="title"
            value={title}
            onChange={handleInputValue}
            required
          />
          <Textarea
            withAsterisk
            label="Description"
            placeholder="description"
            size="sm"
            mt="md"
            minRows={2}
            maxRows={5}
            name="description"
            value={description}
            onChange={handleInputValue}
            required
          />

          <Radio.Group
            name="isActive"
            label="Is Active?"
            mt="sm"
            withAsterisk
            required
            title="Select whether Project Is Active"
          >
            <Group mt="sm">
              <Radio
                value={true}
                checked={isActive === true}
                label="Yes"
                name="isActive"
                onChange={() => handleInputValue("isActive", true)}
              />
              <Radio
                value={false}
                checked={isActive === false}
                label="No"
                name="isActive"
                onChange={() => handleInputValue("isActive", false)}
              />
            </Group>
          </Radio.Group>

          {/* <Radio.Group
            label="Is Active?"
            mt="sm"
            withAsterisk
            name="isActive"
            value={isActive}
          >
            <Group mt="xs">
              <Radio value="true" label="Yes" onChange={handleInputValue} />
              <Radio value="false" label="No" onChange={handleInputValue} />
            </Group>
          </Radio.Group> */}

          <Group justify="flex-end" mt="0px">
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default UpdateProject;
