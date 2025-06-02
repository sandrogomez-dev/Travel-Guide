import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const TravelForm = () => {
  return (
    <Card className="m-3 shadow">
      <Card.Body>
        <h2>Planifica tu viaje ✈️</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Destino</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Ej: París, Francia" 
            />
          </Form.Group>
          <Button variant="primary">Generar Itinerario</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TravelForm;