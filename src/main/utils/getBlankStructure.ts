import type { Font } from "exceljs";
import { ROW_HEIGHTS, CELL_STYLES, TABLE_CONFIG } from "../constants";
import type { TMenuList } from "../entities/menu-list";

export type IBlankStructure = {
  data: string[];
  height: number;
  isHeader: boolean;
  style: Font;
};

// Вспомогательные функции
const formula = (expr: string) => ({ formula: expr });

const infoRows = [
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
  {
    data: ["Телефон:"],
    height: ROW_HEIGHTS.INFO,
    style: CELL_STYLES.BOLD_12,
  },
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
    data: ["Сумма:", "", "", "", formula(``)],
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
];

const footerRows = [
  {
    data: ["Итого сумма по меню:", "", "", "", formula(``)],
    height: ROW_HEIGHTS.SUMMARY,
    style: CELL_STYLES.BOLD_12,
  },

  // Строка 26: ИТОГО
  {
    data: ["ИТОГО:", "", "", "", formula(``)],
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

const mapMenuList = (menuList: TMenuList) => {
  return menuList.map(({ name, price, count, comment }, index) => ({
    data: [
      name,
      price,
      count,
      formula(
        `B${TABLE_CONFIG.START_ROW + index}*C${TABLE_CONFIG.START_ROW + index}`
      ),
      comment,
    ],
    height: ROW_HEIGHTS.TABLE_ROW,
    style: CELL_STYLES.NOT_BOLD_12,
  }));
};

export const getBlankStructure = (menuList: TMenuList) => {
  // Определение структуры бланка с высотами
  const summFormula = `SUM(E${infoRows.length + menuList.length + 1})`;

  infoRows[infoRows.length - 2] = {
    data: ["Сумма:", formula(summFormula)],
    height: ROW_HEIGHTS.INFO,
    style: CELL_STYLES.BOLD_12,
  };

  footerRows[0] = {
    data: [
      "Итого сумма по меню:",
      "",
      "",
      "",
      formula(
        `SUM(D${infoRows.length + 1}:D${infoRows.length + menuList.length})`
      ),
    ],
    height: ROW_HEIGHTS.SUMMARY,
    style: CELL_STYLES.BOLD_12,
  };

  footerRows[1] = {
    data: ["ИТОГО:", "", "", "", formula(summFormula)],
    height: ROW_HEIGHTS.SUMMARY,
    style: CELL_STYLES.BOLD_12,
  };

  return [
    ...infoRows,
    ...mapMenuList(menuList),
    ...footerRows,
  ] as IBlankStructure[];
};
