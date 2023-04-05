import { Navbar } from "@mantine/core";
import React from "react";
import SidebarLink from "./SidebarLink";

export default function CustomNavbar({ opened }: { opened: boolean }) {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <SidebarLink title="Home" to="/" />
      <SidebarLink title="Team" to="/team" />
      <SidebarLink title="Profile" to="/profile" />
    </Navbar>
  );
}
