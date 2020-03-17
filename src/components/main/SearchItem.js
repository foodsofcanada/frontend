import React, {Component} from 'react';
// import "./css/SearchItem.css";

class SearchItem extends Component {
    // constructor(props) {
    //     super();
    // }

    render() {
        // console.log(this.props.checked);
        return (
            <div className="searchItem">
                <label>
                    <input type="checkbox" checked={this.props.checked} name={this.props.name} value={this.props.value} onChange={this.props.handleChange}/>
                    {this.props.labelName}
                </label>
            </div>
        );
    }
}

export default SearchItem;