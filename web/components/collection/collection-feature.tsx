'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadPopup from './upload-popup'; // Import the UploadPopup component

interface Trait {
  _id: string;
  name: string;
  category: string;
  filePath: string | null;
}

const emptyImage = '/images/none.png';
const bodyImage = '/images/base/body.png';

const CollectionPage: React.FC = () => {
  const [backgrounds, setBackgrounds] = useState<Trait[]>([]);
  const [shirts, setShirts] = useState<Trait[]>([]);
  const [weapons, setWeapons] = useState<Trait[]>([]);

  const [selectedBackground, setSelectedBackground] = useState<Trait | null>(
    null
  );
  const [selectedShirt, setSelectedShirt] = useState<Trait | null>(null);
  const [selectedWeapon, setSelectedWeapon] = useState<Trait | null>(null);

  const [showUploadPopup, setShowUploadPopup] = useState(false);

  useEffect(() => {
    fetchTraits();
  }, []);

  const fetchTraits = async () => {
    const response = await axios.get('http://localhost:5000/api/traits');
    const traits: Trait[] = response.data;

    // Add the "None" option to each category
    const noneOption: Trait = {
      _id: 'none',
      name: 'None',
      category: '',
      filePath: null,
    };

    setBackgrounds([
      noneOption,
      ...traits.filter((trait) => trait.category === 'background'),
    ]);
    setShirts([
      noneOption,
      ...traits.filter((trait) => trait.category === 'shirt'),
    ]);
    setWeapons([
      noneOption,
      ...traits.filter((trait) => trait.category === 'weapon'),
    ]);
  };

  const handleUpload = () => {
    fetchTraits();
  };

  const baseImage = bodyImage;

  return (
    <div className="collection-page container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Berlin Bears</h1>
      <div className="flex justify-center">
        <div className="w-full flex">
          <div className="w-2/3 pr-4">
            <div className="relative w-full h-[48rem]">
              {selectedBackground && selectedBackground.filePath && (
                <img
                  src={`http://localhost:5000/${selectedBackground.filePath}`}
                  alt={selectedBackground.name}
                  className="absolute top-0 left-0 w-full h-full object-cover z-0"
                />
              )}
              <img
                src={baseImage}
                alt="Base"
                className="absolute top-0 left-0 w-full h-full object-cover z-10"
              />
              {selectedShirt && selectedShirt.filePath && (
                <img
                  src={`http://localhost:5000/${selectedShirt.filePath}`}
                  alt={selectedShirt.name}
                  className="absolute top-0 left-0 w-full h-full object-cover z-20"
                />
              )}
              {selectedWeapon && selectedWeapon.filePath && (
                <img
                  src={`http://localhost:5000/${selectedWeapon.filePath}`}
                  alt={selectedWeapon.name}
                  className="absolute top-0 left-0 w-full h-full object-cover z-30"
                />
              )}
            </div>
            <button className="btn btn-primary mt-4">Buy collection</button>
          </div>
          <div className="w-1/3">
            <div>
              <h2 className="text-2xl font-bold mb-2">Background</h2>
              <div className="flex items-center space-x-2">
                {backgrounds.map((bg) => (
                  <div
                    key={bg._id}
                    onClick={() => setSelectedBackground(bg)}
                    className={`cursor-pointer ${
                      selectedBackground?._id === bg._id
                        ? 'border-4 border-white'
                        : ''
                    }`}
                  >
                    <img
                      src={
                        bg.filePath
                          ? `http://localhost:5000/${bg.filePath}`
                          : emptyImage
                      }
                      alt={bg.name}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                ))}
                <button
                  className="btn btn-secondary ml-2"
                  onClick={() => setShowUploadPopup(true)}
                >
                  Upload
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-2">Shirt</h2>
              <div className="flex items-center space-x-2">
                {shirts.map((shirt) => (
                  <div
                    key={shirt._id}
                    onClick={() => setSelectedShirt(shirt)}
                    className={`cursor-pointer ${
                      selectedShirt?._id === shirt._id
                        ? 'border-4 border-white'
                        : ''
                    }`}
                  >
                    <img
                      src={
                        shirt.filePath
                          ? `http://localhost:5000/${shirt.filePath}`
                          : emptyImage
                      }
                      alt={shirt.name}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                ))}
                <button
                  className="btn btn-secondary ml-2"
                  onClick={() => setShowUploadPopup(true)}
                >
                  Upload
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-2">Weapon</h2>
              <div className="flex items-center space-x-2">
                {weapons.map((weapon) => (
                  <div
                    key={weapon._id}
                    onClick={() => setSelectedWeapon(weapon)}
                    className={`cursor-pointer ${
                      selectedWeapon?._id === weapon._id
                        ? 'border-4 border-white'
                        : ''
                    }`}
                  >
                    <img
                      src={
                        weapon.filePath
                          ? `http://localhost:5000/${weapon.filePath}`
                          : emptyImage
                      }
                      alt={weapon.name}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                ))}
                <button
                  className="btn btn-secondary ml-2"
                  onClick={() => setShowUploadPopup(true)}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UploadPopup
        show={showUploadPopup}
        onClose={() => setShowUploadPopup(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default CollectionPage;
