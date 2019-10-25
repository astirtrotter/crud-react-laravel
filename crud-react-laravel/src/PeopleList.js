import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import ReactFileReader from "react-file-reader";
import {post} from "axios";

class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };

        this.handleFiles = this.handleFiles.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/group/" + this.props.groupId)
          .then(response => response.json())
          .then(data => this.setState({ data: data.data }));
    }

    handleFiles = files => {
        if (!files.length) return;

        var reader = new FileReader();
        reader.onload = e => {
            const url = `http://localhost:8000/api/group/${this.props.groupId}/import`;
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
                    <button className="ui secondary button">Import People</button>
                </ReactFileReader>
                <Table celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
                      <Table.HeaderCell>Last Name</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>

                  {
                      data.map((person, index) => {
                          return (
                              <Table.Row key={index}>
                                  <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                                  <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                                  <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                                  <Table.Cell singleLine>{ person.status }</Table.Cell>
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
