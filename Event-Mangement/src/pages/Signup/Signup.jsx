import Navigation from "../../components/Navigation/Navigation.jsx";
import { useState,useEffect } from "react"
import { useNavigate} from "react-router-dom";


// import "./signup.css";
const Signup = () => {
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [mobile, setMobile] = useState(""); 
  const [password,setPassword]=useState("");
  const [successMessage, setSuccessMessage] = useState(false); // State for success message
  const navigate=useNavigate();

  useEffect(()=>{
      const auth=localStorage.getItem('users');
      if(auth){
          navigate('/');
      }
  })

  const collectData=async (e)=>{
    e.preventDefault(); // Prevent default form submission behavior

      let result=await fetch('http://localhost:9000/register',{
          method: 'POST',
          body: JSON.stringify({name,email,password,mobile}),
          headers:{
              'Content-Type': 'application/json'
          }
      });
      result=await result.json();
      console.log(result);
      localStorage.setItem("users",JSON.stringify(result));
      if(result){
        setSuccessMessage("Signup successful!"); 
      setTimeout(() => {
        setSuccessMessage(""); 
          navigate('/Login');  
        },1000);
        
      }
  }
    
    return (
      <div className="w-full h-auto flex flex-col ">

      <Navigation />
      <div className="w-[700px] flex flex-col justify-center items-center mt-[100px] mb-[60px]">
        <div className="flex items-center">
          <div className="flex-1">
            <img src="./image/Logo1.png" alt="Side Image" className="w-full h-auto flex-1" />
          </div>
          <div className="absolute top-2/4 left-2/4 w-[400px] px-[40px] py-[40px] rounded-[10px] transform -translate-x-2/4 -translate-y-2/4 bg-black bg-opacity-60 shadow-lg mt-[5px] mb-[50px]">
            <h2 className="text-white text-center mt-0 mb-[30px] mx-0 text-[25px] ">Sign Up</h2>
            <form>
            <div className="mb-[30px]">
                  <input placeholder="Email Id" type="email" name="Email" required="" 
                  autoComplete="email"
                  value={email} onChange={(e)=>setEmail(e.target.value)}
                  className="w-full py-[10px] mb-[10px] text-white border-b border-white bg-transparent outline-none hover:text-yellow-400" />
                  {/* <label className="absolute top-0 left-0 py-[10px] text-white pointer-events-none transition duration-500">Email Id</label> */}
                </div>
              <div className="mb-[30px]">
                  <input placeholder="Username" type="text" name="Username" required="" 
                  autoComplete="username"
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}
                    
                  className="w-full py-[10px] mb-[10px] text-white border-b border-white bg-transparent outline-none" />
                  {/* <label className="absolute top-0 left-0 py-[10px] text-white pointer-events-none transition duration-500">Username</label> */}
                </div>
                <div className="relative mb-[30px]">
                  <input placeholder="Mobile No." type="text" name="Mobile" required="" 
                  autoComplete="tel"  
                  maxLength={10} 
                  pattern="[0-9]{10}"
                  value={mobile} 
                  onChange={(e)=>{    
                      const input = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setMobile(input)}}
                  className="w-full py-[10px] mb-[10px] text-white border-b border-white bg-transparent outline-none" />
                  {/* <label className="absolute top-0 left-0 py-[10px] text-white pointer-events-none transition duration-500">Mobile No.</label> */}
                </div>
                <div className="relative ">
                  <input placeholder="Password" type="password" name="password" required="" 
                  autoComplete="new-password"
                  value={password} onChange={(e)=>setPassword(e.target.value)}
                  className="w-full py-[10px] mb-[10px] text-white border-b border-white bg-transparent outline-none" />
                  {/* <label className="absolute top-0 left-0 py-[10px] text-white pointer-events-none transition duration-500">Password</label> */}
                </div>
              <div className="text-center mb-[10px]">
                <label className="text-white hover:underline">Joined before? <a href="/Login" className="text-blue-500 hover:bg-white">Login</a></label>
              </div>
             
              <button type="submit" onClick={collectData} className="inline-block py-[10px] px-[20px] mt-[30px] text-blue-500 text-lg uppercase overflow-hidden 
              transition duration-500 ease-in-out bg-black tracking-[4px] shadow-[0_0_5px_#e8f403,0_0_25px_#03e9f4,0_0_50px_#03e9f4,0_0_100px_#03e9f4]
              hover:text-white rounded-md">
               
                Submit
              </button>
              {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>

    );
  };
  
  export default Signup;
  


 