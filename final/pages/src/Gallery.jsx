import React, { useState } from 'react';
import './Gallery.css';

function Gallery() {
        const images = [
          'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
          'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
          'https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
          'https://images.unsplash.com/photo-1492370284958-c20b15c692d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1640384974326-3e72680e0fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        ];
      
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
      
        const previousImage = () => {
          const index = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
          setCurrentImageIndex(index);
        };
      
        const nextImage = () => {
          const index = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
          setCurrentImageIndex(index);
        };

        const [theme, setTheme] = useState('light');

        const toggleTheme = () => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }

        const themeStyles = {
            light: {
              backgroundColor: '#fff',
              color: '#333',
            },
            dark: {
              backgroundColor: '#333',
              color: '#fff',
            },
          };
    

    return (
        <div className="gallery" style={themeStyles[theme]}>
          <div className="gallery-carousel">
            <img 
             className="gallery-image"
             src={images[currentImageIndex]}
             alt="carousel slide" 
            />
          </div>
          <div className="button-container">
            <button 
             className="button-one" 
             onClick={previousImage}
            >
             Previous
            </button>
            <button 
             className="button-two" 
             onClick={nextImage}
            >
             Next
            </button>
            <button 
             className="button-three"
             onClick={toggleTheme}
            >
             Theme
            </button>
          </div>
        </div>
      );
    }

export default Gallery;