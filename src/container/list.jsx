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
            lists:{},
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
        if(this.state.nextUrl!==null){
            this.generatePokemon(this.state.nextUrl)
        }
        
    }

    prevData(){
        this.setState({loding:true})
        if(this.state.prevUrl!==null){
            this.generatePokemon(this.state.prevUrl)
        }
        
    }

    generatePokemon(paginationUrl){
        const url=(this.state.firstLoad) ? CONFIG.url : paginationUrl
        axios.get(url).then((response)=> {
            this.setState(
                {
                    lists:response.data.results,
                    nextUrl:response.data.next,
                    prevUrl:response.data.previous,
                    loading:false
                }
            );
        })
    }

    renderList(){
        if(this.state.loading){
            return(
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            )
        }else{
            return _.map(this.state.lists,item=>{
                return(
                    <ListItem details={item} key={item.name}/>
                )
            })
        }
    }

    componentDidMount(){
        this.generatePokemon()
        this.setState({firstLoad:false})
    }
    
    render(){
        return(
            <div className="ui container list-item">
               <Navbar active="pokemon-list"/>
                {this.renderList()}
                <div className="ui container card">
                    <div className="ui two buttons">
                        <div className="ui basic green button" onClick={this.nextData}>Next</div>
                        <div className="ui basic green button" onClick={this.prevData}>Previous</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default List;