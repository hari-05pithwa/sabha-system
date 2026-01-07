// real code
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
  assignedArea: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema, "users");

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        try {
          await connectToDatabase();
          
          const user = await User.findOne({ username: credentials.username }).lean();

          if (user && user.password === credentials.password) {
            return {
              id: user._id.toString(),
              name: user.name,
              area: user.assignedArea,
            };
          }
          return null;
        } catch (error) {
          console.error("AUTH_CONNECTION_ERROR:", error.message);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.area = user.area;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.area = token.area;
      }
      return session;
    }
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };






// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectToDatabase from "@/lib/mongodb";
// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   name: String,
//   assignedArea: String,
//   role: { type: String, default: "Karyakar" } // Added role support
// });

// const User = mongoose.models.User || mongoose.model("User", UserSchema, "users");

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       async authorize(credentials) {
//         try {
//           await connectToDatabase();
//           const user = await User.findOne({ username: credentials.username }).lean();

//           if (user && user.password === credentials.password) {
//             return {
//               id: user._id.toString(),
//               name: user.name,
//               area: user.assignedArea,
//               role: user.role || "Karyakar",
//             };
//           }
//           return null;
//         } catch (error) {
//           console.error("AUTH_CONNECTION_ERROR:", error.message);
//           return null;
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.area = user.area;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id;
//         session.user.area = token.area;
//         session.user.role = token.role;
//       }
//       return session;
//     }
//   },
//   session: { 
//     strategy: "jwt",
//     // --- SLIDING SESSION LOGIC ---
//     // User stays logged in for 7 days if they don't return.
//     maxAge: 7 * 24 * 60 * 60, 
//     // Every time they use the app (after 24h), the 7-day timer resets.
//     updateAge: 24 * 60 * 60, 
//   },
//   cookies: {
//     sessionToken: {
//       name: `next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: 'lax',
//         path: '/',
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 7 * 24 * 60 * 60, // Match maxAge
//       },
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };







