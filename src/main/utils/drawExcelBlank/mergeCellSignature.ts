import ExcelJS from "exceljs";

export const mergeCellSignature = (
  footerRows: number[],
  worksheet: ExcelJS.Worksheet
) => {
  const signatureRow = footerRows[footerRows.length - 1];

  worksheet.mergeCells(`A${signatureRow}:C${signatureRow}`);
  worksheet.mergeCells(`D${signatureRow}:E${signatureRow}`);
  worksheet.getCell(`A${signatureRow}`).alignment = { horizontal: "left" };
  worksheet.getCell(`D${signatureRow}`).alignment = { horizontal: "left" };
};
