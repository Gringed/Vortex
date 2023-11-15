import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import Google from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongo";
import { NextApiRequest, NextApiResponse } from "next";

export const authOptions: (
  req?: NextApiRequest,
  res?: NextApiResponse
) => AuthOptions = (req, res) => ({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
    DiscordProvider({
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
      profile(profile) {
        console.log({ profile });
        let userAvatar = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`;
        let userBanner = profile.banner
          ? `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.png`
          : null;
          let userDecoration = profile.avatar_decoration_data
          ? `https://cdn.discordapp.com/avatar-decorations/${profile.id}/${profile.avatar_decoration_data}.png`
          : null;
        return {
          id: profile.id,
          name: profile.username,
          username: profile.username,
          email: profile.email,
          image: userAvatar,
          banner: userBanner,
          bannerColor: profile.banner_color,
          userDecoration: userDecoration,
          verified: profile.verified,
          isAdmin: "USER",
          isPremium: false,
          createdAt: new Date(new Date().toISOString()),
        };
      },
    }),
    GitHubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET),
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (!session?.user) {
        return session;
      }
      session.user._id = user.id;
      session.user.name = user.name;
      return session;
    },
  },
});

export const getAuthSession = async () => {
  const session = await getServerSession(authOptions());
  return session;
};
