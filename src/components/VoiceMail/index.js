import React, { Component } from 'react';


const serverUrl = 'https://sandbox.2600hz.com:8443/v2';
const credentials = 'NDY0MmU2NDA0MGNkYjhiODljMzEwYTIxYTA3YzdmNjI6MjMyNjQxNTY1OTA3NWU3NTAwMGNlY2Q3YmNiZjM3NTY=';
const accountId = '4642e64040cdb8b89c310a21a07c7f62';
const vmBoxId = 'b37675a2d7b90d60f0ee5d4175502394';


const headers = {
    Authorization: `Basic ${credentials}`    
};



class VoiceMail extends Component {
    constructor() {
        super();
    }

    
        handleUpdateClick = () => {
            console.log(headers);
            fetch(`${serverUrl}/accounts/${accountId}/vmboxes/${vmBoxId}/messages?paginate=true`,{ headers}).
        then(function(response) {
            console.log(response.json());
            if(!response.ok){                
                throw Error(response.statusText);
            }
            return response;
        }).then(function(response){
            console.log(response);
            console.log("ok");
        }).catch(function(error){
            console.log(error);
        });                                
            }                                
     

    render() {
        return(
            <div>                                
                <button onClick={this.handleUpdateClick}>Obtener Datos</button>                
            </div>
        );
    }

    
}

export default VoiceMail;