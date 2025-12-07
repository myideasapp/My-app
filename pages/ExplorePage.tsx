import React from 'react';
import { Search } from 'lucide-react';

const ExplorePage = () => {
  const images = Array.from({ length: 20 }).map((_, i) => `https://picsum.photos/seed/explore${i}/400/${i % 3 === 0 ? '600' : '400'}`);

  return (
    <div className="w-full pb-20">
      {/* Search Bar */}
      <div className="p-4 sticky top-0 bg-white dark:bg-black z-10">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4 px-1 md:px-0">
        {images.map((src, idx) => (
          <div key={idx} className={`relative group cursor-pointer ${idx % 3 === 0 ? 'row-span-2 h-full' : 'h-[130px] md:h-[300px]'}`}>
             <img src={src} className="w-full h-full object-cover" loading="lazy" />
             <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;