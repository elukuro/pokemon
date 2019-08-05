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
        if(this.state.nextUrl!==null){
            this.setState({loding:true})
            this.generatePokemon(this.state.nextUrl)
        }
    }

    prevData(){
        if(this.state.prevUrl!==null){
            this.setState({loding:true})
            this.generatePokemon(this.state.prevUrl)
        }
    }

    generatePokemon(pagination){
        const url=(this.state.firstLoad) ? CONFIG.url : pagination
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