import * as actions from '../actions/index';
import reducer from '../reducers/index';

describe('reducers test', () => {
  const defaultState = {
    points: [],
    cCoords: { center: [50, 50], zoom: 10 },
  };

  it('add points', () => {
    const point1 = { name: 'name1', coords: [51, 51] };
		const action1 = { ...actions.addPoint(point1) };
		const result1 = reducer({}, action1);

		expect(result1.points).toEqual([{ ...point1, id: 0 }]);

    const point2 = { name: 'name2', coords: [52, 52] };
		const action2 = { ...actions.addPoint(point2) };
		const result2 = reducer(result1, action2);

		expect(result2.points).toEqual([...result1.points, { ...point2, id: 1 }]);
  });

  it('delete point', () => {
    const state = {
			points: [{ name: 'name1', coords: [51, 51], id: 0 },
        { name: 'name2', coords: [52, 52], id: 1 }],
		};

    const action1 = actions.deletePoint(0);
		const result1 = reducer(state, action1);

    expect(result1.points).toEqual([{ name: 'name2', coords: [52, 52], id: 1 }]);

    const action2 = actions.deletePoint(1);
		const result2 = reducer(result1, action2);

		expect(result2.points).toEqual([]);
  });

  it ('replace points', () => {
    const state = {
			points: [{ name: 'name1', coords: [51, 51], id: 0 },
        { name: 'name2', coords: [52, 52], id: 1 },
        { name: 'name3', coords: [53, 53], id: 2 }],
		};
		const oldIndex1 = 0;
		const newIndex1 = 1;
		const action1 = actions.replacePoint(oldIndex1, newIndex1);
		const result1 = reducer(state, action1);

		expect(result1.points).toEqual([{ name: 'name2', coords: [52, 52], id: 1 },
      { name: 'name1', coords: [51, 51], id: 0 },
      { name: 'name3', coords: [53, 53], id: 2 }]);

		const oldIndex2 = 1;
		const newIndex2 = 2;
		const action2 = actions.replacePoint(oldIndex2, newIndex2);
		const result2 = reducer(result1, action2);

    expect(result2.points).toEqual([{ name: 'name2', coords: [52, 52], id: 1 },
      { name: 'name3', coords: [53, 53], id: 2 },
      { name: 'name1', coords: [51, 51], id: 0 }]);
  });

  it ('refresh coods', () => {
    const state = {
			cCoords: { center: [50, 50], zoom: 10 },
			points: [{ name: 'name1', coords: [51, 51], id: 0 },
        { name: 'name2', coords: [52, 52], id: 1 }],
		};
		const newCoords1 = [61, 61];
    const newName1 = 'name11';
		const action1 = actions.refreshCoords(0, newCoords1, newName1);
		const result1 = reducer(state, action1);

		expect(result1.points).toEqual([{ name: 'name11', coords: [61, 61], id: 0 },
      { name: 'name2', coords: [52, 52], id: 1 }]);

		const newCoords2 = [62, 62];
    const newName2 = 'name12';
		const action2 = actions.refreshCoords(1, newCoords2, newName2);
		const result2 = reducer(result1, action2);

    expect(result2.points).toEqual([{ name: 'name11', coords: [61, 61], id: 0 },
      { name: 'name12', coords: [62, 62], id: 1 }]);
	});

  it ('set center and zoom', () => {
		const state = defaultState;
		const newCoords = { center: [60, 60], zoom: 7 };
		const action = actions.setCCoords(newCoords);
		const result = reducer(state, action);

		expect(result.cCoords).toEqual(newCoords);
	});
});
