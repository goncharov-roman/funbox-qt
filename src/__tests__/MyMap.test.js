import React from 'react';
import { mount } from 'enzyme';
import { MyMap } from '../components/MyMap';

jest.mock('react-yandex-maps', () => ({
  YMaps: ({ children }) => <div> {children} </div>,
  Map: ({ children }) =>
	  <div
	    className = 'mymap'
	  >
      {children}
    </div>,
	Placemark: ({properties, geometry, onDragEnd}) => (
		<div
		  className = 'placemark'
		  coords = {geometry.coordinates}
		  balloon = {properties.balloonContent}
		  onDragEnd = {onDragEnd}
		/>
		),
	Polyline: ({geometry}) =>
	<div
	className = 'polyline'
	coords = {geometry.coordinates}
	></div>
}));

describe('MyMap test', () => {
  const points = [{ name: 'name1', coords: [51, 51], id: 0 },
    { name: 'name2', coords: [52, 52], id: 1 }];
	const mockRefreshCoords = jest.fn();

	const props = {
		points,
		cCoords: [50, 50],
		refreshCoords: mockRefreshCoords,
	};

	const component = mount(<MyMap {...props} />);

  it ('MyMap render placemarks', () => {
		const placemarks = component.find('.placemark');

		expect(placemarks.length).toEqual(points.length);
	});

  it ('MyMap render polyline', () => {
		const polyline = component.find('.polyline');

		expect(polyline.length).toEqual(1);
		expect(polyline.props().coords).toEqual(points.map(point => point.coords));
	});

  //placemark drag test

});
