import ExcelJS from "exceljs";

export const wrapDescription = (
  footerRows: number[],
  worksheet: ExcelJS.Worksheet
) => {
  const legalTextRow = footerRows[footerRows.length - 2];

  worksheet.getCell(`A${legalTextRow}`).alignment = {
    wrapText: true,
    vertical: "middle",
    horizontal: "center",
  };
  worksheet.mergeCells(`A${legalTextRow}:E${legalTextRow}`);
};
