import "../styles/landingPage.css";

function LandingPage() {
  return <div>
    <section className="hero">
        <h1>genetic<br />pixel art</h1>
        <p>an application of genetic algorithms for pixel art recreation</p>
        <button className="btn">try it out!</button>
    </section>
    <section>
        <div className="card-container">
            <div className="card">
                <div className="drawing"></div>
                <p>Drawing 1</p>
                <a href="/example" className="btn">view example</a>
            </div>
            <div className="card">
                <div className="drawing"></div>
                <p>Drawing 2</p>
                <a href="/example" className="btn">view example</a>
            </div>
            <div className="card">
                <div className="drawing"></div>
                <p>Drawing ?</p>
                <a href="/draw" className="btn">submit your drawing</a>
            </div>
        </div>
    </section>

    </div>;
}

export default LandingPage;