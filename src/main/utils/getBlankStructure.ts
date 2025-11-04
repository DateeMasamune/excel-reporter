import type { Font } from "exceljs";
import { ROW_HEIGHTS, CELL_STYLES, TABLE_CONFIG } from "../constants";
import type { InfoRow, Order, TMenuList } from "../entities/menu-list";

export type IBlankStructure = {
  data: string[];
  height: number;
  isHeader: boolean;
  style: Font;
};

// Вспомогательные функции
const formula = (expr: string) => ({ formula: expr });

const infoRows = (rows: InfoRow) => {
  const { restaurant, date, name, phone, persons, employee } = rows;

  return [
    // Строка 1: Логотип (обрабатывается отдельно)
    { data: [""], height: ROW_HEIGHTS.LOGO },

    // Информационный блок (строки 3-8)
    {
      data: [`Ресторан: ${restaurant}`],
      height: ROW_HEIGHTS.INFO,
      style: CELL_STYLES.BOLD_12,
    },
    {
      data: [`Дата и время мероприятия: ${date}`],
      height: ROW_HEIGHTS.INFO,
      style: CELL_STYLES.BOLD_12,
    },
    {
      data: [`Имя контактного лица: ${name}`],
      height: ROW_HEIGHTS.INFO,
      style: CELL_STYLES.BOLD_12,
    },
    {
      data: [`Телефон: ${phone}`],
      height: ROW_HEIGHTS.INFO,
      style: CELL_STYLES.BOLD_12,
    },
    {
      data: [`Кол-во персон: ${persons}`],
      height: ROW_HEIGHTS.INFO,
      style: CELL_STYLES.BOLD_12,
    },
    {
      data: [`П/З принял (сотрудник): ${employee}`],
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
};

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

export const getBlankStructure = (order: Order) => {
  // Определение структуры бланка с высотами
  const { dishList, ...rest } = order;
  const rows = infoRows(rest);

  const summFormula = `SUM(E${rows.length + dishList.length + 1})`;

  rows[rows.length - 2] = {
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
        `SUM(D${rows.length + 1}:D${rows.length + dishList.length})`
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
    ...rows,
    ...mapMenuList(dishList),
    ...footerRows,
  ] as IBlankStructure[];
};
