"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, User, ShoppingBag, Heart, Menu, X, ChevronRight, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/placeholder.svg?height=800&width=1600",
      title: "Collection Printemps",
      subtitle: "Découvrez nos nouveautés",
    },
    {
      image: "/placeholder.svg?height=800&width=1600",
      title: "Édition Limitée",
      subtitle: "Pièces exclusives",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-semibold">HIGH SOCIETY</div>
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Collections</h3>
              <ul className="space-y-3 pl-2">
                <li>
                  <Link href="#" className="block py-1">
                    Nouveautés
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-1">
                    Bestsellers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-1">
                    Éditions Limitées
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-1">
                    Promotions
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Catégories</h3>
              <ul className="space-y-3 pl-2">
                <li>
                  <Link href="#" className="block py-1">
                    Vêtements
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-1">
                    Accessoires
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-1">
                    Chaussures
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-1">
                    Maison
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">À propos</h3>
              <ul className="space-y-3 pl-2">
                <li>
                  <Link href="#" className="block py-1">
                    Notre histoire
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-1">
                    Nos valeurs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-1">
                    Nos boutiques
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-1">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>

            {/* Logo */}
            <div className="text-xl md:text-2xl font-semibold">HIGH SOCIETY</div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="#" className="text-sm hover:text-gray-600 transition-colors">
                Collections
              </Link>
              <Link href="#" className="text-sm hover:text-gray-600 transition-colors">
                Nouveautés
              </Link>
              <Link href="#" className="text-sm hover:text-gray-600 transition-colors">
                Bestsellers
              </Link>
              <Link href="#" className="text-sm hover:text-gray-600 transition-colors">
                �� propos
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Slider */}
      <section className="relative h-[70vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative h-full w-full">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                <h2 className="text-3xl md:text-5xl font-light mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-8">{slide.subtitle}</p>
                <Button className="bg-white text-black hover:bg-gray-100 rounded-none px-8 py-6">Découvrir</Button>
              </div>
            </div>
          </div>
        ))}

        {/* Slider controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-12">Nos Catégories</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Vêtements", "Accessoires", "Lifestyle"].map((category, index) => (
              <div key={index} className="group relative h-80 overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=600&width=400`}
                  alt={category}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-xl md:text-2xl font-light mb-4">{category}</h3>
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black rounded-none"
                  >
                    Découvrir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-12">Nos Bestsellers</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((product) => (
              <div key={product} className="group">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=600&width=450`}
                    alt={`Product ${product}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="text-sm font-medium">Produit Exclusif {product}</h3>
                <p className="text-sm text-gray-500 mb-2">Catégorie</p>
                <p className="text-sm font-medium">129,00 €</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-8">Voir tous les produits</Button>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-6">Notre Histoire</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Fondée en 2010, High Society incarne l'élégance et le raffinement à travers des créations uniques et
            intemporelles. Notre passion pour l'excellence et notre engagement envers la qualité nous ont permis de
            devenir une référence dans l'univers du luxe contemporain.
          </p>
          <Button variant="link" className="text-black flex items-center mx-auto">
            En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-12">Suivez-nous sur Instagram</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {[1, 2, 3, 4].map((post) => (
              <div key={post} className="relative aspect-square group overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=500&width=500`}
                  alt={`Instagram post ${post}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Instagram className="text-white h-8 w-8" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="link" className="text-black flex items-center">
              @highsociety <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-4">Inscrivez-vous à notre newsletter</h2>
          <p className="text-gray-300 mb-8">Recevez en avant-première nos nouveautés et offres exclusives.</p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 bg-transparent border border-white/30 focus:border-white focus:outline-none"
            />
            <Button className="bg-white text-black hover:bg-gray-200 rounded-none">S'inscrire</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">High Society</h3>
              <p className="text-sm text-gray-500 mb-4">L'élégance au quotidien, pour une vie extraordinaire.</p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="hover:text-gray-600">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-gray-600">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-gray-600">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4">Collections</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Nouveautés
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Bestsellers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Éditions Limitées
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Promotions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4">Informations</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Nos boutiques
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Livraison
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Conditions générales
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4">Service Client</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Retours & Échanges
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Programme fidélité
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-12 pt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 High Society. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-black transition-colors">
                Confidentialité
              </Link>
              <Link href="#" className="hover:text-black transition-colors">
                Cookies
              </Link>
              <Link href="#" className="hover:text-black transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

