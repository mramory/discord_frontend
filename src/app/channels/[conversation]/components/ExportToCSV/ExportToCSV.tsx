import Button from "@/components/Button/Button";
import { MessageType } from "@/types/Message";

interface IParams {
    data: MessageType[]
}

const ExportToCSV = ({ data }: IParams) => {
    const generateCSV = () => {
      if (!data || !data.length) {
        console.error("No data available for export");
        return;
      }
  
      const headers = Object.keys(data[0]).join(";");
      
      const rows = data.map((row) =>
        Object.values(row)
          .map((value) => {
            if (typeof value === "string") {
              if (value.includes(";") || value.includes(",") || value.includes('"')) {
                return `"${value.replace(/"/g, '""')}"`;
              }
            }
            return value;
          })
          .join(";")
      );
  
      const csvContent = [headers, ...rows].join("\n");
  
      const bom = "\uFEFF";
      const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
  
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "data.csv";
      link.click();
      URL.revokeObjectURL(url);
    };
  
    return (
      <Button onClick={generateCSV}>
        Export to Excel
      </Button>
    );
  };

  export {ExportToCSV}