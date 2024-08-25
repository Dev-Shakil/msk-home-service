import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth/next";


// export const authOptions = {
//     providers: [
//     {
//         id: "descope",
//         name: "Descope",
//         type: "oauth",
//         wellKnown: `https://api.descope.com/P2dHWVPxHnkEI9l2jAXORBItxoSR/.well-known/openid-configuration`,
//         authorization: { params: { scope: "openid email profile" } },
//         idToken: true,
//         clientId: "P2dHVbzIkWSm3zgNa7NUWTcRst1E",
//         clientSecret: "K2ibGvWyH7h7eGNXcXvOQ64gyqkqlCdSGWjybYMA0ReNqZaP2PX2R863tDgHiN5lQBJZMd8",
//         checks: ["pkce", "state"],
//         profile(profile) {
//             return {
//                 id: profile.sub,
//                 name: profile.name,
//                 email: profile.email,
//                 image: profile.picture,
//             }
//         },
//     }]
// }  


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


