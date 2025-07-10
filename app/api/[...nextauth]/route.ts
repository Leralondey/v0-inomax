// in app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Ce fournisseur gère la connexion par email/mot de passe
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        // Si l'utilisateur existe et que le mot de passe correspond
        if (user && user.password && await bcrypt.compare(credentials.password, user.password)) {
          // On retourne l'utilisateur sans son mot de passe haché
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } else {
          // Sinon, on retourne null pour indiquer un échec d'authentification
          return null;
        }
      }
    })
    // Vous pourrez ajouter d'autres fournisseurs ici (Google, etc.)
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // N'oubliez pas d'ajouter ce secret à votre .env !
  pages: {
    signIn: '/login', // Optionnel : page de connexion personnalisée
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };