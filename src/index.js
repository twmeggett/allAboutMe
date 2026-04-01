import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "./App";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
root.render(<App />);
