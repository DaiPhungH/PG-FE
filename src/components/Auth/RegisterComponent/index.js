import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import Input from "../../UI/Input";
import { Link, useNavigate } from 'react-router-dom';

const RegisterComponent = ({ changeLoginForm, accounts, addAccount }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [messageStatus, setMesageStatus] = useState(null);
  const [messageObject, setMessageObject] = useState({
    message: null,
    setMesageStatus: null,
    color: null,
    textSize: null,
  });

  const clearRegisterForm = () => {
    setUsername("");
    setPassword("");
    setRePassword("");
    setEmail("");
  };

  const signUpHandler = () => {
    var list = JSON.parse(localStorage.getItem("listUser"));
    if(list){
      let bol = true;
      for (var i = 0, l = list.length; i < l; i++) {
        if (list[i].username === username) {    
          console.log("Username đã tồn tại", username);
          bol = false;
          return;
        } 
      }
      if(bol) {
        list.push({username:username,password:password});
        localStorage.setItem("listUser", JSON.stringify(list));
        navigate('/login');
      }
    } else {
      var custs = [];
      custs.push({username:username,password:password});
      localStorage.setItem("listUser", JSON.stringify(custs));
      navigate('/login');
    }
    
    setMessage("Đăng ký thành công");
    setMesageStatus("success");

    setMessageObject({
      message: "Đăng ký thành công",
      setMesageStatus: "success",
    });

    clearRegisterForm();
  };

  const loginHandler = () => {
    // changeLoginForm();
  };

  return (
    <>
      <section className="_form_05">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="_form-05-box">
                <div className="row">
                  <div className="col-sm-12 _nb-pl">
                    <div className="_mn_df">
                      <div className="main-head">
                        <h2>Register a new account</h2>
                      </div>

                      {/* {message && (
                        <NotificationComponent
                          messageStatus={messageStatus}
                          message={message}
                        />
                      )}
                      {message && (
                        <NotificationComponent props={messageObject} />
                      )} */}

                      <div className="form-group">
                        <Input
                          title="Username"
                          displayHorizon={true}
                          value={username}
                          setValue={setUsername}
                          type="text"
                          name="username"
                          className="form-control"
                          placeholder="Enter Username"
                          required
                          aria-required="true"
                        />
                      </div>

                      <div className="form-group">
                        <Input
                          title="Password"
                          displayHorizon={true}
                          value={password}
                          setValue={setPassword}
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Enter Password"
                          required
                          aria-required="true"
                        />
                      </div>

                      <div className="form-group">
                        <Input
                          title="RePassword"
                          displayHorizon={true}
                          value={repassword}
                          setValue={setRePassword}
                          type="password"
                          name="repassword"
                          className="form-control"
                          placeholder="Enter Re-Password"
                          required
                          aria-required="true"
                        />
                      </div>

                      <div className="form-group">
                        <Input
                          title="Email"
                          displayHorizon={true}
                          value={email}
                          setValue={setEmail}
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter Email"
                          required
                          aria-required="true"
                        />
                      </div>

                      <div className="form-group">
                        <div className="row">
                          <div className="col-3">
                            <button
                              className="btn btn-secondary"
                              onClick={signUpHandler}
                            >
                              Register
                            </button>
                          </div>
                          <div className="col-9">
                            <Link to="/login">
                              <button
                                className="btn btn-primary"
                                onClick={loginHandler}
                              >
                                Login
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterComponent;
