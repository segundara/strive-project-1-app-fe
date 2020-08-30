import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

class JumBotron extends React.Component {
    render() {
        return (
            <Jumbotron fluid className="text-center pt-5">
                <Container>
                    <h1>Welcome!</h1>
                    <p>
                        If you have been searching for the right place
                        to get the books that would enrich your info-bank,
                        then you are just in the right place.
                    </p>
                    <p>
                        Click on the dropdown button to select and see the books in each category.
                    </p>
                </Container>
            </Jumbotron>
        )
    }
}

export default JumBotron;
