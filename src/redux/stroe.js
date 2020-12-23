import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension/index";
import reducers from "./reducers";


const stroe = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))