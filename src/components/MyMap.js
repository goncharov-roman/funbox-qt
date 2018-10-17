import React, { Component } from 'react';
import { connect } from 'react-redux';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';
import { refreshCoords } from '../actions/index';

export class MyMap extends Component {
  onPlacemarkDrag = async (id, newCoords) => {
    const res = await window.ymaps.geocode(newCoords);
    const newName = res.geoObjects.get(0).properties.get('name');
    this.props.refreshCoords(id, newCoords, newName);
  };

  render() {
    const { points, cCoords } = this.props;
    const mapState = {
      center: cCoords.center,
      zoom: cCoords.zoom,
      controls: ['zoomControl'],
    };
    const placemarks = points.map(point =>
      <Placemark
        key = {point.id}
        geometry = {{ coordinates: point.coords }}
        properties = {{ balloonContent: point.name }}
        options = {{ draggable: true }}
        onDragEnd = {event => {
          event.stopPropagation();
          const newCoords = event.originalEvent.target.geometry.getCoordinates();
          this.onPlacemarkDrag(point.id, newCoords);
        }}
      />
    );
    const polyline =
    <Polyline
      geometry = {{ coordinates: points.map(point => point.coords) }}
    />;

    return (
      <YMaps>
        <div id = 'map' className = 'map'>
          <Map
            width = {'100%'} height = {'100%'}
            state = {mapState}
            options = {{
              maxZoom: 15,
            }}
          >
            {placemarks}
            {polyline}
          </Map>
        </div>
      </YMaps>
    );
  }
}

const mapStateToProps = state => ({
  points: state.points,
  cCoords: state.cCoords,
});

export default connect(mapStateToProps, { refreshCoords })(MyMap);
