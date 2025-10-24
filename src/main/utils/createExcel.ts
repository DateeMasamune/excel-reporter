import ExcelJS from "exceljs";
import logo from "../assets/images/logo.png";

import { applyTableStyles } from "./applyTableStyles";
import { applyBlankStructure } from "./applyBlankStructure";
import { getLogoAsArrayBuffer } from "./getLogoAsArrayBuffer";
import { logger } from "../logger";

const pixToPoint = (height: number) => height * 0.75;

const calcWidthCol = (originalPixels: number[]) =>
  originalPixels.map((pixels) => ({
    width: Math.round(Math.max(1, pixels / 7.5)), // 7.5 - среднее значение
  }));

const columnWidths = [304, 103, 83, 92, 133];

// Конфигурация высот строк
export const ROW_HEIGHTS = {
  LOGO: pixToPoint(228), // Строка с логотипом
  EMPTY: 5, // Пустые строки
  INFO: pixToPoint(33), // Информационные строки
  SUMMARY: 25, // Строки с суммами
  TABLE_HEADER: pixToPoint(40), // Заголовок таблицы
  TABLE_ROW: pixToPoint(40), // Строки таблицы
  LEGAL_TEXT: pixToPoint(64), // Юридический текст
  SIGNATURE: pixToPoint(54), // Строка с подписями
};

// Конфигурация таблицы
export const TABLE_CONFIG = {
  START_ROW: 10,
  TOTAL_ROWS: 14,
  COLUMNS: ["Позиция", "Стоимость", "Кол-во", "Сумма", "Комментарий к подаче"],
};

const BASE_FONT = {
  name: "Times New Roman",
};

const CELL_STYLES = {
  BOLD_12: { bold: true, size: 12, ...BASE_FONT },
  NOT_BOLD_12: { size: 12, ...BASE_FONT },
  BOLD: { bold: true, ...BASE_FONT },
  ITALIC: { italic: true, ...BASE_FONT },
  WRAP_TEXT: { wrapText: true },
  SIZE_10: { size: 10, ...BASE_FONT },
};

// Вспомогательные функции
const formula = (expr: string) => ({ formula: expr });

// Определение структуры бланка с высотами
export const BLANK_STRUCTURE = [
  // Строка 1: Логотип (обрабатывается отдельно)
  { data: [""], height: ROW_HEIGHTS.LOGO },

  // Информационный блок (строки 3-8)
  {
    data: ["Ресторан: Токио-Сити"],
    height: ROW_HEIGHTS.INFO,
    style: CELL_STYLES.BOLD_12,
  },
  {
    data: ["Дата и время мероприятия:"],
    height: ROW_HEIGHTS.INFO,
    style: CELL_STYLES.BOLD_12,
  },
  {
    data: ["Имя контактного лица:"],
    height: ROW_HEIGHTS.INFO,
    style: CELL_STYLES.BOLD_12,
  },
  { data: ["Телефон:"], height: ROW_HEIGHTS.INFO, style: CELL_STYLES.BOLD_12 },
  {
    data: ["Кол-во персон:"],
    height: ROW_HEIGHTS.INFO,
    style: CELL_STYLES.BOLD_12,
  },
  {
    data: ["П/З принял (сотрудник):"],
    height: ROW_HEIGHTS.INFO,
    style: CELL_STYLES.BOLD_12,
  },

  // Строка 9: Сумма
  {
    data: [
      "Сумма:",
      "",
      "",
      "",
      formula(`SUM(E${TABLE_CONFIG.START_ROW + TABLE_CONFIG.TOTAL_ROWS + 1})`),
    ],
    height: ROW_HEIGHTS.INFO,
    style: CELL_STYLES.BOLD_12,
  },

  // Строка 10: Заголовок таблицы
  {
    data: TABLE_CONFIG.COLUMNS,
    height: ROW_HEIGHTS.TABLE_HEADER,
    isHeader: true,
    style: CELL_STYLES.BOLD_12,
  },

  // Строки 11-24: Данные таблицы (14 строк)
  ...Array(TABLE_CONFIG.TOTAL_ROWS)
    .fill(null)
    .map((_, index) => ({
      data: [
        "",
        0,
        1,
        formula(
          `B${TABLE_CONFIG.START_ROW + index}*C${TABLE_CONFIG.START_ROW + index}`
        ),
        "",
      ],
      height: ROW_HEIGHTS.TABLE_ROW,
      style: CELL_STYLES.NOT_BOLD_12,
    })),

  // Строка 25: Итого сумма по меню
  {
    data: [
      "Итого сумма по меню:",
      "",
      "",
      "",
      formula(
        `SUM(D${TABLE_CONFIG.START_ROW}:D${TABLE_CONFIG.START_ROW + TABLE_CONFIG.TOTAL_ROWS - 1})`
      ),
    ],
    height: ROW_HEIGHTS.SUMMARY,
    style: CELL_STYLES.BOLD_12,
  },

  // Строка 26: ИТОГО
  {
    data: [
      "ИТОГО:",
      "",
      "",
      "",
      formula(`SUM(E${TABLE_CONFIG.START_ROW + TABLE_CONFIG.TOTAL_ROWS})`),
    ],
    height: ROW_HEIGHTS.SUMMARY,
    style: CELL_STYLES.BOLD_12,
  },

  // Строка 27: Дата составления
  {
    data: ["Дата составления:", "", "", "", formula("TODAY()")],
    height: ROW_HEIGHTS.INFO,
    style: CELL_STYLES.BOLD_12,
  },

  // Строка 28: Юридический текст
  {
    data: [
      "* В связи с вступлением в силу закона п.19 Постановление Правительства РФ от 21.09.2020 №1515 «Об утверждении Правил оказания услуг общественного питания» с 01.01.2021. подтверждаю, что ознакомлен и согласен с порядком и стоимостью организации досуга в ресторане*",
    ],
    height: ROW_HEIGHTS.LEGAL_TEXT,
    style: CELL_STYLES.SIZE_10,
  },

  // Строка 29: Подписи
  {
    data: [
      "(ФИО гостя)_____________________________",
      "",
      "",
      "(подпись) _______________________",
    ],
    height: ROW_HEIGHTS.SIGNATURE,
    style: CELL_STYLES.BOLD_12,
  },
];

/**
 * Создает бланк ТОКИО в формате Excel
 */
export async function createExcel(): Promise<Buffer> {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Лист1");

    logger.info("Создание бланка ТОКИО...");

    // Настройка ширины колонок
    worksheet.columns = calcWidthCol(columnWidths);

    // Добавляем логотип
    try {
      logger.info(" Добавление логотипа...");
      const logoBuffer = getLogoAsArrayBuffer(logo);

      const imageId = workbook.addImage({
        buffer: logoBuffer,
        extension: "png",
      });

      // Вставляем изображение в первую строку
      // worksheet.addImage(imageId, {
      //   tl: { col: 0, row: 0 },
      //   ext: { width: 911, height: 280 },
      // });

      logger.info("Логотип добавлен");
    } catch (imageError) {
      console.error("Ошибка при добавлении логотипа:", imageError);
    }

    // Применяем структуру бланка
    logger.info(" Применение структуры бланка...");
    applyBlankStructure(worksheet);

    // Применяем дополнительные стили
    logger.info(" Применение стилей...");
    applyTableStyles(worksheet);

    // Создаем дополнительные пустые листы
    workbook.addWorksheet("Лист2");
    workbook.addWorksheet("Лист3");

    // Генерируем буфер
    logger.info(" Генерация Excel файла...");
    const buffer = await workbook.xlsx.writeBuffer();

    logger.info(" Бланк успешно создан, размер:", buffer.length, "байт");
    return Buffer.from(buffer);
  } catch (error) {
    console.error("❌ Ошибка создания бланка ТОКИО:", error);
    throw new Error(`Не удалось создать бланк: ${error.message}`);
  }
}

/**
 * Создает бланк ТОКИО в формате Excel
 */
/*
export async function createExcel(
  event: Electron.IpcMainInvokeEvent
): Promise<Buffer> {
  try {
    const workbook = new ExcelJS.Workbook();
    const arrayBuffer = getLogoAsArrayBuffer(logo);

    const imageId = workbook.addImage({
      buffer: arrayBuffer,
      extension: "png",
    });

    // Основной лист
    const worksheet = workbook.addWorksheet("Лист1");
    const rowHeight1 = 228 * 0.75;
    const rowHeight2 = 33 * 0.75;
    const rowHeight3 = 54 * 0.75;

    console.log(
      "=========>worksheet.getRow(1)",
      (worksheet.getRow(1).height = 228 * 0.75)
    );

    worksheet.addImage(imageId, {
      tl: { col: 0, row: 0 }, // верхний левый угол - A1
      ext: { width: 911, height: 280 }, // нижний правый угол - C1 (растягиваем на 3 колонки)
    });
    // const anchor = new Anchor({
    //   col: 5,
    //   row: 5,
    //   nativeCol: 5,
    //   nativeRow: 5,
    //   nativeColOff: 5,
    //   nativeRowOff: 5,
    // });
    // worksheet.addImage(imageId, {
    //   tl: anchor, // верхний левый угол - A1
    //   br: anchor, // нижний правый угол - C1 (растягиваем на 3 колонки)
    // });

    // Настраиваем ширину колонок
    worksheet.columns = [
      { width: 304 }, // A - широкая колонка для текста
      { width: 103 }, // B
      { width: 83 }, // C
      { width: 92 }, // D
      { width: 133 }, // E
    ];

    // Заполняем данные бланка
    const rows = createRows();

    // Заполняем worksheet
    rows.forEach((row, rowIndex) => {
      const worksheetRow = worksheet.getRow(rowIndex + 1);

      row.forEach((cellValue, colIndex) => {
        const cell = worksheetRow.getCell(colIndex + 1);

        if (typeof cellValue === "object" && cellValue.formula) {
          cell.value = { formula: cellValue.formula };
        } else {
          cell.value = cellValue;
        }
      });
    });

    // Применяем стили
    // Заголовок ресторана
    worksheet.getCell("A2").font = { bold: true, size: 12 };

    // Заголовок таблицы (строка 9)
    const headerRow = worksheet.getRow(9);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      //   fgColor: { argb: "FFE6E6FA" }, // Лавандовый фон
    };
    headerRow.alignment = { horizontal: "center", vertical: "middle" };

    // Строка с итогами
    worksheet.getCell("A24").font = { bold: true };
    worksheet.getCell("A25").font = { bold: true };

    // Юридический текст
    worksheet.getCell("A27").font = { size: 9, italic: true };
    worksheet.mergeCells("A27:E27");
    worksheet.getCell("A27").alignment = { wrapText: true };

    // Подпись
    worksheet.mergeCells("A28:C28");
    worksheet.mergeCells("D28:E28");
    worksheet.getCell("A28").alignment = { horizontal: "center" };
    worksheet.getCell("D28").alignment = { horizontal: "center" };

    // Добавляем границы для таблицы
    for (let row = 9; row <= 23; row++) {
      for (let col = 1; col <= 5; col++) {
        const cell = worksheet.getCell(row, col);
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      }
    }

    // Форматируем числовые ячейки
    for (let row = 10; row <= 23; row++) {
      worksheet.getCell(`B${row}`).numFmt = "#,##0.00";
      worksheet.getCell(`D${row}`).numFmt = "#,##0.00";
    }
    worksheet.getCell("E24").numFmt = "#,##0.00";
    worksheet.getCell("E25").numFmt = "#,##0.00";

    // Форматируем дату
    worksheet.getCell("E26").numFmt = "dd.mm.yyyy";

    // Создаем дополнительные пустые листы
    workbook.addWorksheet("Лист2");
    workbook.addWorksheet("Лист3");

    // Генерируем буфер
    const buffer = await workbook.xlsx.writeBuffer();

    return Buffer.from(buffer);
  } catch (error) {
    console.error("Error creating Tokio blank:", error);
    throw new Error(`Failed to create Tokio blank: ${error.message}`);
  }
}
*/
