import React from "react";
import Navbar from "../Header/Navbar";
import { Text } from "@mantine/core";
import HomeImage from "../../Images/img9.png";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center gap-20 m-24">
        <div className="w-[900px]">
          <img
            src={HomeImage}
            className="h-[300px] w-[1200px] rounded-[16px]"
          />
        </div>
        <div className="w-[1000px]">
          <h2 className="text-center pb-4 text-cyan-600 text-2xl font-bold">
            Task Management System
          </h2>
          <div>
            <Text className="text-justify text-xl " size="md">
              A task management system is a tool or framework used for planning,
              tracking, and coordinating tasks within a team or project.it
              provide users with a high-performing collaboration channel.
              Company employees can be able to exchange necessary information
              related to everyday projects and tasks.
            </Text>
          </div>
        </div>
      </div>

      <div className="pl-48 pr-48 pb-16 pt-0">
        <h1 className="pb-6 text-cyan-600 text-2xl font-bold">About Project</h1>
        <Text className="text-justify text-xl">
          Task management system will provide users with a high-performing
          collaboration channel for Company employees and it enable to exchange
          necessary information related to everyday projects and tasks. This
          feature should be easy to use so that users don’t get confused and can
          use it comfortably. Task tracking When a team is working on and
          planning a large number of tasks, it is essential to track the
          progress of each task. For convenience and comfort, excellent task
          management systems have a task tracking feature. This feature allows
          you to highlight each stage in which the task is, for example, in
          progress and completed. Prioritization board Sometimes it is
          challenging to choose the task that needs to be completed in the first
          place among the many other vital tasks. For this to succeed, the task
          management system should have a prioritization feature. This feature
          will help you complete projects faster and make your team work more
          organized and structured.
        </Text>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
