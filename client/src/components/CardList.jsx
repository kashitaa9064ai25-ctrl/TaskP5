import React from 'react';
import Card from './Card';

function CardList({ id, title, items, buttonText }) {
  if (!items || items.length === 0) return null;

  return (
    <section id={id} className="max-w-6xl mx-auto py-12 px-4 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {items.map((item) => (
          <Card
            key={item.id}
            image={item.image}
            name={item.name}
            description={item.description}
            rating={item.rating}
            author={item.author}
          />
        ))}
      </div>
      <div className="mt-8">
        <button className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-8 py-2 rounded-full transition cursor-pointer">
          {buttonText}
        </button>
      </div>
    </section>
  );
}

export default CardList;