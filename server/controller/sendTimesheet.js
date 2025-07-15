import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendTimesheetPDF = async (req, res) => {
  try {
    const { name, date, tasks } = req.body;

    const timesheetDir = path.join(__dirname, '../timesheets');
    if (!fs.existsSync(timesheetDir)) fs.mkdirSync(timesheetDir, { recursive: true });

    const filePath = path.join(timesheetDir, `timesheet-${Date.now()}.pdf`);
    const doc = new PDFDocument({ margin: 40 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // ===== HEADER =====
    doc
      .font('Helvetica-Bold')
      .fontSize(24)
      .fillColor('#0b3d91')
      .text('TIMESHEET REPORT', { align: 'center' });

    doc.moveDown(1);

    // ===== EMPLOYEE DETAILS =====
    doc
      .fontSize(12)
      .fillColor('black')
      .font('Helvetica-Bold')
      .text(`Employee: `, { continued: true })
      .font('Helvetica')
      .text(`${name}`);

    doc
      .font('Helvetica-Bold')
      .text(`Date Submitted: `, { continued: true })
      .font('Helvetica')
      .text(`${date}`);

    doc.moveDown(1);

    // ===== TABLE HEADER =====
    const headers = ['No', 'Date', 'Clock In', 'Clock Out', 'Hours', 'Task Description'];
    const colWidths = [30, 80, 70, 70, 50, 220];
    const startX = 40;
    let startY = doc.y;

    doc.fontSize(11).fillColor('#0b3d91').font('Helvetica-Bold');
    headers.forEach((header, i) => {
      doc.text(header, startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0), startY, {
        width: colWidths[i],
        align: 'left',
      });
    });

    // Line below headers
    doc.moveTo(startX, startY + 18).lineTo(560, startY + 18).stroke();

    // ===== TABLE ROWS =====
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica').fillColor('black');

    tasks.forEach((task, index) => {
      const rowY = doc.y;
      const values = [
        index + 1,
        task.date || '-',
        task.clockIn || '-',
        task.clockOut || '-',
        task.workedHours || '0.00',
        task.taskDescription || 'N/A',
      ];

      values.forEach((value, i) => {
        doc.text(String(value), startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0), rowY, {
          width: colWidths[i],
          align: 'left',
        });
      });

      doc.moveDown(1.2);
    });

    // ===== FOOTER / END =====
    doc.moveDown(2);
    doc.fontSize(10).fillColor('#888888').text('End of Report', { align: 'center' });

    doc.end();

    stream.on('finish', async () => {
      try {
        const transporter = nodemailer.createTransport({
          service: '',
          auth: {
            user: '',
            pass: '',
          },
        });

        await transporter.sendMail({
          from: 'senunideepna83@gmail.com',
          to: 'senunideepna2005@gmail.com',
          subject: `Timesheet Submitted - ${name}`,
          text: `Please find attached the timesheet for ${name} on ${date}.`,
          attachments: [{ filename: 'timesheet.pdf', path: filePath }],
        });

        fs.unlinkSync(filePath);
        res.status(200).json({ message: '✅ Timesheet sent successfully!' });
      } catch (emailErr) {
        console.error('❌ Email send failed:', emailErr);
        res.status(500).json({ error: 'Failed to send email with PDF.' });
      }
    });

    stream.on('error', (err) => {
      console.error('❌ Stream error:', err);
      res.status(500).json({ error: 'Failed to generate PDF stream.' });
    });
  } catch (err) {
    console.error('❌ Main handler error:', err);
    res.status(500).json({ error: 'Failed to send timesheet.' });
  }
};
