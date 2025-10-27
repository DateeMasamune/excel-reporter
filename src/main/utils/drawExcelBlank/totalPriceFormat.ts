import ExcelJS from "exceljs";

export const totalPriceFormat = (
  footerRows: number[],
  worksheet: ExcelJS.Worksheet
) => {
  const totalSum = footerRows[footerRows.length - 4];
  const totalSumMenu = footerRows[footerRows.length - 5];

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
};
