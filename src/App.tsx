import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Home } from './pages/Home';

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9", // light blue
        },
        secondary: {
            main: "#f48fb1", // pink
        },
        background: {
            default: "#121212",
            paper: "#1f1f28"
        }
    },
    typography: {
        fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backgroundImage: "linear-gradient(145deg, #1f1f28, #2a2a34)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                },
            },
        },
    }
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Home />
        </ThemeProvider>
    );
}

export default App;