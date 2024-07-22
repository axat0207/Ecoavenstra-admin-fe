import AppLayout from "./AppLayout";
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
   <div className="">
    <AppLayout>
      {/* <Table/> */}
      <Dashboard />
    </AppLayout>
   </div>
  );
}
