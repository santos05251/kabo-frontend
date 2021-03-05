import React from "react";
import Input from "../components/global/input";

export default {
  title: "Input",
  component: Input,
  argTypes: {
    backgroundColor: { control: "color" },
    borderColor: { control: "color" },
  },
};

const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  Name: "Example",
  label: "example",
};
