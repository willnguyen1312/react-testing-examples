// highlight{10-14,31-33}
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { mount } from 'enzyme';
import { UserWithRouter } from 'shared/components/UserWithRouter';

// Hoist helper functions (but not vars) to reuse between test cases
const getWrapper = ({ userId }) =>
  mount(
    <MemoryRouter initialEntries={[`/users/${userId}`]}>
      <Route path="/users/:userId">
        <UserWithRouter />
      </Route>
    </MemoryRouter>
  );

it('renders initial user id', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper({ userId: 5 });

  expect(wrapper.text()).toMatch(/user #5/i);
});

it('renders next user id', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = getWrapper({ userId: 5 });

  wrapper
    .find('a')
    .find({ children: 'Next user' })
    // RR Link ignores clicks if event.button isn't 0 (eg. right click events)
    // https://github.com/airbnb/enzyme/issues/516
    .simulate('click', { button: 0 });

  expect(wrapper.text()).toMatch(/user #6/i);
});
