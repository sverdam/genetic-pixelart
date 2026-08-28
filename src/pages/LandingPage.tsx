import "../styles/landingPage.css";
import squirrel from "../assets/squirrel.png";
import paintbrush from "../assets/paintbrush.png";

function LandingPage() {
  return <div>
    <section className="hero">
        <h1>genetic pixel art</h1>
        <p>an application of genetic algorithms for pixel art recreation</p>
        <div className="card-container">
            <div className="card">
                <div>
                    <img src={squirrel} alt="squirrel" className="fadeHover" />
                </div>
                <div className="card-content">
                    <h3>Example Drawing</h3>
                    <p>See how the genetic algorithm recreates pixel art!</p>
                    <a href="/example" className="btn">view example</a>
                </div>
            </div>
            <div className="card">
                <div>
                    <img src={paintbrush} alt="make your own drawing" className="fadeHover" />
                </div>
                <div className="card-content">
                    <h3>Make Your Own</h3>
                    <p>Draw your own image and let the genetic algorithm recreate it!</p>
                    <a href="/draw" className="btn">make your own!</a>
                </div>
            </div>
        </div>
    </section>

    </div>;
}

export default LandingPage;