import UserProtectedRoute from "@/protector/UserRouteProtector"

export default function UserRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <UserProtectedRoute>{children}</UserProtectedRoute>
}