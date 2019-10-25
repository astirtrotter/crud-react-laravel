import React from "react";
import ReactDOM from "react-dom";
import { Container, Header } from "semantic-ui-react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from 'react-router-dom'

import GroupList from "./GroupList";
import PeopleList from "./PeopleList";

const App = () => (
    <Container style={{ margin: 20 }}>
        <Header as="h3"><a href="/"><span role="img" aria-label="logo">⛵️</span> Church </a></Header>
        <Router>
            <Switch>
                <Route path="/" exact><GroupList /></Route>
                <Route path="/group/:groupId"><GroupPeople/></Route>
            </Switch>
        </Router>
    </Container>
);

function GroupPeople() {
    let { groupId } = useParams();
    return <PeopleList groupId={groupId} />
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
