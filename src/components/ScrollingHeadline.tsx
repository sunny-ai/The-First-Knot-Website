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
    <div className="scrolling-headline-container">
      <div className="scrolling-headline">
        {duplicatedHeadlines.map((text, index) => (
          <div key={index} className="headline-item">
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingHeadline;