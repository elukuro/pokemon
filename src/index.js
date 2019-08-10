import './style/app.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter,Route,Switch,Link,HashRouter} from 'react-router-dom';
import List from './container/list.jsx';
import MyList from './container/my-list.jsx';

ReactDOM.render(
    <HashRouter>
        <main className="body-wrapper">
            <Switch>
                <Route exact path="/" component={List}/>	
                <Route exact path="/my-pokemon" component={MyList}/>	
            </Switch>
        </main>
    </HashRouter>
    ,document.getElementById('root')
)