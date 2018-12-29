import React from "react";
import { Consumer } from "./contextCreator";

// TODO: write PureComponent wrapper

const placeholderFunc = () => ({});

const subscribe = (
  mapStateToProps = placeholderFunc,
  mapActionsToProps = placeholderFunc,
) => Component => () => (
  <Consumer>
    {value => (
      <Component
        {...mapStateToProps(value.state)}
        {...mapActionsToProps(value.actions)}
      />
    )}
  </Consumer>
);

export { subscribe };
