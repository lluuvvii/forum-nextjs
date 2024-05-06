import Link from "next/link";
import { Grid, styled, Typography } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "40px",
  width: "40px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <Grid container spacing={1} alignItems="center" sx={{ mt: 3 }}>
      <Grid item>
        <LinkStyled href="/">
          <Image src="/images/logos/keyframes.svg" alt="logo" height={40} width={40} priority />
        </LinkStyled>
      </Grid>
      <Grid item>
        <Link href="/" style={{ textDecoration: 'none', color: '#4C87B9' }}>
          <Typography variant="h3">FORUMOPHIC</Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Logo;
