import React, { useState } from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";

import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  ActionIcon,
} from "@mantine/core";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { IconSun, IconMoonStars } from "@tabler/icons";
import { UsersTable } from "./components/UsersTable";
import usersData from "./data/mockData";
import Dashboard from "./scenes/dashboard";
import SidebarLink from "./components/SidebarLink";
const data = usersData.data;

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  // Toggle color scheme
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  // Open and close sidebar
  const [opened, setOpened] = useState(false);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Router>
          <AppShell
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
              <Navbar
                p="md"
                hiddenBreakpoint="sm"
                hidden={!opened}
                width={{ sm: 200, lg: 300 }}
              >
                <SidebarLink title="Home" to="/" />
                <SidebarLink title="Team" to="/team" />
              </Navbar>
            }
            header={
              <Header
                height={{ base: 50, md: 70 }}
                p="md"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      mr="xl"
                    />
                  </MediaQuery>
                  <Text>Application header</Text>
                </div>
                <ActionIcon
                  variant="outline"
                  color={colorScheme === "dark" ? "yellow" : "blue"}
                  onClick={() => toggleColorScheme()}
                  title="Toggle color scheme"
                >
                  {colorScheme === "dark" ? (
                    <IconSun size={18} />
                  ) : (
                    <IconMoonStars size={18} />
                  )}
                </ActionIcon>
              </Header>
            }
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<UsersTable data={data} />} />
            </Routes>
          </AppShell>
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
