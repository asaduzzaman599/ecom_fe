import SidebarNavigation from "@/components/tailwindcss/SidebarNavigation"

export default function UserRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarNavigation>
    {children}
  </SidebarNavigation>)
}