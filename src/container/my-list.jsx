import React from 'react';
import ListItem from '../component/list-item.jsx'
import Navbar from '../component/navbar.jsx'
import _ from 'lodash'



class MyList extends React.Component{
    constructor(props){
		super(props);
		this.state={
            lists:{}
        }
        this.generateList=this.generateList.bind(this)
    }

    generateList(){
        const data=JSON.parse(localStorage.getItem('myPokemon'))
        this.setState({lists:data});
    }

    componentDidMount(){
        this.generateList()
    }

    renderList(){
       return _.map(this.state.lists,(item,index)=>{
            return(
                <ListItem details={item} key={index} mode="my-list" generateList={this.generateList}/>
            )
        })
    }
    
    render(){
        return(
            <div className="ui container list-item">
               <Navbar active="my-list"/>
                {this.renderList()}
            </div>
        )
    }
}

export default MyList;