'use client';

import React, { useState } from 'react';
import UploadPopup from '../collection/upload-popup'; // Import the UploadPopup component

interface Trait {
  _id: string;
  name: string;
  category: string;
  filePath: string | null;
}

interface TraitCategory {
  name: string;
  index: number;
  mandatory: boolean;
}

const emptyImage = '/images/none.png';

const CreateCollectionPage: React.FC = () => {
  const [categories, setCategories] = useState<TraitCategory[]>([
    { name: 'background', index: 1, mandatory: false },
    { name: 'body', index: 2, mandatory: false },
  ]);

  const [traits, setTraits] = useState<{ [key: string]: Trait[] }>({
    background: [],
    body: [],
  });

  const [selectedTraits, setSelectedTraits] = useState<{
    [key: string]: Trait | null;
  }>({
    background: null,
    body: null,
  });

  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIndex, setNewCategoryIndex] = useState(1);
  const [newCategoryMandatory, setNewCategoryMandatory] = useState(false);

  const handleUpload = () => {
    // Fetch updated traits from the server or update state here
    // For the mock page, we'll just reset the state for simplicity
    setShowUploadPopup(false);
  };

  const handleAddCategory = () => {
    if (!newCategoryName) return;

    const newCategory: TraitCategory = {
      name: newCategoryName.toLowerCase(),
      index: newCategoryIndex,
      mandatory: newCategoryMandatory,
    };

    setCategories([...categories, newCategory]);
    setTraits({ ...traits, [newCategory.name]: [] });
    setSelectedTraits({ ...selectedTraits, [newCategory.name]: null });

    setNewCategoryName('');
    setNewCategoryIndex(1);
    setNewCategoryMandatory(false);
    setShowAddCategoryPopup(false);
  };

  return (
    <div className="create-collection-page container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Collection</h1>
      <div className="mb-4">
        <label
          className="block text-med font-bold mb-2"
          htmlFor="collectionName"
        >
          Collection Name
        </label>
        <input
          type="text"
          id="collectionName"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-med font-bold mb-2"
          htmlFor="collectionDescription"
        >
          Collection Description
        </label>
        <textarea
          id="collectionDescription"
          value={collectionDescription}
          onChange={(e) => setCollectionDescription(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="flex justify-center">
        <div className="w-full flex">
          <div className="w-2/3 pr-4">
            <div className="relative w-full h-[48rem] border-4 border-gray-300">
              {categories.map(
                (category) =>
                  selectedTraits[category.name] &&
                  selectedTraits[category.name]!.filePath && (
                    <img
                      key={category.name}
                      src={selectedTraits[category.name]!.filePath!}
                      alt={selectedTraits[category.name]!.name}
                      className={`absolute top-0 left-0 w-full h-full object-cover z-${
                        category.index * 10
                      }`}
                    />
                  )
              )}
            </div>
            <div className="flex justify-center mt-4">
              <button className="btn btn-primary text-2xl  px-8">
                Create Collection
              </button>
            </div>
          </div>
          <div className="w-1/3">
            {categories.map((category) => (
              <div key={category.name} className="mt-4">
                <h2 className="text-2xl font-bold mb-2 capitalize">
                  {category.name}
                </h2>
                <div className="flex items-center space-x-2">
                  {traits[category.name]?.map((trait) => (
                    <div
                      key={trait._id}
                      onClick={() =>
                        setSelectedTraits({
                          ...selectedTraits,
                          [category.name]: trait,
                        })
                      }
                      className="cursor-pointer"
                    >
                      <img
                        src={trait.filePath ? trait.filePath : emptyImage}
                        alt={trait.name}
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
            ))}
            <div className="mt-4">
              <button
                className="btn btn-primary"
                onClick={() => setShowAddCategoryPopup(true)}
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      </div>
      <UploadPopup
        show={showUploadPopup}
        onClose={() => setShowUploadPopup(false)}
        onUpload={handleUpload}
      />
      {showAddCategoryPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <div className="mb-4">
              <label
                className="block text-med font-bold mb-2"
                htmlFor="categoryName"
              >
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-med font-bold mb-2"
                htmlFor="categoryIndex"
              >
                Category Index
              </label>
              <input
                type="number"
                id="categoryIndex"
                value={newCategoryIndex}
                onChange={(e) => setNewCategoryIndex(parseInt(e.target.value))}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-med font-bold mb-2">
                <input
                  type="checkbox"
                  checked={newCategoryMandatory}
                  onChange={(e) => setNewCategoryMandatory(e.target.checked)}
                  className="mr-2"
                />
                Mandatory
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddCategoryPopup(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button onClick={handleAddCategory} className="btn btn-primary">
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCollectionPage;
