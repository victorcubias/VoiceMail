import React, { Component } from 'react';
import VoiceReport from './VoiceReport'
import './styles.css'
import ReactDOM from 'react-dom'

const serverUrl = '/v2';
const credentials = 'NDY0MmU2NDA0MGNkYjhiODljMzEwYTIxYTA3YzdmNjI6MjMyNjQxNTY1OTA3NWU3NTAwMGNlY2Q3YmNiZjM3NTY=';
const accountId = '4642e64040cdb8b89c310a21a07c7f62';

const headers = {
    Authorization: `Basic ${credentials}`    
};

class VoiceMail extends Component {

    constructor() {
        super();        
        this.state = {
            data : [],
            isloading: false,
            vmBoxId: "0",
            show:false
    };
    this.handleChange = this.handleChange.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
}


handleChange(e) {        
    this.setState({ vmBoxId: e.target.value });
    this.setState({show: false});
    this.render();
}

async handleLoad(e) {    
    this.setState({show:true});
    this.render();
  }

async componentDidMount(){   
    this.setState({isloading: true}); 
    await this.LoadPage();
    this.setState({isloading: false});
}

async LoadPage(){
    await fetch(`${serverUrl}/accounts/${accountId}/vmboxes/`,{ headers }).
        then(function(response) {            
            if(!response.ok){                
                throw Error(response.statusText);
            }
            return response.json();
        }).then((response) =>{                      
            this.setState({                
                data: response.data
              });              
              this.render();   
        });        
}

    

    render() {          
        return(            
            <div>
                Choose a vmBoxId :
                <select  name="vmBoxId" id="vmBoxId" onChange={this.handleChange}>
                <option key="0" value="0">Choose a VmBoxId </option>
                {this.state.data.map((dato,index) => (                     
                    <option key={dato.id} value={dato.id}>{dato.id}</option>                                          
                ))}                    
                </select>
                <button onClick={this.handleLoad}>Load</button>
                Click on Load to load the report.
                {this.state.show?<VoiceReport vmBoxId={this.state.vmBoxId}   reloadChild={this.reloadChild} />:null}
            </div>
            
        );    
}
}

export default VoiceMail;