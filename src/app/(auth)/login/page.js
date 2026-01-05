"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, ChevronRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid credentials. Please try again.");
      setLoading(false);
    } else {
      toast.success("Welcome back! Redirecting...");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    }
  };

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1, ease: "easeOut" },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8FAFF] p-6 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/40 blur-[120px] rounded-full" />
      </div>

      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[440px]"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white p-8 md:p-12 relative overflow-hidden">
          {/* Top Header */}
          <motion.div variants={itemVars} className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-2xl mb-6 shadow-lg shadow-indigo-200">
              <Lock size={28} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Karyakar Access
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              Enter your credentials to manage Sabha
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <motion.div variants={itemVars} className="space-y-2">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-2">
                User ID
              </label>
              <div className="relative group">
                <User
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  autoComplete="username"
                  required
                  className="w-full pl-14 pr-7 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVars} className="space-y-2">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-2">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full pl-14 pr-7 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVars}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 hover:bg-indigo-600 hover:shadow-indigo-200 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 group"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 className="animate-spin" size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span>Sign In</span>
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          {/* Footer Branding */}
          <motion.div
            variants={itemVars}
            className="mt-10 pt-8 border-t border-slate-50 flex flex-col items-center gap-2"
          >
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              BAPS Swaminarayan Sanstha
            </p>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-orange-400" />
              <div className="w-1 h-1 rounded-full bg-orange-400" />
              <div className="w-1 h-1 rounded-full bg-orange-400" />
            </div>
          </motion.div>
        </div>

        {/* Helper Note */}
        <motion.p
          variants={itemVars}
          className="text-center mt-8 text-slate-400 text-xs font-medium"
        >
          Secure Portal • Authorized Karyakars Only
        </motion.p>
      </motion.div>
    </div>
  );
}
