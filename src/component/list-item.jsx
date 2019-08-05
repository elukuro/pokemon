import React , { Component } from 'react';
import axios from 'axios'
import _ from 'lodash'

class ListItem extends Component{

    constructor(props){
		super(props);
		this.state={
            loading:true,
            detailPokemon:{}
            
        }
        this.getDetail = this.getDetail.bind(this);
    }

    getDetail(){
        this.setState({loding:true})
        this.generateDetail()
    }

    generateDetail(){
        const url=this.props.details.url;
        axios.get(url).then((response)=> {
            this.setState(
                {
                    detailPokemon:response.data,
                    loading:false
                }
            );
            this.renderDetail()
        })
    }

    renderDetail(){
        return _.map(this.state.detailPokemon.abilities,data=>{
            console.log(data.ability.name)
        })

    }

    
    
    render(){
        const data=this.props.details;
        return(
            <div>
                <div className="ui card container list-item__component" onClick={this.getDetail}>
                    <div className="content">
                        <div className="ui small feed">
                        <div className="event">
                            <div className="content">
                            <div className="summary">
                                <p>{data.name}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListItem;