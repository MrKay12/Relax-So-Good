"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, ShoppingCart, Menu, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            RELAX SO GOOD
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/cbd" className="text-gray-700 hover:text-black">
              CBD
            </Link>
            <Link href="/accessoires" className="text-gray-700 hover:text-black">
              Accessoires
            </Link>
            <Link href="/vetements" className="text-gray-700 hover:text-black">
              Vêtements
            </Link>
          </nav>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User dropdown menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/auth/login" className="w-full cursor-pointer">
                    Connexion
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/signup" className="w-full cursor-pointer">
                    Créer un compte
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="w-full cursor-pointer">
                    Mon compte
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders" className="w-full cursor-pointer">
                    Mes commandes
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/cbd" className="py-2 text-gray-700 hover:text-black">
                CBD
              </Link>
              <Link href="/accessoires" className="py-2 text-gray-700 hover:text-black">
                Accessoires
              </Link>
              <Link href="/vetements" className="py-2 text-gray-700 hover:text-black">
                Vêtements
              </Link>
            </nav>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" asChild>
                <Link href="/auth/login">
                  <User className="h-5 w-5 mr-2" />
                  Connexion
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/auth/signup">Créer un compte</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Panier (0)
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

