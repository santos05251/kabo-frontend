import React from "react";
import Checkbox from "../components/global/Checkbox";

export default {
  title: "CheckBox",
  component: Checkbox,
  argTypes: {
    backgroundColor: { control: "color" },
    borderColor: { control: "color" },
  },
};

const Template = (args) => <Checkbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Check",
};
