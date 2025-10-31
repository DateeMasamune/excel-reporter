import ExcelJS from "exceljs";
import { BORDER } from "../../constants";

export const initBorderFooter = (
  footerRows: number[],
  columns: number[],
  worksheet: ExcelJS.Worksheet
) => {
  const { right, bottom, top } = BORDER;
  for (const row of footerRows) {
    for (const col of columns) {
      const legalTextRow = footerRows[footerRows.length - 2];
      const signatureRow = footerRows[footerRows.length - 1];
      const cell = worksheet.getCell(row, col);

      if (row === legalTextRow || row === signatureRow) {
        cell.border = {
          right,
          bottom,
        };
      } else if (col === columns.length) {
        cell.border = BORDER;
      } else
        cell.border = {
          top,
          bottom,
        };
      cell.alignment = {
        wrapText: true,
        vertical: "middle",
      };
    }
  }
};
