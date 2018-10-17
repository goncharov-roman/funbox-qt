import * as actions from '../actions/index';

describe('actions test', () => {
  const coords = [50, 50];
  const id = 0;
  const name = 'name';
  const centerAndZoom = { center: [50, 50], zoom: 10 };

  it('add point', () => {
    const obj = actions.addPoint({ coords, name });

    expect(obj).toEqual({
      type: 'ADD_POINT',
      payload: { coords, name },
      id,
    });
  });

  it('delete point', () => {
    const obj = actions.deletePoint(id);

    expect(obj).toEqual({
      type: 'DELETE_POINT',
      payload: id,
    });
  });

  it('set ccoords', () => {
    const obj = actions.setCCoords(centerAndZoom);

    expect(obj).toEqual({
      type: 'SET_CCOORDS',
      payload: centerAndZoom,
    });
  });

  it('refresh ccoords', () => {
    const obj = actions.refreshCoords(id, coords, name);

    expect(obj).toEqual({
      type: 'REFRESH_COORDS',
      payload: { id, coords, name },
    });
  });

  it('replace point', () => {
    const oldIndex = 0;
    const newIndex = 1;
    const obj = actions.replacePoint(oldIndex, newIndex);

    expect(obj).toEqual({
      type: 'REPLACE_POINT',
      payload: { oldIndex, newIndex },
    });
  });
});
