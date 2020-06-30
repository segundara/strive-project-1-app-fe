import React from 'react';
import {Card, Row, Col, Dropdown, DropdownButton, FormControl, InputGroup} from 'react-bootstrap';
import CommentList from './CommentList';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';


class LatestRealease extends React.Component {
    state = {
        books: [],
        //categorySelected: 'fantasy',
        selectedBook: null,
        loading: false,
        err: '' 
    };

    showBookComment = (book) => {
        this.setState({selectedBook: book});
    };


    
    componentDidMount = () => {

        const url = process.env.REACT_APP_API_URL
            //"http://localhost:3001/books"
            
          
          this.setState({ loading: true }, async () => {
          try {
            let response = await fetch(url +"/books", {
              method: "GET",
            });
            let books = await response.json();
            this.setState({
              books: books.data,
              loading: false
            });
          } catch (err) {
            console.log(err);
            this.setState({
                err: err,
                books: [],
                loading: false
              });
          }
        })
    }


    render() {
        return (
            <>
                    <Row className="mx-0 pb-3">                        
                            {this.state.books.map((book) => {
                                return (
                                    <Col xs={12} md={3} className="py-3"  key={book.asin}>
                                        <Card style={{width: 15 + 'rem', height: 15 + 'rem'}}>
                                            <Link to={'/details/' + book.asin}>
                                            <Card.Img 
                                                className="img-fluid" 
                                                variant="top" 
                                                src={book.img} 
                                                style={{width: 15 + 'rem', height: 15 + 'rem'}}
                                                />
                                            </Link>
                                        </Card>  
                                    </Col>
                                );
                            })}                
                    </Row>
                
            </>
        )
    }
}

export default LatestRealease;
