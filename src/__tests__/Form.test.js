import React from 'react';
import { mount } from 'enzyme';
import { Form } from '../components/Form';

describe('Form test', () => {
  const mockAddPoint = jest.fn();
  const mockSetCCoords = jest.fn();
  const props = {
		cCoords: { center: [50, 50], zoom: 10 },
		points: [{ name: 'name1', coords: [51, 51], id: 0 }],
		addPoint: mockAddPoint,
    setCCoords: mockSetCCoords,
	};
  const component = mount(<Form {...props} />);
	const input = component.find('input');
	//const form = component.find('form');

  it ('Form input', () => {
		const name = 'name2';
		input.simulate('change', { target: { value: name } });

		expect(component.state().inputValue).toEqual(name);
	});

  //Form submit test
	/*it ('Form submit', async () => {
		const name = 'Ставрополь';
    const coords = [45.044521, 41.969083];
    input.simulate('change', { target: { value: name } });
		await form.simulate('submit');

		expect(mockAddPoint).toHaveBeenCalledWith({ name, coords });
	});*/
});
