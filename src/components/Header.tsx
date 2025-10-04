import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { SiReact } from "react-icons/si";

export const Header = () => {
    return (
        <AppBar
            position="sticky"
            color="primary"
            sx={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(30, 30, 35, 0.9)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
            component={motion.div}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <SiReact size={28} color="#61DAFB" />
                    <Typography variant="h6" component="div">
                        Demo Todo
                    </Typography>
                </Box>
                <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                    Built with React, .NET, SQLite
                </Typography>
            </Toolbar>
        </AppBar>
    );
}