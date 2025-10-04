import { Box, Typography, Link } from "@mui/material";
import { motion } from "framer-motion";
import { SiReact, SiDotnet, SiSqlite } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
    return (
        <Box
            component={motion.footer}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                py: 2,
                textAlign: "center",
                background: "rgba(20, 20, 25, 0.8)",
                backdropFilter: "blur(10px)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                zIndex: 1300,
                overflow: "hidden",
                "::before": {
                    content: '""',
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background:
                        "conic-gradient(from 0deg, #61DAFB, #512BD4, #003B57, #61DAFB)",
                    animation: "spinGradient 8s linear infinite",
                    opacity: 0.15,
                    zIndex: -1,
                    filter: "blur(60px)",
                },
                "@keyframes spinGradient": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                }}
            >
                Built with
                <SiReact color="#61DAFB" />
                <SiDotnet color="#512BD4" />
                <SiSqlite color="#003B57" />
            </Typography>

            <Typography variant="caption" color="text.secondary">
                © {new Date().getFullYear()} Kyle Taylor ·{" "}
                <Link
                    href="https://github.com/kiffness/PostgresDemo.Frontend"
                    target="_blank"
                    underline="hover"
                    sx={{
                        color: "inherit",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                    }}
                >
                    <FaGithub /> View on GitHub
                </Link>
            </Typography>
        </Box>
    );
}