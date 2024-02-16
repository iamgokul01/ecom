import './index.css'

const SimilarProductItem = props => {
  const {prodData} = props
  const {imageUrl, brand, price, rating, title, totalReviews} = prodData

  return (
    <div className="similar-prod-item-container">
      <img src={imageUrl} alt={title} className="similar-prod-img" />
      <p>{title}</p>
      <p>by {brand}</p>
      <div className="price-rating">
        <div className="price-section">
          <p>Rs {price}</p>
        </div>
        <div className="similar-rating-section">
          <div className="rating-viewer">
            {rating}
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="rating-star"
            />
          </div>
          <p className="similar-review">{totalReviews} Reviews</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarProductItem
