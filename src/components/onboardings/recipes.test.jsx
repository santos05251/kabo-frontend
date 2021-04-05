import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

import RecipesStep from './recipes';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import store from '../../store';

const domain = process.env.REACT_APP_API_DOMAIN;
const trackEndpoint = domain + '/track';

Enzyme.configure({ adapter: new Adapter() });

describe('Recipes step', () => {
  let wrapper;

  beforeEach(() => {
    fetch.resetMocks();
    const cookedRecipes = [
      {
        name: 'Tender Chicken',
        recipe: 'chicken',
        image_url: 'https://storage.googleapis.com/kabo-app/chicken.png',
        description:
          'A lean protein diet with hearty grains. Made with Canadian-sourced chicken.',
        new: false,
        analysis: [
          ['Protein', '11% min'],
          ['Fat', '1% min'],
          ['Fiber', '0.5% max'],
          ['Moisture', '77% max'],
          ['Calorie Content', '1077 kcal/kg'],
        ],
      },
    ];
    const kibbleRecipes = [
      {
        name: 'Turkey Salmon',
        recipe: 'turkey+salmon',
        image_url: 'https://storage.googleapis.com/kabo-app/kibble.png',
        description:
          'Locally-sourced dry dog food, made with high quality ingredients you can trust.',
        new: false,
        analysis: [
          ['Protein', '24% min'],
          ['Fat', '12% min'],
          ['Fiber', '4.0% max'],
          ['Moisture', '10.0% max'],
          ['Calorie Content', '3440 kcal/kg'],
        ],
        ingredients: 'Turkey, Salmon, Chickpeas, Faba beans',
      },
    ];
    const props = {
      cookedRecipes: [],
      kibbleRecipes: ['turkey+salmon'],
      handleSelectedKibbleRecipe: jest.fn(),
      handleSelectedCookedRecipes: jest.fn(),
    };
    fetch.mockResponse((input) => {
      if (input.url.indexOf('api/v1/onboarding/recipes') >= 0) {
        return Promise.resolve(
          JSON.stringify({
            cooked_recipes: cookedRecipes,
            kibble_recipes: kibbleRecipes,
          })
        );
      }
      return Promise.resolve({});
    });
    wrapper = mount(<RecipesStep store={store} {...props} />);
  });

  test('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('contains Select recipes', () => {
    expect(wrapper.find('.text-3xl').text().includes('Select recipes')).toBe(
      true
    );
  });

  test('fires Add Recipe Clicked event when a user clicks the select element', () => {
    const btnAddRecipe = wrapper.findWhere(
      (n) => n.type() == 'button' && n.text() == 'Add Recipe'
    );
    btnAddRecipe.simulate('click');
    expect(fetch.mock.calls).toContainEqual([trackEndpoint, expect.anything()]);
    fetch.mock.calls.forEach((call) => {
      if (call[0] == trackEndpoint) {
        const body = JSON.parse(call[1]['body']);
        expect(body).toMatchObject({
          type: 'track',
          arguments: expect.objectContaining({
            event: 'Add Recipe Clicked',
            properties: { recipe_name: 'Tender Chicken' },
          }),
        });
      }
    });
  });

  test('fires Remove Recipe Clicked event when a user clicks the select element', () => {
    const btnRemoveecipe = wrapper.findWhere(
      (n) => n.type() == 'button' && n.text() == 'Remove Recipe'
    );
    btnRemoveecipe.simulate('click');
    expect(fetch.mock.calls).toContainEqual([trackEndpoint, expect.anything()]);
    fetch.mock.calls.forEach((call) => {
      if (call[0] == trackEndpoint) {
        const body = JSON.parse(call[1]['body']);
        expect(body).toMatchObject({
          type: 'track',
          arguments: expect.objectContaining({
            event: 'Remove Recipe Clicked',
            properties: { recipe_name: 'Turkey Salmon' },
          }),
        });
      }
    });
  });
});