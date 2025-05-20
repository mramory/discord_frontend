import { ChangeEvent, useState } from "react";
import { useAdminService } from "@/services/AdminService";

const useUploadUsers = () => {
    const [file, setFile] = useState<File | null>(null);

    const { uploadUsers } = useAdminService();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFile(e.target.files?.[0] ?? null);
    };
  
    const handleUpload = async () => {
      if (!file) {
        return;
      }
      
      uploadUsers(file)
    };              

    return { handleFileChange, handleUpload }
}

export { useUploadUsers };
