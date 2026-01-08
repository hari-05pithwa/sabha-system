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
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Lock, User, ChevronRight, Loader2, Check } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Load remembered user instantly on mount
  useEffect(() => {
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
      }, 100); // Faster redirect
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDFDFD] p-4 sm:p-6 font-sans selection:bg-indigo-100 overflow-hidden relative">
      
      {/* 1. DYNAMIC AMBIENT LIGHT (Static on first frame for speed) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-full h-[60%] bg-indigo-100/40 blur-[100px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-full h-[50%] bg-blue-50/30 blur-[100px] rounded-full" />
      </div>

      {/* 2. INSTANT VISIBILITY: Initial opacity 1 ensures no mount delay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.2, 
          ease: [0.22, 1, 0.26, 1], // Custom cubic-bezier for a "settling" effect
          delay: 0.1 
        }}
        className="w-full max-w-[400px] transform-gpu z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] border border-white p-8 sm:p-12 relative overflow-hidden">
          
          <div className="text-center mb-8 sm:mb-10 relative z-10">
            {/* LOGO OPTIMIZATION */}
            <div className="bg-gradient-to-tr from-orange-50/50 to-indigo-50/40 inline-flex items-center justify-center w-20 h-20 bg-white rounded-[2.5rem] mb-6 shadow-lg relative border border-slate-50">
              <img 
                src="/baps.png" 
                alt="BAPS Logo" 
                // FETCHPRIORITY tells browser to download this before other images
                fetchpriority="high" 
                loading="eager"
                decoding="async"
                className="w-12 h-12 object-contain relative z-10"
              />
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
              Karyakar Login
            </h1>
            <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.3em]">
              Bal Mandal Access
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input
                type="text"
                required
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-indigo-200 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300 text-base" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input
                type="password"
                required
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-indigo-200 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300 text-base"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between px-2 pt-1">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center cursor-pointer active:opacity-70 transition-opacity"
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${rememberMe ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200'}`}>
                  {rememberMe && <Check size={12} className="text-white" strokeWidth={4} />}
                </div>
                <span className="ml-3 text-xs font-black text-slate-500">Remember Me</span>
              </button>
            </div>

            <button
              disabled={loading}
              className="w-full bg-slate-900 text-white font-black py-4 sm:py-5 rounded-2xl sm:rounded-3xl shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm uppercase tracking-[0.2em] font-black">Verify</span>
                  <ChevronRight size={18} />
                </div>
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-50 flex justify-center">
            <p className="text-slate-300 text-[9px] font-black uppercase tracking-[0.4em] text-center px-4">
              BAPS SWAMINARAYAN SANSTHA
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}