
import React, { useState, useEffect } from 'react';
import { Search, Play, Info, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  image: string;
  category: string;
  year: number;
  rating: string;
  description: string;
  featured?: boolean;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({});

  const movies: Movie[] = [
    {
      id: 1,
      title: "Stranger Things",
      image: "https://images.unsplash.com/photo-1489599849642-2aa49e1f6d7c?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-14",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments.",
      featured: true
    },
    {
      id: 2,
      title: "The Crown",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-MA",
      description: "Follows the political rivalries and romance of Queen Elizabeth II's reign."
    },
    {
      id: 3,
      title: "Wednesday",
      image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-14",
      description: "Follows Wednesday Addams' years as a student at Nevermore Academy."
    },
    {
      id: 4,
      title: "Breaking Bad",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
      category: "popular",
      year: 2023,
      rating: "TV-MA",
      description: "A high school chemistry teacher turned methamphetamine producer."
    },
    {
      id: 5,
      title: "Money Heist",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop",
      category: "action",
      year: 2023,
      rating: "TV-MA",
      description: "A criminal mastermind manipulates hostages and police."
    },
    {
      id: 6,
      title: "Dark",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
      category: "action",
      year: 2022,
      rating: "TV-MA",
      description: "A family saga with a supernatural twist set in a German town."
    },
    {
      id: 7,
      title: "The Witcher",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2023,
      rating: "TV-MA",
      description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place."
    },
    {
      id: 8,
      title: "Ozark",
      image: "https://images.unsplash.com/photo-1489599849642-2aa49e1f6d7c?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-MA",
      description: "A financial advisor drags his family from Chicago to the Missouri Ozarks."
    }
  ];

  const categories = [
    { id: 'trending', title: 'Trending Now' },
    { id: 'popular', title: 'Popular on Netflix' },
    { id: 'action', title: 'Action & Adventure' },
    { id: 'fantasy', title: 'Sci-Fi & Fantasy' }
  ];

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredMovie = movies.find(movie => movie.featured);

  const scroll = (categoryId: string, direction: 'left' | 'right') => {
    const container = document.getElementById(`category-${categoryId}`);
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPositions(prev => ({ ...prev, [categoryId]: newPosition }));
    }
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 px-4 md:px-16 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-red-600 text-2xl md:text-3xl font-bold">NETFLIX</h1>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Home</a>
              <a href="#" className="hover:text-gray-300 transition-colors">TV Shows</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Movies</a>
              <a href="#" className="hover:text-gray-300 transition-colors">My List</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/50 border border-gray-600 rounded-sm pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center font-semibold text-sm">
              U
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {featuredMovie && (
        <section className="relative h-screen flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${featuredMovie.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
          </div>
          
          <div className="relative z-10 px-4 md:px-16 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              {featuredMovie.title}
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90 animate-fade-in">
              {featuredMovie.description}
            </p>
            <div className="flex space-x-4 animate-fade-in">
              <button className="bg-white text-black px-8 py-3 rounded-sm font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-colors">
                <Play className="w-5 h-5 fill-current" />
                <span>Play</span>
              </button>
              <button 
                onClick={() => openModal(featuredMovie)}
                className="bg-gray-600/70 text-white px-8 py-3 rounded-sm font-semibold flex items-center space-x-2 hover:bg-gray-600/90 transition-colors"
              >
                <Info className="w-5 h-5" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Movie Categories */}
      <div className="relative z-10 -mt-32 md:-mt-48 space-y-8 pb-16">
        {searchQuery ? (
          <div className="px-4 md:px-16">
            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
              {filteredMovies.map((movie) => (
                <div 
                  key={movie.id}
                  onClick={() => openModal(movie)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-video relative rounded-sm overflow-hidden">
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium truncate">{movie.title}</h3>
                </div>
              ))}
            </div>
          </div>
        ) : (
          categories.map((category) => {
            const categoryMovies = movies.filter(movie => movie.category === category.id);
            return (
              <div key={category.id} className="px-4 md:px-16">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">{category.title}</h2>
                <div className="relative group">
                  <button
                    onClick={() => scroll(category.id, 'left')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <div 
                    id={`category-${category.id}`}
                    className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {categoryMovies.map((movie) => (
                      <div 
                        key={movie.id}
                        onClick={() => openModal(movie)}
                        className="flex-none w-32 md:w-48 group cursor-pointer"
                      >
                        <div className="aspect-video relative rounded-sm overflow-hidden">
                          <img 
                            src={movie.image} 
                            alt={movie.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                        </div>
                        <h3 className="mt-2 text-sm font-medium truncate">{movie.title}</h3>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => scroll(category.id, 'right')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedMovie.image} 
                alt={selectedMovie.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                <span>{selectedMovie.year}</span>
                <span>{selectedMovie.rating}</span>
              </div>
              <p className="text-gray-300 mb-6">{selectedMovie.description}</p>
              
              <div className="flex space-x-4">
                <button className="bg-white text-black px-6 py-2 rounded-sm font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play</span>
                </button>
                <button className="border border-gray-600 text-white px-6 py-2 rounded-sm font-semibold hover:border-white transition-colors">
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
