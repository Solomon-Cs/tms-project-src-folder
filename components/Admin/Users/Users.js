import {
  Button,
  CloseButton,
  Card,
  Divider,
  Grid,
  Input,
  Modal,
  Table,
  Group,
  Pagination,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconEdit, IconSearch } from "@tabler/icons-react";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewListIcon from "@mui/icons-material/ViewList";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../../Redux/SearchSlice/SearchSlice";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import ViewUser from "./ViewUser";
import {
  useDeleteUserMutation,
  useGetUsersListQuery,
} from "../../Redux/features/usersApi";

const Users = () => {
  const [userId, setUserId] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleCloseModal1 = () => {
    setOpen1(false);
  };
  const handleCloseModal2 = () => {
    setOpen2(false);
  };
  const handleCloseModal3 = () => {
    setOpen3(false);
  };

  const handleView = (userId) => {
    setUserId(userId);
    setOpen2(true);
  };

  const handleEdit = (userId) => {
    setUserId(userId);
    setOpen3(true);
  };

  // fetch Users list

  const [deleteUser] = useDeleteUserMutation();
  const handleDelete = async (userId, userName) => {
    if (window.confirm("Would you like to delete " + userName + "?")) {
      try {
        await deleteUser(userId);
        console.log("user deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  //Sorting for user lust by name
  const { data: usersData } = useGetUsersListQuery();
  const usersArray = Array.isArray(usersData) ? usersData : [];

  // Sorting for user list by name
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("ASC");

  let sortedItems = [...usersArray];

  if (sortColumn === "name") {
    sortedItems.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
    if (sortOrder === "DESC") {
      sortedItems.reverse();
    }
  }

  const Sorting = (col) => {
    if (sortColumn === col) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortColumn(col);
      setSortOrder("ASC");
    }
  };

  // Add pagination for table
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const paginatedItems = sortedItems.slice(firstIndex, lastIndex);
  const numPages = Math.ceil(sortedItems.length / recordsPerPage);
  const pageNumbers = [...Array(numPages + 1).keys()].slice(1);

  const perPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (n) => {
    setCurrentPage(n);
  };

  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
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
            Add Developer
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
                <Table.Th
                  onClick={() =>
                    Sorting(
                      sortColumn === "name" && sortOrder === "ASC"
                        ? "name"
                        : "name"
                    )
                  }
                  style={{ cursor: "pointer" }}
                  title="Sort Name by ASC or DSC"
                >
                  Developer Name
                  <ArrowUpwardIcon style={{ width: "15px", height: "15px" }} />
                  <ArrowDownwardIcon
                    style={{ width: "15px", height: "15px" }}
                  />
                </Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Job Title</Table.Th>
                <Table.Th>
                  <p className="text-end">Action</p>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedItems
                .filter((item) => {
                  return search.trim() === ""
                    ? true
                    : item.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((user, index) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>{firstIndex + index + 1}</Table.Td>
                    <Table.Td>
                      <p className="text-justify">{user.name}</p>
                    </Table.Td>
                    <Table.Td>
                      <p className="text-justify">{user.email}</p>
                    </Table.Td>
                    <Table.Td>
                      <p className="text-justify">{user.isAdmin}</p>
                    </Table.Td>
                    <Table.Td>
                      <p className="text-justify">{user.jobTitle}</p>
                    </Table.Td>
                    <Table.Td>
                      <Group justify="center">
                        <Button
                          onClick={() => handleView(user.id)}
                          variant="outline"
                        >
                          <ViewListIcon />
                        </Button>
                        <Button
                          onClick={() => handleEdit(user.id)}
                          variant="outline"
                        >
                          <IconEdit />
                        </Button>
                        <Button
                          onClick={() => handleDelete(user.id, user.name)}
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

        {/* Pagination For the table */}
        <div>
          <ul
            className="pagination"
            style={{
              listStyle: "none",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <li>
              <Button onClick={perPage} m={"md"} title="Prev">
                <KeyboardArrowLeftIcon />
              </Button>
            </li>
            {pageNumbers.map((n, i) => (
              <li>
                <Button
                  onClick={() => changePage(n)}
                  variant={currentPage === n ? "filled" : "outline"}
                  m={"md"}
                  mr={"sm"}
                  key={i}
                >
                  {n}
                </Button>
              </li>
            ))}
            <li>
              <Button onClick={nextPage} m={"md"} Title="Next">
                <KeyboardArrowRightIcon />
              </Button>
            </li>
          </ul>
        </div>
      </Card>

      <Modal
        opened={open1}
        onClose={handleCloseModal1}
        size="50%"
        yOffset="11vh"
      >
        <AddUser onCloseModal={handleCloseModal1} />
      </Modal>

      <Modal opened={open2} onClose={handleCloseModal2} yOffset="13vh">
        <ViewUser userId={userId} onCloseModal={handleCloseModal2} />
      </Modal>

      <Modal opened={open3} onClose={handleCloseModal3} yOffset="12vh">
        <UpdateUser userId={userId} onCloseModal={handleCloseModal3} />
      </Modal>
    </div>
  );
};

export default Users;
