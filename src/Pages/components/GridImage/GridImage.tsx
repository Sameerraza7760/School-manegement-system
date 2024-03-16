import { Grid } from "@mui/material";
import bgpic from "../../../assets/designlogin.jpg";
function GridImage() {
  return (
    <>
      {" "}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${bgpic})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </>
  );
}

export default GridImage;
