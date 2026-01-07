// og
// "use client";
// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Phone, ArrowLeft, MapPin, Search, Users, Filter, Cake, CalendarDays } from 'lucide-react';
// import Link from 'next/link';

// export default function KidsInfoPage() {
//   const { data: session } = useSession();
//   const [balaks, setBalaks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const loadBalaks = async () => {
//       // 1. Wait until session and area are available
//       if (!session?.user?.area) return;

//       setLoading(true);
//       try {
//         // 2. Added a timestamp to the URL to bypass any browser caching
//         // This ensures you see the data "instantly" after a new registration
//         const res = await fetch(`/api/balaks?t=${Date.now()}`, {
//           cache: 'no-store',
//           headers: {
//             'Pragma': 'no-cache',
//             'Cache-Control': 'no-cache'
//           }
//         });

//         if (!res.ok) {
//           // If the API returns 500, it's because of a record with no DOB
//           throw new Error(`Server returned ${res.status}`);
//         }

//         const data = await res.json();
//         setBalaks(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Fetch failed:", err);
//         // Fallback: we set an empty array so the UI doesn't crash
//         setBalaks([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadBalaks();
//   }, [session, session?.user?.area]); // Re-run if session or area changes

//   const formatName = (str) => str?.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());

//   const filteredBalaks = balaks.filter(b =>
//     `${b.firstName} ${b.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) return (
//     <div className="flex h-screen items-center justify-center bg-[#F8F8F7]">
//       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//         className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full" />
//     </div>
//   );

//   return (
//     <div className="max-w-md mx-auto px-6 pt-12 pb-32 font-sans bg-[#F8F8F7] min-h-screen relative overflow-x-hidden">
//       <header className="mb-8">
//         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between mb-6">
//           <Link href="/" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400">
//             <ArrowLeft className="w-5 h-5" />
//           </Link>
//           <div className="text-right">
//             <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em]">{session?.user?.area || "Mandal"}</p>
//             <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none mt-1">Records</h1>
//           </div>
//         </motion.div>

//         <div className="relative group">
//           <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
//           <input type="text" placeholder="Search by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-white border-2 border-transparent rounded-[1.5rem] py-5 pl-12 pr-5 shadow-sm focus:border-indigo-500/20 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all" />
//         </div>
//       </header>

//       <div className="flex gap-4 mb-8">
//          <div className="bg-slate-900 rounded-[2rem] p-5 flex-1 text-white shadow-xl">
//             <Users className="w-4 h-4 mb-3 opacity-40" />
//             <p className="text-3xl font-black leading-none mb-1">{filteredBalaks.length}</p>
//             <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Total Kids</p>
//          </div>

//       </div>

//       <div className="space-y-4">
//         <AnimatePresence mode='popLayout'>
//           {filteredBalaks.length === 0 ? (
//             <div className="text-center py-10 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
//               No Data Found
//             </div>
//           ) : (
//             filteredBalaks.map((balak, index) => (
//               <motion.div key={balak._id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
//                 className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-white flex items-center gap-5">

//                 <div className="relative shrink-0">
//                   <img src={balak.photoUrl} className="w-20 h-20 rounded-[1.8rem] object-cover ring-4 ring-slate-50 shadow-sm" alt="profile" />
//                   <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase border-2 border-white">
//                      {balak.standard}
//                   </div>
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 mb-1">
//                     <h3 className="text-lg font-black text-slate-900 truncate tracking-tight">
//                       {formatName(balak.firstName)}
//                     </h3>
//                     {balak.age && (
//                       <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
//                         {balak.age} Yrs
//                       </span>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-1.5 text-slate-400 mb-1">
//                     <CalendarDays className="w-3 h-3 text-pink-400" />
//                     <p className="text-[10px] font-bold uppercase tracking-tighter">
//                       {balak.dob ? new Date(balak.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "No DOB Set"}
//                     </p>
//                   </div>

//                   <div className="flex items-start gap-1.5 text-slate-400 mb-3">
//                     <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-indigo-400" />
//                     <p className="text-[11px] font-bold leading-tight line-clamp-1 italic">{balak.address || "No address"}</p>
//                   </div>

//                   <div className="flex gap-2">
//                     {balak.mobileNumber && balak.mobileNumber !== "N/A" ? (
//                       <a href={`tel:${balak.mobileNumber}`} className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-colors">
//                         <Phone className="w-2.5 h-2.5 fill-emerald-600" /> Call
//                       </a>
//                     ) : (
//                       <div className="flex-1 bg-slate-50 text-slate-300 py-2.5 rounded-xl text-[9px] font-black uppercase text-center">No Number</div>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </AnimatePresence>
//       </div>

//       <div className="fixed top-[20%] left-[-10%] w-64 h-64 bg-indigo-100/20 rounded-full blur-[100px] -z-10" />
//     </div>
//   );
// }











//imp
// "use client";
// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Phone,
//   ArrowLeft,
//   MapPin,
//   Search,
//   Users,
//   Cake,
//   CalendarDays,
//   Sparkles,
//   ChevronRight,
// } from "lucide-react";
// import Link from "next/link";

// export default function KidsInfoPage() {
//   const { data: session } = useSession();
//   const [balaks, setBalaks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const loadBalaks = async () => {
//       if (!session?.user?.area) return;

//       setLoading(true);
//       try {
//         const res = await fetch(`/api/balaks?t=${Date.now()}`, {
//           cache: "no-store",
//           headers: {
//             Pragma: "no-cache",
//             "Cache-Control": "no-cache",
//           },
//         });

//         if (!res.ok) throw new Error(`Server returned ${res.status}`);

//         const data = await res.json();
//         setBalaks(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Fetch failed:", err);
//         setBalaks([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadBalaks();
//   }, [session, session?.user?.area]);

//   // Logic to find the next upcoming birthday
//   const getNextBirthday = () => {
//     if (!balaks || balaks.length === 0) return null;

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const currentYear = today.getFullYear();

//     return balaks
//       .filter((b) => b.dob)
//       .map((b) => {
//         const birthDate = new Date(b.dob);
//         let nextBDay = new Date(
//           currentYear,
//           birthDate.getMonth(),
//           birthDate.getDate()
//         );

//         if (nextBDay < today) {
//           nextBDay.setFullYear(currentYear + 1);
//         }

//         return { ...b, nextBDayDate: nextBDay };
//       })
//       .sort((a, b) => a.nextBDayDate - b.nextBDayDate)[0];
//   };

//   const nextBirthdayBalak = getNextBirthday();
//   const formatName = (str) =>
//     str?.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());

//   const filteredBalaks = balaks.filter((b) =>
//     `${b.firstName} ${b.lastName} ${b.standard}`
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   if (loading)
//     return (
//       <div className="flex h-screen items-center justify-center bg-[#FDFDFD]">
//         <div className="relative flex items-center justify-center">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//             className="w-12 h-12 border-[3px] border-indigo-100 border-t-indigo-600 rounded-full"
//           />
//           <Sparkles className="absolute text-indigo-600 w-4 h-4 animate-pulse" />
//         </div>
//       </div>
//     );

//   return (
//     <div className="max-w-md mx-auto px-6 pt-12 pb-32 font-sans bg-[#FDFDFD] min-h-screen relative overflow-x-hidden">
//       {/* Background Decor */}
//       <div className="fixed top-[-10%] right-[-10%] w-72 h-72 bg-indigo-50/50 rounded-full blur-[100px] -z-10" />
//       <div className="fixed bottom-[10%] left-[-10%] w-64 h-64 bg-blue-50/50 rounded-full blur-[100px] -z-10" />

//       <header className="mb-8 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex items-center justify-between mb-8"
//         >
//           <Link
//             href="/"
//             className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-500 hover:text-indigo-600 transition-colors"
//           >
//             <ArrowLeft size={20} />
//           </Link>
//           <div className="text-right">
//             <div className="flex items-center justify-end gap-1.5 mb-1">
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
//               <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] leading-none">
//                 {session?.user?.area || "Mandal"}
//               </p>
//             </div>
//             <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
//               Records
//             </h1>
//           </div>
//         </motion.div>

//         <div className="relative group">
//           <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
//             <Search className="w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name or standard..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-4.5 pl-12 pr-5 shadow-inner focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all text-sm"
//           />
//         </div>
//       </header>

//       {/* Stats Summary Grid */}
//       <div className="grid grid-cols-2 gap-4 mb-10 relative z-10">
//         {/* Total Count Card */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-xl shadow-slate-200 relative overflow-hidden group"
//         >
//           <Users className="absolute -right-2 -bottom-2 w-16 h-16 text-white/5 group-hover:scale-110 transition-transform" />
//           <p className="text-4xl font-black tracking-tighter mb-1">
//             {filteredBalaks.length}
//           </p>
//           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
//             Total Kids
//           </p>
//         </motion.div>

//         {/* Dynamic Next Birthday Card */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white rounded-[2.5rem] p-5 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden group"
//         >
//           <Cake className="absolute -right-2 -top-2 w-12 h-12 text-pink-500/10 group-hover:rotate-12 transition-transform" />
//           <div className="flex justify-between items-start">
//             <div className="w-8 h-8 bg-pink-50 rounded-xl flex items-center justify-center">
//               <Cake size={16} className="text-pink-500" />
//             </div>
//             {nextBirthdayBalak && (
//               <span className="text-[8px] font-black bg-pink-50 text-pink-600 px-2 py-1 rounded-full uppercase">
//                 Next
//               </span>
//             )}
//           </div>
//           <div className="mt-3">
//             <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
//               Birthday
//             </p>
//             {nextBirthdayBalak ? (
//               <>
//                 <p className="text-[13px] font-black text-slate-900 leading-none truncate max-w-full">
//                   {nextBirthdayBalak.firstName}{" "}
//                   {nextBirthdayBalak.lastName?.charAt(0)}.
//                 </p>
//                 <p className="text-[11px] font-bold text-indigo-600 mt-1">
//                   {new Date(nextBirthdayBalak.dob).toLocaleDateString("en-GB", {
//                     day: "2-digit",
//                     month: "short",
//                   })}
//                 </p>
//               </>
//             ) : (
//               <p className="text-xs font-bold text-slate-300 italic">No Data</p>
//             )}
//           </div>
//         </motion.div>
//       </div>

//       {/* Kids List */}
//       <div className="space-y-4 relative z-10">
//         <AnimatePresence mode="popLayout">
//           {filteredBalaks.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-20 flex flex-col items-center gap-3"
//             >
//               <Search size={40} className="text-slate-200" />
//               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
//                 No matching records
//               </p>
//             </motion.div>
//           ) : (
//             filteredBalaks.map((balak, index) => (
//               <motion.div
//                 key={balak._id}
//                 layout
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ delay: index * 0.02 }}
//                 className="bg-white rounded-[2.5rem] p-4 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-50 flex items-center gap-5 group hover:border-indigo-100 transition-colors"
//               >
//                 {/* Photo container */}
//                 <div className="relative shrink-0">
//                   <div className="w-20 h-20 rounded-[1.8rem] overflow-hidden ring-4 ring-slate-50 shadow-sm transition-transform group-hover:scale-105">
//                     <img
//                       src={balak.photoUrl}
//                       className="w-full h-full object-cover"
//                       alt="profile"
//                     />
//                   </div>
//                   <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase border-2 border-white shadow-md">
//                     {balak.standard}
//                   </div>
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between mb-1">
//                     <h3 className="text-lg font-black text-slate-900 truncate tracking-tight">
//                       {formatName(balak.firstName)} {formatName(balak.lastName)}
//                     </h3>
//                     {balak.age && (
//                       <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black px-2 py-0.5 rounded-md">
//                         {balak.age}Y
//                       </span>
//                     )}
//                   </div>

//                   <div className="space-y-1 mb-3">
//                     <div className="flex items-center gap-2 text-slate-400">
//                       <CalendarDays className="w-3 h-3 text-indigo-400" />
//                       <p className="text-[10px] font-bold uppercase tracking-tight">
//                         {balak.dob
//                           ? new Date(balak.dob).toLocaleDateString("en-GB", {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                             })
//                           : "Not Set"}
//                       </p>
//                     </div>
//                     <div className="flex items-start gap-2 text-slate-400">
//                       <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-slate-300" />
//                       <p className="text-[10px] font-semibold leading-tight line-clamp-1 italic">
//                         {balak.address || "Address hidden"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     {balak.mobileNumber && balak.mobileNumber !== "N/A" ? (
//                       <a
//                         href={`tel:${balak.mobileNumber}`}
//                         className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-slate-100"
//                       >
//                         <Phone size={10} className="fill-white" /> Call Parent
//                       </a>
//                     ) : (
//                       <div className="flex-1 bg-slate-50 text-slate-300 py-2.5 rounded-2xl text-[9px] font-black uppercase text-center border border-dashed border-slate-200">
//                         Incomplete Profile
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }






//imp last code
// "use client";
// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Phone,
//   ArrowLeft,
//   MapPin,
//   Search,
//   Users,
//   Cake,
//   CalendarDays,
//   Sparkles,
//   X,
// } from "lucide-react";
// import Link from "next/link";

// // --- SUB-COMPONENT FOR SMOOTH IMAGE LOADING ---
// const BalakImage = ({ src }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   return (
//     <div className="w-20 h-20 rounded-[1.8rem] overflow-hidden ring-4 ring-slate-50 shadow-sm bg-slate-100 relative">
//       {!isLoaded && (
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
//         </div>
//       )}
//       <motion.img
//         initial={{ opacity: 0 }}
//         animate={{ opacity: isLoaded ? 1 : 0 }}
//         transition={{ duration: 0.4 }}
//         onLoad={() => setIsLoaded(true)}
//         src={src}
//         className="w-full h-full object-cover"
//         alt="profile"
//       />
//     </div>
//   );
// };

// export default function KidsInfoPage() {
//   const { data: session } = useSession();
//   const [balaks, setBalaks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const loadBalaks = async () => {
//       if (!session?.user?.area) return;
//       setLoading(true);
//       try {
//         const res = await fetch(`/api/balaks?t=${Date.now()}`, {
//           cache: "no-store",
//           headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
//         });
//         const data = await res.json();
//         setBalaks(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Fetch failed:", err);
//         setBalaks([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadBalaks();
//   }, [session]);

//   // --- AGE CALCULATION LOGIC ---
//   const calculateAge = (dobString) => {
//     if (!dobString) return null;
//     const today = new Date();
//     const birthDate = new Date(dobString);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   const getNextBirthday = () => {
//     if (!balaks || balaks.length === 0) return null;
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const currentYear = today.getFullYear();

//     return balaks
//       .filter((b) => b.dob)
//       .map((b) => {
//         const birthDate = new Date(b.dob);
//         let nextBDay = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
//         if (nextBDay < today) nextBDay.setFullYear(currentYear + 1);
//         return { ...b, nextBDayDate: nextBDay };
//       })
//       .sort((a, b) => a.nextBDayDate - b.nextBDayDate)[0];
//   };

//   const nextBirthdayBalak = getNextBirthday();
//   const formatName = (str) => str?.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());

//   const filteredBalaks = balaks.filter((b) =>
//     `${b.firstName} ${b.lastName} ${b.standard}`.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleClearSearch = () => setSearchQuery("");

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20, scale: 0.95 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         delay: i * 0.05,
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//       },
//     }),
//     exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
//   };

//   if (loading)
//     return (
//       <div className="flex h-screen items-center justify-center bg-[#FDFDFD]">
//         <div className="relative flex items-center justify-center">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//             className="w-12 h-12 border-[3px] border-indigo-100 border-t-indigo-600 rounded-full"
//           />
//           <Sparkles className="absolute text-indigo-600 w-4 h-4 animate-pulse" />
//         </div>
//       </div>
//     );

//   return (
//     <div className="max-w-md mx-auto px-6 pt-12 pb-32 font-sans bg-[#FDFDFD] min-h-screen relative overflow-x-hidden">
//       <div className="fixed top-[-10%] right-[-10%] w-72 h-72 bg-indigo-50/50 rounded-full blur-[100px] -z-10" />
//       <div className="fixed bottom-[10%] left-[-10%] w-64 h-64 bg-blue-50/50 rounded-full blur-[100px] -z-10" />

//       <header className="mb-8 relative z-10">
//         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between mb-8">
//           <Link href="/" className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-500 hover:text-indigo-600 transition-colors">
//             <ArrowLeft size={20} />
//           </Link>
//           <div className="text-right">
//             <div className="flex items-center justify-end gap-1.5 mb-1">
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
//               <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] leading-none">
//                 {session?.user?.area || "Mandal"}
//               </p>
//             </div>
//             <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">Records</h1>
//           </div>
//         </motion.div>

//         <div className="relative group">
//           <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
//             <Search className="w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search kids..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-4.5 pl-12 pr-12 shadow-inner focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all text-sm"
//           />
//           <AnimatePresence>
//             {searchQuery && (
//               <motion.button
//                 initial={{ opacity: 0, scale: 0.5 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.5 }}
//                 whileTap={{ scale: 0.8 }}
//                 onClick={handleClearSearch}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors z-20"
//               >
//                 <X size={14} strokeWidth={3} />
//               </motion.button>
//             )}
//           </AnimatePresence>
//         </div>
//       </header>

//       <div className="grid grid-cols-2 gap-4 mb-10 relative z-10">
//         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 12 }} className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-xl shadow-slate-200 relative overflow-hidden group">
//           <Users className="absolute -right-2 -bottom-2 w-16 h-16 text-white/5 group-hover:scale-110 transition-transform" />
//           <p className="text-4xl font-black tracking-tighter mb-1">{filteredBalaks.length}</p>
//           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Kids</p>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.1 }} className="bg-white rounded-[2.5rem] p-5 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden group">
//           <Cake className="absolute -right-2 -top-2 w-12 h-12 text-pink-500/10 group-hover:rotate-12 transition-transform" />
//           <div className="flex justify-between items-start">
//             <div className="w-8 h-8 bg-pink-50 rounded-xl flex items-center justify-center">
//               <Cake size={16} className="text-pink-500" />
//             </div>
//             {nextBirthdayBalak && <span className="text-[8px] font-black bg-pink-50 text-pink-600 px-2 py-1 rounded-full uppercase">Next</span>}
//           </div>
//           <div className="mt-3">
//             <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Birthday</p>
//             {nextBirthdayBalak ? (
//               <>
//                 <p className="text-[13px] font-black text-slate-900 leading-tight">{formatName(nextBirthdayBalak.firstName)} {formatName(nextBirthdayBalak.lastName)}</p>
//                 <div className="flex justify-between items-center mt-1">
//                   <p className="text-[11px] font-bold text-indigo-600">{new Date(nextBirthdayBalak.dob).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}</p>
//                   <p className="text-[10px] font-black text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md">{calculateAge(nextBirthdayBalak.dob)} Yrs</p>
//                 </div>
//               </>
//             ) : (
//               <p className="text-xs font-bold text-slate-300 italic">No Data</p>
//             )}
//           </div>
//         </motion.div>
//       </div>

//       <div className="space-y-4 relative z-10">
//         <AnimatePresence mode="popLayout">
//           {filteredBalaks.length === 0 ? (
//             <motion.div key="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 flex flex-col items-center gap-3">
//               <Search size={40} className="text-slate-200" />
//               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No matching records</p>
//             </motion.div>
//           ) : (
//             filteredBalaks.map((balak, index) => (
//               <motion.div
//                 key={balak._id}
//                 layout
//                 custom={index}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className="bg-white rounded-[2.5rem] p-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-50 flex items-start gap-5 group hover:border-indigo-100 transition-colors"
//               >
//                 <div className="relative shrink-0 mt-1">
//                   <BalakImage src={balak.photoUrl} />
//                   <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase border-2 border-white shadow-md">
//                     {balak.standard}
//                   </div>
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between mb-1.5">
//                     <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
//                       {formatName(balak.firstName)} {formatName(balak.lastName)}
//                     </h3>
//                     <span className="text-slate-400 bg-slate-50 text-[10px] font-black px-2 py-0.5 rounded-lg shrink-0">
//                       {calculateAge(balak.dob)} Yrs
//                     </span>
//                   </div>

//                   <div className="space-y-2 mb-4">
//                     <div className="flex items-center gap-2 text-slate-500">
//                       <CalendarDays className="w-3.5 h-3.5 text-indigo-400" />
//                       <p className="text-[11px] font-bold uppercase tracking-tight">
//                         {balak.dob ? new Date(balak.dob).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Not Set"}
//                       </p>
//                     </div>
//                     <div className="flex items-start gap-2 text-slate-500">
//                       <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" />
//                       <p className="text-[11px] font-semibold leading-relaxed break-words">
//                         {balak.address || "No address provided"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     {balak.mobileNumber && balak.mobileNumber !== "N/A" ? (
//                       <a
//                         href={`tel:${balak.mobileNumber}`}
//                         className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-slate-100"
//                       >
//                         <Phone size={10} className="fill-white" /> Call Parent
//                       </a>
//                     ) : (
//                       <div className="flex-1 bg-slate-50 text-slate-300 py-3 rounded-2xl text-[9px] font-black uppercase text-center border border-dashed border-slate-200">
//                         No Number
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }







"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  ArrowLeft,
  MapPin,
  Search,
  Users,
  Cake,
  CalendarDays,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";

// --- SUB-COMPONENT FOR SMOOTH IMAGE LOADING ---
const BalakImage = ({ src }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="w-20 h-20 rounded-[1.8rem] overflow-hidden ring-4 ring-slate-50 shadow-sm bg-slate-100 relative shrink-0">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      )}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        onLoad={() => setIsLoaded(true)}
        src={src}
        className="w-full h-full object-cover"
        alt="profile"
      />
    </div>
  );
};

export default function KidsInfoPage() {
  const { data: session } = useSession();
  const [balaks, setBalaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadBalaks = async () => {
      if (!session?.user?.area) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/balaks?t=${Date.now()}`, {
          cache: "no-store",
          headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
        });
        const data = await res.json();
        setBalaks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch failed:", err);
        setBalaks([]);
      } finally {
        setLoading(false);
      }
    };
    loadBalaks();
  }, [session]);

  const calculateAge = (dobString) => {
    if (!dobString) return null;
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getNextBirthday = () => {
    if (!balaks || balaks.length === 0) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentYear = today.getFullYear();

    return balaks
      .filter((b) => b.dob)
      .map((b) => {
        const birthDate = new Date(b.dob);
        let nextBDay = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
        if (nextBDay < today) nextBDay.setFullYear(currentYear + 1);
        return { ...b, nextBDayDate: nextBDay };
      })
      .sort((a, b) => a.nextBDayDate - b.nextBDayDate)[0];
  };

  const nextBirthdayBalak = getNextBirthday();
  const formatName = (str) => str?.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());

  const filteredBalaks = balaks.filter((b) =>
    `${b.firstName} ${b.lastName} ${b.standard}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearSearch = () => setSearchQuery("");

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }),
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-[#FDFDFD]">
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-[3px] border-indigo-100 border-t-indigo-600 rounded-full"
          />
          <Sparkles className="absolute text-indigo-600 w-4 h-4 animate-pulse" />
        </div>
      </div>
    );

  return (
    <div className="mx-auto px-6 pt-12 pb-32 font-sans bg-[#FDFDFD] min-h-screen relative overflow-x-hidden max-w-[1400px]">
      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-10%] w-72 h-72 bg-indigo-50/50 rounded-full blur-[100px] -z-10" />
      <div className="fixed bottom-[10%] left-[-10%] w-64 h-64 bg-blue-50/50 rounded-full blur-[100px] -z-10" />

      {/* Header - Centered for larger screens */}
      <header className="mb-8 relative z-10 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <Link href="/" className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] leading-none">
                {session?.user?.area || "Mandal"}
              </p>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">Records</h1>
          </div>
        </motion.div>

        <div className="relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
            <Search className="w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search kids..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-4.5 pl-12 pr-12 shadow-inner focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all text-sm"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                whileTap={{ scale: 0.8 }}
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors z-20"
              >
                <X size={14} strokeWidth={3} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Stats Summary - Adapts to Grid on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 relative z-10 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 12 }} className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-xl shadow-slate-200 relative overflow-hidden group">
          <Users className="absolute -right-2 -bottom-2 w-16 h-16 text-white/5 group-hover:scale-110 transition-transform" />
          <p className="text-4xl font-black tracking-tighter mb-1">{filteredBalaks.length}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Kids</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.1 }} className="bg-white rounded-[2.5rem] p-5 border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <Cake className="absolute -right-2 -top-2 w-12 h-12 text-pink-500/10 group-hover:rotate-12 transition-transform" />
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 bg-pink-50 rounded-xl flex items-center justify-center">
              <Cake size={16} className="text-pink-500" />
            </div>
            {nextBirthdayBalak && <span className="text-[8px] font-black bg-pink-50 text-pink-600 px-2 py-1 rounded-full uppercase">Next</span>}
          </div>
          <div className="mt-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Birthday</p>
            {nextBirthdayBalak ? (
              <>
                <p className="text-[13px] font-black text-slate-900 leading-tight">{formatName(nextBirthdayBalak.firstName)} {formatName(nextBirthdayBalak.lastName)}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[11px] font-bold text-indigo-600">{new Date(nextBirthdayBalak.dob).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}</p>
                  <p className="text-[10px] font-black text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md">{calculateAge(nextBirthdayBalak.dob)} Yrs</p>
                </div>
              </>
            ) : (
              <p className="text-xs font-bold text-slate-300 italic">No Data</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Kids List Grid - Responsive across all devices */}
      <div className="relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredBalaks.length === 0 ? (
            <motion.div key="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 flex flex-col items-center gap-3">
              <Search size={40} className="text-slate-200" />
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No matching records</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBalaks.map((balak, index) => (
                <motion.div
                  key={balak._id}
                  layout
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-[2.5rem] p-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-50 flex items-start gap-5 group hover:border-indigo-100 transition-all"
                >
                  <div className="relative shrink-0 mt-1">
                    <BalakImage src={balak.photoUrl} />
                    <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase border-2 border-white shadow-md">
                      {balak.standard}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                        {formatName(balak.firstName)} {formatName(balak.lastName)}
                      </h3>
                      <span className="text-slate-400 bg-slate-50 text-[10px] font-black px-2 py-0.5 rounded-lg shrink-0">
                        {calculateAge(balak.dob)} Yrs
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-slate-500">
                        <CalendarDays className="w-3.5 h-3.5 text-indigo-400" />
                        <p className="text-[11px] font-bold uppercase tracking-tight">
                          {balak.dob ? new Date(balak.dob).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Not Set"}
                        </p>
                      </div>
                      <div className="flex items-start gap-2 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" />
                        <p className="text-[11px] font-semibold leading-relaxed break-words">
                          {balak.address || "No address provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {balak.mobileNumber && balak.mobileNumber !== "N/A" ? (
                        <a
                          href={`tel:${balak.mobileNumber}`}
                          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-slate-100"
                        >
                          <Phone size={10} className="fill-white" /> Call Parent
                        </a>
                      ) : (
                        <div className="flex-1 bg-slate-50 text-slate-300 py-3 rounded-2xl text-[9px] font-black uppercase text-center border border-dashed border-slate-200">
                          No Number
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}