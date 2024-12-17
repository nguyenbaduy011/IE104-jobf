import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db";
import { sendEmail } from "@/lib/send-mail";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false,
      },
      summary: {
        type: "string",
        required: true,
        defaultValue: "",
        input: true,
      },
      workExperience: {
        type: "string",
        required: true,
        defaultValue: "",
        input: true,
      },
      education: {
        type: "string",
        required: true,
        defaultValue: "",
        input: true,
      },
      additionalInformation: {
        type: "string",
        required: true,
        defaultValue: "",
        input: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Thiết lập lại mật khẩu của bạn",
        text: `Nhấp vào link để thiết lập lại mật khẩu của bạn: ${url}`,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      // Sử dụng hàm sendEmail để gửi link xác minh
      await sendEmail({
        to: user.email,
        subject: "Xác nhận địa chỉ mail của bạn",
        text: `Nhấp vào link để xác nhận địa chỉ của bạn: ${url}`,
      });
    },
    autoSignInAfterVerification: true,
  },
});
