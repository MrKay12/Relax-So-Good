"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import AgeVerification from "@/components/age-verification"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Heart, Gift, ArrowRight } from "lucide-react"
import Image from "next/image"

// Sample product data
const featuredProducts = [
  {
    id: 1,
    name: "CBD Flower Premium",
    price: 29.99,
    image: "/cbd1.png",
    category: "CBD",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 2,
    name: "CBD Oil 5%",
    price: 49.99,
    image: "/huilde.png",
    category: "CBD",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 3,
    name: "Grinder Metal Premium",
    price: 24.99,
    image: "/grinder.png",
    category: "Accessoires",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 4,
    name: "T-Shirt hemp",
    price: 34.99,
    image: "/shirt.png",
    category: "Vêtements",
    isNew: true,
    isBestseller: false,
  },
]

const categories = [
  {
    id: 1,
    name: "Fleurs CBD",
    image: "/cbd2.png",
    url: "/cbd/fleurs",
  },
  {
    id: 2,
    name: "Huiles CBD",
    image: "/huile2.png",
    url: "/cbd/huiles",
  },
  {
    id: 3,
    name: "Accessoires",
    image: "/thermos.png",
    url: "/accessoires",
  },
]

export default function Home() {
  const [verified, setVerified] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    // Check if user has previously verified their age
    const isVerified = localStorage.getItem("age-verified") === "true"
    setVerified(isVerified)
    setLoading(false)
  }, [])

  const handleVerification = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem("age-verified", "true")
      setVerified(true)
    } else {
      window.location.href = "https://www.google.com"
    }
  }

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  // If still loading, show a simple loading indicator
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>
  }

  // If not verified, show only the age verification modal
  if (!verified) {
    return <AgeVerification onVerify={handleVerification} />
  }

  // Only show the home page content if verified
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div
          className="relative h-[70vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/shop-inter.jpg')" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-8 max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">RELAX SO GOOD</h1>
              <p className="text-xl mb-8">Découvrez notre sélection de produits CBD premium</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">Découvrir</Button>
                <Button className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">
                  Nouveautés
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Featured Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Nos Catégories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link key={category.id} href={category.url}>
                  <div className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="bg-white text-black hover:bg-gray-200">
                        Voir plus <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Products */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Produits Populaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group">
                  <div className="relative pt-[100%]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`bg-white rounded-full p-1.5 ${
                          favorites.includes(product.id) ? "text-red-500" : "text-gray-400"
                        }`}
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart className="h-5 w-5" fill={favorites.includes(product.id) ? "currentColor" : "none"} />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2 flex gap-2">
                      {product.isNew && <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">NOUVEAU</div>}
                      {product.isBestseller && (
                        <div className="bg-red-600 text-white text-xs px-2 py-1 rounded">BESTSELLER</div>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="font-bold">{product.price.toFixed(2)} €</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-black hover:bg-gray-800 text-white">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Ajouter au panier
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="px-8 py-2">
                Voir tous les produits <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16 bg-gray-100 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-center">Pourquoi nous choisir ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Qualité Premium</h3>
                <p className="text-gray-600">
                  Tous nos produits sont soigneusement sélectionnés et testés pour garantir une qualité optimale.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Livraison Rapide</h3>
                <p className="text-gray-600">Livraison en 24/48h pour toutes les commandes passées avant 14h.</p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Paiement Sécurisé</h3>
                <p className="text-gray-600">
                  Vos transactions sont 100% sécurisées grâce à notre système de paiement crypté.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
