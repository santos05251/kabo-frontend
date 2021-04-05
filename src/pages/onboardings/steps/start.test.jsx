import React from "react";
import Enzyme, { shallow  } from "enzyme";
import StartStep from "./start"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import store from '../../../store'
import { enableMocks } from 'jest-fetch-mock';

const domain = process.env.REACT_APP_API_DOMAIN;
const trackEndpoint = domain + "/track"

Enzyme.configure({ adapter: new Adapter() });

enableMocks();

describe("Start step", () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<StartStep store={store}/>).dive().dive();
  })

  test("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("has an add-dog element", () => {
    expect(wrapper.find(".add-dog")).toHaveLength(1)
  });

  test("fires the Add Another Dog Clicked event when a user clicks the add-dog element", () => {
    wrapper.find(".add-dog").simulate("click");
    expect(fetch.mock.calls).toContainEqual([trackEndpoint, expect.anything()])
    fetch.mock.calls.forEach(call => {
      if(call[0] == trackEndpoint){
        const body = JSON.parse(call[1]['body'])
        expect(body).toMatchObject({
          "type": "track",
          "arguments": expect.objectContaining({
            "event": "Add Another Dog Clicked"
          })
        })
      }
    })
  });
})