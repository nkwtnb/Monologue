import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom";
import ErrorMessage from "../atoms/ErrorMessage";
import Message from "../atoms/Message";

interface ResetCredentials {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

const INITIAL_STATE: ResetCredentials = {
  email: "",
  password: "",
  password_confirmation: "",
  token: "",
}

export default () => {
  const [resetCredentials, setResetCredentials] = useState<ResetCredentials>(INITIAL_STATE);
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<string[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  useEffect(() => {
    setResetCredentials({
      ...resetCredentials,
      email: searchParams.get("email") === null ? "" : searchParams.get("email")!,
      token: searchParams.get("token") === null ? "" : searchParams.get("token")!,
    });
  }, []);

  const handleChange = (e: any) => {
    setResetCredentials({...resetCredentials, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e: any) => {
    setMessages([]);
    setErrorMessages([]);
    e.preventDefault();
    console.log(resetCredentials);
    try {
      const resp = (await axios.post("/password/reset", resetCredentials)).data;
      setMessages([resp.message + "\n3秒後にトップ画面に戻ります。"]);
      setTimeout(() => location.reload(), 3000);
    } catch (_error: any) {
      const error = _error.response;
      console.log(error);
      const errors: string[] = [];
      for (let field in error.data.errors) {
        Array.prototype.push.apply(errors, error.data.errors[field]);
      }
      console.log(errors);
      if (errors.length > 0) {
        setErrorMessages(errors);
      }
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">パスワードリセット</div>
            <div className="card-body">
              <form method="POST" action="">
                <input type="hidden" name="token" value="" />

                  <div className="row mb-3">
                    <label htmlFor="email" className="col-md-4 col-form-label text-md-end">メールアドレス</label>
                    <div className="col-md-6">
                      <input id="email" type="email" className="form-control" name="email" value={resetCredentials.email} required autoComplete="email" autoFocus onChange={(e => handleChange(e))} />
                        {/* <span className="invalid-feedback" role="alert"> */}
                          {/* <strong>{{ $message }}</strong> */}
                        {/* </span> */}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="password" className="col-md-4 col-form-label text-md-end">パスワード</label>
                    <div className="col-md-6">
                      <input id="password" type="password" className="form-control" name="password" value={resetCredentials.password} required autoComplete="new-password" onChange={(e => handleChange(e))}/>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-end">パスワード（確認）</label>
                    <div className="col-md-6">
                      <input id="password_confirmation" type="password" className="form-control" name="password_confirmation" value={resetCredentials.password_confirmation} required autoComplete="new-password" onChange={(e => handleChange(e))}/>
                    </div>
                  </div>

                  {
                  messages.length > 0 &&
                  <div className='row mb-3 align-items-center'>
                    <div className='col-md-6 offset-md-4'>
                      <Message messages={messages}></Message>
                    </div>
                  </div>
                  }
                  {
                  errorMessages.length > 0 &&
                  <div className='row mb-3 align-items-center'>
                    <div className='col-md-6 offset-md-4'>
                      <ErrorMessage messages={errorMessages}></ErrorMessage>
                    </div>
                  </div>
                  }
                  <div className="row mb-0">
                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-primary" onClick={(e => handleSubmit(e))}>
                        送信
                      </button>
                    </div>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}