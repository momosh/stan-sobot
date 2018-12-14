import React from "react";
import { Redirect } from "react-router-dom";

export default ChildComponent => {
  class RequireAuth extends React.Component {
    render() {
      const {
        location: { state }
      } = this.props;

      switch (state) {
        case undefined:
          return <Redirect to="/hotels" />;
        default:
          return <ChildComponent {...this.props} />;
      }
    }
  }

  return RequireAuth;
};
