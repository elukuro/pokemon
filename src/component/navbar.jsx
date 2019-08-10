import React,{Component} from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component{
    constructor(props) {
        super(props);
        this.activeHelper={
            'pokemonList':(this.props.active=='pokemon-list' ? 'active':''),
            'myList':(this.props.active=='my-list' ? 'active':'')
        }
    }

   
    render(){
        return(
            <div>
                <div className="ui inverted top fixed menu">
                    <div className="item">
                        <img src={require('../images/logo.png')} alt="jumbo" className="image"/>
                    </div>
                    <Link to="/"><span className={`item ${this.activeHelper.pokemonList}`}>Pokemon List</span></Link>
                    <Link to="my-pokemon"><span className={`item ${this.activeHelper.myList}`}>My Pokemon</span></Link>
                </div>
            </div>
        )
    }
}

export default Navbar