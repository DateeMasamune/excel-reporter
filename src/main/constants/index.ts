const pixToPoint = (height: number) => height * 0.75;

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
  FOOTER_ROW_COUNT: 5,
  COLUMNS: ["Позиция", "Стоимость", "Кол-во", "Сумма", "Комментарий к подаче"],
};

const BASE_FONT = {
  name: "Times New Roman",
};

export const CELL_STYLES = {
  BOLD_12: { bold: true, size: 12, ...BASE_FONT },
  NOT_BOLD_12: { size: 12, ...BASE_FONT },
  BOLD: { bold: true, ...BASE_FONT },
  ITALIC: { italic: true, ...BASE_FONT },
  WRAP_TEXT: { wrapText: true },
  SIZE_10: { size: 10, ...BASE_FONT },
};

export const COLUMN_WIDTH = [304, 103, 83, 92, 133];
