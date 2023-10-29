
import myImage from "../person-icon.jpg";
import '../App.css';
const profile = () => {
    return (
        <div className="profile">
          <img src={myImage} alt="Profile" />
          <p>Hello, UserName</p>
        </div>
      );
  }



export default profile