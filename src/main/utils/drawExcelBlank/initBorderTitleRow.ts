import ExcelJS from "exceljs";
import { BORDER } from "../../constants";

export const initBorderTitleRow = (
  titleRow: number,
  columns: number[],
  worksheet: ExcelJS.Worksheet
) => {
  for (const col of columns) {
    const currentCell = worksheet.getCell(titleRow, col);
    currentCell.border = BORDER;
    currentCell.alignment = {
      wrapText: true,
      vertical: "middle",
      horizontal: "center",
    };
  }
};
