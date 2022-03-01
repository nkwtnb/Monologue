export default () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">パスワードリセット</div>
            <div className="card-body">
              <form method="POST" action="{{ route('password.update') }}">
                <input type="hidden" name="token" value="" />

                  <div className="row mb-3">
                    <label htmlFor="email" className="col-md-4 col-form-label text-md-end">メールアドレス</label>
                    <div className="col-md-6">
                      <input id="email" type="email" className="form-control @error('email') is-invalid @enderror" name="email" value="{{ $email ?? old('email') }}" required autoComplete="email" autoFocus />
                        {/* <span className="invalid-feedback" role="alert"> */}
                          {/* <strong>{{ $message }}</strong> */}
                        {/* </span> */}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="password" className="col-md-4 col-form-label text-md-end">パスワード</label>
                    <div className="col-md-6">
                      <input id="password" type="password" className="form-control @error('password') is-invalid @enderror" name="password" required autoComplete="new-password" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-end">パスワード（確認）</label>
                    <div className="col-md-6">
                      <input id="password-confirm" type="password" className="form-control" name="password_confirmation" required autoComplete="new-password" />
                    </div>
                  </div>
                  <div className="row mb-0">
                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-primary">
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