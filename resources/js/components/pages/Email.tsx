import axios from "axios";
import { useState } from "react"
import ErrorMessage from "../atoms/ErrorMessage";
import Message from "../atoms/Message";

export default () => {
  const [email, setEmail] = useState("");
  const [isInProgress, setProgress] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessages([]);
    setMessages([]);
    setProgress(true);
    try {
      const resp = await axios.post("/password/email", {
        email: email
      })
      setMessages([resp.data.message]);
    } catch (error: any) {
      const errors = error.response.data.errors;
      const messages: string[] = [];
      for (let key in errors) {
        errors[key].forEach((message: string) => {
          messages.push(message);
        });
      }
      if (messages.length > 0) {
        setErrorMessages(messages);
      }
    } finally {
      setProgress(false);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">パスワードリセット</div>
            <div className="card-body">
              <form method="POST" action="/password/email">
                <div className="row mb-3">
                  <label htmlFor="email" className="col-md-4 col-form-label text-md-end">メールアドレス</label>
                  <div className="col-md-6">
                    <input id="email" type="email" className="form-control @error('email')" name="email" value={email} onChange={handleEmail} required autoComplete="email" autoFocus />
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
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={isInProgress}>
                      {
                        isInProgress
                          ?
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="sr-only">送信中...</span>
                          </>
                          :
                          <>
                            <span>送信</span>
                          </>
                      }
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