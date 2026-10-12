import React from 'react';
import HeroBanner from '../components/HeroBanner';
import AboutSection from '../components/AboutSection';
import CardList from '../components/CardList';
import { articles } from '../data/articles';
import { tutorials } from '../data/tutorials';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroBanner />
      <AboutSection />
      <CardList id="articles" title="Featured Articles" items={articles} buttonText="See all articles" />
      <CardList id="tutorials" title="Featured Tutorials" items={tutorials} buttonText="See all tutorials" />
    </div>
  );
}