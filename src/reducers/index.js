import { combineReducers } from 'redux';
import { arrayMove } from 'react-sortable-hoc';

const points = (state = [], action) => {
  const { type, payload, id } = action;

  switch (type) {
    case 'ADD_POINT':
      const newPoint = { ...payload, id };
      return [...state, newPoint];
    case 'DELETE_POINT':
      const deletedId = payload;
      return state.filter(point => point.id !== deletedId);
    case 'REFRESH_COORDS':
      return state.map(point =>
        point.id === payload.id
        ? { ...point, coords: payload.coords, name: payload.name } : point);
    case 'REPLACE_POINT':
      return arrayMove([...state], payload.oldIndex, payload.newIndex);
    default:
      return state;
  }
};

const cCoords = (state = { center: [44.20, 43.13], zoom: 10 }, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CCOORDS':
      return payload;
    default:
      return state;
  }
};

export default combineReducers({
  points,
  cCoords,
});
