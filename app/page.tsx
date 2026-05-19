import BookingForm from "@/components/BookingForm";
import Contacts from "@/components/Contacts";
import FAQ from "@/components/FAQ";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PriceGuide from "@/components/PriceGuide";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";
import TrustBar from "@/components/TrustBar";
import WaitingArea from "@/components/WaitingArea";
import WhyUs from "@/components/WhyUs";
import { business, siteUrl, workingHours } from "@/lib/env";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["AutoRepair", "CarWash"],
  name: business.fullName,
  url: siteUrl,
  telephone: business.phone,
  description:
    "Шиномонтаж, автосервис и автомойка в Химках, Новогорск. Рейтинг 4,4 на Яндекс.Картах, 65 оценок.",
  areaServed: ["Химки", "Новогорск", "Соколовская улица"],
  address: {
    "@type": "PostalAddress",
    streetAddress: business.addressPlaceholder,
    addressLocality: "Химки",
    addressRegion: "Московская область",
    addressCountry: "RU",
  },
  openingHoursSpecification: workingHours.map((item) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: item.day,
    opens: item.hours.split("-")[0],
    closes: item.hours.split("-")[1],
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.4",
    ratingCount: "65",
    reviewCount: "27",
    bestRating: "5",
  },
  sameAs: [business.yandexMapsHref],
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="content">
        <Hero />
        <TrustBar />
        <Services />
        <BookingForm />
        <Process />
        <PriceGuide />
        <Reviews />
        <WhyUs />
        <WaitingArea />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
      <FloatingCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
