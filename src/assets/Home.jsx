import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from './CartSlice.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';


const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;  
  background: #f9f9f9;
    border-radius: 12px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0;
 
`;

const CartButton = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  background: #f5f5f5;

  &:hover {
    background: #e0e0e0;
    transform: translateY(-2px);
  }
`;

const Badge = styled(motion.span)`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;

const ProductsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  padding: 20px 0;
`;

const ProductCard = styled(motion.div)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background: white;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled(motion.img)`
  width: 100%;
  height: 200px;
  object-fit: contain;
  background: #f9f9f9;
  padding: 20px;
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 10px 0;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #2f3542;
  margin: 0;
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
`;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    const timer = setTimeout(() => fetchData(), 1000); 
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    
    
    const animationElement = document.createElement('div');
    animationElement.style.position = 'fixed';
    animationElement.style.pointerEvents = 'none';
    animationElement.style.zIndex = '1000';
    animationElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    `;
    document.body.appendChild(animationElement);

  
    const productRect = document.querySelector(`[data-id="${product.id}"]`).getBoundingClientRect();
    const cartRect = document.querySelector('[aria-label="Cart"]').getBoundingClientRect();

  
    animationElement.style.left = `${productRect.left + productRect.width / 2}px`;
    animationElement.style.top = `${productRect.top + productRect.height / 2}px`;
    animationElement.style.transform = 'translate(-50%, -50%) scale(1)';
    animationElement.style.opacity = '1';
    animationElement.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    setTimeout(() => {
      animationElement.style.left = `${cartRect.left + cartRect.width / 2}px`;
      animationElement.style.top = `${cartRect.top + cartRect.height / 2}px`;
      animationElement.style.transform = 'translate(-50%, -50%) scale(0.5)';
      animationElement.style.opacity = '0.5';
    }, 50);


    setTimeout(() => {
      document.body.removeChild(animationElement);
    }, 850);
  };

  if (loading) {
    return (
      <LoadingContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <LoadingSpinner
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title style={{marginLeft:"20px"}}>Shop Products</Title>
        <CartButton to="/cart" aria-label="Cart" style={{marginRight:"20px"}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <AnimatePresence>
            {cartItems.length > 0 && (
              <Badge
                key="cart-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </Badge>
            )}
          </AnimatePresence>
        </CartButton>
      </Header>

      <ProductsGrid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <AnimatePresence>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              data-id={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              onClick={() => handleAddToCart(product)}
            >
              <ProductImage
                src={product.image}
                alt={product.title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>RS {product.price.toFixed(2)}</ProductPrice>
              </ProductInfo>
            </ProductCard>
          ))}
        </AnimatePresence>
      </ProductsGrid>
    </Container>
  );
};

export default Home;