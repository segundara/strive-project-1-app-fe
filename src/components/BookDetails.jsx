import React from 'react'
import {Container, Image, Card, Row, Col, Dropdown, DropdownButton, FormControl, InputGroup} from 'react-bootstrap';
import CommentList from './CommentList';

import Loader from 'react-loader-spinner';


class BookDetails extends React.Component {
    state={
        item:[],
        loading: false,
        err: '' 
    }

    componentDidMount (){
        console.log(this.props.match.params.id)
        
        const url = process.env.REACT_APP_API_URL
          
          this.setState({ loading: true }, async () => {
          try {
            let response = await fetch(url  +"/books/" + this.props.match.params.id, {
              method: "GET",
            });
            const book = await response.json();
            console.log("Selected book is ", book);
            // console.log(url);
            this.setState({
              item: book,
              loading: false
            });
          } catch (err) {
            console.log(err);
            this.setState({
                err: err,
                item: [],
                loading: false
              });
          }
        })
    }
    render(){
    return (
        <Container>
            <Row>
                <Col xs={'auto'}>
                    <Image src={this.state.item.img} style={{width: 15 + 'rem', height: 15 + 'rem'}}/>
                </Col>
                <Col>
                    <h4>{this.state.item.title}</h4>
                    <br/>
                    <CommentList selectedBook={this.props.match.params.id} />
                </Col>
            </Row>
        </Container>
    )
}
}

export default BookDetails
