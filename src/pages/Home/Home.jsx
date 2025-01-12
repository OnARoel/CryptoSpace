import React from 'react';
import './Home.css';


//API key CG-bNTT9ZyTB7yiFxQwzC1yVQdU	
const Home = () => {
  return (
    <>
    <div className="home">
      <div className="hero">
        <h1>Largest <br/> Crypto Marketplace</h1>
        <p>Welcome to the largest Crypto MarketPlace</p>
        <form>
          <input type="text" placeholder='Search Crypto..'/>
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign: "center"}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home