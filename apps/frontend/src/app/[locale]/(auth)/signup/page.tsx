import { SignupForm } from "@/features/auth";
import { Link } from "@/i18n/navigation";
import {
  generateLocaleStaticParams,
  getLocaleFromParams,
} from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function generateStaticParams() {
  return generateLocaleStaticParams();
}

interface SignupPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function SignupPage({ params }: SignupPageProps) {
  const locale = getLocaleFromParams(params);
  const t = useTranslations("Auth.Signup");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <SignupForm />

      <div className="text-center text-sm">
        <span>{t("haveAccount")}</span>{" "}
        <Link
          href={`/${locale}/login`}
          className="text-primary hover:underline"
        >
          {t("loginLink")}
        </Link>
      </div>
    </div>
  );
}
