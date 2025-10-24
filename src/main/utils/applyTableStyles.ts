import { BLANK_STRUCTURE, TABLE_CONFIG } from "./createExcel";
import ExcelJS, { type Style } from "exceljs";

/**
 * Применяет дополнительные стили к таблице
 */

const initBorderInfoRows = (
  columns: number[],
  headerRows: number[],
  worksheet: ExcelJS.Worksheet
) => {
  for (const row of headerRows) {
    for (const col of columns) {
      const currentCell = worksheet.getCell(row, col);
      currentCell.alignment = {
        wrapText: true,
        vertical: "middle",
      };

      const closeBorder = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      } as Style["border"];

      if (col === columns.length) {
        currentCell.border = closeBorder;
      } else if (row === headerRows.length && col === 1) {
        currentCell.border = closeBorder;
      } else {
        currentCell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
        };
      }
    }
  }
};

const initBorderDishRow = (columns: number[], worksheet: ExcelJS.Worksheet) => {
  for (
    let row = TABLE_CONFIG.START_ROW;
    row < TABLE_CONFIG.START_ROW + TABLE_CONFIG.TOTAL_ROWS;
    row++
  ) {
    for (const col of columns) {
      const cell = worksheet.getCell(row, col);
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = {
        wrapText: true,
        vertical: "middle",
      };
    }
  }
};

const initBorderFooter = (
  footerRows: number[],
  columns: number[],
  worksheet: ExcelJS.Worksheet
) => {
  for (const row of footerRows) {
    for (const col of columns) {
      const legalTextRow = footerRows[footerRows.length - 2];
      const signatureRow = footerRows[footerRows.length - 1];
      const cell = worksheet.getCell(row, col);

      if (row === legalTextRow || row === signatureRow) {
        cell.border = {
          right: { style: "thin" },
          bottom: { style: "thin" },
        };
      } else if (col === columns.length) {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      } else
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
        };
      cell.alignment = {
        wrapText: true,
        vertical: "middle",
      };
    }
  }
};

const initBorderTitleRow = (
  titleRow: number,
  columns: number[],
  worksheet: ExcelJS.Worksheet
) => {
  for (const col of columns) {
    const currentCell = worksheet.getCell(titleRow, col);
    currentCell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    currentCell.alignment = {
      wrapText: true,
      vertical: "middle",
      horizontal: "center",
    };
  }
};

export function applyTableStyles(worksheet: ExcelJS.Worksheet) {
  const headerRows = BLANK_STRUCTURE.slice(0, 8).map((_, index) => index + 1);
  const footerRows = BLANK_STRUCTURE.slice(-5)
    .map(
      (_, index) => index + 1 + TABLE_CONFIG.TOTAL_ROWS + headerRows.length + 1
    )
    .slice(-5);
  const columns = TABLE_CONFIG.COLUMNS.map((_, index) => index + 1);
  const titleRow = headerRows.length + 1;

  //Покраска границ информационного блока
  initBorderInfoRows(columns, headerRows, worksheet);

  //Границы заголовка
  initBorderTitleRow(titleRow, columns, worksheet);

  // Границы для таблицы (строки 10-23)
  initBorderDishRow(columns, worksheet);

  //Границы для футера таблицы
  initBorderFooter(footerRows, columns, worksheet);

  // Форматирование чисел в таблице
  for (
    let row = TABLE_CONFIG.START_ROW;
    row < TABLE_CONFIG.START_ROW + TABLE_CONFIG.TOTAL_ROWS;
    row++
  ) {
    const rowB = worksheet.getCell(`B${row}`);
    const rowD = worksheet.getCell(`D${row}`);
    [rowB, rowD].forEach((row) => {
      row.numFmt = "#,##0.00";
      row.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    });
    worksheet.getCell(`B${row}`).numFmt = "#,##0.00";
    worksheet.getCell(`D${row}`).numFmt = "#,##0.00";
  }

  // Форматирование итоговых сумм
  const totalRow1 = TABLE_CONFIG.START_ROW + TABLE_CONFIG.TOTAL_ROWS;
  const totalRow2 = totalRow1 + 1;

  const eRow1 = worksheet.getCell(`E${totalRow1}`);
  const eRow2 = worksheet.getCell(`E${totalRow2}`);

  eRow1.numFmt = "#,##0.00";
  eRow2.numFmt = "#,##0.00";

  [eRow1, eRow2].forEach((row) => {
    row.alignment = {
      vertical: "middle",
      horizontal: "center",
    };
  });

  // // Форматирование даты
  worksheet.getCell(`E${totalRow2 + 1}`).numFmt = "dd.mm.yyyy";

  // Перенос текста для юридического текста
  const legalTextRow = totalRow2 + 2;
  worksheet.getCell(`A${legalTextRow}`).alignment = {
    wrapText: true,
    vertical: "middle",
    horizontal: "center",
  };
  worksheet.mergeCells(`A${legalTextRow}:E${legalTextRow}`);

  // Объединение ячеек для подписей
  const signatureRow = legalTextRow + 1;
  worksheet.mergeCells(`A${signatureRow}:C${signatureRow}`);
  worksheet.mergeCells(`D${signatureRow}:E${signatureRow}`);
  worksheet.getCell(`A${signatureRow}`).alignment = { horizontal: "left" };
  worksheet.getCell(`D${signatureRow}`).alignment = { horizontal: "left" };
}
