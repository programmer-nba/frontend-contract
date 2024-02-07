<template>
  <div class="flex flex-col justify-center items-center">
    <button @click="printWithMargins">Window print</button>
    <ContractHLNMForm id="pdfContent" />
  </div>
</template>

<script>
import ContractHLNMForm from "../components/HaveMoneyNoLand/ContractHLNMForm.vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas"; // Optional, for complex content

export default {
  methods: {
    generatePDF() {
      // Create a new jsPDF instance
      const doc = new jsPDF();

      // Get the template content
      const content = document.getElementById("pdfContent");

      this.$nextTick(() => {
        html2canvas(content, {
          scale: 1,
          width: content.offsetWidth * 2,
          height: content.offsetHeight * 2,
          useCORS: true,
          imageTimeout: 5000,
          allowTaint: true,
          logging: true,
          imageSmoothingEnabled: true,
          imageSmoothingQuality: "high",
        })
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            doc.addImage(imgData, "PNG", 0, 0);
            // Save the PDF and open in a new tab
            const pdfBlob = doc.output("blob");
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, "_blank");
            //doc.save('generated_pdf.pdf');
          })
          .catch((error) => {
            console.error("Error generating PDF:", error);
          });
      });
    },
    printWithMargins() {
      // Set the margins for the printed page
      const style = `
        @page {
          size: auto; /* or specify a paper size like A4 */
          margin: 1cm;
          margin-top: 2cm; /* Adjust this value as needed */
        }
      `;

      // Create a new style element
      const styleElement = document.createElement('style');
      styleElement.innerHTML = style;

      // Append the style element to the document head
      document.head.appendChild(styleElement);

      // Call the window.print function
      window.print();

      // Remove the style element after printing
      document.head.removeChild(styleElement);
    },
    printSpecificElement() {
      // Create a new window with a print-specific stylesheet
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
          </head>
          <body>
            ${document.getElementById('pdfContent').outerHTML}
          </body>
        </html>
      `);

      // Close the print window after printing
      printWindow.onafterprint = function () {
        printWindow.close();
      };

      // Call the window.print function
      printWindow.print();
    }
  },
  components: {
    ContractHLNMForm,
  },
};
</script>

<style scoped></style>
