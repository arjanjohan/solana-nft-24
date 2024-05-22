'use client';

import { AppHero } from '../ui/ui-layout';

import { useState } from 'react';
import Image from 'next/image';
import {
  CollectionIcon,
  UploadIcon,
  UserGroupIcon,
  CashIcon,
} from '@heroicons/react/outline';

export default function DashboardFeature() {
  return (
    <div className="flex flex-col items-center mt-10">
      <Image
        src="/logo2.png"
        alt="Mint Together Logo"
        width={500}
        height={500}
      />
      <main className="mt-10">
        <section className="text-center py-20 bg-gray-800">
          <div className="container mx-auto">
            <p className="text-xl mb-10">
              NFT Launchpad for Community Generated Art
            </p>
            <a
              href="/collections"
              className="bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600"
            >
              See collections
            </a>
          </div>
        </section>
        <section id="features" className="py-20 ">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Amazing Features</h2>
            <div className="flex flex-wrap justify-center">
              <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
                <div className="bg-gray-800 rounded-lg p-6">
                  <CollectionIcon className="w-12 h-12 mx-auto text-pink-500 mb-6" />
                  <h3 className="text-xl font-bold mb-4">
                    Community Collections
                  </h3>
                  <p>Create NFT collections together with the community.</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
                <div className="bg-gray-800 rounded-lg p-6">
                  <UploadIcon className="w-12 h-12 mx-auto text-pink-500 mb-6" />
                  <h3 className="text-xl font-bold mb-4">Upload Traits</h3>
                  <p>Upload and vote on traits to build unique NFTs.</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
                <div className="bg-gray-800 rounded-lg p-6">
                  <UserGroupIcon className="w-12 h-12 mx-auto text-pink-500 mb-6" />
                  <h3 className="text-xl font-bold mb-4">Community Voting</h3>
                  <p>Vote on your favorite traits to shape the collection.</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
                <div className="bg-gray-800 rounded-lg p-6">
                  <CashIcon className="w-12 h-12 mx-auto text-pink-500 mb-6" />
                  <h3 className="text-xl font-bold mb-4">Earn Royalties</h3>
                  <p>Earn royalties from the collections you contribute to.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="py-20 bg-gray-800">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">How It Works</h2>
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-1/3 p-4">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">
                    1. Create a Collection
                  </h3>
                  <p>
                    Name and describe your collection, decide on traits, and
                    upload images.
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-1/3 p-4">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">
                    2. Add to Collection
                  </h3>
                  <p>
                    Buy tokens, upload traits, and vote on your favorite traits.
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-1/3 p-4">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">3. Mint NFTs</h3>
                  <p>
                    Once voting ends, mint the finalized NFTs using your tokens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="team" className="py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Meet the Team</h2>
            <div className="flex flex-wrap justify-center">
              <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div
                    className="w-32 h-32 rounded-full mx-auto mb-4 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/milady.png)' }}
                  />

                  <h3 className="text-xl font-bold mb-2">
                    <a href="https://twitter.com/arjanjohan">arjanjohan</a>
                  </h3>
                  <p className="text-gray-400">Developer</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
