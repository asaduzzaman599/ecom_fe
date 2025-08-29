import AuthRouteProtector from "@/protector/AuthRouteProtector"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthRouteProtector>{children}</AuthRouteProtector>
}