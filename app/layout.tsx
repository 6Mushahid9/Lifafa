import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import { PageTransitionProvider } from "@/contexts/page-transition-context"
import { PageTransitionOverlay } from "@/components/transitions/page-transition-overlay"
import { NavigationIndicator } from "@/components/transitions/navigation-indicator"
import "./globals.css"

const playfair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lifafa - Because First Impressions Matter",
  description: "Premium envelope templates and printing services",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={playfair.className}>
        <PageTransitionProvider>
          <AuthProvider>
            <CartProvider>
              <PageTransitionOverlay />
              <NavigationIndicator />
              {children}
            </CartProvider>
          </AuthProvider>
        </PageTransitionProvider>
      </body>
    </html>
  )
}
