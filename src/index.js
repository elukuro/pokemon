import './style/app.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter,Route,Switch,Link,HashRouter} from 'react-router-dom';
import App from './container/list.jsx';

ReactDOM.render(
    <HashRouter>
        <main className="body-wrapper">
            <Switch>
                <Route exact path="/" component={App}/>	
            </Switch>
        </main>
    </HashRouter>
    ,document.getElementById('root')
)