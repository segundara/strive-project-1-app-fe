import React from 'react';
import {Row, Dropdown, DropdownButton, FormControl, InputGroup} from 'react-bootstrap';
import { Container, ListGroup, Alert, Badge, Col, Button } from "react-bootstrap";

import Comment from './Comment';
import AddComment from './AddComment';
import Loader from 'react-loader-spinner';

class CommentList extends React.Component {
    state = {
        selected: '',
        commentss: [],
        //selectedComment: {},
        selectedBook: this.props.selectedBook,
        loading: false,
        err: ''
    }

    LoadingIndicator = () => {
        return(
        <div
            style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            }}
            >
            <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </div>
    )};

    LoadingError = () => {
        return(
        <Alert variant="danger" className="my-5">
            Ooops!!! Sorry this is not working at the moment. Please try again later!
        </Alert>
    )};
    
    showComments = () => {
        return(
            <>
            {this.state.commentss.map((comment,i)=>{
                return (    
                    <>      
                    <Comment key={i}
                        selectedBook={comment} 
                    />
                    <Button variant="danger" onClick={() => this.deleteComment({comment})}>Delete</Button>
                    </>
                );
            })}
            <Row>
                <Col xs={12} >
                    <AddComment selectedBook={this.props.selectedBook}/>
                </Col>
            </Row>
            </>
        )
    }

    
    componentDidMount = async () => {
        console.log(this.props.selectedBook)
          const url = process.env.REACT_APP_API_URL
          
          this.setState({ loading: true }, async () => {
          try {
            let response = await fetch(url +"/books/" +
            this.props.selectedBook + "/comments", {
              method: "GET",
              //headers: headers,
            });
            let comments = await response.json();
            console.log("Comments are ", comments);
            //console.log(url);
            this.setState({
              commentss: comments.data,
              loading: false
            });
          } catch (err) {
            console.log(err);
            this.setState({
                err: err,
                commentss: [],
                loading: false
              });
          }
        })
      };

      
    deleteComment = async ({comment}) => {
        let id = ''
        this.state.commentss.map((a)=>{
            if (a.commentID === comment.commentID){
                return id += a.commentID
            }
        })
        console.log(id)

        // const url = "https://striveschool.herokuapp.com/api/comments/";
    

        // let response = await fetch(url + id, {
        // method: "DELETE",
        // headers: headers,
        // });
        // return response;
    };

    render(){
    return (
        <Container>
            {this.props.selectedBook && this.state.loading &&(
                this.LoadingIndicator()
            )}
            {this.props.selectedBook && !this.state.loading &&(
                <>
                {this.state.commentss && !this.state.err &&(
                    this.showComments()
                )}
                {this.state.err && (
                    this.LoadingError()
                )}
                </>
            )}
      </Container>
    )
    }
}

export default CommentList;