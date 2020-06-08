import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './styles.css'

const serverUrl = '/v2';
const credentials = 'NDY0MmU2NDA0MGNkYjhiODljMzEwYTIxYTA3YzdmNjI6MjMyNjQxNTY1OTA3NWU3NTAwMGNlY2Q3YmNiZjM3NTY=';
const accountId = '4642e64040cdb8b89c310a21a07c7f62';
const vmBoxId = 'b37675a2d7b90d60f0ee5d4175502394';



const headers = {
    Authorization: `Basic ${credentials}`    
};


class VoiceMail extends Component {
    constructor() {
        super();        
        this.state = {
            data : [],                 
            state_selected: "new",
            messagesSelected:"0",
            isloading: false              
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.saveState = this.saveState.bind(this);
    
    }

async componentDidMount(){   
    this.setState({isloading: true}); 
    await this.LoadPage();
    this.setState({isloading: false});
}

async LoadPage(){
    await fetch(`${serverUrl}/accounts/${accountId}/vmboxes/${vmBoxId}/messages`,{ headers }).
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

    handleChange(e) {        
        this.setState({ state_selected: e.target.value });
    }

  handleSave(e) {     
    this.saveState(e.target.id.replace("btn",""));         
  }

  async saveState(callid){  
    this.setState({isloading:true});        
    await fetch(`${serverUrl}/accounts/${accountId}/vmboxes/${vmBoxId}/messages/${callid}?folder=${this.state.state_selected}`,{
        method: 'POST',
        headers
    }).
    then(function(response) {                    
        if(!response.ok){                            
            throw Error(response.statusText);
        }        
        return response.json();
    }).then((response) =>{
        this.setState({isloading: false});
        this.LoadPage();                                          
    });

  }
    
    render() {    
        console.log(this.state.isloading);
        if (this.state.isloading)
        {
            return <p>Loading ...</p>;
        }
        

        return (        
            
            <TableContainer component={Paper}>
            <Table className="tableStyle">
                <TableHead>
                <TableRow>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">From</TableCell>
                    <TableCell align="left">To</TableCell>
                    <TableCell align="left">Duration</TableCell>  
                    <TableCell align="left">Modificar Estado</TableCell>  
                </TableRow>
                </TableHead>
                <TableBody>                
                {this.state.data.map((dato,index) => (                     
                <TableRow key={dato.call_id}>                    
                    <TableCell scope="row" >{dato.folder}</TableCell>
                    <TableCell align="left">{dato.from}</TableCell>
                    <TableCell align="left">{dato.to}</TableCell>
                    <TableCell align="left">{dato.timestamp}</TableCell>                                                                
                    <TableCell align="left">                    
                        <select onChange={this.handleChange} name="estado" id="estado">
                        <option value="new">new</option>
                            <option value="saved">saved</option>
                            <option value="deleted">deleted</option>                            
                        </select>
                        <button id={`btn${dato.media_id}`} onClick={this.handleSave}>Modificar</button>
                    </TableCell>
                </TableRow>                                
                ))}                                                        
                </TableBody>
            </Table>
            </TableContainer>                                                                                        
        )                                
    }

}

export default VoiceMail;