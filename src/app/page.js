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

//real last code
// "use client";
// import { useState } from "react"; // Added useState
// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
// import {
//   UserPlus,
//   CalendarCheck2,
//   Database,
//   LogOut,
//   ChevronRight,
//   LayoutGrid,
//   Settings,
//   Loader2, // Added Loader2
// } from "lucide-react";

// export default function HomePage() {
//   const { data: session } = useSession();
//   const [isLoggingOut, setIsLoggingOut] = useState(false); // New State

//   const handleLogout = async () => {
//     setIsLoggingOut(true);
//     await signOut();
//   };

//   const menuItems = [
//     {
//       title: "Registration",
//       desc: "Enroll New Balaks",
//       icon: <UserPlus className="w-6 h-6" />,
//       link: "/registration",
//       color: "from-blue-500 to-blue-600",
//       shadow: "shadow-blue-200/50",
//     },
//     {
//       title: "Attendance",
//       desc: "Mark Sunday Sabha",
//       icon: <CalendarCheck2 className="w-6 h-6" />,
//       link: "/attendance",
//       color: "from-indigo-500 to-violet-600",
//       shadow: "shadow-indigo-200/50",
//     },
//     {
//       title: "Database",
//       desc: "Profiles & Records",
//       icon: <Database className="w-6 h-6" />,
//       link: "/data",
//       color: "from-emerald-500 to-teal-600",
//       shadow: "shadow-emerald-200/50",
//     },
//   ];

//   const smoothTransition = {
//     type: "spring",
//     duration: 0.5,
//     bounce: 0.2,
//     ease: [0.22, 1, 0.36, 1],
//   };

//   const containerVars = {
//     animate: {
//       transition: {
//         staggerChildren: 0.08,
//         delayChildren: 0.1
//       }
//     },
//   };

//   const itemVars = {
//     initial: { opacity: 0, y: 15, scale: 0.98 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: smoothTransition,
//     },
//   };

//   return (
//     <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans relative overflow-hidden">
//       {/* Loading Overlay for Logout */}
//       <AnimatePresence>
//         {isLoggingOut && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-md flex flex-col items-center justify-center"
//           >
//             <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
//             <p className="text-indigo-600 font-black tracking-widest uppercase text-xs">Logging out...</p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
//         <div className="absolute top-[-5%] right-[-5%] w-[50%] h-[40%] bg-indigo-50/40 blur-[100px] rounded-full" />
//         <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[30%] bg-blue-50/30 blur-[100px] rounded-full" />
//       </div>

//       <div className="flex-1 max-w-2xl mx-auto w-full">
//         <header className="px-7 pt-14 pb-10 flex justify-between items-start">
//           <motion.div
//             initial={{ opacity: 0, x: -15 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={smoothTransition}
//             className="space-y-1"
//           >
//             <div className="flex items-center gap-2 mb-6">
//               <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
//               <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.25em]">
//                 {session?.user?.area || "Active Portal"}
//               </p>
//             </div>
//             <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
//               Jai Swaminarayan,
//             </h1>
//             <h2 className="text-4xl font-black text-indigo-600 tracking-tight">
//               {session?.user?.name?.split(" ")[0] || "Karyakar"}
//             </h2>
//           </motion.div>

//           <motion.button
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             whileHover={{ rotate: 15, scale: 1.05 }}
//             whileTap={{ scale: 0.92 }}
//             onClick={handleLogout}
//             disabled={isLoggingOut}
//             className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] border border-slate-100 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
//           >
//             {isLoggingOut ? (
//               <Loader2 className="w-5 h-5 animate-spin" />
//             ) : (
//               <LogOut className="w-5 h-5" />
//             )}
//           </motion.button>
//         </header>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="px-8 mb-6 flex items-center gap-2"
//         >
//           <LayoutGrid size={16} className="text-slate-400" />
//           <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">
//             Quick Actions
//           </span>
//         </motion.div>

//         <motion.div
//           variants={containerVars}
//           initial="initial"
//           animate="animate"
//           className="px-6 space-y-4"
//         >
//           {menuItems.map((item, idx) => (
//             <Link href={item.link} key={idx} className="block group">
//               <motion.div
//                 variants={itemVars}
//                 whileHover={{ y: -4, scale: 1.01 }}
//                 whileTap={{ scale: 0.97 }}
//                 style={{ willChange: "transform, opacity" }}
//                 className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] flex items-center gap-6 relative overflow-hidden"
//               >
//                 <div
//                   className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-[0.03] rounded-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-700 ease-out`}
//                 />

//                 <div
//                   className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl ${item.shadow} group-hover:rotate-6 transition-transform duration-500 ease-out`}
//                 >
//                   {item.icon}
//                 </div>

//                 <div className="flex-1 z-10">
//                   <h3 className="text-xl font-black text-slate-900 leading-tight mb-1">
//                     {item.title}
//                   </h3>
//                   <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
//                     {item.desc}
//                   </p>
//                 </div>

//                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-300">
//                   <ChevronRight
//                     className="text-slate-300 group-hover:text-white transition-colors"
//                     size={20}
//                   />
//                 </div>
//               </motion.div>
//             </Link>
//           ))}
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, ...smoothTransition }}
//           style={{ willChange: "transform, opacity" }}
//           className="mx-6 mt-10 p-6 rounded-[2rem] bg-indigo-900 text-white relative overflow-hidden shadow-2xl shadow-indigo-200/40"
//         >
//           <div className="relative z-10">
//             <h4 className="font-bold text-indigo-200 text-xs uppercase tracking-widest mb-2">
//               Sabha Tip
//             </h4>
//             <p className="font-medium text-sm leading-relaxed">
//               "Consistent engagement with Balaks through phone calls increases
//               attendance by 40%."
//             </p>
//           </div>
//           <Settings className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 rotate-12" />
//         </motion.div>
//       </div>

//       <footer className="py-12 text-center relative z-10">
//         <div className="h-[1px] w-12 bg-slate-200 mx-auto mb-6" />
//         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
//           BAPS Swaminarayan Sanstha
//         </p>
//         <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.2em] mt-2">
//           Developed by HARIKRISHNA PITHWA
//         </p>
//       </footer>
//     </div>
//   );
// }

//last code - imp
// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   UserPlus,
//   CalendarCheck2,
//   Database,
//   LogOut,
//   ChevronRight,
//   LayoutGrid,
//   Settings,
//   Loader2,
//   ShieldCheck,
// } from "lucide-react";

// // --- SKELETON COMPONENT ---
// const HomeSkeleton = () => (
//   <div className="min-h-screen bg-[#FDFDFD] px-6 pt-14 flex flex-col font-sans">
//     <div className="flex justify-between items-start mb-10">
//       <div className="space-y-3">
//         <div className="h-3 w-24 bg-slate-100 rounded-full animate-pulse" />
//         <div className="h-8 w-48 bg-slate-100 rounded-xl animate-pulse" />
//         <div className="h-10 w-32 bg-slate-100 rounded-xl animate-pulse" />
//       </div>
//       <div className="w-12 h-12 bg-slate-100 rounded-2xl animate-pulse" />
//     </div>
//     <div className="h-4 w-32 bg-slate-50 rounded-full mb-6 animate-pulse" />
//     <div className="space-y-4">
//       {[1, 2, 3].map((i) => (
//         <div key={i} className="h-28 w-full bg-slate-50 rounded-[2.5rem] border border-slate-100 animate-pulse" />
//       ))}
//     </div>
//   </div>
// );

// export default function HomePage() {
//   const { data: session, status } = useSession();
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   const handleLogout = async () => {
//     setIsLoggingOut(true);
//     await signOut();
//   };

//   const menuItems = [
//     {
//       title: "Registration",
//       desc: "Enroll New Balaks",
//       icon: <UserPlus className="w-6 h-6" />,
//       link: "/registration",
//       color: "from-blue-500 to-blue-600",
//       shadow: "shadow-blue-200/50",
//     },
//     {
//       title: "Attendance",
//       desc: "Mark Sunday Sabha",
//       icon: <CalendarCheck2 className="w-6 h-6" />,
//       link: "/attendance",
//       color: "from-indigo-500 to-violet-600",
//       shadow: "shadow-indigo-200/50",
//     },
//     {
//       title: "Database",
//       desc: "Profiles & Records",
//       icon: <Database className="w-6 h-6" />,
//       link: "/data",
//       color: "from-emerald-500 to-teal-600",
//       shadow: "shadow-emerald-200/50",
//     },
//   ];

//   if (session?.user?.role === "Admin") {
//     menuItems.push({
//       title: "Admin Panel",
//       desc: "Master Management",
//       icon: <ShieldCheck className="w-6 h-6" />,
//       link: "/admin",
//       color: "from-red-500 to-rose-600",
//       shadow: "shadow-rose-200/50",
//     });
//   }

//   // Show Skeleton while session is checking
//   if (status === "loading") return <HomeSkeleton />;

//   return (
//     <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans relative overflow-hidden">
//       {/* Logout Overlay */}
//       <AnimatePresence>
//         {isLoggingOut && (
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-md flex flex-col items-center justify-center"
//           >
//             <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
//             <p className="text-indigo-600 font-black tracking-widest uppercase text-xs">Logging out...</p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
//         <div className="absolute top-[-5%] right-[-5%] w-[50%] h-[40%] bg-indigo-50/40 blur-[100px] rounded-full" />
//         <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[30%] bg-blue-50/30 blur-[100px] rounded-full" />
//       </div>

//       <div className="flex-1 max-w-2xl mx-auto w-full px-6">
//         <header className="pt-14 pb-10 flex justify-between items-start">
//           <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>
//             <div className="flex items-center gap-2 mb-6">
//               <span className={`flex h-2 w-2 rounded-full animate-pulse ${session?.user?.role === 'Admin' ? 'bg-red-500' : 'bg-indigo-600'}`} />
//               <p className={`${session?.user?.role === 'Admin' ? 'text-red-600' : 'text-indigo-600'} font-bold text-[10px] uppercase tracking-[0.25em]`}>
//                 {session?.user?.role === 'Admin' ? 'System Administrator' : session?.user?.area}
//               </p>
//             </div>
//             <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Jai Swaminarayan,</h1>
//             <h2 className={`text-4xl font-black tracking-tight ${session?.user?.role === 'Admin' ? 'text-red-600' : 'text-indigo-600'}`}>
//               {session?.user?.name?.split(" ")[0]}
//             </h2>
//           </motion.div>

//           <motion.button
//             whileTap={{ scale: 0.92 }}
//             onClick={handleLogout}
//             className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 text-slate-400"
//           >
//             <LogOut className="w-5 h-5" />
//           </motion.button>
//         </header>

//         <div className="mb-6 flex items-center gap-2">
//           <LayoutGrid size={16} className="text-slate-400" />
//           <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Portal Access</span>
//         </div>

//         <motion.div initial="hidden" animate="show" className="space-y-4">
//           {menuItems.map((item, idx) => (
//             <Link href={item.link} key={idx} className="block group">
//               <motion.div
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0, transition: { delay: idx * 0.1 } }}
//                 whileHover={{ y: -4, scale: 1.01 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 relative overflow-hidden"
//               >
//                 <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl ${item.shadow}`}>
//                   {item.icon}
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-xl font-black text-slate-900 leading-tight mb-1">{item.title}</h3>
//                   <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">{item.desc}</p>
//                 </div>
//                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 transition-colors">
//                   <ChevronRight className="text-slate-300 group-hover:text-white" size={20} />
//                 </div>
//               </motion.div>
//             </Link>
//           ))}
//         </motion.div>

//         {/* Dynamic Tip Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
//           className="mt-10 p-6 rounded-[2rem] bg-indigo-900 text-white relative overflow-hidden shadow-2xl shadow-indigo-200/40"
//         >
//           <div className="relative z-10">
//             <h4 className="font-bold text-indigo-200 text-xs uppercase tracking-widest mb-2">Sabha Tip</h4>
//             <p className="font-medium text-sm leading-relaxed">
//               "Consistency with Balaks through phone calls increases attendance significantly."
//             </p>
//           </div>
//           <Settings className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 rotate-12" />
//         </motion.div>
//       </div>

//       <footer className="py-12 text-center opacity-30">
//         <p className="text-[10px] font-black uppercase tracking-[0.5em]">BAPS Swaminarayan Sanstha</p>
//       </footer>
//     </div>
//   );
// }

//ai1

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   UserPlus,
//   CalendarCheck2,
//   Database,
//   LogOut,
//   ChevronRight,
//   LayoutGrid,
//   Settings,
//   Loader2,
//   ShieldCheck,
//   Zap
// } from "lucide-react";

// // --- iOS 26 "SNAP-FLUID" PHYSICS ---
// // Stiffness 550 + Damping 38 = The exact speed of an iOS swipe gesture.
// const iosSnap = {
//   type: "spring",
//   stiffness: 550,
//   damping: 38,
//   mass: 1,
//   restDelta: 0.01
// };

// const staggerContainer = {
//   animate: {
//     transition: {
//       staggerChildren: 0.04, // Ultra-fast stagger
//       delayChildren: 0.02
//     }
//   }
// };

// const itemReveal = {
//   initial: { opacity: 0, y: 20, scale: 0.98, filter: "blur(4px)" },
//   animate: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     filter: "blur(0px)",
//     transition: iosSnap
//   }
// };

// export default function HomePage() {
//   const { data: session } = useSession();
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   const handleLogout = async () => {
//     setIsLoggingOut(true);
//     await signOut();
//   };

//   const menuItems = [
//     {
//       title: "Registration",
//       desc: "New Enrollments",
//       icon: <UserPlus className="w-6 h-6" />,
//       link: "/registration",
//       color: "bg-blue-500/10",
//       iconColor: "text-blue-600",
//     },
//     {
//       title: "Attendance",
//       desc: "Sunday Sabha",
//       icon: <CalendarCheck2 className="w-6 h-6" />,
//       link: "/attendance",
//       color: "bg-indigo-500/10",
//       iconColor: "text-indigo-600",
//     },
//     {
//       title: "Database",
//       desc: "Mandal Records",
//       icon: <Database className="w-6 h-6" />,
//       link: "/data",
//       color: "bg-emerald-500/10",
//       iconColor: "text-emerald-600",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans relative overflow-x-hidden selection:bg-indigo-100">

//       {/* 1. INSTANT OVERLAY */}
//       <AnimatePresence>
//         {isLoggingOut && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="fixed inset-0 z-[100] bg-white/40 backdrop-blur-xl flex flex-col items-center justify-center"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={iosSnap}
//               className="flex flex-col items-center"
//             >
//               <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
//               <p className="text-indigo-900 font-bold tracking-tight">Signing Out</p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* 2. BACKGROUND ELEMENTS */}
//       <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
//         <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[40%] bg-indigo-100/30 blur-[100px] rounded-full" />
//         <div className="absolute bottom-[-5%] left-[-5%] w-[50%] h-[40%] bg-blue-100/20 blur-[100px] rounded-full" />
//       </div>

//       <motion.div
//         variants={staggerContainer}
//         initial="initial"
//         animate="animate"
//         className="flex-1 max-w-6xl mx-auto w-full px-6 md:px-12"
//       >
//         {/* 3. SNAP HEADER */}
//         <header className="pt-16 pb-12 flex justify-between items-end">
//           <motion.div variants={itemReveal}>
//             <div className="flex items-center gap-2 mb-3">
//               <span className="flex h-2 w-2 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
//               <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">
//                 {session?.user?.area || "Digital Portal"}
//               </p>
//             </div>
//             <h1 className="text-3xl font-medium text-slate-400 tracking-tight leading-none mb-1">Jai Swaminarayan,</h1>
//             <h2 className="text-5xl font-black tracking-tighter text-slate-900">
//               {session?.user?.name?.split(" ")[0] || "Karyakar"}
//             </h2>
//           </motion.div>

//           <motion.button
//             variants={itemReveal}
//             whileTap={{ scale: 0.92 }}
//             onClick={handleLogout}
//             className="w-14 h-14 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
//           >
//             <LogOut className="w-5 h-5" />
//           </motion.button>
//         </header>

//         {/* 4. SNAP BENTO GRID */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
//         >
//           {menuItems.map((item, idx) => (
//             <Link href={item.link} key={idx} className="block group lg:first:col-span-2 lg:last:col-span-2">
//               <motion.div
//                 variants={itemReveal}
//                 whileHover={{ y: -5, scale: 1.01 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="bg-white/80 backdrop-blur-md p-7 h-full rounded-[2.5rem] border border-slate-100 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden transition-colors duration-200 hover:border-indigo-100"
//               >
//                 <div className={`w-12 h-12 ${item.color} ${item.iconColor} rounded-2xl flex items-center justify-center mb-10`}>
//                   {item.icon}
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1 tracking-tight flex items-center gap-2">
//                     {item.title}
//                     <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-slate-300" />
//                   </h3>
//                   <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">{item.desc}</p>
//                 </div>
//               </motion.div>
//             </Link>
//           ))}
//         </motion.div>

//         {/* 5. SNAP INSIGHT PANEL */}
//         <motion.div
//           variants={itemReveal}
//           className="mt-6 p-1 rounded-[3rem] bg-gradient-to-tr from-slate-900 to-slate-800 shadow-xl"
//         >
//           <div className="bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-[2.8rem] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
//              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
//                 <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400/20" />
//             </div>

//             <div className="flex-1 text-center md:text-left">
//               <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-[0.4em] mb-3">Mandal Insight</h4>
//               <p className="font-bold text-xl text-white leading-tight tracking-tight">
//                 Follow-ups increase <span className="text-indigo-400">attendance by 40%</span>.
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>

//       <footer className="py-16 text-center opacity-30">
//         <p className="text-[9px] font-bold uppercase tracking-[0.6em] text-slate-500">BAPS SWAMINARAYAN SANSTHA</p>
//       </footer>
//     </div>
//   );
// }

// ai2
// "use client";
// import { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   UserPlus,
//   CalendarCheck2,
//   Database,
//   LogOut,
//   ChevronRight,
//   Zap,
//   Loader2,
//   ShieldCheck,
// } from "lucide-react";

// // --- iOS 26 "FAST-SMOOTH" REVEAL ---
// // Removed physics for instant start. Ease-out ensures it settles buttery smooth.
// const fastReveal = {
//   duration: 0.25,
//   ease: [0.33, 1, 0.68, 1], // iOS standard Bezier curve
// };

// const staggerContainer = {
//   animate: {
//     transition: {
//       staggerChildren: 0.03, // Ultra-fast sequence
//       delayChildren: 0.0,
//     },
//   },
// };

// const itemReveal = {
//   initial: { opacity: 0, y: 10 }, // Minimal y-shift for faster travel
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: fastReveal,
//   },
//   exit: { opacity: 0, transition: { duration: 0.1 } },
// };

// const HomeSkeleton = () => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     className="flex-1 max-w-6xl mx-auto w-full px-6 md:px-12 pt-16"
//   >
//     <div className="flex justify-between items-end mb-12">
//       <div className="space-y-4">
//         <div className="h-4 w-32 bg-slate-100 rounded-full" />
//         <div className="h-10 w-64 bg-slate-100 rounded-xl" />
//       </div>
//       <div className="w-14 h-14 bg-slate-50 rounded-2xl" />
//     </div>
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//       {[1, 2, 3, 4].map((i) => (
//         <div
//           key={i}
//           className="h-44 bg-slate-50 rounded-[2.5rem] border border-slate-100"
//         />
//       ))}
//     </div>
//   </motion.div>
// );

// export default function HomePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//     if (status === "unauthenticated") {
//       router.replace("/login");
//     }

//     document.documentElement.style.scrollBehavior = "smooth";
//     window.history.pushState(null, null, window.location.href);
//     const handlePopState = () =>
//       window.history.pushState(null, null, window.location.href);
//     window.addEventListener("popstate", handlePopState);

//     return () => window.removeEventListener("popstate", handlePopState);
//   }, [status, router]);

//   const handleLogout = async () => {
//     setIsLoggingOut(true);
//     await signOut({ callbackUrl: "/login", redirect: true });
//   };

//   const menuItems = useMemo(
//     () => [
//       {
//         title: "Registration",
//         desc: "New Enrollments",
//         icon: <UserPlus size={24} />,
//         link: "/registration",
//         color: "bg-indigo-500/10",
//         iconColor: "text-indigo-600",
//       },
//       {
//         title: "Attendance",
//         desc: "Bal Sabha",
//         icon: <CalendarCheck2 size={24} />,
//         link: "/attendance",
//         color: "bg-blue-500/10",
//         iconColor: "text-blue-600",
//       },
//       {
//         title: "Database",
//         desc: "Sabha Records",
//         icon: <Database size={24} />,
//         link: "/data",
//         color: "bg-emerald-500/10",
//         iconColor: "text-emerald-600",
//       },
//       ...(session?.user?.role === "Admin"
//         ? [
//             {
//               title: "Admin Panel",
//               desc: "System Master",
//               icon: <ShieldCheck size={24} />,
//               link: "/admin",
//               color: "bg-rose-500/10",
//               iconColor: "text-rose-600",
//             },
//           ]
//         : []),
//     ],
//     [session]
//   );

//   if (!isMounted) return <div className="min-h-screen bg-white" />;

//   return (
//     <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans relative overflow-x-hidden selection:bg-indigo-100 transform-gpu scroll-smooth">
//       {/* 1. INSTANT LOGOUT OVERLAY */}
//       {/* 1. INSTANT LOGOUT OVERLAY */}
//      <AnimatePresence>
//   {isLoggingOut && (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       // Use fixed inset-0 with h-screen and w-screen to force viewport coverage
//       // z-[999] ensures it sits above every other element in the app
//       className="fixed inset-0 z-[999] h-screen w-screen bg-white/60 backdrop-blur-3xl flex items-center justify-center pointer-events-auto"
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 10 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         transition={{ type: "spring", stiffness: 400, damping: 30 }}
//         className="flex flex-col items-center justify-center"
//       >
//         {/* Loader Icon */}
//         <div className="relative mb-6">
//            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" strokeWidth={2.5} />
//            {/* Subtle glow behind spinner */}
//            <div className="absolute inset-0 blur-2xl bg-indigo-500/20 -z-10" />
//         </div>

//         {/* Optically Centered Text */}
//         <p className="text-indigo-900 font-black uppercase tracking-[0.4em] text-[11px] ml-[0.4em] text-center">
//           Logging out
//         </p>

//       </motion.div>
//     </motion.div>
//   )}
// </AnimatePresence>
//       {/* 2. BACKGROUND ELEMENTS */}
//       <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
//         <div className="absolute top-[-10%] right-[-5%] w-[70%] h-[50%] bg-indigo-50/50 blur-[100px] rounded-full transform-gpu" />
//         <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[40%] bg-blue-50/40 blur-[100px] rounded-full transform-gpu" />
//       </div>

//       <AnimatePresence mode="wait">
//         {status === "loading" || !session ? (
//           <HomeSkeleton key="skeleton" />
//         ) : (
//           <motion.div
//             key="content"
//             variants={staggerContainer}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             className="flex-1 max-w-6xl mx-auto w-full px-6 md:px-12 transform-gpu"
//           >
//             {/* 3. HEADER */}
//             <header className="pt-20 pb-12 flex justify-between items-end">
//               <motion.div variants={itemReveal}>
//                 <div className="flex items-center gap-2.5 mb-4">
//                   <div className="h-2 w-2 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
//                   <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em]">
//                     {session.user?.area || "Digital Portal"}
//                   </p>
//                 </div>
//                 <h1 className="text-3xl font-medium text-slate-400 tracking-tight leading-none mb-2">
//                   Jai Swaminarayan,
//                 </h1>
//                 <h2 className="text-6xl font-black tracking-tighter text-slate-900">
//                   {session.user?.name?.split(" ")[0] || "Karyakar"}
//                 </h2>
//               </motion.div>

//               <motion.button
//                 variants={itemReveal}
//                 whileTap={{ scale: 0.94 }}
//                 onClick={handleLogout}
//                 className="w-16 h-16 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400"
//               >
//                 <LogOut size={22} />
//               </motion.button>
//             </header>

//             {/* 4. FAST BENTO GRID */}
//             <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {menuItems.map((item, idx) => (
//                 <Link
//                   href={item.link}
//                   key={idx}
//                   className="block group lg:first:col-span-2 lg:last:col-span-2"
//                 >
//                   <motion.div
//                     variants={itemReveal}
//                     whileHover={{ scale: 1.01 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="bg-white/80 backdrop-blur-xl p-8 h-full rounded-[3rem] border border-slate-100 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden transition-colors duration-200 hover:border-indigo-100 transform-gpu"
//                   >
//                     <div
//                       className={`w-14 h-14 ${item.color} ${item.iconColor} rounded-2xl flex items-center justify-center mb-12`}
//                     >
//                       {item.icon}
//                     </div>

//                     <div>
//                       <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-1 tracking-tight flex items-center gap-2">
//                         {item.title}
//                         <ChevronRight
//                           size={18}
//                           className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-slate-300"
//                         />
//                       </h3>
//                       <p className="text-slate-400 text-[12px] font-bold uppercase tracking-widest">
//                         {item.desc}
//                       </p>
//                     </div>
//                   </motion.div>
//                 </Link>
//               ))}
//             </motion.div>

//             {/* 5. FAST INSIGHT PANEL */}
//             <motion.div
//               variants={itemReveal}
//               className="mt-8 bg-slate-900 p-10 rounded-[3.5rem] flex flex-col md:flex-row items-center gap-10 relative overflow-hidden shadow-2xl"
//             >
//               <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center shrink-0 border border-white/10">
//                 <Zap size={32} className="text-indigo-400 fill-indigo-400/20" />
//               </div>
//               <div className="flex-1 text-center md:text-left">
//                 <h4 className="font-bold text-indigo-400/60 text-[10px] uppercase tracking-[0.5em] mb-4">
//                   Portal Insight
//                 </h4>
//                 <p className="font-medium text-2xl text-white leading-tight tracking-tight">
//                   Follow-ups increase{" "}
//                   <span className="text-indigo-400 font-bold">
//                     participation by 40%
//                   </span>
//                   .
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <footer className="py-24 text-center opacity-30">
//         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-900">
//           BAPS SWAMINARAYAN SANSTHA
//         </p>
//       </footer>
//     </div>
//   );
// }

"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  CalendarCheck2,
  Database,
  LogOut,
  ChevronRight,
  Zap,
  Loader2,
  ShieldCheck,
} from "lucide-react";

// --- ULTRA-SMOOTH SIMPLE FADE ---
const simpleFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: "linear" },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.03 },
  },
};

const HomeSkeleton = () => (
  <motion.div
    {...simpleFade}
    className="flex-1 max-w-6xl mx-auto w-full px-5 md:px-12 pt-10"
  >
    <div className="flex justify-between items-end mb-10">
      <div className="space-y-3">
        <div className="h-3 w-24 bg-slate-100 rounded-full" />
        <div className="h-8 w-48 bg-slate-100 rounded-lg" />
      </div>
      <div className="w-12 h-12 bg-slate-50 rounded-xl" />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-32 bg-slate-50 rounded-[2rem] border border-slate-100"
        />
      ))}
    </div>
  </motion.div>
);

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/login", redirect: true });
  };

  const menuItems = useMemo(
    () => [
      {
        title: "Registration",
        desc: "New Enrollments",
        icon: <UserPlus size={22} />,
        link: "/registration",
        color: "bg-indigo-500/10",
        iconColor: "text-indigo-600",
      },
      {
        title: "Attendance",
        desc: "Bal Sabha",
        icon: <CalendarCheck2 size={22} />,
        link: "/attendance",
        color: "bg-blue-500/10",
        iconColor: "text-blue-600",
      },
      {
        title: "Database",
        desc: "Sabha Records",
        icon: <Database size={22} />,
        link: "/data",
        color: "bg-emerald-500/10",
        iconColor: "text-emerald-600",
      },
      ...(session?.user?.role === "Admin"
        ? [
            {
              title: "Admin Panel",
              desc: "System Master",
              icon: <ShieldCheck size={22} />,
              link: "/admin",
              color: "bg-rose-500/10",
              iconColor: "text-rose-600",
            },
          ]
        : []),
    ],
    [session]
  );

  if (!isMounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans relative overflow-x-hidden selection:bg-indigo-100">
      {/* 1. LOGOUT OVERLAY */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            {...simpleFade}
            className="fixed inset-0 z-[999] h-screen w-screen bg-white/80 backdrop-blur-xl flex items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
              <p className="text-indigo-900 font-black uppercase tracking-[0.3em] text-[10px]">
                Logging out
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] w-full h-[40%] bg-indigo-50/40 blur-[80px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-full h-[30%] bg-blue-50/30 blur-[80px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {status === "loading" || !session ? (
          <HomeSkeleton key="skeleton" />
        ) : (
          <motion.div
            key="content"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex-1 max-w-6xl mx-auto w-full px-5 md:px-12 pt-12 md:pt-20 pb-10"
          >
            {/* 3. HEADER */}
            <header className="flex justify-between items-start mb-10 md:mb-14">
              <motion.div variants={simpleFade} className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-3">
                  {/* Status Indicator */}
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0" />

                  {/* Fixed Area Name: Removed truncate and max-width */}
                  <p className="text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] leading-relaxed">
                    {session.user?.area || "Digital Portal"}
                  </p>
                </div>

                <h1 className="text-2xl md:text-3xl font-medium text-slate-400 tracking-tight leading-none mb-2">
                  Jai Swaminarayan,
                </h1>

                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                  {session.user?.name?.split(" ")[0] || "Karyakar"}
                </h2>
              </motion.div>

              <motion.button
                variants={simpleFade}
                onClick={handleLogout}
                className="mt-6 p-4 bg-white shadow-sm border border-slate-100 rounded-2xl text-slate-400 active:bg-slate-50 transition-colors"
              >
                <LogOut size={20} />
              </motion.button>
            </header>

            {/* 4. RESPONSIVE GRID */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {menuItems.map((item, idx) => (
                <Link
                  href={item.link}
                  key={idx}
                  className={`block group ${
                    idx === 0 || idx === menuItems.length - 1
                      ? "lg:col-span-2"
                      : ""
                  }`}
                >
                  <motion.div
                    variants={simpleFade}
                    className="bg-white/70 backdrop-blur-md p-6 md:p-8 h-full rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:border-indigo-100 active:scale-[0.98] transition-all"
                  >
                    <div
                      className={`w-12 h-12 ${item.color} ${item.iconColor} rounded-xl flex items-center justify-center mb-10`}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-1 tracking-tight flex items-center justify-between">
                        {item.title}
                        <ChevronRight size={16} className="text-slate-300" />
                      </h3>
                      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            {/* 5. SIMPLE INSIGHT PANEL */}
            <motion.div
              variants={simpleFade}
              className="mt-6 md:mt-8 bg-slate-900 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col md:flex-row items-center gap-6 md:gap-10 shadow-xl"
            >
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <Zap size={24} className="text-indigo-400 fill-indigo-400/20" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-bold text-indigo-400/60 text-[9px] uppercase tracking-[0.4em] mb-2 md:mb-3">
                  Portal Insight
                </h4>
                <p className="text-lg md:text-xl text-white leading-snug font-medium">
                  Follow-ups increase{" "}
                  <span className="text-indigo-400 font-bold">
                    participation by 40%
                  </span>
                  .
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-16 md:py-24 text-center opacity-30">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-900 px-4">
          BAPS SWAMINARAYAN SANSTHA
        </p>
      </footer>
    </div>
  );
}
