import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import ReactFileReader from 'react-file-reader'

class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/groups")
            .then(response => response.json())
            .then(data => this.setState({ data: data.data }));
    }

    handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log(reader.result);
        };
        reader.readAsText(files[0]);
    }

    render() {
        var data = this.state.data || [];

        return (
            <div className="d-flex f-col">
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                    <button id="importGroups" className="ui primary button">Import Groups</button>
                </ReactFileReader>
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>Group Name</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {
                            data.map((group, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell singleLine><a href="#">{ group.name }</a></Table.Cell>
                                    </Table.Row>
                                );
                            })
                        }

                    </Table.Body>
                </Table>
            </div>
        );
    }

}

export default PeopleList
