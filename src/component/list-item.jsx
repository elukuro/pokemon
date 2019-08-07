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
        this.closeModal=this.closeModal.bind(this);
    }

    closeModal(){
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

    renderDetail(){
        if(this.state.isModalShow){
            return(
                <DetailModal close={this.closeModal} data={this.state.detailPokemon}/>
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
                                <p>{this.props.details.name.split('-').join(' ')}</p>
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