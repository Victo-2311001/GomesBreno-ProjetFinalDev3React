import { Typography, Box, Container, Card, CardContent, Grid, Chip, Avatar } from '@mui/material';
import { SportsMma, Favorite, EmojiEvents, LocalFireDepartment, Bloodtype } from '@mui/icons-material';

export default function Principal() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0000 100%)',
      py: 6 
    }}>
      <Container maxWidth="lg">
        {/* Hero Section BRUTAL */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1a0000 0%, #330000 50%, #0d0d0d 100%)',
            borderRadius: 2,
            p: 6,
            mb: 6,
            color: '#ff0000',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid #660000',
            boxShadow: '0 0 40px rgba(255, 0, 0, 0.3), inset 0 0 60px rgba(0,0,0,0.8)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,0,0,0.03) 10px, rgba(255,0,0,0.03) 20px)',
              animation: 'slide 20s linear infinite',
            },
            '@keyframes slide': {
              '0%': { backgroundPosition: '0 0' },
              '100%': { backgroundPosition: '100px 100px' },
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
              <SportsMma sx={{ fontSize: 70, color: '#ff0000', filter: 'drop-shadow(0 0 10px #ff0000)' }} />
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 900, 
                  letterSpacing: 2,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  textShadow: '0 0 20px #ff0000, 0 0 30px #ff0000',
                  textTransform: 'uppercase',
                }}
              >
                COMBATTANTS MMA
              </Typography>
            </Box>
            
            <Typography variant="h5" sx={{ mb: 3, color: '#cc0000', fontWeight: 700, textTransform: 'uppercase' }}>
              VIOLENCE • HONNEUR • GUERRE DE L'OCTOGONE
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                icon={<Bloodtype sx={{ color: '#ff0000 !important' }} />} 
                label="SANS PITIÉ" 
                sx={{ 
                  bgcolor: '#000', 
                  color: '#ff0000', 
                  fontWeight: 900,
                  border: '1px solid #660000',
                  px: 2,
                  fontSize: '0.9rem'
                }}
              />
              <Chip 
                icon={<LocalFireDepartment sx={{ color: '#ff4500 !important' }} />} 
                label="PURE RAGE" 
                sx={{ 
                  bgcolor: '#000', 
                  color: '#ff4500', 
                  fontWeight: 900,
                  border: '1px solid #660000',
                  px: 2,
                  fontSize: '0.9rem'
                }}
              />
              <Chip 
                icon={<EmojiEvents sx={{ color: '#ffd700 !important' }} />} 
                label="CHAMPIONS" 
                sx={{ 
                  bgcolor: '#000', 
                  color: '#ffd700', 
                  fontWeight: 900,
                  border: '1px solid #660000',
                  px: 2,
                  fontSize: '0.9rem'
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Features Grid STREET */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid container >
            <Card 
              sx={{ 
                height: '100%',
                bgcolor: '#0d0d0d',
                border: '2px solid #660000',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 0 30px rgba(255, 0, 0, 0.5)',
                  border: '2px solid #ff0000',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Avatar sx={{ 
                  bgcolor: '#1a0000', 
                  width: 70, 
                  height: 70, 
                  mb: 2,
                  border: '3px solid #660000',
                  boxShadow: '0 0 20px rgba(255,0,0,0.3)'
                }}>
                  <SportsMma sx={{ fontSize: 40, color: '#ff0000' }} />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 2, color: '#ff0000', textTransform: 'uppercase' }}>
                  GUERRIERS
                </Typography>
                <Typography variant="body1" sx={{ color: '#999', lineHeight: 1.7 }}>
                  Les plus dangereux combattants de la planète. Sang, sueur et victoire.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid container>
            <Card 
              sx={{ 
                height: '100%',
                bgcolor: '#0d0d0d',
                border: '2px solid #660000',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 0 30px rgba(255, 69, 0, 0.5)',
                  border: '2px solid #ff4500',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Avatar sx={{ 
                  bgcolor: '#1a0a00', 
                  width: 70, 
                  height: 70, 
                  mb: 2,
                  border: '3px solid #663300',
                  boxShadow: '0 0 20px rgba(255,69,0,0.3)'
                }}>
                  <Favorite sx={{ fontSize: 40, color: '#ff4500' }} />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 2, color: '#ff4500', textTransform: 'uppercase' }}>
                  TES FAVORIS
                </Typography>
                <Typography variant="body1" sx={{ color: '#999', lineHeight: 1.7 }}>
                  Ta squad personnelle. Les meilleurs fighters dans ton équipe.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Image Section avec texte NEON */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '400px', md: '600px' },
            borderRadius: 2,
            overflow: 'hidden',
            mb: 6,
            border: '2px solid #660000',
            boxShadow: '0 0 40px rgba(255, 0, 0, 0.3)',
          }}
        >
          {/* Image de fond */}
          <Box
            component="img"
            src="https://media.zenfs.com/en/the_independent_635/2ff53a0e24c9af7d042d69c22b7ba4cf"
            alt="MMA Cage"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.4) contrast(1.2)',
            }}
          />
          
          {/* Overlay gradient */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(26,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)',
            }}
          />
          
          {/* Texte NEON par-dessus */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              width: '90%',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '2.5rem', md: '5rem' },
                color: '#ff0000',
                textTransform: 'uppercase',
                letterSpacing: 3,
                textShadow: `
                  0 0 10px #ff0000,
                  0 0 20px #ff0000,
                  0 0 30px #ff0000,
                  0 0 40px #ff0000,
                  0 0 70px #ff0000,
                  0 0 80px #ff0000,
                  0 0 100px #ff0000
                `,
                animation: 'flicker 3s infinite alternate',
                '@keyframes flicker': {
                  '0%, 18%, 22%, 25%, 53%, 57%, 100%': {
                    textShadow: `
                      0 0 10px #ff0000,
                      0 0 20px #ff0000,
                      0 0 30px #ff0000,
                      0 0 40px #ff0000,
                      0 0 70px #ff0000,
                      0 0 80px #ff0000,
                      0 0 100px #ff0000
                    `,
                  },
                  '20%, 24%, 55%': {
                    textShadow: 'none',
                  },
                },
              }}
            >
              PRÊT À RENTRER
              <br />
              DANS LA CAGE?
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );    
}

//STRUCTURE ET STYLE GÉNÉRÉ COMPLÈTEMENT PAR IA