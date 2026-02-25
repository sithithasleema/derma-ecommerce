import type { Metadata } from "next";
import AdminNav from "../components/admin/AdminNav";

export const metadata: Metadata = {
  title:
    "Elite Canvas Australia - Handcrafted Art Prints & Originals - Admin Dashboard",
  description:
    "Explore hand-painted abstract canvases, delicate watercolor florals, and modern Procreate prints. Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-100">
      <div>
        <AdminNav />
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
