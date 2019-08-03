import React from 'react';
import ListItem from '../component/list-item.jsx'
import Navbar from '../component/navbar.jsx'
import axios from 'axios'
import _ from 'lodash'

const CONFIG={
    url:'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0'
}

class List extends React.Component{
    constructor(props){
		super(props);
		this.state={
            list:{},
            firstLoad:true,
            loading:true,
            nextUrl:null,
            prevUrl:null
        }
        this.nextData = this.nextData.bind(this);
        this.prevData = this.prevData.bind(this);
    }
    nextData(){
        this.setState({loding:true})
        this.generatePokemon('next')
    }
    prevData(){
        this.setState({loding:true})
        this.generatePokemon('prev')
    }

    generatePokemon(pagination){
        const paginationLink=(pagination=='next' && this.state.nextUrl!=null) ? this.state.nextUrl : (this.state.prevUrl!==null && pagination=='prev') ? this.state.prevUrl : ''
        const url=(this.state.firstLoad) ? CONFIG.url : paginationLink
        axios.get(url).then((response)=> {
            this.setState(
                {
                    list:response.data.results,
                    nextUrl:response.data.next,
                    prevUrl:response.data.previous,
                    loading:false
                }
            );
        })
    }

    componentDidMount(){
        this.generatePokemon()
        this.setState({firstLoad:false})
    }

    renderList(){
        if(this.state.loading){
            return(
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            )
        }else{
            return _.map(this.state.list,item=>{
                return(
                    <ListItem list={item} key={item.name}/>
                )
            })
        }
        
    }

    render(){
        return(
            <div className="ui container list-item">
               <Navbar active="pokemon-list"/>
                {this.renderList()}
                <div>
                    <div className="ui inverted bottom fixed menu pagination">
                        <a className="item" onClick={this.nextData}>Next</a>
                        <a className="item" onClick={this.prevData}>Previous</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default List;