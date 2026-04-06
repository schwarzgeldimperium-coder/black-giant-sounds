import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Contact form submission
  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "Name is required"),
          email: z.string().email("Valid email is required"),
          phone: z.string().optional(),
          eventType: z.string().min(1, "Event type is required"),
          date: z.string().optional(),
          message: z.string().min(10, "Message must be at least 10 characters"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Notify owner of new submission
          const submissionDetails = `
Name: ${input.name}
Email: ${input.email}
Phone: ${input.phone || "Not provided"}
Event Type: ${input.eventType}
Event Date: ${input.date || "Not specified"}

Message:
${input.message}
          `.trim();

          await notifyOwner({
            title: `New Event Inquiry from ${input.name}`,
            content: submissionDetails,
          });

          return {
            success: true,
            message: "Your request has been submitted successfully. We'll get back to you within 24 hours.",
          };
        } catch (error) {
          console.error("[Contact Form] Error:", error);
          return {
            success: false,
            message: "There was an error submitting your request. Please try again.",
          };
        }
      }),
  })
});

export type AppRouter = typeof appRouter;
