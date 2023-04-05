import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  FileInput,
} from "@mantine/core";

import { IconUpload } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: "900px",
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `10px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: "900px",
    maxWidth: "450px",
    paddingTop: "80px",

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function Register() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome to QualSearch
        </Title>
        <TextInput label="First name" placeholder="John" size="md" />
        <TextInput
          label="Middle name (optional)"
          required={false}
          placeholder=""
          size="md"
          mt="md"
        />
        <TextInput label="Last name" placeholder="Doe" size="md" mt="md" />
        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          mt="md"
        />
        <TextInput label="Username" placeholder="" size="md" mt="md" />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <FileInput
          label="Display picture"
          mt={"md"}
          placeholder="Upload a .jpg or .png file"
          icon={<IconUpload size={"14px"} />}
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md">
          Login
        </Button>

        <Text ta="center" mt="md">
          Already have an account?{" "}
          <Anchor<"a">
            href="/login"
            weight={700}
            onClick={(event) => event.preventDefault()}
          >
            Log In
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
