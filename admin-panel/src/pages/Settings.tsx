import { Outlet } from 'react-router-dom';

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Outlet />
    </div>
  );
};

export default Settings;
