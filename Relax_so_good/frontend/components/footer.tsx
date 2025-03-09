import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">RELAX SO GOOD</h3>
            <p className="text-gray-400 mb-4">
              Votre boutique spécialisée dans les produits CBD de qualité supérieure.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Catégories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/cbd" className="text-gray-400 hover:text-white">
                  CBD
                </Link>
              </li>
              <li>
                <Link href="/accessoires" className="text-gray-400 hover:text-white">
                  Accessoires
                </Link>
              </li>
              <li>
                <Link href="/vetements" className="text-gray-400 hover:text-white">
                  Vêtements
                </Link>
              </li>
              <li>
                <Link href="/nouveautes" className="text-gray-400 hover:text-white">
                  Nouveautés
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Informations</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/a-propos" className="text-gray-400 hover:text-white">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/livraison" className="text-gray-400 hover:text-white">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-gray-400 hover:text-white">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Relax So Good. Tous droits réservés.</p>
          <p className="mt-2 text-sm">
            L'abus d'alcool est dangereux pour la santé, à consommer avec modération. La vente de CBD est interdite aux
            mineurs.
          </p>
        </div>
      </div>
    </footer>
  )
}

