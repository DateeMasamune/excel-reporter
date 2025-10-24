import ExcelJS, { type Style } from "exceljs";
import { TABLE_CONFIG } from "../constants";
import type { IBlankStructure } from "./getBlankStructure";

/**
 * Применяет дополнительные стили к таблице
 */

const border = {
  top: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
  left: { style: "thin" },
} as Style["border"];

const initBorderInfoRows = (
  headerRows: number[],
  column: number[],
  worksheet: ExcelJS.Worksheet
) => {
  const firstCol = column[0];
  const secondCol = column[1];
  const { top, bottom, right } = border;

  for (const row of headerRows) {
    const currentCell = worksheet.getCell(row, firstCol);

    if (row === headerRows[headerRows.length - 1]) {
      const lastCell = worksheet.getCell(row, secondCol);
      worksheet.mergeCells(`B${row}:E${row}`);
      lastCell.border = { top, bottom, right };
      currentCell.border = border;
    } else {
      worksheet.mergeCells(`A${row}:E${row}`);
      currentCell.border = border;
    }
  }
};

const initBorderDishRow = (
  columns: number[],
  dishRows: number[],
  worksheet: ExcelJS.Worksheet
) => {
  for (const row of dishRows) {
    for (const col of columns) {
      const cell = worksheet.getCell(row, col);
      cell.border = border;
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
  const { right, bottom, top } = border;
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
        cell.border = border;
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

const initBorderTitleRow = (
  titleRow: number,
  columns: number[],
  worksheet: ExcelJS.Worksheet
) => {
  for (const col of columns) {
    const currentCell = worksheet.getCell(titleRow, col);
    currentCell.border = border;
    currentCell.alignment = {
      wrapText: true,
      vertical: "middle",
      horizontal: "center",
    };
  }
};

export function applyTableStyles(
  worksheet: ExcelJS.Worksheet,
  blankStructure: IBlankStructure[]
) {
  const headerRows = blankStructure.slice(0, 8).map((_, index) => index + 1);
  const footerRows = blankStructure.map((_, index) => index + 1).slice(-5);
  const columns = TABLE_CONFIG.COLUMNS.map((_, index) => index + 1);
  const titleRow = headerRows.length + 1;
  const dishRows = Array.from(
    {
      length: blankStructure.length - headerRows.length - footerRows.length - 1, //title,
    },
    (_, i) => i + headerRows.length + 1 + 1 //title
  );

  //Покраска границ информационного блока
  initBorderInfoRows(headerRows, columns, worksheet);

  //Границы заголовка
  initBorderTitleRow(titleRow, columns, worksheet);

  // Границы для таблицы (строки 10-23)
  initBorderDishRow(columns, dishRows, worksheet);

  //Границы для футера таблицы
  initBorderFooter(footerRows, columns, worksheet);

  // Форматирование чисел в таблице
  for (const row of dishRows) {
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
  const totalSum = footerRows[footerRows.length - 4];
  const totalSumMenu = footerRows[footerRows.length - 5];
  const dateCreated = footerRows[footerRows.length - 3];

  const eRow1 = worksheet.getCell(`E${totalSum}`);
  const eRow2 = worksheet.getCell(`E${totalSumMenu}`);

  eRow1.numFmt = "#,##0.00";
  eRow2.numFmt = "#,##0.00";

  [eRow1, eRow2].forEach((row) => {
    row.alignment = {
      vertical: "middle",
      horizontal: "center",
    };
  });

  // // Форматирование даты
  worksheet.getCell(`E${dateCreated}`).numFmt = "dd.mm.yyyy";

  // Перенос текста для юридического текста
  const legalTextRow = footerRows[footerRows.length - 2];

  worksheet.getCell(`A${legalTextRow}`).alignment = {
    wrapText: true,
    vertical: "middle",
    horizontal: "center",
  };
  worksheet.mergeCells(`A${legalTextRow}:E${legalTextRow}`);

  // Объединение ячеек для подписей
  const signatureRow = footerRows[footerRows.length - 1];

  worksheet.mergeCells(`A${signatureRow}:C${signatureRow}`);
  worksheet.mergeCells(`D${signatureRow}:E${signatureRow}`);
  worksheet.getCell(`A${signatureRow}`).alignment = { horizontal: "left" };
  worksheet.getCell(`D${signatureRow}`).alignment = { horizontal: "left" };
}
