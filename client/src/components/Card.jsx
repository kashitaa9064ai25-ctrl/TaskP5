import React from 'react';

function Card({ image, name, description, rating, author }) {
  return (
    <div className="bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden">
      <div>
        <img
          src={image}
          alt={name}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60";
          }}
          className="w-full h-44 object-cover"
        />
        <div className="p-4">
          <h3 className="text-base font-bold text-gray-800 mb-1">{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center text-sm font-semibold">
        <span className="text-amber-500">⭐ {rating}</span>
        <span className="text-gray-700">{author}</span>
      </div>
    </div>
  );
}

export default Card;