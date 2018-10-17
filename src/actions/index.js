let id = 0;

export const addPoint = point => ({
  type: 'ADD_POINT',
  payload: point,
  id: id++,
});

export const deletePoint = id => ({
  type: 'DELETE_POINT',
  payload: id,
});

export const setCCoords = coords => ({
  type: 'SET_CCOORDS',
  payload: coords,
});

export const refreshCoords = (id, coords, name) => ({
  type: 'REFRESH_COORDS',
  payload: { id, coords, name },
});

export const replacePoint = (oldIndex, newIndex) => ({
  type: 'REPLACE_POINT',
  payload: { oldIndex, newIndex },
});
