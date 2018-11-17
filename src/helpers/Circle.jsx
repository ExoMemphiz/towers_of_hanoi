import React from 'react';
import '../styles/styles.css';

export default class Circle extends React.Component {

    render() {

        let size = 8;
        let colour = 'red';

        switch(this.props.type) {
            case 'red': 
                break;
            case 'cyan': 
                size = 12;
                colour = 'cyan';
                break;
            case 'green': 
                size = 16;
                colour = 'green';
                break;
            case 'blue': 
                size = 20;
                colour = 'blue';
                break;
            case 'pink': 
                size = 24;
                colour = 'pink';
                break;
            case 'gold': 
                size = 28;
                colour = 'gold';
                break;
            case 'grey': 
                size = 32;
                colour = 'grey';
                break;
            case 'blank':
                size = 0;
                colour = 'white';
                break;

            default: 
                throw new Error(`Undefined circle type "${this.props.type}"`)
        }
        let drawn = ' ';
        for (let i = 0; i < size * 2; i++) {
            drawn += "|";
        }
        return (
            <p style={{color: colour}} className="Circle">
                {drawn}
            </p>
        )
    }

}

Circle.props = {
    type: "red"
}
