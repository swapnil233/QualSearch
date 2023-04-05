import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";

import { AppShell } from "@mantine/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import CustomNavbar from "./components/CustomNavbar";
import CustomHeader from "./components/CustomHeader";
import { useState } from "react";
import { IUserProfile } from "./types/IUserProfile";
import Teams from "./scenes/teams";
import Profile from "./scenes/profile";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const [userDetails, setUserDetails] = useState<IUserProfile>({
    id: "",
    createdAt: "",
    updatedAt: "",
    username: "",
    password: "",
    googleId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    role: "",
    email: "",
    displayPic: "",
    verified: false,
  });

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
            navbar={<CustomNavbar opened={opened} />}
            header={
              <CustomHeader
                opened={opened}
                colorScheme={colorScheme}
                setOpened={setOpened}
                toggleColorScheme={toggleColorScheme}
              />
            }
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Teams />} />
              <Route
                path="/profile"
                element={
                  <Profile
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                  />
                }
              />
            </Routes>
          </AppShell>
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
