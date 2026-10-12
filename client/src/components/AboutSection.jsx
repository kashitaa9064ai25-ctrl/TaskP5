import React from 'react';

function AboutSection() {
  return (
    <section id="about" className="text-center py-10 px-4 bg-white border-b">
      <img
        src="/photo5.png"
        alt="Profile"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80";
        }}
        className="w-28 h-28 rounded-full mx-auto mb-4 object-cover shadow border border-gray-200"
      />
      <h1 className="text-2xl font-bold text-gray-800">N Kashitaa</h1>
      <p className="text-gray-600 mt-2">Currently studying AI and ML at Deakin University.</p>
    </section>
  );
}

export default AboutSection;