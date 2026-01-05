// og
// "use client";
// import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react';
// import { motion } from 'framer-motion';
// import {
//   UserPlus,
//   CalendarCheck2,
//   Database,
//   LogOut,
//   ChevronRight,
//   Sparkles
// } from 'lucide-react';

// export default function HomePage() {
//   const { data: session } = useSession();

//   const menuItems = [
//     {
//       title: "Registration",
//       desc: "Enroll New Balaks",
//       icon: <UserPlus className="w-6 h-6" />,
//       link: "/registration",
//       color: "bg-blue-500",
//       shadow: "shadow-blue-200"
//     },
//     {
//       title: "Attendance",
//       desc: "Mark Sunday Sabha",
//       icon: <CalendarCheck2 className="w-6 h-6" />,
//       link: "/attendance",
//       color: "bg-indigo-600",
//       shadow: "shadow-indigo-200"
//     },
//     {
//       title: "Database",
//       desc: "Profiles & Records",
//       icon: <Database className="w-6 h-6" />,
//       link: "/data",
//       color: "bg-emerald-500",
//       shadow: "shadow-emerald-200"
//     }
//   ];

//   const containerVars = {
//     animate: { transition: { staggerChildren: 0.1 } }
//   };

//   const itemVars = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 }
//   };

//   return (
//     /* Changed to flex-col and min-h-screen to enable "spacer" logic */
//     <div className="min-h-screen bg-[#F8F8F7] flex flex-col font-sans">

//       {/* Scrollable Content Wrapper */}
//       <div className="flex-1">
//         {/* Top Profile Bar */}
//         <header className="px-6 pt-12 pb-8 flex justify-between items-center">
//           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
//             <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] mb-3">
//               {session?.user?.area || "Mandal"}
//             </p>
//             <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
//               Jai Swaminarayan, <span className="text-indigo-600">{session?.user?.name?.split(' ')[0]}</span>
//             </h1>
//           </motion.div>

//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={() => signOut()}
//             className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400"
//           >
//             <LogOut className="w-5 h-5" />
//           </motion.button>
//         </header>

//         {/* Action Grid */}
//         <motion.div
//           variants={containerVars}
//           initial="initial"
//           animate="animate"
//           className="px-6 space-y-4"
//         >
//           {menuItems.map((item, idx) => (
//             <Link href={item.link} key={idx} className="block">
//               <motion.div
//                 variants={itemVars}
//                 whileTap={{ scale: 0.97 }}
//                 className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex items-center gap-5 relative group"
//               >
//                 <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg ${item.shadow}`}>
//                   {item.icon}
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-lg font-black text-slate-900 leading-none mb-1">{item.title}</h3>
//                   <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{item.desc}</p>
//                 </div>
//                 <ChevronRight className="text-slate-200 group-hover:text-indigo-600 transition-colors" />
//               </motion.div>
//             </Link>
//           ))}
//         </motion.div>
//       </div>

//       {/* Footer pinned to bottom with margin-bottom */}
//       <footer className="py-10 text-center">
//           <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em]">
//             © Developed by Harikrishna Pithwa
//           </p>
//       </footer>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  UserPlus,
  CalendarCheck2,
  Database,
  LogOut,
  ChevronRight,
  LayoutGrid,
  Settings,
} from "lucide-react";

export default function HomePage() {
  const { data: session } = useSession();

  const menuItems = [
    {
      title: "Registration",
      desc: "Enroll New Balaks",
      icon: <UserPlus className="w-6 h-6" />,
      link: "/registration",
      color: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-200/50",
    },
    {
      title: "Attendance",
      desc: "Mark Sunday Sabha",
      icon: <CalendarCheck2 className="w-6 h-6" />,
      link: "/attendance",
      color: "from-indigo-500 to-violet-600",
      shadow: "shadow-indigo-200/50",
    },
    {
      title: "Database",
      desc: "Profiles & Records",
      icon: <Database className="w-6 h-6" />,
      link: "/data",
      color: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-200/50",
    },
  ];

  const containerVars = {
    animate: { transition: { staggerChildren: 0.15 } },
  };

  const itemVars = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans relative overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[50%] h-[40%] bg-indigo-50/60 blur-[100px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[30%] bg-blue-50/50 blur-[100px] rounded-full" />
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full">
        {/* Top Profile Bar */}
        <header className="px-7 pt-14 pb-10 flex justify-between items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
              <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.25em]">
                {session?.user?.area || "Active Portal"}
              </p>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
              Jai Swaminarayan,
            </h1>
            <h2 className="text-4xl font-black text-indigo-600 tracking-tight">
              {session?.user?.name?.split(" ")[0] || "Karyakar"}
            </h2>
          </motion.div>

          <motion.button
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => signOut()}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] border border-slate-100 text-slate-400 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </header>

        {/* Dashboard Title */}
        <div className="px-8 mb-6 flex items-center gap-2">
          <LayoutGrid size={16} className="text-slate-400" />
          <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">
            Quick Actions
          </span>
        </div>

        {/* Action Grid */}
        <motion.div
          variants={containerVars}
          initial="initial"
          animate="animate"
          className="px-6 space-y-4"
        >
          {menuItems.map((item, idx) => (
            <Link href={item.link} key={idx} className="block group">
              <motion.div
                variants={itemVars}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] flex items-center gap-6 relative overflow-hidden"
              >
                {/* Decorative background element for card */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-[0.03] rounded-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500`}
                />

                <div
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl ${item.shadow} group-hover:rotate-6 transition-transform duration-300`}
                >
                  {item.icon}
                </div>

                <div className="flex-1 z-10">
                  <h3 className="text-xl font-black text-slate-900 leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                    {item.desc}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                  <ChevronRight
                    className="text-slate-300 group-hover:text-white transition-colors"
                    size={20}
                  />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Info Card / News */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mx-6 mt-10 p-6 rounded-[2rem] bg-indigo-900 text-white relative overflow-hidden shadow-2xl shadow-indigo-200"
        >
          <div className="relative z-10">
            <h4 className="font-bold text-indigo-200 text-xs uppercase tracking-widest mb-2">
              Sabha Tip
            </h4>
            <p className="font-medium text-sm leading-relaxed">
              "Consistent engagement with Balaks through phone calls increases
              attendance by 40%."
            </p>
          </div>
          <Settings className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 rotate-12" />
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-12 text-center relative z-10">
        <div className="h-[1px] w-12 bg-slate-200 mx-auto mb-6" />
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
          BAPS Swaminarayan Sanstha
        </p>
        <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.2em] mt-2">
          Developed by HARIKRISHNA PITHWA
        </p>
      </footer>
    </div>
  );
}
