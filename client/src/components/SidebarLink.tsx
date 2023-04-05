import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
interface SidebarLinkProps {
  to: string;
  title: string;
}

export default function SidebarLink({ to, title }: SidebarLinkProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text component={Link} variant="link" to={to}>
        {title}
      </Text>
    </div>
  );
}
