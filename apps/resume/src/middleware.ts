import { defineMiddleware } from "astro:middleware";
import { isSupportedLanguage } from "@repo/astro-i18n/config";
import { detectLanguage } from "@repo/astro-i18n/utils";
import { defaultLanguage, supportedLanguages } from "./i18n/languages";

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const pathname = context.url.pathname;
    if (
      pathname.startsWith("/_") ||
      pathname.startsWith("/favicon") ||
      pathname.startsWith("/logo/") ||
      pathname.startsWith("/auth/") ||
      pathname === "/healthz" ||
      pathname.startsWith("/healthz?") ||
      pathname.split("/").pop()?.includes(".")
    ) {
      context.locals.language = defaultLanguage;
      return await next();
    }

    const langMatch = pathname.match(/^\/([^\/]+)/);
    if (langMatch && isSupportedLanguage(langMatch[1], supportedLanguages)) {
      context.locals.language = langMatch[1];
    } else {
      const acceptLanguage = context.request.headers.get("accept-language");
      const preferredLang = detectLanguage(acceptLanguage, supportedLanguages, defaultLanguage);
      return Response.redirect(new URL(`/${preferredLang}${pathname}`, context.url.origin), 302);
    }

    const response = await next();
    return response;
  } catch (error) {
    console.error("[Middleware] Unhandled error:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    // Create error data object
    const errorData = {
      message: errorMessage,
      stack: errorStack,
      url: context.url.pathname,
      timestamp: new Date().toISOString(),
    };

    // Encode error data as URL parameter
    const errorParam = encodeURIComponent(JSON.stringify(errorData));
    const language = context.locals.language || defaultLanguage;
    const errorPageUrl = `/${language}/error?data=${errorParam}`;

    // Redirect to error page
    return Response.redirect(new URL(errorPageUrl, context.url.origin), 302);
  }
});
