import { Burger, Header, MediaQuery } from "@mantine/core";
import { Text, ActionIcon } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";

export default function CustomHeader({
  opened,
  colorScheme,
  setOpened,
  toggleColorScheme,
}: {
  opened: boolean;
  colorScheme: string;
  setOpened: (value: ((o: boolean) => boolean) | boolean) => void;
  toggleColorScheme: () => void;
}) {
  return (
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
        <Text>QualSearch Dashboard</Text>
      </div>
      <ActionIcon
        variant="light"
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
  );
}
