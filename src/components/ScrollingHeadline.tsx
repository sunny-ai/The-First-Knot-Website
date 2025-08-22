import React from 'react';

const ScrollingHeadline = () => {
  const headlines = [
    "Wedding Favours",
    "Custom Invites",
    "Mehndi Celebrations",
    "House Decoration",
    "Event Management",
    "Timeless Memories",
    "Bespoke Designs",
  ];

  // We duplicate the array to create a seamless, infinite scrolling effect
  const duplicatedHeadlines = [...headlines, ...headlines];

  return (
    <div className="bg-secondary text-primary py-4 overflow-hidden whitespace-nowrap">
      <div className="flex animate-scroll">
        {duplicatedHeadlines.map((text, index) => (
          <div key={index} className="flex items-center text-lg md:text-xl font-semibold uppercase tracking-wider mx-8">
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingHeadline;