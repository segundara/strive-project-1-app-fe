import React from 'react';
import {Card, Row, Col, Dropdown, DropdownButton, FormControl, InputGroup} from 'react-bootstrap';
import CommentList from './CommentList';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';


let bookCategories = ['All-Category','fantasy','history','horror','romance','scifi']
class LatestRealease extends React.Component {
    state = {
        books: [],
        categorySelected: 'All-Category',
        selectedBook: null,
        loading: false,
        err: '' 
    };

    showBookComment = (book) => {
        this.setState({selectedBook: book});
    };

    handleDropdownChange = (category) => {
        if(category === 'All-Category'){
            this.setState({books: [], categorySelected: category});
            this.displayALLCat()
        }else{
            this.setState({books: [], categorySelected: category});

            const url = process.env.REACT_APP_API_URL            
            
            this.setState({ loading: true }, async () => {
                try {
                let response = await fetch(url +"/books?category="+ this.state.categorySelected, {
                    method: "GET",
                });
                let books = await response.json();
                console.log(books)
                this.setState({
                    books: books.catData,
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
        
    };
    
    displayALLCat = () => {        
        const url = process.env.REACT_APP_API_URL            
        
        this.setState({ loading: true }, async () => {
            try {
            let response = await fetch(url +"/books", {
                method: "GET",
            });
            let books = await response.json();
            //console.log(books)
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

    componentDidMount = () => {
        this.displayALLCat()
    }


    render() {
        // console.log(this.state.categorySelected)
        //console.log(this.state.books)
        return (
            <>
                <Row className="mx-0 pb-3">
                    
                    {<InputGroup>
                        <DropdownButton
                            id='dropdown-basic-button'
                            className='mb-3'
                            title={this.state.categorySelected}
                            >
                            {bookCategories.map((category, index) => {
                                return(
                                    <Dropdown.Item
                                        href='#/action-1'
                                        key={`cat-${index}`}
                                        onClick={() => this.handleDropdownChange(category)}
                                    >{category}
                                    </Dropdown.Item>
                                );
                            })}    
                        </DropdownButton>
                    </InputGroup>}              

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
