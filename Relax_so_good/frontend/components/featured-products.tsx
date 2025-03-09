"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Heart } from "lucide-react"

// Sample product data
const products = [
  {
    id: 1,
    name: "CBD Flower Premium",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "CBD",
  },
  {
    id: 2,
    name: "CBD Oil 10%",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "CBD",
  },
  {
    id: 3,
    name: "Grinder Metal Premium",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessoires",
  },
  {
    id: 4,
    name: "T-Shirt High Society",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Vêtements",
  },
]

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-center">Produits Populaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden group">
            <div className="relative pt-[100%]">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 bg-white rounded-full p-1.5 ${
                  favorites.includes(product.id) ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart className="h-5 w-5" fill={favorites.includes(product.id) ? "currentColor" : "none"} />
              </Button>
              <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                {product.category}
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
    </section>
  )
}

