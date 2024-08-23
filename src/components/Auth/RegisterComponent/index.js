import { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

import Input from "../../UI/Input";
import { Link, useNavigate } from 'react-router-dom';
// import SocialMediaLoginComponent from "../LoginComponent/SocialMediaLoginComponent";
// import NotificationComponent from "../NotificationComponent";
// addAccount là hàm để set giá trị cho toàn bộ accounts
// Đăng ký là thêm mới 1 account vào
// Cần giữ nguyên cái các account cũ
const RegisterComponent = ({ changeLoginForm, accounts, addAccount }) => {
  // 2 State quản lý, input của người dùng
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    username: "",
    password: "",
    repassword: "",
    email: "",
  });
  // Object => object.property
  // Set New State

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
    // Đăng ký ở đây
    // Kiểm tra trùng accounts
    // Chekc pasword
    // check email
    // Check độ dài
    // Validate mọi thứ => Tối quan trọng trong form

    // if (username.length < 4) {
    //   setMessage("Đăng ký thất bại, tài khoản không đủ dài");
    //   setMesageStatus("fail");

    //   setMessageObject({
    //     message: "Đăng ký thất bại, tài khoản không đủ dài",
    //     setMesageStatus: "fail",
    //   });

    //   return;
    // }

    var list = JSON.parse(localStorage.getItem("listUser"));
    // Validate
    if(list){
      let bol = true;
    
      for (var i = 0, l = list.length; i < l; i++) {
        if (list[i].username == username) {    
            console.log("username đã tồn tại", username);
            bol =false
            return;
        } 
      }
      if(bol = true){
        {
          list.push({username:username,password:password});
          localStorage.setItem("listUser",JSON.stringify(list))
          navigate('/login')
        }
      }
    }else {
      var custs = []
      custs.push({username:username,password:password});
      localStorage.setItem("listUser",JSON.stringify(custs))
      navigate('/login')
    }





    
    // Skip validate
    const account = {
      username: username,
      password: password,
      // email: email,
      // balance: 2000,
      cart: [],
    };
    // addAccount((prevState) => [...prevState, account]);
    // Gửi thông báo về
    // Clear form đăng ký

    // Nếu mà người dùng đăng ký mà không đăng ký được, các bạn nên lưu lại các dữ liệu mà người đã nhập, trừ password
    // Khi mà đăng ký thành công => Thông báo, clear form => Chuyển form đăng nhập
    // Bước chuyển form tùy chọn
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
                  <div className="col-sm-5 _lk_nb">
                    <div className="form-05-box-a">
                      <div className="_form_05_logo">
                        <h2>smart</h2>
                        {/* <p>Login using social media to get quick access</p> */}
                      </div>
                      {/* <SocialMediaLoginComponent /> */}
                    </div>
                  </div>
                  <div className="col-sm-7 _nb-pl">
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
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter Email"
                          required=""
                          aria-required="true"
                        />
                      </div>

                      <div className="form-group">
                        {/* <tr> */}
                          <Input
                            title="Password"
                            displayHorizon={true}
                            value={password}
                            setValue={setPassword}
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter Password"
                            required=""
                            aria-required="true"
                          />
                        {/* </tr> */}
                      </div>

                      <div className="form-group">
                        {/* <tr> */}
                          <Input
                            title="RePassword"
                            displayHorizon={true}
                            value={repassword}
                            setValue={setRePassword}
                            type="password"
                            name="repassword"
                            className="form-control"
                            placeholder="Enter Re-Password"
                            required=""
                            aria-required="true"
                          />
                        {/* </tr> */}
                      </div>

                      <div className="form-group">
                        {/* <tr> */}
                          <Input
                            title="Email"
                            displayHorizon={true}
                            value={email}
                            setValue={setEmail}
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            required=""
                            aria-required="true"
                          />
                        {/* </tr> */}
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
