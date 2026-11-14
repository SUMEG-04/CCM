import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

export const withCCMStore = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props) => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
  WrappedComponent.displayName = `WithCCMStore(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
};

