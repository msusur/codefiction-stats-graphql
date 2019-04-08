import ReactDOM from 'react-dom';
import { createMainRoutes } from './routes';

import * as serviceWorker from './serviceWorker';

import './index.scss';

const routes = createMainRoutes();

ReactDOM.render(routes, document.getElementById('root'));

serviceWorker.unregister();
