import React from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { INFO_MESSAGES, VALIDATION_LIMITS } from '../utils/constants';

/**
 * Componente de formulario para planificar viajes
 * Ahora es un componente de presentación puro que recibe props
 */
const TravelForm = ({
  formData,
  errors,
  isSubmitting,
  submitMessage,
  tripTypes,
  handleInputChange,
  handleSubmit,
  resetForm,
  hasChanges,
  isFormComplete
}) => {
  return (
    <div className="container py-4">
      <Card className="shadow-lg border-0">
        <Card.Header className="bg-primary text-white text-center py-3">
          <h2 className="mb-0">✈️ Planifica tu Viaje Perfecto</h2>
          <p className="mb-0 mt-2">Completa los detalles y creamos tu itinerario personalizado</p>
        </Card.Header>
        
        <Card.Body className="p-4">
          {submitMessage && (
            <Alert variant={submitMessage.includes('Error') ? 'danger' : 'success'} className="mb-4">
              {submitMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Destino */}
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label className="fw-bold">
                    🎯 Destino <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="Ej: París, Francia"
                    isInvalid={!!errors.destination}
                    size="lg"
                    maxLength={VALIDATION_LIMITS.DESTINATION.MAX_LENGTH}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.destination}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    {formData.destination.length}/{VALIDATION_LIMITS.DESTINATION.MAX_LENGTH} caracteres
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            {/* Fechas */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">
                    📅 Fecha de Inicio <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    isInvalid={!!errors.startDate}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.startDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">
                    📅 Fecha de Fin <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    isInvalid={!!errors.endDate}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.endDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Duración y Viajeros */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">⏱️ Duración</Form.Label>
                  <Form.Control
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="Días"
                    readOnly={formData.startDate && formData.endDate}
                    className={formData.startDate && formData.endDate ? 'bg-light' : ''}
                    max={VALIDATION_LIMITS.TRIP_DURATION.MAX_DAYS}
                  />
                  <Form.Text className="text-muted">
                    {formData.startDate && formData.endDate 
                      ? INFO_MESSAGES.DURATION_AUTO_CALCULATED
                      : INFO_MESSAGES.DURATION_WILL_CALCULATE}
                  </Form.Text>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">
                    👥 Número de Viajeros <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleInputChange}
                    min={VALIDATION_LIMITS.TRAVELERS.MIN}
                    max={VALIDATION_LIMITS.TRAVELERS.MAX}
                    isInvalid={!!errors.travelers}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.travelers}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Tipo de Viaje */}
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label className="fw-bold">
                    🎨 Tipo de Viaje <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="tripType"
                    value={formData.tripType}
                    onChange={handleInputChange}
                    isInvalid={!!errors.tripType}
                    size="lg"
                  >
                    {tripTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.tripType}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Presupuesto */}
            <Row className="mb-4">
              <Col>
                <Form.Group>
                  <Form.Label className="fw-bold">
                    💰 Presupuesto (USD) <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="Ej: 1500"
                    min={VALIDATION_LIMITS.BUDGET.MIN}
                    max={VALIDATION_LIMITS.BUDGET.MAX}
                    step="1"
                    isInvalid={!!errors.budget}
                    size="lg"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.budget}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    {INFO_MESSAGES.BUDGET_INCLUDES}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            {/* Indicador de progreso del formulario */}
            {isFormComplete && (
              <Alert variant="info" className="mb-4 d-flex align-items-center">
                <span className="me-2">✅</span>
                <span>¡Formulario completo! Listo para generar tu itinerario.</span>
              </Alert>
            )}

            {/* Botones de Acción */}
            <Row>
              <Col>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button 
                    variant="outline-secondary" 
                    onClick={resetForm}
                    disabled={isSubmitting || !hasChanges}
                    className="me-md-2"
                    title={!hasChanges ? INFO_MESSAGES.NO_CHANGES_TO_CLEAR : INFO_MESSAGES.CLEAR_FORM}
                  >
                    🔄 Limpiar
                  </Button>
                  
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={isSubmitting || !isFormComplete}
                    size="lg"
                    className="px-4"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Generando...
                      </>
                    ) : (
                      <>🚀 Generar Itinerario</>
                    )}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
        
        {/* Footer informativo */}
        <Card.Footer className="text-muted text-center py-2">
          <small>
            {INFO_MESSAGES.FORM_TIP}
          </small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default TravelForm;