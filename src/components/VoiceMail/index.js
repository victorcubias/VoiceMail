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
            console.log(response.data);
            this.setState({                
                data: response.data
              });
              console.log([response.data]);
              this.render();   
        });
}
    
    render() {                
        return (
        <TableContainer component={Paper}>
            <Table className="tableStyle">
                <TableHead>
                <TableRow>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">From</TableCell>
                    <TableCell align="left">To</TableCell>
                    <TableCell align="left">Duration</TableCell>                    
                </TableRow>
                </TableHead>
                <TableBody>                
                {this.state.data.map((dato,index) => (                     
                <TableRow>                    
                    <TableCell scope="row" >{dato.folder}</TableCell>
                    <TableCell align="left">{dato.from}</TableCell>
                    <TableCell align="left">{dato.to}</TableCell>
                    <TableCell align="left">{dato.timestamp}</TableCell>                                                                
                </TableRow>                                
                ))}                                                        
                </TableBody>
            </Table>
            </TableContainer>                        
        )                                
    }

}

export default VoiceMail;