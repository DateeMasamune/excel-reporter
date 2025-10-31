import ExcelJS from "exceljs";
import type { IBlankStructure } from "./getBlankStructure";

/**
 * Применяет структуру бланка к worksheet
 */
export function applyBlankStructure(
  worksheet: ExcelJS.Worksheet,
  blankStructure: IBlankStructure[]
) {
  blankStructure.forEach((rowDef, index) => {
    const rowNumber = index + 1;
    const row = worksheet.getRow(rowNumber);
    // Заполняем данные
    rowDef.data.forEach((cellValue, colIndex) => {
      const cell = row.getCell(colIndex + 1);
      cell.value = cellValue;

      // Применяем стиль к ячейке, если он указан
      if (rowDef.style) {
        cell.font = rowDef.style;
      }
    });

    // Применяем высоту
    row.height = rowDef.height;

    row.commit();
  });
}
