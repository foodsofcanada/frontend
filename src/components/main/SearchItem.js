import React, { Component } from "react";
// import "./css/SearchItem.css";

class SearchItem extends Component {
  // constructor(props) {
  //     super();
  // }

  render() {
    // console.log(this.props.checked);
    console.log(this.props);
    return (
      <div
        className="searchItem custom-control custom-checkbox"
        style={{ marginLeft: "30px" }}
      >
        <input
          type="checkbox"
          className="custom-control-input"
          checked={this.props.checked}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.handleChange}
          id={this.props.labelName}
        />
        <label class="custom-control-label" for={this.props.labelName}>
          {this.props.labelName}
        </label>

        {/* <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="customCheck"
            name="example1"
          />
          <label class="custom-control-label" for="customCheck">
            Check this custom checkbox
          </label>
        </div> */}
      </div>
    );
  }
}

export default SearchItem;
