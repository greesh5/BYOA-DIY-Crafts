import React, { useState, useEffect } from 'react';
import { getCraftsByCategory, deleteListing, getCurrentUser } from '../../services/listingservice';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CardActions, Collapse } from '@mui/material';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from '../../context/authcontext';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function DetailPage() {
  const { category } = useParams();
  const [crafts, setCrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState([]);
  const [userRole, setUserRole] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchCrafts = async () => {
      try {
        const response = await getCraftsByCategory(category, token);
        setCrafts(response);
        setLoading(false);
        console.log(crafts);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserRole = async () => {
      try {
        const user = await getCurrentUser(token);
        console.log(user);
        setUserRole(user?.role);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCrafts();
    fetchUserRole();
  }, [category, token]);

  crafts.map((craft) => {
    console.log(craft._id);
  });

  const handleDelete = async (craftId) => {
    try {
      await deleteListing(craftId, token);
      setCrafts((prevCrafts) => prevCrafts.filter((craft) => craft._id !== craftId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpandClick = (index) => {
    setExpandedCards((prevExpandedCards) => {
      const newExpandedCards = [...prevExpandedCards];
      newExpandedCards[index] = !newExpandedCards[index];
      return newExpandedCards;
    });
  };

  const renderDeleteButton = (craft) => {
    if (userRole === 'admin') {
      return (
        <Button size="small" color="secondary" onClick={() => handleDelete(craft._id)}>
          Delete
        </Button>
      );
    }
    return null;
  };

  return (
    <div style={{ height: '500px', overflow: 'auto' }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={2}>
          {crafts.map((craft, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <Card sx={{ maxWidth: 600, boxShadow: '0px 4px 8px rgba(0, 0, 0.4, 0.4)', height: '100%' }}>
                <CardMedia component="img" height="194" image={craft.image} alt={craft.images} />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Title: {craft.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Materials:{' '}
                    {Array.isArray(craft.materials) ? craft.materials.join(', ') : craft.materials}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {craft.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Steps:
                  </Typography>
                  <Collapse in={expandedCards[index]} timeout="auto" unmountOnExit>
                    <ol>
                      {craft.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </Collapse>
                </CardContent>
                <CardActions disableSpacing>
                  {craft.video && (
                    <Button size="small" color="primary" href={craft.video} target="_blank">
                      Watch Video
                    </Button>
                  )}
                  {renderDeleteButton(craft)}
                  {/* <IconButton aria-label="add to favorites"> */}
                  {/* <FavoriteIcon /> */}
                  {/* </IconButton> */}
                  {/* <IconButton aria-label="share"> */}
                  {/* <ShareIcon /> */}
                  {/* </IconButton> */}
                  <ExpandMore
                    expand={expandedCards[index]}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expandedCards[index]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default DetailPage;
