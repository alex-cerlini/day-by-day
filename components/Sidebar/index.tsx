import { Link } from "@/i18n/routing";
import { Home, User } from "lucide-react";
import { useTranslations } from "next-intl";

export const Sidebar = () => {
  const t = useTranslations("Nav");

  return (
    <div className="w-full flex justify-end p-16">
      <ul className="space-y-4 [&>li]:w-full [&>li>a]:cursor-pointer [&>li>a]:px-10 [&>li>a]:py-4 [&>li>a]:flex [&>li>a]:gap-x-8 [&>li>a]:font-bold [&>li>a]:text-slate-600">
        <li>
          <Link href="/">
            <Home />
            <span>{t("home")}</span>
          </Link>
        </li>
        <li>
          <Link href="/account">
            <User />
            <span>{t("account")}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
