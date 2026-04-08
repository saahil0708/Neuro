import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppContext } from '../../context/AppContext';
import { 
  PlayIcon, 
  VideoCameraIcon, 
  UserGroupIcon, 
  SparklesIcon,
} from '@heroicons/react/24/outline';

export default function PatientDashboard() {
  const { user } = useSelector(state => state.auth);
  const { t } = useAppContext();

  const actionCards = [
    {
      title: t("startTherapy"),
      desc: t("therapyDesc"),
      path: "/therapy",
      icon: <PlayIcon className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-blue-600 to-[#00e5ff]"
    },
    {
      title: t("teleRehab"),
      desc: t("teleRehabDesc"),
      path: "/tele-rehab",
      icon: <VideoCameraIcon className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-purple-600 to-[#b000ff]"
    },
    {
      title: t("doctorConsult"),
      desc: t("doctorDesc"),
      path: "/doctor",
      icon: <UserGroupIcon className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-emerald-600 to-teal-400"
    },
    {
      title: t("vrRehab"),
      desc: t("vrDesc"),
      path: "/vr",
      icon: <SparklesIcon className="w-8 h-8 md:w-12 md:h-12" />,
      color: "from-pink-600 to-rose-400"
    }
  ];

  return (
    <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-extrabold text-white font-inter">{t("welcome")}, {user?.name?.split(' ')[0] || 'Patient'}</h1>
        <p className="text-gray-400 mt-2 font-inter">{t("selectActivity")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actionCards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="h-full"
          >
            <Link to={card.path} className="block h-full group text-decoration-none">
              <div className="relative h-full p-6 space-y-4 rounded-2xl border border-white/10 bg-[#161616] overflow-hidden">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${card.color}`}></div>
                <div className={`p-4 rounded-xl w-fit bg-gradient-to-br ${card.color} text-white shadow-lg`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-inter group-hover:text-[#00e5ff] transition-colors">{card.title}</h3>
                  <p className="text-gray-400 text-sm font-inter leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* Additional Analytics / Reports Placeholder */}
      <div className="mt-8 p-8 rounded-2xl border border-white/10 bg-[#161616]">
        <h3 className="text-xl font-bold text-white mb-4">{t("weeklyProgress")}</h3>
        <div className="h-64 w-full flex items-center justify-center border border-dashed border-white/20 rounded-lg bg-black/30">
          <p className="text-gray-500">{t("progressDesc")}</p>
        </div>
      </div>
    </div>
  );
}
