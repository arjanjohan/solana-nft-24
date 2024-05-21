'use client';

import React, { useState } from 'react';

const emptyImage = '/images/none.png';
const bodyImage = '/images/base/body.png';

// Hardcoded traits for each category
const backgrounds = [
  { id: 0, name: 'None', src: null },
  { id: 1, name: 'City', src: '/images/backgrounds/city-berlin.jpg' },
  { id: 2, name: 'Forest', src: '/images/backgrounds/forest.jpg' },
  { id: 3, name: 'Space', src: '/images/backgrounds/space.jpg' },
  { id: 4, name: 'W3Hub', src: '/images/backgrounds/w3hub.jpg' },
];

const shirts = [
  { id: 0, name: 'None', src: null },
  { id: 1, name: 'Red', src: '/images/shirt/red.png' },
  { id: 2, name: 'Blue', src: '/images/shirt/blue.png' },
  { id: 3, name: 'Green', src: '/images/shirt/green.png' },
  { id: 4, name: 'Solana', src: '/images/shirt/solana.png' },
];

const weapons = [
  { id: 0, name: 'None', src: null },
  { id: 1, name: 'Axe', src: '/images/weapons/axe.png' },
  { id: 2, name: 'Guns', src: '/images/weapons/guns.png' },
  { id: 2, name: 'Stick', src: '/images/weapons/stick.png' },
  { id: 3, name: 'Gun', src: '/images/weapons/gun2.png' },
];

const CollectionPage = () => {
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedShirt, setSelectedShirt] = useState(null);
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  const baseImage = bodyImage;

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-4">
        Customize Your Collection Item
      </h1>
      <div className="flex">
        <div className="w-2/3">
          <div className="relative w-full h-[48rem]">
            {selectedBackground && selectedBackground.src && (
              <img
                src={selectedBackground.src}
                alt={selectedBackground.name}
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              />
            )}
            <img
              src={baseImage}
              alt="Base"
              className="absolute top-0 left-0 w-full h-full object-cover z-10"
            />
            {selectedShirt && selectedShirt.src && (
              <img
                src={selectedShirt.src}
                alt={selectedShirt.name}
                className="absolute top-0 left-0 w-full h-full object-cover z-20"
              />
            )}
            {selectedWeapon && selectedWeapon.src && (
              <img
                src={selectedWeapon.src}
                alt={selectedWeapon.name}
                className="absolute top-0 left-0 w-full h-full object-cover z-30"
              />
            )}
          </div>
          <button className="btn btn-primary mt-4">Buy collection</button>
        </div>
        <div className="w-1/3 pl-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Background</h2>
            <div className="flex items-center space-x-2">
              {backgrounds.map((bg) => (
                <div
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg)}
                  className="cursor-pointer"
                >
                  <img
                    src={bg.src || emptyImage}
                    alt={bg.name}
                    className="w-16 h-16 object-cover"
                  />
                </div>
              ))}
              <button className="btn btn-secondary ml-2">Upload</button>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">Shirt</h2>
            <div className="flex items-center space-x-2">
              {shirts.map((shirt) => (
                <div
                  key={shirt.id}
                  onClick={() => setSelectedShirt(shirt)}
                  className="cursor-pointer"
                >
                  <img
                    src={shirt.src || emptyImage}
                    alt={shirt.name}
                    className="w-16 h-16 object-cover"
                  />
                </div>
              ))}
              <button className="btn btn-secondary ml-2">Upload</button>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">Weapon</h2>
            <div className="flex items-center space-x-2">
              {weapons.map((weapon) => (
                <div
                  key={weapon.id}
                  onClick={() => setSelectedWeapon(weapon)}
                  className="cursor-pointer"
                >
                  <img
                    src={weapon.src || emptyImage}
                    alt={weapon.name}
                    className="w-16 h-16 object-cover"
                  />
                </div>
              ))}
              <button className="btn btn-secondary ml-2">Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
