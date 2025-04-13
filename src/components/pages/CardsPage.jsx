import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import { CreditCard, AddCircle, Delete } from '@mui/icons-material';

// Card component to display a single card
const CardItem = ({ card }) => (
  <Card 
    className="card hover-effect" 
    sx={{ 
      background: card.gradient,
      color: 'white',
      position: 'relative',
      minHeight: '200px'
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <CreditCard sx={{ fontSize: 28 }} />
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{card.type}</Typography>
      </Box>
      <Typography 
        variant="h5" 
        sx={{ 
          fontSize: 24,
          letterSpacing: 2,
          mb: 4
        }}
      >
        {card.number}
      </Typography>
      <Box sx={{ 
        mt: 4, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      }}>
        <Box>
          <Typography sx={{ fontSize: 12, opacity: 0.8 }}>CARD HOLDER</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{card.holder}</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 12, opacity: 0.8 }}>EXPIRES</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{card.expiry}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// Add Card Dialog component
const AddCardDialog = ({ open, onClose, onAdd }) => {
  const [newCard, setNewCard] = useState({
    type: '',
    number: '',
    holder: '',
    expiry: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewCard(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onAdd(newCard);
    setNewCard({ type: '', number: '', holder: '', expiry: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Card</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Card Type</InputLabel>
            <Select
              name="type"
              value={newCard.type}
              onChange={handleChange}
              label="Card Type"
            >
              <MenuItem value="VISA">VISA</MenuItem>
              <MenuItem value="MASTERCARD">MASTERCARD</MenuItem>
              <MenuItem value="AMEX">AMEX</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label="Card Number"
            name="number"
            value={newCard.number}
            onChange={handleChange}
            placeholder="**** **** **** ****"
          />
          
          <TextField
            fullWidth
            label="Card Holder"
            name="holder"
            value={newCard.holder}
            onChange={handleChange}
            placeholder="John Doe"
          />
          
          <TextField
            fullWidth
            label="Expiry Date"
            name="expiry"
            value={newCard.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Card
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Select Cards Dialog component
const SelectCardsDialog = ({ open, onClose, cards, selectedCards, onToggleCard, onDelete }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Select Cards to Delete</DialogTitle>
    <DialogContent>
      <List>
        {cards.map((card, index) => (
          <React.Fragment key={index}>
            <ListItem 
              button 
              onClick={() => onToggleCard(index)}
              sx={{ 
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedCards.includes(index)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText 
                primary={`${card.type} ending in ${card.number.slice(-4)}`}
                secondary={`Card Holder: ${card.holder} | Expires: ${card.expiry}`}
              />
            </ListItem>
            {index < cards.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button 
        onClick={onDelete} 
        color="error" 
        variant="contained"
        disabled={selectedCards.length === 0}
      >
        Delete Selected
      </Button>
    </DialogActions>
  </Dialog>
);

// Confirm Delete Dialog component
const ConfirmDeleteDialog = ({ open, onClose, onConfirm, cards, selectedCards }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete Cards</DialogTitle>
    <DialogContent>
      <Typography>
        Are you sure you want to delete the following cards?
      </Typography>
      <List>
        {selectedCards.map(index => (
          <ListItem key={index}>
            <ListItemText 
              primary={`${cards[index].type} ending in ${cards[index].number.slice(-4)}`}
            />
          </ListItem>
        ))}
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} color="error" variant="contained">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

const CardsPage = () => {
  // Load cards from localStorage or use default cards
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem('cards');
    return savedCards ? JSON.parse(savedCards) : [
    {
      type: 'VISA',
      number: '**** **** **** 1234',
      holder: 'John Doe',
      expiry: '12/24',
      gradient: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    },
    {
      type: 'MASTERCARD',
      number: '**** **** **** 5678',
      holder: 'John Doe',
      expiry: '10/25',
      gradient: 'linear-gradient(45deg, #FF4081 30%, #FF80AB 90%)'
    }
  ];
  });

  // Save cards to localStorage when they change
  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectDialogOpen, setSelectDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  // Handle card selection
  const handleToggleCard = (index) => {
    setSelectedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  // Handle adding a new card
  const handleAddCard = (newCard) => {
    const gradients = [
      'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      'linear-gradient(45deg, #FF4081 30%, #FF80AB 90%)',
      'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
      'linear-gradient(45deg, #FFC107 30%, #FFD54F 90%)'
    ];
    
    const cardWithGradient = {
      ...newCard,
      gradient: gradients[Math.floor(Math.random() * gradients.length)]
    };

    setCards(prev => [...prev, cardWithGradient]);
    setAddDialogOpen(false);
  };

  // Handle deleting selected cards
  const handleDeleteCards = () => {
    setCards(prev => prev.filter((_, i) => !selectedCards.includes(i)));
    setDeleteDialogOpen(false);
    setSelectDialogOpen(false);
    setSelectedCards([]);
  };

  return (
    <Box className="page-container" sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">My Cards</Typography>
        <Box>
          <Button 
            variant="outlined" 
            color="error"
            startIcon={<Delete />}
            sx={{ mr: 2 }}
            onClick={() => setSelectDialogOpen(true)}
          >
            Select to Delete
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddCircle />}
            onClick={() => setAddDialogOpen(true)}
          >
            Add New Card
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} md={6} key={index}>
            <CardItem card={card} />
        </Grid>
        ))}
      </Grid>

      {/* Dialogs */}
      <AddCardDialog 
        open={addDialogOpen} 
        onClose={() => setAddDialogOpen(false)} 
        onAdd={handleAddCard} 
      />
      
      <SelectCardsDialog 
        open={selectDialogOpen} 
        onClose={() => {
          setSelectDialogOpen(false);
          setSelectedCards([]);
        }} 
        cards={cards} 
        selectedCards={selectedCards} 
        onToggleCard={handleToggleCard} 
        onDelete={() => setDeleteDialogOpen(true)} 
      />
      
      <ConfirmDeleteDialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)} 
        onConfirm={handleDeleteCards} 
        cards={cards} 
        selectedCards={selectedCards} 
      />
    </Box>
  );
};

export default CardsPage; 