import React, { useState, useEffect } from 'react';
import './Review.css';

const Review = ({ all_product, product }) => {
    const [reviews, setReviews] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visibleReviews, setVisibleReviews] = useState(5);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:4000/allreviews');
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [product]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                if (!token) {
                    console.error('No auth token found.');
                    return;
                }
        
                const response = await fetch('http://localhost:4000/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }
                });
                const responseData = await response.json();
                if (responseData.success) {
                    setUserInfo(responseData.user);
                } else {
                    console.error('Failed to fetch user information:', responseData.message);
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    let productId = null;
    if (all_product && product) {
        const foundProduct = all_product.find(item => item.id === product.id);
        if (foundProduct) {
            productId = foundProduct._id;
        }
    }

    const generateStars = (rating) => {
        const cappedRating = Math.min(5, rating); // Cap rating at 5
        const fullStars = '★'.repeat(cappedRating);
        const emptyStars = '☆'.repeat(5 - cappedRating);
        return fullStars + emptyStars;
    };

    const productReviews = reviews.filter(review => review.productId === productId);

    const averageRating = productReviews.length > 0
        ? Math.min(5, productReviews.reduce((total, review) => total + review.rating, 0) / productReviews.length)
        : 0;

    if (!productId || productReviews.length === 0) {
        return null;
    }

    const circleSize = 50 + (averageRating * 10); // Adjust size based on rating

    const handleSeeMore = () => {
        setVisibleReviews(prev => prev + 5);
    };

    return (
        <div className="review">
            
            <div className="review-container">
                <div className="review-title-container">
                    
                    <div className="right-title-container">
                        <h1 className='review-container-title'>Reviews</h1>
                    </div>

                    <div className="left-title-container">
                        <div className="average-rating-circle" style={{ width: circleSize, height: circleSize}}>
                            <p>{averageRating.toFixed(1)}</p>
                        </div>
                    </div>
                </div>
                
                <ul>
                    {productReviews.slice(0, visibleReviews).map(review => (
                        <li key={review._id}>
                            <div className="review-container-review">
                                <div className="review-right">
                                    <p className='review-right-username'>{review.username}</p>
                                    <p className='review-right-rating'>{generateStars(review.rating)}</p>
                                </div>
                                <div className="review-left">
                                    <p className='review-left-comment-title'>{review.comment.split(' ').slice(0, 4).join(' ')} . . .</p>
                                    <p className='review-left-comment'>{review.comment}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="review-see-more-button">
                    {visibleReviews < productReviews.length && (
                        <button onClick={handleSeeMore} className="see-more-button">See More</button>
                    )}
                </div>
                
            </div>
            
        </div>
    ); 
};

export default Review;
