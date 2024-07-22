import AppLayout from "@/app/AppLayout";
import Header from "@/components/Header";
import Table from "@/components/Table";

export default function Home() {
  return (
    <div className="">
      <AppLayout>
        <Header title={"Article"} />
        <Table />
      </AppLayout>
    </div>
  );
}
