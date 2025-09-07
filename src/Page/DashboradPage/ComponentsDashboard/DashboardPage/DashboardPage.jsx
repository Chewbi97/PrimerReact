import { useAuthState } from 'react-firebase-hooks/auth';  
import { auth } from '../../../../firebase';
import userDefault from '../../../../assets/user.png'
import DashboardContent from '../DashboardContent/DashboardContent';

function DashboardPage() {
  const [user] = useAuthState(auth);
  const userPhoto = user?.photoURL || userDefault;

  return (
    <div className="dashboard-page">
      <DashboardContent />
    </div>
  );
}

export default DashboardPage;