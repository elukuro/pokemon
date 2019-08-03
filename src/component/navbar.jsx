import React,{Component} from 'react';

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
                    <a className={`item ${this.activeHelper.pokemonList}`}>Pokemon List</a>
                    <a className={`item ${this.activeHelper.myList}`}>My Pokemon</a>
                </div>
            </div>
        )
    }
}

export default Navbar