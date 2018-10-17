import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { deletePoint, replacePoint, setCCoords } from '../actions/index';
import { getCenterAndZoom } from './Form';

export class List extends Component {
  onBtnClick = (event, id) => {
    event.preventDefault();
    this.props.deletePoint(id);
  };

  onDragEnd = ({ oldIndex, newIndex }) => {
    this.props.replacePoint(oldIndex, newIndex);
  };

  componentDidUpdate() {
    const { center, zoom } = getCenterAndZoom(this.props.points);
    this.props.setCCoords({ center, zoom });
  }

  render() {
    const { points } = this.props;

    const SortableItem = SortableElement(({ point }) =>
      <li className = 'form_item'>
        <p className = 'form_address'>{point.name}</p>
        <button
          className = 'form_delete_button'
          type = 'button'
          onClick = {(event) => this.onBtnClick(event, point.id)}
        >Удалить</button>
      </li>
    );

    const items = points.map((point, i) =>
      <SortableItem
        key = {point.id}
        index = {i}
        point = {point}
      />
    );

    const SortableList = SortableContainer(({items}) =>
      <ul className = 'form_items_wrapper'>
        {items}
      </ul>
    );

    return (
      <SortableList
        items = {items}
        onSortEnd = {this.onDragEnd}
      />
    );
  }
}

const mapStateToProps = state => ({
  points: state.points,
});

export default connect(mapStateToProps, { deletePoint, replacePoint, setCCoords })(List);
