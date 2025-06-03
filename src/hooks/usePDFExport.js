import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Hook personalizado para exportar itinerarios a PDF
 * Genera PDFs profesionales con diseño premium
 */
export const usePDFExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState('');

  /**
   * Generar PDF desde elemento HTML
   */
  const exportToPDF = async (elementId, filename = 'itinerario') => {
    setIsExporting(true);
    setExportError('');

    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Elemento no encontrado');
      }

      // Configuración para html2canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Mejor calidad
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        height: element.scrollHeight,
        width: element.scrollWidth
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Configuración del PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Dimensiones A4 en mm
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calcular dimensiones para mantener proporción
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Agregar imagen al PDF (dividir en páginas si es necesario)
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Agregar páginas adicionales si es necesario
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // Descargar PDF
      pdf.save(`${filename}.pdf`);

    } catch (error) {
      console.error('Error al exportar PDF:', error);
      setExportError('Error al generar el PDF. Inténtalo de nuevo.');
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  /**
   * Generar PDF con diseño personalizado
   */
  const exportCustomPDF = async (itinerary, filename = 'mi-itineario') => {
    setIsExporting(true);
    setExportError('');

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      // Configurar fuentes y colores
      pdf.setFont('helvetica');
      
      // Header del PDF
      pdf.setFillColor(56, 178, 172); // Color teal
      pdf.rect(0, 0, pageWidth, 40, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.text('Mi Itinerario de Viaje', margin, 25);
      
      pdf.setFontSize(12);
      pdf.text(`Generado el ${new Date().toLocaleDateString('es-ES')}`, margin, 35);

      let yPosition = 60;

      // Información del viaje
      pdf.setTextColor(33, 33, 33);
      pdf.setFontSize(18);
      pdf.text(`Destino: ${itinerary.tripInfo.destination}`, margin, yPosition);
      yPosition += 15;

      pdf.setFontSize(12);
      pdf.text(`Fechas: ${formatDate(itinerary.tripInfo.startDate)} - ${formatDate(itinerary.tripInfo.endDate)}`, margin, yPosition);
      yPosition += 8;
      pdf.text(`Duración: ${itinerary.tripInfo.duration} ${itinerary.tripInfo.duration === 1 ? 'día' : 'días'}`, margin, yPosition);
      yPosition += 8;
      pdf.text(`Viajeros: ${itinerary.tripInfo.travelers}`, margin, yPosition);
      yPosition += 8;
      pdf.text(`Tipo de viaje: ${itinerary.tripInfo.tripType.name}`, margin, yPosition);
      yPosition += 20;

      // Itinerario día por día
      pdf.setFontSize(16);
      pdf.text('Itinerario Detallado', margin, yPosition);
      yPosition += 15;

      for (const day of itinerary.dailyItinerary) {
        // Verificar si necesitamos nueva página
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = 30;
        }

        // Día
        pdf.setFillColor(240, 240, 240);
        pdf.rect(margin, yPosition - 5, contentWidth, 12, 'F');
        pdf.setFontSize(14);
        pdf.setTextColor(33, 33, 33);
        pdf.text(`Día ${day.day}`, margin + 5, yPosition + 3);
        yPosition += 20;

        // Actividades del día
        const timeSlots = [
          { period: 'Mañana', activity: day.morning, icon: '🌅' },
          { period: 'Tarde', activity: day.afternoon, icon: '☀️' },
          { period: 'Noche', activity: day.evening, icon: '🌙' }
        ];

        for (const slot of timeSlots) {
          if (slot.activity) {
            pdf.setFontSize(12);
            pdf.setTextColor(100, 100, 100);
            pdf.text(`${slot.icon} ${slot.period}:`, margin + 10, yPosition);
            
            pdf.setTextColor(33, 33, 33);
            pdf.text(slot.activity.name, margin + 35, yPosition);
            yPosition += 6;
            
            pdf.setFontSize(10);
            pdf.setTextColor(120, 120, 120);
            const description = pdf.splitTextToSize(slot.activity.description, contentWidth - 45);
            pdf.text(description, margin + 35, yPosition);
            yPosition += description.length * 4 + 5;
          }
        }
        yPosition += 10;
      }

      // Información adicional
      if (yPosition > pageHeight - 100) {
        pdf.addPage();
        yPosition = 30;
      }

      pdf.setFontSize(16);
      pdf.setTextColor(33, 33, 33);
      pdf.text('Información Adicional', margin, yPosition);
      yPosition += 15;

      // Alojamiento
      pdf.setFontSize(12);
      pdf.text('🏨 Alojamiento recomendado:', margin, yPosition);
      yPosition += 8;
      pdf.text(itinerary.accommodation.recommended, margin + 10, yPosition);
      yPosition += 15;

      // Costos
      pdf.text('💰 Resumen de costos:', margin, yPosition);
      yPosition += 8;
      pdf.text(`Total estimado: $${itinerary.estimatedCosts.total.toLocaleString()} USD`, margin + 10, yPosition);
      yPosition += 6;
      pdf.text(`Por persona: $${itinerary.estimatedCosts.perPerson.toLocaleString()} USD`, margin + 10, yPosition);

      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Generado por Travel Guide - Tu planificador de viajes premium', margin, pageHeight - 10);

      // Descargar PDF
      pdf.save(`${filename}.pdf`);

    } catch (error) {
      console.error('Error al exportar PDF personalizado:', error);
      setExportError('Error al generar el PDF. Inténtalo de nuevo.');
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  /**
   * Formatear fecha para PDF
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return {
    isExporting,
    exportError,
    exportToPDF,
    exportCustomPDF
  };
}; 