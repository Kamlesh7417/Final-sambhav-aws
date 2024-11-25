import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const convertHtmlToPdf = async (htmlContent: string): Promise<string> => {
  // Create a temporary container
  const container = document.createElement('div');
  container.innerHTML = htmlContent;
  container.style.width = '210mm'; // A4 width
  container.style.padding = '10mm';
  document.body.appendChild(container);

  try {
    // Convert to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    // Convert to PDF
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Convert to base64
    const pdfBase64 = pdf.output('datauristring');
    
    return pdfBase64;
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
};