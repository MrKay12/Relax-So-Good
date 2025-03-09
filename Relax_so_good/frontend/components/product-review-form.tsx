"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"

interface ProductReviewFormProps {
  productId: number
  onSubmitReview: (review: {
    rating: number
    comment: string
    productId: number
  }) => void
}

export default function ProductReviewForm({ productId, onSubmitReview }: ProductReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      alert("Veuillez sélectionner une note")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

      onSubmitReview({
        rating,
        comment,
        productId,
      })

      // Reset form
      setRating(0)
      setComment("")

      // Show success message
      alert("Merci pour votre avis !")
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Laisser un avis</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="rating" className="block mb-2">
            Note
          </Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  className={`h-6 w-6 ${
                    (hoverRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="comment" className="block mb-2">
            Commentaire
          </Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Partagez votre expérience avec ce produit..."
            rows={4}
            required
          />
        </div>

        <Button type="submit" className="bg-black hover:bg-gray-800 text-white" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Soumettre l'avis"}
        </Button>
      </form>
    </div>
  )
}

