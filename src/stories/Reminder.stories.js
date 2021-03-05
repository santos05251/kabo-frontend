import React from "react";
import Reminder from "../components/global/reminder";

export default {
  title: "Reminder",
  component: Reminder,
  argTypes: {
    backgroundColor: { control: "color" },
    borderColor: { control: "color" },
  },
};

const Template = (args) => <Reminder {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  content: "Example",
};
