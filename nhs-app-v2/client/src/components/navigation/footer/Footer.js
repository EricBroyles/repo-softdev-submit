import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@material-ui/core/Link'

//Grid is of type container and of type item
//Note px is padding in x direction, for xs devices (mobile) the padding will be 4 and for sm and up it will be 10
//pt = padding top, pb padding bottom
const Footer = () => {
    return(<div>
        <Box px={{xs: 3, sm:10}} py={{xs:5, sm:10}} bgcolor="text.secondary" color="white">
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Socials</Box>
                        <Box>
                            <Link href="/" color="inherit">
                                Twitter
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit">
                               Instagram
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit">
                                Facebook
                            </Link>
                        </Box>
                    </Grid> 
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Contact Us</Box>
                        <Box>
                            <Link href="/" color="inherit">
                                email 1
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit">
                               email 2
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit">
                                Address?
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Important Links</Box>
                        <Box>
                            <Link href="/" color="inherit">
                                HSE website
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit">
                               Canvas
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit">
                                FAQ
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box textAlign="center" pt= {{xs:5, sm:10}} pb={{xs:5, sm:0}}>
                    HSE NATIONAL HONOR SOCIETY &reg; {new Date().getFullYear()}
                </Box>
            </Container>
        </Box>
    </div>
        
    )
}
export default Footer