import React, { Component } from 'react';
import ReactTable from "react-table";



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
            data : []  
        }
    }

async componentDidMount(){
    await fetch(`${serverUrl}/accounts/${accountId}/vmboxes/${vmBoxId}/messages?paginate=true`,{ headers}).
        then(function(response) {            
            if(!response.ok){                
                throw Error(response.statusText);
            }
            return response.json();
        }).then((response) =>{            
            this.setState({                
                data: response.data
              });
              console.log([response.data]);
              this.render();   
        });
}

                                                 
    render() {        
        console.log("this.state.data");
        console.log(this.state.data.data);
        return (
            <div>
              {
                this.state.data.map((dato,index) => {                                    
                    return (
                        <div key={index} style={{borderBottom: '2px solid black'}}>
                          <p>Status: {dato.folder}</p>                                                                        
                          <p>From: {dato.from}</p>                                                                        
                          <p>To: {dato.to}</p>                                                                        
                          <p>Duration: {dato.timestamp}</p>                                                                        
                        </div>
                      );
                    })
                
              }
            </div>
          )                                
    }

    
}

export default VoiceMail;