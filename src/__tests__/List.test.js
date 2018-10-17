import React from 'react';
import { mount } from 'enzyme';
import { List } from '../components/List';

jest.mock('react-sortable-hoc', () => ({
	SortableContainer: Component => props =>
    <div className = 'container' onDragEnd = {props.onSortEnd}>
      <Component {...props} />
    </div>,
	SortableElement: component => component,
}));

describe('List test', () => {
	const mockDeletePoint = jest.fn();
	const mockReplacePoint = jest.fn();
	const props = {
		points: [{ name: 'name1', coords: [51, 51], id: 0 },
      { name: 'name2', coords: [52, 52], id: 1 }],
		deletePoint: mockDeletePoint,
		replacePoint: mockReplacePoint,
	};
	const component = mount(<List {...props} />);

  it ('List delete point', () => {
		const button = component.find('button').first();
		button.simulate('click');

		expect(mockDeletePoint).toHaveBeenCalledWith(0);
	});

  it ('List drag', () => {
		const container = component.find('.container');
		container.simulate('dragend');

		expect(mockReplacePoint).toHaveBeenCalled();
	});

  //setCCoords test
});
