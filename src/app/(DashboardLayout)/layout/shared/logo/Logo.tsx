import Link from "next/link";
import { Grid, styled, Typography } from "@mui/material";
import Image from "next/image";
import { IconKeyframes } from "@tabler/icons-react";

const LinkStyled = styled(Link)(() => ({
  height: "35px",
  width: "35px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <Grid container alignItems="center" sx={{ mt: 3 }}>
      <Grid item>
        <LinkStyled href="/">
          <IconKeyframes color="#7a7fff" width={35} height={35} />
        </LinkStyled>
      </Grid>
      <Grid item>
      </Grid>
      <Grid item>
        <Link href="/" style={{ textDecoration: 'none', color: '#7a7fff' }}>
          <Typography variant="h3">FORUMOPHIC</Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Logo;
