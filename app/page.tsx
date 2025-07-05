import { MainLayout } from "@/components/main-layout"
import { HomePage } from "@/components/home-page"
import { ProfileSelector } from "@/components/profile-selector"

export default function Page() {
  return (
    <>
      <ProfileSelector />
      <MainLayout>
        <HomePage />
      </MainLayout>
    </>
  )
}
