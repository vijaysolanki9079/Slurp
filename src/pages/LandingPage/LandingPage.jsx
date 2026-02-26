import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageSequence } from '../../hooks/useImageSequence';
import BlurImage from '../../componemts/BlurImage/BlurImage';
import './LandingPage.css';

// Importing banners
import banner2Placeholder from '../../assets/imgs/banner_2.jpg';
import banner2Real from '../../assets/imgs/chef.png';
import banner4 from '../../assets/imgs/seasonal.png';
import banner5Placeholder from '../../assets/imgs/banner-5.jpg';
import banner5Real from '../../assets/imgs/bites.png';
import cultureImg from '../../assets/imgs/image.png';
import bookImg from '../../assets/imgs/book (1).png';

const LandingPage = () => {
    const navigate = useNavigate();

    // Configure the sequence
    const canvasRef = useImageSequence({
        frameCount: 65,
        imagePrefix: '/src/assets/transitions/_theme_correction_202602231441_and66_',
        imageSuffix: '.jpg',
        fps: 24,
        loop: false
    });

    const handleGoToMenu = () => {
        navigate('/menu');
    };

    return (
        <div className="landing-page">
            <div className="sequence-container">
                <canvas ref={canvasRef} className="sequence-canvas" />
                <div className="sequence-overlay">
                </div>
            </div>

            <div className="culture-section">
                <div className="culture-content">
                    <h1 className="hero-title">Experience Culinary <span className="highlight">Excellence</span></h1>
                    <p className="hero-subtitle">Freshly curated dishes delivered straight to your doorstep.</p>
                    <h2 className="culture-title">Our Culture</h2>
                    <div className="culture-image-container">
                        <img src={cultureImg} alt="Our Culture" className="culture-image" />
                    </div>
                </div>
            </div>

            <div className="banners-container">
                <div className="banner-title-section">
                    <h2>Our Signature Specialties</h2>
                    <p>Hand-picked dishes that define our kitchen.</p>
                </div>

                <div className="banners-grid">
                    <div className="banner-item glass-hover">
                        <img src={banner4} alt="Banner 4" />
                        <div className="banner-content">
                            <h3>Seasonal Specials</h3>
                        </div>
                    </div>

                    <div className="banner-item glass-hover">
                        <img src={banner2Real} alt="Banner 2" />
                        <div className="banner-content">
                            <h3>Chef's Choice</h3>
                        </div>
                    </div>

                    <div className="banner-item glass-hover">
                        <img src={banner5Real} alt="Banner 5" />
                        <div className="banner-content">
                            <h3>Healthy Bites</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom-cta-section">
                <div className="cta-container glass">
                    <h2>Ready to taste the difference?</h2>
                    <p>Discover a world of flavors waiting for you.</p>
                    <button className="hero-btn" onClick={handleGoToMenu}>
                        Explore Menu
                        <span className="btn-arrow">→</span>
                    </button>
                </div>
            </div>

            <div className="book-separator">
                <img src={bookImg} alt="Culinary Book" className="book-image" />
            </div>

            <div className="story-section">
                <div className="story-content">
                    <h2 className="story-title">The Slurp Philosophy</h2>
                    <p className="story-text">
                        We believe that food is more than just sustenance; it's a bridge between cultures,
                        a catalyst for conversation, and a pure expression of love. At Slurp Kitchen,
                        every ingredient is chosen with purpose, and every recipe tells a story of
                        tradition meeting innovation. From our farm-to-table sourcing to our chef's
                        meticulous craft, we invite you to savor a journey that begins in our hearts
                        and ends at your table.
                    </p>
                    <div className="story-divider"></div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
