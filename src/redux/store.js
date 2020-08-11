import { createStore, compose, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";
// import { sessionService } from 'redux-react-session';
import { save } from "redux-localstorage-simple";

import { rootReducer } from "./reducers/index";
//
// import { rootSaga } from "./sagas/index";

// const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const configureStore = (preloadedState) =>
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(save({ namespace: "todo" })))
  );

const store = configureStore({});

// sagaMiddleware.run(rootSaga);
// sessionService.initSessionService(store);

export default store;
