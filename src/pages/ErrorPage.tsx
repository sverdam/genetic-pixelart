import sadGuy from "../assets/sadGuy.gif"


function ErrorPage() {
  return (
    <div className="col">
      <h1 className="tiny5 xl">404</h1>
      <p>We couldnt find the page you were looking for :(</p>
      <img src={sadGuy} alt="sorry :("/>
      <a href="/" className="btn">Go home</a>
    </div>
  );
}

export default ErrorPage;