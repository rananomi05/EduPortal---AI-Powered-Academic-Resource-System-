import StudentNavbar from "@/app/component/StudentNavbar";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <StudentNavbar />
            <main className="p-4">{children}</main>
        </div>
    );
}