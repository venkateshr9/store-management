import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { login, saveAuth } from "../../auth/authService";
import AuthContext from "../../auth/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const auth = await login(username, password);

      saveAuth(auth);

      setAuthenticated(true);

      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Card elevation={8} sx={{ width: 420, borderRadius: 3 }}>
        <CardContent sx={{ p: 5 }}>
          <Stack spacing={3} alignItems="center">

	   <Box
   		 sx={{
        	width: "100%",
        	display: "flex",
        	justifyContent: "center",
        	mb: 2,
    		}}
	>
    	<Box
        	component="img"
        	src="/logo.png"
        	alt="Store Management System"
        	sx={{
            	width: 170,
            	height: 170,
            	objectFit: "contain",
        	}}
    		/>
	</Box>  

        <Box
    		sx={{
        	width: "100%",
        	textAlign: "center",
    		}}
	>
	  <Typography 
	  	variant="h4" 
	  	fontWeight={800} 
	  	color="primary"
	  	sx={{
			lineheight: 1.15,
		}}
	  	>
                Store Management System
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
            Enterprise Inventory & Warehouse Platform  
	    </Typography>
            </Box>

            {error && (
              <Typography color="error">
                {error}
              </Typography>
            )}

            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword
                        ? <VisibilityOff />
                        : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <FormControlLabel
                control={<Checkbox />}
                label="Remember me"
              />

              <Typography
                variant="body2"
                color="primary"
              >
                Forgot Password?
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading
                ? <CircularProgress size={22} color="inherit" />
                : "Sign In"}
            </Button>

	   <Stack spacing={0.5} alignItems="center">

    	<Typography
        	variant="caption"
        	color="text.secondary"
    	>
        	Version 1.0.0
    	</Typography>

    <Typography
        variant="caption"
        color="text.secondary"
    >
        © 2026 Store Management System
    </Typography>

</Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
