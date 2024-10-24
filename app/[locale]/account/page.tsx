"use client";
import { authUserDataAtom } from "@/atoms/authUserData";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ProfileResponseApiProps } from "@/hooks/useProfile/types";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Account() {
  const [authUserData, setAuthUserData] = useAtom(authUserDataAtom);
  const { register, handleSubmit } = useForm();

  const t = useTranslations("Account");
  const tButton = useTranslations("Button");

  const onSubmit = (data: {
    name?: string;
    username?: string;
    email?: string;
    address?: {
      street?: string;
      suite?: string;
      city?: string;
      zipcode?: string;
      geo?: {
        lat?: string;
        lng?: string;
      };
    };
    phone?: string;
    website?: string;
    company?: {
      name?: string;
      catchPhrase?: string;
      bs?: string;
    };
  }) => {
    setAuthUserData(data as ProfileResponseApiProps);
    toast.success("Account updated successfully");
  };

  return (
    <form className="my-20 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">{t("name")}</Label>
        <Input
          type="text"
          id="name"
          placeholder="Name"
          className="w-full"
          defaultValue={authUserData.name}
          {...register("name")}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="username">{t("username")}</Label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          className="w-full"
          defaultValue={authUserData.username}
          {...register("username")}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full"
          defaultValue={authUserData.email}
          {...register("email")}
        />
      </div>
      <Separator className="my-4" />
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="street">{t("address.street")}</Label>
        <Input
          type="text"
          id="street"
          placeholder="Street"
          className="w-full"
          defaultValue={authUserData.address.street}
          {...register("address.street")}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="suite">{t("address.suite")}</Label>
        <Input
          type="text"
          id="suite"
          placeholder="Suite"
          className="w-full"
          defaultValue={authUserData.address.suite}
          {...register("address.suite")}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="city">{t("address.city")}</Label>
        <Input
          type="text"
          id="city"
          placeholder="City"
          className="w-full"
          defaultValue={authUserData.address.city}
          {...register("address.city")}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="zipcode">{t("address.zipcode")}</Label>
        <Input
          type="text"
          id="zipcode"
          placeholder="Zipcode"
          className="w-full"
          defaultValue={authUserData.address.zipcode}
          {...register("address.zipcode")}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="lat">{t("address.geo.lat")}</Label>
        <Input
          type="number"
          id="lat"
          placeholder="Latitude"
          className="w-full"
          defaultValue={authUserData.address.geo.lat}
          {...register("address.geo.lat", { valueAsNumber: true })}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="lng">{t("address.geo.lng")}</Label>
        <Input
          type="number"
          id="lng"
          placeholder="Longitude"
          className="w-full"
          defaultValue={authUserData.address.geo.lng}
          {...register("address.geo.lng", { valueAsNumber: true })}
        />
      </div>
      <Separator className="my-4" />
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="phone">{t("phone")}</Label>
        <Input
          type="tel"
          id="phone"
          placeholder="Phone"
          className="w-full"
          defaultValue={authUserData.phone}
          {...register("phone")}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="website">{t("website")}</Label>
        <Input
          type="text"
          id="website"
          placeholder="Website"
          className="w-full"
          defaultValue={authUserData.website}
          {...register("website")}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="companyName">{t("company.name")}</Label>
        <Input
          type="text"
          id="companyName"
          placeholder="Company Name"
          className="w-full"
          defaultValue={authUserData.company.name}
          {...register("company.name")}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="companyCatchPhrase">{t("company.catchPhrase")}</Label>
        <Input
          type="text"
          id="companyCatchPhrase"
          placeholder="Company Catch Phrase"
          className="w-full"
          defaultValue={authUserData.company.catchPhrase}
          {...register("company.catchPhrase")}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="companyBs">{t("company.bs")}</Label>
        <Input
          type="text"
          id="companyBs"
          placeholder="Company BS"
          className="w-full"
          defaultValue={authUserData.company.bs}
          {...register("company.bs")}
        />
      </div>
      <div className="flex justify-end">
        <Button>{tButton("save")}</Button>
      </div>
    </form>
  );
}
