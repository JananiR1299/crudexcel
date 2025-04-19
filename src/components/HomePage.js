import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { ShoppingCart, AddCircle, Visibility, History } from '@mui/icons-material';

// Styled Link component
const CardLink = styled(Link)({
  textDecoration: 'none',
});

// CustomCard component with `selected` and `onSelect`
const CustomCard = ({ icon: Icon, title, to, selected, onSelect }) => (
  <CardLink to={to} onClick={onSelect}>
    <Card
      sx={{
        backgroundColor: '#4a90e2',
        color: '#fff',
        minHeight: 150,
        width: { xs: '100%', sm: 250 },
        opacity: selected ? 1 : 0.4,
        boxShadow: selected
          ? '0 6px 18px rgba(0,0,0,0.3)'
          : '0 4px 10px rgba(0,0,0,0.2)',
        transform: selected ? 'scale(1.05)' : 'scale(1)',
        transition: 'opacity 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      <CardActionArea>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Icon fontSize="large" style={{ marginBottom: '0.5rem', color: 'white' }} />
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </CardLink>
);

export default function Dashboard() {
  const [selectedTitle, setSelectedTitle] = useState(null);

  const handleSelect = (title) => {
    setSelectedTitle(title);
  };

  const cardData = [
    { icon: ShoppingCart, title: 'Orders', to: '/orders' },
    { icon: AddCircle, title: 'Item', to: '/items' },
    { icon: Visibility, title: 'Ordered', to: '/ordered' },
    { icon: History, title: 'History', to: '/history' },
  ];

  return (
    <Box sx={{ width: '100%', p: 4 }}>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 4, md: 6 }}>
        {cardData.map((card) => (
          <Grid item xs={12} sm={6} key={card.title}>
            <CustomCard
              {...card}
              selected={selectedTitle === null || selectedTitle === card.title}
              onSelect={() => handleSelect(card.title)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
