import GogogoHero from "@/components/GogogoHero"
import GogogoFeatures from "@/components/GogogoFeatures"
import Banner from "@/components/Banner"
import Categories from "@/components/Categories"
import FAQ from "@/components/FAQ"
import SuggestSection from "@/components/SuggestSection"
import Reveal from "@/components/Reveal"
import TrackTransaction from "@/components/TrackTransaction"

export default function Home() {
  return (
    <div className="min-h-screen py-8 font-sans christmas-bg">
      <Reveal><GogogoHero /></Reveal>
      <Reveal><Banner /></Reveal>
      <Reveal><GogogoFeatures /></Reveal>
      <Reveal><Categories /></Reveal>

      {/* <Reveal><GogogoProductGrid title="Game Lainnya" /></Reveal> */}
      <Reveal><TrackTransaction /></Reveal>
      <Reveal><SuggestSection /></Reveal>
      <Reveal><FAQ /></Reveal>
    </div>
  )
}
