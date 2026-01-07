//og
// "use client";

// import { useState, useEffect } from 'react';

// import { useSession } from 'next-auth/react';

// import { toast } from 'sonner';

// import { format, addMonths, subMonths } from 'date-fns';

// import { motion, AnimatePresence } from 'framer-motion';

// import {

//   ClipboardCheck,

//   LayoutList,

//   ArrowLeft,

//   CheckCircle2,

//   XCircle,

//   Calendar,

//   Users,

//   ChevronLeft,

//   ChevronRight,

//   Sparkles,

//   Lock

// } from 'lucide-react';

// import { getSundaysInMonth } from '@/lib/utils';

// import Link from 'next/link';

// export default function AttendanceUnifiedPage() {

//   const { data: session } = useSession();

//   const [view, setView] = useState('hub');

//   const [balaks, setBalaks] = useState([]);

//   const [history, setHistory] = useState([]);

//   const [selectedDate, setSelectedDate] = useState("");

//   const [attendanceState, setAttendanceState] = useState({});

//   const [loading, setLoading] = useState(false);

//   const [savedDates, setSavedDates] = useState([]);

//   const [currentActiveMonth, setCurrentActiveMonth] = useState(new Date());

//   const currentMonthSundays = getSundaysInMonth(format(currentActiveMonth, 'yyyy-MM'));

//   const formatName = (str) => str?.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());

//   useEffect(() => {

//     const fetchData = async () => {

//       // 1. Critical Guard: Wait for the session and area to load

//       if (!session?.user?.area) return;

//       setLoading(true);

//       try {

//         // 2. Fetch Attendance History with cache-busting and area context

//         if (view === 'take' || view === 'view') {

//           const res = await fetch(`/api/attendance?t=${Date.now()}`);

//           const data = await res.json();

//           const validData = Array.isArray(data) ? data : [];

//           const monthKey = format(currentActiveMonth, 'yyyy-MM');

//           // Double-check filtering in frontend as a safety layer

//           const filteredHistory = validData.filter(s =>

//             s.area === session.user.area && s.date.startsWith(monthKey)

//           );

//           setHistory(filteredHistory);

//           setSavedDates(filteredHistory.map(s => s.date));

//         }

//         // 3. Fetch Balaks filtered by area

//         if (view === 'take') {

//           const res = await fetch(`/api/balaks?t=${Date.now()}`);

//           const data = await res.json();

//           // Ensure only kids from this area are displayed

//           setBalaks(Array.isArray(data) ? data.filter(b => b.area === session.user.area) : []);

//         }

//       } catch (err) {

//         console.error("Attendance Load Error:", err);

//         toast.error("Could not load records");

//       } finally {

//         setLoading(false);

//       }

//     };

//     fetchData();

//   }, [view, session, currentActiveMonth]);

//   const handleStatusChange = (id, status) => {

//     if (!selectedDate) return toast.error("Select a Sunday first!");

//     setAttendanceState(prev => ({ ...prev, [id]: status }));

//   };

//   const submitAttendance = async () => {

//     if (!selectedDate) return toast.error("Select a Sunday first!");

//     const unmarkedKids = balaks.filter(b => !attendanceState[b._id]);

//     if (unmarkedKids.length > 0) return toast.error(`Please mark all kids!`);

//     setLoading(true);

//     try {

//       const res = await fetch('/api/attendance', {

//         method: 'POST',

//         headers: { 'Content-Type': 'application/json' },

//         body: JSON.stringify({

//           attendanceList: balaks.map(b => ({

//             balakId: b._id,

//             fullName: `${b.firstName} ${b.lastName}`,

//             status: attendanceState[b._id]

//           })),

//           date: selectedDate,

//           area: session.user.area

//         })

//       });

//       if (res.ok) {

//         toast.success("Sabha Locked Successfully!");

//         setView('hub');

//       } else {

//         toast.error("Error saving records.");

//       }

//     } catch (err) {

//       toast.error("Network error.");

//     } finally {

//       setLoading(false);

//     }

//   };

//   const isDateLocked = savedDates.includes(selectedDate);

//   const MonthPicker = () => (

//     <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-2 rounded-3xl border border-slate-200 shadow-sm mb-6">

//       <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCurrentActiveMonth(prev => subMonths(prev, 1))} className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl">

//         <ChevronLeft className="w-5 h-5 text-slate-600" />

//       </motion.button>

//       <div className="text-center px-4">

//         <h2 className="text-lg font-black text-slate-900 tracking-tight">{format(currentActiveMonth, 'MMMM yyyy')}</h2>

//       </div>

//       <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCurrentActiveMonth(prev => addMonths(prev, 1))} className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl">

//         <ChevronRight className="w-5 h-5 text-slate-600" />

//       </motion.button>

//     </div>

//   );

//   // --- 1. HUB VIEW ---

//   if (view === 'hub') return (

//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8F8F7] px-6 pt-20 pb-12 font-sans">

//       <Link href="/" className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mb-10 hover:text-indigo-600 transition-colors">

//         <ArrowLeft className="w-4 h-4" /> Home Dashboard

//       </Link>

//       <header className="mb-12">

//         <h1 className="text-4xl font-black text-slate-950 tracking-tighter leading-none uppercase">Attendance</h1>

//         <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-4">{session?.user?.area}</p>

//       </header>

//       <div className="grid gap-4">

//         <button onClick={() => setView('take')} className="bg-slate-900 p-8 rounded-[2.5rem] flex items-center gap-6 text-white shadow-2xl">

//           <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center"><ClipboardCheck className="w-7 h-7" /></div>

//           <div className="text-left"><h2 className="text-xl font-black uppercase">Take</h2><p className="text-slate-400 text-[10px] font-bold tracking-widest mt-1">Mark New Sabha</p></div>

//         </button>

//         <button onClick={() => setView('view')} className="bg-white p-8 rounded-[2.5rem] flex items-center gap-6 text-slate-900 border border-slate-200">

//           <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center"><LayoutList className="w-7 h-7" /></div>

//           <div className="text-left"><h2 className="text-xl font-black uppercase">View</h2><p className="text-slate-400 text-[10px] font-bold tracking-widest mt-1">History & Reports</p></div>

//         </button>

//       </div>

//     </motion.div>

//   );

//   // --- 2. TAKE VIEW ---

//   if (view === 'take') return (

//     <div className="min-h-screen bg-[#F8F8F7] px-6 pt-12 pb-44">

//       <motion.button whileTap={{ scale: 0.9 }} onClick={() => setView('hub')} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-200 mb-8 text-slate-400">

//         <ArrowLeft className="w-5 h-5" />

//       </motion.button>

//       <MonthPicker />

//       <div className="mb-10 space-y-3">

//         <div className="relative">

//             <select

//                 value={selectedDate}

//                 onChange={(e) => { setSelectedDate(e.target.value); setAttendanceState({}); }}

//                 className="w-full h-16 bg-white border-2 border-slate-100 rounded-2xl px-6 font-black text-indigo-600 outline-none"

//             >

//                 <option value="">Choose a Sunday</option>

//                 {currentMonthSundays.map(s => <option key={s.date} value={s.date}>{s.displayDate}</option>)}

//             </select>

//         </div>

//         {isDateLocked && (

//             <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center justify-center gap-3 text-red-600">

//                 <Lock className="w-4 h-4" />

//                 <span className="text-[10px] font-black uppercase tracking-widest">Attendance Locked</span>

//             </div>

//         )}

//       </div>

//       <div className={`space-y-4 ${isDateLocked ? 'opacity-30 pointer-events-none' : ''}`}>

//         {balaks.map((balak, idx) => (

//           <div key={balak._id} className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm">

//             <div className="flex items-center gap-4 mb-6">

//               <img src={balak.photoUrl} className="w-16 h-16 rounded-2xl object-cover shadow-sm ring-4 ring-slate-50" />

//               <div className="flex-1">

//                 <h3 className="font-black text-slate-900 text-lg">{formatName(balak.firstName)} {formatName(balak.lastName)}</h3>

//                 <span className="inline-block bg-indigo-50 text-indigo-600 text-[9px] font-black px-2 py-0.5 rounded-md mt-1 uppercase">

//                     {balak.age ? `${balak.age} Years Old` : `${balak.standard} Standard`}

//                 </span>

//               </div>

//             </div>

//             <div className="grid grid-cols-2 gap-3">

//               <button onClick={() => handleStatusChange(balak._id, "Present")} className={`h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest ${attendanceState[balak._id] === "Present" ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400'}`}>Present</button>

//               <button onClick={() => handleStatusChange(balak._id, "Absent")} className={`h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest ${attendanceState[balak._id] === "Absent" ? 'bg-red-500 text-white' : 'bg-red-50 text-red-400'}`}>Absent</button>

//             </div>

//           </div>

//         ))}

//       </div>

//       {!isDateLocked && (

//         <div className="fixed bottom-10 left-6 right-6 z-50">

//           <button onClick={submitAttendance} disabled={loading || !selectedDate || balaks.length === 0} className="w-full h-16 bg-slate-950 text-white rounded-[2rem] font-black uppercase text-sm tracking-widest shadow-2xl disabled:opacity-50">

//             {loading ? "Processing..." : "Lock Attendance"}

//           </button>

//         </div>

//       )}

//     </div>

//   );

//   // --- 3. VIEW HISTORY VIEW ---

//   if (view === 'view') return (

//     <div className="min-h-screen bg-[#F8F8F7] px-6 pt-12 pb-24">

//       <motion.button whileTap={{ scale: 0.9 }} onClick={() => setView('hub')} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-200 mb-8 text-slate-400">

//         <ArrowLeft className="w-5 h-5" />

//       </motion.button>

//       <MonthPicker />

//       <h1 className="text-3xl font-black text-slate-950 tracking-tighter uppercase mb-8">Sabha Logs</h1>

//       <div className="space-y-6">

//         {loading ? (

//           <div className="text-center py-20 text-slate-400 font-bold animate-pulse">Scanning Logs...</div>

//         ) : history.length === 0 ? (

//           <div className="text-center py-20 px-10">

//             <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-4" />

//             <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No records found for this period</p>

//           </div>

//         ) : history.map((session, i) => {

//           const presentCount = session.attendanceList?.filter(item => item.status === "Present").length || 0;

//           return (

//             <motion.div

//                 initial={{ opacity: 0, y: 20 }}

//                 animate={{ opacity: 1, y: 0 }}

//                 key={i}

//                 className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm mb-4"

//             >

//               <div className="flex items-center justify-between mb-6">

//                 <div>

//                   <h3 className="font-black text-slate-900 text-lg uppercase leading-none">{format(new Date(session.date), 'do MMM')}</h3>

//                   <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-2">{format(new Date(session.date), 'yyyy')}</p>

//                 </div>

//                 <div className="bg-emerald-50 px-4 py-2 rounded-2xl flex items-center gap-2">

//                     <Users className="w-4 h-4 text-emerald-600" />

//                     <span className="text-[11px] font-black text-emerald-700">{presentCount}/{session.attendanceList?.length}</span>

//                 </div>

//               </div>

//               <div className="grid gap-2">

//                 {session.attendanceList?.map((log, idx) => (

//                   <div key={idx} className="flex justify-between items-center bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100/50">

//                     <span className="font-bold text-slate-700 text-xs">{formatName(log.fullName)}</span>

//                     <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md ${log.status === "Present" ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>{log.status}</span>

//                   </div>

//                 ))}

//               </div>

//             </motion.div>

//           );

//         })}

//       </div>

//     </div>

//   );

//   return <div />;

// }





//imp
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  addDays,
  isToday,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Sparkles,
  ClipboardCheck,
  LayoutList,
  ChevronLeft,
  ChevronRight,
  Lock,
  History,
  Activity,
  Home,
  ArrowUpLeft,
} from "lucide-react";
import Link from "next/link";

export default function AttendanceUnifiedPage() {
  const { data: session } = useSession();
  const [view, setView] = useState("hub");
  const [balaks, setBalaks] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceState, setAttendanceState] = useState({});
  const [loading, setLoading] = useState(false);
  const [savedDates, setSavedDates] = useState([]);
  const [currentActiveMonth, setCurrentActiveMonth] = useState(new Date());

  const formatName = (str) =>
    str?.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.area) return;
      setLoading(true);
      try {
        if (view === "take" || view === "view") {
          const res = await fetch(`/api/attendance?t=${Date.now()}`);
          const data = await res.json();
          const validData = Array.isArray(data) ? data : [];
          setHistory(validData.filter((s) => s.area === session.user.area));
          setSavedDates(
            validData
              .filter((s) => s.area === session.user.area)
              .map((s) => s.date)
          );
        }
        if (view === "take") {
          const res = await fetch(`/api/balaks?t=${Date.now()}`);
          const data = await res.json();
          setBalaks(
            Array.isArray(data)
              ? data.filter((b) => b.area === session.user.area)
              : []
          );
        }
      } catch (err) {
        console.error("Attendance Load Error:", err);
        toast.error("Could not load records");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [view, session]);

  const handleStatusChange = (id, status) => {
    if (!selectedDate)
      return toast.error("Select a date from the calendar first!");
    setAttendanceState((prev) => ({ ...prev, [id]: status }));
  };

  const submitAttendance = async () => {
    const unmarkedKids = balaks.filter((b) => !attendanceState[b._id]);
    if (unmarkedKids.length > 0) return toast.error(`Please mark all kids!`);

    setLoading(true);
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attendanceList: balaks.map((b) => ({
            balakId: b._id,
            fullName: `${b.firstName} ${b.lastName}`,
            status: attendanceState[b._id],
          })),
          date: selectedDate,
          area: session.user.area,
        }),
      });
      if (res.ok) {
        toast.success("Attendance Saved!");
        setView("hub");
      }
    } catch (err) {
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  };

  const isDateLocked = savedDates.includes(selectedDate);

  const MonthPicker = () => (
    <div className="flex items-center justify-between bg-white/60 backdrop-blur-xl p-2 rounded-3xl border border-white shadow-xl shadow-slate-200/50 mb-8">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setCurrentActiveMonth((prev) => subMonths(prev, 1))}
        className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-600"
      >
        <ChevronLeft size={20} />
      </motion.button>
      <div className="text-center px-4">
        <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">
          {format(currentActiveMonth, "MMMM yyyy")}
        </h2>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setCurrentActiveMonth((prev) => addMonths(prev, 1))}
        className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-600"
      >
        <ChevronRight size={20} />
      </motion.button>
    </div>
  );

  const ModernCalendar = () => {
    const monthStart = startOfMonth(currentActiveMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "yyyy-MM-dd");
        const isSelected = selectedDate === formattedDate;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const hasData = savedDates.includes(formattedDate);

        days.push(
          <div
            key={formattedDate}
            onClick={() => {
              if (isCurrentMonth) {
                setSelectedDate(formattedDate);
                setAttendanceState({});
              }
            }}
            className={`relative h-12 flex flex-col items-center justify-center cursor-pointer rounded-xl transition-all duration-300
              ${!isCurrentMonth ? "opacity-10" : "hover:bg-indigo-50"}
              ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105 z-10"
                  : "text-slate-700"
              }
            `}
          >
            <span className="text-sm font-bold">{format(day, "d")}</span>
            {hasData && !isSelected && (
              <div className="absolute bottom-1.5 w-1 h-1 bg-indigo-400 rounded-full" />
            )}
            {isToday(day) && !isSelected && (
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-orange-500 rounded-full" />
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="bg-white rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 mb-8">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            {format(currentActiveMonth, "MMMM yyyy")}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setCurrentActiveMonth(subMonths(currentActiveMonth, 1))
              }
              className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() =>
                setCurrentActiveMonth(addMonths(currentActiveMonth, 1))
              }
              className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              key={d}
              className="text-center text-[10px] font-black uppercase tracking-widest text-slate-300 py-2"
            >
              {d}
            </div>
          ))}
        </div>
        {rows}
      </div>
    );
  };

  // --- 1. HUB VIEW ---
  if (view === "hub")
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#FDFDFD] px-6 pt-20 pb-12 font-sans relative overflow-hidden"
      >
        <div className="absolute top-[-5%] right-[-5%] w-64 h-64 bg-indigo-50 blur-[100px] rounded-full -z-10" />
        <header className="mb-14 px-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest leading-none">
              {session?.user?.area}
            </p>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight uppercase">
            Attendance Portal
          </h1>
        </header>
        <div className="grid gap-5">
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView("take")}
            className="bg-slate-900 p-8 rounded-[3rem] flex items-center gap-6 text-white shadow-2xl relative overflow-hidden group"
          >
            <div className="w-16 h-16 bg-indigo-500 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ClipboardCheck size={32} />
            </div>
            <div className="text-left z-10">
              <h2 className="text-2xl font-black tracking-tight uppercase">
                Take
              </h2>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                Mark New Sabha
              </p>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView("view")}
            className="bg-white p-8 rounded-[3rem] flex items-center gap-6 text-slate-900 border border-slate-100 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] group relative overflow-hidden"
          >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center">
              <LayoutList size={32} />
            </div>
            <div className="text-left z-10">
              <h2 className="text-2xl font-black tracking-tight uppercase">
                View
              </h2>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                Logs & Reports
              </p>
            </div>
          </motion.button>
          <Link
            href="/"
            className=" mt-4 flex items-center justify-center gap-2 bg-slate-100 py-5 rounded-[2rem] text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] border border-slate-200 hover:bg-white transition-all"
          >
            <Home size={14} /> Back to Dashboard
          </Link>
        </div>
      </motion.div>
    );

  // --- 2. TAKE VIEW ---
  if (view === "take")
    return (
      <div className="min-h-screen bg-[#FDFDFD] px-6 pt-14 pb-44">
        <header className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400"
          >
            <Home size={20} />
          </Link>
          <h1 className="text-lg font-black text-slate-900 tracking-tight uppercase text-center">
            Take Attendance
          </h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setView("hub");
              setSelectedDate("");
            }}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-indigo-600"
          >
            <ArrowUpLeft size={20} />
          </motion.button>
        </header>

        <ModernCalendar />

        {selectedDate && (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Date: {format(new Date(selectedDate), "do MMMM")}
                </span>
                {isDateLocked && (
                  <span className="bg-red-50 text-red-500 text-[9px] font-black px-3 py-1 rounded-full border border-red-100 uppercase tracking-widest flex items-center gap-1">
                    <Lock size={10} /> Locked
                  </span>
                )}
              </div>

              <div
                className={`space-y-4 ${
                  isDateLocked ? "opacity-40 grayscale pointer-events-none" : ""
                }`}
              >
                {balaks.map((balak) => (
                  <div
                    key={balak._id}
                    className="bg-white p-5 rounded-[2.5rem] border border-slate-50 shadow-sm"
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <img
                        src={balak.photoUrl}
                        className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50"
                      />
                      <h3 className="font-black text-slate-900 text-lg flex-1 leading-tight">
                        {formatName(balak.firstName)}{" "}
                        {formatName(balak.lastName)}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleStatusChange(balak._id, "Present")}
                        className={`h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                          attendanceState[balak._id] === "Present"
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-50 text-slate-400"
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleStatusChange(balak._id, "Absent")}
                        className={`h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                          attendanceState[balak._id] === "Absent"
                            ? "bg-red-500 text-white"
                            : "bg-red-50 text-red-400"
                        }`}
                      >
                        Absent
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {selectedDate && !isDateLocked && balaks.length > 0 && (
          <div className="fixed bottom-10 left-6 right-6 z-50">
            <motion.button
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={submitAttendance}
              className="w-full h-16 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-sm tracking-[0.2em] shadow-2xl"
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Save attendance"
              )}
            </motion.button>
          </div>
        )}
      </div>
    );

  // --- 3. VIEW HISTORY VIEW ---
  if (view === "view")
    return (
      <div className="min-h-screen bg-[#FDFDFD] px-6 pt-14 pb-24">
        <header className="flex items-center justify-between mb-8 px-2">
          <Link
            href="/"
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400"
          >
            <Home size={20} />
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-black text-slate-900 tracking-tight uppercase leading-none">
              History
            </h1>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">
              Sabha Logs
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setView("hub")}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-indigo-600"
          >
            <ArrowUpLeft size={20} />
          </motion.button>
        </header>

        <MonthPicker />

        <div className="space-y-6">
          {history.filter((s) =>
            s.date.startsWith(format(currentActiveMonth, "yyyy-MM"))
          ).length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center gap-4">
              <History size={48} className="text-slate-200" />
              <p className="opacity-30 font-black uppercase text-[10px] tracking-widest">
                No Logs for this month
              </p>
            </div>
          ) : (
            history
              .filter((s) =>
                s.date.startsWith(format(currentActiveMonth, "yyyy-MM"))
              )
              .map((session, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={session._id || i}
                  className="bg-white rounded-[2.5rem] p-6 border border-slate-50 shadow-sm mb-4"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-black text-slate-900 text-xl tracking-tighter uppercase leading-none">
                        {format(new Date(session.date), "do MMMM")}
                      </h3>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                        Attendance Summary
                      </p>
                    </div>
                    <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-slate-200">
                      {
                        session.attendanceList?.filter(
                          (it) => it.status === "Present"
                        ).length
                      }
                      /{session.attendanceList?.length}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    {session.attendanceList?.map((log, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center bg-slate-50/50 px-5 py-4 rounded-2xl border border-slate-100/30"
                      >
                        <span className="font-bold text-slate-700 text-sm">
                          {formatName(log.fullName)}
                        </span>
                        <span
                          className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg ${
                            log.status === "Present"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {log.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
          )}
        </div>
      </div>
    );

  return null;
}
