import React, { Component } from 'react';
import Circle from './helpers/Circle';
import './styles/styles.css';
import { initAndSolve } from './helpers/Recursion';

class App extends Component {

    state = {
        length: 5,
        delay: 1000,
        A: [],
        B: [],
        C: [],
        ready: true,
        stop: undefined,
        status: "Awaiting input..."
    }

    handleCircleCount = (e) => {
        this.setState({length: e.target.value})
    }

    handleDelay = (e) => {
        this.setState({delay: e.target.value})
    }

    setAppState = (A, B, C) => {
        if (typeof(A) === 'boolean') {
            if (this.state.status === "Stopping...") {
                this.setState({ready: true, status: "Awaiting input..."}, () => {
                    this.setState({A: [], B: [], C: []});
                });
            } else {
                this.setState({ready: true, status: "Awaiting input..."});
            }
        } else {
            this.setState({A: A, B: B, C: C, ready: false});
        }
    }

    runAnimation = async () => {
        await initAndSolve(this.state.length, this.state.delay, this.setAppState, (stopCallback) => {
            this.setState({stop: stopCallback});
        });
    }

    mapCircles = (array) => {
        let newArr = [];
        for (let i = this.state.length - 1; i >= 0; i--) {
            newArr.push(array[i] ? array[i] : -1);
        }
        const arr = ['red', 'cyan', 'green', 'blue', 'pink', 'gold', 'grey'];
        if (newArr.length > 0) {
            return newArr.map((value, index) => {
                let val = 'blank'
                if (value !== -1) {
                    val = arr[value - 1];
                }
                if (value) {
                    return (
                        <Circle key={`${val}${index}`} type={val} />
                    )
                }
                return (
                    <div />
                )
            })
        }
    }

    render() {

        let startingDraw = this.mapCircles(this.state.A);
        let auxiliaryDraw = this.mapCircles(this.state.B);
        let endingDraw = this.mapCircles(this.state.C);

        return (
            <div>
                <div className="row">
                    <div className="col s2">
                        <button disabled={!this.state.ready} className="StartButton waves-effect waves-light btn" onClick={async () => {
                            this.setState({status: "Running..."});
                            await this.runAnimation();
                        }}>Start Animation</button>
                    </div>
                    <div className="col s2">
                        <span>
                            <p className="CircleCount">Circles: {this.state.length}</p>
                            <p className="range-field">
                                <input disabled={!this.state.ready} type="range" id="circleCount" min="3" max="7" defaultValue="5" onChange={this.handleCircleCount}/>
                            </p>
                        </span>
                    </div>
                    <div className="col s2">
                        <span>
                            <p className="DelayCount">Delay: {this.state.delay}ms</p>
                            <p className="range-field">
                                <input disabled={!this.state.ready} type="range" id="delayCount" min="100" max="2000" defaultValue="1000" onChange={this.handleDelay}/>
                            </p>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col s2 starting">
                        {startingDraw}
                    </div>
                    <div className="col s2 auxiliary">
                        {auxiliaryDraw}
                    </div>
                    <div className="col s2 ending">
                        {endingDraw}
                    </div>
                </div>
                <div className="row">
                    <div className="col s2">
                        <p className="Author">Made by Chris Rosendorf</p>
                    </div>
                    <div className="col s2">
                        <p className="StatusText">{this.state.status}</p>
                    </div>
                    <div className="col s2">
                        <button disabled={this.state.ready} className="ResetButton waves-effect waves-light btn" onClick={() => {
                            this.setState({status: "Stopping..."});
                            this.state.stop();
                            
                        }}>Reset</button>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default App;
