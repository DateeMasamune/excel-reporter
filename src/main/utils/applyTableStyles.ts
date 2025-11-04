import ExcelJS from "exceljs";
import { TABLE_CONFIG } from "../constants";
import type { IBlankStructure } from "./getBlankStructure";
import {
  initBorderInfoRows,
  initBorderTitleRow,
  initBorderDishRow,
  initBorderFooter,
  numberFormatDishes,
  totalPriceFormat,
  dateFormat,
  wrapDescription,
  mergeCellSignature,
} from "./drawExcelBlank";

/**
 * Применяет дополнительные стили к таблице
 */

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
  numberFormatDishes(dishRows, worksheet);

  // Форматирование итоговых сумм
  totalPriceFormat(footerRows, worksheet);

  // // Форматирование даты
  dateFormat(footerRows, worksheet);

  // Перенос текста для юридического текста
  wrapDescription(footerRows, worksheet);

  // Объединение ячеек для подписей
  mergeCellSignature(footerRows, worksheet);
}
