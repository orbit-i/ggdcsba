import React, { useState } from 'react';
import { useSiteData } from '../../context/DataContext';
import { Image as ImageIcon, Sparkles, Eye, X } from 'lucide-react';
import { GalleryPhoto } from '../../types';
import { Modal } from '../Modal';

export const GalleryPage: React.FC = () => {
  const { galleryPhotos } = useSiteData();
  const gallery = galleryPhotos || [];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories = ['All', 'Campus & Gardens', 'Events & Sports', 'Labs & Tech', 'Auditorium', 'Academics'];

  const filteredPhotos = gallery.filter(photo => {
    return selectedCategory === 'All' || photo.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Title Header */}
      <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-md border-b-4 border-amber-400">
        <span className="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
          Visual Heritage
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif mt-2 text-white">
          Campus Picture Gallery
        </h1>
        <p className="text-sm text-emerald-200 mt-1 max-w-3xl">
          Visual glimpses of academic activities, convocations, science exhibitions, sports competitions, and campus gardens at Government Girls Degree College Nawabshah.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-emerald-200 pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div 
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="bg-white rounded-2xl overflow-hidden border border-emerald-100 shadow-2xs hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className="relative h-56 overflow-hidden bg-slate-900">
              {photo.mediaType === 'video' ? (
                <video 
                  src={photo.imageUrl}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  muted
                  playsInline
                />
              ) : (
                <img 
                  src={photo.imageUrl} 
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute top-3 left-3">
                <span className="bg-emerald-800 text-white text-[10px] font-bold px-2.5 py-1 rounded border border-emerald-600 shadow">
                  {photo.category}
                </span>
              </div>

              <div className="absolute bottom-3 right-3 bg-amber-400 text-slate-950 p-1.5 rounded-full shadow transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            <div className="p-4 space-y-1">
              <h3 className="font-serif font-bold text-base text-emerald-950 leading-snug">
                {photo.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={activePhoto !== null}
        onClose={() => setActivePhoto(null)}
        title={activePhoto ? activePhoto.title : ''}
        maxWidth="2xl"
      >
        {activePhoto && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-emerald-200 max-h-[70vh]">
              {activePhoto.mediaType === 'video' ? (
                <video 
                  src={activePhoto.imageUrl}
                  className="w-full h-auto object-contain max-h-[60vh] mx-auto bg-black"
                  controls
                  autoPlay
                />
              ) : (
                <img 
                  src={activePhoto.imageUrl} 
                  alt={activePhoto.title}
                  className="w-full h-auto object-contain max-h-[60vh] mx-auto bg-black"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            
            <div className="space-y-1">
              <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-2.5 py-0.5 rounded">
                {activePhoto.category}
              </span>
              <p className="text-xs text-slate-700 leading-relaxed pt-2">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
