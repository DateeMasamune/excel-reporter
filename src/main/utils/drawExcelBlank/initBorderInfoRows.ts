import ExcelJS from "exceljs";
import { BORDER } from "../../constants";

export const initBorderInfoRows = (
  headerRows: number[],
  column: number[],
  worksheet: ExcelJS.Worksheet
) => {
  const firstCol = column[0];
  const secondCol = column[1];
  const { top, bottom, right } = BORDER;

  for (const row of headerRows) {
    const currentCell = worksheet.getCell(row, firstCol);

    if (row === headerRows[headerRows.length - 1]) {
      const lastCell = worksheet.getCell(row, secondCol);
      worksheet.mergeCells(`B${row}:E${row}`);
      lastCell.border = { top, bottom, right };
      lastCell.alignment = {
        horizontal: "center",
        vertical: "middle",
      };
      lastCell.numFmt = "#,##0.00";
      currentCell.border = BORDER;
    } else {
      worksheet.mergeCells(`A${row}:E${row}`);
      currentCell.border = BORDER;
    }
  }
};
