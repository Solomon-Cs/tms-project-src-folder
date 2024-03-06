import {
  Box,
  Button,
  Group,
  NativeSelect,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Radio } from "@mantine/core";

import React, { useEffect, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import {
  useUpdateUserMutation,
  useGetUserQuery,
} from "../../Redux/features/usersApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUser = ({ userId, onCloseModal }) => {
  const { data, error } = useGetUserQuery(userId);
  const [updateUser] = useUpdateUserMutation(userId);
  const [editmode, setEditmode] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    jopTitle: "",
    isAdmin: "",
  });

  const { name, email, phoneNumber, jopTitle, isAdmin } = formValue;
  const notifyUpdate = () =>
    toast.success("Sucessfully Updated!", { autoClose: 1000 });

  useEffect(() => {
    if (error && userId) {
      console.log("error has been");
    }
  }, [error]);

  useEffect(() => {
    if (userId) {
      setEditmode(true);
      if (data) {
        setFormValue({ ...data });
      }
    } else {
      setEditmode(false);
      setFormValue({});
    }
  }, [userId, data]);

  const handleInputValue = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(formValue);
    notifyUpdate();
    onCloseModal();
  };

  return (
    <div>
      <Box maw={340} mx="auto">
        <h4 className="mt-0">Edit Developer Profile </h4>
        <form onSubmit={handleSubmit}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Developer Name"
            size="sm"
            mt="sm"
            name="name"
            value={name}
            onChange={handleInputValue}
            required
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Email"
            size="sm"
            mt="sm"
            name="email"
            value={email}
            onChange={handleInputValue}
            required
          />
          <TextInput
            withAsterisk
            label="Phone Number"
            placeholder="Phone Number"
            size="sm"
            mt="sm"
            name="phone"
            value={phoneNumber}
            onChange={handleInputValue}
            required
          />

          <NativeSelect
            mt="sm"
            label="Job Title"
            rightSection={<IconChevronDown style={{ width: 16, height: 16 }} />}
            name="jobTitle"
            value={jopTitle}
            onChange={handleInputValue}
            required
          >
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer </option>
            <option value="Full Stack Developer">Full Stack Developer </option>
          </NativeSelect>
          <Radio.Group
            label="Is Admin?"
            mt="sm"
            withAsterisk
            name="isAdmin"
            value={isAdmin}
          >
            <Group mt="xs">
              <Radio value="Yes" label="Yes" onChange={handleInputValue} />
              <Radio value="No" label="No" onChange={handleInputValue} />
            </Group>
          </Radio.Group>

          <Group justify="flex-end" mt="0px">
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default UpdateUser;
