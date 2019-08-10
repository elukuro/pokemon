import React, {Component} from 'react'


class DetailModal extends Component{
    
    constructor(props){
        super(props)
        this.state={
            types:null,
            ability:null,
            catch:null,
            pokemonName:'',
        }
        this.catch=this.catch.bind(this)
        this.savePokemon=this.savePokemon.bind(this)
        this.updatePokemonName=this.updatePokemonName.bind(this)
        this.releasePokemon=this.releasePokemon.bind(this)
    }
    

    componentDidMount(){
        let types=this.props.data.types.map((data)=>{
            return data.type.name
        })
        
        let abilities=this.props.data.abilities.map((data)=>{
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
        }else{
            this.setState({catch:false})
        }
    }

    savePokemon(){
        const catchedPokemon ={
            name:this.state.pokemonName,
            realName:this.props.data.name,
            url:this.props.url,
            id:this.props.data.id
        }
        var myPokemon =[]
        if(localStorage.getItem('myPokemon')!==null){
            var myPokemon=JSON.parse(localStorage.getItem('myPokemon'))
            myPokemon.push(catchedPokemon)
        }else{
            myPokemon.push(catchedPokemon)
        }
        localStorage.setItem('myPokemon',JSON.stringify(myPokemon))
        this.props.close()
    }

    releasePokemon(){
        const id=this.props.data.id
        const myPokemon=JSON.parse(localStorage.getItem('myPokemon'))
        const pokemonIndex=myPokemon.findIndex(o => o['id']==id)
        myPokemon.splice(pokemonIndex,1)
        localStorage.setItem('myPokemon',JSON.stringify(myPokemon))
        this.props.close()
        this.props.generateList()
    }

    updatePokemonName(e){
        this.setState({pokemonName:e.target.value})
    }

    renderCatch(){
        if(this.state.catch==true){
            return(
                <div className="extra content catch">
                    <label>Give nickname:</label>
                    <div className="ui large transparent input">
                        <input type="text" onChange={this.updatePokemonName} value={this.state.pokemonName} placeholder="Add nickname..."/>
                    </div>
                </div>
               )
        }else if(this.state.catch==false){
            return(
                <div className="extra content no-catch">
                    <b>Failed to catch</b>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        } 
    }

  
    renderButtons(){
        if(this.state.catch==true && this.props.mode!=='my-list'){
            return(
                <div className="actions">
                    <div className="ui button positive"  onClick={this.savePokemon}>
                        Save
                    </div>
                </div>
               )
        }else if(this.state.catch==false && this.props.mode!=='my-list'){
            return(
                <div className="actions">
                    <div className="ui button" onClick={this.props.close}>
                        Close
                    </div>
                </div>
            )
        }else if(this.state.catch==null && this.props.mode!=='my-list'){
            return(
                <div className="actions">
                    <div className="ui button" onClick={this.props.close}>
                        Close
                    </div>
                    <div className="ui positive button" onClick={this.catch}>
                        Catch
                    </div>
                </div>
            )
        }else if(this.props.mode=='my-list'){
            return(
                <div className="actions">
                    <div className="ui button" onClick={this.props.close}>
                        Close
                    </div>
                    <div className="ui blue button" onClick={this.releasePokemon}>
                        Release
                    </div>
                </div>   
            )
        }
    }
    

    render(){
        return(
            <div className="ui dimmer modals page top aligned transition visible active container-modal">
                <div className="ui special modal transition visible active">
                    <div className={this.state.catch ? 'header catch' : (this.state.catch==false) ? 'header no-catch' : 'header' }>
                       Pokemon Information
                    </div>
                    <div className="content">
                        <div className="ui card">
                            <div className="content">
                                <img className="ui image" src={this.props.data.sprites.front_default} alt={this.props.data.name}/>
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
                            {this.renderCatch()}
                        </div>
                    </div>
                    {this.renderButtons()}
                </div>
            </div>
        )
    }
}

export default DetailModal