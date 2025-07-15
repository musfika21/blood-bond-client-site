import React from 'react';
import useAuth from '../../CustomHooks/useAuth';
import { Heart } from 'lucide-react';
import DonorHome from './DonorHome';
import AdminHome from './AdminHome';
import { motion } from "framer-motion";
import Loader from '../../shared/Loader';

const Dashboard = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Loader />
  }

  return (
    <div>
      <motion.div
        className="mb-4 px-4 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500 rounded-full shadow-md">
            <Heart className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-red-700">
              Welcome, {currentUser?.name || "Donor"}!
            </h1>
            <p className="text-gray-700 text-sm mt-1">
              Thank you for being a hero — here are your latest donation activities.
            </p>
          </div>
        </div>
      </motion.div>
      {currentUser.role === 'donor' ? (
        <DonorHome />
      ) : (
        <AdminHome />
      )}
    </div>
  );
};

export default Dashboard;
