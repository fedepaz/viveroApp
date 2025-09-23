import { LoginForm } from "@/features/auth/";
import { Link } from "@/i18n/navigation";
import {
  generateLocaleStaticParams,
  getLocaleFromParams,
} from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function generateStaticParams() {
  return generateLocaleStaticParams();
}

interface LoginPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function LoginPage({ params }: LoginPageProps) {
  const locale = getLocaleFromParams(params);
  const t = useTranslations("Auth.Login");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <LoginForm />

      <div className="text-center text-sm">
        <span>{t("noAccount")}</span>{" "}
        <Link
          href={`/${locale}/signup`}
          className="text-primary hover:underline"
        >
          {t("signUpLink")}
        </Link>
      </div>
    </div>
  );
}
