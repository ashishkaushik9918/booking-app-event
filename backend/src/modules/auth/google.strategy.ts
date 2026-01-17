import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../../models/user.model";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                let user = await UserModel.findOne({ email });
                if (!user) {
                    user = await UserModel.create({
                        email,
                        name: profile.displayName,
                        provider: "google",
                        googleId: profile.id,
                    });
                }
                done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
);

