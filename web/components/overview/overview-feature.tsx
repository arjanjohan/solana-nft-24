'use client';

import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { AppHero } from '../ui/ui-layout';
import Link from 'next/link';

const collections = [
  {
    id: 1,
    name: 'Berlin Bears',
    description: 'Berlin Bear NFTs',
    funding: 40,
    image: '/images/logos/bear.jpg',
  },
  {
    id: 2,
    name: 'Hackathon Heroes',
    description: 'Limited Edition Hackathon NFTs',
    funding: 50,
    image: '/images/logos/hacker.jpeg',
  },
  {
    id: 3,
    name: 'Pretzel Punks',
    description: 'Collectible Pretzel Characters',
    funding: 90,
    image: '/images/logos/pretzel.jpeg',
  },
  {
    id: 4,
    name: 'Techno Tacos',
    description: 'Techno Inspired Taco NFTs',
    funding: 65,
    image: '/images/logos/taco.jpeg',
  },
  {
    id: 5,
    name: 'Solana Bratwurst Bonanza',
    description: 'Exclusive Berlin Bratwurst NFTs',
    funding: 75,
    image: '/images/logos/bratwurst.jpeg',
  },
  {
    id: 6,
    name: 'Schnitzel Squad',
    description: 'Schnitzel Themed Collectibles',
    funding: 85,
    image: '/images/logos/schnitzel.jpeg',
  },
  {
    id: 7,
    name: 'Crypto Currywurst',
    description: 'Currywurst with a Crypto Twist',
    funding: 55,
    image: '/images/logos/currywurst.jpeg',
  },
  {
    id: 8,
    name: 'Wurst Wizards',
    description: 'Magical Sausage NFTs',
    funding: 95,
    image: '/images/logos/wizards.jpeg',
  },
  {
    id: 9,
    name: 'Döner Dynamos',
    description: 'Dynamic Döner Collectibles',
    funding: 70,
    image: '/images/logos/doner.jpeg',
  },
  {
    id: 10,
    name: 'Glitchy Giraffes',
    description: 'Giraffes in the Digital Age',
    funding: 30,
    image: '/images/logos/placeholder.png',
  },
  {
    id: 11,
    name: 'Pixelated Penguins',
    description: 'Pixel Art Penguin NFTs',
    funding: 80,
    image: '/images/logos/placeholder.png',
  },
  {
    id: 12,
    name: 'Blockchain Bananas',
    description: 'Bananas on the Blockchain',
    funding: 60,
    image: '/images/logos/placeholder.png',
  },
  {
    id: 13,
    name: 'Algorithmic Alpacas',
    description: 'Alpacas Powered by Algorithms',
    funding: 45,
    image: '/images/logos/placeholder.png',
  },
  {
    id: 14,
    name: 'Neon Narwhals',
    description: 'Bright and Neon Narwhal NFTs',
    funding: 35,
    image: '/images/logos/placeholder.png',
  },
];

const itemsPerPage = 9;

export default function CollectionsOverview() {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = collections.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(collections.length / itemsPerPage);

  return (
    <div>
      <AppHero
        title="Collections Overview"
        subtitle="Browse and explore all collections. Click on a collection to view more details."
      />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentPageData.map((collection) => (
            <div key={collection.id} className="p-4 border rounded shadow">
              <Link legacyBehavior href={`/collections/${collection.id}`}>
                <a>
                  <img
                    src={collection.image}
                    alt={`${collection.name}`}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h2 className="text-xl font-bold mb-2">{collection.name}</h2>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-green-600">
                          {collection.funding}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                      <div
                        style={{ width: `${collection.funding}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                      ></div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={
              'pagination flex list-none justify-center space-x-2'
            }
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link px-3 py-1 border rounded'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link px-3 py-1 border rounded'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link px-3 py-1 border rounded'}
            activeLinkClassName={'bg-blue-500 text-white'}
          />
        </div>
      </div>
    </div>
  );
}
