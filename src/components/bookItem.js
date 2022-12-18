import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button"; //Imports bootstrap button
import axios from "axios"; //Imports a promise

export class BookItem extends React.Component {

    //Constructor for the BookItem class
    constructor() {
        super(); //Calls parents constructor
        this.DeleteBook = this.DeleteBook.bind(this); //Creates a binding for the event method delete
    }

    //This is a delete method that acts as a event
    DeleteBook(e) {
        e.preventDefault();
        axios.delete('http://localhost:4000/api/book/' + this.props.book._id) // Makes request to server and waits for database to delete book with given id
            .then((res) => { this.props.Reload(); }) //If successful, call Reload which refreshes data on the page
            .catch();
    }

    render() {
        return (
            <div>
                {/* <h4>{this.props.book.title}</h4>
        <img src={this.props.book.thumbnailUrl}></img>
                <h6>{this.props.book.authors[0]}</h6> */}

                {/*Creates a new Card that contains details about the particular book*/}
                <Card>
                    <Card.Header>{this.props.book.title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.book.cover}></img>
                            <footer >
                                {this.props.book.author}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Link to={'/edit/' + this.props.book._id} className="btn btn-primary">Edit</Link> {/**Creates a new Edit button Link that sends user to edit page upon clicking it*/}
                    <Button variant="danger" onClick={this.DeleteBook}>Delete</Button> {/*Creates a delete button, when its clicked, what event should be called?*/}
                </Card>
            </div>
        );
    }
}
