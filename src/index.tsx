import React from "react";
import ReactDOM from "react-dom";

const appRoot = document.getElementById("root");

interface ParentState {
  show: boolean;
  text: string;
}

class Parent extends React.Component<{}, ParentState> {
  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props = {}) {
    super(props);
    this.state = { show: false, text: "Init" };
    this.containerRef = React.createRef();
  }

  handleClick = (): void => {
    this.setState((state) => ({
      show: !state.show,
    }));
  };

  onChildMount = (): void => {
    if (this.containerRef.current) {
      this.setState({
        text: "Has ref!",
      });
    } else {
      this.setState({
        text: "No ref!",
      });
    }
  };

  render() {
    return (
        <div>
          <button onClick={this.handleClick}>Show modal</button>
          {this.state.show ? (
              <div ref={this.containerRef}>
                <Child text={this.state.text} onLoad={this.onChildMount} />
              </div>
          ) : (
              <div>No show!</div>
          )}
        </div>
    );
  }
}

interface ChildProps {
  text: string;
  onLoad: () => void;
}

class Child extends React.Component<ChildProps> {
  componentDidMount(): void {
    this.props.onLoad();
  }

  render(): React.ReactNode {
    return <span>{this.props.text}</span>;
  }
}

ReactDOM.render(<Parent />, appRoot);
