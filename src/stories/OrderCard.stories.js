import React from "react";
import OrderCard from "../components/global/order-card";
import StoryRouter from "storybook-react-router";

export default {
  title: "OrderCard",
  component: OrderCard,
  argTypes: {
    backgroundColor: { control: "color" },
    borderColor: { control: "color" },
  },
  decorators: [StoryRouter()],
};

const Template = (args) => <OrderCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  invoice_id: "222",
  items: [{}],
  total: 22,
  payment_status: "paid",
};
