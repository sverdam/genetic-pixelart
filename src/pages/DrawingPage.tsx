function DrawingPage() {
  return <div>
    <section>
        <h1>SEE HOW THE ALGORITHM RECREATES THIS DRAWING!</h1>
        <div className="card-container">
            <div className="card">
                <div className="canvas"></div>
                <h2>DRAWING</h2>
                <button className="btn">submit your drawing</button>
            </div>

            <div className="card">
                <div className="drawing"></div>
                <h2>RESULT</h2>
                <p>Here is the result of the algorithm trying to recreate the drawing.</p>
            </div>
        </div>
    </section>
  </div>;
}

export default DrawingPage;