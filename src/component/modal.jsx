import React, {Component} from 'react'
import _ from 'lodash'


class DetailModal extends Component{
    
    constructor(props){
        super(props)
        this.state={
            types:null,
            ability:null,
            catch:false,
        }
        this.catch=this.catch.bind(this)
    }

    componentDidMount(){
        console.log(this.props.data)
        let types=_.map(this.props.data.types,(data,index)=>{
            return data.type.name
        })
        
        let abilities=_.map(this.props.data.abilities,(data,index)=>{
            return data.ability.name.split('-').join(' ')
        })

        this.setState({
            types:types.toString(),
            ability:abilities.toString(),
        })
    }

    catch(){
        let random=Math.floor(Math.random() * 10);
        if(random % 2 == 0){
            this.setState({catch:true})
        }
    }

    render(){
        return(
            <div className="ui dimmer modals page top aligned transition visible active container-modal">
                <div className="ui special modal transition visible active">
                    <div className="header">
                       Pokemon Information
                    </div>
                    <div className="content">
                        <div className="ui card">
                            <div className="content">
                                <img className="ui image" src={this.props.data.sprites.front_default}/>
                                <div className="header">
                                    {this.props.data.name}
                                </div>
                                <div className="meta">
                                    Type: {this.state.types}
                                </div>
                                <div className="description">
                                    Ability: {this.state.ability}
                                </div>
                            </div>
                            <div className="extra content">
                                Weight: {this.props.data.weight} ~ Height: {this.props.data.height}
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui button" onClick={this.props.close}>
                            Close
                        </div>
                        <div className="ui positive button" onClick={this.catch}>
                            Catch
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailModal