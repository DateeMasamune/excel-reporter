import { useRef, useCallback, useEffect } from "react";

export const useFileDownload = () => {
  const previousUrlRef = useRef<string | null>(null);

  const downloadFile = useCallback(
    async (fileName: string, getFileData: () => Promise<ArrayBuffer>) => {
      // Очищаем предыдущий URL
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
        previousUrlRef.current = null;
      }

      try {
        const arrayBuffer = await getFileData();

        if (!arrayBuffer || arrayBuffer.byteLength === 0) {
          throw new Error("Получен пустой файл");
        }

        const blob = new Blob([arrayBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = URL.createObjectURL(blob);
        previousUrlRef.current = url;

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();

        // Очистка
        setTimeout(() => {
          document.body.removeChild(link);
          if (previousUrlRef.current === url) {
            URL.revokeObjectURL(url);
            previousUrlRef.current = null;
          }
        }, 100);
      } catch (error) {
        console.error("Ошибка скачивания:", error);
        throw error;
      }
    },
    []
  );

  const handleDownloadExcel = async (fetchFunc: () => Promise<ArrayBuffer>) => {
    try {
      await downloadFile(
        `бланк_ТОКИО_${new Date().toLocaleDateString("ru-RU").replace(/\./g, "-")}.xlsx`,
        () => fetchFunc()
      );
    } catch (error) {
      console.error("Ошибка:", error);
      alert(`Ошибка при создании бланка: ${error.message}`);
    }
  };

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
      }
    };
  }, []);

  return { handleDownloadExcel };
};
