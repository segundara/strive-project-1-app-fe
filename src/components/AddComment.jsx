import React from 'react'
import { Form, Row, Col, Button} from 'react-bootstrap'
import StarRatings from 'react-star-ratings';
import {
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import CommentList from "./CommentList";


class AddComment extends React.Component {
  state = {
    commentObj: {
      userName: '',
        text: ''
    }
    
  }


  saveComment = async e => {
    e.preventDefault();

    const url = process.env.REACT_APP_API_URL

    try {
      let response = await fetch(url +"/books/"+ this.props.selectedBook + "/comments", {
        method: "POST",
        body: JSON.stringify(this.state.commentObj),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.ok) {
        alert('Comment saved!')
        this.setState({
          commentObj: {
            userName: '',
            text: ''
          }
        })
      } else {
        let json = await response.json()
        alert(json)
      }
    } catch (e) {
      console.log(e)
    }
  }

  updateCommentField = event => {
    let commentObj = this.state.commentObj
    let currentId = event.currentTarget.id
    console.log(currentId)
    commentObj[currentId] = event.currentTarget.value

    this.setState({ commentObj: commentObj })
  }


  render() {
    console.log(this.state.commentObj)
    return (
      <>
      {this.props.selectedBook && (
      <div className="mt-5 mb-5">
        <h5>Add comments with the Form below!</h5>
        <Form onSubmit={this.saveComment}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="text">Text</Form.Label>
                <Form.Control
                  type="text"
                  name="text"
                  id="text"
                  placeholder="Your comment"
                  value={this.state.commentObj.text}
                  onChange={this.updateCommentField}
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group>
                <Form.Label htmlFor="userName">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Your name"
                  value={this.state.commentObj.userName}
                  onChange={this.updateCommentField}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
      )}
      {!this.props.selectedBook &&(
        <></>
      )}
      </>
    )
  }
}

export default AddComment