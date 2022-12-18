import React from "react";
import { Books } from "./books";
import axios from "axios";

export class Read extends React.Component {

    //Creates constructor for class
    constructor(){
        super(); //Call parents constructor
        this.Reload = this.Reload.bind(this); //Creates binding for Reload
    }
    //Go off to server and pull new list of books
    //Refreshes data of books - this acts as a event
    Reload() {
        this.componentDidMount();
    }

    //Acts as a lifecycle hook for the start of a component
    componentDidMount() {
        axios.get('http://localhost:4000/api/books')
            .then((response) => {
                this.setState({ books: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    state = {
        books: []
    }

    render() {
        return (
            <div>
                <h3>Hello from my Read component!</h3>
                <Books books={this.state.books} Reload={this.Reload}></Books>
            </div>
        );
    }
}
