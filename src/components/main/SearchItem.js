import React, {Component} from 'react';
// import "./css/SearchItem.css";

class SearchItem extends Component {
    // constructor(props) {
    //     super();
    // }

    render() {
        return (
            <div className="searchItem">
                <label>
                    <input type="checkbox" name={this.props.className} value={this.props.value} onChange={this.props.handleChange}/>
                    {this.props.name}
                </label>
            </div>
        );
    }
}

export default SearchItem;