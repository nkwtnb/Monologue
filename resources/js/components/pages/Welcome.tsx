import axios from 'axios';
import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import CardButton from "../molecules/CardButton";
import { AuthContext } from ".././../Context";
import * as userApi from "../../api/User";
import ErrorMessage from '../atoms/ErrorMessage';
import * as Credentials from "@api/Creadentials";
import { Link } from 'react-router-dom';

interface Props {
  isRegister: boolean;
}

const LABEL = {
  Submit: {
    Register: "登録",
    Login: "ログイン"
  },
  Toggle: {
    Register: "未登録の方は新規登録",
    Login: "登録済みの方はログイン"
  }
}

export default (props: Props) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [credentials, setCredentials] = useState<Credentials.Type>(Credentials.INITIAL_STATE);
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    setCredentials(Credentials.INITIAL_STATE);
    setErrors([]);
  }, [props.isRegister]);

  const toggleView = () => {
    if (props.isRegister) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  }

  const submit = async () => {
    setErrors([]);
    await axios.get("/sanctum/csrf-cookie");
    try {
      let authenticatedUser: userApi.Type;
      if (props.isRegister) {
        authenticatedUser = (await axios.post("/register", credentials)).data;
      } else {
        authenticatedUser = (await axios.post("/login", credentials)).data;
      }
      setAuthState(authenticatedUser);
      navigate("/");
    } catch (e: any) {
      const errors = e.response.data.errors;
      const messages: string[] = [];
      for (let key in errors) {
        const fieldErrors = errors[key];
        fieldErrors.forEach((fieldError: any) => {
          messages.push(fieldError);
        });
      }
      setErrors(messages);
    }
  }

  const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>, target: string) => {
    if (target === "remember") {
      setCredentials({ ...credentials, [target]: e.target.checked ? true : undefined })
    } else {
      setCredentials({ ...credentials, [target]: e.target.value })
    }
  }
  
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">{props.isRegister ? LABEL.Submit.Register : LABEL.Submit.Login}</div>
              <div className="card-body">
                <div className="row mb-3">
                  <label htmlFor="name" className="col-md-4 col-form-label text-md-end">ユーザー名</label>
                  <div className="col-md-6">
                    <input id="name" type="text" className="form-control" name="name" required autoComplete="name" autoFocus value={credentials.name} onChange={(e => handleChangeCredentials(e, "name"))} />
                    <span className="invalid-feedback" role="alert">
                    </span>
                  </div>
                </div>
                {/* メールアドレス */}
                {props.isRegister &&
                  <>
                    <div className="row mb-3">
                      <label htmlFor="email" className="col-md-4 col-form-label text-md-end">メールアドレス</label>
                      <div className="col-md-6">
                        <input id="email" type="email" className="form-control" name="email" required autoComplete="email" value={credentials.email} onChange={(e => handleChangeCredentials(e, "email"))} />
                        <span className="invalid-feedback" role="alert">
                        </span>
                      </div>
                    </div>
                  </>
                }
                {/* パスワード */}
                <div className="row mb-3">
                  <label htmlFor="password" className="col-md-4 col-form-label text-md-end">パスワード</label>
                  <div className="col-md-6">
                    <input id="password" type="password" className="form-control" name="password" required autoComplete="new-password" value={credentials.password} onChange={(e => handleChangeCredentials(e, "password"))} />
                    <span className="invalid-feedback" role="alert">
                    </span>
                  </div>
                </div>
                {props.isRegister &&
                  <div className="row mb-3">
                    <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-end">パスワード（確認）</label>
                    <div className="col-md-6">
                      <input id="password-confirm" type="password" className="form-control" name="password_confirmation" required autoComplete="new-password" value={credentials.password_confirmation} onChange={(e => handleChangeCredentials(e, "password_confirmation"))} />
                    </div>
                  </div>
                }
                {!props.isRegister &&
                  <div className="row mb-3">
                    <div className="col-md-6 offset-md-4">
                      <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="remember" id="remember" onChange={(e => handleChangeCredentials(e, "remember"))}/>
                          <label className="form-check-label" htmlFor="remember">ログイン情報を保持する</label>
                      </div>
                      </div>
                  </div>
                }
                {
                errors.length > 0 &&
                <div className="row mb-3 mt-3">
                  <div className="offset-md-4 col-md-6">
                    <div className='w-100'>
                      <ErrorMessage messages={errors}></ErrorMessage>
                    </div>
                  </div>
                </div>
                }
                {/* アクション */}
                <div className="row mb-3">
                  <div className="col-md-6 offset-md-4">
                    <CardButton isSubmit={true} label={props.isRegister ? LABEL.Submit.Register : LABEL.Submit.Login} onClick={submit} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 offset-md-4">
                    <CardButton isSubmit={false} label={props.isRegister ? LABEL.Toggle.Login : LABEL.Toggle.Register} onClick={toggleView} />
                  </div>
                </div>
                {/* パスワード再発行 */}
                <div className="row">
                  <div className="col-md-6 offset-md-4">
                    <Link to={"/password/email"} >パスワードをお忘れの場合</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
