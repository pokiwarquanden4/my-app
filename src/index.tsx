import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './App/store';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { handleAxiosRequest, handleAxiosResponse } from './config/axiosConfig';

//Set backend URL
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL
//Set default timeout
axios.defaults.timeout = 30000
//Inject token for authorization
axios.interceptors.request.use(
  handleAxiosRequest,
  error => Promise.reject(error)
)
//Handle Axios Response
axios.interceptors.response.use(
  handleAxiosResponse,
  error => Promise.reject(error)
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
