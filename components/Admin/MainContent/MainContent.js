import { Box, Container, Grid, Paper } from "@mantine/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Toolbar } from "@mui/material";
import React from "react";

const MainContent = () => {
  const defaultTheme = createTheme();

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Button variant="outline">Total Projects</Button>
                  <p class="text-left ...">
                    The Total Numbers of Projects are : -
                  </p>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Button variant="outline"> Users</Button>
                  <p class="text-left ...">The total Number of Users are:-</p>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Button variant="outline">Tasks</Button>
                  <p class="text-left ...">The Total Numbers of Task are : -</p>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Button variant="outline">Priority</Button>
                  <p class="text-left ...">Total Number of Priopitized Task</p>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper
                  sx={{
                    height: "250px",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* <Button>Orders</Button> */}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default MainContent;
