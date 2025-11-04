import ExcelJS from "exceljs";

export const dateFormat = (
  footerRows: number[],
  worksheet: ExcelJS.Worksheet
) => {
  const dateCreated = footerRows[footerRows.length - 3];
  const dateCreatedCell = worksheet.getCell(`E${dateCreated}`);
  dateCreatedCell.numFmt = "dd.mm.yyyy";
  dateCreatedCell.alignment = {
    horizontal: "center",
    vertical: "middle",
  };
};
