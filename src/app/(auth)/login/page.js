// "use client";
// import { useState, useEffect } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";
// import { Lock, User, ChevronRight, Loader2, Check } from "lucide-react";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   // Load remembered username on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem("remembered_karyakar");
//     if (savedUser) {
//       setUsername(savedUser);
//       setRememberMe(true);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const result = await signIn("credentials", {
//       username,
//       password,
//       redirect: false,
//     });

//     if (result?.error) {
//       toast.error("Invalid credentials. Please try again.");
//       setLoading(false);
//     } else {
//       // Logic for Remember Me
//       if (rememberMe) {
//         localStorage.setItem("remembered_karyakar", username);
//       } else {
//         localStorage.removeItem("remembered_karyakar");
//       }

//       toast.success("Welcome back! Redirecting...");
      
//       // Using a slightly longer delay for a smoother visual transition on mobile
//       setTimeout(() => {
//         router.push("/");
//         router.refresh();
//       }, 800);
//     }
//   };

//   // Optimized Animation Variants for Mobile (Hardware Accelerated)
//   const containerVars = {
//     hidden: { opacity: 0, scale: 0.98, y: 10 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: { 
//         duration: 0.5, 
//         staggerChildren: 0.08, 
//         ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for "Apple-like" feel
//       },
//     },
//   };

//   const itemVars = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.4, ease: "easeOut" }
//     },
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#F8FAFF] p-6 font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-hidden">
//       {/* Background Decorative Elements - Simplified for Mobile Performance */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] bg-indigo-100/40 blur-[80px] rounded-full" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-blue-100/40 blur-[80px] rounded-full" />
//       </div>

//       <motion.div
//         variants={containerVars}
//         initial="hidden"
//         animate="visible"
//         className="w-full max-w-[440px] will-change-transform"
//       >
//         <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white p-8 md:p-12 relative overflow-hidden">
//           {/* Top Header */}
//           <motion.div variants={itemVars} className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-2xl mb-5 shadow-lg shadow-indigo-200">
//               <Lock size={28} strokeWidth={2.5} />
//             </div>
//             <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
//               Karyakar Access
//             </h1>
//             <p className="text-slate-500 font-medium text-sm">
//               Manage your Sabha records
//             </p>
//           </motion.div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Username Field */}
//             <motion.div variants={itemVars} className="space-y-2">
//               <label className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-2">
//                 User ID
//               </label>
//               <div className="relative group">
//                 <User
//                   className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors duration-300"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   autoComplete="username"
//                   required
//                   className="w-full pl-14 pr-7 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all duration-300 font-semibold text-slate-700 placeholder:text-slate-300 text-[16px]" // Text-16px prevents iOS zoom on focus
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   placeholder="Enter your ID"
//                 />
//               </div>
//             </motion.div>

//             {/* Password Field */}
//             <motion.div variants={itemVars} className="space-y-2">
//               <label className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-2">
//                 Password
//               </label>
//               <div className="relative group">
//                 <Lock
//                   className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors duration-300"
//                   size={20}
//                 />
//                 <input
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="w-full pl-14 pr-7 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all duration-300 font-semibold text-slate-700 placeholder:text-slate-300 text-[16px]"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </motion.div>

//             {/* Remember Me Option */}
//             <motion.div variants={itemVars} className="flex items-center ml-2">
//               <button
//                 type="button"
//                 onClick={() => setRememberMe(!rememberMe)}
//                 className="flex items-center group cursor-pointer"
//               >
//                 <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${rememberMe ? 'bg-indigo-600 border-indigo-600' : 'bg-slate-50 border-slate-200'}`}>
//                   {rememberMe && <Check size={14} className="text-white" strokeWidth={3} />}
//                 </div>
//                 <span className="ml-3 text-sm font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">
//                   Remember my ID
//                 </span>
//               </button>
//             </motion.div>

//             {/* Submit Button */}
//             <motion.button
//               variants={itemVars}
//               whileTap={{ scale: 0.96 }}
//               disabled={loading}
//               className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 active:bg-indigo-700 transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 group mt-2"
//             >
//               <AnimatePresence mode="wait">
//                 {loading ? (
//                   <motion.div
//                     key="loader"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8 }}
//                   >
//                     <Loader2 className="animate-spin" size={22} />
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="text"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex items-center gap-2"
//                   >
//                     <span>Sign In</span>
//                     <ChevronRight
//                       size={18}
//                       className="group-active:translate-x-1 transition-transform"
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </form>

//           {/* Footer Branding */}
//           <motion.div
//             variants={itemVars}
//             className="mt-10 pt-8 border-t border-slate-50 flex flex-col items-center gap-2"
//           >
//             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
//               BAPS Swaminarayan Sanstha
//             </p>
//             <div className="flex gap-1">
//               <div className="w-1 h-1 rounded-full bg-orange-400" />
//               <div className="w-1 h-1 rounded-full bg-orange-400" />
//               <div className="w-1 h-1 rounded-full bg-orange-400" />
//             </div>
//           </motion.div>
//         </div>

//         {/* Helper Note */}
//         <motion.p
//           variants={itemVars}
//           className="text-center mt-6 text-slate-400 text-xs font-medium"
//         >
//           Secure Portal • Karyakars Only
//         </motion.p>
//       </motion.div>
//     </div>
//   );
// }









//imp

// "use client";
// import { useState, useEffect } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";
// import { Lock, User, ChevronRight, Loader2, Check } from "lucide-react";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   // Load remembered username on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem("remembered_karyakar");
//     if (savedUser) {
//       setUsername(savedUser);
//       setRememberMe(true);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const result = await signIn("credentials", {
//       username,
//       password,
//       redirect: false,
//     });

//     if (result?.error) {
//       toast.error("Invalid credentials. Please try again.");
//       setLoading(false);
//     } else {
//       // Logic for Remember Me
//       if (rememberMe) {
//         localStorage.setItem("remembered_karyakar", username);
//       } else {
//         localStorage.removeItem("remembered_karyakar");
//       }

//       // --- IMPROVED PERSONALIZED NAME LOGIC ---
//       // 1. Take the username (e.g., bhavik13329)
//       // 2. Split by any digit to get just the alphabetic name (bhavik)
//       // 3. Capitalize the first letter and keep the rest of the name intact
//       const cleanName = username.split(/[0-9]/)[0]; 
//       const displayName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();

//       toast.success(`Welcome back, ${displayName}!`);
      
//       // Hardware-accelerated transition delay
//       setTimeout(() => {
//         router.push("/");
//         router.refresh();
//       }, 800);
//     }
//   };

//   // GPU-Optimized Animation Variants
//   const containerVars = {
//     hidden: { opacity: 0, scale: 0.98, y: 15 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: { 
//         duration: 0.5, 
//         staggerChildren: 0.08, 
//         ease: [0.22, 1, 0.36, 1] 
//       },
//     },
//   };

//   const itemVars = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.4, ease: "easeOut" }
//     },
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#F8FAFF] p-6 font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-hidden">
//       {/* Background Decor */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] bg-indigo-100/40 blur-[80px] rounded-full" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-blue-100/40 blur-[80px] rounded-full" />
//       </div>

//       <motion.div
//         variants={containerVars}
//         initial="hidden"
//         animate="visible"
//         className="w-full max-w-[440px] will-change-transform"
//       >
//         <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white p-8 md:p-12 relative overflow-hidden">
//           {/* Top Header */}
//           <motion.div variants={itemVars} className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-2xl mb-5 shadow-lg shadow-indigo-200">
//               <Lock size={28} strokeWidth={2.5} />
//             </div>
//             <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
//               Karyakar Access
//             </h1>
//             <p className="text-slate-500 font-medium text-sm">
//               Manage your Sabha records
//             </p>
//           </motion.div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Username Field */}
//             <motion.div variants={itemVars} className="space-y-2">
//               <label className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-2">
//                 User ID
//               </label>
//               <div className="relative group">
//                 <User
//                   className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors duration-300"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   autoComplete="username"
//                   required
//                   className="w-full pl-14 pr-7 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all duration-300 font-semibold text-slate-700 placeholder:text-slate-300 text-[16px]" 
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   placeholder="Enter your ID"
//                 />
//               </div>
//             </motion.div>

//             {/* Password Field */}
//             <motion.div variants={itemVars} className="space-y-2">
//               <label className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-2">
//                 Password
//               </label>
//               <div className="relative group">
//                 <Lock
//                   className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors duration-300"
//                   size={20}
//                 />
//                 <input
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="w-full pl-14 pr-7 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all duration-300 font-semibold text-slate-700 placeholder:text-slate-300 text-[16px]"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </motion.div>

//             {/* Remember Me Option */}
//             <motion.div variants={itemVars} className="flex items-center ml-2">
//               <button
//                 type="button"
//                 onClick={() => setRememberMe(!rememberMe)}
//                 className="flex items-center group cursor-pointer touch-none"
//               >
//                 <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${rememberMe ? 'bg-indigo-600 border-indigo-600' : 'bg-slate-50 border-slate-200'}`}>
//                   {rememberMe && <Check size={14} className="text-white" strokeWidth={3} />}
//                 </div>
//                 <span className="ml-3 text-sm font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">
//                   Remember my ID
//                 </span>
//               </button>
//             </motion.div>

//             {/* Submit Button */}
//             <motion.button
//               variants={itemVars}
//               whileTap={{ scale: 0.96 }}
//               disabled={loading}
//               className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 active:bg-indigo-700 transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 group mt-2"
//             >
//               <AnimatePresence mode="wait">
//                 {loading ? (
//                   <motion.div
//                     key="loader"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8 }}
//                   >
//                     <Loader2 className="animate-spin" size={22} />
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="text"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex items-center gap-2"
//                   >
//                     <span>Sign In</span>
//                     <ChevronRight
//                       size={18}
//                       className="group-active:translate-x-1 transition-transform"
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </form>

//           {/* Footer Branding */}
//           <motion.div
//             variants={itemVars}
//             className="mt-10 pt-8 border-t border-slate-50 flex flex-col items-center gap-2"
//           >
//             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
//               BAPS Swaminarayan Sanstha
//             </p>
//             <div className="flex gap-1">
//               <div className="w-1 h-1 rounded-full bg-orange-400" />
//               <div className="w-1 h-1 rounded-full bg-orange-400" />
//               <div className="w-1 h-1 rounded-full bg-orange-400" />
//             </div>
//           </motion.div>
//         </div>

//         {/* Helper Note */}
//         <motion.p
//           variants={itemVars}
//           className="text-center mt-6 text-slate-400 text-xs font-medium"
//         >
//           Secure Portal • Karyakars Only
//         </motion.p>
//       </motion.div>
//     </div>
//   );
// }



//ai
"use client";
import { useState, useEffect, useMemo } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, ChevronRight, Loader2, Check } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const savedUser = localStorage.getItem("remembered_karyakar");
    if (savedUser) {
      setUsername(savedUser);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Access Denied. Check credentials.");
      setLoading(false);
    } else {
      if (rememberMe) localStorage.setItem("remembered_karyakar", username);
      else localStorage.removeItem("remembered_karyakar");

      const cleanName = username.split(/[0-9]/)[0]; 
      const displayName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();

      toast.success(`Identity Verified: ${displayName}`);
      
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 300); 
    }
  };

  const springConfig = useMemo(() => ({
    type: "spring",
    stiffness: 500,
    damping: 40,
    mass: 0.8
  }), []);

  if (!isMounted) return <div className="min-h-screen bg-[#FDFDFD]" />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDFDFD] p-6 font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-hidden relative">
      
      {/* 1. DYNAMIC AMBIENT LIGHT */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[80%] h-[60%] bg-indigo-100/50 blur-[120px] rounded-full transform-gpu" 
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1.1, 1, 1.1], x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[50%] bg-blue-50/40 blur-[120px] rounded-full transform-gpu" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={springConfig}
        className="w-full max-w-[420px] md:max-w-[460px] transform-gpu z-10"
      >
        {/* 2. FROSTED GLASS CONTAINER */}
        <div className="bg-white/70 backdrop-blur-[40px] rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04),inset_0_0_0_1px_rgba(255,255,255,0.7)] border border-white p-10 md:p-14 relative overflow-hidden">
          
          <div className="text-center mb-12 relative z-10">
            {/* LOGO CONTAINER */}
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...springConfig, delay: 0.1 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-[3rem] mb-8 shadow-xl relative group overflow-hidden border border-slate-50"
            >
              {/* Subtle back-glow for the logo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-50 to-indigo-50 opacity-50" />
              
              <img 
                src="/baps.png" 
                alt="BAPS Logo" 
                className="w-16 h-16 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
               className="text-3xl font-black text-slate-900 tracking-[-0.03em] mb-2"
            >
              Karyakar Login
            </motion.h1>
            <motion.p 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
               className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em]"
            >
              Bal Mandal Digital Access
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <div className="relative group">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={20} />
                <input
                  type="text"
                  required
                  autoComplete="username"
                  className="w-full pl-16 pr-8 py-5 rounded-[1.8rem] bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-slate-300  outline-none transition-all duration-300 font-bold text-slate-700 placeholder:text-slate-300 text-[16px]" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={20} />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-16 pr-8 py-5 rounded-[1.8rem] bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-slate-300  outline-none transition-all duration-300 font-bold text-slate-700 placeholder:text-slate-300 text-[16px]"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
               className="flex items-center justify-between px-3"
            >
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center group cursor-pointer touch-none"
              >
                <motion.div 
                    animate={{ scale: rememberMe ? 1.1 : 1 }}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${rememberMe ? 'bg-slate-900 border-slate-900 shadow-lg' : 'bg-white border-slate-200'}`}
                >
                  {rememberMe && <Check size={14} className="text-white" strokeWidth={4} />}
                </motion.div>
                <span className="ml-4 text-sm font-black text-slate-500 group-hover:text-slate-900 transition-colors">Rememeber Me</span>
              </button>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.8rem] shadow-[0_20px_50px_-10px_rgba(15,23,42,0.3)] flex items-center justify-center gap-3 group disabled:opacity-50 mt-4 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader2 className="animate-spin" size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                    <span className="text-sm uppercase tracking-[0.3em] font-black">Verify</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          {/* 3. FOOTER */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="mt-12 pt-8 border-t border-slate-100 flex justify-center"
          >
            <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em]">
              BAPS SWAMINARAYAN SANSTHA
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}