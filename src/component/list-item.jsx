import React , { Component } from 'react';
class ListItem extends Component{
    constructor(props){
		super(props);
		this.state={
			loading:true
		}
    }
    
    render(){
        const element=this.props.list;
        return(
            <div>
                <div className="ui card container list-item__component" id="list">
                    <div className="content">
                        <div className="ui small feed">
                        <div className="event">
                            <div className="content">
                            <div className="summary">
                                <p>{element.name}</p>
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