
import { useState, useEffect } from 'react';

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

export const useMyList = () => {
  const [myList, setMyList] = useState<Movie[]>([]);

  useEffect(() => {
    const savedList = localStorage.getItem('netflix-my-list');
    if (savedList) {
      setMyList(JSON.parse(savedList));
    }
  }, []);

  const addToMyList = (movie: Movie) => {
    const updatedList = [...myList, movie];
    setMyList(updatedList);
    localStorage.setItem('netflix-my-list', JSON.stringify(updatedList));
  };

  const removeFromMyList = (movieId: number) => {
    const updatedList = myList.filter(movie => movie.id !== movieId);
    setMyList(updatedList);
    localStorage.setItem('netflix-my-list', JSON.stringify(updatedList));
  };

  const isInMyList = (movieId: number) => {
    return myList.some(movie => movie.id === movieId);
  };

  return {
    myList,
    addToMyList,
    removeFromMyList,
    isInMyList
  };
};
