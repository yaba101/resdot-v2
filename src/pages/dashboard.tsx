import Header from "@/components/Header";
import RoomList from "@/components/RoomList";

const Dashboard = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <RoomList />
    </div>
  );
};

export default Dashboard;
