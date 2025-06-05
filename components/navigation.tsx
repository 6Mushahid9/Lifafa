"use client"

import { useState } from "react"
import { Menu, X, ShoppingCart, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { TransitionLink } from "@/components/transitions/transition-link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { getTotalItems } = useCart()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Templates", href: "/templates" },
    { name: "About", href: "/about" },
    // { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 relative z-40">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          <TransitionLink href="/" className="text-2xl font-bold tracking-tight">
            Lifafa
          </TransitionLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <TransitionLink
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-black transition-colors duration-200 font-medium"
              >
                {item.name}
              </TransitionLink>
            ))}

            {/* Auth and Cart Section */}
            <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-gray-200">
              {user ? (
                <>
                  <TransitionLink href="/cart" className="relative">
                    <ShoppingCart size={20} className="text-gray-700 hover:text-black" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </TransitionLink>
                  <div className="flex items-center space-x-2">
                    <TransitionLink href="/profile" className="flex items-center space-x-2 hover:text-black">
                      {user.profilePicture ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
                          <img
                            src={user.profilePicture || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-sm">{user.name}</span>
                    </TransitionLink>
                    <Button onClick={logout} variant="ghost" size="sm" className="p-1 h-auto">
                      <LogOut size={16} />
                    </Button>
                  </div>
                </>
              ) : (
                <TransitionLink href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </TransitionLink>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <TransitionLink
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-black transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </TransitionLink>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-200">
              {user ? (
                <div className="space-y-2">
                  <TransitionLink href="/cart" className="flex items-center gap-2 py-2">
                    <ShoppingCart size={20} />
                    Cart ({getTotalItems()})
                  </TransitionLink>
                  <TransitionLink href="/profile" className="flex items-center gap-2 py-2">
                    {user.profilePicture ? (
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-300">
                        <img
                          src={user.profilePicture || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    My Profile
                  </TransitionLink>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      {user.profilePicture ? (
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-300">
                          <img
                            src={user.profilePicture || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span>{user.name}</span>
                    </div>
                    <Button onClick={logout} variant="ghost" size="sm">
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <TransitionLink href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </TransitionLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
