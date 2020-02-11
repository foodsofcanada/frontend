import React from "react";

function InformationSidebar(props) {
  const previousComponent = null; //keep track of the previous

  return (
    <div className="InformationSidebar">
      <nav>{/* "Back" button and "profile icon" */}</nav>
      <button>pull-tab-button</button>
      {/*display current component. (may have to have an if statement to know which component to display base off of props.current)*/}
    </div>
  );
}

export default InformationSidebar;
