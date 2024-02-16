import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

class ProductItemDetails extends Component {
  state = {
    productDetails: [],
    similarProducts: [],
    isLoading: true,
    quantity: 0,
  }

  componentDidMount() {
    this.fetchData()
  }

  qtyIncrease = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  qtyDecrease = () => {
    this.setState(prevState => ({quantity: prevState.quantity - 1}))
  }

  fetchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiURL = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiURL, options)
    const data = await response.json()
    const similarProductsArr = data.similar_products

    const formattedData = {
      ...data,
      imageUrl: data.image_url,
      totalReviews: data.total_reviews,
    }
    const similarProducts = similarProductsArr.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
      brand: each.brand,
      price: each.price,
      rating: each.rating,
      title: each.title,
      totalReviews: each.total_reviews,
    }))
    console.log(similarProducts, formattedData)
    this.setState({
      isLoading: false,
      productDetails: formattedData,
      similarProducts,
    })
  }

  render() {
    const {productDetails, similarProducts, isLoading, quantity} = this.state
    const {
      imageUrl,
      availability,
      price,
      rating,
      totalReviews,
      brand,

      style,
      description,
    } = productDetails

    console.log(similarProducts)
    return (
      <div className="product-details-container">
        <Header />
        {isLoading ? (
          <div className="loader-section">
            <Loader type="TailSpin" />
          </div>
        ) : (
          <div className="product-current-details">
            <div className="product-current-section ">
              <div className="product-image-section">
                <img src={imageUrl} className="prod-img" alt="" />
              </div>
              <div className="product-details-section">
                <h1 className="prod-name">{style}</h1>
                <p className="prod-price">Rs {price}/- </p>
                <div className="rating-section">
                  <div className="rating-viewer">
                    {rating}
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="rating-star"
                    />
                  </div>
                  <p>{totalReviews} Reviews</p>
                </div>
                <div className="prod-desc-section">
                  <p>{description}</p>
                </div>
                <div className="availability-section">
                  <p>
                    <b>Available:</b> {availability}
                  </p>
                </div>
                <div className="brand-section">
                  <p>
                    <b>Brand:</b> {brand}
                  </p>
                </div>
                <hr className="seperator" />
                <div className="product-qty-section">
                  <div className="prod-qty-viewer">
                    <button
                      type="button"
                      onClick={this.qtyIncrease}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <p>{quantity}</p>
                    <button
                      type="button"
                      onClick={this.qtyDecrease}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button type="button" className="add-cart-btn">
                  ADD TO CART
                </button>
              </div>
            </div>
            <div className="similar-prod-section">
              <h1>Similar Product</h1>
              <div className="similar-prod-container">
                {similarProducts.map(each => (
                  <SimilarProductItem prodData={each} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ProductItemDetails
