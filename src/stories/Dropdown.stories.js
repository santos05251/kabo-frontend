import React from "react";
import Dropdown from "../components/global/dropdown";

export default {
  title: "Dropdown",
  component: DropDown,
  argTypes: {
    backgroundColor: { control: "color" },
    borderColor: { control: "color" },
  },
};

const Template = (args) => <Dropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Dropdown",
};
