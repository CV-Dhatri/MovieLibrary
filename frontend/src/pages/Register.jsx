import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    securityQuestion: '',
    securityAnswer: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post('/auth/register', { ...form, role: 'member' });
      toast.success('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error('Registration failed. Email may already be taken.');
    } finally {
      setLoading(false);
    }
  };

  const posters = [
    'https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    'https://image.tmdb.org/t/p/w300/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    'https://image.tmdb.org/t/p/w300/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
    'https://image.tmdb.org/t/p/w300/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    'https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    'https://image.tmdb.org/t/p/w300/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
    'https://image.tmdb.org/t/p/w300/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    'https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    'https://image.tmdb.org/t/p/w300/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    'https://image.tmdb.org/t/p/w300/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
    'https://image.tmdb.org/t/p/w300/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    'https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    'https://image.tmdb.org/t/p/w300/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
    'https://image.tmdb.org/t/p/w300/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
  ];

  return (
    <div style={styles.page}>

      {/* Poster Background */}
      <div style={styles.posterGrid}>
        {posters.map((src, i) => (
          <div key={i} style={styles.posterWrapper}>
            <img
              src={src}
              alt=""
              style={styles.poster}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.style.backgroundColor = [
                  '#1a1a2e','#16213e','#0f3460','#1b262c',
                  '#2c3e50','#1a252f','#212f3d','#1c2833'
                ][i % 8];
              }}
            />
          </div>
        ))}
      </div>

      <div style={styles.overlay}></div>

      <div style={styles.center}>
        <div style={styles.logo}>🎬 Movie Library</div>

        <h1 style={styles.headline}>
          Start borrowing <br/> movies today.
        </h1>

        <p style={styles.subheadline}>
          Create your free account in seconds.
        </p>

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>Create Account</h2>

          <form onSubmit={handleSubmit}>

            <input
              style={styles.input}
              type="text"
              placeholder="Full Name"
              required
              onChange={(e)=>setForm({...form,name:e.target.value})}
            />

            <input
              style={styles.input}
              type="email"
              placeholder="Email Address"
              required
              onChange={(e)=>setForm({...form,email:e.target.value})}
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              required
              onChange={(e)=>setForm({...form,password:e.target.value})}
            />

            {/* SECURITY QUESTION FIX */}
            <select
              style={styles.select}
              required
              onChange={(e)=>setForm({...form,securityQuestion:e.target.value})}
            >
              <option value="" style={{color:"black"}}>
                Select a Security Question
              </option>

              <option value="pet" style={{color:"black"}}>
                What is your pet's name?
              </option>

              <option value="city" style={{color:"black"}}>
                What city were you born in?
              </option>

              <option value="school" style={{color:"black"}}>
                What was your first school?
              </option>

              <option value="nickname" style={{color:"black"}}>
                What was your childhood nickname?
              </option>

              <option value="teacher" style={{color:"black"}}>
                What was your favourite teacher's name?
              </option>

            </select>

            <input
              style={styles.input}
              type="text"
              placeholder="Your Answer"
              required
              onChange={(e)=>setForm({...form,securityAnswer:e.target.value})}
            />

            <button
              style={loading ? styles.btnDisabled : styles.btn}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>

          </form>

          <p style={styles.loginText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.loginLink}>
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

const styles = {

page:{
position:"relative",
minHeight:"100vh",
width:"100%",
overflow:"hidden",
fontFamily:"Segoe UI, sans-serif",
display:"flex",
alignItems:"center",
justifyContent:"center"
},

posterGrid:{
position:"absolute",
top:0,
left:0,
width:"100%",
height:"100%",
display:"grid",
gridTemplateColumns:"repeat(6,1fr)",
gridTemplateRows:"repeat(3,1fr)",
gap:"4px",
transform:"scale(1.05)",
zIndex:0
},

posterWrapper:{width:"100%",height:"100%",overflow:"hidden",background:"#1a1a2e"},

poster:{
width:"100%",
height:"100%",
objectFit:"cover",
filter:"brightness(0.6)"
},

overlay:{
position:"absolute",
top:0,
left:0,
width:"100%",
height:"100%",
background:"linear-gradient(to bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.92))",
zIndex:1
},

center:{
position:"relative",
zIndex:2,
display:"flex",
flexDirection:"column",
alignItems:"center",
padding:"40px 20px",
width:"100%",
maxWidth:"520px"
},

logo:{
fontSize:"22px",
fontWeight:"800",
color:"#2980B9",
letterSpacing:"1px",
marginBottom:"24px",
textTransform:"uppercase"
},

headline:{
fontSize:"38px",
fontWeight:"800",
color:"#fff",
textAlign:"center",
lineHeight:"1.2",
marginBottom:"10px"
},

subheadline:{
fontSize:"16px",
color:"#ccc",
textAlign:"center",
marginBottom:"28px"
},

card:{
background:"rgba(0,0,0,0.75)",
backdropFilter:"blur(12px)",
border:"1px solid rgba(255,255,255,0.1)",
borderRadius:"16px",
padding:"36px",
width:"100%"
},

cardTitle:{
color:"#fff",
fontSize:"22px",
fontWeight:"700",
marginBottom:"20px"
},

input:{
width:"100%",
padding:"13px 16px",
marginBottom:"12px",
borderRadius:"8px",
border:"1px solid rgba(255,255,255,0.2)",
background:"rgba(255,255,255,0.1)",
color:"#fff",
fontSize:"14px",
outline:"none"
},

select:{
width:"100%",
padding:"13px 16px",
marginBottom:"12px",
borderRadius:"8px",
border:"1px solid rgba(255,255,255,0.2)",
background:"rgba(255,255,255,0.1)",
color:"#fff",
fontSize:"14px",
outline:"none"
},

btn:{
width:"100%",
padding:"13px",
background:"#2980B9",
color:"#fff",
border:"none",
borderRadius:"8px",
fontSize:"15px",
fontWeight:"700",
cursor:"pointer",
marginTop:"4px"
},

btnDisabled:{
width:"100%",
padding:"13px",
background:"#1a5276",
color:"#aaa",
border:"none",
borderRadius:"8px",
fontSize:"15px",
fontWeight:"700",
cursor:"not-allowed",
marginTop:"4px"
},

loginText:{
color:"#aaa",
fontSize:"14px",
textAlign:"center",
marginTop:"16px"
},

loginLink:{
color:"#2980B9",
fontWeight:"600",
textDecoration:"none"
}

};