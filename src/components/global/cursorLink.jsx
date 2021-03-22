import React from "react";

class CursorLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className = "", handleClick, link } = this.props;
    return (
      <div>
        { link
          ? <a
              className={`${className} cursor-pointer`}
              href={link}
            >
              { this.props.children }
            </a>
          : handleClick
            ? <a
                className={`${className} cursor-pointer`}
                onClick={handleClick}
              >
                { this.props.children }
              </a>
            : <a
                className={`${className} cursor-pointer`}
              >
                { this.props.children }
              </a>
        }
      </div>
    );
  }
}

export default CursorLink;
