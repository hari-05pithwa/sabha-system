// // og
// "use client";
// import { useState, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowLeft, Camera, Phone, MapPin, CheckCircle2, Loader2, Cake, GraduationCap, ChevronDown } from 'lucide-react';
// import CameraCapture from '@/components/CameraCapture';
// import { toast } from 'sonner';

// export default function RegistrationPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const photoUrlRef = useRef("");
//   const [hasNumber, setHasNumber] = useState(true);

//   // 1. Added 'standard' to state
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     mobileNumber: '',
//     address: '',
//     dob: '',
//     standard: ''
//   });

//   const standards = ["Sr. KG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

//   const inputStyle = "w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 text-sm shadow-inner appearance-none";
//   const labelStyle = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 mb-2 block";

//   const handleRegister = async () => {
//     // 2. Added standard to validation
//     if (!formData.firstName || !formData.lastName || !formData.address || !formData.dob || !formData.standard) {
//       return toast.error("Please fill all required fields");
//     }

//     if (hasNumber) {
//       const phoneRegex = /^\d{10}$/;
//       if (!phoneRegex.test(formData.mobileNumber)) {
//         return toast.error("Please enter a valid 10-digit mobile number");
//       }
//     }

//     if (!photoUrlRef.current) {
//         return toast.error("Please capture a profile photo");
//     }

//     setLoading(true);
//     try {
//       const res = await fetch('/api/balaks', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...formData,
//           mobileNumber: hasNumber ? formData.mobileNumber : "N/A",
//           photoUrl: photoUrlRef.current
//         }),
//       });

//       if (res.ok) {
//         toast.success("Balak Registered Successfully!");
//         router.push('/');
//       } else {
//         toast.error("Failed to register.");
//       }
//     } catch (err) {
//       toast.error("Network error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen bg-[#F8F8F7] px-6 pt-12 pb-24 font-sans">
//       <header className="flex items-center justify-between mb-8">
//         <motion.button whileTap={{ scale: 0.9 }} onClick={() => router.back()} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400">
//           <ArrowLeft className="w-5 h-5" />
//         </motion.button>
//         <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Enrollment</h1>
//         <div className="w-12" />
//       </header>

//       <div className="bg-white rounded-[3.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white">
//         <div className="mb-10 flex flex-col items-center">
//            <div className="relative group">
//               <CameraCapture onUpload={(url) => { photoUrlRef.current = url; }} />

//            </div>
//         </div>

//         <div className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className={labelStyle}>First Name</label>
//               <input className={inputStyle}  value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
//             </div>
//             <div>
//               <label className={labelStyle}>Last Name</label>
//               <input className={inputStyle}  value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//              {/* Date of Birth */}
//             <div>
//               <label className={labelStyle}>Date of Birth</label>
//               <div className="relative">
//                 <Cake className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
//                 <input
//                   type="date"
//                   className={`${inputStyle} pl-12`}
//                   value={formData.dob}
//                   onChange={e => setFormData({...formData, dob: e.target.value})}
//                 />
//               </div>
//             </div>

//             {/* 3. New Standard Selection Field */}
//             <div>
//               <label className={labelStyle}>Standard</label>
//               <div className="relative">
//                 <GraduationCap className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
//                 <select
//                   className={`${inputStyle} pl-12 pr-10`}
//                   value={formData.standard}
//                   onChange={e => setFormData({...formData, standard: e.target.value})}
//                 >
//                   <option value="" disabled>Select</option>
//                   {standards.map((std) => (
//                     <option key={std} value={std}>{std}</option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-slate-50/50 p-5 rounded-[2rem] border border-slate-100">
//             <div className="flex items-center justify-between mb-4">
//                <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
//                     <Phone className={`w-4 h-4 ${hasNumber ? 'text-indigo-600' : 'text-slate-300'}`} />
//                   </div>
//                   <span className="text-xs font-black uppercase tracking-widest text-slate-600">Mobile Number</span>
//                </div>
//                <button type="button" onClick={() => setHasNumber(!hasNumber)} className={`w-12 h-6 rounded-full transition-all relative ${hasNumber ? 'bg-indigo-600' : 'bg-slate-200'}`}>
//                  <motion.div animate={{ x: hasNumber ? 26 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"/>
//                </button>
//             </div>
//             <AnimatePresence mode="wait">
//               {hasNumber && (
//                 <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
//                   <input className={inputStyle} type="tel" placeholder="10 digit number" value={formData.mobileNumber} onChange={e => setFormData({...formData, mobileNumber: e.target.value})} />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           <div>
//             <label className={labelStyle}>Residential Address</label>
//             <div className="relative">
//                 <MapPin className="absolute left-5 top-5 w-4 h-4 text-slate-300" />
//                 <textarea rows="3" className={`${inputStyle} pl-12 pt-5 resize-none`} placeholder="Address..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
//             </div>
//           </div>

//           <motion.button whileTap={{ scale: 0.95 }} onClick={handleRegister} disabled={loading} className="w-full bg-slate-950 text-white font-black py-6 rounded-[2.5rem] shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 uppercase tracking-widest text-sm mt-4 disabled:opacity-70">
//             {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
//               <><CheckCircle2 className="w-5 h-5" /> Register Balak</>
//             )}
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }




//last code
// "use client";
// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowLeft,
//   Phone,
//   MapPin,
//   CheckCircle2,
//   Loader2,
//   Cake,
//   GraduationCap,
//   ChevronDown,
//   User,
//   Sparkles,
//   CalendarDays
// } from "lucide-react";
// import CameraCapture from "@/components/CameraCapture";
// import { toast } from "sonner";

// export default function RegistrationPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const photoUrlRef = useRef("");
//   const [hasNumber, setHasNumber] = useState(true);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     mobileNumber: "",
//     address: "",
//     dob: "", // Format: YYYY-MM-DD for API
//     standard: "",
//   });

//   const [displayDob, setDisplayDob] = useState(""); // Format: DD/MM/YYYY for UI

//   const standards = ["Jr. KG", "Sr. KG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

//   const inputStyle = "w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300 text-sm appearance-none";
//   const labelStyle = "text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 ml-4 mb-2 block";

//   // --- Fast Date Typing Logic ---
//   const handleDateChange = (e) => {
//     let val = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
//     let formatted = val;

//     if (val.length > 2 && val.length <= 4) {
//       formatted = `${val.slice(0, 2)}/${val.slice(2)}`;
//     } else if (val.length > 4) {
//       formatted = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4, 8)}`;
//     }

//     setDisplayDob(formatted);

//     // If complete (DD/MM/YYYY), convert to YYYY-MM-DD for the API
//     if (formatted.length === 10) {
//       const [d, m, y] = formatted.split("/");
//       setFormData({ ...formData, dob: `${y}-${m}-${d}` });
//     }
//   };

//   const handleRegister = async () => {
//     if (!formData.firstName || !formData.lastName || !formData.address || !formData.dob || !formData.standard) {
//       return toast.error("Please fill all required fields");
//     }
//     if (hasNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
//       return toast.error("Enter a valid 10-digit number");
//     }
//     if (!photoUrlRef.current) {
//       return toast.error("Profile photo is mandatory");
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/balaks", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           mobileNumber: hasNumber ? formData.mobileNumber : "N/A",
//           photoUrl: photoUrlRef.current,
//         }),
//       });

//       if (res.ok) {
//         toast.success("Balak Registered Successfully!");
//         router.push("/");
//         router.refresh();
//       } else {
//         toast.error("Failed to register.");
//       }
//     } catch (err) {
//       toast.error("Network error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen bg-[#FDFDFD] px-6 pt-12 pb-24 font-sans relative overflow-hidden">
//       <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 blur-3xl rounded-full -mr-32 -mt-32" />

//       <header className="flex items-center justify-between mb-8 relative z-10">
//         <motion.button whileTap={{ scale: 0.9 }} onClick={() => router.back()} className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-500">
//           <ArrowLeft size={20} />
//         </motion.button>
//         <div className="text-center">
//           <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Registration</h1>
//           <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest flex items-center justify-center gap-1">
//             Balak Sabha
//           </p>
//         </div>
//         <div className="w-11" />
//       </header>

//       <div className="bg-white rounded-[3.5rem] p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-white relative z-10">
//         <div className="mb-10 flex flex-col items-center">
//           <CameraCapture onUpload={(url) => { photoUrlRef.current = url; }} />
//         </div>

//         <div className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-1">
//               <label className={labelStyle}><User size={12} className="inline mr-1" /> First Name</label>
//               <input className={inputStyle} placeholder="Firstname" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
//             </div>
//             <div className="space-y-1">
//               <label className={labelStyle}>Last Name</label>
//               <input className={inputStyle} placeholder="Surname" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
//             </div>
//           </div>

//           <div className="space-y-1">
//             <label className={labelStyle}><CalendarDays size={12} className="inline mr-1" /> Birth Date (DD/MM/YYYY)</label>
//             <div className="relative group">
//               <Cake className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
              
//               {/* Manual Typing Input */}
//               <input
//                 type="text"
//                 inputMode="numeric"
//                 className={`${inputStyle} pl-12`}
//                 placeholder="DD/MM/YYYY"
//                 value={displayDob}
//                 maxLength={10}
//                 onChange={handleDateChange}
//               />
              
//               {/* Fast Calendar Picker Icon Button */}
//               <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity">
//                 <input 
//                   type="date" 
//                   className="absolute inset-0 opacity-0 cursor-pointer w-6" 
//                   onChange={(e) => {
//                     const date = e.target.value; // YYYY-MM-DD
//                     if(!date) return;
//                     const [y, m, d] = date.split("-");
//                     setFormData({...formData, dob: date});
//                     setDisplayDob(`${d}/${m}/${y}`);
//                   }}
//                 />
//                 <CalendarDays size={18} className="text-slate-500" />
//               </div>
//             </div>
//           </div>

//           <div className="space-y-1 relative">
//             <label className={labelStyle}><GraduationCap size={12} className="inline mr-1" /> Standard</label>
//             <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`${inputStyle} text-left flex items-center justify-between`}>
//               <span className={formData.standard ? "text-slate-800" : "text-slate-300"}>{formData.standard || "Select Class"}</span>
//               <ChevronDown size={18} className="text-slate-400" />
//             </button>
//             <AnimatePresence>
//               {isDropdownOpen && (
//                 <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 5 }} exit={{ opacity: 0, y: -5 }} className="absolute z-30 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-y-auto max-h-[200px] py-2 custom-scrollbar">
//                   {standards.map((std) => (
//                     <button key={std} type="button" onClick={() => { setFormData({ ...formData, standard: std }); setIsDropdownOpen(false); }} className="w-full px-6 py-3 text-left font-bold text-slate-700 hover:bg-indigo-500 hover:text-white transition-all text-sm">
//                       {std}
//                     </button>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           <div className="bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-100/80">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <Phone size={16} className={hasNumber ? "text-indigo-600" : "text-slate-300"} />
//                 <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600">Mobile Number</span>
//               </div>
//               <button type="button" onClick={() => setHasNumber(!hasNumber)} className={`w-11 h-6 rounded-full transition-all relative ${hasNumber ? "bg-indigo-600 shadow-lg shadow-indigo-100" : "bg-slate-200"}`}>
//                 <motion.div animate={{ x: hasNumber ? 22 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
//               </button>
//             </div>
//             {hasNumber && (
//               <input className={inputStyle} type="tel" placeholder="10 Digit Number" value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} />
//             )}
//           </div>

//           <div className="space-y-1">
//             <label className={labelStyle}><MapPin size={12} className="inline mr-1" /> Address</label>
//             <textarea rows="2" className={`${inputStyle} pt-4 resize-none`} placeholder="Residential details..." value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
//           </div>

//           <motion.button whileTap={{ scale: 0.98 }} onClick={handleRegister} disabled={loading} className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl shadow-xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs mt-4 disabled:opacity-70">
//             {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 size={18} /> Register Balak</>}
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }















"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  MapPin,
  CheckCircle2,
  Loader2,
  Cake,
  GraduationCap,
  ChevronDown,
  User,
  Sparkles,
  CalendarDays
} from "lucide-react";
import CameraCapture from "@/components/CameraCapture";
import { toast } from "sonner";

export default function RegistrationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const photoUrlRef = useRef("");
  const [hasNumber, setHasNumber] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    dob: "", // Format: YYYY-MM-DD for API
    standard: "",
  });

  const [displayDob, setDisplayDob] = useState(""); // Format: DD/MM/YYYY for UI

  const standards = ["Jr. KG", "Sr. KG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const inputStyle = "w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-300 text-sm appearance-none";
  const labelStyle = "text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 ml-4 mb-2 block";

  // --- Fast Date Typing Logic ---
  const handleDateChange = (e) => {
    let val = e.target.value.replace(/\D/g, ""); 
    let formatted = val;

    if (val.length > 2 && val.length <= 4) {
      formatted = `${val.slice(0, 2)}/${val.slice(2)}`;
    } else if (val.length > 4) {
      formatted = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4, 8)}`;
    }

    setDisplayDob(formatted);

    if (formatted.length === 10) {
      const [d, m, y] = formatted.split("/");
      setFormData({ ...formData, dob: `${y}-${m}-${d}` });
    }
  };

  // --- Real-world Mobile Input Logic ---
  const handleMobileChange = (e) => {
    // Only allow numbers and limit to 10
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, mobileNumber: val });
  };

  const handleRegister = async () => {
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.dob || !formData.standard) {
      return toast.error("Please fill all required fields");
    }
    // Safety check: Even though input is limited, we check if it's EXACTLY 10 digits before sending to DB
    if (hasNumber && formData.mobileNumber.length !== 10) {
      return toast.error("Mobile number must be exactly 10 digits");
    }
    if (!photoUrlRef.current) {
      return toast.error("Profile photo is mandatory");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/balaks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          mobileNumber: hasNumber ? formData.mobileNumber : "N/A",
          photoUrl: photoUrlRef.current,
        }),
      });

      if (res.ok) {
        toast.success("Balak Registered Successfully!");
        router.push("/");
        router.refresh();
      } else {
        toast.error("Failed to register.");
      }
    } catch (err) {
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen bg-[#FDFDFD] px-6 pt-12 pb-24 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 blur-3xl rounded-full -mr-32 -mt-32" />

      <header className="flex items-center justify-between mb-8 relative z-10">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => router.back()} className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-500">
          <ArrowLeft size={20} />
        </motion.button>
        <div className="text-center">
          <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Registration</h1>
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest flex items-center justify-center gap-1">
            Balak Sabha
          </p>
        </div>
        <div className="w-11" />
      </header>

      <div className="bg-white rounded-[3.5rem] p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-white relative z-10">
        <div className="mb-10 flex flex-col items-center">
          <CameraCapture onUpload={(url) => { photoUrlRef.current = url; }} />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={labelStyle}><User size={12} className="inline mr-1" /> First Name</label>
              <input 
                className={inputStyle} 
                placeholder="Firstname" 
                value={formData.firstName} 
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value.replace(/\s/g, "") })} 
              />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Last Name</label>
              <input 
                className={inputStyle} 
                placeholder="Surname" 
                value={formData.lastName} 
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value.replace(/\s/g, "") })} 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className={labelStyle}><CalendarDays size={12} className="inline mr-1" /> Birth Date (DD/MM/YYYY)</label>
            <div className="relative group">
              <Cake className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
              <input
                type="text"
                inputMode="numeric"
                className={`${inputStyle} pl-12`}
                placeholder="DD/MM/YYYY"
                value={displayDob}
                maxLength={10}
                onChange={handleDateChange}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity">
                <input 
                  type="date" 
                  className="absolute inset-0 opacity-0 cursor-pointer w-6" 
                  onChange={(e) => {
                    const date = e.target.value; 
                    if(!date) return;
                    const [y, m, d] = date.split("-");
                    setFormData({...formData, dob: date});
                    setDisplayDob(`${d}/${m}/${y}`);
                  }}
                />
                <CalendarDays size={18} className="text-slate-500" />
              </div>
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className={labelStyle}><GraduationCap size={12} className="inline mr-1" /> Standard</label>
            <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`${inputStyle} text-left flex items-center justify-between`}>
              <span className={formData.standard ? "text-slate-800" : "text-slate-300"}>{formData.standard || "Select Class"}</span>
              <ChevronDown size={18} className="text-slate-400" />
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 5 }} exit={{ opacity: 0, y: -5 }} className="absolute z-30 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-y-auto max-h-[200px] py-2 custom-scrollbar">
                  {standards.map((std) => (
                    <button key={std} type="button" onClick={() => { setFormData({ ...formData, standard: std }); setIsDropdownOpen(false); }} className="w-full px-6 py-3 text-left font-bold text-slate-700 hover:bg-indigo-500 hover:text-white transition-all text-sm">
                      {std}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-100/80">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Phone size={16} className={hasNumber ? "text-indigo-600" : "text-slate-300"} />
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600">Mobile Number</span>
              </div>
              <button type="button" onClick={() => setHasNumber(!hasNumber)} className={`w-11 h-6 rounded-full transition-all relative ${hasNumber ? "bg-indigo-600 shadow-lg shadow-indigo-100" : "bg-slate-200"}`}>
                <motion.div animate={{ x: hasNumber ? 22 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
            {hasNumber && (
              <input 
                className={inputStyle} 
                type="tel" 
                inputMode="numeric"
                placeholder="10 Digit Number" 
                value={formData.mobileNumber} 
                onChange={handleMobileChange}
              />
            )}
          </div>

          <div className="space-y-1">
            <label className={labelStyle}><MapPin size={12} className="inline mr-1" /> Address</label>
            <textarea rows="2" className={`${inputStyle} pt-4 resize-none`} placeholder="Residential details..." value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          </div>

          <motion.button whileTap={{ scale: 0.98 }} onClick={handleRegister} disabled={loading} className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl shadow-xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs mt-4 disabled:opacity-70">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 size={18} /> Register Balak</>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}