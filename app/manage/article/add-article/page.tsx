import AppLayout from "@/app/AppLayout";
import AddArticle from "@/components/AddArticle";
import Header from "@/components/Header";
import Table from "@/components/Table";

export default function Home() {
    return (
     <div className="">
        <AppLayout>
      <Header title = {"Article"}/>
      <AddArticle/>
      
        </AppLayout>
     </div>
    );
  }
  