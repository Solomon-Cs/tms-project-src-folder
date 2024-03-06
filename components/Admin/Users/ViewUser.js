import {
  Group,
  Box,
  Input,
  TextInput,
  Textarea,
  Button,
  Table,
} from "@mantine/core";
import React from "react";
import { useGetUserQuery } from "../../Redux/features/usersApi";

const ViewUser = ({ userId }) => {
  const { data, error } = useGetUserQuery(userId);

  return (
    <div>
      <Box maw={340} mx="auto">
        <h4 className="ml-16">Developer Profile </h4>
        <Table striped highlightOnHover withColumnBorders verticalSpacing="sm">
          <Table.Tr>
            <Table.Th>Name:</Table.Th>
            <Table.Td> {data && data.name} </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Gender:</Table.Th>
            <Table.Td> {data && data.gender} </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Email:</Table.Th>
            <Table.Td>{data && data.email} </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Phone :</Table.Th>
            <Table.Td>{data && data.phoneNumber} </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Job Title:</Table.Th>
            <Table.Td>{data && data.jobTitle} </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Create At:</Table.Th>
            <Table.Td>{data && data.createdAt} </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Updated At:</Table.Th>
            <Table.Td>{data && data.updatedAt} </Table.Td>
          </Table.Tr>
        </Table>
      </Box>
    </div>
  );
};

export default ViewUser;
