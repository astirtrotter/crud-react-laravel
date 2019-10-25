import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import ReactFileReader from 'react-file-reader'
import { post } from 'axios'
import PeopleList from "./PeopleList";

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };

        this.handleFiles = this.handleFiles.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/group")
            .then(response => response.json())
            .then(data => this.setState({ data: data.data }));
    }

    handleFiles = files => {
        if (!files.length) return;

        var reader = new FileReader();
        reader.onload = e => {
            const url = 'http://localhost:8000/api/group/import';
            const formData = {csv: e.target.result};
            post(url, formData)
                .then(response => this.setState({data: response.data.data }))
                .catch(e => {
                    alert(e.message);
                    console.log(e)
                });
        };
        reader.readAsText(files[0]);
    }

    render() {
        var data = this.state.data || [];

        return (
            <div className="d-flex f-col">
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                    <button className="ui primary button">Import Groups</button>
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
                                        <Table.Cell singleLine><a href={`/group/${group.id}`}>{ group.name }</a></Table.Cell>
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

export default GroupList
