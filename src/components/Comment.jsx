import React from "react";
import { Container, ListGroup, Alert, Badge} from "react-bootstrap";

const text = ({selectedBook}) => {

    return (
        <Container>
            {selectedBook && (
            <ListGroup className="mt-5">                
                <ListGroup.Item>
                  {selectedBook.text}
                  <Badge pill variant="info" className="ml-3">
                    {selectedBook.userName}
                  </Badge>
                </ListGroup.Item>
            </ListGroup>
            )}
            {!selectedBook && (
            <Alert variant="secondary" className="mt-5">
                No book selected, please click on a book to show the texts
            </Alert>
            )}
      </Container>
    )
}

export default text;