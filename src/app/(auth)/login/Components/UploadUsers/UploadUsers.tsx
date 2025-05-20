"use client"

import { useUploadUsers } from "./UseUploadUsers";
import Button from "@/components/Button/Button";
import { AdminRoleGuard } from "@/guards/RoleGuard";

const UploadUsers = () => {
    const { handleFileChange, handleUpload } = useUploadUsers();

    return (
      <AdminRoleGuard>
        <input type="file" accept=".json" onChange={handleFileChange} />

        <Button onClick={handleUpload} style={{ marginTop: "10px", padding: "10px 20px" }}>
          Загрузить
        </Button>
      </AdminRoleGuard>
    )
}

export { UploadUsers };
