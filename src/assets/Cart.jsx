import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem } from './CartSlice.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #e0e0e0;
    transform: translateY(-2px);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const EmptyCart = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: #f9f9f9;
  border-radius: 12px;
  text-align: center;
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #ccc;
`;

const ProductsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ProductCard = styled(motion.div)`
  position: relative;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
`;

const ProductImage = styled(motion.img)`
  width: 100%;
  height: 180px;
  object-fit: contain;
  background: #f9f9f9;
  padding: 1rem;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductDetail = styled.p`
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
`;

const RemoveButton = styled(motion.button)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background-color: #ff4757;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
`;

const TotalContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-top: 2rem;
`;

const TotalLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;

const TotalAmount = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2f3542;
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );

  return (
    <Container>
      <BackButton to="/">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Shop
      </BackButton>
      
      <Title>Your Shopping Cart</Title>
      
      <AnimatePresence>
        {cartItems.length === 0 ? (
          <EmptyCart
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <EmptyCartIcon>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </EmptyCartIcon>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any items yet</p>
          </EmptyCart>
        ) : (
          <>
            <ProductsGrid
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <AnimatePresence>
                {cartItems.map(item => (
                  <ProductCard
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <ProductImage
                      src={item.image}
                      alt={item.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <ProductInfo>
                      <ProductTitle>{item.title}</ProductTitle>
                      <ProductDetail>Price: RS {item.price.toFixed(2)}</ProductDetail>
                      <ProductDetail>Quantity: {item.quantity}</ProductDetail>
                      <ProductDetail>
                        <strong>Total: {(item.price * item.quantity).toFixed(2)}</strong>
                      </ProductDetail>
                    </ProductInfo>
                    <RemoveButton
                      onClick={() => handleRemoveItem(item.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ×
                    </RemoveButton>
                  </ProductCard>
                ))}
              </AnimatePresence>
            </ProductsGrid>
            
            <TotalContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TotalLabel>Order Total:</TotalLabel>
              <TotalAmount>RS {total.toFixed(2)}</TotalAmount>
            </TotalContainer>
            
            <CheckoutButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Proceed to Checkout
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </CheckoutButton>
          </>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Cart;