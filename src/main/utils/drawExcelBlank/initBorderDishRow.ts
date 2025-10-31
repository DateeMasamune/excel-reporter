import ExcelJS from "exceljs";
import { BORDER } from "../../constants";

export const initBorderDishRow = (
  columns: number[],
  dishRows: number[],
  worksheet: ExcelJS.Worksheet
) => {
  for (const row of dishRows) {
    for (const col of columns) {
      const cell = worksheet.getCell(row, col);
      cell.border = BORDER;
      cell.alignment = {
        wrapText: true,
        vertical: "middle",
      };
    }
  }
};
