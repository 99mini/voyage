"use client";

import { ProfileCard } from "@/components/mypage/profile-card";
import { AccountSettingsCard } from "@/components/mypage/account-settings-card";
import { PortfolioCard } from "@/components/mypage/portfolio-card";

export default function MyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">마이 페이지</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <ProfileCard />
        <AccountSettingsCard />
        <PortfolioCard />
      </div>
    </div>
  );
}
