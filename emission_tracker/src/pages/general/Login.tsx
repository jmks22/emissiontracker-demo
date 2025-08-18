import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import SignUp from "../../components/general/SignUpForm";
import UserProfile from "./UserProfile";
import ChangePassword from "../../components/general/ChangePassword";
import "../../theme/general.scss";
import "./Home.css";
import LoginForm from "../../components/general/LoginForm";
import Index from "../../components/general/Index";

const Login: React.FC = () => {
  return <Index component={<LoginForm />} />;
};

export default Login;
