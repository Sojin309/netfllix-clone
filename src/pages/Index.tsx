import React, { useState, useEffect } from 'react';
import { Search, Play, Info, ChevronLeft, ChevronRight, X, Plus, Check } from 'lucide-react';
import ProfileDropdown from '../components/ProfileDropdown';
import { useMyList } from '../hooks/useMyList';

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
  const [activeNav, setActiveNav] = useState('home');
  const { myList, addToMyList, removeFromMyList, isInMyList } = useMyList();

  const movies: Movie[] = [
    // Trending Movies
    {
      id: 1,
      title: "Stranger Things",
      image: "https://images.nightcafe.studio/jobs/grlpksMlfSZMdR4vhhUu/grlpksMlfSZMdR4vhhUu--1--pb390.jpg?tr=w-1600,c-at_max",
      category: "trending",
      year: 2023,
      rating: "TV-14",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
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
      title: "House of Cards",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-MA",
      description: "A ruthless politician will stop at nothing to conquer Washington, D.C."
    },
    {
      id: 4,
      title: "Ozark",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-MA",
      description: "A financial advisor drags his family from Chicago to the Missouri Ozarks."
    },
    {
      id: 5,
      title: "Narcos",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-MA",
      description: "The true story of the rise and fall of Pablo Escobar and the Medellín Cartel."
    },
    {
      id: 6,
      title: "Bridgerton",
      image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-MA",
      description: "Wealth, lust, and betrayal set in the backdrop of Regency era England."
    },
    {
      id: 7,
      title: "The Queen's Gambit",
      image: "https://images.unsplash.com/photo-1489599849642-2aa49e1f6d7c?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-14",
      description: "In a 1950s orphanage, a young girl reveals an astonishing talent for chess."
    },
    {
      id: 8,
      title: "Money Heist",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-MA",
      description: "A criminal mastermind manipulates hostages and police during a heist."
    },
    {
      id: 9,
      title: "Squid Game",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-MA",
      description: "Hundreds of cash-strapped players accept an invitation to compete in children's games."
    },
    {
      id: 10,
      title: "Dark",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-MA",
      description: "A family saga with a supernatural twist set in a German town."
    },
    {
      id: 11,
      title: "The Umbrella Academy",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-14",
      description: "A dysfunctional family of superheroes comes together to solve their father's mysterious death."
    },
    {
      id: 12,
      title: "Emily in Paris",
      image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-MA",
      description: "A young American woman from Chicago moves to Paris for an unexpected job opportunity."
    },
    {
      id: 13,
      title: "Lupin",
      image: "https://images.unsplash.com/photo-1489599849642-2aa49e1f6d7c?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-MA",
      description: "Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father."
    },
    {
      id: 14,
      title: "The Witcher",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-MA",
      description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world."
    },
    {
      id: 15,
      title: "Cobra Kai",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
      category: "trending",
      year: 2023,
      rating: "TV-14",
      description: "Decades after the tournament, the rivalry between Johnny and Daniel reignites."
    },

    // Popular Movies
    {
      id: 16,
      title: "Wednesday",
      image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-14",
      description: "Follows Wednesday Addams' years as a student at Nevermore Academy."
    },
    {
      id: 17,
      title: "Breaking Bad",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
      category: "popular",
      year: 2023,
      rating: "TV-MA",
      description: "A high school chemistry teacher turned methamphetamine producer."
    },
    {
      id: 18,
      title: "Better Call Saul",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-MA",
      description: "The trials and tribulations of criminal lawyer Jimmy McGill in the time before he meets Walter White."
    },
    {
      id: 19,
      title: "Orange Is the New Black",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-MA",
      description: "A privileged New Yorker ends up in a women's federal prison when her past catches up with her."
    },
    {
      id: 20,
      title: "Mindhunter",
      image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-MA",
      description: "In the late 1970s two FBI agents expand criminal science by delving into the psychology of murder."
    },
    {
      id: 21,
      title: "Black Mirror",
      image: "https://images.unsplash.com/photo-1489599849642-2aa49e1f6d7c?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-MA",
      description: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations."
    },
    {
      id: 22,
      title: "The Good Place",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-14",
      description: "A woman struggles to be a good person when she realizes she's been mistakenly sent to the Good Place."
    },
    {
      id: 23,
      title: "Russian Doll",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-MA",
      description: "A young woman gets caught in a mysterious loop, repeatedly attending the same party and dying."
    },
    {
      id: 24,
      title: "BoJack Horseman",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-MA",
      description: "Meet the most beloved sitcom horse of the '90s, 20 years later."
    },
    {
      id: 25,
      title: "Stranger Things 4",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-14",
      description: "It's been six months since the Battle of Starcourt, which brought terror and destruction to Hawkins."
    },
    {
      id: 26,
      title: "Heartstopper",
      image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-14",
      description: "Charlie, a highly-strung, openly gay over-thinker, and Nick, a cheerful, soft-hearted rugby player."
    },
    {
      id: 27,
      title: "Euphoria",
      image: "https://images.unsplash.com/photo-1489599849642-2aa49e1f6d7c?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-MA",
      description: "A look at life for a group of high school students as they grapple with issues of drugs, sex, and violence."
    },
    {
      id: 28,
      title: "The Boys",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-MA",
      description: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers."
    },
    {
      id: 29,
      title: "Succession",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-MA",
      description: "The Roy family is known for controlling the biggest media and entertainment company in the world."
    },
    {
      id: 30,
      title: "Outer Banks",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop",
      category: "popular",
      year: 2022,
      rating: "TV-MA",
      description: "A tight-knit group of teens unearths a long-buried secret, setting off a chain of illicit events."
    },

    // Action Movies
    {
      id: 31,
      title: "Money Heist",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop",
      category: "action",
      year: 2023,
      rating: "TV-MA",
      description: "A criminal mastermind manipulates hostages and police."
    },
    {
      id: 32,
      title: "Dark",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
      category: "action",
      year: 2022,
      rating: "TV-MA",
      description: "A family saga with a supernatural twist set in a German town."
    },
    {
      id: 33,
      title: "Extraction",
      image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=450&fit=crop",
      category: "action",
      year: 2023,
      rating: "R",
      description: "A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord."
    },
    {
      id: 34,
      title: "6 Underground",
      image: "https://images.unsplash.com/photo-1489599849642-2aa49e1f6d7c?w=800&h=450&fit=crop",
      category: "action",
      year: 2023,
      rating: "R",
      description: "Six individuals from all around the globe, each the very best at what they do, have been chosen."
    },
    {
      id: 35,
      title: "Red Notice",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
      category: "action",
      year: 2023,
      rating: "PG-13",
      description: "An Interpol agent tracks the world's most wanted art thief."
    },
    {
      id: 36,
      title: "The Gray Man",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
      category: "action",
      year: 2023,
      rating: "PG-13",
      description: "When the CIA's top asset — his identity known to no one — uncovers agency secrets."
    },
    {
      id: 37,
      title: "Triple Frontier",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop",
      category: "action",
      year: 2022,
      rating: "R",
      description: "Five former Special Forces operatives reunite to plan a heist in a sparsely populated multi-border zone of South America."
    },
    {
      id: 38,
      title: "The Old Guard",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
      category: "action",
      year: 2022,
      rating: "R",
      description: "A covert team of immortal mercenaries is suddenly exposed and must now fight to keep their identity a secret."
    },
    {
      id: 39,
      title: "Army of the Dead",
      image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=450&fit=crop",
      category: "action",
      year: 2022,
      rating: "R",
      description: "Following a zombie outbreak in Las Vegas, a group of mercenaries take the ultimate gamble."
    },
    {
      id: 40,
      title: "Bright",
      image: "https://images.unsplash.com/photo-1489599849642-2aa49e1f6d7c?w=800&h=450&fit=crop",
      category: "action",
      year: 2022,
      rating: "R",
      description: "In an alternate present-day where magical creatures live among us, two L.A. cops become embroiled in a prophesied turf war."
    },
    {
      id: 41,
      title: "Project Power",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
      category: "action",
      year: 2022,
      rating: "R",
      description: "When a pill that gives its users unpredictable superpowers for five minutes hits the streets of New Orleans."
    },
    {
      id: 42,
      title: "Kate",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
      category: "action",
      year: 2022,
      rating: "R",
      description: "A female assassin has 24 hours to get vengeance on her poisoner before she dies."
    },
    {
      id: 43,
      title: "Sweet Tooth",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop",
      category: "action",
      year: 2022,
      rating: "TV-14",
      description: "A boy who is half-human and half-deer survives in a post-apocalyptic world with other hybrids."
    },
    {
      id: 44,
      title: "Shadow and Bone",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
      category: "action",
      year: 2022,
      rating: "TV-14",
      description: "Dark forces conspire against orphan mapmaker Alina Starkov when she unleashes an extraordinary power."
    },
    {
      id: 45,
      title: "Jupiter's Legacy",
      image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=450&fit=crop",
      category: "action",
      year: 2022,
      rating: "TV-14",
      description: "The first generation of superheroes has kept the world safe for nearly a century."
    },

    // Fantasy Movies
    {
      id: 46,
      title: "The Witcher",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2023,
      rating: "TV-MA",
      description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place."
    },
    {
      id: 47,
      title: "Ozark",
      image: "https://images.unsplash.com/photo-1489599849642-2aa49e1f6d7c?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-MA",
      description: "A financial advisor drags his family from Chicago to the Missouri Ozarks."
    },
    {
      id: 48,
      title: "The Sandman",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2023,
      rating: "TV-MA",
      description: "After years of imprisonment, Morpheus — the King of Dreams — embarks on a journey across worlds."
    },
    {
      id: 49,
      title: "Cursed",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-MA",
      description: "A teenage sorceress named Nimue encounters a young Arthur on her quest to find a powerful and ancient sword."
    },
    {
      id: 50,
      title: "Locke & Key",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-14",
      description: "After their father is murdered, three siblings move to their ancestral home and find magical keys."
    },
    {
      id: 51,
      title: "The Umbrella Academy",
      image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-14",
      description: "A dysfunctional family of superheroes comes together to solve their father's mysterious death."
    },
    {
      id: 52,
      title: "Warrior Nun",
      image: "https://images.unsplash.com/photo-1489599849642-2aa49e1f6d7c?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-MA",
      description: "After waking up in a morgue, an orphaned teen discovers she now possesses superpowers."
    },
    {
      id: 53,
      title: "Sweet Magnolias",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-14",
      description: "Lifelong friends Maddie, Helen and Dana Sue, lift each other as they juggle relationships, family and careers."
    },
    {
      id: 54,
      title: "October Faction",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-MA",
      description: "Monster hunters Fred and Deloris Allen tangle with evil in the supernatural horror series."
    },
    {
      id: 55,
      title: "I Am Not Okay with This",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e1f6d7c?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-MA",
      description: "A teen navigates the complexities of high school, family and her sexuality while dealing with new superpowers."
    },
    {
      id: 56,
      title: "The Order",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-MA",
      description: "Out to avenge his mother's death, a college student pledges to a secret order and lands in a war."
    },
    {
      id: 57,
      title: "Chilling Adventures of Sabrina",
      image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-14",
      description: "As her 16th birthday nears, Sabrina must choose between the witch world of her family."
    },
    {
      id: 58,
      title: "The Dragon Prince",
      image: "https://images.unsplash.com/photo-1489599849642-2aa49e1f6d7c?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-Y7",
      description: "An extraordinary discovery inspires two human princes and an elven assassin to team up."
    },
    {
      id: 59,
      title: "She-Ra and the Princesses of Power",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-Y7",
      description: "In this reboot of the '80s series, a magic sword transforms an orphan into warrior She-Ra."
    },
    {
      id: 60,
      title: "The Dark Crystal: Age of Resistance",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
      category: "fantasy",
      year: 2022,
      rating: "TV-PG",
      description: "Return to the world of Thra, where three Gelfling discover the horrifying secret behind the Skeksis' power."
    }
  ];

  const getFilteredContent = () => {
    if (searchQuery) {
      return movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (activeNav) {
      case 'tvshows':
        return movies.filter(movie => 
          movie.rating.includes('TV-') || movie.category === 'trending'
        );
      case 'movies':
        return movies.filter(movie => 
          !movie.rating.includes('TV-') || movie.category === 'action' || movie.category === 'fantasy'
        );
      case 'mylist':
        return myList;
      default:
        return movies;
    }
  };

  const categories = [
    { id: 'trending', title: 'Trending Now' },
    { id: 'popular', title: 'Popular on Netflix' },
    { id: 'action', title: 'Action & Adventure' },
    { id: 'fantasy', title: 'Sci-Fi & Fantasy' }
  ];

  const filteredMovies = getFilteredContent();
  const featuredMovie = movies.find(movie => movie.featured);

  const handleMyListToggle = (movie: Movie) => {
    if (isInMyList(movie.id)) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie);
    }
  };

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
              <button 
                onClick={() => setActiveNav('home')}
                className={`hover:text-gray-300 transition-colors ${activeNav === 'home' ? 'text-white font-semibold' : 'text-gray-400'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveNav('tvshows')}
                className={`hover:text-gray-300 transition-colors ${activeNav === 'tvshows' ? 'text-white font-semibold' : 'text-gray-400'}`}
              >
                TV Shows
              </button>
              <button 
                onClick={() => setActiveNav('movies')}
                className={`hover:text-gray-300 transition-colors ${activeNav === 'movies' ? 'text-white font-semibold' : 'text-gray-400'}`}
              >
                Movies
              </button>
              <button 
                onClick={() => setActiveNav('mylist')}
                className={`hover:text-gray-300 transition-colors ${activeNav === 'mylist' ? 'text-white font-semibold' : 'text-gray-400'}`}
              >
                My List
              </button>
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
            <ProfileDropdown />
          </div>
        </div>
      </nav>

      {/* Hero Section - Only show on home */}
      {featuredMovie && activeNav === 'home' && !searchQuery && (
        <section className="relative h-[90vh] flex items-end">
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${featuredMovie.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 px-4 md:px-16 pb-20 max-w-2xl">
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
      <div className={`relative z-10 space-y-8 pb-16 ${activeNav === 'home' && !searchQuery ? '-mt-32 md:-mt-48' : 'pt-24'}`}>
        {searchQuery || activeNav !== 'home' ? (
          <div className="px-4 md:px-16">
            <h2 className="text-2xl font-semibold mb-4">
              {searchQuery ? 'Search Results' : 
               activeNav === 'tvshows' ? 'TV Shows' :
               activeNav === 'movies' ? 'Movies' :
               activeNav === 'mylist' ? 'My List' : 'All Content'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
              {filteredMovies.map((movie) => (
                <div 
                  key={movie.id}
                  className="group cursor-pointer relative"
                >
                  <div className="aspect-video relative rounded-sm overflow-hidden">
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMyListToggle(movie);
                      }}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {isInMyList(movie.id) ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                  <h3 
                    onClick={() => openModal(movie)}
                    className="mt-2 text-sm font-medium truncate hover:text-gray-300 transition-colors"
                  >
                    {movie.title}
                  </h3>
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
                        className="flex-none w-32 md:w-48 group cursor-pointer relative"
                      >
                        <div className="aspect-video relative rounded-sm overflow-hidden">
                          <img 
                            src={movie.image} 
                            alt={movie.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMyListToggle(movie);
                            }}
                            className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            {isInMyList(movie.id) ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Plus className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        <h3 
                          onClick={() => openModal(movie)}
                          className="mt-2 text-sm font-medium truncate hover:text-gray-300 transition-colors"
                        >
                          {movie.title}
                        </h3>
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
                <button 
                  onClick={() => handleMyListToggle(selectedMovie)}
                  className="border border-gray-600 text-white px-6 py-2 rounded-sm font-semibold hover:border-white transition-colors flex items-center space-x-2"
                >
                  {isInMyList(selectedMovie.id) ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Remove from List</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to List</span>
                    </>
                  )}
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
