import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPoint, setCCoords } from '../actions/index';

export class Form extends Component {
  state = { inputValue: '' };

  onInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const res = await window.ymaps.geocode(this.state.inputValue, { results: 1 });
    const name = res.geoObjects.get(0).getAddressLine();
    const coords = res.geoObjects.get(0).geometry.getCoordinates();
    this.props.addPoint({ name, coords });
    const { center, zoom } = getCenterAndZoom(this.props.points);
    this.props.setCCoords({ center, zoom });
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <form
        className = 'form'
        onSubmit = {this.onSubmit}
      >
        <input
          className = 'form_input'
          type = 'text'
          placeholder = 'Введите адрес'
          value = {this.state.inputValue}
          onChange = {this.onInputChange}
        />
        <button className = 'button' type = 'submit'>OK</button>
      </form>
    );
  }
}

export const getCenterAndZoom = (yPoints) => {
  if (yPoints.length === 0) {
    return { center: [44.20, 43.13], zoom: 10 };
  }
  const points = yPoints.map(point => point.coords);
  const bounds = window.ymaps.util.bounds.fromPoints(points);
  return window.ymaps.util.bounds.getCenterAndZoom(bounds, [600, 400]);
};

const mapStateToProps = state => ({
  points: state.points,
  cCoords: state.cCoords,
});

export default connect(mapStateToProps, { addPoint, setCCoords })(Form);
