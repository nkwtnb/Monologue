import axios from "axios";
import { useState } from "react"

export default () => {
  const [email, setEmail] = useState("");

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const resp = await axios.post("/password/email", {
      email: email
    })
    console.log(resp);
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
                    <span className="invalid-feedback" role="alert">
                      <strong>（メッセージ）</strong>
                    </span>
                  </div>
                </div>

                <div className="row mb-0">
                  <div className="col-md-6 offset-md-4">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
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