import React, { useEffect, useState } from 'react';
import './Rivews.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
    const [allreviews, setAllReviews] = useState([]);
    const [sortByRating, setSortByRating] = useState(false); 

    const fetchReviews = async () => {
        try {
            const response = await fetch('https://ecospin-ecommerce-backend.onrender.com/allreviews');
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            setAllReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const removeReview = async (reviewId) => {
        const response = await fetch('https://ecospin-ecommerce-backend.onrender.com/removereview', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reviewId }),
        });
        if (!response.ok) {
            throw new Error('Failed to remove review');
        }
        await fetchReviews();
    };

    const sortReviewsByRating = () => {
        const sortedReviews = [...allreviews].sort((a, b) => {
            return sortByRating ? b.rating - a.rating : a.rating - b.rating;
        });
        setAllReviews(sortedReviews);
        setSortByRating(!sortByRating);
    };

    const oldestToNewest = () => {
        const sortedReviews = [...allreviews].sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        setAllReviews(sortedReviews);
    };

    const countReviewsByRating = (rating) => {
        return allreviews.filter(review => review.rating === rating).length;
    };

    const renderReviewCounts = () => {
        let counts = "";
        for (let i = 5; i >= 1; i--) {
            counts += `${i} Stars: Reviews ${countReviewsByRating(i)} __`;
        }
        return counts;
    };

    return (
        <div className="list-rivew">
            <h1>Reviews</h1>

            <button className="listrivew-sort-button" onClick={sortReviewsByRating}>
                Rating: {sortByRating ? ' Descending ' : ' Ascending '}
            </button>
            
            <div className="listrivew-format-main">
                <p>Product Id</p>
                <p>Username</p>
                <p>Rating</p>
                <p>Comment</p>
                <p>Date</p>
                <p>Remove</p>
            </div>

            <div className="listrivew-allrivews">
                <hr />
                {allreviews.map((review, index) => (
                    <div key={index} className="listrivew-format-main">
                        <p>{review.productId}</p>
                        <p>{review.username}</p>
                        <p>{review.rating}</p>
                        <p>{review.comment}</p>
                        {/* <p>{review._id}</p> */}
                        <p>{review.date}</p>
                        <img onClick={() => removeReview(review._id)} src={cross_icon} alt="" className="listproduct-remove-icon" />
                    </div>
                ))}
            </div>

            <p>{renderReviewCounts()}</p>
        </div>
    );
};

export default ListProduct;
