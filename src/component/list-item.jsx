import React , { Component } from 'react'
import DetailModal from './modal.jsx'
import axios from 'axios'

class ListItem extends Component{

    constructor(props){
		super(props);
		this.state={
            loading:true,
            detailPokemon:{},
            isModalShow:false
        }
        this.getDetail = this.getDetail.bind(this);
        this.close=this.close.bind(this);
        this.generateList=this.generateList.bind(this);
    }

    close(){
        this.setState({
            isModalShow:false
        })
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
                    loading:false,
                    isModalShow:true
                }
            );
            this.renderDetail()
        })
    }

    generateList(){
        this.props.generateList()
    }

    renderDetail(){
        if(this.state.isModalShow){
            return(
                <DetailModal 
                    generateList={this.generateList} 
                    close={this.close} 
                    url={this.props.details.url} 
                    data={this.state.detailPokemon} 
                    mode={this.props.mode}
                />
            )
        }
    }

    
    
    render(){
        return(
            <div>
                {this.renderDetail()}
                <div className="ui card container list-item__component" onClick={this.getDetail}>
                    <div className="content">
                        <div className="ui small feed">
                        <div className="event">
                            <div className="content">
                            <div className="summary">
                                <p>{this.props.details.name.split('-').join(' ')} {this.props.mode=='my-list' ? ` | ${this.props.details.realName}`:''}</p>
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