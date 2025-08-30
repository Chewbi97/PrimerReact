import DashboardContent from "./ComponentsDashboard/DashboardContent/DashboardContent";
import DashboardFooter from "./ComponentsDashboard/DashboardFooter/DashboardFooter";
import DashboardNavbar from "./ComponentsDashboard/DashboardNavbar/DashboardNavbar";
import "./DashboardPage.css"; 

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <DashboardNavbar />
      <DashboardContent />
      <DashboardFooter />
    </div>
  );
}

export default DashboardPage;