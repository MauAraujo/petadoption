
import React, { Component } from 'react';
import { connectMenu } from 'react-instantsearch-dom';
import { Select, Input } from "antd";
import PropTypes from 'prop-types';

const { Option } = Select;

class MenuSelect extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        isRefined: PropTypes.bool.isRequired,
      })
    ).isRequired,
    refine: PropTypes.func.isRequired,
  };

  onChange = event => {
      const { refine } = this.props;
      //const value = event.currentTarget.value;
      const value = event;

    if (value !== 'see_all_categories') {
      refine(value);
    } else {
      refine();
    }
  };

  render() {
    const { items } = this.props;
    const { value: selected } = items.find(item => item.isRefined) || {
      value: 'see_all_categories',
    };

    return (
        <Select style={{ width: "100%", margin: "0.5rem" }} className="menu-select" value={selected} onChange={this.onChange}>
        <Option value="see_all_categories">Elije una opcion</Option>
        {items.map(item => (
          <Option key={item.value} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    );
  }
}

export default connectMenu(MenuSelect);
